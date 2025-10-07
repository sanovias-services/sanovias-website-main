/**
 * Session Management Utilities
 * 
 * User session management for form persistence, authentication state,
 * and user preferences across page reloads.
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const SESSION_COOKIE_NAME = 'sanovias_session';
const SESSION_DURATION = 60 * 60 * 24; // 24 hours

export interface SessionData {
  id: string;
  created: number;
  updated: number;
  data: Record<string, unknown>;
}

/**
 * Generate a secure session ID
 */
export function generateSessionId(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Create a new session
 */
export function createSession(data: Record<string, unknown> = {}): SessionData {
  const now = Date.now();
  return {
    id: generateSessionId(),
    created: now,
    updated: now,
    data
  };
}

/**
 * Set session cookie (Server-side)
 */
export async function setSession(response: NextResponse, sessionData: SessionData): Promise<void> {
  const sessionJson = JSON.stringify(sessionData);
  
  response.cookies.set(SESSION_COOKIE_NAME, sessionJson, {
    httpOnly: true, // Secure session data
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION,
  });
}

/**
 * Get session from cookies (Server-side)
 */
export async function getSession(): Promise<SessionData | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    
    if (!sessionCookie?.value) {
      return null;
    }

    const sessionData: SessionData = JSON.parse(sessionCookie.value);
    
    // Check if session has expired
    const now = Date.now();
    const sessionAge = now - sessionData.created;
    
    if (sessionAge > SESSION_DURATION * 1000) {
      return null; // Session expired
    }

    return sessionData;
  } catch (error) {
    console.error('Session parsing error:', error);
    return null;
  }
}

/**
 * Update session data
 */
export async function updateSession(
  response: NextResponse, 
  updates: Record<string, unknown>
): Promise<SessionData> {
  let session = await getSession();
  
  if (!session) {
    session = createSession(updates);
  } else {
    session.data = { ...session.data, ...updates };
    session.updated = Date.now();
  }
  
  await setSession(response, session);
  return session;
}

/**
 * Clear session cookie
 */
export async function clearSession(response: NextResponse): Promise<void> {
  response.cookies.delete(SESSION_COOKIE_NAME);
}

/**
 * Get session data by key
 */
export async function getSessionData<T = unknown>(key: string): Promise<T | null> {
  const session = await getSession();
  return (session?.data[key] as T) || null;
}

/**
 * Set session data by key
 */
export async function setSessionData(
  response: NextResponse,
  key: string, 
  value: unknown
): Promise<void> {
  await updateSession(response, { [key]: value });
}

/**
 * Session middleware for API routes
 */
export async function withSession(
  handler: (request: NextRequest, session: SessionData | null) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const session = await getSession();
    return handler(request, session);
  };
}

/**
 * Ensure session exists (create if not)
 */
export async function ensureSession(response: NextResponse): Promise<SessionData> {
  let session = await getSession();
  
  if (!session) {
    session = createSession();
    await setSession(response, session);
  }
  
  return session;
}

export { SESSION_COOKIE_NAME, SESSION_DURATION };