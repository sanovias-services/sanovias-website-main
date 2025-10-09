"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '../components/LocaleProvider';
import { useTranslations } from '../../../hooks/useTranslations';

export default function EventsPage() {
  const locale = useLocale();
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Logo */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <Image 
            src="/sanovias_logo.png" 
            alt={t('footer.logoAlt')} 
            width={400} 
            height={150}
            className="mx-auto object-contain h-32 w-auto"
          />
        </div>
        
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-playfair text-4xl lg:text-5xl font-bold mb-6 text-[#1C3C47]">
            {t('events.hero.title')}
          </h1>
          <p className="font-inter text-gray-600 text-lg leading-relaxed mb-12">
            {t('events.hero.description')}
          </p>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="py-16 px-4 bg-[#F7F5F2]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-playfair text-3xl font-semibold mb-6 text-[#1C3C47]">
            {t('footer.newsletter.title')}
          </h2>
          <p className="font-inter text-gray-600 text-lg mb-8 leading-relaxed">
            {t('footer.newsletter.description')}
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-12">
            <input 
              type="email" 
              placeholder={t('footer.newsletter.emailPlaceholder')} 
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2CA6A4] focus:border-transparent font-inter"
            />
            <button 
              type="button" 
              className="px-8 py-3 bg-[#2CA6A4] hover:bg-[#26928F] text-white rounded-lg transition-colors duration-150 font-inter font-semibold text-sm uppercase tracking-wide whitespace-nowrap"
            >
              {t('footer.newsletter.subscribe')}
            </button>
          </form>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-playfair text-3xl font-semibold mb-6 text-[#1C3C47]">
            {t('events.social.title')}
          </h2>
          <p className="font-inter text-gray-600 text-lg mb-8 leading-relaxed">
            {t('events.social.description')}
          </p>
          
          <div className="flex justify-center space-x-6">
            <a href="https://www.facebook.com/sanovias" target="_blank" rel="noopener noreferrer" aria-label={t('footer.socialMedia.facebook')}>
              <div className="bg-[#2CA6A4] hover:bg-[#26928F] p-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 320 512" aria-hidden="true">
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                </svg>
              </div>
            </a>
            <a href="https://www.instagram.com/sanovias_official" target="_blank" rel="noopener noreferrer" aria-label={t('footer.socialMedia.instagram')}>
              <div className="bg-[#2CA6A4] hover:bg-[#26928F] p-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 448 512" aria-hidden="true">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                </svg>
              </div>
            </a>
            <a href="https://www.linkedin.com/company/sanoviasofficial" target="_blank" rel="noopener noreferrer" aria-label={t('footer.socialMedia.linkedin')}>
              <div className="bg-[#2CA6A4] hover:bg-[#26928F] p-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 448 512" aria-hidden="true">
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#1C3C47] text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-playfair text-3xl font-semibold mb-6">
            {t('events.cta.title')}
          </h2>
          <p className="font-inter text-gray-300 text-lg mb-8 leading-relaxed">
            {t('events.cta.description')}
          </p>
          <Link 
            href={`/${locale}/contact`}
            className="inline-block px-8 py-4 bg-[#2CA6A4] hover:bg-[#26928F] text-white rounded-lg transition-colors duration-150 font-inter font-semibold text-base uppercase tracking-wide"
          >
            {t('navigation.contact')}
          </Link>
        </div>
      </section>
    </div>
  );
}