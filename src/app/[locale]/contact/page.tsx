"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from '../components/useTranslations';
import { useCSRFToken } from '@/hooks/useCSRFToken';
import { FormCookies } from '@/lib/cookies';

export default function ContactPage() {
  const { t } = useTranslations();
  const { addToJSON, getHeaders, loading: csrfLoading } = useCSRFToken();
  
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

  // Load saved form data on component mount
  useEffect(() => {
    const savedForm = FormCookies.getContactForm();
    if (savedForm) {
      setFormState(prev => ({
        ...prev,
        // Convert potential numbers/booleans back to strings for form inputs
        firstName: String(savedForm.firstName || ''),
        lastName: String(savedForm.lastName || ''),
        email: String(savedForm.email || ''),
        phone: String(savedForm.phone || ''),
        service: String(savedForm.service || ''),
        message: String(savedForm.message || ''),
      }));
    }
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.firstName.trim()) newErrors.firstName = t('contact.form.fields.firstName.required');
    if (!formState.lastName.trim()) newErrors.lastName = t('contact.form.fields.lastName.required');
    
    if (!formState.email.trim()) {
      newErrors.email = t('contact.form.fields.email.required');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formState.email)) {
        newErrors.email = t('contact.form.fields.email.invalid');
      }
    }
    
    if (!formState.service) newErrors.service = t('contact.form.fields.service.required');
    if (!formState.message.trim()) newErrors.message = t('contact.form.fields.message.required');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFormState = { ...formState, [name]: value };
    setFormState(newFormState);
    
    // Auto-save form data to cookie (debounced)
    setTimeout(() => {
      FormCookies.saveContactForm(newFormState);
    }, 1000);
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Check if CSRF token is still loading
    if (csrfLoading) {
      setStatus("error");
      setStatusMessage("Security token loading. Please wait a moment and try again.");
      return;
    }
    
    setStatus("submitting");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: getHeaders(), // Includes CSRF token
        body: JSON.stringify(addToJSON(formState)), // Includes CSRF token in body
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus("success");
        setStatusMessage(data.message);
        
        // Clear saved form data since submission was successful
        FormCookies.clearContactForm();
        
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
          <h1 className="font-playfair text-4xl md:text-5xl font-semibold mb-4 text-center">{t('contact.hero.title')}</h1>
          <p className="font-inter text-xl text-center max-w-2xl mx-auto leading-relaxed">{t('contact.hero.subtitle')}</p>
        </div>
      </section>
      
      {/* Contact Information and Map */}
      <section className="py-16 bg-[#F7F5F2]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="font-playfair text-4xl font-semibold mb-8 text-[#1C3C47]">{t('contact.offices.title')}</h2>
              
              <div className="space-y-8">
                {/* Tunisia Office */}
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                  <h3 className="font-playfair font-semibold text-2xl mb-4 text-[#2CA6A4]">{t('contact.offices.tunisia.title')}</h3>
                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[#2CA6A4] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-inter leading-relaxed">{t('contact.offices.tunisia.address').split('\n').map((line, index) => (
                        <span key={index}>{line}{index === 0 && <br />}</span>
                      ))}</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[#2CA6A4] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="font-inter">{t('contact.offices.tunisia.phone')}</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[#2CA6A4] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="font-inter">{t('contact.offices.tunisia.email')}</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[#2CA6A4] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-inter leading-relaxed">{t('contact.offices.tunisia.hours').split('\n').map((line, index) => (
                        <span key={index}>{line}{index === 0 && <br />}</span>
                      ))}</span>
                    </div>
                  </div>
                </div>
                
                {/* Europe Office */}
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                  <h3 className="font-playfair font-semibold text-2xl mb-4 text-[#2CA6A4]">{t('contact.offices.europe.title')}</h3>
                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[#2CA6A4] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-inter leading-relaxed">{t('contact.offices.europe.address').split('\n').map((line, index) => (
                        <span key={index}>{line}{index === 0 && <br />}</span>
                      ))}</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[#2CA6A4] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="font-inter">{t('contact.offices.europe.phone')}</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[#2CA6A4] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="font-inter">{t('contact.offices.europe.email')}</span>
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
        <h2 className="font-playfair text-4xl font-semibold mb-6 text-center text-[#1C3C47]">{t('contact.form.title')}</h2>
        <p className="font-inter text-gray-600 text-center text-lg leading-relaxed max-w-2xl mx-auto mb-6">{t('contact.form.subtitle')}</p>
        
        {/* Auto-save indicator */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Form data is automatically saved as you type
          </p>
        </div>
        
        {status === "success" ? (
          <div className="bg-gradient-to-r from-teal-50 to-green-50 border border-green-200 rounded-xl p-10 text-center max-w-xl mx-auto shadow-lg">
            <div className="rounded-full bg-green-100 w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">{t('contact.form.success.title')}</h2>
            <p className="text-gray-600 mb-8 text-lg">{statusMessage}</p>
            <button 
              onClick={() => setStatus("idle")}
              className="px-8 py-3 bg-[#2CA6A4] text-white font-inter font-semibold rounded-lg hover:bg-[#26928F] transition-colors duration-300 shadow-md"
            >
              {t('contact.form.success.button')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-xl mx-auto border border-gray-100">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-inter font-medium text-gray-700 mb-1">{t('contact.form.fields.firstName.label')}</label>
                <input 
                  type="text" 
                  id="firstName"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleChange}
                  placeholder={t('contact.form.fields.firstName.placeholder')} 
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#2CA6A4] focus:border-[#2CA6A4] font-inter transition-all ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-inter font-medium text-gray-700 mb-1">{t('contact.form.fields.lastName.label')}</label>
                <input 
                  type="text" 
                  id="lastName"
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleChange}
                  placeholder={t('contact.form.fields.lastName.placeholder')} 
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#2CA6A4] focus:border-[#2CA6A4] font-inter transition-all ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-inter font-medium text-gray-700 mb-1">{t('contact.form.fields.email.label')}</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder={t('contact.form.fields.email.placeholder')} 
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#2CA6A4] focus:border-[#2CA6A4] font-inter transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-inter font-medium text-gray-700 mb-1">{t('contact.form.fields.phone.label')} <span className="text-gray-400">{t('contact.form.fields.phone.optional')}</span></label>
              <input 
                type="tel" 
                id="phone"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                placeholder={t('contact.form.fields.phone.placeholder')} 
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2CA6A4] focus:border-[#2CA6A4] font-inter transition-all"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="service" className="block text-sm font-inter font-medium text-gray-700 mb-1">{t('contact.form.fields.service.label')}</label>
              <select 
                id="service"
                name="service"
                value={formState.service}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#2CA6A4] focus:border-[#2CA6A4] font-inter transition-all ${
                  errors.service ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">{t('contact.form.fields.service.placeholder')}</option>
                <option value="Plastic Surgery">{t('contact.form.fields.service.options.plasticSurgery')}</option>
                <option value="Dental Care">{t('contact.form.fields.service.options.dentalCare')}</option>
                <option value="Complex Treatments">{t('contact.form.fields.service.options.complexTreatments')}</option>
                <option value="Hair Transplant">{t('contact.form.fields.service.options.hairTransplant')}</option>
                <option value="Weight Loss Surgery">{t('contact.form.fields.service.options.weightLoss')}</option>
                <option value="Other">{t('contact.form.fields.service.options.other')}</option>
              </select>
              {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-inter font-medium text-gray-700 mb-1">{t('contact.form.fields.message.label')}</label>
              <textarea 
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder={t('contact.form.fields.message.placeholder')} 
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
                  {t('contact.form.submit.submitting')}
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {t('contact.form.submit.button')}
                </>
              )}
            </button>
            
            {status === "error" && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{t('contact.form.error.title')}</span>
                </div>
                <p>{statusMessage}</p>
              </div>
            )}
            
            <div className="mt-6 text-center">
              <p className="font-inter text-sm text-gray-500">{t('contact.form.privacy.notice')}</p>
              <p className="font-inter text-sm text-gray-500 mt-2">{t('contact.form.privacy.policy')} <Link href="/privacy" className="text-[#2CA6A4] hover:text-[#26928F] hover:underline transition-colors duration-150">{t('contact.form.privacy.link')}</Link></p>
            </div>
          </form>
        )}
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-[#F7F5F2]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-playfair text-4xl font-semibold mb-12 text-center text-[#1C3C47]">{t('contact.faq.title')}</h2>
          
          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-playfair font-semibold text-xl mb-4 text-[#1C3C47]">{t('contact.faq.questions.0.question')}</h3>
              <p className="font-inter text-gray-600 leading-relaxed">{t('contact.faq.questions.0.answer')}</p>
            </div>
            
            {/* FAQ Item 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-playfair font-semibold text-xl mb-4 text-[#1C3C47]">{t('contact.faq.questions.1.question')}</h3>
              <p className="font-inter text-gray-600 leading-relaxed">{t('contact.faq.questions.1.answer')}</p>
            </div>
            
            {/* FAQ Item 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-playfair font-semibold text-xl mb-4 text-[#1C3C47]">{t('contact.faq.questions.2.question')}</h3>
              <p className="font-inter text-gray-600 leading-relaxed">{t('contact.faq.questions.2.answer')}</p>
            </div>
            
            {/* FAQ Item 4 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-playfair font-semibold text-xl mb-4 text-[#1C3C47]">{t('contact.faq.questions.3.question')}</h3>
              <p className="font-inter text-gray-600 leading-relaxed">{t('contact.faq.questions.3.answer')}</p>
            </div>
            
            {/* FAQ Item 5 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-playfair font-semibold text-xl mb-4 text-[#1C3C47]">{t('contact.faq.questions.4.question')}</h3>
              <p className="font-inter text-gray-600 leading-relaxed">{t('contact.faq.questions.4.answer')}</p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <p className="font-inter text-lg text-gray-600 mb-4">{t('contact.faq.stillQuestions')}</p>
            <div className="inline-flex items-center text-[#2CA6A4] font-inter font-semibold hover:text-[#26928F] transition-colors duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t('contact.faq.callUs')}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
