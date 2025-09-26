'use client';

import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

export default function Home() {
  // Hero slider settings
  const heroSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  
  // Partner slider is configured inline in the component

  return (
    <div>
      {/* Custom CSS for partner slider */}
      <style jsx global>{`
        .partner-slider .slick-track {
          display: flex !important;
          align-items: center;
        }
        .partner-slider .slick-slide {
          height: inherit;
          display: flex !important;
          justify-content: center;
          align-items: center;
        }
        .partner-slider .slick-arrow:before {
          color: #0f766e !important; /* teal-700 */
        }
        .partner-slider .slick-arrow:hover:before {
          color: #14b8a6 !important; /* teal-500 */
        }
      `}</style>

      {/* Hero Section with Image Slider */}
      <section className="relative">
        <Slider {...heroSliderSettings}>
          <div>
            <Image src="/images/slider1.jpg" alt="Aestetic surgery" width={1920} height={600} className="w-full object-cover h-[600px]" />
          </div>
          <div>
            <Image src="/images/slider2.png" alt="High-Quality Healthcare" width={1920} height={600} className="w-full object-cover h-[600px]" />
          </div>
          <div>
            <Image src="/images/slider3.jpeg" alt="Tunisian Culture" width={1920} height={600} className="w-full object-cover h-[600px]" />
          </div>
          <div>
            <Image src="/images/slider4.jpg" alt="Hammamet Hotels" width={1920} height={600} className="w-full object-cover h-[600px]" />
          </div>
        </Slider>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-black/70 to-black/50 text-white text-center px-4">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg uppercase tracking-wider leading-tight">
            Premium Healthcare<br />in Tunisia
          </h1>
          <p className="font-inter text-xl md:text-2xl mb-8 max-w-3xl font-light leading-relaxed">
            World-class medical care at 30-70% less than European prices
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link href="/contact" className="px-8 py-4 bg-[#2CA6A4] text-white font-inter font-semibold text-sm uppercase tracking-wide rounded-lg hover:bg-[#26928F] transition-all duration-150 transform hover:-translate-y-1 hover:shadow-lg">
              Get a Free Quote
            </Link>
            <Link href="/services" className="px-8 py-4 bg-white text-[#1C3C47] font-inter font-semibold text-sm uppercase tracking-wide rounded-lg hover:bg-gray-100 transition-all duration-150 transform hover:-translate-y-1 shadow-lg">
              Browse Treatments
            </Link>
            <Link href="/how" className="px-8 py-4 bg-transparent text-white border-2 border-white font-inter font-semibold text-sm uppercase tracking-wide rounded-lg hover:bg-white/20 transition-all duration-150">
              How It Works
            </Link>
          </div>
          <div className="py-3 px-6 bg-white/20 rounded-full backdrop-blur-sm font-inter text-sm">
            Trusted by <span className="font-bold text-[#C9A66B]">2000+</span> patients from Europe and beyond
          </div>
        </div>
      </section>

      {/* Key Benefits Snapshot (link to About) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 px-4 sm:px-8 bg-[#F7F5F2]">
        {/* Card 1 */}
        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-150 flex flex-col items-center h-full border border-gray-100">
          <div className="mb-6 p-4 bg-[#2CA6A4]/10 rounded-full">
            <svg className="w-8 h-8 text-[#2CA6A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-playfair text-2xl font-semibold mb-4 text-[#1C3C47]">Fast Appointments</h3>
          <p className="font-inter text-gray-600 mb-6 text-center leading-relaxed">No long waiting lists like in Europe.</p>
          <Link href="/about" className="mt-auto text-[#2CA6A4] hover:text-[#26928F] font-inter font-medium flex items-center transition-colors duration-150">
            Learn more <span className="ml-1">→</span>
          </Link>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-150 flex flex-col items-center h-full border border-gray-100">
          <div className="mb-6 p-4 bg-[#2CA6A4]/10 rounded-full">
            <svg className="w-8 h-8 text-[#2CA6A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="font-playfair text-2xl font-semibold mb-4 text-[#1C3C47]">Accredited Clinics</h3>
          <p className="font-inter text-gray-600 mb-6 text-center leading-relaxed">All hospitals are internationally certified.</p>
          <Link href="/about" className="mt-auto text-[#2CA6A4] hover:text-[#26928F] font-inter font-medium flex items-center transition-colors duration-150">
            See certifications <span className="ml-1">→</span>
          </Link>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-150 flex flex-col items-center h-full border border-gray-100">
          <div className="mb-6 p-4 bg-[#C9A66B]/10 rounded-full">
            <svg className="w-8 h-8 text-[#C9A66B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h3 className="font-playfair text-2xl font-semibold mb-4 text-[#1C3C47]">All-Inclusive Packages</h3>
          <p className="font-inter text-gray-600 mb-6 text-center leading-relaxed">Travel, treatment, and aftercare covered.</p>
          <Link href="/about" className="mt-auto text-[#2CA6A4] hover:text-[#26928F] font-inter font-medium flex items-center transition-colors duration-150">
            View packages <span className="ml-1">→</span>
          </Link>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-semibold mb-6 text-[#1C3C47]">Your Journey With Us</h2>
            <p className="max-w-2xl mx-auto font-inter text-gray-600 text-lg leading-relaxed">Our streamlined process guides you from consultation to recovery with expert care at every step.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <div className="flex flex-col space-y-8">
                {/* Step 1 */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-[#2CA6A4] flex items-center justify-center text-white font-inter font-bold text-lg">1</div>
                  <div className="ml-6">
                    <h3 className="font-playfair font-semibold text-xl mb-2 text-[#1C3C47]">Initial Quote</h3>
                    <p className="font-inter text-gray-600 leading-relaxed">Receive a tailored estimate within 24 hours of contacting us.</p>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-[#2CA6A4] flex items-center justify-center text-white font-inter font-bold text-lg">2</div>
                  <div className="ml-6">
                    <h3 className="font-playfair font-semibold text-xl mb-2 text-[#1C3C47]">Medical Consultation</h3>
                    <p className="font-inter text-gray-600 leading-relaxed">Speak with our specialists to customize your treatment plan.</p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-[#2CA6A4] flex items-center justify-center text-white font-inter font-bold text-lg">3</div>
                  <div className="ml-6">
                    <h3 className="font-playfair font-semibold text-xl mb-2 text-[#1C3C47]">Travel & Treatment</h3>
                    <p className="font-inter text-gray-600 leading-relaxed">Experience seamless logistics and premium medical care.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 bg-[#F7F5F2] p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-playfair text-2xl font-semibold mb-6 text-[#1C3C47]">Why Choose Our Process?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#2CA6A4] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-inter text-gray-700 leading-relaxed">No middlemen, direct provider relationships</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#2CA6A4] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-inter text-gray-700 leading-relaxed">Multilingual support throughout</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#2CA6A4] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-inter text-gray-700 leading-relaxed">Comprehensive aftercare planning</span>
                </li>
              </ul>
              <Link href="/how" className="mt-8 inline-block px-6 py-3 bg-[#2CA6A4] text-white font-inter font-semibold text-sm uppercase tracking-wide rounded-lg hover:bg-[#26928F] transition-all duration-150">
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services teaser */}
      <section className="py-16 px-4 bg-[#F7F5F2]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-playfair text-4xl font-semibold mb-6 text-[#1C3C47]">Popular Medical Services</h2>
          <p className="max-w-2xl mx-auto font-inter text-gray-600 text-lg leading-relaxed mb-12">World-class treatments at competitive prices with Tunisia&apos;s leading specialists.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-[#2CA6A4]">
              <div className="mb-4 text-[#2CA6A4]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="font-playfair font-semibold text-xl mb-3 text-[#1C3C47]">Plastic Surgery</h3>
              <p className="font-inter text-gray-600 leading-relaxed">Face lifts, body contouring, and reconstructive procedures</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-[#C9A66B]">
              <div className="mb-4 text-[#C9A66B]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
              </div>
              <h3 className="font-playfair font-semibold text-xl mb-3 text-[#1C3C47]">Dental Care</h3>
              <p className="font-inter text-gray-600 leading-relaxed">Implants, veneers, and full smile makeovers</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-[#2CA6A4]">
              <div className="mb-4 text-[#2CA6A4]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-playfair font-semibold text-xl mb-3 text-[#1C3C47]">Orthopedics</h3>
              <p className="font-inter text-gray-600 leading-relaxed">Joint replacements, spine surgery, and sports medicine</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 font-inter text-sm text-gray-700 hover:bg-[#F7F5F2] transition-colors duration-150">Fertility Treatments</span>
            <span className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 font-inter text-sm text-gray-700 hover:bg-[#F7F5F2] transition-colors duration-150">Eye Surgery</span>
            <span className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 font-inter text-sm text-gray-700 hover:bg-[#F7F5F2] transition-colors duration-150">Bariatric Surgery</span>
            <span className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 font-inter text-sm text-gray-700 hover:bg-[#F7F5F2] transition-colors duration-150">Hair Transplant</span>
            <span className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 font-inter text-sm text-gray-700 hover:bg-[#F7F5F2] transition-colors duration-150">Wellness Packages</span>
          </div>
          
          <Link href="/services" className="inline-block px-8 py-3 bg-[#2CA6A4] text-white font-inter font-semibold rounded-lg hover:bg-[#26928F] transition-all duration-300 transform hover:-translate-y-1 shadow-md">
            Explore All Services →
          </Link>
        </div>
      </section>

      {/* Our Partners Section - Logo Slider */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-semibold mb-6 text-[#1C3C47]">Our Trusted Partners</h2>
            <p className="max-w-2xl mx-auto font-inter text-gray-600 text-lg leading-relaxed">We work with the best healthcare providers, hotels, and insurance companies to ensure you receive exceptional care and service.</p>
          </div>
          
          <div className="px-8 py-4 mb-8">
            <Slider
              dots={false}
              infinite={true}
              speed={1000}
              slidesToShow={4}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={3000}
              pauseOnHover={true}
              cssEase={"linear"}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                  }
                }
              ]}
              className="partner-slider"
            >
              {/* Polyclinique hammamet */}
              <div className="px-3">
                <a href="https://polycliniquehammamet.net/" target="_blank" rel="noopener noreferrer" 
                  className="flex flex-col items-center group">
                  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-24 w-full flex items-center justify-center border border-gray-100">
                    <Image 
                      src="/partners/polyclinic-logo.webp" 
                      alt="Polyclinique Hammamet" 
                      width={120} 
                      height={60}
                      className="object-contain max-h-16 opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                  </div>
                  <span className="mt-2 text-xs text-gray-500 group-hover:text-[#2CA6A4] font-inter transition-colors duration-200">Polyclinique Hammamet</span>
                </a>
              </div>
              
              {/* Hotel Sindbad Hammamet */}
              <div className="px-3">
                <a href="https://sindbadhotel.com/" target="_blank" rel="noopener noreferrer" 
                  className="flex flex-col items-center group">
                  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-24 w-full flex items-center justify-center border border-gray-100">
                    <Image 
                      src="/partners/sindbad-logo.jpg" 
                      alt="Hotel Sindbad Hammamet" 
                      width={120} 
                      height={60}
                      className="object-contain max-h-16 opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                  </div>
                  <span className="mt-2 text-xs text-gray-500 group-hover:text-[#2CA6A4] font-inter transition-colors duration-200">Hotel Sindbad Hammamet</span>
                </a>
              </div>              {/* Hotel Khayem garden */}
              <div className="px-3">
                <a href="https://www.khayamgarden.com/" target="_blank" rel="noopener noreferrer" 
                  className="flex flex-col items-center group">
                  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-24 w-full flex items-center justify-center border border-gray-100">
                    <Image 
                      src="/partners/khayem-logo.svg" 
                      alt="Hotel Khayem Garden" 
                      width={120} 
                      height={60}
                      className="object-contain max-h-16 opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                  </div>
                  <span className="mt-2 text-xs text-gray-500 group-hover:text-[#2CA6A4] font-inter transition-colors duration-200">Hotel Khayem Garden</span>
                </a>
              </div>
              
              {/* STCE */}
              <div className="px-3">
                <a href="https://stce.tn/" target="_blank" rel="noopener noreferrer" 
                  className="flex flex-col items-center group">
                  <div className="bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-24 w-full flex items-center justify-center border border-gray-700">
                    <Image 
                      src="/partners/stce-header3.png" 
                      alt="STCE" 
                      width={120} 
                      height={60}
                      className="object-contain max-h-16 opacity-90 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                  </div>
                  <span className="mt-2 text-xs text-gray-500 group-hover:text-[#2CA6A4] font-inter transition-colors duration-200">STCE</span>
                </a>
              </div>
              
              {/* Allianz insurance */}
              <div className="px-3">
                <a href="https://www.allianz.at/" target="_blank" rel="noopener noreferrer" 
                  className="flex flex-col items-center group">
                  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-24 w-full flex items-center justify-center border border-gray-100">
                    <Image 
                      src="/partners/allianz-logo.svg" 
                      alt="Allianz Insurance" 
                      width={120} 
                      height={60}
                      className="object-contain max-h-16 opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                  </div>
                  <span className="mt-2 text-xs text-gray-500 group-hover:text-[#2CA6A4] font-inter transition-colors duration-200">Allianz Insurance</span>
                </a>
              </div>
              
              {/* Uniqa insurance */}
              <div className="px-3">
                <a href="https://www.uniqa.at/" target="_blank" rel="noopener noreferrer" 
                  className="flex flex-col items-center group">
                  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-24 w-full flex items-center justify-center border border-gray-100">
                    <Image 
                      src="/partners/uniqa-logo.svg" 
                      alt="Uniqa Insurance" 
                      width={120} 
                      height={60}
                      className="object-contain max-h-16 opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                  </div>
                  <span className="mt-2 text-xs text-gray-500 group-hover:text-[#2CA6A4] font-inter transition-colors duration-200">Uniqa Insurance</span>
                </a>
              </div>
            </Slider>
          </div>
          
          <div className="text-center mt-4">
            <Link href="/about#partners" className="text-[#2CA6A4] hover:text-[#26928F] font-inter font-medium inline-flex items-center transition-colors duration-150">
              Learn about our partnerships <span className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#1C3C47] to-[#2CA6A4] text-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3 text-center md:text-left mb-8 md:mb-0">
            <h2 className="font-playfair text-4xl font-semibold mb-4">Ready to Begin Your Journey?</h2>
            <p className="font-inter text-lg leading-relaxed mb-4">Get a personalized consultation and detailed cost estimate tailored to your needs.</p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#C9A66B] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-inter">No obligation</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#C9A66B] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-inter">Response within 24 hours</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#C9A66B] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-inter">Free video consultation</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center md:justify-end">
            <Link href="/contact" className="inline-block px-8 py-4 bg-white text-[#1C3C47] font-inter font-bold rounded-lg shadow-lg hover:bg-[#F7F5F2] transition-all duration-300 transform hover:-translate-y-1">
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
