/**
 * Client-Safe CSRF Utilities
 * 
 * These utilities can be safely imported in client components
 * without causing server-side dependency issues.
 * Uses Web Crypto API for Edge Runtime compatibility.
 */

export const CSRF_TOKEN_NAME = 'csrf_token';
export const CSRF_HEADER_NAME = 'X-CSRF-Token';
export const CSRF_FORM_FIELD = '_csrf_token';

/**
 * Generate a cryptographically secure CSRF token (client-side)
 * Uses Web Crypto API for Edge Runtime compatibility
 */
export function generateCSRFToken(): string {
  // Use Web Crypto API (available in browsers and Edge Runtime)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  
  // Fallback for environments without crypto (should not happen in modern browsers)
  console.warn('Web Crypto API not available, using fallback random generation');
  return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
}

/**
 * Client-side CSRF token getter (optimized parsing)
 */
export function getClientCSRFToken(): string | null {
  if (typeof document === 'undefined') return null;
  
  const match = document.cookie.match(new RegExp('(^| )' + CSRF_TOKEN_NAME + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

