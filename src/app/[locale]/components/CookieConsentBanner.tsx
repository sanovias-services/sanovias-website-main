"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCookies, useConsent } from './CookieProvider';
import { useTranslations } from '../../../hooks/useTranslations';

/**
 * Cookie Consent Banner Component - Compact Corner Version
 * GDPR-compliant cookie consent interface with Sanovias branding
 * Locale-aware with full internationalization support
 */

export function CookieConsentBanner() {
  const { isInitialized } = useCookies();
  const { acceptAll, acceptEssentialOnly, hasGivenConsent, needsConsentRefresh } = useConsent();
  const { t } = useTranslations();
  
  // Local state for banner visibility and advanced settings
  const [isVisible, setIsVisible] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

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
    // For now, just accept essential only when saving preferences
    acceptEssentialOnly();
    setIsVisible(false);
    setShowAdvanced(false);
  };



  // Translation-aware content
  const content = {
    title: t('cookies.banner.title'),
    shortDescription: t('cookies.banner.description'),
    acceptAll: t('cookies.banner.acceptAll'),
    rejectAll: t('cookies.banner.rejectAll'),
    customize: t('cookies.banner.customize'),
    privacyPolicy: t('footer.legal.privacyPolicy')
  };

  return (
    <>
      {/* Backdrop - only show when advanced settings are open */}
      {showAdvanced && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setShowAdvanced(false)}
        />
      )}
      
      {!showAdvanced ? (
        /* Compact Corner Banner - Bottom Left */
        <div className="fixed bottom-6 left-6 z-50 max-w-sm transform transition-all duration-500 ease-out">
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
            
            {/* Compact Description */}
            <p className="text-sm text-[#6B7280] leading-relaxed mb-4" 
               style={{ fontFamily: 'Inter, sans-serif' }}>
              {content.shortDescription}
            </p>
            
            {/* Action Buttons - Compact Layout */}
            <div className="space-y-2">
              {/* Accept All - Primary */}
              <button
                onClick={handleAcceptAll}
                className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-[#2CA6A4] rounded-lg hover:bg-[#26928F] hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.12)] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2CA6A4] focus:ring-offset-2"
                style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.025em' }}
              >
                {content.acceptAll}
              </button>
              
              {/* Bottom Row - Reject & Settings */}
              <div className="flex gap-2">
                <button
                  onClick={handleRejectAll}
                  className="flex-1 px-3 py-2 text-xs font-medium text-[#1C3C47] bg-transparent border border-[#1C3C47] rounded-lg hover:bg-[#1C3C47] hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2CA6A4] focus:ring-offset-1"
                  style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.025em' }}
                >
                  {content.rejectAll}
                </button>
                
                <button
                  onClick={() => setShowAdvanced(true)}
                  className="flex-1 px-3 py-2 text-xs font-medium text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F7F5F2] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2CA6A4] focus:ring-offset-1 rounded-lg border border-[#E6E8EA]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {content.customize}
                </button>
              </div>
            </div>
            
            {/* Privacy Policy Link - Compact */}
            <div className="mt-3 pt-3 border-t border-[rgba(0,0,0,0.06)]">
              <Link 
                href="/privacy-policy" 
                className="text-xs text-[#2CA6A4] hover:text-[#26928F] font-medium transition-colors duration-200"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {content.privacyPolicy} →
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Advanced Settings Modal - Centered */
        <div className="fixed inset-4 z-50 flex items-center justify-center">
          <div className="bg-white shadow-[0_8px_28px_-6px_rgba(0,0,0,0.18)] rounded-lg border border-[rgba(0,0,0,0.06)] max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-semibold text-[#1F2937]" 
                    style={{ fontFamily: 'Playfair Display, serif' }}>
                  {content.title}
                </h2>
                <button
                  onClick={() => setShowAdvanced(false)}
                  className="p-3 text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F7F5F2] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2CA6A4] rounded-lg"
                  aria-label="Close settings"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Essential Cookies */}
              <div className="bg-[#F7F5F2] rounded-lg p-6 border border-[rgba(0,0,0,0.04)] mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#1F2937]">{t('cookies.categories.essential.title')}</h3>
                  <div className="flex items-center">
                    <span className="text-xs text-[#6B7280] font-medium mr-4 uppercase tracking-wider">{t('cookies.banner.alwaysActive')}</span>
                    <div className="w-12 h-6 bg-[#2CA6A4] rounded-full flex items-center shadow-sm">
                      <div className="w-5 h-5 bg-white rounded-full ml-6 shadow-sm"></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {t('cookies.categories.essential.description')}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[rgba(0,0,0,0.06)]">
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-6 py-3 text-sm font-semibold text-white bg-[#2CA6A4] rounded-lg hover:bg-[#26928F] hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.12)] active:scale-[0.97] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2CA6A4] focus:ring-offset-2"
                >
                  {t('cookies.banner.save')}
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