'use client';

import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from './components/Header';

export default function Home() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div>
      <Header />

      {/* Hero Section with Image Slider */}
      <section className="relative">
        <Slider {...sliderSettings}>
          <div>
            <Image src="/images/slider1.png" alt="Medical Tourism Tunisia" width={1920} height={600} className="w-full object-cover" />
          </div>
          <div>
            <Image src="/images/slider2.jpg" alt="High-Quality Healthcare" width={1920} height={600} className="w-full object-cover" />
          </div>
          <div>
            <Image src="/images/slider3.jpg" alt="Affordable Treatments" width={1920} height={600} className="w-full object-cover" />
          </div>
        </Slider>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center">
          <h2 className="text-4xl font-bold">Premium Medical Tourism in Tunisia</h2>
          <p className="text-lg mt-2 max-w-2xl">Short waiting times, top-tier healthcare, and a stress-free travel experience.</p>
          <button className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-500">Get a Free Consultation</button>
        </div>
      </section>

      {/* Key Benefits Snapshot (link to About) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 px-4 sm:px-8 bg-gray-50">
        {/* Card 1 */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center h-full">
          <div className="mb-6 p-4 bg-teal-100 rounded-full">
            <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Fast Appointments</h3>
          <p className="text-gray-600 mb-6">No long waiting lists like in Europe.</p>
          <a href="/about" className="mt-auto text-teal-600 hover:text-teal-800 font-medium flex items-center">
            Learn more <span className="ml-1">→</span>
          </a>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center h-full">
          <div className="mb-6 p-4 bg-blue-100 rounded-full">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Accredited Clinics</h3>
          <p className="text-gray-600 mb-6">All hospitals are internationally certified.</p>
          <a href="/about" className="mt-auto text-blue-600 hover:text-blue-800 font-medium flex items-center">
            See certifications <span className="ml-1">→</span>
          </a>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center h-full">
          <div className="mb-6 p-4 bg-purple-100 rounded-full">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">All-Inclusive Packages</h3>
          <p className="text-gray-600 mb-6">Travel, treatment, and aftercare covered.</p>
          <a href="/about" className="mt-auto text-purple-600 hover:text-purple-800 font-medium flex items-center">
            View packages <span className="ml-1">→</span>
          </a>
        </div>
      </section>

      {/* Services teaser */}
      <section className="mt-12 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Services</h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-6">From advanced plastic surgery to comprehensive dental care and complex treatments, Tunisia offers world-class healthcare at accessible prices.</p>
        <a href="/services" className="inline-block px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-500">Explore Services →</a>
      </section>

      {/* Contact CTA */}
      <section className="mt-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
        <p className="text-gray-600 mb-6">Get a personalized treatment plan and cost estimate.</p>
        <a href="/contact" className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">Contact Us →</a>
      </section>
    </div>
  );
}
