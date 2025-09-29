/**
 * Contentful utility functions for consistent data handling across the app
 */

// Simple interface for Contentful entries
export interface ContentfulEntry {
  sys: { id: string };
  fields: Record<string, unknown>;
}

/**
 * Safely extract field values from Contentful entries
 * Handles both simple strings and localized content
 */
export function getFieldValue(entry: unknown, field: string, locale?: string): string {
  if (!entry || typeof entry !== 'object' || !('fields' in entry) || !entry.fields) {
    return '';
  }
  
  const fields = entry.fields as Record<string, unknown>;
  const fieldValue = fields[field];
  
  // Handle simple string values
  if (typeof fieldValue === 'string') {
    return fieldValue;
  }
  
  // Handle localized content objects
  if (fieldValue && typeof fieldValue === 'object') {
    if (locale && locale in fieldValue) {
      const localeValue = (fieldValue as Record<string, unknown>)[locale];
      if (typeof localeValue === 'string') {
        return localeValue;
      }
    }
    
    // Fallback to any available locale
    const availableValues = Object.values(fieldValue as Record<string, unknown>);
    const firstStringValue = availableValues.find(val => typeof val === 'string');
    if (typeof firstStringValue === 'string') {
      return firstStringValue;
    }
  }
  
  return '';
}

/**
 * Extract image URL from Contentful asset
 * Returns empty string if no valid image URL found
 */
export function getImageUrl(entry: unknown, field: string): string {
  if (!entry || typeof entry !== 'object' || !('fields' in entry) || !entry.fields) {
    return '';
  }
  
  const fields = entry.fields as Record<string, unknown>;
  const image = fields[field];
  
  if (image && 
      typeof image === 'object' && 
      'fields' in image &&
      image.fields &&
      typeof image.fields === 'object' &&
      'file' in image.fields &&
      image.fields.file &&
      typeof image.fields.file === 'object' &&
      'url' in image.fields.file &&
      typeof image.fields.file.url === 'string') {
    return `https:${image.fields.file.url}`;
  }
  
  return '';
}

/**
 * Extract image URL from direct Contentful asset (for blog listing)
 */
export function getDirectImageUrl(image: unknown): string {
  if (image && 
      typeof image === 'object' && 
      'fields' in image &&
      image.fields &&
      typeof image.fields === 'object' &&
      'file' in image.fields &&
      image.fields.file &&
      typeof image.fields.file === 'object' &&
      'url' in image.fields.file &&
      typeof image.fields.file.url === 'string') {
    return `https:${image.fields.file.url}`;
  }
  return '';
}

/**
 * Format date for display based on locale
 */
export function formatPublishDate(dateString: string, locale: string): string {
  if (!dateString) return '';
  
  return new Date(dateString).toLocaleDateString(
    locale === 'de' ? 'de-DE' : 'en-US',
    { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
  );
}

/**
 * Get localized content from Contentful rich text or other localized fields
 */
export function getLocalizedContent(field: unknown, locale: string): unknown {
  if (!field || typeof field !== 'object') return field;
  
  const contentfulLocale = locale === 'de' ? 'de-DE' : 'en-US';
  
  if (contentfulLocale in field) {
    return (field as Record<string, unknown>)[contentfulLocale];
  }
  
  return field;
}