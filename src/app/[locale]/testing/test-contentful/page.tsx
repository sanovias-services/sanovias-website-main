import Link from 'next/link';
import { testConnection } from '@/lib/contentful/api';

export default async function TestContentfulPage() {
  // Test the connection on the server side
  const isConnected = await testConnection();
  
  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Contentful Connection Failed</h1>
          <p className="text-gray-600 mb-4">
            Check your environment variables in .env.local
          </p>
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto">
            <h3 className="font-semibold mb-2">Required Environment Variables:</h3>
            <ul className="text-left text-sm text-gray-600 space-y-1">
              <li>✓ CONTENTFUL_SPACE_ID</li>
              <li>✓ CONTENTFUL_ACCESS_TOKEN</li>
              <li>✓ CONTENTFUL_PREVIEW_ACCESS_TOKEN</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-green-600 mb-4">Contentful Connected Successfully!</h1>
        <p className="text-gray-600 mb-8">
          Your Contentful integration is working perfectly.
        </p>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-2">Next Steps:</h3>
            <ol className="text-left text-sm text-gray-600 space-y-2">
              <li>1. Create sample content in Contentful</li>
              <li>2. Add categories, authors, and blog posts</li>
              <li>3. Test the dynamic blog pages</li>
            </ol>
          </div>
          <Link 
            href="/en/blog" 
            className="inline-block bg-[#2CA6A4] text-white px-6 py-3 rounded-lg hover:bg-[#26928F] transition-colors"
          >
            Go to Blog →
          </Link>
        </div>
      </div>
    </div>
  );
}