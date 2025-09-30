"use client";

import { useLocale } from "./LocaleProvider";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { getAllLocales, getDefaultLocale } from "@/lib/locale-config";

// Get all available languages dynamically
const languages = getAllLocales().map(config => ({
  code: config.code,
  name: config.nativeName, // Use native name for better UX
  flag: config.flag
}));

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === locale) || 
                          languages.find(lang => lang.code === getDefaultLocale()) || 
                          languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLanguage = async (newLocale: string) => {
    const currentPathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    
    // Check if we're on a blog post page
    const blogPostMatch = currentPathWithoutLocale.match(/^\/blog\/(.+)$/);
    
    if (blogPostMatch) {
      const currentSlug = blogPostMatch[1];
      setIsLoading(true);
      
      try {
        // Call API to get the equivalent slug in the target language
        const response = await fetch(
          `/api/blog/slug-switch?currentSlug=${encodeURIComponent(currentSlug)}&currentLocale=${locale}&targetLocale=${newLocale}`
        );
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.success && data.targetSlug) {
            // Blog post exists in target language, redirect to it
            const newPath = `/${newLocale}/blog/${data.targetSlug}`;
            router.push(newPath);
          } else {
            // Blog post doesn't exist in target language, redirect to blog index
            const newPath = `/${newLocale}/blog`;
            router.push(newPath);
          }
        } else {
          // API error, fallback to blog index
          const newPath = `/${newLocale}/blog`;
          router.push(newPath);
        }
      } catch (error) {
        console.error('Error switching blog post language:', error);
        // Network error, fallback to blog index
        const newPath = `/${newLocale}/blog`;
        router.push(newPath);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Not a blog post, use regular path switching
      const newPath = `/${newLocale}${currentPathWithoutLocale === '/' ? '' : currentPathWithoutLocale}`;
      router.push(newPath);
    }
    
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm font-inter"
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-gray-700 font-medium">{currentLanguage.code.toUpperCase()}</span>
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
          role="listbox"
        >
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => switchLanguage(language.code)}
              disabled={isLoading}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                locale === language.code 
                  ? 'text-[#2CA6A4] bg-[#2CA6A4]/5 font-semibold' 
                  : 'text-gray-700'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              role="option"
              aria-selected={locale === language.code}
            >
              <span className="text-lg">{language.flag}</span>
              <div className="flex flex-col items-start">
                <span className="font-medium">{language.name}</span>
                <span className="text-xs text-gray-500">{language.code.toUpperCase()}</span>
              </div>
              {isLoading && locale !== language.code ? (
                <svg className="w-4 h-4 text-[#2CA6A4] ml-auto animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : locale === language.code && (
                <svg className="w-4 h-4 text-[#2CA6A4] ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;