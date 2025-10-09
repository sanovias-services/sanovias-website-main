"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCookies, useConsent } from './CookieProvider';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLocale } from './LocaleProvider';

/**
 * Cookie Consent Banner Component - Redesigned Version
 * GDPR-compliant cookie consent interface with Sanovias branding
 * Features: Accept All, Reject All, and Customize options with category toggles
 */

export function CookieConsentBanner() {
  const { isInitialized, setConsent } = useCookies();
  const { acceptAll, acceptEssentialOnly, hasGivenConsent, needsConsentRefresh } = useConsent();
  const { t } = useTranslations();
  const locale = useLocale();
  
  // Local state for banner visibility and customize modal
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  
  // Cookie category preferences (Essential always true, others default false)
  const [preferences, setPreferences] = useState({
    essential: true,      // Always true, cannot be changed
    functional: false,    // Default off
    analytics: false,     // Default off
    marketing: false      // Default off
  });

  // Show banner logic - display for users who haven't given consent
  React.useEffect(() => {
    if (isInitialized) {
      // Show if user hasn't given consent OR needs consent refresh
      const shouldShow = !hasGivenConsent || needsConsentRefresh;
      setIsVisible(shouldShow);
    } else {
      // While system is initializing, show for potential first-time visitors
      setIsVisible(true);
    }
  }, [isInitialized, hasGivenConsent, needsConsentRefresh]);

  // Only hide if explicitly set to not visible
  if (!isVisible) {
    return null;
  }

  const handleAcceptAll = () => {
    acceptAll();
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    acceptEssentialOnly();
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    // Save user's custom preferences
    setConsent({
      functional: preferences.functional,
      analytics: preferences.analytics,
      marketing: preferences.marketing
    });
    setIsVisible(false);
    setShowCustomize(false);
  };

  const togglePreference = (category: 'functional' | 'analytics' | 'marketing') => {
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };



  // Translation-aware content
  const content = {
    title: t('cookies.banner.title'),
    shortDescription: t('cookies.banner.description'),
    acceptAll: t('cookies.banner.acceptAll'),
    rejectAll: t('cookies.banner.rejectAll'),
    customize: t('cookies.banner.customize'),
    privacyPolicy: t('footer.legal.privacyPolicy'),
    cookiePolicy: t('footer.legal.cookiePolicy')
  };

  return (
    <>
      {/* Backdrop - only show when customize modal is open */}
      {showCustomize && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setShowCustomize(false)}
        />
      )}
      
      {!showCustomize ? (
        /* Main Cookie Banner - Bottom Left Corner */
        <div className="fixed bottom-6 left-6 z-50 max-w-sm w-full">
          <div className="bg-white shadow-[0_8px_28px_-6px_rgba(0,0,0,0.18)] rounded-lg border border-[rgba(0,0,0,0.06)] p-6">
            {/* Cookie Icon & Title */}
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#2CA6A4] to-[#1C3C47] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#1F2937] leading-tight" 
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                {content.title}
              </h3>
            </div>
            
            {/* Description */}
            <p className="text-sm text-[#6B7280] leading-relaxed mb-4" 
               style={{ fontFamily: 'Inter, sans-serif' }}>
              {content.shortDescription}
            </p>
            
            {/* Main Action Buttons */}
            <div className="flex gap-3 mb-3">
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-[#2CA6A4] rounded-lg hover:bg-[#26928F] hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.12)] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2CA6A4] focus:ring-offset-2"
                style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.025em' }}
              >
                {content.acceptAll}
              </button>
              
              <button
                onClick={handleRejectAll}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-[#1C3C47] bg-transparent border border-[#1C3C47] rounded-lg hover:bg-[#1C3C47] hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2CA6A4] focus:ring-offset-1"
                style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.025em' }}
              >
                {content.rejectAll}
              </button>
            </div>
            
            {/* Customize Button - Small with Gear Icon */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowCustomize(true)}
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F7F5F2] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2CA6A4] focus:ring-offset-1 rounded-md border border-[#E6E8EA]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {content.customize}
              </button>
            </div>
            
            {/* Policy Links */}
            <div className="mt-3 pt-3 border-t border-[rgba(0,0,0,0.06)] text-center">
              <div className="flex justify-center gap-3 text-xs">
                <Link 
                  href={`/${locale}/policies/cookie`}
                  className="text-[#2CA6A4] hover:text-[#26928F] font-medium transition-colors duration-200"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {content.cookiePolicy}
                </Link>
                <span className="text-[#6B7280]">•</span>
                <Link 
                  href={`/${locale}/policies/privacy`}
                  className="text-[#2CA6A4] hover:text-[#26928F] font-medium transition-colors duration-200"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {content.privacyPolicy}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Customize Modal - Centered */
        <div className="fixed inset-4 z-50 flex items-center justify-center">
          <div className="bg-white shadow-[0_8px_28px_-6px_rgba(0,0,0,0.18)] rounded-lg border border-[rgba(0,0,0,0.06)] max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-semibold text-[#1F2937]" 
                    style={{ fontFamily: 'Playfair Display, serif' }}>
                  {content.customize}
                </h2>
                <button
                  onClick={() => setShowCustomize(false)}
                  className="p-3 text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F7F5F2] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2CA6A4] rounded-lg"
                  aria-label="Close settings"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Cookie Categories */}
              <div className="space-y-4">
                {/* Essential Cookies - Always On */}
                <div className="bg-[#F7F5F2] rounded-lg p-4 border border-[rgba(0,0,0,0.04)]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-[#1F2937]">{t('cookies.categories.essential.title')}</h3>
                    <div className="flex items-center">
                      <span className="text-xs text-[#6B7280] font-medium mr-3 uppercase tracking-wider">{t('cookies.banner.alwaysActive')}</span>
                      <div className="w-11 h-6 bg-[#2CA6A4] rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    {t('cookies.categories.essential.description')}
                  </p>
                </div>
                
                {/* Functional Cookies */}
                <div className="bg-white rounded-lg p-4 border border-[rgba(0,0,0,0.06)]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-[#1F2937]">{t('cookies.categories.functional.title')}</h3>
                    <button
                      onClick={() => togglePreference('functional')}
                      className={`w-11 h-6 rounded-full relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2CA6A4] focus:ring-offset-2 ${
                        preferences.functional ? 'bg-[#2CA6A4]' : 'bg-gray-200'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 shadow-sm ${
                        preferences.functional ? 'translate-x-5' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    {t('cookies.categories.functional.description')}
                  </p>
                </div>
                
                {/* Analytics Cookies */}
                <div className="bg-white rounded-lg p-4 border border-[rgba(0,0,0,0.06)]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-[#1F2937]">{t('cookies.categories.analytics.title')}</h3>
                    <button
                      onClick={() => togglePreference('analytics')}
                      className={`w-11 h-6 rounded-full relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2CA6A4] focus:ring-offset-2 ${
                        preferences.analytics ? 'bg-[#2CA6A4]' : 'bg-gray-200'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 shadow-sm ${
                        preferences.analytics ? 'translate-x-5' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    {t('cookies.categories.analytics.description')}
                  </p>
                </div>
                
                {/* Marketing Cookies */}
                <div className="bg-white rounded-lg p-4 border border-[rgba(0,0,0,0.06)]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-[#1F2937]">{t('cookies.categories.marketing.title')}</h3>
                    <button
                      onClick={() => togglePreference('marketing')}
                      className={`w-11 h-6 rounded-full relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2CA6A4] focus:ring-offset-2 ${
                        preferences.marketing ? 'bg-[#2CA6A4]' : 'bg-gray-200'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 shadow-sm ${
                        preferences.marketing ? 'translate-x-5' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    {t('cookies.categories.marketing.description')}
                  </p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[rgba(0,0,0,0.06)] mt-6">
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-6 py-3 text-sm font-semibold text-white bg-[#2CA6A4] rounded-lg hover:bg-[#26928F] hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.12)] active:scale-[0.97] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2CA6A4] focus:ring-offset-2"
                >
                  {t('cookies.banner.save')}
                </button>
                <button
                  onClick={() => setShowCustomize(false)}
                  className="flex-1 px-6 py-3 text-sm font-medium text-[#1C3C47] bg-transparent border border-[#1C3C47] rounded-lg hover:bg-[#1C3C47] hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2CA6A4] focus:ring-offset-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function useCookieConsentBanner() {
  const { hasGivenConsent, needsConsentRefresh } = useConsent();
  
  const shouldShowBanner = React.useMemo(() => {
    return !hasGivenConsent || needsConsentRefresh;
  }, [hasGivenConsent, needsConsentRefresh]);
  
  return {
    shouldShowBanner,
    needsConsent: !hasGivenConsent,
    needsRefresh: needsConsentRefresh
  };
}