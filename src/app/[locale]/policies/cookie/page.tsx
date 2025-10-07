"use client";

import { useTranslations } from '../../../../hooks/useTranslations';

export default function CookiePolicyPage() {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-playfair text-5xl font-bold text-[#1C3C47] mb-6">
            {t('cookiePolicy.title')}
          </h1>
          <div className="inline-flex items-center bg-[#F7F5F2] px-6 py-3 rounded-lg">
            <svg className="w-5 h-5 text-[#2CA6A4] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-inter text-[#6B7280]">
              <strong className="text-[#1C3C47]">{t('cookiePolicy.lastUpdated')}</strong> {t('cookiePolicy.lastUpdatedDate')}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 lg:p-12">
            
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="font-playfair text-3xl font-semibold text-[#1C3C47] mb-6">
                {t('cookiePolicy.introduction.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p className="text-lg">{t('cookiePolicy.introduction.paragraph1')}</p>
                <p>{t('cookiePolicy.introduction.paragraph2')}</p>
                <p>{t('cookiePolicy.introduction.paragraph3')}</p>
              </div>
            </section>

            {/* What are Cookies */}
            <section className="mb-12">
              <h2 className="font-playfair text-3xl font-semibold text-[#1C3C47] mb-6">
                {t('cookiePolicy.whatAreCookies.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('cookiePolicy.whatAreCookies.paragraph1')}</p>
                <p>{t('cookiePolicy.whatAreCookies.paragraph2')}</p>
              </div>
            </section>

            {/* How We Use Cookies */}
            <section className="mb-12">
              <h2 className="font-playfair text-3xl font-semibold text-[#1C3C47] mb-6">
                {t('cookiePolicy.howWeUseCookies.title')}
              </h2>
              <p className="font-inter text-[#1F2937] leading-relaxed mb-8">
                {t('cookiePolicy.howWeUseCookies.introduction')}
              </p>
              
              <div className="space-y-8">
                {/* Essential Cookies */}
                <div className="border border-[#E6E8EA] rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-[#2CA6A4] to-[#26928F] p-6">
                    <h3 className="font-playfair text-2xl font-semibold text-white mb-2">
                      {t('cookiePolicy.categories.essential.title')}
                    </h3>
                    <p className="text-white/90 font-inter">
                      {t('cookiePolicy.categories.essential.description')}
                    </p>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-[#6B7280] font-inter mb-6 bg-[#F7F5F2] p-4 rounded-lg">
                      {t('cookiePolicy.categories.essential.legal')}
                    </p>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full font-inter text-sm">
                        <thead>
                          <tr className="border-b border-[#E6E8EA] bg-[#F7F5F2]">
                            <th className="text-left p-4 font-semibold text-[#1C3C47]">{t('cookiePolicy.table.name')}</th>
                            <th className="text-left p-4 font-semibold text-[#1C3C47]">{t('cookiePolicy.table.purpose')}</th>
                            <th className="text-left p-4 font-semibold text-[#1C3C47]">{t('cookiePolicy.table.duration')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-[#E6E8EA] hover:bg-[#F7F5F2] transition-colors">
                            <td className="p-4">
                              <span className="font-mono text-xs bg-[#1C3C47] text-white px-2 py-1 rounded">__prerender_bypass</span>
                            </td>
                            <td className="p-4 text-[#1F2937]">{t('cookiePolicy.cookies.prerender_bypass')}</td>
                            <td className="p-4 text-[#6B7280]">{t('cookiePolicy.durations.hours24')}</td>
                          </tr>
                          <tr className="border-b border-[#E6E8EA] hover:bg-[#F7F5F2] transition-colors">
                            <td className="p-4">
                              <span className="font-mono text-xs bg-[#1C3C47] text-white px-2 py-1 rounded">__next_preview_data</span>
                            </td>
                            <td className="p-4 text-[#1F2937]">{t('cookiePolicy.cookies.next_preview_data')}</td>
                            <td className="p-4 text-[#6B7280]">{t('cookiePolicy.durations.hours24')}</td>
                          </tr>
                          <tr className="border-b border-[#E6E8EA] hover:bg-[#F7F5F2] transition-colors">
                            <td className="p-4">
                              <span className="font-mono text-xs bg-[#1C3C47] text-white px-2 py-1 rounded">sanovias_cookie_consent</span>
                            </td>
                            <td className="p-4 text-[#1F2937]">{t('cookiePolicy.cookies.cookie_consent')}</td>
                            <td className="p-4 text-[#6B7280]">{t('cookiePolicy.durations.year1')}</td>
                          </tr>
                          <tr className="border-b border-[#E6E8EA] hover:bg-[#F7F5F2] transition-colors">
                            <td className="p-4">
                              <span className="font-mono text-xs bg-[#1C3C47] text-white px-2 py-1 rounded">sanovias_session</span>
                            </td>
                            <td className="p-4 text-[#1F2937]">{t('cookiePolicy.cookies.session')}</td>
                            <td className="p-4 text-[#6B7280]">{t('cookiePolicy.durations.session')}</td>
                          </tr>
                          <tr className="hover:bg-[#F7F5F2] transition-colors">
                            <td className="p-4">
                              <span className="font-mono text-xs bg-[#1C3C47] text-white px-2 py-1 rounded">csrf_token</span>
                            </td>
                            <td className="p-4 text-[#1F2937]">{t('cookiePolicy.cookies.csrf_token')}</td>
                            <td className="p-4 text-[#6B7280]">{t('cookiePolicy.durations.hours2')}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="border border-[#E6E8EA] rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-[#C9A66B] to-[#B8956A] p-6">
                    <h3 className="font-playfair text-2xl font-semibold text-white mb-2">
                      {t('cookiePolicy.categories.functional.title')}
                    </h3>
                    <p className="text-white/90 font-inter">
                      {t('cookiePolicy.categories.functional.description')}
                    </p>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-[#6B7280] font-inter mb-6 bg-[#F7F5F2] p-4 rounded-lg">
                      {t('cookiePolicy.categories.functional.legal')}
                    </p>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full font-inter text-sm">
                        <thead>
                          <tr className="border-b border-[#E6E8EA] bg-[#F7F5F2]">
                            <th className="text-left p-4 font-semibold text-[#1C3C47]">{t('cookiePolicy.table.name')}</th>
                            <th className="text-left p-4 font-semibold text-[#1C3C47]">{t('cookiePolicy.table.purpose')}</th>
                            <th className="text-left p-4 font-semibold text-[#1C3C47]">{t('cookiePolicy.table.duration')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-[#E6E8EA] hover:bg-[#F7F5F2] transition-colors">
                            <td className="p-4">
                              <span className="font-mono text-xs bg-[#C9A66B] text-white px-2 py-1 rounded">sanovias_language</span>
                            </td>
                            <td className="p-4 text-[#1F2937]">{t('cookiePolicy.cookies.language')}</td>
                            <td className="p-4 text-[#6B7280]">{t('cookiePolicy.durations.year1')}</td>
                          </tr>
                          <tr className="hover:bg-[#F7F5F2] transition-colors">
                            <td className="p-4">
                              <span className="font-mono text-xs bg-[#C9A66B] text-white px-2 py-1 rounded">sanovias_contact_form</span>
                            </td>
                            <td className="p-4 text-[#1F2937]">{t('cookiePolicy.cookies.contact_form')}</td>
                            <td className="p-4 text-[#6B7280]">{t('cookiePolicy.durations.days7')}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookie Management */}
            <section className="mb-12">
              <h2 className="font-playfair text-3xl font-semibold text-[#1C3C47] mb-6">
                {t('cookiePolicy.management.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('cookiePolicy.management.paragraph1')}</p>
                <p>{t('cookiePolicy.management.paragraph2')}</p>
                <p>{t('cookiePolicy.management.paragraph3')}</p>
              </div>
            </section>

            {/* Browser Settings */}
            <section className="mb-12">
              <h2 className="font-playfair text-3xl font-semibold text-[#1C3C47] mb-6">
                {t('cookiePolicy.browserSettings.title')}
              </h2>
              <p className="font-inter text-[#1F2937] leading-relaxed mb-6">
                {t('cookiePolicy.browserSettings.introduction')}
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#F7F5F2] border-l-4 border-[#2CA6A4] p-6 rounded-lg">
                  <h4 className="font-playfair text-lg font-semibold text-[#1C3C47] mb-2">Google Chrome</h4>
                  <p className="font-inter text-sm text-[#6B7280]">{t('cookiePolicy.browserSettings.chrome')}</p>
                </div>
                <div className="bg-[#F7F5F2] border-l-4 border-[#2CA6A4] p-6 rounded-lg">
                  <h4 className="font-playfair text-lg font-semibold text-[#1C3C47] mb-2">Mozilla Firefox</h4>
                  <p className="font-inter text-sm text-[#6B7280]">{t('cookiePolicy.browserSettings.firefox')}</p>
                </div>
                <div className="bg-[#F7F5F2] border-l-4 border-[#2CA6A4] p-6 rounded-lg">
                  <h4 className="font-playfair text-lg font-semibold text-[#1C3C47] mb-2">Safari</h4>
                  <p className="font-inter text-sm text-[#6B7280]">{t('cookiePolicy.browserSettings.safari')}</p>
                </div>
                <div className="bg-[#F7F5F2] border-l-4 border-[#2CA6A4] p-6 rounded-lg">
                  <h4 className="font-playfair text-lg font-semibold text-[#1C3C47] mb-2">Microsoft Edge</h4>
                  <p className="font-inter text-sm text-[#6B7280]">{t('cookiePolicy.browserSettings.edge')}</p>
                </div>
              </div>
            </section>

            {/* Legal Basis */}
            <section className="mb-12">
              <h2 className="font-playfair text-3xl font-semibold text-[#1C3C47] mb-6">
                {t('cookiePolicy.legalBasis.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('cookiePolicy.legalBasis.paragraph1')}</p>
                <p>{t('cookiePolicy.legalBasis.paragraph2')}</p>
                <p>{t('cookiePolicy.legalBasis.paragraph3')}</p>
              </div>
            </section>

            {/* Data Protection Rights */}
            <section className="mb-12">
              <h2 className="font-playfair text-3xl font-semibold text-[#1C3C47] mb-6">
                {t('cookiePolicy.dataRights.title')}
              </h2>
              <p className="font-inter text-[#1F2937] leading-relaxed mb-6">
                {t('cookiePolicy.dataRights.introduction')}
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start font-inter text-[#1F2937]">
                  <span className="w-2 h-2 bg-[#2CA6A4] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('cookiePolicy.dataRights.access')}
                </li>
                <li className="flex items-start font-inter text-[#1F2937]">
                  <span className="w-2 h-2 bg-[#2CA6A4] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('cookiePolicy.dataRights.rectification')}
                </li>
                <li className="flex items-start font-inter text-[#1F2937]">
                  <span className="w-2 h-2 bg-[#2CA6A4] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('cookiePolicy.dataRights.erasure')}
                </li>
                <li className="flex items-start font-inter text-[#1F2937]">
                  <span className="w-2 h-2 bg-[#2CA6A4] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('cookiePolicy.dataRights.portability')}
                </li>
                <li className="flex items-start font-inter text-[#1F2937]">
                  <span className="w-2 h-2 bg-[#2CA6A4] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('cookiePolicy.dataRights.objection')}
                </li>
                <li className="flex items-start font-inter text-[#1F2937]">
                  <span className="w-2 h-2 bg-[#2CA6A4] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('cookiePolicy.dataRights.restriction')}
                </li>
              </ul>
              <p className="font-inter text-[#1F2937] leading-relaxed">
                {t('cookiePolicy.dataRights.contact')}
              </p>
            </section>

            {/* Third Party Cookies */}
            <section className="mb-12">
              <h2 className="font-playfair text-3xl font-semibold text-[#1C3C47] mb-6">
                {t('cookiePolicy.thirdParty.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('cookiePolicy.thirdParty.paragraph1')}</p>
                <p>{t('cookiePolicy.thirdParty.paragraph2')}</p>
              </div>
            </section>

            {/* Updates */}
            <section className="mb-12">
              <h2 className="font-playfair text-3xl font-semibold text-[#1C3C47] mb-6">
                {t('cookiePolicy.updates.title')}
              </h2>
              <div className="space-y-4 font-inter text-[#1F2937] leading-relaxed">
                <p>{t('cookiePolicy.updates.paragraph1')}</p>
                <p>{t('cookiePolicy.updates.paragraph2')}</p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <h2 className="font-playfair text-3xl font-semibold text-[#1C3C47] mb-6">
                {t('cookiePolicy.contact.title')}
              </h2>
              <p className="font-inter text-[#1F2937] leading-relaxed mb-6">
                {t('cookiePolicy.contact.paragraph1')}
              </p>
              
              <div className="bg-gradient-to-r from-[#2CA6A4] to-[#26928F] rounded-lg p-8 text-white">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-white mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H7m2 0v-5a2 2 0 012-2h2a2 2 0 012 2v5m-6 0V9a2 2 0 012-2h2a2 2 0 012 2v9" />
                  </svg>
                  <div>
                    <h3 className="font-playfair text-xl font-semibold mb-4">Sanovias Medical Tourism</h3>
                    <div className="space-y-2 font-inter">
                      <p>123 Medical Avenue</p>
                      <p>Tunis 1002, Tunisia</p>
                      <div className="flex items-center mt-4">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span><strong>{t('cookiePolicy.contact.email')}</strong> info@sanovias.com</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span><strong>{t('cookiePolicy.contact.phone')}</strong> +216 123 456 789</span>
                      </div>
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