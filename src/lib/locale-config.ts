/**
 * Locale Configuration Utilities
 * Centralized locale handling for the Sanovias website
 * 
 * To add a new locale:
 * 1. Add it to LOCALE_CONFIGURATIONS
 * 2. Update the languages array in LanguageSwitcher.tsx
 * 3. Add translation files if using i18n
 */

interface LocaleConfig {
  code: string;           // App locale code (en, de, fr, etc.)
  contentful: string;     // Contentful locale format
  name: string;           // Display name
  nativeName: string;     // Native language name
  flag: string;           // Flag emoji
}

export const LOCALE_CONFIGURATIONS: LocaleConfig[] = [
  {
    code: 'en',
    contentful: 'en-US',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
  },
  {
    code: 'de',
    contentful: 'de-DE',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
  },
  // Future locales can be added here:
  // {
  //   code: 'fr',
  //   contentful: 'fr-FR',
  //   name: 'French',
  //   nativeName: 'Français',
  //   flag: '🇫🇷',
  // },
  // {
  //   code: 'es',
  //   contentful: 'es-ES',
  //   name: 'Spanish',
  //   nativeName: 'Español',
  //   flag: '🇪🇸',
  // },
  // {
  //   code: 'it',
  //   contentful: 'it-IT',
  //   name: 'Italian',
  //   nativeName: 'Italiano',
  //   flag: '🇮🇹',
  // },
];

// Derived constants for backward compatibility and performance
export const SUPPORTED_LOCALES = LOCALE_CONFIGURATIONS.map(config => config.code);
export type SupportedLocale = string;

export const LOCALE_MAPPINGS = Object.fromEntries(
  LOCALE_CONFIGURATIONS.map(config => [config.code, config.contentful])
) as Record<string, string>;

export const LOCALE_NAMES = Object.fromEntries(
  LOCALE_CONFIGURATIONS.map(config => [config.code, config.name])
) as Record<string, string>;

/**
 * Check if a locale is supported
 */
export function isLocaleSupported(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

/**
 * Get Contentful locale format from app locale
 */
export function getContentfulLocale(locale: string): string {
  if (!isLocaleSupported(locale)) {
    return LOCALE_MAPPINGS.en; // Default fallback
  }
  return LOCALE_MAPPINGS[locale];
}

/**
 * Get app locale from Contentful locale format
 */
export function getAppLocale(contentfulLocale: string): SupportedLocale {
  const entry = Object.entries(LOCALE_MAPPINGS).find(([, value]) => value === contentfulLocale);
  return (entry?.[0] as SupportedLocale) || 'en';
}

/**
 * Get locale configuration by code
 */
export function getLocaleConfig(localeCode: string): LocaleConfig | undefined {
  return LOCALE_CONFIGURATIONS.find(config => config.code === localeCode);
}

/**
 * Get all available locales for language switcher
 */
export function getAllLocales(): LocaleConfig[] {
  return LOCALE_CONFIGURATIONS;
}

/**
 * Get default locale (first in configuration)
 */
export function getDefaultLocale(): string {
  return LOCALE_CONFIGURATIONS[0]?.code || 'en';
}

/**
 * Get the next locale in the list (for simple toggle)
 * Useful for 2-language setups, cycles through all for multi-language
 */
export function getNextLocale(currentLocale: string): SupportedLocale {
  const currentIndex = LOCALE_CONFIGURATIONS.findIndex(config => config.code === currentLocale);
  const nextIndex = (currentIndex + 1) % LOCALE_CONFIGURATIONS.length;
  return LOCALE_CONFIGURATIONS[nextIndex]?.code || getDefaultLocale();
}

/**
 * Get supported locale codes as array
 */
export function getSupportedLocaleCodes(): string[] {
  return LOCALE_CONFIGURATIONS.map(config => config.code);
}