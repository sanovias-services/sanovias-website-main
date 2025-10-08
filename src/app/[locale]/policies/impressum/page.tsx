"use client";

import { useTranslations } from '../../../../hooks/useTranslations';
import Link from 'next/link';

export default function ImpressumPage() {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C3C47] mb-6 leading-tight">
            {t('impressum.title')}
          </h1>
          <div className="inline-flex items-center bg-[#F7F5F2] px-6 py-3 rounded-lg">
            <svg className="w-5 h-5 text-[#2CA6A4] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H7m2 0v-5a2 2 0 012-2h2a2 2 0 012 2v5m-6 0V9a2 2 0 012-2h2a2 2 0 012 2v9" />
            </svg>
            <span className="font-inter text-[#6B7280]">
              <strong className="text-[#1C3C47]">{t('impressum.lastUpdated')}</strong> {t('impressum.lastUpdatedDate')}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg overflow-hidden" style={{ boxShadow: '0 4px 12px -4px rgba(0,0,0,0.12)' }}>
          <div className="p-8 lg:p-12">
            
            {/* Company Information */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('impressum.companyInfo.title')}
              </h2>
              <div className="bg-gradient-to-r from-[#2CA6A4] to-[#26928F] rounded-lg p-8 text-white mb-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-playfair text-xl font-semibold mb-4">
                      {t('impressum.companyInfo.company')}
                    </h3>
                    <div className="space-y-2 font-inter">
                      <p><strong>Sanovias Medical Tourism</strong></p>
                      <p>123 Medical Avenue</p>
                      <p>Tunis 1002, Tunisia</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl font-semibold mb-4">
                      {t('impressum.companyInfo.contact')}
                    </h3>
                    <div className="space-y-2 font-inter">
                      <p><strong>{t('impressum.companyInfo.email')}</strong> info@sanovias.com</p>
                      <p><strong>{t('impressum.companyInfo.phone')}</strong> +216 123 456 789</p>
                      <p><strong>{t('impressum.companyInfo.website')}</strong> www.sanovias.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('impressum.companyInfo.description1')}</p>
                <p>{t('impressum.companyInfo.description2')}</p>
              </div>
            </section>

            {/* Responsible Person */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('impressum.responsible.title')}
              </h2>
              <div className="bg-[#F7F5F2] border-l-4 border-[#C9A66B] p-6 rounded-lg">
                <div className="space-y-4 font-inter text-[#1F2937]">
                  <p>{t('impressum.responsible.description')}</p>
                  <div className="font-semibold">
                    <p>{t('impressum.responsible.name')}</p>
                    <p>{t('impressum.responsible.position')}</p>
                    <p className="text-[#2CA6A4]">{t('impressum.responsible.email')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Legal Disclaimers */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('impressum.disclaimer.title')}
              </h2>
              
              {/* Content Liability */}
              <div className="mb-8">
                <h3 className="font-playfair text-xl font-semibold text-[#1C3C47] mb-4">
                  {t('impressum.disclaimer.content.title')}
                </h3>
                <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                  <p>{t('impressum.disclaimer.content.paragraph1')}</p>
                  <p>{t('impressum.disclaimer.content.paragraph2')}</p>
                </div>
              </div>

              {/* Links Liability */}
              <div className="mb-8">
                <h3 className="font-playfair text-xl font-semibold text-[#1C3C47] mb-4">
                  {t('impressum.disclaimer.links.title')}
                </h3>
                <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                  <p>{t('impressum.disclaimer.links.paragraph1')}</p>
                  <p>{t('impressum.disclaimer.links.paragraph2')}</p>
                </div>
              </div>

              {/* Copyright */}
              <div className="mb-8">
                <h3 className="font-playfair text-xl font-semibold text-[#1C3C47] mb-4">
                  {t('impressum.disclaimer.copyright.title')}
                </h3>
                <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                  <p>{t('impressum.disclaimer.copyright.paragraph1')}</p>
                  <p>{t('impressum.disclaimer.copyright.paragraph2')}</p>
                </div>
              </div>
            </section>

            {/* Medical Disclaimers */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('impressum.medical.title')}
              </h2>
              
              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg mb-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.866-.83-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <h4 className="font-playfair text-lg font-semibold text-red-800 mb-2">
                      {t('impressum.medical.warning.title')}
                    </h4>
                    <p className="font-inter text-sm text-red-700">
                      {t('impressum.medical.warning.description')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('impressum.medical.paragraph1')}</p>
                <p>{t('impressum.medical.paragraph2')}</p>
                <p>{t('impressum.medical.paragraph3')}</p>
              </div>
            </section>

            {/* Data Protection Reference */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('impressum.dataProtection.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed mb-6">
                <p>{t('impressum.dataProtection.paragraph1')}</p>
                <p>{t('impressum.dataProtection.paragraph2')}</p>
              </div>

              <div className="bg-[#F7F5F2] border border-[#2CA6A4] rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-[#2CA6A4] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h4 className="font-playfair text-lg font-semibold text-[#1C3C47]">
                    {t('impressum.dataProtection.reference.title')}
                  </h4>
                </div>
                <p className="font-inter text-sm text-[#1F2937] mb-3">
                  {t('impressum.dataProtection.reference.description')}
                </p>
                <Link 
                  href="/policies/privacy" 
                  className="inline-flex items-center text-[#2CA6A4] font-inter font-medium text-sm hover:underline"
                >
                  {t('impressum.dataProtection.reference.link')}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            </section>

            {/* Dispute Resolution */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('impressum.dispute.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('impressum.dispute.paragraph1')}</p>
                <p>{t('impressum.dispute.paragraph2')}</p>
              </div>
              
              <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
                <h4 className="font-playfair text-lg font-semibold text-blue-800 mb-3">
                  {t('impressum.dispute.eu.title')}
                </h4>
                <p className="font-inter text-sm text-blue-700 mb-3">
                  {t('impressum.dispute.eu.description')}
                </p>
                <a 
                  href="https://ec.europa.eu/consumers/odr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 font-inter font-medium text-sm hover:underline"
                >
                  {t('impressum.dispute.eu.link')}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </section>

            {/* Contact Misuse Protection */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('impressum.contactProtection.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('impressum.contactProtection.paragraph1')}</p>
                <p>{t('impressum.contactProtection.paragraph2')}</p>
              </div>
            </section>

            {/* Final Information */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('impressum.final.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('impressum.final.paragraph1')}</p>
                <p>{t('impressum.final.paragraph2')}</p>
              </div>

              <div className="mt-8 bg-[#1C3C47] text-white rounded-lg p-8">
                <div className="text-center">
                  <h3 className="font-playfair text-xl font-semibold mb-4">
                    {t('impressum.final.effectiveDate.title')}
                  </h3>
                  <p className="font-inter mb-6">
                    {t('impressum.final.effectiveDate.description')}
                  </p>
                  <div className="flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#2CA6A4] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-inter font-semibold text-[#2CA6A4]">
                      {t('impressum.lastUpdatedDate')}
                    </span>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}