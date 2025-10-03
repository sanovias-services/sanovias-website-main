/**
 * Server-side Cookie System Initialization
 * 
 * Utilities for initializing the cookie system on the server side
 * and preparing initial state for client-side hydration.
 */

import { cookies } from 'next/headers';
import { ConsentState, DEFAULT_CONSENT_STATE, CONSENT_COOKIE_NAME } from '@/lib/cookies';

/**
 * Initialize cookie system state on the server
 * This prepares the initial consent state for client-side hydration
 */
export async function initializeServerCookies(): Promise<{
  initialConsentState: ConsentState;
  hasExistingConsent: boolean;
  needsConsentBanner: boolean;
}> {
  try {
    const cookieStore = await cookies();
    const consentCookie = cookieStore.get(CONSENT_COOKIE_NAME);
    
    let initialConsentState: ConsentState = DEFAULT_CONSENT_STATE;
    let hasExistingConsent = false;
    
    if (consentCookie?.value) {
      try {
        initialConsentState = JSON.parse(consentCookie.value);
        hasExistingConsent = true;
      } catch (error) {
        console.warn('Failed to parse consent cookie:', error);
        // Fall back to default state
      }
    }
    
    // Determine if consent banner should be shown
    const needsConsentBanner = !hasExistingConsent || (
      !initialConsentState.functional &&
      !initialConsentState.analytics &&
      !initialConsentState.marketing
    );
    
    return {
      initialConsentState,
      hasExistingConsent,
      needsConsentBanner
    };
  } catch (error) {
    console.error('Server cookie initialization failed:', error);
    return {
      initialConsentState: DEFAULT_CONSENT_STATE,
      hasExistingConsent: false,
      needsConsentBanner: true
    };
  }
}

/**
 * Get server-side cookie system status for debugging
 */
export async function getCookieSystemStatus(): Promise<{
  consentCookie: string | null;
  previewMode: boolean;
  totalCookies: number;
  cookieNames: string[];
}> {
  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    
    return {
      consentCookie: cookieStore.get(CONSENT_COOKIE_NAME)?.value || null,
      previewMode: !!(cookieStore.get('__prerender_bypass') || cookieStore.get('__next_preview_data')),
      totalCookies: allCookies.length,
      cookieNames: allCookies.map(cookie => cookie.name)
    };
  } catch (error) {
    console.error('Failed to get cookie system status:', error);
    return {
      consentCookie: null,
      previewMode: false,
      totalCookies: 0,
      cookieNames: []
    };
  }
}

/**
 * Validate server-side cookie compliance
 * Checks if any non-essential cookies exist without proper consent
 */
export async function validateServerCookieCompliance(): Promise<{
  isCompliant: boolean;
  violations: string[];
  recommendations: string[];
}> {
  try {
    const cookieStore = await cookies();
    const consentCookie = cookieStore.get(CONSENT_COOKIE_NAME);
    const allCookies = cookieStore.getAll();
    
    let consentState: ConsentState = DEFAULT_CONSENT_STATE;
    
    if (consentCookie?.value) {
      try {
        consentState = JSON.parse(consentCookie.value);
      } catch {
        // Use default state if parsing fails
      }
    }
    
    const violations: string[] = [];
    const recommendations: string[] = [];
    
    // Check for common non-essential cookies that might exist without consent
    const potentialViolations = [
      { name: '_ga', category: 'analytics', requires: consentState.analytics },
      { name: '_gcl_au', category: 'marketing', requires: consentState.marketing },
      { name: 'fbp', category: 'marketing', requires: consentState.marketing },
    ];
    
    potentialViolations.forEach(({ name, category, requires }) => {
      const cookieExists = allCookies.some(cookie => cookie.name.startsWith(name));
      if (cookieExists && !requires) {
        violations.push(`${name} cookie exists without ${category} consent`);
        recommendations.push(`Remove ${name} cookie or obtain ${category} consent`);
      }
    });
    
    // Check if consent has been given but no consent cookie exists
    if (allCookies.length > 2 && !consentCookie) { // More than just essential cookies
      violations.push('Non-essential cookies may exist without consent tracking');
      recommendations.push('Implement cookie consent banner to track user preferences');
    }
    
    return {
      isCompliant: violations.length === 0,
      violations,
      recommendations
    };
  } catch (error) {
    console.error('Cookie compliance validation failed:', error);
    return {
      isCompliant: false,
      violations: ['Failed to validate cookie compliance'],
      recommendations: ['Check server-side cookie validation implementation']
    };
  }
}