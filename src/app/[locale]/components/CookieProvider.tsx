"use client";

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { 
  CookieManager, 
  initializeCookieRegistry,
  initializeCookieUtils,
  ConsentState,
  CookieCategory,
  DEFAULT_CONSENT_STATE,
  COOKIE_POLICY_VERSION
} from '@/lib/cookies';

interface CookieContextType {
  consentState: ConsentState;
  hasConsent: (category: CookieCategory) => boolean;
  setConsent: (categories: Partial<Omit<ConsentState, 'essential' | 'timestamp' | 'version'>>) => void;
  acceptAll: () => void;
  acceptEssentialOnly: () => void;
  isInitialized: boolean;
}

interface CookieProviderProps {
  children: ReactNode;
  initialConsentState?: ConsentState;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export function CookieProvider({ children, initialConsentState }: CookieProviderProps) {
  const [consentState, setConsentState] = React.useState<ConsentState>(() => 
    initialConsentState || CookieManager.consent.getConsentState()
  );
  const [isInitialized, setIsInitialized] = React.useState(false);

  useEffect(() => {
    // Initialize cookie system on client side
    const initializeCookieSystem = () => {
      try {
        // 1. Initialize cookie registry with all predefined cookies
        initializeCookieRegistry();
        console.log('✅ Cookie registry initialized');

        // 2. Initialize cookie utilities and validation
        initializeCookieUtils();
        console.log('✅ Cookie utilities initialized');

        // 3. Setup consent state listener
        const handleConsentChange = (newState: ConsentState) => {
          setConsentState(newState);
          console.log('🍪 Consent state updated:', newState);
        };

        CookieManager.consent.addListener(handleConsentChange);
        console.log('✅ Consent change listener attached');

        // 4. Sync client state with actual cookies if no initial state was provided
        // Note: initialConsentState is already used in useState initializer, 
        // so we don't need to sync here - just log the current state
        const currentConsent = CookieManager.consent.getConsentState();
        console.log('🍪 Cookie system initialized with consent:', currentConsent);

        setIsInitialized(true);

        // Cleanup function
        return () => {
          CookieManager.consent.removeListener(handleConsentChange);
        };
      } catch (error) {
        console.error('❌ Cookie system initialization failed:', error);
      }
    };

    const cleanup = initializeCookieSystem();
    
    return cleanup;
  }, []);

  const contextValue: CookieContextType = {
    consentState,
    hasConsent: (category: CookieCategory) => CookieManager.consent.hasConsent(category),
    setConsent: (categories) => CookieManager.consent.setConsent(categories),
    acceptAll: () => CookieManager.consent.acceptAll(),
    acceptEssentialOnly: () => CookieManager.consent.acceptEssentialOnly(),
    isInitialized
  };

  return (
    <CookieContext.Provider value={contextValue}>
      {children}
    </CookieContext.Provider>
  );
}

export function useCookies(): CookieContextType {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookies must be used within a CookieProvider');
  }
  return context;
}

// Helper hooks for specific functionality
export function useConsent() {
  const { consentState, hasConsent, setConsent, acceptAll, acceptEssentialOnly } = useCookies();
  
  // Calculate derived state from consent state instead of calling functions
  const hasGivenConsent = React.useMemo(() => {
    if (!consentState) return false;
    return (
      consentState.functional ||
      consentState.analytics ||
      consentState.marketing ||
      consentState.timestamp !== DEFAULT_CONSENT_STATE.timestamp
    );
  }, [consentState]);
  
  const needsConsentRefresh = React.useMemo(() => {
    if (!consentState) return false;
    return consentState.version !== COOKIE_POLICY_VERSION;
  }, [consentState]);
  
  return {
    consentState,
    hasConsent,
    setConsent,
    acceptAll,
    acceptEssentialOnly,
    hasGivenConsent: hasGivenConsent ?? false,
    needsConsentRefresh: needsConsentRefresh ?? false
  };
}

export function useCookieValue(cookieName: string) {
  const [value, setValue] = React.useState<string | null>(() => 
    CookieManager.get(cookieName)
  );

  useEffect(() => {
    // Update value when cookies change
    const checkValue = () => {
      const newValue = CookieManager.get(cookieName);
      setValue(newValue);
    };

    // Check periodically (since we can't directly listen to cookie changes)
    const interval = setInterval(checkValue, 1000);
    
    return () => clearInterval(interval);
  }, [cookieName]);

  return value;
}