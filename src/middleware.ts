import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, locales } from '@/lib/i18n';

const PUBLIC_FILE = /\.(.*)$/;

/** Sends every un-prefixed request to a locale, preferring the browser's. */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return NextResponse.next();

  const accept = request.headers.get('accept-language')?.toLowerCase() ?? '';
  const preferred = accept.startsWith('ja') || accept.includes(',ja') ? 'ja' : accept.startsWith('en') ? 'en' : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|images|favicon.ico).*)'],
};
