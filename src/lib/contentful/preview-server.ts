import { cookies } from 'next/headers';

/**
 * Contentful Preview Mode Utilities (Server-Side)
 * 
 * Server-side utilities for detecting and managing Contentful preview mode state
 * These functions can only be used in Server Components
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
 * Check if Contentful preview mode is enabled (Server Component only)
 */
export async function isPreviewMode(): Promise<boolean> {
  const cookieStore = await cookies();
  const previewBypass = cookieStore.get('__prerender_bypass');
  const previewData = cookieStore.get('__next_preview_data');
  
  return !!(previewBypass || previewData);
}

/**
 * Get Contentful preview info from cookies (Server Component only)
 */
export async function getPreviewInfo(): Promise<{
  isEnabled: boolean;
  info?: PreviewInfo | null;
}> {
  const cookieStore = await cookies();
  const isEnabled = await isPreviewMode();
  
  if (!isEnabled) {
    return { isEnabled: false };
  }
  
  const previewInfoCookie = cookieStore.get('__contentful_preview_info');
  let info = null;
  
  if (previewInfoCookie?.value) {
    try {
      info = JSON.parse(previewInfoCookie.value);
    } catch (error) {
      console.warn('Failed to parse preview info cookie:', error);
    }
  }
  
  return { isEnabled, info };
}