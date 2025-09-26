'use client';

import { useParams } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

// Locale context
const LocaleContext = createContext<string>('en');

export function LocaleProvider({ children, initialLocale }: { children: React.ReactNode; initialLocale: string }) {
  const params = useParams();
  const [locale, setLocale] = useState(initialLocale);
  
  useEffect(() => {
    if (params?.locale && typeof params.locale === 'string') {
      setLocale(params.locale);
    }
  }, [params?.locale]);

  // Set the document lang attribute
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return (
    <LocaleContext.Provider value={locale}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}