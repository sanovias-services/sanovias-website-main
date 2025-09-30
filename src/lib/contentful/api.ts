import client, { previewClient } from './client';
import { getContentfulLocale } from '../locale-config';

/**
 * Get all published blog posts
 */
export async function getAllBlogPosts(
  locale: string = 'en-US',
  preview: boolean = false
) {
  try {
    const contentfulClient = preview ? previewClient : client;
    // Use dynamic locale mapping
    const contentfulLocale = locale.includes('-') ? locale : getContentfulLocale(locale);
    
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      locale: contentfulLocale,
      include: 2,
      order: ['-fields.publishDate'],
      ...(preview ? {} : { 'fields.status': 'published' }),
    });
    
    return entries.items;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(
  slug: string,
  locale: string = 'en-US',
  preview: boolean = false
) {
  try {
    const contentfulClient = preview ? previewClient : client;
    const contentfulLocale = locale.includes('-') ? locale : getContentfulLocale(locale);
    
    // First, try to find the post in the requested locale
    let entries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      locale: contentfulLocale,
      include: 2,
      limit: 1,
      ...(preview ? {} : { 'fields.status': 'published' }),
    });
    
    if (entries.items.length > 0) {
      return entries.items[0];
    }
    
    // If not found in requested locale, try fallback (default to en-US)
    const fallbackLocale = getContentfulLocale('en'); // Always fallback to English
    entries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      locale: fallbackLocale,
      include: 2,
      limit: 1,
      ...(preview ? {} : { 'fields.status': 'published' }),
    });
    
    return entries.items[0] || null;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
}

/**
 * Get blog posts by category
 */
export async function getBlogPostsByCategory(
  categorySlug: string,
  locale: string = 'en-US',
  preview: boolean = false
) {
  try {
    const contentfulClient = preview ? previewClient : client;
    const contentfulLocale = locale.includes('-') ? locale : getContentfulLocale(locale);
    
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      'fields.category.fields.slug': categorySlug,
      locale: contentfulLocale,
      include: 2,
      order: ['-fields.publishDate'],
      ...(preview ? {} : { 'fields.status': 'published' }),
    });
    
    return entries.items;
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    return [];
  }
}

/**
 * Get featured blog posts
 */
export async function getFeaturedBlogPosts(
  locale: string = 'en-US',
  limit: number = 3,
  preview: boolean = false
) {
  try {
    const contentfulClient = preview ? previewClient : client;
    const contentfulLocale = locale === 'de' ? 'de-DE' : 'en-US';
    
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      'fields.featured': true,
      locale: contentfulLocale,
      include: 2,
      order: ['-fields.publishDate'],
      limit,
      ...(preview ? {} : { 'fields.status': 'published' }),
    });
    
    return entries.items;
  } catch (error) {
    console.error('Error fetching featured blog posts:', error);
    return [];
  }
}

/**
 * Get all categories
 */
export async function getAllCategories(
  locale: string = 'en-US'
) {
  try {
    // Try common German locale codes first, then fallback to en-US  
    const contentfulLocale = locale === 'de' ? 'de-DE' : 'en-US';
    
    const entries = await client.getEntries({
      content_type: 'category',
      locale: contentfulLocale,
      order: ['fields.name'],
    });
    
    return entries.items;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(
  slug: string,
  locale: string = 'en-US'
) {
  try {
    const contentfulLocale = locale === 'de' ? 'de-DE' : 'en-US';
    
    const entries = await client.getEntries({
      content_type: 'category',
      'fields.slug': slug,
      locale: contentfulLocale,
      limit: 1,
    });
    
    return entries.items[0] || null;
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    return null;
  }
}

/**
 * Get all authors
 */
export async function getAllAuthors(
  locale: string = 'en-US'
) {
  try {
    const contentfulLocale = locale === 'de' ? 'de-DE' : 'en-US';
    
    const entries = await client.getEntries({
      content_type: 'author',
      locale: contentfulLocale,
      order: ['fields.name'],
    });
    
    return entries.items;
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
}

/**
 * Search blog posts by title or content
 */
export async function searchBlogPosts(
  query: string,
  locale: string = 'en-US',
  preview: boolean = false
) {
  try {
    const contentfulClient = preview ? previewClient : client;
    const contentfulLocale = locale === 'de' ? 'de-DE' : 'en-US';
    
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      query: query,
      locale: contentfulLocale,
      include: 2,
      order: ['-fields.publishDate'],
      ...(preview ? {} : { 'fields.status': 'published' }),
    });
    
    return entries.items;
  } catch (error) {
    console.error('Error searching blog posts:', error);
    return [];
  }
}

/**
 * Get available locales from Contentful space
 */

/**
 * Test connection to Contentful
 */
/**
 * Test connection to Contentful and show available locales
 */
export async function testConnection() {
  try {
    const space = await client.getSpace();
    console.log('✅ Contentful connection successful!', {
      spaceName: space.name,
      spaceId: space.sys.id,
    });
    
    // Log available locales
    const locales = space.locales || [];
    const localeInfo = locales.map((locale) => ({
      code: locale.code,
      name: locale.name,
      default: locale.default,
      fallback: locale.fallbackCode
    }));
    console.log('📍 Available locales in Contentful:', localeInfo);
    
    return true;
  } catch (error) {
    console.error('❌ Contentful connection failed:', error);
    return false;
  }
}

/**
 * Get blog post slug in target language by finding the same entry
 */
export async function getBlogPostSlugInLanguage(
  currentSlug: string,
  currentLocale: string,
  targetLocale: string,
  preview: boolean = false
): Promise<string | null> {
  try {
    const contentfulClient = preview ? previewClient : client;
    const currentContentfulLocale = getContentfulLocale(currentLocale);
    const targetContentfulLocale = getContentfulLocale(targetLocale);
    
    // First, find the blog post in the current language to get its entry ID
    const currentEntries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      'fields.slug': currentSlug,
      locale: currentContentfulLocale,
      limit: 1,
      ...(preview ? {} : { 'fields.status': 'published' }),
    });
    
    if (currentEntries.items.length === 0) {
      console.warn(`Blog post with slug "${currentSlug}" not found in locale "${currentContentfulLocale}"`);
      return null;
    }
    
    const entryId = currentEntries.items[0].sys.id;
    
    // Now get the same entry in the target language
    try {
      const targetEntry = await contentfulClient.getEntry(entryId, {
        locale: targetContentfulLocale,
        include: 1,
      });
      
      if (targetEntry && targetEntry.fields) {
        const fields = targetEntry.fields as { slug?: string; status?: string };
        
        // Check if the entry is published in the target language (if not preview mode)
        if (!preview && fields.status !== 'published') {
          console.warn(`Entry ${entryId} exists in ${targetContentfulLocale} but is not published`);
          return null;
        }
        
        return fields.slug || null;
      }
    } catch (entryError) {
      console.warn(`Entry ${entryId} not found in locale "${targetContentfulLocale}":`, entryError);
      return null;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting blog post slug in target language:', error);
    return null;
  }
}