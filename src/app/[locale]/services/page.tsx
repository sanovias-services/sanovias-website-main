"use client";
import Link from "next/link";
import HydrationSafeSlider from '../components/HydrationSafeSlider';
import { useLocale } from '../components/LocaleProvider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const services = [
  {
    title: "Plastic Surgery",
    desc: "Cosmetic and reconstructive procedures with board-certified surgeons.",
    items: ["Facelift", "Rhinoplasty", "Breast Augmentation", "Liposuction"],
  },
  {
    title: "Dental Care",
    desc: "Advanced restorative and cosmetic dentistry.",
    items: ["Dental Implants", "Hollywood Smile", "Orthodontics", "Crowns & Bridges"],
  },
  {
    title: "Complex Treatments",
    desc: "Specialized medical interventions and second opinions.",
    items: ["Orthopedic Surgery", "Cardiology", "Fertility Treatments", "Bariatric Surgery"],
  },
];

export default function ServicesPage() {
  const locale = useLocale();
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="font-playfair text-5xl font-semibold mb-6 text-center text-[#1C3C47]">Medical Services</h1>
        <p className="font-inter text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto text-center mb-12">
          We collaborate with accredited hospitals and specialists to deliver safe, effective, and affordable treatments. All plans are personalized to your medical needs and travel preferences.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((s, index) => (
            <div key={s.title} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex flex-col hover:shadow-lg transition-shadow duration-300">
              <div className={`w-12 h-12 rounded-full mb-6 flex items-center justify-center ${
                index === 0 ? 'bg-[#2CA6A4]/10' : 
                index === 1 ? 'bg-[#C9A66B]/10' : 
                'bg-[#2CA6A4]/10'
              }`}>
                {index === 0 && (
                  <svg className="w-6 h-6 text-[#2CA6A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                )}
                {index === 1 && (
                  <svg className="w-6 h-6 text-[#C9A66B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )}
                {index === 2 && (
                  <svg className="w-6 h-6 text-[#2CA6A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                )}
              </div>
              <h3 className="font-playfair text-2xl font-semibold mb-3 text-[#1C3C47]">{s.title}</h3>
              <p className="font-inter text-gray-600 leading-relaxed mb-6">{s.desc}</p>
              <ul className="font-inter text-gray-700 space-y-2 mb-6 list-none">
                {s.items.map(i => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-[#2CA6A4] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {i}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="mt-auto inline-flex items-center text-[#2CA6A4] hover:text-[#26928F] font-inter font-medium transition-colors duration-150">
                Request Details <span className="ml-1">→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Partner Doctors Section */}
      <section className="py-16 px-4 bg-[#F7F5F2]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-semibold mb-6 text-[#1C3C47]">Our Partner Medical Experts</h2>
            <p className="max-w-3xl mx-auto font-inter text-gray-600 text-lg leading-relaxed">
              We collaborate with Tunisia&apos;s most respected specialists to ensure you receive world-class medical care from experienced professionals.
            </p>
          </div>

          {/* Custom CSS for doctor slider */}
          <style jsx global>{`
            .doctor-slider .slick-dots {
              bottom: -60px;
            }
            .doctor-slider .slick-dots li button:before {
              color: #2CA6A4 !important;
              font-size: 12px;
            }
            .doctor-slider .slick-dots li.slick-active button:before {
              color: #2CA6A4 !important;
            }
            .doctor-slider .slick-arrow:before {
              color: #2CA6A4 !important;
            }
            .doctor-slider .slick-arrow:hover:before {
              color: #26928F !important;
            }
          `}</style>
          
          <div className="px-8">
            <HydrationSafeSlider
              settings={{
                dots: true,
                infinite: true,
                speed: 800,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 5000,
                pauseOnHover: true,
                fade: true,
                cssEase: "ease-in-out"
              }}
              className="doctor-slider"
            >
              {/* Dr. Atef M. Souissi */}
              <div>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 bg-gradient-to-br from-[#2CA6A4]/20 to-[#2CA6A4]/10 flex items-center justify-center p-8">
                      <div className="w-32 h-32 rounded-full bg-[#2CA6A4]/20 flex items-center justify-center">
                        <svg className="w-16 h-16 text-[#2CA6A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-8">
                      <h3 className="font-playfair text-2xl font-semibold mb-1 text-[#1C3C47]">Dr. Atef M. Souissi</h3>
                      <p className="text-[#2CA6A4] font-inter font-semibold mb-4">Plastic & Maxillo-Facial Surgery</p>
                      
                      {/* Quote */}
                      <div className="mb-4 p-4 bg-[#2CA6A4]/5 rounded-lg border-l-4 border-[#2CA6A4]">
                        <p className="font-inter text-gray-700 italic text-sm leading-relaxed">
                          &ldquo;Every procedure is a work of art. I believe in combining the latest surgical techniques with an aesthetic eye to deliver results that not only heal but also enhance natural beauty.&rdquo;
                        </p>
                      </div>
                      
                      <p className="font-inter text-gray-600 text-sm leading-relaxed mb-4">
                        Renowned specialist in plastic and maxillo-facial surgery with over 15 years of experience.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-[#2CA6A4]/10 text-[#2CA6A4] text-xs font-inter rounded-full">Rhinoplasty</span>
                        <span className="px-3 py-1 bg-[#2CA6A4]/10 text-[#2CA6A4] text-xs font-inter rounded-full">Facelift</span>
                        <span className="px-3 py-1 bg-[#2CA6A4]/10 text-[#2CA6A4] text-xs font-inter rounded-full">Jaw Surgery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dr. Amira Ben Salem */}
              <div>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 bg-gradient-to-br from-[#C9A66B]/20 to-[#C9A66B]/10 flex items-center justify-center p-8">
                      <div className="w-32 h-32 rounded-full bg-[#C9A66B]/20 flex items-center justify-center">
                        <svg className="w-16 h-16 text-[#C9A66B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-8">
                      <h3 className="font-playfair text-2xl font-semibold mb-1 text-[#1C3C47]">Dr. Amira Ben Salem</h3>
                      <p className="text-[#C9A66B] font-inter font-semibold mb-4">Cosmetic & Restorative Dentistry</p>
                      
                      {/* Quote */}
                      <div className="mb-4 p-4 bg-[#C9A66B]/5 rounded-lg border-l-4 border-[#C9A66B]">
                        <p className="font-inter text-gray-700 italic text-sm leading-relaxed">
                          &ldquo;A beautiful smile transforms not just your appearance, but your confidence. My mission is to create natural, radiant smiles that my patients are proud to show the world.&rdquo;
                        </p>
                      </div>
                      
                      <p className="font-inter text-gray-600 text-sm leading-relaxed mb-4">
                        Leading dental specialist focusing on cosmetic and restorative dentistry with gentle, patient-centered care.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-[#C9A66B]/10 text-[#C9A66B] text-xs font-inter rounded-full">Hollywood Smile</span>
                        <span className="px-3 py-1 bg-[#C9A66B]/10 text-[#C9A66B] text-xs font-inter rounded-full">Implants</span>
                        <span className="px-3 py-1 bg-[#C9A66B]/10 text-[#C9A66B] text-xs font-inter rounded-full">Veneers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dr. Hedi Antar */}
              <div>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 bg-gradient-to-br from-[#2CA6A4]/20 to-[#2CA6A4]/10 flex items-center justify-center p-8">
                      <div className="w-32 h-32 rounded-full bg-[#2CA6A4]/20 flex items-center justify-center">
                        <svg className="w-16 h-16 text-[#2CA6A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-8">
                      <h3 className="font-playfair text-2xl font-semibold mb-1 text-[#1C3C47]">Dr. Hedi Antar</h3>
                      <p className="text-[#2CA6A4] font-inter font-semibold mb-4">Orthopedic Surgery</p>
                      
                      {/* Quote */}
                      <div className="mb-4 p-4 bg-[#2CA6A4]/5 rounded-lg border-l-4 border-[#2CA6A4]">
                        <p className="font-inter text-gray-700 italic text-sm leading-relaxed">
                          &ldquo;Mobility is freedom. My goal is to restore not just function, but the joy of movement, helping patients return to the activities they love with confidence and strength.&rdquo;
                        </p>
                      </div>
                      
                      <p className="font-inter text-gray-600 text-sm leading-relaxed mb-4">
                        Expert orthopedic surgeon specializing in joint replacement and sports medicine with cutting-edge techniques.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-[#2CA6A4]/10 text-[#2CA6A4] text-xs font-inter rounded-full">Hip Replacement</span>
                        <span className="px-3 py-1 bg-[#2CA6A4]/10 text-[#2CA6A4] text-xs font-inter rounded-full">Knee Surgery</span>
                        <span className="px-3 py-1 bg-[#2CA6A4]/10 text-[#2CA6A4] text-xs font-inter rounded-full">Sports Medicine</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </HydrationSafeSlider>
          </div>

          <div className="text-center mt-16">
            <Link href="/contact" className="inline-block px-8 py-4 bg-[#2CA6A4] text-white font-inter font-semibold rounded-lg hover:bg-[#26928F] transition-all duration-300 transform hover:-translate-y-1 shadow-md">
              Schedule a Consultation →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
