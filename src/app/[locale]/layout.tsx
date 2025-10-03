import Header from "./components/Header";
import Footer from "./components/Footer";
import { LocaleProvider } from "./components/LocaleProvider";
import { PreviewProvider } from "./blog/components/PreviewProvider";
import { CookieProvider } from "./components/CookieProvider";
import { CookieSystemDebug, CookieSystemTester } from "./components/CookieSystemDebug";
import PreviewBanner from "./blog/components/PreviewBanner";
import { isPreviewMode } from "@/lib/contentful/preview-server";
import { initializeServerCookies } from "@/lib/cookies/server-init";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const preview = await isPreviewMode();
  
  // Initialize cookie system on server side
  const cookieSystemState = await initializeServerCookies();
  
  // Log cookie system status in development
  if (process.env.NODE_ENV === 'development') {
    console.log('🍪 Server-side cookie system initialized:', {
      hasExistingConsent: cookieSystemState.hasExistingConsent,
      needsConsentBanner: cookieSystemState.needsConsentBanner,
      consentState: cookieSystemState.initialConsentState
    });
  }
  
  return (
    <LocaleProvider initialLocale={locale}>
      <CookieProvider initialConsentState={cookieSystemState.initialConsentState}>
        <PreviewProvider isPreview={preview}>
          <div className="min-h-screen flex flex-col">
            <PreviewBanner />
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            
            {/* Development-only cookie system debugging */}
            <CookieSystemDebug />
            <CookieSystemTester />
          </div>
        </PreviewProvider>
      </CookieProvider>
    </LocaleProvider>
  );
}