// src/app/api/generate/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { toFile } from 'openai/uploads';
import { PROMPTS } from '@/lib/prompts';
import { scoreQuiz } from '@/lib/scoring';
import { del } from '@vercel/blob';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { answers, blobUrl }: { answers: Record<number,'A'|'B'|'C'|'D'>; blobUrl?: string } =
    await req.json();

  const { winner } = scoreQuiz(answers);
  const style = PROMPTS[winner];

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  let imageUrl: string;

  if (blobUrl) {
    const imgRes = await fetch(blobUrl);
    const ab = await imgRes.arrayBuffer();
    const file = await toFile(Buffer.from(ab), 'input.png', { type: 'image/png' });

    const out = await openai.images.edits({
      model: 'gpt-image-1',
      image: file,
      prompt: `Transform this person into a stylized ${winner} poster portrait. ${style}. Keep facial identity faithful.`,
      size: '1024x1536',
    });
    imageUrl = out.data[0].url!;
    await del(blobUrl, { token: process.env.BLOB_READ_WRITE_TOKEN! }); // delete selfie ASAP
  } else {
    const out = await openai.images.generate({
      model: 'gpt-image-1',
      prompt: `Stylized ${winner} theatre poster portrait. ${style}. Solo portrait, flattering light.`,
      size: '1024x1536',
    });
    imageUrl = out.data[0].url!;
  }

  return NextResponse.json({ heroine: winner, imageUrl });
}
