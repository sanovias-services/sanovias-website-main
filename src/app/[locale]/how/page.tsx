"use client";

import Link from 'next/link';
import { useTranslations } from '../../../hooks/useTranslations';

// Process step component
interface ProcessStepProps {
  number: number;
  title: string;
  description: React.ReactNode;
  icon?: React.ReactNode;
  isLast?: boolean;
}

function ProcessStep({ number, title, description, icon, isLast = false }: ProcessStepProps) {
  return (
    <div className="relative flex items-start">
      {/* Step number with icon */}
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#2CA6A4] text-white font-inter font-bold text-xl border-4 border-white shadow-lg z-10">
          {icon ? (
            <span className="text-2xl">{icon}</span>
          ) : (
            number
          )}
        </div>
        {!isLast && (
          <div className="absolute top-16 bottom-0 left-8 w-1 bg-[#C9A66B] bg-opacity-60 -ml-px"></div>
        )}
      </div>

      {/* Content */}
      <div className="ml-6 pb-12">
        <h3 className="font-playfair text-2xl font-semibold text-[#1C3C47] mb-3">{title}</h3>
        <div className="font-inter text-gray-600 leading-relaxed space-y-3">{description}</div>
      </div>
    </div>
  );
}

export default function HowPage() {
  const { t } = useTranslations();
  const processSteps = [1, 2, 3, 4, 5].map((stepNum, index) => ({
    number: stepNum,
    title: t(`how.process.steps.${stepNum - 1}.title`),
    icon: t(`how.process.steps.${stepNum - 1}.icon`),
    description: (
      <>
        <p>{t(`how.process.steps.${stepNum - 1}.description.main`)}</p>
        <p className="mt-2">{t(`how.process.steps.${stepNum - 1}.description.subtitle`)}</p>
        <ul className="list-disc ml-5 mt-1">
          {t(`how.process.steps.${stepNum - 1}.description.features`).split('|').map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </>
    ),
    isLast: index === 4,
  }));

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 text-center">
        <h1 className="font-playfair text-4xl md:text-5xl font-semibold text-[#1C3C47] mb-6">
          {t('how.hero.title1')} <span className="text-[#2CA6A4]">{t('how.hero.title2')}</span>
        </h1>
        <p className="font-inter text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-10">
          {t('how.hero.subtitle')}
        </p>
        <div className="inline-block animate-bounce">
          <svg className="w-8 h-8 text-[#2CA6A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="relative pl-4 sm:pl-0">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
              isLast={step.isLast}
            />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-[#1C3C47] to-[#2CA6A4] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl font-semibold mb-6">{t('how.cta.title')}</h2>
          <p className="font-inter text-xl leading-relaxed mb-8">{t('how.cta.subtitle')}</p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-white text-[#1C3C47] font-inter font-bold rounded-lg shadow-lg hover:bg-[#F7F5F2] transition-all duration-300 transform hover:-translate-y-1">
            {t('how.cta.button')}
          </Link>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-4xl font-semibold text-center mb-12 text-[#1C3C47]">{t('how.trust.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl border border-gray-200 bg-[#F7F5F2] hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2CA6A4]/10 text-[#2CA6A4] mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-3 text-[#1C3C47]">{t('how.trust.indicators.0.title')}</h3>
              <p className="font-inter text-gray-600 leading-relaxed">{t('how.trust.indicators.0.description')}</p>
            </div>
            <div className="text-center p-8 rounded-xl border border-gray-200 bg-[#F7F5F2] hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C9A66B]/10 text-[#C9A66B] mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-3 text-[#1C3C47]">{t('how.trust.indicators.1.title')}</h3>
              <p className="font-inter text-gray-600 leading-relaxed">{t('how.trust.indicators.1.description')}</p>
            </div>
            <div className="text-center p-8 rounded-xl border border-gray-200 bg-[#F7F5F2] hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2CA6A4]/10 text-[#2CA6A4] mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-3 text-[#1C3C47]">{t('how.trust.indicators.2.title')}</h3>
              <p className="font-inter text-gray-600 leading-relaxed">{t('how.trust.indicators.2.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-[#F7F5F2]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-4xl font-semibold text-center mb-12 text-[#1C3C47]">{t('how.faq.title')}</h2>
          <div className="space-y-6">
            <div className="p-8 bg-white rounded-xl shadow-md border border-gray-100">
              <h3 className="font-playfair text-xl font-semibold mb-4 text-[#1C3C47]">{t('how.faq.questions.0.question')}</h3>
              <p className="font-inter text-gray-600 leading-relaxed">{t('how.faq.questions.0.answer')}</p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-md border border-gray-100">
              <h3 className="font-playfair text-xl font-semibold mb-4 text-[#1C3C47]">{t('how.faq.questions.1.question')}</h3>
              <p className="font-inter text-gray-600 leading-relaxed">{t('how.faq.questions.1.answer')}</p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-md border border-gray-100">
              <h3 className="font-playfair text-xl font-semibold mb-4 text-[#1C3C47]">{t('how.faq.questions.2.question')}</h3>
              <p className="font-inter text-gray-600 leading-relaxed">{t('how.faq.questions.2.answer')}</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href="/contact" className="inline-block text-[#2CA6A4] font-inter font-semibold hover:text-[#26928F] transition-colors duration-150">
              {t('how.faq.moreQuestions')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}