'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '../types';

// Mock function to fetch blog post by slug - will be replaced with CMS integration
async function getBlogPost(slug: string, locale: 'en' | 'de'): Promise<BlogPost | null> {
  // Mock data - replace with actual API call to CMS
  const mockPost: BlogPost = {
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
      en: 'Discover why Tunisia has become a leading destination for plastic surgery.',
      de: 'Entdecken Sie, warum Tunesien ein führendes Ziel für plastische Chirurgie geworden ist.'
    },
    content: {
      en: `
        <h2>Why Choose Tunisia for Plastic Surgery?</h2>
        <p>Tunisia has emerged as one of the world's leading destinations for medical tourism, particularly for plastic surgery procedures. Here's why thousands of international patients choose Tunisia for their aesthetic needs:</p>
        
        <h3>1. World-Class Medical Expertise</h3>
        <p>Tunisian plastic surgeons are internationally trained and certified, with many having completed their studies in France, Germany, and the United States. Our surgeons at Sanovias maintain the highest standards of medical excellence.</p>
        
        <h3>2. Affordable Quality Care</h3>
        <p>Patients can save up to 70% on plastic surgery costs compared to Europe or North America, without compromising on quality. Our transparent pricing includes all medical procedures, accommodation, and aftercare.</p>
        
        <h3>3. State-of-the-Art Facilities</h3>
        <p>Tunisia's private healthcare sector boasts modern, internationally accredited facilities equipped with the latest medical technology and adhering to strict hygiene and safety protocols.</p>
        
        <h3>4. Beautiful Recovery Environment</h3>
        <p>What better place to recover than the beautiful Mediterranean coast? Tunisia offers a peaceful, warm climate that's ideal for post-surgery recovery, combined with rich cultural experiences.</p>
      `,
      de: `
        <h2>Warum Tunesien für plastische Chirurgie wählen?</h2>
        <p>Tunesien hat sich zu einem der weltweit führenden Ziele für Medizintourismus entwickelt, insbesondere für plastische Chirurgie. Hier ist der Grund, warum Tausende von internationalen Patienten Tunesien für ihre ästhetischen Bedürfnisse wählen:</p>
        
        <h3>1. Weltklasse medizinische Expertise</h3>
        <p>Tunesische plastische Chirurgen sind international ausgebildet und zertifiziert, viele haben ihre Studien in Frankreich, Deutschland und den USA abgeschlossen. Unsere Chirurgen bei Sanovias halten die höchsten Standards medizinischer Exzellenz ein.</p>
        
        <h3>2. Erschwingliche Qualitätspflege</h3>
        <p>Patienten können bis zu 70% der Kosten für plastische Chirurgie im Vergleich zu Europa oder Nordamerika sparen, ohne Kompromisse bei der Qualität einzugehen. Unsere transparente Preisgestaltung umfasst alle medizinischen Verfahren, Unterbringung und Nachsorge.</p>
        
        <h3>3. Hochmoderne Einrichtungen</h3>
        <p>Tunesiens privater Gesundheitssektor verfügt über moderne, international akkreditierte Einrichtungen, die mit der neuesten Medizintechnik ausgestattet sind und strenge Hygiene- und Sicherheitsprotokolle einhalten.</p>
        
        <h3>4. Schöne Erholungsumgebung</h3>
        <p>Welcher Ort ist besser zur Erholung geeignet als die wunderschöne Mittelmeerküste? Tunesien bietet ein friedliches, warmes Klima, das ideal für die Genesung nach der Operation ist, kombiniert mit reichen kulturellen Erfahrungen.</p>
      `
    },
    category: {
      id: 'plastic-surgery',
      name: { en: 'Plastic Surgery', de: 'Plastische Chirurgie' },
      slug: { en: 'plastic-surgery', de: 'plastische-chirurgie' },
      description: { en: '', de: '' },
      color: '#2CA6A4',
      icon: 'scalpel'
    },
    author: {
      id: 'dr-atef-souissi',
      name: 'Dr. Atef M. Souissi',
      title: {
        en: 'Chief Medical Officer & Plastic Surgeon',
        de: 'Ärztlicher Direktor & Plastischer Chirurg'
      },
      bio: {
        en: 'Dr. Souissi is a board-certified plastic surgeon with over 15 years of experience.',
        de: 'Dr. Souissi ist ein staatlich geprüfter plastischer Chirurg mit über 15 Jahren Erfahrung.'
      },
      avatar: '/images/team/atef.jpg',
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
      width: 1200,
      height: 600
    },
    tags: ['plastic-surgery', 'tunisia', 'medical-tourism'],
    metaDescription: {
      en: 'Complete guide to plastic surgery in Tunisia - procedures, costs, best surgeons.',
      de: 'Vollständiger Leitfaden für plastische Chirurgie in Tunesien - Verfahren, Kosten, beste Chirurgen.'
    },
    readingTime: 8,
    featured: true,
    status: 'published'
  };

  // Check if slug matches
  if (mockPost.slug[locale] === slug) {
    return mockPost;
  }
  
  return null;
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [resolvedParams, setResolvedParams] = useState<{ slug: string; locale: 'en' | 'de' } | null>(null);

  useEffect(() => {
    async function resolveParams() {
      const resolvedParamsData = await params;
      setResolvedParams({
        slug: resolvedParamsData.slug,
        locale: resolvedParamsData.locale as 'en' | 'de'
      });
    }
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;

    async function fetchPost() {
      if (!resolvedParams) return;
      
      try {
        const blogPost = await getBlogPost(resolvedParams.slug, resolvedParams.locale);
        if (!blogPost) {
          notFound();
          return;
        }
        setPost(blogPost);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [resolvedParams]);

  if (loading || !resolvedParams) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2CA6A4] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href={`/${resolvedParams.locale}`} className="hover:text-[#2CA6A4] transition-colors">
              {resolvedParams.locale === 'de' ? 'Startseite' : 'Home'}
            </Link>
            <span className="mx-2">→</span>
            <Link href={`/${resolvedParams.locale}/blog`} className="hover:text-[#2CA6A4] transition-colors">
              Blog
            </Link>
            <span className="mx-2">→</span>
            <span className="text-[#2CA6A4]">{post.category.name[resolvedParams.locale]}</span>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <header className="py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <span 
                className="px-4 py-2 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: post.category.color }}
              >
                {post.category.name[resolvedParams.locale]}
              </span>
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#1C3C47] mb-6">
              {post.title[resolvedParams.locale]}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {post.excerpt[resolvedParams.locale]}
            </p>
            
            {/* Author and Meta Info */}
            <div className="flex items-center justify-center space-x-6 text-gray-600">
              <div className="flex items-center">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="ml-3 text-left">
                  <p className="font-medium text-[#1C3C47]">{post.author.name}</p>
                  <p className="text-sm">{post.author.title[resolvedParams.locale]}</p>
                </div>
              </div>
              <div className="text-sm">
                <p>{new Date(post.publishDate).toLocaleDateString(resolvedParams.locale === 'de' ? 'de-DE' : 'en-US')}</p>
                <p>{post.readingTime} {resolvedParams.locale === 'de' ? 'Min. Lesezeit' : 'min read'}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="relative h-96 mb-12">
        <Image
          src={post.featuredImage.url}
          alt={post.featuredImage.alt[resolvedParams.locale]}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 pb-16">
        <div 
          className="prose prose-lg max-w-none prose-headings:text-[#1C3C47] prose-headings:font-playfair prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#2CA6A4] prose-a:hover:text-[#26928F]"
          dangerouslySetInnerHTML={{ __html: post.content[resolvedParams.locale] }}
        />

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="font-semibold text-[#1C3C47] mb-4">
            {resolvedParams.locale === 'de' ? 'Schlagwörter:' : 'Tags:'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-12 p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl">
          <div className="flex items-start">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="ml-6">
              <h3 className="font-playfair text-2xl font-semibold text-[#1C3C47] mb-2">
                {post.author.name}
              </h3>
              <p className="text-[#2CA6A4] font-medium mb-3">
                {post.author.title[resolvedParams.locale]}
              </p>
              <p className="text-gray-700 mb-4">
                {post.author.bio[resolvedParams.locale]}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.author.specialties.map(specialty => (
                  <span
                    key={specialty}
                    className="px-3 py-1 bg-[#2CA6A4]/10 text-[#2CA6A4] rounded-full text-sm font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-br from-[#1C3C47] to-[#2CA6A4] text-white p-12 rounded-2xl">
          <h3 className="font-playfair text-3xl font-semibold mb-4">
            {resolvedParams.locale === 'de' ? 'Bereit für Ihre Transformation?' : 'Ready for Your Transformation?'}
          </h3>
          <p className="text-xl mb-8 opacity-90">
            {resolvedParams.locale === 'de' 
              ? 'Kontaktieren Sie uns für eine persönliche Beratung zu Ihren medizinischen Bedürfnissen.'
              : 'Contact us for a personalized consultation about your medical needs.'
            }
          </p>
          <Link
            href={`/${resolvedParams.locale}/contact`}
            className="inline-block bg-white text-[#1C3C47] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            {resolvedParams.locale === 'de' ? 'Kostenlose Beratung anfordern' : 'Get Free Consultation'}
          </Link>
        </div>
      </article>
    </div>
  );
}