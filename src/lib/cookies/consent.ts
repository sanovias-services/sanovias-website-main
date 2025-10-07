/**
 * Consent Manager
 * 
 * Handles user consent for different cookie categories,
 * ensuring GDPR compliance and proper consent tracking.
 */

import { 
  CookieCategory, 
  ConsentState, 
  CookieConsent,
  DEFAULT_CONSENT_STATE,
  CONSENT_COOKIE_NAME,
  CONSENT_PREFERENCES_KEY,
  COOKIE_POLICY_VERSION
} from './types';

export class ConsentManager {
  private static instance: ConsentManager;
  private consentState: ConsentState = DEFAULT_CONSENT_STATE;
  private listeners: Array<(state: ConsentState) => void> = [];

  private constructor() {
    this.loadConsentState();
  }

  static getInstance(): ConsentManager {
    if (!ConsentManager.instance) {
      ConsentManager.instance = new ConsentManager();
    }
    return ConsentManager.instance;
  }

  /**
   * Load consent state from cookies or localStorage
   */
  private loadConsentState(): void {
    if (typeof window === 'undefined') return;

    try {
      // Try to load from cookie first (most reliable)
      const cookieConsent = this.getCookieValue(CONSENT_COOKIE_NAME);
      if (cookieConsent) {
        this.consentState = JSON.parse(cookieConsent);
        return;
      }

      // Fallback to localStorage
      const storedConsent = localStorage.getItem(CONSENT_PREFERENCES_KEY);
      if (storedConsent) {
        this.consentState = JSON.parse(storedConsent);
        // Save to cookie for better persistence
        this.saveConsentState();
      }
    } catch (error) {
      console.warn('Failed to load consent state:', error);
      this.consentState = DEFAULT_CONSENT_STATE;
    }
  }

  /**
   * Save consent state to both cookie and localStorage
   */
  private saveConsentState(): void {
    if (typeof window === 'undefined') return;

    try {
      const consentData = JSON.stringify(this.consentState);
      
      // Save to cookie (365 days)
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      document.cookie = `${CONSENT_COOKIE_NAME}=${consentData}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
      
      // Save to localStorage as backup
      localStorage.setItem(CONSENT_PREFERENCES_KEY, consentData);
    } catch (error) {
      console.warn('Failed to save consent state:', error);
    }
  }

  /**
   * Get cookie value by name (optimized parsing)
   */
  private getCookieValue(name: string): string | null {
    if (typeof document === 'undefined') return null;
    
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  /**
   * Check if a specific cookie category has consent
   */
  hasConsent(category: CookieCategory): boolean {
    return this.consentState[category] || false;
  }

  /**
   * Get current consent state
   */
  getConsentState(): ConsentState {
    return { ...this.consentState };
  }

  /**
   * Update consent for specific categories
   */
  setConsent(categories: Partial<Omit<ConsentState, 'essential' | 'timestamp' | 'version'>>): void {
    this.consentState = {
      ...this.consentState,
      ...categories,
      essential: true, // Always true
      timestamp: new Date().toISOString(),
      version: COOKIE_POLICY_VERSION
    };

    this.saveConsentState();
    this.notifyListeners();
  }

  /**
   * Grant consent for all categories
   */
  acceptAll(): void {
    this.setConsent({
      functional: true,
      analytics: true,
      marketing: true
    });
  }

  /**
   * Deny all non-essential categories
   */
  acceptEssentialOnly(): void {
    this.setConsent({
      functional: false,
      analytics: false,
      marketing: false
    });
  }

  /**
   * Withdraw all consent (except essential)
   */
  withdrawConsent(): void {
    this.acceptEssentialOnly();
  }

  /**
   * Reset consent state to default
   */
  resetConsent(): void {
    this.consentState = { 
      ...DEFAULT_CONSENT_STATE,
      timestamp: new Date().toISOString()
    };
    this.saveConsentState();
    this.notifyListeners();
  }

  /**
   * Check if consent has been given (any non-default state)
   */
  hasGivenConsent(): boolean {
    return (
      this.consentState.functional ||
      this.consentState.analytics ||
      this.consentState.marketing ||
      this.consentState.timestamp !== DEFAULT_CONSENT_STATE.timestamp
    );
  }

  /**
   * Check if consent needs to be refreshed (version mismatch)
   */
  needsConsentRefresh(): boolean {
    return this.consentState.version !== COOKIE_POLICY_VERSION;
  }

  /**
   * Add listener for consent state changes
   */
  addListener(callback: (state: ConsentState) => void): void {
    this.listeners.push(callback);
  }

  /**
   * Remove listener
   */
  removeListener(callback: (state: ConsentState) => void): void {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  /**
   * Notify all listeners of consent state changes
   */
  private notifyListeners(): void {
    this.listeners.forEach(callback => {
      try {
        callback(this.consentState);
      } catch (error) {
        console.warn('Error in consent listener:', error);
      }
    });
  }

  /**
   * Get consent summary for analytics/debugging
   */
  getConsentSummary(): CookieConsent {
    const granted: CookieCategory[] = [];
    const denied: CookieCategory[] = [];

    Object.entries(this.consentState).forEach(([key, value]) => {
      if (key === 'timestamp' || key === 'version') return;
      
      const category = key as CookieCategory;
      if (value) {
        granted.push(category);
      } else if (category !== CookieCategory.ESSENTIAL) {
        denied.push(category);
      }
    });

    return {
      granted,
      denied,
      timestamp: this.consentState.timestamp,
      version: this.consentState.version,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined
    };
  }
}