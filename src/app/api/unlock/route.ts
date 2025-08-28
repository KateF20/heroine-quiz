import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { passcode } = await req.json().catch(() => ({ passcode: '' }));
  const ok =
    typeof passcode === 'string' &&
    process.env.SITE_PASSWORD &&
    passcode === process.env.SITE_PASSWORD;

  if (!ok) return NextResponse.json({ ok: false }, { status: 401 });

  const res = NextResponse.json({ ok: true });
  res.cookies.set('site_auth', 'granted', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // secure in prod, works in dev
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10,
  });
  return res;
}
