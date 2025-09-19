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
        <h1 className="text-4xl font-bold mb-6 text-center">Medical Services</h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-center mb-12">
          We collaborate with accredited hospitals and specialists to deliver safe, effective, and affordable treatments. All plans are personalized to your medical needs and travel preferences.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map(s => (
            <div key={s.title} className="bg-white p-6 rounded-xl shadow-md border flex flex-col">
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{s.desc}</p>
              <ul className="text-sm text-gray-700 space-y-1 mb-4 list-disc list-inside">
                {s.items.map(i => <li key={i}>{i}</li>)}
              </ul>
              <Link href="/contact" className="mt-auto inline-block text-teal-600 hover:text-teal-800 font-medium">Request Details →</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
