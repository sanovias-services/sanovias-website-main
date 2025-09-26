"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "./LocaleProvider";
import { useTranslations } from "./useTranslations";

export default function Footer() {
  const locale = useLocale();
  const { t } = useTranslations();
  
  return (
    <footer className="bg-[#1C3C47] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Company Info */}
          <div>
            <Link href={`/${locale}`}>
              <Image
                src="/sanovias_logo.png"
                alt={t('footer.logoAlt')}
                width={140}
                height={45}
                className="object-contain h-[50px] w-auto mb-6 brightness-0 invert"
              />
            </Link>
            <p className="text-gray-300 text-sm mb-6 font-inter leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label={t('footer.socialMedia.facebook')}>
                <div className="bg-gray-700 hover:bg-[#2CA6A4] p-2 rounded-full transition-all duration-300 transform hover:-translate-y-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 320 512" aria-hidden="true">
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                  </svg>
                </div>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label={t('footer.socialMedia.instagram')}>
                <div className="bg-gray-700 hover:bg-[#2CA6A4] p-2 rounded-full transition-all duration-300 transform hover:-translate-y-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                  </svg>
                </div>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label={t('footer.socialMedia.linkedin')}>
                <div className="bg-gray-700 hover:bg-[#2CA6A4] p-2 rounded-full transition-all duration-300 transform hover:-translate-y-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true">
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* Site Map */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-teal-300">{t('footer.siteMap.title')}</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <Link href={`/${locale}`} className="text-gray-300 hover:text-white hover:translate-x-1 transition-transform duration-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {t('navigation.home')}
              </Link>
              <Link href={`/${locale}/services`} className="text-gray-300 hover:text-white hover:translate-x-1 transition-transform duration-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {t('navigation.services')}
              </Link>
              <Link href={`/${locale}/about`} className="text-gray-300 hover:text-white hover:translate-x-1 transition-transform duration-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {t('navigation.about')}
              </Link>
              <Link href={`/${locale}/contact`} className="text-gray-300 hover:text-white hover:translate-x-1 transition-transform duration-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {t('navigation.contact')}
              </Link>
              <Link href={`/${locale}/how`} className="text-gray-300 hover:text-white hover:translate-x-1 transition-transform duration-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {t('navigation.how')}
              </Link>
              <Link href={`/${locale}/about#partners`} className="text-gray-300 hover:text-white hover:translate-x-1 transition-transform duration-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {t('footer.siteMap.ourPartners')}
              </Link>
              <Link href={`/${locale}/about#faq`} className="text-gray-300 hover:text-white hover:translate-x-1 transition-transform duration-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {t('footer.siteMap.faqs')}
              </Link>
              <Link href={`/${locale}/about#team`} className="text-gray-300 hover:text-white hover:translate-x-1 transition-transform duration-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {t('footer.siteMap.ourTeam')}
              </Link>
              <Link href={`/${locale}/services#dental`} className="text-gray-300 hover:text-white hover:translate-x-1 transition-transform duration-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {t('footer.siteMap.dentalCare')}
              </Link>
              <Link href={`/${locale}/services#plastic`} className="text-gray-300 hover:text-white hover:translate-x-1 transition-transform duration-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {t('footer.siteMap.plasticSurgery')}
              </Link>
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-teal-300">{t('footer.contactInfo.title')}</h3>
            <address className="text-gray-300 text-sm not-italic space-y-3">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-teal-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span dangerouslySetInnerHTML={{ __html: t('footer.contactInfo.address') }} />
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-teal-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${t('footer.contactInfo.email')}`} className="hover:text-white transition-colors duration-200">{t('footer.contactInfo.email')}</a>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-teal-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${t('footer.contactInfo.phone').replace(/\s+/g, '')}`} className="hover:text-white transition-colors duration-200">{t('footer.contactInfo.phone')}</a>
              </div>
            </address>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-teal-300">{t('footer.newsletter.title')}</h3>
            <p className="text-gray-300 text-sm mb-4">{t('footer.newsletter.description')}</p>
            <form className="flex flex-col space-y-2">
              <input type="email" placeholder={t('footer.newsletter.emailPlaceholder')} className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white" />
              <button type="button" className="px-6 py-3 bg-[#2CA6A4] hover:bg-[#26928F] rounded-lg transition-colors duration-150 font-inter font-semibold text-sm uppercase tracking-wide">
                {t('footer.newsletter.subscribe')}
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-600 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p className="font-inter" dangerouslySetInnerHTML={{ __html: t('footer.copyright', { year: new Date().getFullYear() }) }} />
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href={`/${locale}/privacy`} className="font-inter hover:text-[#2CA6A4] transition-colors duration-200">{t('footer.legal.privacyPolicy')}</Link>
            <Link href={`/${locale}/terms`} className="font-inter hover:text-[#2CA6A4] transition-colors duration-200">{t('footer.legal.termsOfService')}</Link>
            <Link href={`/${locale}/cookies`} className="font-inter hover:text-[#2CA6A4] transition-colors duration-200">{t('footer.legal.cookiePolicy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}