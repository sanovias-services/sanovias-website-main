'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '../components/LocaleProvider';
import { BlogPost } from './types';
import { BLOG_CATEGORIES } from './constants';

// Mock data for development - will be replaced with CMS integration
const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: {
      en: 'Complete Guide to Plastic Surgery in Tunisia',
      de: 'Vollständiger Leitfaden für plastische Chirurgie in Tunesien'
    },
    slug: {
      en: 'complete-guide-plastic-surgery-tunisia',
      de: 'vollstaendiger-leitfaden-plastische-chirurgie-tunesien'
    },
    excerpt: {
      en: 'Discover why Tunisia has become a leading destination for plastic surgery, with world-class surgeons and affordable prices.',
      de: 'Entdecken Sie, warum Tunesien ein führendes Ziel für plastische Chirurgie geworden ist, mit Weltklasse-Chirurgen und erschwinglichen Preisen.'
    },
    content: { en: '...', de: '...' },
    category: BLOG_CATEGORIES[0], // Plastic Surgery
    author: {
      id: 'dr-atef-souissi',
      name: 'Dr. Atef M. Souissi',
      title: { en: 'Chief Medical Officer', de: 'Ärztlicher Direktor' },
      bio: { en: '...', de: '...' },
      avatar: '/team/atef.jpg',
      specialties: ['Plastic Surgery']
    },
    publishDate: '2024-09-20',
    lastModified: '2024-09-20',
    featuredImage: {
      url: '/images/blog/plastic-surgery-guide.jpg',
      alt: {
        en: 'Plastic surgery consultation in Tunisia',
        de: 'Beratung für plastische Chirurgie in Tunesien'
      },
      width: 800,
      height: 600
    },
    tags: ['plastic-surgery', 'tunisia', 'medical-tourism'],
    metaDescription: {
      en: 'Complete guide to plastic surgery in Tunisia - procedures, costs, best surgeons, and everything you need to know.',
      de: 'Vollständiger Leitfaden für plastische Chirurgie in Tunesien - Verfahren, Kosten, beste Chirurgen und alles was Sie wissen müssen.'
    },
    readingTime: 8,
    featured: true,
    status: 'published'
  },
  {
    id: '2',
    title: {
      en: 'Dental Tourism: Why Choose Tunisia?',
      de: 'Zahntourismus: Warum Tunesien wählen?'
    },
    slug: {
      en: 'dental-tourism-why-choose-tunisia',
      de: 'zahntourismus-warum-tunesien-waehlen'
    },
    excerpt: {
      en: 'Learn about the advantages of dental treatment in Tunisia, from cost savings to high-quality care.',
      de: 'Erfahren Sie mehr über die Vorteile einer Zahnbehandlung in Tunesien, von Kosteneinsparungen bis hin zu hochwertiger Pflege.'
    },
    content: { en: '...', de: '...' },
    category: BLOG_CATEGORIES[1], // Dental Care
    author: {
      id: 'alain-selmi',
      name: 'Ing. Alain A. Selmi',
      title: { en: 'CEO', de: 'Geschäftsführer' },
      bio: { en: '...', de: '...' },
      avatar: '/team/ala.jpg',
      specialties: ['Medical Tourism']
    },
    publishDate: '2024-09-18',
    lastModified: '2024-09-18',
    featuredImage: {
      url: '/images/blog/dental-tourism.jpg',
      alt: {
        en: 'Modern dental clinic in Tunisia',
        de: 'Moderne Zahnarztpraxis in Tunesien'
      },
      width: 800,
      height: 600
    },
    tags: ['dental-care', 'tunisia', 'cost-savings'],
    metaDescription: {
      en: 'Discover why Tunisia is the perfect destination for dental tourism - quality care, modern facilities, and significant savings.',
      de: 'Entdecken Sie, warum Tunesien das perfekte Ziel für Zahntourismus ist - hochwertige Pflege, moderne Einrichtungen und erhebliche Einsparungen.'
    },
    readingTime: 6,
    featured: false,
    status: 'published'
  }
];

export default function BlogPage() {
  const locale = useLocale() as 'en' | 'de';
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - replace with actual CMS integration
    setTimeout(() => {
      setPosts(MOCK_BLOG_POSTS);
      setLoading(false);
    }, 500);
  }, []);

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category.id === selectedCategory);

  const featuredPost = posts.find(post => post.featured);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2CA6A4] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1C3C47] to-[#2CA6A4] text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="font-playfair text-5xl font-bold mb-6">
              {locale === 'de' ? 'Sanovias Blog' : 'Sanovias Blog'}
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              {locale === 'de' 
                ? 'Expertenwissen, Patientengeschichten und umfassende Leitfäden für Medizintourismus in Tunesien'
                : 'Expert insights, patient stories, and comprehensive guides for medical tourism in Tunisia'
              }
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 rounded-full font-inter font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-white text-[#1C3C47]'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {locale === 'de' ? 'Alle Artikel' : 'All Articles'}
              </button>
              {BLOG_CATEGORIES.slice(0, 4).map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-inter font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-white text-[#1C3C47]'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {category.name[locale]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-playfair text-3xl font-semibold mb-8 text-center text-[#1C3C47]">
              {locale === 'de' ? 'Empfohlener Artikel' : 'Featured Article'}
            </h2>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <Image
                    src={featuredPost.featuredImage.url}
                    alt={featuredPost.featuredImage.alt[locale]}
                    width={featuredPost.featuredImage.width}
                    height={featuredPost.featuredImage.height}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-medium text-white"
                      style={{ backgroundColor: featuredPost.category.color }}
                    >
                      {featuredPost.category.name[locale]}
                    </span>
                    <span className="mx-3 text-gray-400">•</span>
                    <span className="text-gray-600 text-sm">
                      {new Date(featuredPost.publishDate).toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US')}
                    </span>
                  </div>
                  <h3 className="font-playfair text-2xl font-semibold mb-4 text-[#1C3C47]">
                    {featuredPost.title[locale]}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt[locale]}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="ml-3">
                        <p className="font-medium text-[#1C3C47]">{featuredPost.author.name}</p>
                        <p className="text-sm text-gray-500">{featuredPost.readingTime} min read</p>
                      </div>
                    </div>
                    <Link
                      href={`/${locale}/blog/${featuredPost.slug[locale]}`}
                      className="bg-[#2CA6A4] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#26928F] transition-colors"
                    >
                      {locale === 'de' ? 'Weiterlesen' : 'Read More'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-playfair text-3xl font-semibold mb-12 text-center text-[#1C3C47]">
            {locale === 'de' ? 'Neueste Artikel' : 'Latest Articles'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt[locale]}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-medium text-white"
                      style={{ backgroundColor: post.category.color }}
                    >
                      {post.category.name[locale]}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3 text-sm text-gray-500">
                    <span>{new Date(post.publishDate).toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US')}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                  <h3 className="font-playfair text-xl font-semibold mb-3 text-[#1C3C47] line-clamp-2">
                    {post.title[locale]}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt[locale]}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <span className="ml-2 text-sm font-medium text-[#1C3C47]">
                        {post.author.name}
                      </span>
                    </div>
                    <Link
                      href={`/${locale}/blog/${post.slug[locale]}`}
                      className="text-[#2CA6A4] font-medium hover:text-[#26928F] transition-colors"
                    >
                      {locale === 'de' ? 'Lesen →' : 'Read →'}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-[#2CA6A4] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#26928F] transition-colors">
              {locale === 'de' ? 'Mehr laden' : 'Load More Articles'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}