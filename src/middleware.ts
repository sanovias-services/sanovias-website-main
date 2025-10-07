/**
 * Next.js Middleware - Edge Runtime Request Processing
 * 
 * This middleware runs BEFORE every page request and handles:
 * 1. 🌍 Internationalization (i18n) - Auto-detects user language and redirects
 * 2. 🛡️ CSRF Protection - Automatically generates security tokens for forms
 * 3. 🚀 Performance - Runs on Vercel Edge (closer to users, faster responses)
 * 
 * EXECUTION ORDER:
 * User Request → Middleware → Page/API Route → Response
 * 
 * WHAT MIDDLEWARE DOES:
 * - Detects user's preferred language from Accept-Language header
 * - Redirects /contact to /en/contact or /de/contact based on preference
 * - Sets CSRF tokens for pages with forms (contact, quote, newsletter)
 * - Skips processing for API routes, static files, and internal Next.js files
 * 
 * EXAMPLES:
 * - Request: "/" → Redirect to: "/en" (for English users)
 * - Request: "/" → Redirect to: "/de" (for German users)  
 * - Request: "/contact" → Redirect to: "/en/contact" + Set CSRF token
 * - Request: "/en/contact" → Pass through + Set CSRF token
 * - Request: "/api/contact" → Skip middleware entirely
 * 
 * FILE LOCATION: /src/middleware.ts (Next.js convention)
 * RUNTIME: Edge Runtime (faster than Node.js, but limited APIs)
 * SCOPE: Runs on ALL requests matching the config.matcher pattern
 * 
 * @see https://nextjs.org/docs/advanced-features/middleware
 * @see https://nextjs.org/docs/advanced-features/i18n-routing
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { setCSRFToken } from '@/lib/cookies/csrf';

// Supported languages for Sanovias website
const locales = ['en', 'de'];
const defaultLocale = 'en';

/**
 * Detect user's preferred language from multiple sources
 * 
 * DETECTION PRIORITY:
 * 1. If URL already has locale (/en/contact) → use that locale
 * 2. Check saved language cookie (sanovias_language) → use saved preference
 * 3. Check Accept-Language header → parse preferred language
 * 4. Fallback to default locale (English)
 * 
 * @param request - Incoming HTTP request
 * @returns Detected locale code ('en' or 'de')
 */
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

  // Check for saved language preference cookie
  const savedLanguage = request.cookies.get('sanovias_language')?.value;
  if (savedLanguage && locales.includes(savedLanguage)) {
    console.log('🍪 Using saved language preference:', savedLanguage);
    return savedLanguage;
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

/**
 * Main middleware function - processes EVERY request matching config.matcher
 * 
 * PROCESSING FLOW:
 * 1. Check if request should be skipped (API routes, static files)
 * 2. If URL has locale (/en/contact) → add CSRF token if needed → continue
 * 3. If URL has no locale (/contact) → detect language → redirect with locale
 * 
 * SECURITY FEATURES:
 * - Automatically adds CSRF tokens to pages with forms
 * - Only processes user-facing pages (skips API routes, assets)
 * - Runs on Edge Runtime for better performance and security
 * 
 * @param request - Incoming HTTP request from user
 * @returns Response (redirect, pass-through, or modified)
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // SKIP MIDDLEWARE: Don't process these paths
  // - /api/* = API routes (handled separately)
  // - /_next/* = Next.js internal files (static assets, chunks)  
  // - /favicon* = Favicon requests
  // - *.* = Any file with extension (images, CSS, JS)
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // CASE 1: URL already has locale (e.g., /en/contact, /de/about)
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // URL is correctly formatted with locale - let it pass through
    const response = NextResponse.next();
    
    // SECURITY: Add CSRF tokens to pages with forms
    // These pages contain contact forms, quote requests, newsletter signups
    const formPages = ['/contact', '/quote', '/newsletter'];
    const needsCSRF = formPages.some(page => pathname.includes(page));
    
    if (needsCSRF) {
      // Only generate token if one doesn't exist (avoid unnecessary regeneration)
      const existingToken = request.cookies.get('csrf_token')?.value;
      
      if (!existingToken) {
        // Generate cryptographically secure CSRF token
        await setCSRFToken(response);
      }
    }
    
    return response;
  }

  // CASE 2: URL has no locale (e.g., /contact, /, /about)
  // Auto-detect user's language and redirect with proper locale
  
  const locale = getLocale(request);

  // Build redirect URL with detected locale
  // Examples: / → /en, /contact → /en/contact, /about → /de/about
  const redirectUrl = pathname === '/' 
    ? new URL(`/${locale}`, request.url)
    : new URL(`/${locale}${pathname}`, request.url);
    
  const response = NextResponse.redirect(redirectUrl);
  
  // SECURITY: Pre-emptively set CSRF tokens for form pages during redirect
  // This ensures token is ready when user reaches the final page
  const formPages = ['/contact', '/quote', '/newsletter'];
  const needsCSRF = formPages.some(page => pathname.includes(page));
  
  if (needsCSRF) {
    await setCSRFToken(response);
  }
  
  return response;
}

/**
 * Middleware Configuration - Controls which requests trigger middleware
 * 
 * MATCHER PATTERN: Uses regex to define which paths should run middleware
 * 
 * INCLUDED PATHS:
 * ✅ / (homepage)
 * ✅ /contact (gets redirected to /en/contact)  
 * ✅ /en/contact (gets CSRF token)
 * ✅ /de/about (passes through)
 * ✅ /services (gets redirected with locale)
 * 
 * EXCLUDED PATHS:
 * ❌ /api/* (API routes - handled separately)
 * ❌ /_next/* (Next.js internals - static files, chunks, etc.)
 * ❌ /favicon.ico (favicon requests)
 * ❌ /*.png, /*.css, /*.js (static assets with file extensions)
 * 
 * PERFORMANCE: Excluding unnecessary paths improves response times
 * SECURITY: Only user-facing pages need i18n and CSRF protection
 * 
 * @see https://nextjs.org/docs/advanced-features/middleware#matcher
 */
export const config = {
  matcher: [
    // Match all paths EXCEPT: _next internals, api routes, favicon, and static files
    '/((?!_next|api|favicon.ico).*)',
  ],
};