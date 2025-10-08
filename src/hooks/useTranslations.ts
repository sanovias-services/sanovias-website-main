'use client';

import { useLocale } from '../app/[locale]/components/LocaleProvider';
import { useState, useEffect } from 'react';

type Messages = {
  [key: string]: Messages | string;
};

const messagesCache: { [locale: string]: Messages } = {};

export function useTranslations() {
  const locale = useLocale();
  const [messages, setMessages] = useState<Messages>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMessages() {
      if (messagesCache[locale]) {
        setMessages(messagesCache[locale]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/messages/${locale}.json`);
        if (response.ok) {
          const data = await response.json();
          messagesCache[locale] = data;
          setMessages(data);
        } else {
          // Fallback to English if locale file not found
          const fallbackResponse = await fetch('/messages/en.json');
          const fallbackData = await fallbackResponse.json();
          messagesCache[locale] = fallbackData;
          setMessages(fallbackData);
        }
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Use empty object as fallback
        setMessages({});
      } finally {
        setLoading(false);
      }
    }

    loadMessages();
  }, [locale]);

  const t = (key: string, params?: { [key: string]: string | number }) => {
    if (loading) return key; // Return key while loading
    
    const keys = key.split('.');
    let value: Messages | string = messages;
    
    for (const k of keys) {
      if (typeof value === 'object' && value && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    if (typeof value !== 'string') {
      return key;
    }
    
    // Replace parameters in the string
    if (params) {
      return value.replace(/\{(\w+)\}/g, (_match: string, paramKey: string) => {
        return params[paramKey]?.toString() || _match;
      });
    }
    
    return value;
  };

  return { t, loading };
}