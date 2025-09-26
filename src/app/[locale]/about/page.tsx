"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '../components/LocaleProvider';
import { useTranslations } from '../components/useTranslations';

export default function AboutPage() {
  const locale = useLocale();
  const { t } = useTranslations();
  return (
    <div>
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-6">
          <Image 
            src="/images/sanovias_2.png" 
            alt="About Sanovias" 
            width={400} 
            height={150}
            className="mx-auto"
          />
          {/* Hidden H1 for SEO purposes */}
          <h1 className="sr-only">{t('about.hero.title')}</h1>
        </div>
        <p className="font-inter text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto text-center">
          {t('about.hero.description')}
        </p>
      </section>

      <section className="py-16 px-4 bg-[#F7F5F2]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl font-semibold mb-12 text-[#1C3C47]">{t('about.services.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#2CA6A4]/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#2CA6A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-3 text-[#1C3C47]">{t('about.services.items.fastAppointments.title')}</h3>
              <p className="font-inter text-gray-600 leading-relaxed">{t('about.services.items.fastAppointments.description')}</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#C9A66B]/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#C9A66B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-3 text-[#1C3C47]">{t('about.services.items.accreditedClinics.title')}</h3>
              <p className="font-inter text-gray-600 leading-relaxed">{t('about.services.items.accreditedClinics.description')}</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#2CA6A4]/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#2CA6A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-3 text-[#1C3C47]">{t('about.services.items.allInclusive.title')}</h3>
              <p className="font-inter text-gray-600 leading-relaxed">{t('about.services.items.allInclusive.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="font-playfair text-4xl font-semibold mb-6 text-[#1C3C47]">{t('about.approach.title')}</h2>
        <p className="font-inter text-gray-600 text-lg leading-relaxed mb-6 max-w-3xl mx-auto">{t('about.approach.description1')}</p>
        <p className="font-inter text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">{t('about.approach.description2')}</p>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 bg-gradient-to-br from-[#F7F5F2] to-[#F0F0F0]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-semibold mb-6 text-[#1C3C47]">{t('about.team.title')}</h2>
            <p className="max-w-2xl mx-auto font-inter text-gray-600 text-lg leading-relaxed">
              {t('about.team.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Alain Selmi */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group transform transition duration-300 hover:-translate-y-2">
              <div className="relative h-64 w-full">
                <Image 
                  src="/team/ala.jpg" 
                  alt="Ing. Alain A. Selmi" 
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              </div>
              <div className="p-6 relative -mt-20 bg-white rounded-t-2xl">
                <h3 className="font-playfair text-2xl font-semibold mb-1 text-[#1C3C47]">{t('about.team.members.alain.name')}</h3>
                <p className="text-[#2CA6A4] font-inter font-semibold mb-4">{t('about.team.members.alain.title')}</p>
                <p className="font-inter text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                  {t('about.team.members.alain.bio')}
                </p>
                <div className="flex space-x-3 pt-3 border-t border-gray-100">
                  <a 
                    href="https://www.linkedin.com/in/alain-a-selmi-70686825/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-100 text-blue-700 p-2 rounded-full hover:bg-blue-700 hover:text-white transition-colors duration-300"
                    aria-label="LinkedIn Profile"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <Link 
                    href={`/${locale}`}
                    className="bg-pink-100 text-pink-700 p-2 rounded-full hover:bg-pink-700 hover:text-white transition-colors duration-300"
                    aria-label="Instagram Profile"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Atef Souissi */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group transform transition duration-300 hover:-translate-y-2">
              <div className="relative h-64 w-full">
                <Image 
                  src="/team/atef.jpg" 
                  alt="Dr. Atef M. Souissi" 
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              </div>
              <div className="p-6 relative -mt-20 bg-white rounded-t-2xl">
                <h3 className="font-playfair text-2xl font-semibold mb-1 text-[#1C3C47]">{t('about.team.members.atef.name')}</h3>
                <p className="text-[#2CA6A4] font-inter font-semibold mb-4">{t('about.team.members.atef.title')}</p>
                <p className="font-inter text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                  {t('about.team.members.atef.bio')}
                </p>
                <div className="flex space-x-3 pt-3 border-t border-gray-100">
                  <a 
                    href="https://www.linkedin.com/in/mohamed-atef-souissi-a96742123" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-100 text-blue-700 p-2 rounded-full hover:bg-blue-700 hover:text-white transition-colors duration-300"
                    aria-label="LinkedIn Profile"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/drsouissioffice/?hl=en" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-pink-100 text-pink-700 p-2 rounded-full hover:bg-pink-700 hover:text-white transition-colors duration-300"
                    aria-label="Instagram Profile"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Values */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl font-semibold mb-12 text-[#1C3C47]">{t('about.commitment.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#2CA6A4]/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#2CA6A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-3 text-[#1C3C47]">{t('about.commitment.values.patientSafety.title')}</h3>
              <p className="font-inter text-gray-600 leading-relaxed">{t('about.commitment.values.patientSafety.description')}</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#C9A66B]/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#C9A66B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-3 text-[#1C3C47]">{t('about.commitment.values.transparency.title')}</h3>
              <p className="font-inter text-gray-600 leading-relaxed">{t('about.commitment.values.transparency.description')}</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#2CA6A4]/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#2CA6A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-3 text-[#1C3C47]">{t('about.commitment.values.personalizedCare.title')}</h3>
              <p className="font-inter text-gray-600 leading-relaxed">{t('about.commitment.values.personalizedCare.description')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
