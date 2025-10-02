'use client';

import { useEffect, useState } from 'react';
import { getPreviewModeFromCookies, PreviewInfo } from '@/lib/contentful/preview-utils';

/**
 * Preview Mode Banner
 * 
 * Displays a banner when preview mode is active, showing draft content status
 * and providing a way to exit preview mode.
 */
export default function PreviewBanner() {
  const [isPreview, setIsPreview] = useState(false);
  const [previewInfo, setPreviewInfo] = useState<PreviewInfo | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if preview mode is enabled
    const previewEnabled = getPreviewModeFromCookies();
    setIsPreview(previewEnabled);

    if (previewEnabled) {
      // Try to get preview info from cookie
      const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = decodeURIComponent(value || '');
        return acc;
      }, {} as Record<string, string>);

      const previewInfoCookie = cookies['__contentful_preview_info'];
      if (previewInfoCookie) {
        try {
          const info = JSON.parse(previewInfoCookie);
          setPreviewInfo(info);
        } catch (error) {
          console.warn('Failed to parse preview info:', error);
        }
      }
    }
  }, []);

  const handleExitPreview = async () => {
    setIsExiting(true);
    
    try {
      // Call the API to disable preview mode
      const response = await fetch('/api/blog/preview', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Reload the page to exit preview mode
        window.location.reload();
      } else {
        console.error('Failed to exit preview mode');
        setIsExiting(false);
      }
    } catch (error) {
      console.error('Error exiting preview mode:', error);
      setIsExiting(false);
    }
  };

  if (!isPreview) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            {/* Preview Icon */}
            <div className="flex items-center gap-2">
              <svg 
                className="w-5 h-5" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span className="font-semibold">Preview Mode</span>
            </div>

            {/* Preview Info */}
            <div className="text-sm opacity-90">
              {previewInfo ? (
                <span>
                  Viewing draft: <strong>{previewInfo.title}</strong>
                  {previewInfo.status && previewInfo.status !== 'published' && (
                    <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs uppercase font-medium">
                      {previewInfo.status}
                    </span>
                  )}
                </span>
              ) : (
                <span>Viewing unpublished content</span>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {previewInfo && (
              <div className="text-xs text-white/80">
                Last updated: {new Date(previewInfo.timestamp).toLocaleTimeString()}
              </div>
            )}
            
            <button
              onClick={handleExitPreview}
              disabled={isExiting}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 disabled:bg-white/10 disabled:cursor-not-allowed text-white rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
            >
              {isExiting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Exiting...
                </>
              ) : (
                <>
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                  Exit Preview
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}