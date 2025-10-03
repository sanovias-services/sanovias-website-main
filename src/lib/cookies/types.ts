/**
 * Cookie Management Types and Interfaces
 * 
 * Defines the structure for cookie management, consent handling,
 * and GDPR compliance in the Sanovias website.
 */

export enum CookieCategory {
  ESSENTIAL = 'essential',     // No consent needed
  FUNCTIONAL = 'functional',   // Enhanced UX
  ANALYTICS = 'analytics',     // Usage tracking  
  MARKETING = 'marketing'      // Advertising
}

export interface CookieDefinition {
  name: string;
  category: CookieCategory;
  purpose: string;
  duration: string;
  thirdParty: boolean;
  gdprBasis: 'consent' | 'legitimate_interest' | 'necessary';
}

export interface CookieOptions {
  expires?: Date;
  maxAge?: number;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export interface ConsentState {
  essential: boolean;      // Always true, can't be disabled
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
}

export interface CookieConsent {
  granted: CookieCategory[];
  denied: CookieCategory[];
  timestamp: string;
  version: string;
  userAgent?: string;
  ipHash?: string;
}

export interface StoredCookieInfo {
  name: string;
  value: string;
  category: CookieCategory;
  expires?: string;
  purpose: string;
  createdAt: string;
}

// Default consent state (only essential cookies allowed)
export const DEFAULT_CONSENT_STATE: ConsentState = {
  essential: true,
  functional: false,
  analytics: false,
  marketing: false,
  timestamp: new Date().toISOString(),
  version: '1.0.0'
};

// Cookie consent storage key
export const CONSENT_COOKIE_NAME = 'sanovias_cookie_consent';
export const CONSENT_PREFERENCES_KEY = 'sanovias_consent_prefs';

// Cookie policy version for compliance tracking
export const COOKIE_POLICY_VERSION = '1.0.0';