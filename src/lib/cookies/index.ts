/**
 * Cookie Management System
 * 
 * Complete cookie management infrastructure for Sanovias website
 * with GDPR compliance, consent management, and cookie classification.
 * 
 * @example Basic Usage
 * ```typescript
 * import { CookieManager } from '@/lib/cookies';
 * 
 * // Set an essential cookie (always allowed)
 * CookieManager.setEssential('session_id', 'abc123');
 * 
 * // Set a functional cookie (requires consent)
 * CookieManager.setFunctional('language', 'en', 'User language preference');
 * 
 * // Get a cookie value
 * const language = CookieManager.get('language');
 * ```
 * 
 * @example Consent Management
 * ```typescript
 * import { CookieManager } from '@/lib/cookies';
 * 
 * // Check consent status
 * const hasAnalytics = CookieManager.consent.hasConsent(CookieCategory.ANALYTICS);
 * 
 * // Grant consent for specific categories
 * CookieManager.consent.setConsent({
 *   functional: true,
 *   analytics: true,
 *   marketing: false
 * });
 * 
 * // Accept all cookies
 * CookieManager.consent.acceptAll();
 * ```
 */

// Core types and enums
export type {
  CookieOptions,
  CookieDefinition,
  ConsentState,
  CookieConsent,
  StoredCookieInfo
} from './types';

export {
  CookieCategory,
  DEFAULT_CONSENT_STATE,
  CONSENT_COOKIE_NAME,
  CONSENT_PREFERENCES_KEY,
  COOKIE_POLICY_VERSION
} from './types';

// Main cookie manager
export { CookieManager } from './manager';

// Consent management
export { ConsentManager } from './consent';

// Cookie registry and definitions
export {
  ALL_COOKIES,
  initializeCookieRegistry,
  getCookiesByCategory,
  getCookieDefinition,
  getCategorySummary
} from './registry';

// Import functions for convenience export
import { CookieManager } from './manager';
import { 
  initializeCookieRegistry,
  getCookiesByCategory,
  getCookieDefinition,
  getCategorySummary
} from './registry';

// Cookie utilities
export {
  LanguageCookies,
  ThemeCookies,
  FormCookies,
  AnalyticsCookies,
  MarketingCookies,
  AccessibilityCookies,
  hasCategoryConsent,
  clearCategoryData,
  initializeCookieUtils
} from './utils';

// Client-safe CSRF utilities (no server dependencies)
export {
  generateCSRFToken,
  getClientCSRFToken,
  CSRF_TOKEN_NAME,
  CSRF_HEADER_NAME,
  CSRF_FORM_FIELD
} from './csrf-client';

// Note: Server-only CSRF functions (setCSRFToken, getCSRFToken, validateCSRFToken, 
// withCSRFProtection, initializeCSRFToken) should be imported directly from './csrf'
// when used in server components or API routes

// Note: Session utilities require server context and should be imported directly 
// from './session' when used in server components or API routes

// Note: Server-side initialization functions are available in './server-init'
// They are not re-exported here to avoid Next.js build issues with client components

// Convenience re-exports for easy access
export const cookies = {
  manager: CookieManager,
  consent: CookieManager.consent,
  registry: {
    initialize: initializeCookieRegistry,
    getByCategory: getCookiesByCategory,
    getDefinition: getCookieDefinition,
    getSummary: getCategorySummary
  }
};