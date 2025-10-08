"use client";

import { useTranslations } from '../../../../hooks/useTranslations';
import Link from 'next/link';

export default function TermsOfServicePage() {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C3C47] mb-6 leading-tight">
            {t('termsOfService.title')}
          </h1>
          <div className="inline-flex items-center bg-[#F7F5F2] px-6 py-3 rounded-lg">
            <svg className="w-5 h-5 text-[#2CA6A4] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-inter text-[#6B7280]">
              <strong className="text-[#1C3C47]">{t('termsOfService.lastUpdated')}</strong> {t('termsOfService.lastUpdatedDate')}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg overflow-hidden" style={{ boxShadow: '0 4px 12px -4px rgba(0,0,0,0.12)' }}>
          <div className="p-8 lg:p-12">
            
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('termsOfService.introduction.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p className="text-lg">{t('termsOfService.introduction.paragraph1')}</p>
                <p>{t('termsOfService.introduction.paragraph2')}</p>
                <p>{t('termsOfService.introduction.paragraph3')}</p>
              </div>
            </section>

            {/* Services of Sanovias */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('termsOfService.services.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed mb-8">
                <p>{t('termsOfService.services.introduction')}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#F7F5F2] border-l-4 border-[#2CA6A4] p-6 rounded-lg">
                  <h3 className="font-playfair text-xl font-semibold text-[#1C3C47] mb-3">
                    {t('termsOfService.services.platform.title')}
                  </h3>
                  <p className="font-inter text-[#1F2937] text-sm">
                    {t('termsOfService.services.platform.description')}
                  </p>
                </div>
                <div className="bg-[#F7F5F2] border-l-4 border-[#C9A66B] p-6 rounded-lg">
                  <h3 className="font-playfair text-xl font-semibold text-[#1C3C47] mb-3">
                    {t('termsOfService.services.consultation.title')}
                  </h3>
                  <p className="font-inter text-[#1F2937] text-sm">
                    {t('termsOfService.services.consultation.description')}
                  </p>
                </div>
                <div className="bg-[#F7F5F2] border-l-4 border-[#2CA6A4] p-6 rounded-lg">
                  <h3 className="font-playfair text-xl font-semibold text-[#1C3C47] mb-3">
                    {t('termsOfService.services.coordination.title')}
                  </h3>
                  <p className="font-inter text-[#1F2937] text-sm">
                    {t('termsOfService.services.coordination.description')}
                  </p>
                </div>
                <div className="bg-[#F7F5F2] border-l-4 border-[#C9A66B] p-6 rounded-lg">
                  <h3 className="font-playfair text-xl font-semibold text-[#1C3C47] mb-3">
                    {t('termsOfService.services.records.title')}
                  </h3>
                  <p className="font-inter text-[#1F2937] text-sm">
                    {t('termsOfService.services.records.description')}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#2CA6A4] to-[#26928F] rounded-lg p-6 text-white">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-white mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-playfair text-lg font-semibold mb-2">{t('termsOfService.services.disclaimer.title')}</h4>
                    <p className="font-inter text-sm text-white/90">{t('termsOfService.services.disclaimer.description')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Registration */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('termsOfService.registration.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('termsOfService.registration.paragraph1')}</p>
                <p>{t('termsOfService.registration.paragraph2')}</p>
                <p>{t('termsOfService.registration.paragraph3')}</p>
              </div>
              
              <div className="mt-6 bg-[#F7F5F2] p-6 rounded-lg border-l-4 border-[#1C3C47]">
                <h4 className="font-playfair text-lg font-semibold text-[#1C3C47] mb-3">
                  {t('termsOfService.registration.requirements.title')}
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start font-inter text-[#1F2937] text-sm">
                    <span className="w-2 h-2 bg-[#2CA6A4] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('termsOfService.registration.requirements.age')}
                  </li>
                  <li className="flex items-start font-inter text-[#1F2937] text-sm">
                    <span className="w-2 h-2 bg-[#2CA6A4] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('termsOfService.registration.requirements.info')}
                  </li>
                  <li className="flex items-start font-inter text-[#1F2937] text-sm">
                    <span className="w-2 h-2 bg-[#2CA6A4] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('termsOfService.registration.requirements.consent')}
                  </li>
                </ul>
              </div>
            </section>

            {/* Contract Parties */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('termsOfService.contractParties.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed mb-6">
                <p>{t('termsOfService.contractParties.paragraph1')}</p>
                <p>{t('termsOfService.contractParties.paragraph2')}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#2CA6A4] to-[#26928F] rounded-lg p-6 text-white">
                  <h3 className="font-playfair text-xl font-semibold mb-4">{t('termsOfService.contractParties.sanovias.title')}</h3>
                  <div className="space-y-2 font-inter text-sm">
                    <p><strong>Sanovias Medical Tourism</strong></p>
                    <p>123 Medical Avenue</p>
                    <p>Tunis 1002, Tunisia</p>
                    <p>Email: info@sanovias.com</p>
                    <p>Phone: +216 123 456 789</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#C9A66B] to-[#B8956A] rounded-lg p-6 text-white">
                  <h3 className="font-playfair text-xl font-semibold mb-4">{t('termsOfService.contractParties.patient.title')}</h3>
                  <div className="font-inter text-sm">
                    <p>{t('termsOfService.contractParties.patient.description')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Platform Usage */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('termsOfService.platformUsage.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('termsOfService.platformUsage.paragraph1')}</p>
                <p>{t('termsOfService.platformUsage.paragraph2')}</p>
                <p>{t('termsOfService.platformUsage.paragraph3')}</p>
              </div>

              <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.866-.83-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <h4 className="font-playfair text-lg font-semibold text-yellow-800 mb-2">
                      {t('termsOfService.platformUsage.commitment.title')}
                    </h4>
                    <p className="font-inter text-sm text-yellow-700">
                      {t('termsOfService.platformUsage.commitment.description')}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Content */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('termsOfService.content.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('termsOfService.content.paragraph1')}</p>
                <p>{t('termsOfService.content.paragraph2')}</p>
                <p>{t('termsOfService.content.paragraph3')}</p>
              </div>
            </section>

            {/* Usage Rights */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('termsOfService.usageRights.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('termsOfService.usageRights.paragraph1')}</p>
                <p>{t('termsOfService.usageRights.paragraph2')}</p>
              </div>

              <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
                <h4 className="font-playfair text-lg font-semibold text-red-800 mb-3">
                  {t('termsOfService.usageRights.prohibited.title')}
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start font-inter text-red-700 text-sm">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('termsOfService.usageRights.prohibited.commercial')}
                  </li>
                  <li className="flex items-start font-inter text-red-700 text-sm">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('termsOfService.usageRights.prohibited.modification')}
                  </li>
                  <li className="flex items-start font-inter text-red-700 text-sm">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('termsOfService.usageRights.prohibited.distribution')}
                  </li>
                  <li className="flex items-start font-inter text-red-700 text-sm">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('termsOfService.usageRights.prohibited.illegal')}
                  </li>
                </ul>
              </div>
            </section>

            {/* Guarantee and System Availability */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('termsOfService.guarantee.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('termsOfService.guarantee.paragraph1')}</p>
                <p>{t('termsOfService.guarantee.paragraph2')}</p>
                <p>{t('termsOfService.guarantee.paragraph3')}</p>
              </div>
            </section>

            {/* Liability */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('termsOfService.liability.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('termsOfService.liability.paragraph1')}</p>
                <p>{t('termsOfService.liability.paragraph2')}</p>
                <p>{t('termsOfService.liability.paragraph3')}</p>
              </div>

              <div className="mt-8 bg-orange-50 border-l-4 border-orange-400 p-6 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-orange-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.866-.83-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <h4 className="font-playfair text-lg font-semibold text-orange-800 mb-2">
                      {t('termsOfService.liability.medical.title')}
                    </h4>
                    <p className="font-inter text-sm text-orange-700">
                      {t('termsOfService.liability.medical.description')}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Protection */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('termsOfService.dataProtection.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('termsOfService.dataProtection.paragraph1')}</p>
                <p>{t('termsOfService.dataProtection.paragraph2')}</p>
              </div>

              <div className="mt-6 bg-[#F7F5F2] border border-[#2CA6A4] rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-[#2CA6A4] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h4 className="font-playfair text-lg font-semibold text-[#1C3C47]">
                    {t('termsOfService.dataProtection.reference.title')}
                  </h4>
                </div>
                <p className="font-inter text-sm text-[#1F2937] mb-3">
                  {t('termsOfService.dataProtection.reference.description')}
                </p>
                <Link 
                  href="/policies/privacy" 
                  className="inline-flex items-center text-[#2CA6A4] font-inter font-medium text-sm hover:underline"
                >
                  {t('termsOfService.dataProtection.reference.link')}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            </section>

            {/* Confidentiality */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('termsOfService.confidentiality.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('termsOfService.confidentiality.paragraph1')}</p>
                <p>{t('termsOfService.confidentiality.paragraph2')}</p>
                <p>{t('termsOfService.confidentiality.paragraph3')}</p>
              </div>
            </section>

            {/* Electronic Communication */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('termsOfService.electronicCommunication.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('termsOfService.electronicCommunication.paragraph1')}</p>
                <p>{t('termsOfService.electronicCommunication.paragraph2')}</p>
                <p>{t('termsOfService.electronicCommunication.paragraph3')}</p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('termsOfService.changes.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('termsOfService.changes.paragraph1')}</p>
                <p>{t('termsOfService.changes.paragraph2')}</p>
                <p>{t('termsOfService.changes.paragraph3')}</p>
              </div>
            </section>

            {/* Final Provisions */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('termsOfService.finalProvisions.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('termsOfService.finalProvisions.paragraph1')}</p>
                <p>{t('termsOfService.finalProvisions.paragraph2')}</p>
                <p>{t('termsOfService.finalProvisions.paragraph3')}</p>
              </div>

              <div className="mt-8 bg-[#1C3C47] text-white rounded-lg p-8">
                <div className="text-center">
                  <h3 className="font-playfair text-xl font-semibold mb-4">
                    {t('termsOfService.finalProvisions.effectiveDate.title')}
                  </h3>
                  <p className="font-inter mb-6">
                    {t('termsOfService.finalProvisions.effectiveDate.description')}
                  </p>
                  <div className="flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#2CA6A4] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-inter font-semibold text-[#2CA6A4]">
                      {t('termsOfService.lastUpdatedDate')}
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