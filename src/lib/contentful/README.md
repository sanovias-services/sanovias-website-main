# Contentful CMS Integration

Complete Contentful CMS integration for the Sanovias website with preview mode support, multi-language content, and type-safe data handling.

## 🎯 Overview

This Contentful integration provides:
- **Multi-language content** with automatic locale fallbacks
- **Preview mode support** for draft content editing
- **Type-safe data handling** with TypeScript interfaces
- **Rich text rendering** with custom components
- **Image optimization** with Next.js integration
- **Server/Client compatibility** for Next.js App Router

## 📁 File Structure

```
src/lib/contentful/
├── api.ts              # Main API functions for content retrieval
├── client.ts           # Contentful client configuration
├── preview-client.ts   # Client-side preview utilities (legacy)
├── preview-server.ts   # Server-side preview utilities
├── types.ts            # TypeScript interfaces and content models
├── utils.ts            # Utility functions for data processing
└── README.md           # This documentation
```

## 🚀 Quick Start

### Basic Content Retrieval

```typescript
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/contentful/api';

// Get all published blog posts
const posts = await getAllBlogPosts('en');

// Get specific blog post by slug
const post = await getBlogPostBySlug('medical-tourism-guide', 'en');

// Get draft content (preview mode)
const draftPosts = await getAllBlogPosts('en', true);
```

### Preview Mode Usage

```typescript
import { isPreviewMode, getPreviewInfo } from '@/lib/contentful/preview-server';

// Check if preview mode is active (Server Component)
const preview = await isPreviewMode();

// Get preview information
const { isEnabled, info } = await getPreviewInfo();

// Use in data fetching
const posts = await getAllBlogPosts(locale, preview);
```

### Content Utility Functions

```typescript
import { getFieldValue, getDirectImageUrl } from '@/lib/contentful/utils';

// Safely extract field values
const title = getFieldValue(blogPost, 'title');
const excerpt = getFieldValue(blogPost, 'excerpt');

// Extract optimized image URLs
const imageUrl = getDirectImageUrl(blogPost.fields.featuredImage);
```

## 📋 Content Models

### Blog Post Structure

```typescript
interface IBlogPostSkeleton {
  contentTypeId: 'blogPost';
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    content: Document;              // Rich text content
    featuredImage: ContentfulAsset;
    category: Entry<ICategorySkeleton>;
    author: Entry<IAuthorSkeleton>;
    publishDate: string;
    tags?: string[];
    metaTitle?: string;
    metaDescription?: string;
    featured?: boolean;
    status: 'draft' | 'published';
    readingTime: number;
  };
}
```

### Category Structure

```typescript
interface ICategorySkeleton {
  contentTypeId: 'category';
  fields: {
    name: string;
    slug: string;
    description?: string;
    color?: string;
  };
}
```

### Author Structure

```typescript
interface IAuthorSkeleton {
  contentTypeId: 'author';
  fields: {
    name: string;
    bio?: Document;
    avatar?: ContentfulAsset;
    email?: string;
    socialMedia?: {
      twitter?: string;
      linkedin?: string;
    };
  };
}
```

## 🌐 Multi-Language Support

### Locale Configuration

```typescript
// Automatic locale mapping
const posts = await getAllBlogPosts('en');    // Maps to 'en-US'
const posts = await getAllBlogPosts('de');    // Maps to 'de-DE'

// Direct Contentful locale
const posts = await getAllBlogPosts('en-US'); // Direct mapping
```

### Language Fallbacks

```typescript
// Content with missing translations
const post = await getBlogPostBySlug('example-post', 'de');

// Automatic fallback chain:
// 1. Try German (de-DE)
// 2. Fall back to English (en-US) 
// 3. Fall back to any available locale
// 4. Return null if no content found
```

### Cross-Language Navigation

```typescript
// Find post in different language
const germanSlug = await getBlogPostSlugInLanguage(
  'english-post-slug', 
  'en', 
  'de'
);
```

## 🔍 Preview Mode System

### Preview Mode Flow

```
1. Content Editor → Contentful → Preview URL
2. Preview API validates token and content
3. Preview cookies set for session management
4. Draft content displayed with preview banner
5. Editor can switch languages maintaining preview state
```

### Preview API Endpoints

```typescript
// Activate preview mode
GET /api/blog/preview?secret=TOKEN&slug=POST_SLUG&locale=LOCALE

// Deactivate preview mode  
DELETE /api/blog/preview

// Language switching in preview
GET /api/blog/slug-switch?slug=SLUG&locale=NEW_LOCALE&preview=true
```

### Preview Components Integration

```typescript
// Server Component preview detection
const preview = await isPreviewMode();

// Client Component preview utilities  
const isPreview = getPreviewModeFromCookies();

// Preview banner display
{preview && <PreviewBanner />}
```

## 🎨 Rich Text Rendering

### Custom Rich Text Components

```typescript
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="text-2xl font-bold mb-4">{children}</h2>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { url, width, height } = node.data.target.fields.file;
      return (
        <Image
          src={url}
          alt={node.data.target.fields.title}
          width={width}
          height={height}
          className="rounded-lg my-6"
        />
      );
    }
  }
};
```

### Usage in Components

```typescript
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

function BlogPostContent({ content }) {
  return (
    <div className="prose prose-lg max-w-none">
      {documentToReactComponents(content, richTextOptions)}
    </div>
  );
}
```

## 🖼️ Image Optimization

### Contentful Image API

```typescript
// Basic image URL
const imageUrl = getDirectImageUrl(asset);

// Optimized image with transformations
const optimizedUrl = getDirectImageUrl(asset, {
  width: 800,
  height: 600,
  quality: 80,
  format: 'webp'
});
```

### Next.js Image Integration

```typescript
// Automatic optimization
<Image
  src={getDirectImageUrl(featuredImage)}
  alt={getFieldValue(post, 'title')}
  width={800}
  height={400}
  priority // For above-the-fold images
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

## 🛠️ API Reference

### Content Retrieval Functions

```typescript
// Get all blog posts
getAllBlogPosts(locale?: string, preview?: boolean): Promise<Entry[]>

// Get single blog post by slug
getBlogPostBySlug(slug: string, locale?: string, preview?: boolean): Promise<Entry | null>

// Get all categories
getAllCategories(locale?: string): Promise<Entry[]>

// Get all authors
getAllAuthors(locale?: string): Promise<Entry[]>

// Get blog posts by category
getBlogPostsByCategory(categorySlug: string, locale?: string, preview?: boolean): Promise<Entry[]>

// Get related blog posts
getRelatedBlogPosts(currentSlug: string, categorySlug: string, locale?: string, limit?: number): Promise<Entry[]>

// Cross-language content discovery
getBlogPostSlugInLanguage(slug: string, fromLocale: string, toLocale: string, preview?: boolean): Promise<string | null>
```

### Preview Mode Functions

```typescript
// Server-side preview detection
isPreviewMode(): Promise<boolean>

// Get preview information
getPreviewInfo(): Promise<{ isEnabled: boolean; info?: PreviewInfo }>

// Client-side preview detection (legacy)
getPreviewModeFromCookies(): boolean
```

### Utility Functions

```typescript
// Safe field value extraction
getFieldValue(entry: unknown, field: string, locale?: string): string

// Image URL extraction
getDirectImageUrl(asset: unknown, options?: ImageOptions): string

// Content validation
isValidContentfulEntry(entry: unknown): boolean

// Rich text helpers
extractPlainTextFromRichText(document: Document): string
estimateReadingTime(document: Document): number
```

## 🔧 Configuration

### Environment Variables

```bash
# Required - Contentful Space Configuration
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_delivery_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token
CONTENTFUL_ENVIRONMENT=master

# Optional - Preview Mode
CONTENTFUL_PREVIEW_SECRET=your_preview_secret

# Optional - Webhook Revalidation
CONTENTFUL_REVALIDATE_SECRET=your_revalidate_secret
```

### Contentful Space Setup

```typescript
// Required Content Types
├── blogPost
│   ├── title (Short text)
│   ├── slug (Short text, unique)
│   ├── excerpt (Long text)
│   ├── content (Rich text)
│   ├── featuredImage (Media)
│   ├── category (Reference to Category)
│   ├── author (Reference to Author)
│   ├── publishDate (Date & time)
│   ├── tags (Short text, list)
│   ├── status (Short text: draft/published)
│   └── featured (Boolean)

├── category
│   ├── name (Short text)
│   ├── slug (Short text, unique)
│   └── description (Long text)

└── author
    ├── name (Short text)
    ├── bio (Rich text)
    ├── avatar (Media)
    └── email (Short text)
```

### Preview URL Configuration

```
https://sanovias.com/api/blog/preview?secret={PREVIEW_SECRET}&slug={entry.fields.slug}&locale={locale}&contentType=blogPost
```

## 🔍 Error Handling

### Graceful Fallbacks

```typescript
// API functions include error handling
try {
  const posts = await getAllBlogPosts(locale, preview);
  // Handle successful response
} catch (error) {
  console.error('Content fetch failed:', error);
  // Fallback to empty array or cached content
  return [];
}
```

### Content Validation

```typescript
// Safe field extraction
const title = getFieldValue(post, 'title') || 'Untitled Post';
const image = getDirectImageUrl(post.fields.featuredImage) || '/default-image.jpg';

// Entry validation
if (!isValidContentfulEntry(post)) {
  return null; // Skip invalid entries
}
```

### Locale Fallbacks

```typescript
// Automatic fallback chain
const post = await getBlogPostBySlug(slug, 'de');
// 1. Try German content
// 2. Fall back to English if German not available  
// 3. Fall back to default locale
// 4. Return null if no content exists
```

## 🚀 Performance Optimization

### Caching Strategy

```typescript
// Next.js ISR (Incremental Static Regeneration)
export const revalidate = 300; // 5 minutes

// Content revalidation on webhook
await revalidatePath('/blog');
await revalidateTag('blog-posts');
```

### Image Optimization

```typescript
// Contentful Image API transformations
const optimizedImage = getDirectImageUrl(asset, {
  width: 800,
  quality: 80,
  format: 'webp'
});

// Next.js Image component integration
<Image
  src={optimizedImage}
  alt={alt}
  priority={isAboveFold}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Content Preloading

```typescript
// Preload related content
const [post, relatedPosts, categories] = await Promise.all([
  getBlogPostBySlug(slug, locale, preview),
  getRelatedBlogPosts(slug, categorySlug, locale),
  getAllCategories(locale)
]);
```

## 🧪 Testing & Development

### Content Testing

```typescript
// Test content retrieval
const testPost = await getBlogPostBySlug('test-post', 'en');
console.log('Post loaded:', !!testPost);

// Test preview mode
const previewPost = await getBlogPostBySlug('draft-post', 'en', true);
console.log('Draft content:', !!previewPost);

// Test multilingual content
const germanPost = await getBlogPostBySlug('test-post', 'de');
console.log('German version:', !!germanPost);
```

### Development Utilities

```typescript
// Debug content structure
console.log('Content fields:', Object.keys(post.fields));
console.log('Available locales:', post.sys.locale);

// Validate content completeness
const requiredFields = ['title', 'slug', 'content', 'publishDate'];
const missingFields = requiredFields.filter(field => 
  !getFieldValue(post, field)
);
```

## 📈 Content Analytics

### Content Performance Tracking

```typescript
// Track popular content
const popularPosts = await getAllBlogPosts(locale)
  .then(posts => posts
    .filter(post => getFieldValue(post, 'featured'))
    .slice(0, 5)
  );

// Track content by category
const categoryStats = await getAllCategories(locale)
  .then(categories => Promise.all(
    categories.map(async category => ({
      name: getFieldValue(category, 'name'),
      postCount: await getBlogPostsByCategory(
        getFieldValue(category, 'slug'), 
        locale
      ).then(posts => posts.length)
    }))
  ));
```

### SEO Optimization

```typescript
// Extract SEO metadata
const seoData = {
  title: getFieldValue(post, 'metaTitle') || getFieldValue(post, 'title'),
  description: getFieldValue(post, 'metaDescription') || getFieldValue(post, 'excerpt'),
  image: getDirectImageUrl(post.fields.featuredImage),
  publishDate: getFieldValue(post, 'publishDate'),
  author: getFieldValue(post.fields.author, 'name'),
  category: getFieldValue(post.fields.category, 'name')
};
```

## 🔮 Future Enhancements

### Planned Features
- **GraphQL integration** for more efficient queries
- **Content versioning** and revision history
- **Advanced rich text components** (code blocks, embeds)
- **Content scheduling** with publish dates
- **A/B testing** for content variants
- **Content analytics** integration
- **Automated content migration** tools

### Performance Improvements
- **Edge caching** with Cloudflare/CDN
- **Content compression** for large rich text
- **Lazy loading** for non-critical content
- **Background content updates** for better UX

## 📞 Support & Troubleshooting

### Common Issues

1. **Missing content**: Check locale configuration and fallbacks
2. **Preview mode not working**: Verify environment variables and tokens
3. **Images not loading**: Check asset URL extraction and Next.js config
4. **Rich text rendering**: Ensure proper rich text options configuration

### Debug Commands

```typescript
// Test Contentful connection
import client from '@/lib/contentful/client';
const space = await client.getSpace();
console.log('Connected to:', space.name);

// Test content availability
const entries = await client.getEntries({ content_type: 'blogPost', limit: 1 });
console.log('Sample entry:', entries.items[0]);
```

---

**Status**: ✅ Production Ready - Full CMS Integration Complete  
**Content Types**: Blog Posts, Categories, Authors with Rich Text Support  
**Features**: Multi-language, Preview Mode, Image Optimization, Type Safety  
**Next Steps**: Content creation, SEO optimization, performance monitoring