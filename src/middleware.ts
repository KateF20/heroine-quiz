import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // allow lock screen, unlock API, Next internals, and static files
  if (
    pathname === '/lock' ||
    pathname.startsWith('/api/unlock') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // gate everything else
  const cookie = req.cookies.get('site_auth')?.value;
  if (cookie === 'granted') return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = '/lock';
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
