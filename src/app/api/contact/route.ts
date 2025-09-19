import { NextRequest, NextResponse } from "next/server";

// Type for the form submission
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
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

    // In a real implementation, you would:
    // 1. Send an email notification
    // 2. Store the inquiry in a database
    // 3. Possibly integrate with a CRM
    
    console.log("Contact form submission:", data);
    
    // For demonstration, simulate a successful submission
    // Add a slight delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json({
      success: true,
      message: "Thank you for your inquiry! We will contact you within 24 hours.",
    });
    
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