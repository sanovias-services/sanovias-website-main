"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formState.lastName.trim()) newErrors.lastName = "Last name is required";
    
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formState.email)) {
        newErrors.email = "Please enter a valid email";
      }
    }
    
    if (!formState.service) newErrors.service = "Please select a service";
    if (!formState.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setStatus("submitting");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus("success");
        setStatusMessage(data.message);
        // Reset the form
        setFormState({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        setStatus("error");
        setStatusMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Failed to submit. Please check your connection and try again.");
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1C3C47] to-[#2CA6A4] text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="font-playfair text-4xl md:text-5xl font-semibold mb-4 text-center">Get in Touch</h1>
          <p className="font-inter text-xl text-center max-w-2xl mx-auto leading-relaxed">We&apos;re here to help with your medical tourism journey. Contact us for a free consultation.</p>
        </div>
      </section>
      
      {/* Contact Information and Map */}
      <section className="py-16 bg-[#F7F5F2]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="font-playfair text-4xl font-semibold mb-8 text-[#1C3C47]">Our Offices</h2>
              
              <div className="space-y-8">
                {/* Tunisia Office */}
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                  <h3 className="font-playfair font-semibold text-2xl mb-4 text-[#2CA6A4]">Tunisia Headquarters</h3>
                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[#2CA6A4] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-inter leading-relaxed">123 Medical Avenue, <br/>Tunis 1002, Tunisia</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[#2CA6A4] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="font-inter">+216 123 456 789</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[#2CA6A4] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="font-inter">tunisia@sanovias.com</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[#2CA6A4] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-inter leading-relaxed">Mon-Fri: 9:00 AM - 6:00 PM (GMT+1)<br/>Saturday: 9:00 AM - 1:00 PM</span>
                    </div>
                  </div>
                </div>
                
                {/* Europe Office */}
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                  <h3 className="font-playfair font-semibold text-2xl mb-4 text-[#2CA6A4]">European Office</h3>
                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[#2CA6A4] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-inter leading-relaxed">35 Health Street, <br/>Frankfurt 60311, Germany</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[#2CA6A4] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="font-inter">+49 123 456 7890</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[#2CA6A4] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="font-inter">europe@sanovias.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="h-96 bg-gray-300 rounded-lg overflow-hidden shadow-md">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12779.767530904846!2d10.17557311231232!3d36.81034306520403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd337f5e7ef543%3A0xd671924e714a0275!2sTunis%2C%20Tunisia!5e0!3m2!1sen!2sus!4v1646157370229!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen 
                loading="lazy" 
                title="Sanovias Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-6">
          <Image 
            src="/images/sanovias_2.png" 
            alt="Sanovias" 
            width={350} 
            height={130}
            className="mx-auto"
          />
        </div>
        <h2 className="font-playfair text-4xl font-semibold mb-6 text-center text-[#1C3C47]">Send Us a Message</h2>
        <p className="font-inter text-gray-600 text-center text-lg leading-relaxed max-w-2xl mx-auto mb-10">Tell us about your medical goals. A coordinator will respond with treatment options and a cost estimate.</p>
        
        {status === "success" ? (
          <div className="bg-gradient-to-r from-teal-50 to-green-50 border border-green-200 rounded-xl p-10 text-center max-w-xl mx-auto shadow-lg">
            <div className="rounded-full bg-green-100 w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Thank You!</h2>
            <p className="text-gray-600 mb-8 text-lg">{statusMessage}</p>
            <button 
              onClick={() => setStatus("idle")}
              className="px-8 py-3 bg-[#2CA6A4] text-white font-inter font-semibold rounded-lg hover:bg-[#26928F] transition-colors duration-300 shadow-md"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-xl mx-auto border border-gray-100">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-inter font-medium text-gray-700 mb-1">First Name</label>
                <input 
                  type="text" 
                  id="firstName"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleChange}
                  placeholder="Your first name" 
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#2CA6A4] focus:border-[#2CA6A4] font-inter transition-all ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-inter font-medium text-gray-700 mb-1">Last Name</label>
                <input 
                  type="text" 
                  id="lastName"
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleChange}
                  placeholder="Your last name" 
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#2CA6A4] focus:border-[#2CA6A4] font-inter transition-all ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-inter font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="Your email address" 
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#2CA6A4] focus:border-[#2CA6A4] font-inter transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-inter font-medium text-gray-700 mb-1">Phone Number <span className="text-gray-400">(optional)</span></label>
              <input 
                type="tel" 
                id="phone"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                placeholder="Your phone number" 
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2CA6A4] focus:border-[#2CA6A4] font-inter transition-all"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="service" className="block text-sm font-inter font-medium text-gray-700 mb-1">Service Interested In</label>
              <select 
                id="service"
                name="service"
                value={formState.service}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#2CA6A4] focus:border-[#2CA6A4] font-inter transition-all ${
                  errors.service ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a service</option>
                <option value="Plastic Surgery">Plastic Surgery</option>
                <option value="Dental Care">Dental Care</option>
                <option value="Complex Treatments">Complex Treatments</option>
                <option value="Hair Transplant">Hair Transplant</option>
                <option value="Weight Loss Surgery">Weight Loss Surgery</option>
                <option value="Other">Other Medical Services</option>
              </select>
              {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-inter font-medium text-gray-700 mb-1">Your Message</label>
              <textarea 
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Please describe your medical needs, questions, or any specific treatments you're interested in..." 
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#2CA6A4] focus:border-[#2CA6A4] font-inter transition-all ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={6}
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            
            <button 
              type="submit" 
              disabled={status === "submitting"}
              className={`w-full px-6 py-4 bg-[#2CA6A4] text-white font-inter font-semibold rounded-lg hover:bg-[#26928F] transition-colors duration-300 flex items-center justify-center shadow-md ${
                status === "submitting" ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {status === "submitting" ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Message
                </>
              )}
            </button>
            
            {status === "error" && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Error</span>
                </div>
                <p>{statusMessage}</p>
              </div>
            )}
            
            <div className="mt-6 text-center">
              <p className="font-inter text-sm text-gray-500">By submitting, you agree to be contacted regarding your inquiry.</p>
              <p className="font-inter text-sm text-gray-500 mt-2">Your data will be processed according to our <Link href="/privacy" className="text-[#2CA6A4] hover:text-[#26928F] hover:underline transition-colors duration-150">Privacy Policy</Link></p>
            </div>
          </form>
        )}
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-[#F7F5F2]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-playfair text-4xl font-semibold mb-12 text-center text-[#1C3C47]">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-playfair font-semibold text-xl mb-4 text-[#1C3C47]">How quickly will I receive a response after submitting my inquiry?</h3>
              <p className="font-inter text-gray-600 leading-relaxed">Our team typically responds within 24-48 business hours. For urgent matters, please indicate so in your message, and we&apos;ll prioritize your inquiry.</p>
            </div>
            
            {/* FAQ Item 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-playfair font-semibold text-xl mb-4 text-[#1C3C47]">Do I need to provide my medical records when contacting you?</h3>
              <p className="font-inter text-gray-600 leading-relaxed">Not initially. After our first consultation, our medical team will advise what records are needed for a proper assessment of your case and treatment options.</p>
            </div>
            
            {/* FAQ Item 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-playfair font-semibold text-xl mb-4 text-[#1C3C47]">Can you arrange video consultations with doctors before I travel?</h3>
              <p className="font-inter text-gray-600 leading-relaxed">Yes, we can arrange virtual consultations with your chosen specialist before you commit to traveling. This helps ensure you&apos;re comfortable with your doctor and treatment plan.</p>
            </div>
            
            {/* FAQ Item 4 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-playfair font-semibold text-xl mb-4 text-[#1C3C47]">How do I get a cost estimate for my treatment?</h3>
              <p className="font-inter text-gray-600 leading-relaxed">After reviewing your medical information, we&apos;ll provide a detailed cost breakdown including the procedure, hospital stay, medications, follow-up care, and any additional services you request.</p>
            </div>
            
            {/* FAQ Item 5 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-playfair font-semibold text-xl mb-4 text-[#1C3C47]">Is there a fee for your consultation services?</h3>
              <p className="font-inter text-gray-600 leading-relaxed">Initial consultations and treatment coordination services are complimentary. Our fees are included in the overall treatment package once you decide to proceed.</p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <p className="font-inter text-lg text-gray-600 mb-4">Still have questions?</p>
            <div className="inline-flex items-center text-[#2CA6A4] font-inter font-semibold hover:text-[#26928F] transition-colors duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call us at +216 123 456 789
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
