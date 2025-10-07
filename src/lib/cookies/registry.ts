/**
 * Sanovias Cookie Registry
 * 
 * Predefined cookie definitions for the Sanovias website.
 * This registry ensures all cookies are properly categorized
 * and compliant with GDPR requirements.
 */

import { CookieDefinition, CookieCategory } from './types';
import { CookieManager } from './manager';

/**
 * Essential Cookies - No consent required
 * These cookies are necessary for the website to function properly
 */
export const ESSENTIAL_COOKIES: CookieDefinition[] = [
  {
    name: '__prerender_bypass',
    category: CookieCategory.ESSENTIAL,
    purpose: 'Enable preview mode for content editors to view draft content (by skipping the prerendered static content and execute the page on-demand to fetch content from contentful)',
    duration: '24 hours',
    thirdParty: false,
    gdprBasis: 'necessary'
  },
  {
    name: '__next_preview_data',
    category: CookieCategory.ESSENTIAL,
    purpose: 'Store preview mode data/token for Contentful CMS integration.',
    duration: '24 hours',
    thirdParty: false,
    gdprBasis: 'necessary'
  },
  {
    name: 'sanovias_cookie_consent',
    category: CookieCategory.ESSENTIAL,
    purpose: 'Store user cookie consent preferences for GDPR compliance',
    duration: '1 year',
    thirdParty: false,
    gdprBasis: 'necessary'
  },
  {
    name: 'sanovias_session',
    category: CookieCategory.ESSENTIAL,
    purpose: 'Maintain user session for form submissions, security, authentication state, and user preferences across page reloads',
    duration: 'Session',
    thirdParty: false,
    gdprBasis: 'necessary'
  },
  {
    name: 'csrf_token',
    category: CookieCategory.ESSENTIAL,
    purpose: 'Prevent cross-site request forgery attacks e.g. on contact form submissions',
    duration: 'Session',
    thirdParty: false,
    gdprBasis: 'necessary'
  }
];

/**
 * Functional Cookies - Enhance user experience
 * These cookies improve website functionality and user experience
 */
export const FUNCTIONAL_COOKIES: CookieDefinition[] = [
  {
    name: 'sanovias_language',
    category: CookieCategory.FUNCTIONAL,
    purpose: 'Remember user preferred language (English/German)',
    duration: '1 year',
    thirdParty: false,
    gdprBasis: 'consent'
  },
  {
    name: 'sanovias_theme',
    category: CookieCategory.FUNCTIONAL,
    purpose: 'Remember user preferred theme (light/dark mode)',
    duration: '1 year',
    thirdParty: false,
    gdprBasis: 'consent'
  },
  {
    name: 'sanovias_contact_form',
    category: CookieCategory.FUNCTIONAL,
    purpose: 'Save contact form progress to prevent data loss',
    duration: '7 days',
    thirdParty: false,
    gdprBasis: 'consent'
  },
  {
    name: 'sanovias_quote_preferences',
    category: CookieCategory.FUNCTIONAL,
    purpose: 'Remember medical service preferences for quote requests',
    duration: '30 days',
    thirdParty: false,
    gdprBasis: 'consent'
  },
  {
    name: 'sanovias_accessibility',
    category: CookieCategory.FUNCTIONAL,
    purpose: 'Store accessibility preferences (font size, contrast)',
    duration: '1 year',
    thirdParty: false,
    gdprBasis: 'consent'
  }
];

/**
 * Analytics Cookies - Track website usage
 * These cookies help us understand how visitors use our website
 */
export const ANALYTICS_COOKIES: CookieDefinition[] = [
  {
    name: 'sanovias_visitor_id',
    category: CookieCategory.ANALYTICS,
    purpose: 'Identify unique visitors for analytics (anonymized)',
    duration: '2 years',
    thirdParty: false,
    gdprBasis: 'consent'
  },
  {
    name: 'sanovias_session_id',
    category: CookieCategory.ANALYTICS,
    purpose: 'Track user session for analytics purposes',
    duration: '30 minutes',
    thirdParty: false,
    gdprBasis: 'consent'
  },
  {
    name: 'sanovias_page_views',
    category: CookieCategory.ANALYTICS,
    purpose: 'Count page views to understand popular content',
    duration: 'Session',
    thirdParty: false,
    gdprBasis: 'consent'
  },
  {
    name: '_ga',
    category: CookieCategory.ANALYTICS,
    purpose: 'Google Analytics - distinguish users',
    duration: '2 years',
    thirdParty: true,
    gdprBasis: 'consent'
  },
  {
    name: '_ga_*',
    category: CookieCategory.ANALYTICS,
    purpose: 'Google Analytics - session and campaign data',
    duration: '2 years',
    thirdParty: true,
    gdprBasis: 'consent'
  }
];

/**
 * Marketing Cookies - Advertising and marketing
 * These cookies are used for marketing and advertising purposes
 */
export const MARKETING_COOKIES: CookieDefinition[] = [
  {
    name: 'sanovias_utm_source',
    category: CookieCategory.MARKETING,
    purpose: 'Track marketing campaign source for attribution',
    duration: '30 days',
    thirdParty: false,
    gdprBasis: 'consent'
  },
  {
    name: 'sanovias_lead_score',
    category: CookieCategory.MARKETING,
    purpose: 'Score visitor engagement for sales team prioritization',
    duration: '90 days',
    thirdParty: false,
    gdprBasis: 'consent'
  },
  {
    name: 'sanovias_ab_test',
    category: CookieCategory.MARKETING,
    purpose: 'Assign users to A/B testing groups for optimization',
    duration: '30 days',
    thirdParty: false,
    gdprBasis: 'consent'
  },
  {
    name: 'fbp',
    category: CookieCategory.MARKETING,
    purpose: 'Facebook Pixel - track conversions and build audiences',
    duration: '90 days',
    thirdParty: true,
    gdprBasis: 'consent'
  },
  {
    name: '_gcl_au',
    category: CookieCategory.MARKETING,
    purpose: 'Google Ads - conversion tracking and remarketing',
    duration: '90 days',
    thirdParty: true,
    gdprBasis: 'consent'
  }
];

/**
 * All cookie definitions combined
 */
export const ALL_COOKIES: CookieDefinition[] = [
  ...ESSENTIAL_COOKIES,
  ...FUNCTIONAL_COOKIES,
  ...ANALYTICS_COOKIES,
  ...MARKETING_COOKIES
];

/**
 * Initialize cookie registry
 * This function registers all predefined cookies with the CookieManager
 */
export function initializeCookieRegistry(): void {
  ALL_COOKIES.forEach(cookie => {
    CookieManager.registerCookie(cookie);
  });
}

/**
 * Get cookies by category
 */
export function getCookiesByCategory(category: CookieCategory): CookieDefinition[] {
  return ALL_COOKIES.filter(cookie => cookie.category === category);
}

/**
 * Get cookie definition by name
 */
export function getCookieDefinition(name: string): CookieDefinition | undefined {
  return ALL_COOKIES.find(cookie => cookie.name === name);
}

/**
 * Get cookie categories with counts
 */
export function getCategorySummary(): Record<CookieCategory, number> {
  return {
    [CookieCategory.ESSENTIAL]: ESSENTIAL_COOKIES.length,
    [CookieCategory.FUNCTIONAL]: FUNCTIONAL_COOKIES.length,
    [CookieCategory.ANALYTICS]: ANALYTICS_COOKIES.length,
    [CookieCategory.MARKETING]: MARKETING_COOKIES.length
  };
}