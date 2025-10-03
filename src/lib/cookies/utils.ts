/**
 * Cookie Utilities
 * 
 * Utility functions for common cookie operations in the Sanovias website.
 * These functions provide high-level interfaces for typical use cases.
 */

import { CookieManager } from './manager';
import { CookieCategory } from './types';

/**
 * Language Cookie Management
 */
export const LanguageCookies = {
  /**
   * Set user's preferred language
   */
  setLanguage(locale: 'en' | 'de'): boolean {
    return CookieManager.setFunctional(
      'sanovias_language',
      locale,
      'User preferred language for website content',
      {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax'
      }
    );
  },

  /**
   * Get user's preferred language
   */
  getLanguage(): 'en' | 'de' | null {
    const language = CookieManager.get('sanovias_language');
    return language === 'en' || language === 'de' ? language : null;
  },

  /**
   * Remove language preference
   */
  removeLanguage(): void {
    CookieManager.remove('sanovias_language');
  }
};

/**
 * Theme Cookie Management
 */
export const ThemeCookies = {
  /**
   * Set user's preferred theme
   */
  setTheme(theme: 'light' | 'dark' | 'auto'): boolean {
    return CookieManager.setFunctional(
      'sanovias_theme',
      theme,
      'User preferred theme (light/dark mode)',
      {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax'
      }
    );
  },

  /**
   * Get user's preferred theme
   */
  getTheme(): 'light' | 'dark' | 'auto' | null {
    const theme = CookieManager.get('sanovias_theme');
    return theme === 'light' || theme === 'dark' || theme === 'auto' ? theme : null;
  },

  /**
   * Remove theme preference
   */
  removeTheme(): void {
    CookieManager.remove('sanovias_theme');
  }
};

/**
 * Form Data Cookie Management
 */
export const FormCookies = {
  /**
   * Save contact form data
   */
  saveContactForm(formData: Record<string, string | number | boolean>): boolean {
    return CookieManager.setFunctional(
      'sanovias_contact_form',
      JSON.stringify(formData),
      'Save contact form progress to prevent data loss',
      {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'strict'
      }
    );
  },

  /**
   * Get saved contact form data
   */
  getContactForm(): Record<string, string | number | boolean> | null {
    const formData = CookieManager.get('sanovias_contact_form');
    if (!formData) return null;
    
    try {
      return JSON.parse(formData);
    } catch {
      return null;
    }
  },

  /**
   * Clear saved contact form data
   */
  clearContactForm(): void {
    CookieManager.remove('sanovias_contact_form');
  },

  /**
   * Save quote preferences
   */
  saveQuotePreferences(preferences: Record<string, string | number | boolean>): boolean {
    return CookieManager.setFunctional(
      'sanovias_quote_preferences',
      JSON.stringify(preferences),
      'Remember medical service preferences for quote requests',
      {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: 'lax'
      }
    );
  },

  /**
   * Get saved quote preferences
   */
  getQuotePreferences(): Record<string, string | number | boolean> | null {
    const preferences = CookieManager.get('sanovias_quote_preferences');
    if (!preferences) return null;
    
    try {
      return JSON.parse(preferences);
    } catch {
      return null;
    }
  },

  /**
   * Clear quote preferences
   */
  clearQuotePreferences(): void {
    CookieManager.remove('sanovias_quote_preferences');
  }
};

/**
 * Analytics Cookie Management
 */
export const AnalyticsCookies = {
  /**
   * Set visitor ID for analytics
   */
  setVisitorId(visitorId: string): boolean {
    return CookieManager.setAnalytics(
      'sanovias_visitor_id',
      visitorId,
      'Identify unique visitors for analytics (anonymized)',
      {
        maxAge: 60 * 60 * 24 * 365 * 2, // 2 years
        sameSite: 'lax'
      }
    );
  },

  /**
   * Get visitor ID
   */
  getVisitorId(): string | null {
    return CookieManager.get('sanovias_visitor_id');
  },

  /**
   * Set session ID for analytics
   */
  setSessionId(sessionId: string): boolean {
    return CookieManager.setAnalytics(
      'sanovias_session_id',
      sessionId,
      'Track user session for analytics purposes',
      {
        maxAge: 60 * 30, // 30 minutes
        sameSite: 'lax'
      }
    );
  },

  /**
   * Get session ID
   */
  getSessionId(): string | null {
    return CookieManager.get('sanovias_session_id');
  },

  /**
   * Track page view
   */
  trackPageView(path: string): boolean {
    const currentViews = CookieManager.get('sanovias_page_views');
    const viewsArray = currentViews ? JSON.parse(currentViews) : [];
    viewsArray.push({ path, timestamp: new Date().toISOString() });
    
    // Keep only last 50 page views
    const recentViews = viewsArray.slice(-50);
    
    return CookieManager.setAnalytics(
      'sanovias_page_views',
      JSON.stringify(recentViews),
      'Count page views to understand popular content',
      {
        // Session cookie
        sameSite: 'lax'
      }
    );
  },

  /**
   * Get page views
   */
  getPageViews(): Array<{ path: string; timestamp: string }> {
    const views = CookieManager.get('sanovias_page_views');
    if (!views) return [];
    
    try {
      return JSON.parse(views);
    } catch {
      return [];
    }
  }
};

/**
 * Marketing Cookie Management
 */
export const MarketingCookies = {
  /**
   * Set UTM source for campaign tracking
   */
  setUtmSource(source: string, medium?: string, campaign?: string): boolean {
    const utmData = {
      source,
      medium: medium || '',
      campaign: campaign || '',
      timestamp: new Date().toISOString()
    };

    return CookieManager.setMarketing(
      'sanovias_utm_source',
      JSON.stringify(utmData),
      'Track marketing campaign source for attribution',
      {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: 'lax'
      }
    );
  },

  /**
   * Get UTM source data
   */
  getUtmSource(): { source: string; medium: string; campaign: string; timestamp: string } | null {
    const utmData = CookieManager.get('sanovias_utm_source');
    if (!utmData) return null;
    
    try {
      return JSON.parse(utmData);
    } catch {
      return null;
    }
  },

  /**
   * Set lead score
   */
  setLeadScore(score: number): boolean {
    return CookieManager.setMarketing(
      'sanovias_lead_score',
      score.toString(),
      'Score visitor engagement for sales team prioritization',
      {
        maxAge: 60 * 60 * 24 * 90, // 90 days
        sameSite: 'lax'
      }
    );
  },

  /**
   * Get lead score
   */
  getLeadScore(): number {
    const score = CookieManager.get('sanovias_lead_score');
    return score ? parseInt(score, 10) || 0 : 0;
  },

  /**
   * Increment lead score
   */
  incrementLeadScore(points: number): boolean {
    const currentScore = this.getLeadScore();
    return this.setLeadScore(currentScore + points);
  }
};

/**
 * Accessibility Cookie Management
 */
export const AccessibilityCookies = {
  /**
   * Set accessibility preferences
   */
  setPreferences(preferences: {
    fontSize?: 'small' | 'medium' | 'large';
    contrast?: 'normal' | 'high';
    reducedMotion?: boolean;
  }): boolean {
    return CookieManager.setFunctional(
      'sanovias_accessibility',
      JSON.stringify(preferences),
      'Store accessibility preferences (font size, contrast, motion)',
      {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax'
      }
    );
  },

  /**
   * Get accessibility preferences
   */
  getPreferences(): {
    fontSize?: 'small' | 'medium' | 'large';
    contrast?: 'normal' | 'high';
    reducedMotion?: boolean;
  } | null {
    const preferences = CookieManager.get('sanovias_accessibility');
    if (!preferences) return null;
    
    try {
      return JSON.parse(preferences);
    } catch {
      return null;
    }
  },

  /**
   * Update specific accessibility preference
   */
  updatePreference(
    key: keyof { fontSize?: 'small' | 'medium' | 'large'; contrast?: 'normal' | 'high'; reducedMotion?: boolean }, 
    value: 'small' | 'medium' | 'large' | 'normal' | 'high' | boolean
  ): boolean {
    const current = this.getPreferences() || {};
    (current as Record<string, unknown>)[key] = value;
    return this.setPreferences(current);
  }
};

/**
 * Utility function to check if a specific cookie category is consented
 */
export function hasCategoryConsent(category: CookieCategory): boolean {
  return CookieManager.consent.hasConsent(category);
}

/**
 * Utility function to clear all cookies of a specific category
 */
export function clearCategoryData(category: CookieCategory): void {
  CookieManager.clearByCategory(category);
}

/**
 * Initialize all cookie utilities
 */
export function initializeCookieUtils(): void {
  // Validate existing cookies against current consent
  CookieManager.validateConsent();
  
  // Set up consent change listeners
  CookieManager.consent.addListener((consentState) => {
    // Clear cookies for categories that lost consent
    Object.entries(consentState).forEach(([category, hasConsent]) => {
      if (!hasConsent && category !== 'essential' && category !== 'timestamp' && category !== 'version') {
        clearCategoryData(category as CookieCategory);
      }
    });
  });
}