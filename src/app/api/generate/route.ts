import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { PROMPTS } from '@/lib/prompts';
import { scoreQuiz } from '@/lib/scoring';
import { del, put } from '@vercel/blob';

type ImageGenData = { url?: string; b64_json?: string };
type APIErrorLike = { status?: number; code?: string; message?: string };


export const runtime = 'nodejs';

/** Safety-friendly prompt builder */
function buildPrompt(heroine: string, style: string, mode: 'text' | 'edit') {
  const safety =
    'Portrait from chest up, neutral expression, fully clothed, tasteful, PG, non-suggestive, no violence, no weapons, studio lighting, illustration/poster style';
  return mode === 'edit'
    ? `Transform this person into a stylized ${heroine} theatre poster portrait. ${style}. ${safety}. Keep facial identity faithful.`
    : `Stylized ${heroine} theatre poster portrait. ${style}. ${safety}.`;
}

/** Persist either a remote URL or data URL to Vercel Blob for a stable link */
async function persistToBlob(imageRef: string) {
  const fname = `posters/${Date.now()}-${Math.random().toString(36).slice(2)}.png`;

  if (imageRef.startsWith('data:image/')) {
    const b64 = imageRef.split(',')[1]!;
    const buf = Buffer.from(b64, 'base64');
    const { url } = await put(fname, buf, {
      access: 'public',
      contentType: 'image/png',
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    });
    return url;
  } else {
    const res = await fetch(imageRef);
    const ab = await res.arrayBuffer();
    const { url } = await put(fname, new Uint8Array(ab), {
      access: 'public',
      contentType: 'image/png',
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    });
    return url;
  }
}

/** EDIT path via plain HTTP (works regardless of SDK version) */
async function generateEditViaHTTP(blobUrl: string, prompt: string) {
  // fetch selfie bytes
  const imgRes = await fetch(blobUrl);
  const ab = await imgRes.arrayBuffer();

  const form = new FormData();
  form.append('model', 'gpt-image-1');
  form.append('prompt', prompt);
  form.append('size', '1024x1536');
  // attach file as Blob
  form.append('image', new Blob([ab], { type: 'image/png' }), 'input.png');

  const resp = await fetch('https://api.openai.com/v1/images/edits', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY!}` },
    body: form,
  });

  const text = await resp.text();
  if (!resp.ok) throw new Error(text);

  const json = JSON.parse(text) as { data: ImageGenData[] };
  const d = json?.data?.[0];
  const url =
    d?.url ??
    (d?.b64_json ? `data:image/png;base64,${d.b64_json}` : undefined);

  if (!url) throw new Error('No image returned from edits endpoint');
  return url as string;
}

async function tryGenerateText(openai: OpenAI, heroine: string, style: string) {
  const make = async (prompt: string) => {
    const out = await openai.images.generate({
      model: 'gpt-image-1',
      prompt,
      size: '1024x1536',
    });
    const d = (out?.data?.[0] as ImageGenData | undefined);
    const finalUrl =
      d?.url ??
      (d?.b64_json ? `data:image/png;base64,${d.b64_json}` : undefined);
    if (!finalUrl) throw new Error('No image returned');
    return finalUrl;
  };

  try {
    return await make(buildPrompt(heroine, style, 'text'));
  } catch (err: unknown) {
    const e = err as APIErrorLike;
    if (e?.code === 'moderation_blocked' || e?.status === 400) {
      return await make(
        `Stylized theatre poster portrait of a fully clothed performer in an elegant, modest outfit. ` +
        `Focus on abstract, graphic, PG visuals with decorative background. ${style}. Portrait from chest up, non-suggestive.`
      );
    }
    throw err;
  }
}


/** EDIT path using the HTTP helper above; always deletes the selfie */
async function tryGenerateEdit(heroine: string, style: string, blobUrl: string) {
  try {
    const prompt = buildPrompt(heroine, style, 'edit');
    return await generateEditViaHTTP(blobUrl, prompt);
  } finally {
    // delete the uploaded selfie ASAP
    await del(blobUrl, { token: process.env.BLOB_READ_WRITE_TOKEN! }).catch(() => {});
  }
}

export async function POST(req: Request) {
  const { answers, blobUrl }: { answers: Record<number, 'A' | 'B' | 'C' | 'D'>; blobUrl?: string } =
    await req.json();

  const { winner } = scoreQuiz(answers);
  const style = PROMPTS[winner];

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const rawUrl = blobUrl
      ? await tryGenerateEdit(winner, style, blobUrl)
      : await tryGenerateText(openai, winner, style);

    // Normalize: always return a stable public URL
    const imageUrl = await persistToBlob(rawUrl);

    return NextResponse.json({ heroine: winner, imageUrl });
  } catch (err: unknown) {
    const e = err as APIErrorLike | Error | unknown;
    const msg =
      (typeof e === 'object' && e && 'message' in e && typeof (e as any).message === 'string')
        ? (e as any).message
        : 'internal_error';
    console.error(err);
    return NextResponse.json({ error: 'internal_error', message: msg }, { status: 500 });
  }
}
