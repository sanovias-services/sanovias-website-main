"use client";

import { useState, useEffect } from 'react';
import { LanguageCookies, FormCookies } from '@/lib/cookies';
import { useCSRFToken } from '@/hooks/useCSRFToken';

export default function TestFunctionalCookiesPage() {
  const [language, setLanguage] = useState<'en' | 'de' | null>(null);
  const [formData, setFormData] = useState<Record<string, string | number | boolean> | null>(null);
  const [testMessage, setTestMessage] = useState('');
  
  const { csrfToken, loading: csrfLoading } = useCSRFToken();

  // Load initial data
  useEffect(() => {
    setLanguage(LanguageCookies.getLanguage());
    setFormData(FormCookies.getContactForm());
  }, []);

  const handleLanguageTest = (lang: 'en' | 'de') => {
    const success = LanguageCookies.setLanguage(lang);
    setLanguage(lang);
    setTestMessage(success ? `✅ Language set to ${lang}` : '❌ Failed to set language');
  };

  const handleFormTest = () => {
    const testData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      message: 'This is a test message'
    };
    
    const success = FormCookies.saveContactForm(testData);
    setFormData(testData);
    setTestMessage(success ? '✅ Form data saved' : '❌ Failed to save form data');
  };

  const handleClearForm = () => {
    FormCookies.clearContactForm();
    setFormData(null);
    setTestMessage('✅ Form data cleared');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Functional Cookies Test</h1>
      
      {/* Status Message */}
      {testMessage && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-blue-800">{testMessage}</p>
        </div>
      )}

      {/* CSRF Token Display */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">🛡️ CSRF Protection</h2>
        <div className="space-y-2">
          <p><strong>Status:</strong> {csrfLoading ? 'Loading...' : 'Ready'}</p>
          <p><strong>Token:</strong> {csrfToken ? `${csrfToken.substring(0, 20)}...` : 'Not available'}</p>
          <p className="text-sm text-gray-600">
            ✅ CSRF tokens are automatically included in form submissions for security
          </p>
        </div>
      </div>

      {/* Language Cookie Test */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">🌍 Language Cookie Test</h2>
        <div className="space-y-4">
          <p><strong>Current Language:</strong> {language || 'Not set'}</p>
          <div className="flex gap-4">
            <button
              onClick={() => handleLanguageTest('en')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Set English
            </button>
            <button
              onClick={() => handleLanguageTest('de')}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Set German
            </button>
            <button
              onClick={() => {
                LanguageCookies.removeLanguage();
                setLanguage(null);
                setTestMessage('✅ Language preference cleared');
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear Language
            </button>
          </div>
          <p className="text-sm text-gray-600">
            ✅ Language preference is integrated with middleware for automatic redirects
          </p>
        </div>
      </div>

      {/* Form Cookie Test */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">📝 Form Auto-Save Test</h2>
        <div className="space-y-4">
          <div>
            <p><strong>Saved Form Data:</strong></p>
            {formData ? (
              <pre className="bg-white p-3 rounded border text-sm mt-2">
                {JSON.stringify(formData, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-500 mt-2">No form data saved</p>
            )}
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleFormTest}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Save Test Form Data
            </button>
            <button
              onClick={handleClearForm}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear Form Data
            </button>
          </div>
          <p className="text-sm text-gray-600">
            ✅ Form data is automatically saved as users type in the contact form
          </p>
        </div>
      </div>

      {/* Implementation Status */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-green-800">✅ Implementation Status</h2>
        <div className="space-y-2 text-green-700">
          <p>✅ <strong>sanovias_language:</strong> Fully implemented with middleware integration</p>
          <p>✅ <strong>sanovias_contact_form:</strong> Implemented with auto-save functionality</p>
          <p>✅ <strong>csrf_token:</strong> Automatic security protection for all forms</p>
          <p>⏭️ <strong>sanovias_theme:</strong> Skipped - no theme system implemented yet</p>
          <p>⏭️ <strong>sanovias_accessibility:</strong> Skipped - no accessibility customization system</p>
          <p>⏭️ <strong>sanovias_quote_preferences:</strong> Skipped - as requested</p>
        </div>
      </div>
    </div>
  );
}