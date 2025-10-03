/**
 * Cookie Manager
 * 
 * Main cookie management class that handles cookie operations
 * with consent checking and GDPR compliance.
 */

import { 
  CookieOptions, 
  CookieCategory, 
  CookieDefinition,
  StoredCookieInfo
} from './types';
import { ConsentManager } from './consent';

export class CookieManager {
  static consent = ConsentManager.getInstance();
  private static cookieRegistry: Map<string, CookieDefinition> = new Map();

  /**
   * Register a cookie definition for compliance tracking
   */
  static registerCookie(definition: CookieDefinition): void {
    this.cookieRegistry.set(definition.name, definition);
  }

  /**
   * Set a cookie with consent checking
   */
  static set(name: string, value: string, options: CookieOptions = {}): boolean {
    if (typeof document === 'undefined') return false;

    // Get cookie definition if registered
    const definition = this.cookieRegistry.get(name);
    
    // Check consent for non-essential cookies
    if (definition && definition.category !== CookieCategory.ESSENTIAL) {
      if (!this.consent.hasConsent(definition.category)) {
        console.warn(`Cookie "${name}" blocked: no consent for category "${definition.category}"`);
        return false;
      }
    }

    try {
      // Build cookie string
      let cookieString = `${name}=${encodeURIComponent(value)}`;

      // Add options
      if (options.expires) {
        cookieString += `; expires=${options.expires.toUTCString()}`;
      }

      if (options.maxAge) {
        cookieString += `; max-age=${options.maxAge}`;
      }

      if (options.domain) {
        cookieString += `; domain=${options.domain}`;
      }

      if (options.path) {
        cookieString += `; path=${options.path}`;
      } else {
        cookieString += `; path=/`;
      }

      if (options.secure) {
        cookieString += `; secure`;
      }

      if (options.httpOnly) {
        cookieString += `; httponly`;
      }

      if (options.sameSite) {
        cookieString += `; samesite=${options.sameSite}`;
      }

      document.cookie = cookieString;
      return true;
    } catch (error) {
      console.error(`Failed to set cookie "${name}":`, error);
      return false;
    }
  }

  /**
   * Get a cookie value
   */
  static get(name: string): string | null {
    if (typeof document === 'undefined') return null;

    try {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        const cookieValue = parts.pop()?.split(';').shift();
        return cookieValue ? decodeURIComponent(cookieValue) : null;
      }
      return null;
    } catch (error) {
      console.error(`Failed to get cookie "${name}":`, error);
      return null;
    }
  }

  /**
   * Remove a cookie
   */
  static remove(name: string, options: Partial<CookieOptions> = {}): void {
    this.set(name, '', {
      ...options,
      expires: new Date(0),
      maxAge: 0
    });
  }

  /**
   * Check if a cookie exists
   */
  static exists(name: string): boolean {
    return this.get(name) !== null;
  }

  /**
   * Get all cookies as an object
   */
  static getAll(): Record<string, string> {
    if (typeof document === 'undefined') return {};

    try {
      const cookies: Record<string, string> = {};
      document.cookie.split(';').forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name && value) {
          cookies[name] = decodeURIComponent(value);
        }
      });
      return cookies;
    } catch (error) {
      console.error('Failed to get all cookies:', error);
      return {};
    }
  }

  /**
   * Clear all cookies for the current domain
   */
  static clearAll(): void {
    const cookies = this.getAll();
    Object.keys(cookies).forEach(name => {
      this.remove(name);
    });
  }

  /**
   * Clear cookies by category (respecting consent)
   */
  static clearByCategory(category: CookieCategory): void {
    this.cookieRegistry.forEach((definition, name) => {
      if (definition.category === category) {
        this.remove(name);
      }
    });
  }

  /**
   * Get cookie information for compliance
   */
  static getCookieInfo(name: string): StoredCookieInfo | null {
    const value = this.get(name);
    if (!value) return null;

    const definition = this.cookieRegistry.get(name);
    if (!definition) return null;

    return {
      name,
      value,
      category: definition.category,
      purpose: definition.purpose,
      createdAt: new Date().toISOString()
    };
  }

  /**
   * Get all registered cookie definitions
   */
  static getRegisteredCookies(): CookieDefinition[] {
    return Array.from(this.cookieRegistry.values());
  }

  /**
   * Get cookies by category
   */
  static getCookiesByCategory(category: CookieCategory): CookieDefinition[] {
    return this.getRegisteredCookies().filter(def => def.category === category);
  }

  /**
   * Validate current cookies against consent
   */
  static validateConsent(): void {
    this.cookieRegistry.forEach((definition, name) => {
      if (definition.category !== CookieCategory.ESSENTIAL) {
        if (!this.consent.hasConsent(definition.category)) {
          this.remove(name);
        }
      }
    });
  }

  /**
   * Set a cookie with automatic consent checking and registration
   */
  static setWithDefinition(
    definition: CookieDefinition,
    value: string,
    options: CookieOptions = {}
  ): boolean {
    // Register the cookie definition
    this.registerCookie(definition);
    
    // Set the cookie
    return this.set(definition.name, value, options);
  }

  /**
   * Helper method for setting essential cookies (always allowed)
   */
  static setEssential(name: string, value: string, options: CookieOptions = {}): boolean {
    const definition: CookieDefinition = {
      name,
      category: CookieCategory.ESSENTIAL,
      purpose: 'Essential website functionality',
      duration: options.maxAge ? `${options.maxAge} seconds` : 'Session',
      thirdParty: false,
      gdprBasis: 'necessary'
    };

    return this.setWithDefinition(definition, value, options);
  }

  /**
   * Helper method for setting functional cookies
   */
  static setFunctional(
    name: string, 
    value: string, 
    purpose: string,
    options: CookieOptions = {}
  ): boolean {
    const definition: CookieDefinition = {
      name,
      category: CookieCategory.FUNCTIONAL,
      purpose,
      duration: options.maxAge ? `${options.maxAge} seconds` : 'Session',
      thirdParty: false,
      gdprBasis: 'consent'
    };

    return this.setWithDefinition(definition, value, options);
  }

  /**
   * Helper method for setting analytics cookies
   */
  static setAnalytics(
    name: string, 
    value: string, 
    purpose: string,
    options: CookieOptions = {}
  ): boolean {
    const definition: CookieDefinition = {
      name,
      category: CookieCategory.ANALYTICS,
      purpose,
      duration: options.maxAge ? `${options.maxAge} seconds` : 'Session',
      thirdParty: false,
      gdprBasis: 'consent'
    };

    return this.setWithDefinition(definition, value, options);
  }

  /**
   * Helper method for setting marketing cookies
   */
  static setMarketing(
    name: string, 
    value: string, 
    purpose: string,
    options: CookieOptions = {}
  ): boolean {
    const definition: CookieDefinition = {
      name,
      category: CookieCategory.MARKETING,
      purpose,
      duration: options.maxAge ? `${options.maxAge} seconds` : 'Session',
      thirdParty: false,
      gdprBasis: 'consent'
    };

    return this.setWithDefinition(definition, value, options);
  }
}