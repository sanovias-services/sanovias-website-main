import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/contentful/api';
import { getFieldValue, getImageUrl, formatPublishDate, getLocalizedContent } from '@/lib/contentful/utils';
import RichTextRenderer from '../components/RichTextRenderer';
import { Document } from '@contentful/rich-text-types';
import { getAllLocales, getContentfulLocale } from '@/lib/locale-config';

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Generate static params for all blog posts across all locales
export async function generateStaticParams() {
  try {
    const posts = await getAllBlogPosts('en-US'); // Get all posts from default locale
    const paths = [];
    const locales = getAllLocales();
    
    for (const post of posts) {
      // Generate paths for each supported locale
      for (const localeConfig of locales) {
        const contentfulLocale = localeConfig.contentful;
        const slug = getFieldValue(post, 'slug', contentfulLocale);
        
        if (slug) {
          paths.push({ locale: localeConfig.code, slug });
        }
      }
    }
    
    return paths;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  
  try {
    const post = await getBlogPostBySlug(slug, locale);
    
    if (!post) {
      notFound();
    }

    const contentfulLocale = getContentfulLocale(locale);
    const title = getFieldValue(post, 'title', contentfulLocale);
    const excerpt = getFieldValue(post, 'excerpt', contentfulLocale);
    const publishDate = getFieldValue(post, 'publishDate', contentfulLocale);
    const featuredImageUrl = getImageUrl(post, 'featuredImage');
    
    // Get rich text content
    const content = getLocalizedContent(post.fields.content, locale);
    
    // Get author info
    const author = getLocalizedContent(post.fields.author, locale);
    const authorName = author ? getFieldValue(author, 'name', contentfulLocale) : '';
    const authorBio = author ? getFieldValue(author, 'bio', contentfulLocale) : '';
    
    // Get categories
    const categories = getLocalizedContent(post.fields.categories, locale) as unknown[] || [];
    
    // Format publish date
    const formattedDate = formatPublishDate(publishDate, locale);

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href={`/${locale}`}
              className="flex items-center space-x-2"
            >
              <Image
                src="/sanovias_logo.png"
                alt="Sanovias"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="text-[#2CA6A4] hover:text-[#1C3C47] font-medium transition-colors"
            >
              {locale === 'de' ? '← Zurück zum Blog' : '← Back to Blog'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href={`/${locale}`} className="hover:text-[#2CA6A4]">
              {locale === 'de' ? 'Startseite' : 'Home'}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/blog`} className="hover:text-[#2CA6A4]">
              Blog
            </Link>
            <span>/</span>
            <span className="text-gray-900">{title}</span>
          </nav>

          {/* Categories */}
          {Array.isArray(categories) && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category: unknown, index: number) => {
                const categoryName = getFieldValue(category, 'name', contentfulLocale);
                return (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#2CA6A4] text-white"
                  >
                    {categoryName}
                  </span>
                );
              })}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#1C3C47] mb-4 leading-tight">
            {title}
          </h1>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {excerpt}
            </p>
          )}

          {/* Meta info */}
          <div className="flex items-center space-x-6 text-sm text-gray-500 mb-8">
            {authorName && (
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-700">{authorName}</span>
              </div>
            )}
            {formattedDate && (
              <time dateTime={publishDate}>
                {formattedDate}
              </time>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {featuredImageUrl && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={featuredImageUrl}
              alt={title}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <RichTextRenderer 
          content={content && typeof content === 'object' && 'nodeType' in content && 'content' in content ? content as unknown as Document : null}
          locale={locale}
        />

        {/* Author Bio */}
        {authorName && authorBio && (
          <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-[#1C3C47] mb-3">
              {locale === 'de' ? 'Über den Autor' : 'About the Author'}
            </h3>
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <p className="font-medium text-gray-900 mb-2">{authorName}</p>
                <p className="text-gray-600">{authorBio}</p>
              </div>
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center px-6 py-3 border border-[#2CA6A4] text-[#2CA6A4] font-medium rounded-lg hover:bg-[#2CA6A4] hover:text-white transition-colors"
          >
            {locale === 'de' ? 'Zurück zum Blog' : 'Back to Blog'}
          </Link>
        </div>
      </article>
    </div>
  );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }
}
