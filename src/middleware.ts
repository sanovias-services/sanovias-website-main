import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'de'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  // Check if locale is in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Extract locale from pathname
    const segments = pathname.split('/');
    return segments[1];
  }

  // Get locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  console.log('🌐 Accept-Language header:', acceptLanguage);
  
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')[0]
      .split('-')[0]
      .toLowerCase();
    
    console.log('🔍 Extracted preferred locale:', preferredLocale);
    console.log('📋 Available locales:', locales);
    
    if (locales.includes(preferredLocale)) {
      console.log('✅ Using detected locale:', preferredLocale);
      return preferredLocale;
    } else {
      console.log('❌ Preferred locale not supported, falling back to:', defaultLocale);
    }
  } else {
    console.log('⚠️ No Accept-Language header found, falling back to:', defaultLocale);
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for API routes, static files
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Use getLocale function to detect the best locale for the user
  const locale = getLocale(request);

  // Redirect root path to detected locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // Add detected locale to paths that don't have one
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
};