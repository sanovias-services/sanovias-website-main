"use client";

import { useState } from "react";

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
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">Tell us about your medical goals. A coordinator will respond with treatment options and a cost estimate.</p>
        
        {status === "success" ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center max-w-xl mx-auto">
            <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h2>
            <p className="text-green-700 mb-6">{statusMessage}</p>
            <button 
              onClick={() => setStatus("idle")}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md max-w-xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <input 
                  type="text" 
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleChange}
                  placeholder="First Name" 
                  className={`w-full p-3 border rounded ${errors.firstName ? 'border-red-500' : ''}`}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <input 
                  type="text" 
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleChange}
                  placeholder="Last Name" 
                  className={`w-full p-3 border rounded ${errors.lastName ? 'border-red-500' : ''}`}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>
            
            <div className="mb-4">
              <input 
                type="email" 
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="Email" 
                className={`w-full p-3 border rounded ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div className="mb-4">
              <input 
                type="tel" 
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                placeholder="Phone (optional)" 
                className="w-full p-3 border rounded"
              />
            </div>
            
            <div className="mb-4">
              <select 
                name="service"
                value={formState.service}
                onChange={handleChange}
                className={`w-full p-3 border rounded ${errors.service ? 'border-red-500' : ''}`}
              >
                <option value="">Select Service</option>
                <option value="Plastic Surgery">Plastic Surgery</option>
                <option value="Dental Care">Dental Care</option>
                <option value="Complex Treatments">Complex Treatments</option>
                <option value="Other">Other</option>
              </select>
              {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
            </div>
            
            <div className="mb-4">
              <textarea 
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Describe your needs" 
                className={`w-full p-3 border rounded ${errors.message ? 'border-red-500' : ''}`}
                rows={5}
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            
            <button 
              type="submit" 
              disabled={status === "submitting"}
              className={`w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center ${
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
              ) : "Submit"}
            </button>
            
            {status === "error" && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-center">
                {statusMessage}
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-3 text-center">By submitting, you agree to be contacted regarding your inquiry.</p>
          </form>
        )}
      </section>
    </div>
  );
}
