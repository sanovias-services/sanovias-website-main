import { getAllBlogPosts, getAllCategories } from '@/lib/contentful/api';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}

// Helper function to safely get field values
function getFieldValue(field: any, fallback: string = ''): string {
  if (typeof field === 'string') return field;
  if (field && typeof field === 'object' && field.toString) return field.toString();
  return fallback;
}

// Helper function to get image URL
function getImageUrl(image: any): string {
  if (image && image.fields && image.fields.file && image.fields.file.url) {
    return `https:${image.fields.file.url}`;
  }
  return '';
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params;
  const { category: selectedCategory } = await searchParams;
  
  // Fetch data from Contentful
  const [posts, categories] = await Promise.all([
    getAllBlogPosts(locale),
    getAllCategories(locale)
  ]);

  // Filter posts by category if selected
  const filteredPosts = selectedCategory 
    ? posts.filter((post: any) => {
        const postCategories = post.fields.category || [];
        return postCategories.some((cat: any) => 
          getFieldValue(cat.fields.slug) === selectedCategory
        );
      })
    : posts;

  // Get featured posts from filtered results
  const featuredPosts = filteredPosts.filter((post: any) => post.fields.featured);
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
          {categories.length > 0 && (
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
                {categories.slice(0, 8).map((category: any) => {
                  const categoryName = getFieldValue(category.fields.name);
                  const categorySlug = getFieldValue(category.fields.slug);
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
                {getImageUrl(featuredPost.fields.featuredImage) && (
                  <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden">
                    <Image
                      src={getImageUrl(featuredPost.fields.featuredImage)}
                      alt={getFieldValue(featuredPost.fields.title)}
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
                  {getFieldValue(featuredPost.fields.title)}
                </h2>
                <p className="text-lg text-[#6B7280] mb-6 leading-relaxed">
                  {getFieldValue(featuredPost.fields.excerpt)}
                </p>
                <Link
                  href={`/${locale}/blog/${getFieldValue(featuredPost.fields.slug)}`}
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
            {filteredPosts.slice(0, 6).map((post: any) => {
              const postTitle = getFieldValue(post.fields.title);
              const postSlug = getFieldValue(post.fields.slug);
              const postExcerpt = getFieldValue(post.fields.excerpt);
              const postReadingTime = getFieldValue(post.fields.readingTime, '5');
              const featuredImageUrl = getImageUrl(post.fields.featuredImage);
              
              // Category info (category is an array)
              const categories = post.fields.category || [];
              const firstCategory = categories[0];
              const categoryName = firstCategory ? getFieldValue(firstCategory.fields.name) : '';
              
              // Author info (author is also an array)
              const authors = post.fields.author || [];
              const firstAuthor = authors[0];
              const authorName = firstAuthor ? getFieldValue(firstAuthor.fields.name, 'Anonymous') : 'Anonymous';
              const authorAvatarUrl = firstAuthor ? getImageUrl(firstAuthor.fields.avatar) : '';
              
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
                    {categoryName && (
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-[#F7F5F2] text-[#1C3C47] mb-3">
                        {categoryName}
                      </span>
                    )}
                    
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