/**
 * React CSRF Token Management Hook
 * 
 * LOCATION: /src/hooks/useCSRFToken.ts
 * FOLLOWS: React Hooks naming convention (useXxx)
 * BEST PRACTICE: ✅ Custom hooks in /src/hooks/ folder (industry standard)
 * 
 * PURPOSE:
 * - Provides CSRF token management for React components
 * - Automatically reads tokens set by middleware 
 * - Provides utilities to include tokens in form submissions
 * - Handles token refresh when validation fails
 * 
 * USED BY:
 * - Contact forms (prevents spam/forgery)
 * - Quote request forms
 * - Newsletter signup forms
 * - Any form that submits data to API routes
 * 
 * SECURITY INTEGRATION:
 * Middleware sets token → Hook reads token → Form includes token → API validates token
 * 
 * USAGE EXAMPLE:
 * ```tsx
 * import { useCSRFToken } from '@/hooks/useCSRFToken';
 * 
 * function ContactForm() {
 *   const { csrfToken, addToJSON, getHeaders } = useCSRFToken();
 *   
 *   const submitForm = async (formData) => {
 *     const response = await fetch('/api/contact', {
 *       method: 'POST',
 *       headers: getHeaders(),
 *       body: JSON.stringify(addToJSON(formData))
 *     });
 *   };
 * }
 * ```
 * 
 * @see /src/middleware.ts - Where CSRF tokens are generated
 * @see /src/lib/cookies/csrf.ts - Core CSRF utilities
 */

"use client";

import { useState, useEffect } from 'react';
import { getClientCSRFToken } from '@/lib/cookies/csrf-client';

/**
 * React hook for CSRF token management
 * Provides CSRF token for forms and handles token refresh
 */
export function useCSRFToken() {
  const [csrfToken, setCSRFToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get CSRF token from cookie
    const token = getClientCSRFToken();
    setCSRFToken(token);
    setLoading(false);
  }, []);

  /**
   * Refresh CSRF token by reloading the page
   * This is needed when token validation fails
   */
  const refreshToken = () => {
    window.location.reload();
  };

  /**
   * Add CSRF token to form data
   */
  const addToFormData = (formData: FormData): FormData => {
    if (csrfToken) {
      formData.append('_csrf_token', csrfToken);
    }
    return formData;
  };

  /**
   * Add CSRF token to JSON payload
   */
  const addToJSON = (data: Record<string, unknown>): Record<string, unknown> => {
    if (csrfToken) {
      return { ...data, _csrf_token: csrfToken };
    }
    return data;
  };

  /**
   * Get headers with CSRF token
   */
  const getHeaders = (): HeadersInit => {
    if (csrfToken) {
      return {
        'X-CSRF-Token': csrfToken,
        'Content-Type': 'application/json'
      };
    }
    return {
      'Content-Type': 'application/json'
    };
  };

  return {
    csrfToken,
    loading,
    refreshToken,
    addToFormData,
    addToJSON,
    getHeaders
  };
}

/**
 * Type for components that receive CSRF token props
 */
export interface CSRFTokenProps {
  csrf: {
    csrfToken: string | null;
    loading: boolean;
    refreshToken: () => void;
    addToFormData: (formData: FormData) => FormData;
    addToJSON: (data: Record<string, unknown>) => Record<string, unknown>;
    getHeaders: () => HeadersInit;
  };
}