import { NextRequest, NextResponse } from 'next/server';
import { previewClient } from '@/lib/contentful/client';
import { getFieldValue } from '@/lib/contentful/utils';
import { getContentfulLocale, getSupportedLocaleCodes } from '@/lib/locale-config';

/**
 * Preview Mode API Route
 * 
 * This endpoint enables Next.js preview mode for Contentful draft content.
 * It validates the secret token and content existence before enabling preview.
 * 
 * Usage: /api/blog/preview?secret=YOUR_SECRET&slug=blog-post-slug&locale=en&contentType=blogPost
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract parameters
    const secret = searchParams.get('secret');
    const slug = searchParams.get('slug');
    const locale = searchParams.get('locale') || 'en';
    const contentType = searchParams.get('contentType') || 'blogPost';
    
    // Validate required parameters
    if (!secret || !slug) {
      return NextResponse.json(
        { 
          error: 'Missing required parameters',
          required: ['secret', 'slug'],
          optional: ['locale', 'contentType']
        }, 
        { status: 400 }
      );
    }
    
    // Validate preview secret
    if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
      return NextResponse.json(
        { error: 'Invalid preview secret' }, 
        { status: 401 }
      );
    }
    
    // Validate locale
    const supportedLocales = getSupportedLocaleCodes();
    if (!supportedLocales.includes(locale)) {
      return NextResponse.json(
        { 
          error: 'Unsupported locale',
          supported: supportedLocales,
          provided: locale
        }, 
        { status: 400 }
      );
    }
    
    // Get Contentful locale format
    const contentfulLocale = getContentfulLocale(locale);
    
    try {
      // Verify the content exists in Contentful (including drafts)
      const entries = await previewClient.getEntries({
        content_type: contentType,
        'fields.slug': slug,
        locale: contentfulLocale,
        limit: 1,
        include: 0, // Minimal data for validation
      });
      
      if (!entries.items.length) {
        // Try to find in any locale if not found in specified locale
        const fallbackEntries = await previewClient.getEntries({
          content_type: contentType,
          'fields.slug': slug,
          limit: 1,
          include: 0,
        });
        
        if (!fallbackEntries.items.length) {
          return NextResponse.json(
            { 
              error: 'Content not found',
              slug,
              contentType,
              locale: contentfulLocale
            }, 
            { status: 404 }
          );
        }
      }
      
      const post = entries.items[0] || null;
      const title = post ? getFieldValue(post, 'title', contentfulLocale) : 'Draft Content';
      const status = post ? getFieldValue(post, 'status', contentfulLocale) : 'unknown';
      
      // Determine redirect URL based on content type
      let redirectUrl: string;
      switch (contentType) {
        case 'blogPost':
          redirectUrl = `/${locale}/blog/${slug}`;
          break;
        case 'page':
          redirectUrl = `/${locale}/${slug}`;
          break;
        default:
          redirectUrl = `/${locale}/blog/${slug}`; // Default to blog
      }
      
      // Create response with preview mode enabled
      const response = NextResponse.redirect(new URL(redirectUrl, request.url));
      
      // Set preview cookies with more persistent settings
      response.cookies.set('__prerender_bypass', 'true', {
        httpOnly: false, // Allow client-side access for language switcher
        sameSite: 'lax',
        secure: false, // Allow in localhost development
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
      });
      
      response.cookies.set('__next_preview_data', 'true', {
        httpOnly: false, // Allow client-side access for language switcher
        sameSite: 'lax', 
        secure: false, // Allow in localhost development
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
      });
      
      // Optional: Set custom preview info cookie for debugging
      response.cookies.set('__contentful_preview_info', JSON.stringify({
        slug,
        locale,
        contentType,
        title,
        status,
        timestamp: new Date().toISOString()
      }), {
        httpOnly: false, // Allow client-side access for debugging
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60, // 1 hour
      });
      
      return response;
      
    } catch (contentfulError) {
      console.error('Preview API: Contentful API error:', contentfulError);
      return NextResponse.json(
        { 
          error: 'Failed to validate content',
          details: process.env.NODE_ENV === 'development' ? String(contentfulError) : 'Internal server error'
        }, 
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Preview API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? String(error) : 'Something went wrong'
      }, 
      { status: 500 }
    );
  }
}

/**
 * Disable Preview Mode
 * 
 * Usage: DELETE /api/blog/preview
 */
export async function DELETE() {
  try {
    const response = NextResponse.json({ message: 'Preview mode disabled' });
    
    // Clear preview cookies
    response.cookies.delete('__prerender_bypass');
    response.cookies.delete('__next_preview_data');
    response.cookies.delete('__contentful_preview_info');
    
    return response;
    
  } catch (error) {
    console.error('Preview disable error:', error);
    return NextResponse.json(
      { error: 'Failed to disable preview mode' }, 
      { status: 500 }
    );
  }
}