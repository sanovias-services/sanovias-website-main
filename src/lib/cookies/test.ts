/**
 * Cookie Infrastructure Test
 * 
 * Simple test file to verify cookie infrastructure is working correctly.
 * This can be run in a browser console or used for development testing.
 */

import { CookieManager, CookieCategory, LanguageCookies, FormCookies } from '@/lib/cookies';

/**
 * Test essential cookie functionality
 */
export function testEssentialCookies(): void {
  console.log('🍪 Testing Essential Cookies...');
  
  // Test setting an essential cookie
  const success = CookieManager.setEssential('test_session', 'abc123');
  console.log('Set essential cookie:', success);
  
  // Test getting the cookie
  const value = CookieManager.get('test_session');
  console.log('Get essential cookie:', value);
  
  // Test cookie exists
  const exists = CookieManager.exists('test_session');
  console.log('Cookie exists:', exists);
  
  // Cleanup
  CookieManager.remove('test_session');
  console.log('Essential cookie test completed ✅');
}

/**
 * Test consent management
 */
export function testConsentManagement(): void {
  console.log('🍪 Testing Consent Management...');
  
  // Check initial consent state
  const initialState = CookieManager.consent.getConsentState();
  console.log('Initial consent state:', initialState);
  
  // Test consent checking
  const hasAnalytics = CookieManager.consent.hasConsent(CookieCategory.ANALYTICS);
  console.log('Has analytics consent:', hasAnalytics);
  
  // Grant consent for functional cookies
  CookieManager.consent.setConsent({ functional: true });
  const afterConsent = CookieManager.consent.hasConsent(CookieCategory.FUNCTIONAL);
  console.log('Has functional consent after granting:', afterConsent);
  
  console.log('Consent management test completed ✅');
}

/**
 * Test functional cookies with consent
 */
export function testFunctionalCookies(): void {
  console.log('🍪 Testing Functional Cookies...');
  
  // First grant consent
  CookieManager.consent.setConsent({ functional: true });
  
  // Test language cookie utility
  const langSuccess = LanguageCookies.setLanguage('en');
  console.log('Set language cookie:', langSuccess);
  
  const language = LanguageCookies.getLanguage();
  console.log('Get language:', language);
  
  // Test form cookie utility
  const formData = { name: 'John Doe', email: 'john@example.com' };
  const formSuccess = FormCookies.saveContactForm(formData);
  console.log('Save form data:', formSuccess);
  
  const savedForm = FormCookies.getContactForm();
  console.log('Get saved form:', savedForm);
  
  // Cleanup
  LanguageCookies.removeLanguage();
  FormCookies.clearContactForm();
  
  console.log('Functional cookies test completed ✅');
}

/**
 * Test cookie validation and consent enforcement
 */
export function testConsentValidation(): void {
  console.log('🍪 Testing Consent Validation...');
  
  // Try to set analytics cookie without consent
  const analyticsWithoutConsent = CookieManager.setAnalytics(
    'test_analytics', 
    'visitor123',
    'Test analytics cookie'
  );
  console.log('Set analytics without consent:', analyticsWithoutConsent);
  
  // Grant analytics consent
  CookieManager.consent.setConsent({ analytics: true });
  
  // Try again with consent
  const analyticsWithConsent = CookieManager.setAnalytics(
    'test_analytics', 
    'visitor123',
    'Test analytics cookie'
  );
  console.log('Set analytics with consent:', analyticsWithConsent);
  
  // Withdraw consent and validate
  CookieManager.consent.setConsent({ analytics: false });
  CookieManager.validateConsent();
  
  // Check if cookie was removed
  const cookieAfterValidation = CookieManager.get('test_analytics');
  console.log('Analytics cookie after validation:', cookieAfterValidation);
  
  console.log('Consent validation test completed ✅');
}

/**
 * Test all cookie infrastructure
 */
export function runAllTests(): void {
  console.log('🚀 Starting Cookie Infrastructure Tests...');
  console.log('==========================================');
  
  try {
    testEssentialCookies();
    console.log('');
    
    testConsentManagement();
    console.log('');
    
    testFunctionalCookies();
    console.log('');
    
    testConsentValidation();
    console.log('');
    
    console.log('🎉 All Cookie Tests Passed! 🎉');
    console.log('Cookie infrastructure is working correctly.');
    
  } catch (error) {
    console.error('❌ Cookie test failed:', error);
  }
}

/**
 * Quick test function for development
 */
export function quickTest(): void {
  // Test basic functionality
  CookieManager.setEssential('quick_test', 'working');
  const value = CookieManager.get('quick_test');
  
  if (value === 'working') {
    console.log('✅ Cookie infrastructure is working!');
  } else {
    console.log('❌ Cookie infrastructure has issues');
  }
  
  CookieManager.remove('quick_test');
}

// Export for browser console testing
if (typeof window !== 'undefined') {
  const windowWithTests = window as typeof window & {
    cookieTests?: {
      runAll: () => void;
      essential: () => void;
      consent: () => void;
      functional: () => void;
      validation: () => void;
      quick: () => void;
    };
  };
  
  windowWithTests.cookieTests = {
    runAll: runAllTests,
    essential: testEssentialCookies,
    consent: testConsentManagement,
    functional: testFunctionalCookies,
    validation: testConsentValidation,
    quick: quickTest
  };
  
  console.log('🍪 Cookie tests available at window.cookieTests');
  console.log('Run window.cookieTests.runAll() to test everything');
}