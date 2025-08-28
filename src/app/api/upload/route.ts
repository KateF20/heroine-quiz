import { NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
        addRandomSuffix: true,
        // tokenPayload is optional; omit or add metadata if you want
      }),
      // onUploadCompleted runs after the browser finishes the upload.
      // You don't need it for this flow, so we leave it empty.
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(json);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
