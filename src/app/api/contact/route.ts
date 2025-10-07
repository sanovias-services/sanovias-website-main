import { NextRequest, NextResponse } from "next/server";
import { validateCSRFToken } from "@/lib/cookies/csrf";
import { updateSession } from "@/lib/cookies/session";

// Type for the form submission
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  _csrf_token?: string; // CSRF token from form
}

export async function POST(request: NextRequest) {
  try {
    // CSRF Protection - validate token
    const isValidCSRF = await validateCSRFToken(request);
    if (!isValidCSRF) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Security validation failed. Please refresh the page and try again." 
        },
        { status: 403 }
      );
    }

    // Parse the form data from the request
    const data: ContactFormData = await request.json();
    
    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.service || !data.message) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided" },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Thank you for your inquiry! We will contact you within 24 hours.",
    });

    // Store form submission in session for potential follow-up
    await updateSession(response, {
      lastContactSubmission: {
        timestamp: Date.now(),
        email: data.email,
        service: data.service
      }
    });

    // In a real implementation, you would:
    // 1. Send an email notification
    // 2. Store the inquiry in a database
    // 3. Possibly integrate with a CRM
    
    console.log("Contact form submission:", data);
    
    // Add a slight delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return response;
    
  } catch (error) {
    console.error("Contact form error:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: "An error occurred while processing your request. Please try again."
      },
      { status: 500 }
    );
  }
}