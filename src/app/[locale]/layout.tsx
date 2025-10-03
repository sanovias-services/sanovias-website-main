import Header from "./components/Header";
import Footer from "./components/Footer";
import { LocaleProvider } from "./components/LocaleProvider";
import { PreviewProvider } from "./blog/components/PreviewProvider";
import { CookieProvider } from "./components/CookieProvider";
import { CookieConsentBanner } from "./components/CookieConsentBanner";
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
            
            {/* Cookie consent banner */}
            <CookieConsentBanner />
          </div>
        </PreviewProvider>
      </CookieProvider>
    </LocaleProvider>
  );
}