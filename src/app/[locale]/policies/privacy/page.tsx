"use client";

import Link from 'next/link';
import { useTranslations } from '../../../../hooks/useTranslations';
import { useLocale } from '../../components/LocaleProvider';

export default function PrivacyPolicyPage() {
  const { t } = useTranslations();
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C3C47] mb-8 leading-tight">
            {t('privacyPolicy.title')}
          </h1>
          <div className="inline-flex items-center bg-[#F7F5F2] px-6 py-3 rounded-lg shadow-sm">
            <svg className="w-5 h-5 text-[#2CA6A4] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-inter text-sm text-[#6B7280]">
              <strong className="text-[#1C3C47] font-medium">{t('privacyPolicy.lastUpdated')}</strong> {t('privacyPolicy.lastUpdatedDate')}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg overflow-hidden" style={{ boxShadow: '0 4px 12px -4px rgba(0,0,0,0.08)' }}>
          <div className="p-8 lg:p-12">
            
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('privacyPolicy.introduction.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937]" style={{ lineHeight: '1.65' }}>
                <p className="text-lg">{t('privacyPolicy.introduction.paragraph1')}</p>
                <p className="text-base">{t('privacyPolicy.introduction.paragraph2')}</p>
                <p className="text-base">{t('privacyPolicy.introduction.paragraph3')}</p>
              </div>
            </section>

            {/* Contact Details */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('privacyPolicy.contact.title')}
              </h2>
              <div className="font-inter text-[#1F2937]" style={{ lineHeight: '1.65' }}>
                <p className="mb-6 text-base">{t('privacyPolicy.contact.paragraph1')}</p>
                <div className="bg-[#F7F5F2] p-6 rounded-lg mb-6" style={{ boxShadow: '0 2px 4px -2px rgba(0,0,0,0.08)' }}>
                  <h3 className="font-inter font-semibold text-[#1C3C47] text-xl mb-4">{t('privacyPolicy.contact.companyName')}</h3>
                  <div className="space-y-3">
                    <p className="whitespace-pre-line text-base">{t('privacyPolicy.contact.address')}</p>
                    <p className="text-base">
                      <strong className="font-medium">{t('contact.form.fields.email.label')}:</strong>{' '}
                      <a href={`mailto:${t('privacyPolicy.contact.email')}`} className="text-[#2CA6A4] hover:text-[#26928F] transition-colors duration-200 hover:underline">
                        {t('privacyPolicy.contact.email')}
                      </a>
                    </p>
                    <p className="text-base">
                      <strong className="font-medium">{t('contact.form.fields.phone.label')}:</strong>{' '}
                      <a href={`tel:${t('privacyPolicy.contact.phone')}`} className="text-[#2CA6A4] hover:text-[#26928F] transition-colors duration-200 hover:underline">
                        {t('privacyPolicy.contact.phone')}
                      </a>
                    </p>
                  </div>
                </div>
                <p className="text-base">{t('privacyPolicy.contact.paragraph2')}</p>
              </div>
            </section>

            {/* Data Processing Scope */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('privacyPolicy.dataProcessing.title')}
              </h2>
              <div className="font-inter text-[#1F2937]" style={{ lineHeight: '1.65' }}>
                <p className="mb-6 text-base">{t('privacyPolicy.dataProcessing.paragraph1')}</p>
                <div className="space-y-4">
                  <div className="bg-[#F7F5F2] p-6 rounded-lg" style={{ boxShadow: '0 2px 4px -2px rgba(0,0,0,0.08)' }}>
                    <p className="text-base"><strong className="font-medium">Art. 6(1)(a) GDPR:</strong> {t('privacyPolicy.dataProcessing.legalBasis.consent')}</p>
                  </div>
                  <div className="bg-[#F7F5F2] p-6 rounded-lg" style={{ boxShadow: '0 2px 4px -2px rgba(0,0,0,0.08)' }}>
                    <p className="text-base"><strong className="font-medium">Art. 6(1)(b) GDPR:</strong> {t('privacyPolicy.dataProcessing.legalBasis.contract')}</p>
                  </div>
                  <div className="bg-[#F7F5F2] p-6 rounded-lg" style={{ boxShadow: '0 2px 4px -2px rgba(0,0,0,0.08)' }}>
                    <p className="text-base"><strong className="font-medium">Art. 6(1)(c) GDPR:</strong> {t('privacyPolicy.dataProcessing.legalBasis.legalObligation')}</p>
                  </div>
                  <div className="bg-[#F7F5F2] p-6 rounded-lg" style={{ boxShadow: '0 2px 4px -2px rgba(0,0,0,0.08)' }}>
                    <p className="text-base"><strong className="font-medium">Art. 6(1)(f) GDPR:</strong> {t('privacyPolicy.dataProcessing.legalBasis.legitimateInterests')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Transfer Outside EEA */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('privacyPolicy.dataTransfer.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('privacyPolicy.dataTransfer.paragraph1')}</p>
                <p>{t('privacyPolicy.dataTransfer.paragraph2')}</p>
                <p>{t('privacyPolicy.dataTransfer.paragraph3')}</p>
              </div>
            </section>

            {/* Storage Duration */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('privacyPolicy.retention.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('privacyPolicy.retention.paragraph1')}</p>
                <p>{t('privacyPolicy.retention.paragraph2')}</p>
              </div>
            </section>

            {/* Data Subject Rights */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('privacyPolicy.dataRights.title')}
              </h2>
              <div className="font-inter text-[#1F2937] leading-relaxed">
                <p className="mb-6">{t('privacyPolicy.dataRights.introduction')}</p>
                
                <div className="space-y-6">
                  {/* Right of Access */}
                  <div className="border-l-4 border-[#2CA6A4] pl-6">
                    <h3 className="font-semibold text-[#1C3C47] text-xl mb-3">
                      {t('privacyPolicy.dataRights.access.title')}
                    </h3>
                    <p className="mb-3">{t('privacyPolicy.dataRights.access.description')}</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>the processing purposes</li>
                      <li>the categories of personal data being processed</li>
                      <li>the recipients or categories of recipients to whom the personal data have been or will be disclosed</li>
                      <li>where possible, the planned duration for which personal data will be stored</li>
                      <li>the existence of rights to rectification, erasure, restriction or objection</li>
                      <li>the existence of a right to lodge a complaint with a supervisory authority</li>
                      <li>where personal data are not collected from the data subject: information as to their source</li>
                      <li>the existence of automated decision-making, including profiling</li>
                    </ul>
                  </div>

                  {/* Right to Rectification */}
                  <div className="border-l-4 border-[#C9A66B] pl-6">
                    <h3 className="font-semibold text-[#1C3C47] text-xl mb-3">
                      {t('privacyPolicy.dataRights.rectification.title')}
                    </h3>
                    <p>{t('privacyPolicy.dataRights.rectification.description')}</p>
                  </div>

                  {/* Right to Erasure */}
                  <div className="border-l-4 border-[#2CA6A4] pl-6">
                    <h3 className="font-semibold text-[#1C3C47] text-xl mb-3">
                      {t('privacyPolicy.dataRights.erasure.title')}
                    </h3>
                    <p className="mb-3">{t('privacyPolicy.dataRights.erasure.description')}</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Personal data are no longer necessary for the original purposes</li>
                      <li>The data subject withdraws consent and there is no other legal ground</li>
                      <li>The data subject objects and there are no overriding legitimate grounds</li>
                      <li>Personal data have been unlawfully processed</li>
                      <li>Erasure is required for compliance with a legal obligation</li>
                    </ul>
                  </div>

                  {/* Right to Restriction */}
                  <div className="border-l-4 border-[#C9A66B] pl-6">
                    <h3 className="font-semibold text-[#1C3C47] text-xl mb-3">
                      {t('privacyPolicy.dataRights.restriction.title')}
                    </h3>
                    <p className="mb-3">{t('privacyPolicy.dataRights.restriction.description')}</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>The accuracy of personal data is contested by the data subject</li>
                      <li>Processing is unlawful and the data subject opposes erasure</li>
                      <li>The controller no longer needs the data but the data subject requires them for legal claims</li>
                      <li>The data subject has objected to processing pending verification</li>
                    </ul>
                  </div>

                  {/* Right to Data Portability */}
                  <div className="border-l-4 border-[#2CA6A4] pl-6">
                    <h3 className="font-semibold text-[#1C3C47] text-xl mb-3">
                      {t('privacyPolicy.dataRights.portability.title')}
                    </h3>
                    <p>{t('privacyPolicy.dataRights.portability.description')}</p>
                  </div>

                  {/* Right to Object */}
                  <div className="border-l-4 border-[#C9A66B] pl-6">
                    <h3 className="font-semibold text-[#1C3C47] text-xl mb-3">
                      {t('privacyPolicy.dataRights.objection.title')}
                    </h3>
                    <p>{t('privacyPolicy.dataRights.objection.description')}</p>
                  </div>

                  {/* Right to Withdraw Consent */}
                  <div className="border-l-4 border-[#2CA6A4] pl-6">
                    <h3 className="font-semibold text-[#1C3C47] text-xl mb-3">
                      {t('privacyPolicy.dataRights.withdrawConsent.title')}
                    </h3>
                    <p>{t('privacyPolicy.dataRights.withdrawConsent.description')}</p>
                  </div>

                  {/* Right to Complaint */}
                  <div className="border-l-4 border-[#C9A66B] pl-6">
                    <h3 className="font-semibold text-[#1C3C47] text-xl mb-3">
                      {t('privacyPolicy.dataRights.complaint.title')}
                    </h3>
                    <p>{t('privacyPolicy.dataRights.complaint.description')}</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-[#2CA6A4]/10 rounded-lg">
                  <p className="font-semibold text-[#1C3C47]">{t('privacyPolicy.dataRights.contact')}</p>
                </div>
              </div>
            </section>

            {/* Website Data Processing */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('privacyPolicy.websiteData.title')}
              </h2>
              
              {/* Informational Use */}
              <div className="mb-8">
                <h3 className="font-playfair text-2xl font-semibold text-[#1C3C47] mb-4">
                  {t('privacyPolicy.websiteData.informational.title')}
                </h3>
                <div className="font-inter text-[#1F2937] leading-relaxed">
                  <p className="mb-4">{t('privacyPolicy.websiteData.informational.paragraph1')}</p>
                  <div className="bg-[#F7F5F2] p-4 rounded-lg mb-4">
                    <p className="font-semibold text-[#1C3C47] mb-2">Data collected:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>IP address</li>
                      <li>Date and time of request</li>
                      <li>Time zone difference to Greenwich Mean Time (GMT)</li>
                      <li>Content of request (specific page)</li>
                      <li>Access status/HTTP status code</li>
                      <li>Website from which the request comes</li>
                      <li>Browser information</li>
                      <li>Operating system and interface</li>
                      <li>Language and version of browser software</li>
                    </ul>
                  </div>
                  <p>{t('privacyPolicy.websiteData.informational.paragraph2')}</p>
                </div>
              </div>

              {/* Web Hosting */}
              <div className="mb-8">
                <h3 className="font-playfair text-2xl font-semibold text-[#1C3C47] mb-4">
                  {t('privacyPolicy.websiteData.webhosting.title')}
                </h3>
                <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                  <p>{t('privacyPolicy.websiteData.webhosting.paragraph1')}</p>
                  <p>{t('privacyPolicy.websiteData.webhosting.paragraph2')}</p>
                </div>
              </div>

              {/* SSL/TLS */}
              <div className="mb-8">
                <h3 className="font-playfair text-2xl font-semibold text-[#1C3C47] mb-4">
                  {t('privacyPolicy.websiteData.ssl.title')}
                </h3>
                <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                  <p>{t('privacyPolicy.websiteData.ssl.paragraph1')}</p>
                  <p>{t('privacyPolicy.websiteData.ssl.paragraph2')}</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="mb-8">
                <h3 className="font-playfair text-2xl font-semibold text-[#1C3C47] mb-4">
                  {t('privacyPolicy.websiteData.contactForm.title')}
                </h3>
                <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                  <p>{t('privacyPolicy.websiteData.contactForm.paragraph1')}</p>
                  <p>{t('privacyPolicy.websiteData.contactForm.paragraph2')}</p>
                </div>
              </div>

              {/* Medical Inquiries - Special for medical tourism */}
              <div className="mb-8 bg-gradient-to-r from-[#2CA6A4]/10 to-[#C9A66B]/10 p-6 rounded-lg">
                <h3 className="font-playfair text-2xl font-semibold text-[#1C3C47] mb-4">
                  {t('privacyPolicy.websiteData.medicalInquiries.title')}
                </h3>
                <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                  <p>{t('privacyPolicy.websiteData.medicalInquiries.paragraph1')}</p>
                  <p>{t('privacyPolicy.websiteData.medicalInquiries.paragraph2')}</p>
                  <p className="font-semibold text-[#1C3C47]">{t('privacyPolicy.websiteData.medicalInquiries.paragraph3')}</p>
                </div>
              </div>

              {/* Medical Bookings */}
              <div className="mb-8">
                <h3 className="font-playfair text-2xl font-semibold text-[#1C3C47] mb-4">
                  {t('privacyPolicy.websiteData.bookings.title')}
                </h3>
                <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                  <p>{t('privacyPolicy.websiteData.bookings.paragraph1')}</p>
                  <p>{t('privacyPolicy.websiteData.bookings.paragraph2')}</p>
                </div>
              </div>
            </section>

            {/* Newsletter */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('privacyPolicy.newsletter.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('privacyPolicy.newsletter.paragraph1')}</p>
                <p>{t('privacyPolicy.newsletter.paragraph2')}</p>
                <p>{t('privacyPolicy.newsletter.paragraph3')}</p>
                <p>{t('privacyPolicy.newsletter.paragraph4')}</p>
              </div>
            </section>

            {/* Third Party Services */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('privacyPolicy.thirdPartyServices.title')}
              </h2>
              <div className="font-inter text-[#1F2937] leading-relaxed">
                <p className="mb-6">{t('privacyPolicy.thirdPartyServices.introduction')}</p>
                
                <div className="space-y-6">
                  <div className="bg-[#F7F5F2] p-6 rounded-lg">
                    <h3 className="font-semibold text-[#1C3C47] text-xl mb-3">
                      {t('privacyPolicy.thirdPartyServices.analytics.title')}
                    </h3>
                    <p className="mb-2">{t('privacyPolicy.thirdPartyServices.analytics.paragraph1')}</p>
                    <p>{t('privacyPolicy.thirdPartyServices.analytics.paragraph2')}</p>
                  </div>

                  <div className="bg-[#F7F5F2] p-6 rounded-lg">
                    <h3 className="font-semibold text-[#1C3C47] text-xl mb-3">
                      {t('privacyPolicy.thirdPartyServices.maps.title')}
                    </h3>
                    <p className="mb-2">{t('privacyPolicy.thirdPartyServices.maps.paragraph1')}</p>
                    <p>{t('privacyPolicy.thirdPartyServices.maps.paragraph2')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Social Media */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('privacyPolicy.socialMedia.title')}
              </h2>
              <div className="font-inter text-[#1F2937] leading-relaxed">
                <p className="mb-4">{t('privacyPolicy.socialMedia.paragraph1')}</p>
                <p className="mb-6">{t('privacyPolicy.socialMedia.paragraph2')}</p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-[#F7F5F2] p-4 rounded-lg">
                    <h4 className="font-semibold text-[#1C3C47] mb-2">Facebook</h4>
                    <p className="text-sm">{t('privacyPolicy.socialMedia.platforms.facebook')}</p>
                  </div>
                  <div className="bg-[#F7F5F2] p-4 rounded-lg">
                    <h4 className="font-semibold text-[#1C3C47] mb-2">Instagram</h4>
                    <p className="text-sm">{t('privacyPolicy.socialMedia.platforms.instagram')}</p>
                  </div>
                  <div className="bg-[#F7F5F2] p-4 rounded-lg">
                    <h4 className="font-semibold text-[#1C3C47] mb-2">LinkedIn</h4>
                    <p className="text-sm">{t('privacyPolicy.socialMedia.platforms.linkedin')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Protection Officer */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('privacyPolicy.dataProtectionOfficer.title')}
              </h2>
              <div className="font-inter text-[#1F2937] leading-relaxed">
                <p className="mb-4">{t('privacyPolicy.dataProtectionOfficer.paragraph1')}</p>
                <div className="bg-[#2CA6A4]/10 p-6 rounded-lg">
                  <p className="whitespace-pre-line font-semibold text-[#1C3C47]">
                    {t('privacyPolicy.dataProtectionOfficer.contact')}
                  </p>
                </div>
              </div>
            </section>

            {/* Changes */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('privacyPolicy.changes.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('privacyPolicy.changes.paragraph1')}</p>
                <p>{t('privacyPolicy.changes.paragraph2')}</p>
              </div>
            </section>

            {/* Related Policies */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                Related Policies
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#F7F5F2] p-6 rounded-lg" style={{ boxShadow: '0 2px 4px -2px rgba(0,0,0,0.08)' }}>
                  <h3 className="font-playfair text-xl font-semibold text-[#1C3C47] mb-3 leading-tight">
                    Cookie Policy
                  </h3>
                  <p className="text-[#1F2937] mb-6 font-inter text-base" style={{ lineHeight: '1.65' }}>
                    Learn about how we use cookies and similar technologies on our website.
                  </p>
                  <Link 
                    href={`/${locale}/policies/cookie`}
                    className="inline-flex items-center px-4 py-2 bg-[#2CA6A4] text-white font-inter font-medium text-sm rounded-lg hover:bg-[#26928F] transition-all duration-200 transform hover:shadow-md"
                  >
                    Read Cookie Policy
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className="bg-[#F7F5F2] p-6 rounded-lg" style={{ boxShadow: '0 2px 4px -2px rgba(0,0,0,0.08)' }}>
                  <h3 className="font-playfair text-xl font-semibold text-[#1C3C47] mb-3 leading-tight">
                    Terms of Service
                  </h3>
                  <p className="text-[#1F2937] mb-6 font-inter text-base" style={{ lineHeight: '1.65' }}>
                    Review our terms and conditions for using our medical tourism services.
                  </p>
                  <Link 
                    href={`/${locale}/policies/terms`}
                    className="inline-flex items-center px-4 py-2 bg-transparent text-[#1C3C47] font-inter font-medium text-sm rounded-lg border-2 border-[#1C3C47] hover:bg-[#1C3C47] hover:text-white transition-all duration-200 transform hover:shadow-md"
                  >
                    Read Terms of Service
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>

            {/* Questions and Comments */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C3C47] mb-6 leading-tight">
                {t('privacyPolicy.questions.title')}
              </h2>
              <div className="font-inter text-[#1F2937]" style={{ lineHeight: '1.65' }}>
                <p className="mb-8 text-base">{t('privacyPolicy.questions.paragraph1')}</p>
                
                <div className="bg-gradient-to-r from-[#2CA6A4] to-[#C9A66B] text-white p-8 rounded-lg" style={{ boxShadow: '0 4px 12px -4px rgba(0,0,0,0.12)' }}>
                  <h3 className="font-playfair text-xl font-semibold mb-6 leading-tight">Contact Us</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="font-inter font-medium mb-2 text-sm uppercase tracking-wide opacity-90">Email:</p>
                      <a 
                        href="mailto:info@sanovias.com" 
                        className="font-inter text-base hover:underline transition-all duration-200 block"
                      >
                        info@sanovias.com
                      </a>
                    </div>
                    <div>
                      <p className="font-inter font-medium mb-2 text-sm uppercase tracking-wide opacity-90">Phone:</p>
                      <a 
                        href="tel:+21612345678" 
                        className="font-inter text-base hover:underline transition-all duration-200 block"
                      >
                        +216 123 456 789
                      </a>
                    </div>
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