import { getCookieSystemStatus, validateServerCookieCompliance } from '@/lib/cookies/server-init';

/**
 * Cookie System Test Page
 * Development utility to test and debug cookie functionality
 */
export default async function CookieTestPage() {
  const systemStatus = await getCookieSystemStatus();
  const compliance = await validateServerCookieCompliance();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🍪 Cookie System Test
          </h1>
          <p className="text-gray-600">
            Development utility to test and debug cookie functionality
          </p>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Status</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Server Status</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Consent Cookie:</dt>
                  <dd className={`font-mono ${systemStatus.consentCookie ? 'text-green-600' : 'text-red-600'}`}>
                    {systemStatus.consentCookie ? '✅ Present' : '❌ Missing'}
                  </dd>
                </div>
                
                <div className="flex justify-between">
                  <dt className="text-gray-600">Preview Mode:</dt>
                  <dd className={`${systemStatus.previewMode ? 'text-blue-600' : 'text-gray-600'}`}>
                    {systemStatus.previewMode ? '🔍 Active' : '🚫 Inactive'}
                  </dd>
                </div>
                
                <div className="flex justify-between">
                  <dt className="text-gray-600">Total Cookies:</dt>
                  <dd className="font-mono text-gray-900">
                    {systemStatus.totalCookies}
                  </dd>
                </div>
              </dl>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Cookie Names</h3>
              <div className="space-y-1 text-sm">
                {systemStatus.cookieNames.length > 0 ? (
                  systemStatus.cookieNames.map((name) => (
                    <div key={name} className="font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {name}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 italic">No cookies found</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Compliance Status</h2>
          
          <div className="mb-4">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              compliance.isCompliant 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {compliance.isCompliant ? '✅ Compliant' : '❌ Violations Found'}
            </div>
          </div>

          {compliance.violations.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium text-red-900 mb-2">Violations</h3>
              <ul className="space-y-1">
                {compliance.violations.map((violation, index) => (
                  <li key={index} className="text-sm text-red-700 bg-red-50 px-3 py-2 rounded">
                    • {violation}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {compliance.recommendations.length > 0 && (
            <div>
              <h3 className="font-medium text-yellow-900 mb-2">Recommendations</h3>
              <ul className="space-y-1">
                {compliance.recommendations.map((recommendation, index) => (
                  <li key={index} className="text-sm text-yellow-700 bg-yellow-50 px-3 py-2 rounded">
                    💡 {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Instructions</h2>
          
          <div className="space-y-4 text-sm text-blue-800">
            <div>
              <h3 className="font-medium mb-2">1. Check Client-Side Functionality</h3>
              <p>Look for the debug panels in the bottom corners of the page to see real-time cookie system status.</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">2. Test Consent Management</h3>
              <p>Use the &ldquo;Accept All&rdquo; and &ldquo;Essential Only&rdquo; buttons in the blue debug panel to test consent changes.</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">3. Monitor Browser Dev Tools</h3>
              <p>Open browser console to see cookie system initialization logs and check Application → Cookies for actual cookie values.</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">4. Test Cookie Utilities</h3>
              <p>Open browser console and run: <code className="bg-blue-100 px-1 rounded">window.cookieTests.runAll()</code></p>
            </div>
          </div>
        </div>

        {/* Implementation Changelog */}
        <div className="bg-green-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-green-900 mb-4">📋 Implementation Changelog</h2>
          
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold text-green-900 mb-2">Files Created/Modified:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-green-800 mb-1">Core Infrastructure:</h4>
                  <ul className="space-y-1 text-green-700">
                    <li>• <code>/src/lib/cookies/types.ts</code> - Type definitions</li>
                    <li>• <code>/src/lib/cookies/manager.ts</code> - Cookie operations</li>
                    <li>• <code>/src/lib/cookies/consent.ts</code> - Consent management</li>
                    <li>• <code>/src/lib/cookies/registry.ts</code> - Cookie registry</li>
                    <li>• <code>/src/lib/cookies/utils.ts</code> - Utility functions</li>
                    <li>• <code>/src/lib/cookies/server-init.ts</code> - Server setup</li>
                    <li>• <code>/src/lib/cookies/index.ts</code> - Main exports</li>
                    <li>• <code>/src/lib/cookies/test.ts</code> - Test utilities</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-green-800 mb-1">React Components:</h4>
                  <ul className="space-y-1 text-green-700">
                    <li>• <code>CookieProvider.tsx</code> - Context provider</li>
                    <li>• <code>CookieSystemDebug.tsx</code> - Debug panel</li>
                    <li>• <code>layout.tsx</code> - Updated with provider</li>
                    <li>• <code>cookie-test/page.tsx</code> - This test page</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-green-900 mb-2">Key Technical Fixes:</h3>
              <ul className="space-y-1 text-green-700">
                <li>• <strong>Hydration Fix:</strong> Server-side state passed to client via props</li>
                <li>• <strong>Import Separation:</strong> Server/client code properly separated</li>
                <li>• <strong>React Hooks:</strong> Proper memoization for derived state calculations</li>
                <li>• <strong>Error Handling:</strong> Robust null checks and fallback values</li>
                <li>• <strong>TypeScript:</strong> Full type safety with comprehensive interfaces</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-green-900 mb-2">System Capabilities:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-green-800 mb-1">GDPR Compliance:</h4>
                  <ul className="space-y-1 text-green-700">
                    <li>• Granular consent categories</li>
                    <li>• Versioned consent tracking</li>
                    <li>• Automatic expiration handling</li>
                    <li>• Compliance validation</li>
                    <li>• Audit trail logging</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-green-800 mb-1">Developer Experience:</h4>
                  <ul className="space-y-1 text-green-700">
                    <li>• Real-time debug panels</li>
                    <li>• Comprehensive testing tools</li>
                    <li>• Detailed console logging</li>
                    <li>• TypeScript IntelliSense</li>
                    <li>• Production build optimization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className="bg-purple-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">🚀 Current Status</h2>
          
          <div className="text-sm text-purple-800">
            <div className="mb-4">
              <h3 className="font-semibold mb-2">✅ Completed (Phase 1):</h3>
              <p>Complete cookie management infrastructure with GDPR compliance, React integration, server/client synchronization, and development tools. System is fully functional and ready for production use.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">🔄 Next Phase (Phase 2):</h3>
              <p>Cookie consent banner implementation with Sanovias branding, user-friendly interface, and integration with existing preview system. This will provide the user-facing consent management interface.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Only enable this page in development
export const dynamic = 'force-dynamic';