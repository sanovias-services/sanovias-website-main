import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/contentful/api';
import { getFieldValue, getImageUrl, formatPublishDate, getLocalizedContent } from '@/lib/contentful/utils';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS, Document } from '@contentful/rich-text-types';

// Rich text renderer options
const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: unknown, children: React.ReactNode) => (
      <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: unknown, children: React.ReactNode) => (
      <h1 className="text-3xl md:text-4xl font-bold mb-6 mt-10 text-[#1C3C47] font-playfair">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: unknown, children: React.ReactNode) => (
      <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-8 text-[#1C3C47] font-playfair">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: unknown, children: React.ReactNode) => (
      <h3 className="text-xl md:text-2xl font-semibold mb-3 mt-6 text-[#1C3C47] font-playfair">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (node: unknown, children: React.ReactNode) => (
      <h4 className="text-lg md:text-xl font-semibold mb-2 mt-4 text-[#2CA6A4]">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (node: unknown, children: React.ReactNode) => (
      <h5 className="text-base md:text-lg font-medium mb-2 mt-4 text-[#2CA6A4]">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (node: unknown, children: React.ReactNode) => (
      <h6 className="text-sm md:text-base font-medium mb-2 mt-3 text-gray-600 uppercase tracking-wider">{children}</h6>
    ),
    [BLOCKS.UL_LIST]: (node: unknown, children: React.ReactNode) => (
      <ul className="mb-4 list-disc list-outside ml-6 space-y-1 text-gray-700">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: unknown, children: React.ReactNode) => (
      <ol className="mb-4 list-decimal list-outside ml-6 space-y-1 text-gray-700">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: unknown, children: React.ReactNode) => (
      <li className="leading-relaxed pl-2">{children}</li>
    ),
    [INLINES.HYPERLINK]: (node: unknown, children: React.ReactNode) => {
      const uri = node && typeof node === 'object' && 'data' in node && node.data && typeof node.data === 'object' && 'uri' in node.data
        ? (node.data as { uri: string }).uri
        : '#';
      return (
        <a 
          href={uri} 
          className="text-[#2CA6A4] hover:text-[#1C3C47] underline transition-colors font-medium"
          target="_blank" 
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
    [BLOCKS.QUOTE]: (node: unknown, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-[#2CA6A4] pl-4 py-2 mb-4 italic text-gray-600 bg-gray-50 rounded-r">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => (
      <hr className="my-8 border-t-2 border-gray-200" />
    ),
  },
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-semibold text-[#1C3C47]">{text}</strong>,
    [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic">{text}</em>,
    [MARKS.UNDERLINE]: (text: React.ReactNode) => <span className="underline">{text}</span>,
    [MARKS.CODE]: (text: React.ReactNode) => (
      <code className="bg-gray-100 text-[#2CA6A4] px-2 py-1 rounded text-sm font-mono">{text}</code>
    ),
  },
};

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const posts = await getAllBlogPosts('en-US');
    const paths = [];
    
    for (const post of posts) {
      const enSlug = getFieldValue(post, 'slug', 'en-US');
      const deSlug = getFieldValue(post, 'slug', 'de-DE');
      
      if (enSlug) paths.push({ locale: 'en', slug: enSlug });
      if (deSlug) paths.push({ locale: 'de', slug: deSlug });
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

    const contentfulLocale = locale === 'de' ? 'de-DE' : 'en-US';
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
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed">
            {content && 
             typeof content === 'object' && 
             'nodeType' in content && 
             'content' in content ? 
               documentToReactComponents(content as Document, richTextOptions) : (
              <p className="text-gray-500 italic">
                {locale === 'de' ? 'Kein Inhalt verfügbar.' : 'No content available.'}
              </p>
            )}
          </div>
        </div>

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
