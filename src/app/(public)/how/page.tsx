"use client";

import Link from 'next/link';

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
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-500 text-white font-bold text-xl border-4 border-white shadow-lg z-10">
          {icon ? (
            <span className="text-2xl">{icon}</span>
          ) : (
            number
          )}
        </div>
        {!isLast && (
          <div className="absolute top-16 bottom-0 left-8 w-1 bg-teal-300 -ml-px"></div>
        )}
      </div>

      {/* Content */}
      <div className="ml-6 pb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <div className="text-gray-600 space-y-2">{description}</div>
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  const processSteps = [
    {
      number: 1,
      title: "Initial Contact & Personalized Quote",
      icon: "📝",
      description: (
        <>
          <p>Begin your medical journey with a simple contact form submission. Within 24 hours, our team provides you with a tailored, no-obligation quote based on your specific needs.</p>
          <p className="mt-2">Your initial package includes:</p>
          <ul className="list-disc ml-5 mt-1">
            <li>Transparent cost breakdown</li>
            <li>Recommended treatment options</li>
            <li>Estimated timeline</li>
            <li>Accommodation suggestions</li>
          </ul>
        </>
      ),
    },
    {
      number: 2,
      title: "Expert Medical Consultation",
      icon: "👨‍⚕️",
      description: (
        <>
          <p>Once you express interest, we arrange a comprehensive teleconsultation with one of our specialized medical experts who will become your dedicated advisor throughout the process.</p>
          <p className="mt-2">During this consultation:</p>
          <ul className="list-disc ml-5 mt-1">
            <li>Detailed medical history review</li>
            <li>Treatment plan customization</li>
            <li>Required medical tests identification</li>
            <li>All your questions answered</li>
          </ul>
        </>
      ),
    },
    {
      number: 3,
      title: "Seamless Booking Process",
      icon: "📋",
      description: (
        <>
          <p>With your personalized plan finalized, we handle all the paperwork and formalize the arrangement with flexible payment options tailored to your budget.</p>
          <p className="mt-2">Your contract includes:</p>
          <ul className="list-disc ml-5 mt-1">
            <li>Detailed treatment specifications</li>
            <li>All-inclusive price guarantee</li>
            <li>Convenient payment schedules</li>
            <li>Cancellation and modification policies</li>
          </ul>
        </>
      ),
    },
    {
      number: 4,
      title: "Effortless Travel Arrangements",
      icon: "✈️",
      description: (
        <>
          <p>Relax as we coordinate every detail of your medical journey. Our concierge team manages all logistics from door to door, ensuring a stress-free experience.</p>
          <p className="mt-2">We arrange:</p>
          <ul className="list-disc ml-5 mt-1">
            <li>Flight bookings with medical considerations</li>
            <li>Premium accommodations near your treatment facility</li>
            <li>Ground transportation</li>
            <li>Pre-treatment preparation guidance</li>
          </ul>
        </>
      ),
    },
    {
      number: 5,
      title: "Premium Care & Comprehensive Follow-up",
      icon: "🏥",
      description: (
        <>
          <p>Experience world-class medical care with continuous support from our multilingual team who will be by your side throughout your treatment and recovery.</p>
          <p className="mt-2">Your care package includes:</p>
          <ul className="list-disc ml-5 mt-1">
            <li>24/7 personal medical assistant</li>
            <li>Translation services</li>
            <li>Structured follow-up appointments</li>
            <li>Digital health record management</li>
            <li>Post-return remote consultations</li>
          </ul>
        </>
      ),
      isLast: true,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Your Medical Journey, <span className="text-teal-600">Simplified</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          From first contact to full recovery, we guide you through every step of your medical tourism experience with expert care and personalized attention.
        </p>
        <div className="inline-block animate-bounce">
          <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <section className="bg-teal-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">Our medical experts are ready to guide you through your personalized health travel experience.</p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-white text-teal-700 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">
            Get Your Free Consultation
          </Link>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Why Travelers Trust Sanovias</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 bg-gray-50">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-500 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Internationally Certified</h3>
              <p className="text-gray-600">All our partner clinics meet rigorous international healthcare standards and accreditations.</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 bg-gray-50">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">No hidden fees or surprise costs. Our all-inclusive packages offer clarity and value.</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 bg-gray-50">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-500 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Multilingual Support</h3>
              <p className="text-gray-600">Our team communicates in multiple languages to ensure nothing gets lost in translation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">How soon can I schedule my procedure?</h3>
              <p className="text-gray-600">Most procedures can be scheduled within 2-4 weeks of your initial consultation, significantly faster than waiting lists in many European countries.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">What qualifications do your doctors have?</h3>
              <p className="text-gray-600">Our network includes board-certified specialists, many of whom have trained internationally and hold memberships in prestigious medical societies.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">What happens if I need additional care after returning home?</h3>
              <p className="text-gray-600">Your package includes remote follow-up consultations, and we coordinate with local healthcare providers if necessary for continued care.</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href="/contact" className="inline-block text-teal-600 font-semibold hover:text-teal-800">
              Have more questions? Contact our team →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}