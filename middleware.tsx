import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get('better-auth.session_token') ||
    request.cookies.get('__Secure-better-auth.session_token');

  const { pathname } = request.nextUrl;

  if ((pathname.startsWith('/product/') || pathname.startsWith('/profile')) && !token) {
    const loginUrl = new URL('/signin', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/product/:path*', '/profile/:path*'],
};