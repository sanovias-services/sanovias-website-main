import { getAllBlogPosts, getAllCategories } from '@/lib/contentful/api';
import { ContentfulEntry, getFieldValue, getDirectImageUrl } from '@/lib/contentful/utils';
import { isPreviewMode } from '@/lib/contentful/preview-server';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params;
  const { category: selectedCategory } = await searchParams;
  
  // Check if preview mode is enabled
  const preview = await isPreviewMode();
  
  // Fetch data from Contentful
  const [posts, categories] = await Promise.all([
    getAllBlogPosts(locale, preview),
    getAllCategories(locale)
  ]);

  // Cast to our simple interface
  const blogPosts = posts as ContentfulEntry[];
  const blogCategories = categories as ContentfulEntry[];

  // Filter posts by category if selected
  const filteredPosts = selectedCategory 
    ? blogPosts.filter((post: ContentfulEntry) => {
        const postCategories = post.fields.category as ContentfulEntry[] | ContentfulEntry | undefined;
        const categoryArray = Array.isArray(postCategories) ? postCategories : postCategories ? [postCategories] : [];
        return categoryArray.some((cat) => 
          getFieldValue(cat, 'slug') === selectedCategory
        );
      })
    : blogPosts;

  // Get featured posts from filtered results
  const featuredPosts = filteredPosts.filter((post: ContentfulEntry) => post.fields.featured);
  const featuredPost = featuredPosts.length > 0 ? featuredPosts[0] : filteredPosts[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1C3C47] to-[#2CA6A4] text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
              {locale === 'de' ? 'SANOVIAS MEDIZIN BLOG' : 'SANOVIAS MEDICAL BLOG'}
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              {locale === 'de' 
                ? 'Expertenwissen, Patientengeschichten und praktische Tipps für Ihre medizinische Reise nach Tunesien.'
                : 'Expert insights, patient stories, and practical guidance for your medical journey to Tunisia.'}
            </p>
          </div>

          {/* Category Filter Tags */}
          {blogCategories.length > 0 && (
            <div className="text-center">
              <div className="flex flex-wrap justify-center gap-3">
                {/* All Categories Tag */}
                <Link
                  href={`/${locale}/blog`}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border border-white/30 transition-all backdrop-blur-sm ${
                    !selectedCategory 
                      ? 'bg-[#F7F5F2] text-[#1C3C47]' 
                      : 'bg-white/20 text-white hover:bg-[#F7F5F2] hover:text-[#1C3C47]'
                  }`}
                >
                  {locale === 'de' ? 'Alle' : 'All'}
                </Link>
                
                {/* Individual Category Tags */}
                {blogCategories.slice(0, 8).map((category: ContentfulEntry) => {
                  const categoryName = getFieldValue(category, 'name');
                  const categorySlug = getFieldValue(category, 'slug');
                  const isActive = selectedCategory === categorySlug;
                  
                  return (
                    <Link
                      key={category.sys.id}
                      href={`/${locale}/blog?category=${categorySlug}`}
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border border-white/30 transition-all backdrop-blur-sm ${
                        isActive 
                          ? 'bg-[#F7F5F2] text-[#1C3C47]' 
                          : 'bg-white/20 text-white hover:bg-[#F7F5F2] hover:text-[#1C3C47]'
                      }`}
                    >
                      {categoryName}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Post Section */}
      {featuredPost && (
        <section className="py-16 bg-[#F7F5F2]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Featured Post Image */}
              <div className="order-2 lg:order-1">
                {getDirectImageUrl(featuredPost.fields.featuredImage) && (
                  <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden">
                    <Image
                      src={getDirectImageUrl(featuredPost.fields.featuredImage)}
                      alt={getFieldValue(featuredPost, 'title')}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              
              {/* Featured Post Content */}
              <div className="order-1 lg:order-2">
                <div className="flex items-center mb-4">
                  <span className="bg-[#C9A66B] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {locale === 'de' ? 'Empfohlen' : 'Featured'}
                  </span>
                </div>
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#1C3C47] mb-4">
                                    {getFieldValue(featuredPost, 'title')}
                </h2>
                <p className="text-gray-600 mb-4">
                  {getFieldValue(featuredPost, 'excerpt')}
                </p>
                <Link
                  href={`/${locale}/blog/${getFieldValue(featuredPost, 'slug')}`}
                  className="inline-block bg-[#2CA6A4] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#26928F] transition-colors"
                >
                  {locale === 'de' ? 'Weiterlesen' : 'Read More'} →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Posts */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-[#1C3C47]">
              {locale === 'de' ? 'Neueste Artikel' : 'Latest Articles'}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(0, 6).map((post: ContentfulEntry) => {
              const postTitle = getFieldValue(post, 'title');
              const postSlug = getFieldValue(post, 'slug');
              const postExcerpt = getFieldValue(post, 'excerpt');
              const postReadingTime = getFieldValue(post.fields.readingTime, '5');
              const featuredImageUrl = getDirectImageUrl(post.fields.featuredImage);
              
              // Category info (category can be array or single entry)
              const categories = post.fields.category as ContentfulEntry[] | ContentfulEntry | undefined;
              const categoryArray = Array.isArray(categories) ? categories : categories ? [categories] : [];
              const firstCategory = categoryArray[0];
              const categoryName = firstCategory ? getFieldValue(firstCategory, 'name') : '';
              
              // Author info (author can be array or single entry)
              const authors = post.fields.author as ContentfulEntry[] | ContentfulEntry | undefined;
              const authorArray = Array.isArray(authors) ? authors : authors ? [authors] : [];
              const firstAuthor = authorArray[0];
              const authorName = firstAuthor ? getFieldValue(firstAuthor, 'name') || 'Anonymous' : 'Anonymous';
              const authorAvatarUrl = firstAuthor ? getDirectImageUrl(firstAuthor.fields.avatar) : '';
              
              // Draft status
              const status = getFieldValue(post, 'status') || 'published';
              const isDraft = status !== 'published';
              
              return (
                <article key={post.sys.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  {featuredImageUrl && (
                    <div className="relative h-48 bg-gray-200">
                      <Image
                        src={featuredImageUrl}
                        alt={postTitle}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      {categoryName && (
                        <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-[#F7F5F2] text-[#1C3C47]">
                          {categoryName}
                        </span>
                      )}
                      {preview && isDraft && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {locale === 'de' ? 'Entwurf' : 'Draft'}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-playfair text-xl font-semibold text-[#1C3C47] mb-3 line-clamp-2">
                      {postTitle}
                    </h3>
                    
                    <p className="text-[#6B7280] mb-4 line-clamp-3 leading-relaxed">
                      {postExcerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-[#6B7280] mb-4">
                      <div className="flex items-center">
                        {authorAvatarUrl && (
                          <Image
                            src={authorAvatarUrl}
                            alt={authorName}
                            width={24}
                            height={24}
                            className="rounded-full mr-2"
                          />
                        )}
                        <span>{authorName}</span>
                      </div>
                      <span>{postReadingTime} {locale === 'de' ? 'Min.' : 'min'}</span>
                    </div>
                    
                    <Link
                      href={`/${locale}/blog/${postSlug}`}
                      className="inline-block bg-[#2CA6A4] text-white px-4 py-2 rounded-lg hover:bg-[#26928F] transition-colors"
                    >
                      {locale === 'de' ? 'Weiterlesen' : 'Read More'}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>


        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-[#1C3C47] to-[#2CA6A4] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl font-bold mb-4">
            {locale === 'de' ? 'Bereit für Ihre Transformation?' : 'Ready for Your Transformation?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {locale === 'de' 
              ? 'Kontaktieren Sie uns für eine kostenlose Beratung zu Ihren medizinischen Bedürfnissen.'
              : 'Contact us for a free consultation about your medical needs.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block bg-white text-[#1C3C47] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            {locale === 'de' ? 'Kostenlose Beratung' : 'Free Consultation'}
          </Link>
        </div>
      </section>


    </div>
  );
}