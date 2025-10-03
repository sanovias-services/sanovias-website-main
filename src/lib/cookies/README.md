# Cookie Management Infrastructure

Complete cookie management system for the Sanovias website with GDPR compliance, consent management, and automated cookie classification.

## 🎯 Overview

This cookie infrastructure provides:
- **GDPR-compliant** cookie management with granular consent
- **Automatic classification** of cookies into categories (Essential, Functional, Analytics, Marketing)
- **Consent validation** preventing unauthorized cookie setting
- **High-level utilities** for common cookie operations
- **TypeScript support** with full type safety

## 📁 File Structure

```
src/lib/cookies/
├── index.ts          # Main exports and convenience functions
├── types.ts          # TypeScript interfaces and enums
├── manager.ts        # Core CookieManager class
├── consent.ts        # ConsentManager for GDPR compliance
├── registry.ts       # Predefined cookie definitions
├── utils.ts          # High-level utility functions
├── test.ts           # Test utilities and validation
└── README.md         # This documentation
```

## 🚀 Quick Start

### Basic Usage

```typescript
import { CookieManager, LanguageCookies } from '@/lib/cookies';

// Set an essential cookie (always allowed)
CookieManager.setEssential('session_id', 'abc123');

// Set a functional cookie (requires consent)
LanguageCookies.setLanguage('en');

// Get a cookie value
const language = LanguageCookies.getLanguage();
```

### Consent Management

```typescript
import { CookieManager, CookieCategory } from '@/lib/cookies';

// Check if consent is granted for a category
const hasAnalytics = CookieManager.consent.hasConsent(CookieCategory.ANALYTICS);

// Grant consent for specific categories
CookieManager.consent.setConsent({
  functional: true,
  analytics: true,
  marketing: false
});

// Accept all cookies
CookieManager.consent.acceptAll();

// Accept only essential cookies
CookieManager.consent.acceptEssentialOnly();
```

## 🏷️ Cookie Categories

### Essential (Always Allowed)
- Session management
- CSRF protection
- Preview mode (Contentful)
- Cookie consent preferences

### Functional (Requires Consent)
- Language preferences
- Theme settings
- Form auto-save
- Accessibility preferences

### Analytics (Requires Consent)
- Visitor tracking (anonymized)
- Page view analytics
- Session analytics
- Google Analytics

### Marketing (Requires Consent)
- Campaign attribution
- Lead scoring
- A/B testing
- Facebook/Google Ads pixels

## 🛠️ API Reference

### CookieManager

Main cookie management class with consent validation.

```typescript
// Basic operations
CookieManager.set(name: string, value: string, options?: CookieOptions): boolean
CookieManager.get(name: string): string | null
CookieManager.remove(name: string): void
CookieManager.exists(name: string): boolean

// Category-specific helpers
CookieManager.setEssential(name, value, options?): boolean
CookieManager.setFunctional(name, value, purpose, options?): boolean
CookieManager.setAnalytics(name, value, purpose, options?): boolean
CookieManager.setMarketing(name, value, purpose, options?): boolean

// Bulk operations
CookieManager.getAll(): Record<string, string>
CookieManager.clearAll(): void
CookieManager.clearByCategory(category: CookieCategory): void
CookieManager.validateConsent(): void
```

### ConsentManager

Handles user consent with GDPR compliance.

```typescript
// Consent checking
consent.hasConsent(category: CookieCategory): boolean
consent.getConsentState(): ConsentState
consent.hasGivenConsent(): boolean
consent.needsConsentRefresh(): boolean

// Consent management
consent.setConsent(categories: Partial<ConsentState>): void
consent.acceptAll(): void
consent.acceptEssentialOnly(): void
consent.withdrawConsent(): void
consent.resetConsent(): void

// Event handling
consent.addListener(callback: (state: ConsentState) => void): void
consent.removeListener(callback: (state: ConsentState) => void): void
```

### Utility Functions

High-level utilities for common operations.

```typescript
// Language management
LanguageCookies.setLanguage(locale: 'en' | 'de'): boolean
LanguageCookies.getLanguage(): 'en' | 'de' | null

// Theme management
ThemeCookies.setTheme(theme: 'light' | 'dark' | 'auto'): boolean
ThemeCookies.getTheme(): 'light' | 'dark' | 'auto' | null

// Form data persistence
FormCookies.saveContactForm(data: Record<string, any>): boolean
FormCookies.getContactForm(): Record<string, any> | null

// Analytics tracking
AnalyticsCookies.setVisitorId(id: string): boolean
AnalyticsCookies.trackPageView(path: string): boolean

// Marketing attribution
MarketingCookies.setUtmSource(source: string): boolean
MarketingCookies.setLeadScore(score: number): boolean

// Accessibility preferences
AccessibilityCookies.setPreferences(prefs: AccessibilityPrefs): boolean
```

## 🔒 Security & Privacy

### GDPR Compliance
- **Granular consent** for each cookie category
- **Consent withdrawal** available at any time
- **Data minimization** - only necessary cookies by default
- **Transparent purposes** for each cookie
- **Version tracking** for policy updates

### Security Features
- **HttpOnly support** for sensitive cookies
- **Secure flag** for HTTPS environments
- **SameSite protection** against CSRF
- **Domain and path** restrictions
- **Automatic validation** of consent

### Privacy-First Design
- **Opt-in by default** for non-essential cookies
- **No tracking** without explicit consent
- **Easy consent withdrawal** with one click
- **Clear cookie purposes** in plain language

## 🧪 Testing

### Running Tests

```typescript
import { runAllTests, quickTest } from '@/lib/cookies/test';

// Quick verification
quickTest();

// Complete test suite
runAllTests();

// Browser console testing
window.cookieTests.runAll();
```

### Test Categories
- Essential cookie functionality
- Consent management
- Functional cookies with consent validation
- Cookie validation and cleanup
- Utility function testing

## 📋 Implementation Checklist

### Phase 1: Infrastructure ✅
- [x] Cookie classification system
- [x] Consent management
- [x] Core cookie operations
- [x] GDPR compliance features
- [x] TypeScript types and interfaces

### Phase 2: Integration (Next)
- [ ] Cookie consent banner component
- [ ] Integration with existing preview cookies
- [ ] Language preference migration
- [ ] Form auto-save implementation

### Phase 3: Analytics & Marketing
- [ ] Google Analytics integration
- [ ] Marketing pixel integration
- [ ] A/B testing framework
- [ ] Lead scoring system

## 🔮 Future Enhancements

- **Advanced consent UI** with category descriptions
- **Cookie policy generator** with automatic updates
- **Data export functionality** for GDPR Article 15
- **Audit logging** for compliance documentation
- **Performance monitoring** for cookie impact
- **Third-party integration** helpers (GA4, FB Pixel, etc.)

## 📞 Support

For questions or issues with the cookie infrastructure:
1. Check the test utilities for debugging
2. Review the type definitions for API reference
3. Examine existing cookie definitions in registry.ts
4. Use browser dev tools to inspect cookie values and consent state

---

**Status**: ✅ Infrastructure Complete - Ready for Integration
**Next Steps**: Implement cookie consent banner and integrate with existing website features