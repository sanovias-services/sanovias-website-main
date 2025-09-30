import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS, Document } from '@contentful/rich-text-types';
import { getFieldValue, getImageUrl } from '@/lib/contentful/utils';

interface RichTextRendererProps {
  content: Document | null;
  locale?: string;
}

interface ContentfulAsset {
  sys: { id: string };
  fields: {
    title: string;
    description?: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: { width: number; height: number };
      };
      fileName: string;
      contentType: string;
    };
  };
}

interface ContentfulEntry {
  sys: { 
    id: string;
    contentType: { sys: { id: string } };
  };
  fields: Record<string, unknown>;
}

interface EmbeddedBlockNode {
  data: {
    target: ContentfulAsset | ContentfulEntry;
  };
}

/**
 * Comprehensive Rich Text Renderer for Contentful
 * Handles all possible rich text node types with Sanovias branding
 */
const RichTextRenderer = memo(function RichTextRenderer({ content, locale = 'en' }: RichTextRendererProps) {
  if (!content) {
    return (
      <p className="text-gray-500 italic">
        {locale === 'de' ? 'Kein Inhalt verfügbar.' : 'No content available.'}
      </p>
    );
  }

  const contentfulLocale = locale === 'de' ? 'de-DE' : 'en-US';

  const renderOptions: Options = {
    renderNode: {
      // === BLOCK NODES ===
      
      // Paragraphs
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-4 leading-relaxed text-[#1F2937]">{children}</p>
      ),

      // Headings
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="text-3xl md:text-4xl font-bold mb-6 mt-10 text-[#1C3C47] font-playfair leading-tight">
          {children}
        </h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-[#1C3C47] font-playfair leading-tight">
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="text-xl md:text-2xl font-semibold mb-3 mt-6 text-[#1C3C47] font-playfair leading-tight">
          {children}
        </h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 className="text-lg md:text-xl font-semibold mb-2 mt-4 text-[#2CA6A4] leading-snug">
          {children}
        </h4>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <h5 className="text-base md:text-lg font-medium mb-2 mt-4 text-[#2CA6A4] leading-snug">
          {children}
        </h5>
      ),
      [BLOCKS.HEADING_6]: (node, children) => (
        <h6 className="text-sm md:text-base font-medium mb-2 mt-3 text-[#6B7280] uppercase tracking-wide leading-snug">
          {children}
        </h6>
      ),

      // Lists
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="mb-4 list-disc list-outside ml-6 space-y-1 text-[#1F2937]">
          {children}
        </ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="mb-4 list-decimal list-outside ml-6 space-y-1 text-[#1F2937]">
          {children}
        </ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="leading-relaxed pl-2">{children}</li>
      ),

      // Quotes
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className="border-l-4 border-[#2CA6A4] pl-6 py-4 mb-6 italic text-[#6B7280] bg-[#F7F5F2] rounded-r-lg">
          <div className="text-lg font-playfair leading-relaxed">{children}</div>
        </blockquote>
      ),

      // Horizontal Rules
      [BLOCKS.HR]: () => (
        <hr className="my-8 border-t-2 border-gray-200" />
      ),

      // Code Blocks are handled via MARKS.CODE for inline code
      // For multi-line code, content creators can use preformatted text in Contentful

      // Tables (if supported)
      [BLOCKS.TABLE]: (node, children) => (
        <div className="mb-6 overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
            {children}
          </table>
        </div>
      ),
      [BLOCKS.TABLE_ROW]: (node, children) => (
        <tr className="border-b border-gray-200 even:bg-gray-50 hover:bg-gray-100 transition-colors">
          {children}
        </tr>
      ),
      [BLOCKS.TABLE_CELL]: (node, children) => (
        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200 last:border-r-0">
          {children}
        </td>
      ),
      [BLOCKS.TABLE_HEADER_CELL]: (node, children) => (
        <th className="px-4 py-3 text-sm font-semibold text-white bg-[#2CA6A4] border-r border-[#1C3C47] last:border-r-0">
          {children}
        </th>
      ),

      // === EMBEDDED CONTENT ===

      // Embedded Assets (Images, Videos, Documents)
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { target } = (node as unknown as EmbeddedBlockNode).data;
        const asset = target as ContentfulAsset;
        
        if (!asset?.fields?.file) {
          return (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
              <p className="text-red-600 text-sm">
                {locale === 'de' ? 'Asset konnte nicht geladen werden' : 'Asset could not be loaded'}
              </p>
            </div>
          );
        }

        const { file, title, description } = asset.fields;
        const imageUrl = file.url.startsWith('//') ? `https:${file.url}` : file.url;

        // Handle different asset types
        if (file.contentType.startsWith('image/')) {
          return (
            <figure className="mb-6">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={imageUrl}
                  alt={title || 'Content image'}
                  width={file.details.image?.width || 800}
                  height={file.details.image?.height || 600}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rg5T1+S9ztmHNHPSSk2KhbKCHNe9RNFJEKVh/N2lU=="
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                />
              </div>
              {(title || description) && (
                <figcaption className="mt-2 text-sm text-gray-600 text-center">
                  {title && <span className="font-medium">{title}</span>}
                  {title && description && ' - '}
                  {description}
                </figcaption>
              )}
            </figure>
          );
        }

        // Handle video files
        if (file.contentType.startsWith('video/')) {
          // Check if it's a YouTube URL in description or title
          const youtubeMatch = (description || title || '').match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
          if (youtubeMatch) {
            const videoId = youtubeMatch[1];
            return (
              <figure className="mb-6">
                <div className="relative rounded-lg overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%', height: 0 }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={title || 'YouTube video'}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>
                {title && (
                  <figcaption className="mt-2 text-sm text-gray-600 text-center font-medium">
                    {title}
                  </figcaption>
                )}
              </figure>
            );
          }
          
          return (
            <figure className="mb-6">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <video
                  controls
                  className="w-full h-auto"
                  poster={description} // If description contains poster URL
                >
                  <source src={imageUrl} type={file.contentType} />
                  Your browser does not support the video tag.
                </video>
              </div>
              {title && (
                <figcaption className="mt-2 text-sm text-gray-600 text-center font-medium">
                  {title}
                </figcaption>
              )}
            </figure>
          );
        }

        // Handle documents (PDF, etc.)
        if (file.contentType === 'application/pdf' || file.fileName.endsWith('.pdf')) {
          return (
            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-red-600">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{title || file.fileName}</h4>
                  {description && <p className="text-sm text-gray-600">{description}</p>}
                </div>
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-[#2CA6A4] hover:bg-[#26928F] transition-colors duration-150 ease-out shadow-sm hover:shadow-md"
                >
                  {locale === 'de' ? 'Herunterladen' : 'Download'}
                </a>
              </div>
            </div>
          );
        }

        // Fallback for other file types
        return (
          <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2CA6A4] hover:text-[#1C3C47] font-medium"
            >
              {title || file.fileName}
            </a>
            {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
          </div>
        );
      },

      // Embedded Entries (Blog Posts, Services, CTAs, etc.)
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const { target } = (node as unknown as EmbeddedBlockNode).data;
        const entry = target as ContentfulEntry;
        
        if (!entry?.sys?.contentType) return null;

        const contentType = entry.sys.contentType.sys.id;

        // Handle different content types
        switch (contentType) {
          case 'blogPost':
            return renderRelatedBlogPost(entry, contentfulLocale, locale);
          case 'callToAction':
            return renderCallToAction(entry, contentfulLocale);
          case 'service':
            return renderServiceHighlight(entry, contentfulLocale);
          case 'gallery':
            return renderImageGallery(entry, contentfulLocale);
          case 'accordion':
            return renderAccordion(entry, contentfulLocale);
          default:
            return renderGenericEntry(entry, contentfulLocale);
        }
      },

      // === INLINE NODES ===
      
      // Hyperlinks
      [INLINES.HYPERLINK]: (node, children) => {
        const uri = (node as unknown as { data?: { uri?: string } }).data?.uri || '#';
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

      // Entry Hyperlinks
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        const entry = (node as unknown as { data?: { target?: ContentfulEntry } }).data?.target;
        if (!entry) return <span>{children}</span>;

        const slug = getFieldValue(entry, 'slug', contentfulLocale);
        const contentType = entry.sys.contentType.sys.id;
        
        let href = '#';
        if (contentType === 'blogPost' && slug) {
          href = `/${locale}/blog/${slug}`;
        }

        return (
          <Link
            href={href}
            className="text-[#2CA6A4] hover:text-[#1C3C47] underline transition-colors font-medium"
          >
            {children}
          </Link>
        );
      },

      // Asset Hyperlinks
      [INLINES.ASSET_HYPERLINK]: (node, children) => {
        const asset = (node as unknown as { data?: { target?: ContentfulAsset } }).data?.target;
        if (!asset?.fields?.file) return <span>{children}</span>;

        const url = asset.fields.file.url.startsWith('//') 
          ? `https:${asset.fields.file.url}` 
          : asset.fields.file.url;

        return (
          <a
            href={url}
            className="text-[#2CA6A4] hover:text-[#1C3C47] underline transition-colors font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      },

      // Embedded Inline Entries
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const entry = (node as unknown as { data?: { target?: ContentfulEntry } }).data?.target;
        if (!entry) return null;

        const title = getFieldValue(entry, 'title', contentfulLocale) || 
                      getFieldValue(entry, 'name', contentfulLocale);
        
        return (
          <span className="inline-flex items-center px-2 py-1 rounded bg-[#2CA6A4] text-white text-sm font-medium">
            {title}
          </span>
        );
      },
    },

    // === TEXT MARKS ===
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <strong className="font-semibold text-[#1C3C47]">{text}</strong>
      ),
      [MARKS.ITALIC]: (text) => (
        <em className="italic font-playfair">{text}</em>
      ),
      [MARKS.UNDERLINE]: (text) => (
        <span className="underline">{text}</span>
      ),
      [MARKS.CODE]: (text) => (
        <code className="bg-[#E6E8EA] text-[#2CA6A4] px-2 py-1 rounded text-sm font-mono">
          {text}
        </code>
      ),
      [MARKS.SUPERSCRIPT]: (text) => (
        <sup className="text-xs">{text}</sup>
      ),
      [MARKS.SUBSCRIPT]: (text) => (
        <sub className="text-xs">{text}</sub>
      ),
    },
  };

  return (
    <div className="prose prose-lg max-w-none">
      <div className="text-[#1F2937] leading-relaxed font-inter">
        {documentToReactComponents(content, renderOptions)}
      </div>
    </div>
  );
});

// === ADDITIONAL HELPER COMPONENTS ===

function renderImageGallery(entry: ContentfulEntry, contentfulLocale: string) {
  const images = getFieldValue(entry, 'images', contentfulLocale) as unknown as ContentfulAsset[];
  const title = getFieldValue(entry, 'title', contentfulLocale);

  if (!images || !Array.isArray(images)) return null;

  return (
    <div className="my-8">
      {title && (
        <h3 className="text-xl font-semibold text-[#1C3C47] mb-4">{title}</h3>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => {
          const imageUrl = image.fields?.file?.url;
          if (!imageUrl) return null;
          
          const fullUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
          
          return (
            <div key={image.sys.id || index} className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={fullUrl}
                alt={image.fields?.title || `Gallery image ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform cursor-pointer"
                loading="lazy"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function renderAccordion(entry: ContentfulEntry, contentfulLocale: string) {
  const title = getFieldValue(entry, 'title', contentfulLocale);
  const items = getFieldValue(entry, 'items', contentfulLocale) as unknown as Array<{
    fields: { title: string; content: string };
  }>;

  if (!items || !Array.isArray(items)) return null;

  return (
    <div className="my-8">
      {title && (
        <h3 className="text-xl font-semibold text-[#1C3C47] mb-4">{title}</h3>
      )}
      <div className="space-y-2">
        {items.map((item, index) => {
          const itemTitle = getFieldValue(item, 'title', contentfulLocale);
          const itemContent = getFieldValue(item, 'content', contentfulLocale);
          
          return (
            <details key={index} className="group border border-gray-200 rounded-lg">
              <summary className="cursor-pointer p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-[#1C3C47]">{itemTitle}</h4>
                  <svg 
                    className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </summary>
              <div className="p-4 pt-0 text-[#1F2937]">
                {itemContent}
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}

export default RichTextRenderer;

// === HELPER COMPONENTS ===

function renderRelatedBlogPost(entry: ContentfulEntry, contentfulLocale: string, locale: string) {
  const title = getFieldValue(entry, 'title', contentfulLocale);
  const excerpt = getFieldValue(entry, 'excerpt', contentfulLocale);
  const slug = getFieldValue(entry, 'slug', contentfulLocale);
  const imageUrl = getImageUrl(entry, 'featuredImage');

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {imageUrl && (
          <div className="flex-shrink-0">
            <Image
              src={imageUrl}
              alt={title}
              width={120}
              height={80}
              className="rounded-lg object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#1C3C47] mb-2">{title}</h3>
          {excerpt && (
            <p className="text-[#6B7280] text-sm mb-3 line-clamp-2">{excerpt}</p>
          )}
          <Link
            href={`/${locale}/blog/${slug}`}
            className="inline-flex items-center text-[#2CA6A4] hover:text-[#1C3C47] font-medium text-sm transition-colors duration-150 ease-out"
          >
            {locale === 'de' ? 'Weiterlesen' : 'Read more'}
            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

function renderCallToAction(entry: ContentfulEntry, contentfulLocale: string) {
  const title = getFieldValue(entry, 'title', contentfulLocale);
  const description = getFieldValue(entry, 'description', contentfulLocale);
  const buttonText = getFieldValue(entry, 'buttonText', contentfulLocale);
  const buttonUrl = getFieldValue(entry, 'buttonUrl', contentfulLocale);

  return (
    <div className="my-8 p-8 bg-gradient-to-r from-[#2CA6A4] to-[#1C3C47] rounded-lg text-white text-center">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      {description && (
        <p className="text-lg mb-6 opacity-90">{description}</p>
      )}
      {buttonText && buttonUrl && (
        <Link
          href={buttonUrl}
          className="inline-flex items-center px-6 py-3 bg-white text-[#2CA6A4] font-semibold rounded-lg hover:bg-[#F7F5F2] transition-colors duration-150 ease-out shadow-sm hover:shadow-md"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}

function renderServiceHighlight(entry: ContentfulEntry, contentfulLocale: string) {
  const name = getFieldValue(entry, 'name', contentfulLocale);
  const description = getFieldValue(entry, 'description', contentfulLocale);
  const imageUrl = getImageUrl(entry, 'image');

  return (
    <div className="my-8 p-6 bg-[#F7F5F2] border-l-4 border-[#C9A66B] rounded-r-lg">
      <div className="flex gap-4 items-start">
        {imageUrl && (
          <div className="flex-shrink-0">
            <Image
              src={imageUrl}
              alt={name}
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <h4 className="text-xl font-semibold text-[#1C3C47] mb-2">{name}</h4>
          {description && (
            <p className="text-[#1F2937] leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function renderGenericEntry(entry: ContentfulEntry, contentfulLocale: string) {
  const title = getFieldValue(entry, 'title', contentfulLocale) || 
                getFieldValue(entry, 'name', contentfulLocale);
  const description = getFieldValue(entry, 'description', contentfulLocale);

  return (
    <div className="my-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
      {title && <h4 className="font-semibold text-[#1C3C47] mb-2">{title}</h4>}
      {description && <p className="text-[#1F2937]">{description}</p>}
    </div>
  );
}