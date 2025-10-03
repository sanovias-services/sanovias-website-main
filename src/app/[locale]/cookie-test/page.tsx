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
        <div className="bg-blue-50 rounded-lg p-6">
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
      </div>
    </div>
  );
}

// Only enable this page in development
export const dynamic = 'force-dynamic';