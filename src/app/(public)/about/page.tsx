import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Smart Journey connects international patients with Tunisia's top accredited healthcare providers. Learn about our mission and services.",
  keywords: ["medical tourism Tunisia", "about Smart Journey", "healthcare abroad"],
};

export default function AboutPage() {
  return (
    <div>
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 text-center">About Smart Journey</h1>
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto text-center">
          Smart Journey connects international patients with Tunisia&apos;s top accredited hospitals, clinics, and specialists. Our mission is to make high-quality medical care accessible, transparent, and stress-free.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 px-4 sm:px-8 bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center text-center">
          <div className="mb-4 p-4 bg-teal-100 rounded-full">
            <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Fast Appointments</h3>
          <p className="text-gray-600">Skip the delays and get scheduled quickly.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center text-center">
          <div className="mb-4 p-4 bg-blue-100 rounded-full">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Accredited Clinics</h3>
            <p className="text-gray-600">International standards & certifications.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center text-center">
          <div className="mb-4 p-4 bg-purple-100 rounded-full">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">All-Inclusive Packages</h3>
          <p className="text-gray-600">Treatment, travel & aftercare support.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
        <p className="text-gray-600 mb-4">We curate trusted medical providers and guide patients through every stage: consultation, travel logistics, procedure, recovery, and follow-ups. Transparency and patient safety are our priorities.</p>
        <p className="text-gray-600">Each case is handled by a dedicated coordinator who ensures seamless communication between you and your medical team.</p>
      </section>
    </div>
  );
}
