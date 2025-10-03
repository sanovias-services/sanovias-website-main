"use client";

import { useCookies, useConsent } from './CookieProvider';

/**
 * Development utility component to display cookie system status
 * Only shown in development mode for debugging purposes
 */
export function CookieSystemDebug() {
  const { isInitialized } = useCookies();
  const { consentState, hasGivenConsent, needsConsentRefresh } = useConsent();

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg text-xs font-mono max-w-sm z-50">
      <div className="font-bold mb-2">🍪 Cookie System Debug</div>
      
      <div className="space-y-1">
        <div>
          <span className="text-gray-400">Initialized:</span>{' '}
          <span className={isInitialized ? 'text-green-400' : 'text-red-400'}>
            {isInitialized ? '✅' : '❌'}
          </span>
        </div>
        
        <div>
          <span className="text-gray-400">Consent Given:</span>{' '}
          <span className={hasGivenConsent ? 'text-green-400' : 'text-yellow-400'}>
            {hasGivenConsent ? '✅' : '⚠️'}
          </span>
        </div>
        
        <div>
          <span className="text-gray-400">Needs Refresh:</span>{' '}
          <span className={needsConsentRefresh ? 'text-yellow-400' : 'text-green-400'}>
            {needsConsentRefresh ? '⚠️' : '✅'}
          </span>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-700">
        <div className="text-gray-400 mb-1">Consent Status:</div>
        <div className="grid grid-cols-2 gap-1 text-xs">
          <div>
            Essential: <span className="text-green-400">✅</span>
          </div>
          <div>
            Functional:{' '}
            <span className={consentState.functional ? 'text-green-400' : 'text-red-400'}>
              {consentState.functional ? '✅' : '❌'}
            </span>
          </div>
          <div>
            Analytics:{' '}
            <span className={consentState.analytics ? 'text-green-400' : 'text-red-400'}>
              {consentState.analytics ? '✅' : '❌'}
            </span>
          </div>
          <div>
            Marketing:{' '}
            <span className={consentState.marketing ? 'text-green-400' : 'text-red-400'}>
              {consentState.marketing ? '✅' : '❌'}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-700 text-xs text-gray-400">
        Updated: {new Date(consentState.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
}

/**
 * Simple component to test cookie functionality
 */
export function CookieSystemTester() {
  const { acceptAll, acceptEssentialOnly } = useConsent();

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-blue-900 text-white p-4 rounded-lg shadow-lg text-sm z-50">
      <div className="font-bold mb-2">🧪 Cookie Tester</div>
      
      <div className="space-y-2">
        <button
          onClick={acceptAll}
          className="block w-full bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs"
        >
          Accept All
        </button>
        
        <button
          onClick={acceptEssentialOnly}
          className="block w-full bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs"
        >
          Essential Only
        </button>
      </div>
    </div>
  );
}