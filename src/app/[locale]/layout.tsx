import Header from "./components/Header";
import Footer from "./components/Footer";
import { LocaleProvider } from "./components/LocaleProvider";
import { PreviewProvider } from "./components/PreviewProvider";
import PreviewBanner from "./blog/components/PreviewBanner";
import { isPreviewMode } from "@/lib/contentful/preview-server";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const preview = await isPreviewMode();
  
  return (
    <LocaleProvider initialLocale={locale}>
      <PreviewProvider isPreview={preview}>
        <div className="min-h-screen flex flex-col">
          <PreviewBanner />
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </PreviewProvider>
    </LocaleProvider>
  );
}