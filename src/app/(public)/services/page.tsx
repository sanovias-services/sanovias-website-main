"use client";
import Link from "next/link";

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
                index === 0 ? 'bg-[#2CA6A4] bg-opacity-20' : 
                index === 1 ? 'bg-[#C9A66B] bg-opacity-20' : 
                'bg-[#2CA6A4] bg-opacity-20'
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
    </div>
  );
}
