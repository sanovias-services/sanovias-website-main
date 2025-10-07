/**
 * CSRF Protection Utilities
 * 
 * Cross-Site Request Forgery protection for form submissions
 * and API routes that modify data.
 * 
 * What is CSRF?
 * CSRF is an attack that tricks a user into submitting a request
 * (like a form submission) to a web application where they are authenticated.
 * This can lead to unauthorized actions being performed on behalf of the user.
 * 
 * It is called cross-site because the attack is initiated from a different site.
 * 
 * E.g. you visit a malicious site while logged into your bank,
 * and that site tricks your browser into submitting a (transfer) request on your behalf.
 *
 * How does this implementation work? Secret Handshake Tokens between server and browser.
 * 
 * CSRF (Cross-Site Request Forgery) protection uses the Synchronizer Token Pattern
 * 1- Server generates a unique CSRF token and sends it to the client.
 * 2- Client includes the CSRF token in the headers or body of state-changing requests.
 * 3- Server validates the CSRF token on each request to ensure it's legitimate.
 * 
 * This way, only you can submit forms on your behalf, because only your browser
 * has the secret token that matches the one stored in your cookies.
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { 
  CSRF_TOKEN_NAME, 
  CSRF_HEADER_NAME, 
  CSRF_FORM_FIELD,
  generateCSRFToken
} from './csrf-client';

/**
 * Timing-safe string comparison using Web Crypto API
 * Prevents timing attacks by ensuring constant-time comparison
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  
  return result === 0;
}

/**
 * Set CSRF token cookie (Server-side)
 */
export async function setCSRFToken(response: NextResponse): Promise<string> {
  const token = generateCSRFToken();
  
  response.cookies.set(CSRF_TOKEN_NAME, token, {
    httpOnly: false, // Allow client-side JS access for forms
    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 2, // 2 hours
  });
  
  return token;
}

/**
 * Get CSRF token from cookies (Server-side)
 */
export async function getCSRFToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const csrfCookie = cookieStore.get(CSRF_TOKEN_NAME);
  return csrfCookie?.value || null;
}

/**
 * Validate CSRF token from request
 */
export async function validateCSRFToken(request: NextRequest): Promise<boolean> {
  try {
    // Get token from cookie
    const cookieToken = request.cookies.get(CSRF_TOKEN_NAME)?.value;
    if (!cookieToken) {
      return false;
    }

    // Get token from header or form data
    let requestToken: string | null = null;
    
    // Check header first
    requestToken = request.headers.get(CSRF_HEADER_NAME);
    
    // If not in header, check form data
    if (!requestToken) {
      try {
        const body = await request.json();
        requestToken = body[CSRF_FORM_FIELD];
      } catch {
        // If JSON parsing fails, try form data
        try {
          const formData = await request.formData();
          requestToken = formData.get(CSRF_FORM_FIELD) as string;
        } catch {
          // Could not parse request body
          return false;
        }
      }
    }

    if (!requestToken) {
      return false;
    }

    // Compare tokens using constant-time comparison
    return timingSafeEqual(cookieToken, requestToken);
  } catch (error) {
    console.error('CSRF validation error:', error);
    return false;
  }
}

/**
 * CSRF protection middleware for API routes
 */
export async function withCSRFProtection(
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    // Only protect state-changing methods
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
      const isValid = await validateCSRFToken(request);
      
      if (!isValid) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'CSRF token validation failed. Please refresh the page and try again.' 
          },
          { status: 403 }
        );
      }
    }
    
    return handler(request);
  };
}

/**
 * Initialize CSRF token for a page response
 */
export async function initializeCSRFToken(response: NextResponse): Promise<NextResponse> {
  const existingToken = await getCSRFToken();
  
  if (!existingToken) {
    await setCSRFToken(response);
  }
  
  return response;
}

export { CSRF_TOKEN_NAME, CSRF_HEADER_NAME, CSRF_FORM_FIELD };