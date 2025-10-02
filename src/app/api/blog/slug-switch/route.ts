import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostSlugInLanguage } from '@/lib/contentful/api';
import { isLocaleSupported, getSupportedLocaleCodes } from '@/lib/locale-config';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const currentSlug = searchParams.get('currentSlug');
    const currentLocale = searchParams.get('currentLocale');
    const targetLocale = searchParams.get('targetLocale');
    const preview = searchParams.get('preview') === 'true';

    if (!currentSlug || !currentLocale || !targetLocale) {
      return NextResponse.json(
        { error: 'Missing required parameters: currentSlug, currentLocale, targetLocale' },
        { status: 400 }
      );
    }

    // Validate locales
    if (!isLocaleSupported(currentLocale) || !isLocaleSupported(targetLocale)) {
      return NextResponse.json(
        { error: `Unsupported locale. Supported locales: ${getSupportedLocaleCodes().join(', ')}` },
        { status: 400 }
      );
    }

    // If switching to the same locale, return the current slug
    if (currentLocale === targetLocale) {
      return NextResponse.json({ 
        success: true, 
        targetSlug: currentSlug,
        message: 'Same locale requested'
      });
    }

    // Get the equivalent slug in the target language
    const targetSlug = await getBlogPostSlugInLanguage(
      currentSlug,
      currentLocale,
      targetLocale,
      preview
    );

    if (targetSlug) {
      return NextResponse.json({ 
        success: true, 
        targetSlug,
        message: 'Blog post found in target language'
      });
    } else {
      // Post doesn't exist in target language, return null to indicate this
      return NextResponse.json({ 
        success: false, 
        targetSlug: null,
        message: 'Blog post not available in target language'
      });
    }
  } catch (error) {
    console.error('Error in blog slug switch API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
