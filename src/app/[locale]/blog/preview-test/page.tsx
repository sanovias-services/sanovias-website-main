import Link from 'next/link';
import { isPreviewMode, getPreviewInfo } from '@/lib/contentful/preview-server';

/**
 * Preview Mode Test Page
 * 
 * This page demonstrates the preview mode functionality and provides
 * tools for content editors to test draft content.
 */
export default async function PreviewTestPage() {
  const preview = await isPreviewMode();
  const previewInfo = await getPreviewInfo();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Preview Mode Testing
          </h1>
          <p className="text-gray-600">
            Test and demonstrate Contentful preview mode functionality
          </p>
        </div>

        {/* Preview Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Status</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-gray-600 mr-3">Preview Mode:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                preview 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {preview ? 'Enabled' : 'Disabled'}
              </span>
            </div>

            {previewInfo.info && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium text-gray-900 mb-2">Preview Details</h3>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <dt className="text-gray-600">Content:</dt>
                  <dd className="text-gray-900">{previewInfo.info.title}</dd>
                  
                  <dt className="text-gray-600">Slug:</dt>
                  <dd className="text-gray-900">{previewInfo.info.slug}</dd>
                  
                  <dt className="text-gray-600">Locale:</dt>
                  <dd className="text-gray-900">{previewInfo.info.locale}</dd>
                  
                  <dt className="text-gray-600">Status:</dt>
                  <dd className="text-gray-900">{previewInfo.info.status}</dd>
                  
                  <dt className="text-gray-600">Type:</dt>
                  <dd className="text-gray-900">{previewInfo.info.contentType}</dd>
                  
                  <dt className="text-gray-600">Timestamp:</dt>
                  <dd className="text-gray-900">
                    {new Date(previewInfo.info.timestamp).toLocaleString()}
                  </dd>
                </dl>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Test Preview Mode</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">1. Manual Preview URL</h3>
              <p className="text-gray-600 mb-2">
                Use this URL format to enable preview mode for any blog post:
              </p>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">
                /api/blog/preview?secret=YOUR_SECRET&slug=blog-post-slug&locale=en
              </code>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">2. Contentful Integration</h3>
              <p className="text-gray-600 mb-2">
                In Contentful, configure the preview URL as:
              </p>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">
                https://your-domain.com/api/blog/preview?secret=YOUR_SECRET&slug={'{'}entry.fields.slug{'}'}&locale=en
              </code>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">3. Exit Preview Mode</h3>
              <p className="text-gray-600 mb-2">
                Use the banner button or call the API directly:
              </p>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">
                DELETE /api/blog/preview
              </code>
            </div>
          </div>
        </div>

        {/* Environment Check */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Environment Configuration</h2>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-gray-600 mr-3">CONTENTFUL_SPACE_ID:</span>
              <span className={`px-2 py-1 rounded text-sm ${
                process.env.CONTENTFUL_SPACE_ID 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {process.env.CONTENTFUL_SPACE_ID ? '✓ Set' : '✗ Missing'}
              </span>
            </div>

            <div className="flex items-center">
              <span className="text-gray-600 mr-3">CONTENTFUL_PREVIEW_ACCESS_TOKEN:</span>
              <span className={`px-2 py-1 rounded text-sm ${
                process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN ? '✓ Set' : '✗ Missing'}
              </span>
            </div>

            <div className="flex items-center">
              <span className="text-gray-600 mr-3">CONTENTFUL_PREVIEW_SECRET:</span>
              <span className={`px-2 py-1 rounded text-sm ${
                process.env.CONTENTFUL_PREVIEW_SECRET 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {process.env.CONTENTFUL_PREVIEW_SECRET ? '✓ Set' : '✗ Missing'}
              </span>
            </div>
          </div>
        </div>

        {/* Sample URLs */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sample Preview URLs</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Quick Test Links</h3>
              <p className="text-gray-600 mb-3">
                Click these links to test preview mode with draft content:
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <a 
                    href="http://localhost:3000/api/blog/preview?secret=preview-token-super-secret-123!&slug=draft-support-test-en&locale=en"
                    className="inline-flex items-center px-3 py-2 bg-[#2CA6A4] text-white rounded-md hover:bg-[#26928F] transition-colors text-sm"
                  >
                    Test English Draft Post
                  </a>
                  <code className="text-xs text-gray-500">draft-support-test-en</code>
                </div>
                
                <div className="flex items-center space-x-3">
                  <a 
                    href="http://localhost:3000/api/blog/preview?secret=preview-token-super-secret-123!&slug=draft-support-test-de&locale=de"
                    className="inline-flex items-center px-3 py-2 bg-[#2CA6A4] text-white rounded-md hover:bg-[#26928F] transition-colors text-sm"
                  >
                    Test German Draft Post
                  </a>
                  <code className="text-xs text-gray-500">draft-support-test-de</code>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">URL Templates</h3>
              <p className="text-gray-600 mb-3">
                Use these example URLs to test preview mode (replace YOUR_SECRET with actual secret):
              </p>
              
              <div className="space-y-2">
                <code className="block bg-gray-100 p-2 rounded text-sm font-mono">
                  /api/blog/preview?secret=YOUR_SECRET&slug=draft-support-test-en&locale=en
                </code>
                <code className="block bg-gray-100 p-2 rounded text-sm font-mono">
                  /api/blog/preview?secret=YOUR_SECRET&slug=draft-support-test-de&locale=de
                </code>
                <code className="block bg-gray-100 p-2 rounded text-sm font-mono">
                  /api/blog/preview?secret=YOUR_SECRET&slug=sample-blog-post&locale=en
                </code>
                <code className="block bg-gray-100 p-2 rounded text-sm font-mono">
                  /api/blog/preview?secret=YOUR_SECRET&slug=beispiel-blog-post&locale=de
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center space-x-4">
          <Link 
            href="../" 
            className="inline-flex items-center px-4 py-2 bg-[#2CA6A4] text-white rounded-md hover:bg-[#1C3C47] transition-colors"
          >
            ← Back to Blog
          </Link>
          <Link 
            href="../../" 
            className="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}