/**
 * Contentful Preview Mode Utilities (Client-Side)
 * 
 * Client-side utilities for Contentful preview mode detection
 */

export interface PreviewInfo {
  slug: string;
  locale: string;
  contentType: string;
  title: string;
  status: string;
  timestamp: string;
}

/**
 * Contentful preview mode detection for client components
 * This is a simplified version that can be used in client components
 * 
 * Note: This function is kept for backward compatibility but is no longer
 * actively used since we now use React Context for preview state management.
 */
export function getPreviewModeFromCookies(): boolean {
  if (typeof document === 'undefined') return false;
  
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
  
  return !!(cookies['__prerender_bypass'] || cookies['__next_preview_data']);
}