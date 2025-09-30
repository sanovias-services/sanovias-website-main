# Adding New Locales to Sanovias Website

## 🌍 **Current Multi-Language Architecture**

The Sanovias website now supports a fully scalable, dynamic locale system. Adding new languages is straightforward and requires no hardcoded changes throughout the codebase.

### **Currently Supported:**
- 🇺🇸 **English** (`en` → `en-US`)
- 🇩🇪 **German** (`de` → `de-DE`)

---

## ➕ **How to Add a New Locale**

### **Step 1: Update Locale Configuration**

Edit `/src/lib/locale-config.ts` and add your new locale to the `LOCALE_CONFIGURATIONS` array:

```typescript
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
  // ADD NEW LOCALES HERE:
  {
    code: 'fr',           // App route code (/fr/...)
    contentful: 'fr-FR',  // Contentful locale format
    name: 'French',       // English name
    nativeName: 'Français', // Native language name
    flag: '🇫🇷',          // Flag emoji
  },
  {
    code: 'es',
    contentful: 'es-ES',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
  },
  // Add more as needed...
];
```

### **Step 2: Configure Contentful**

1. **Go to Contentful Settings → Locales**
2. **Add the new locale** (e.g., `fr-FR` for French)
3. **Set fallback locale** to your default language (usually `en-US`)
4. **Update existing content** to include translations

### **Step 3: Update Translation Files (if using i18n)**

If using internationalization libraries, add translation files:
- `/public/messages/fr.json`
- `/public/messages/es.json`
- etc.

### **Step 4: Test the Implementation**

1. **Visit the website** and check the language switcher
2. **Test blog post switching** between languages
3. **Verify static page routing** works for new locales
4. **Check fallback behaviors** when translations are missing

---

## 🔧 **Technical Implementation Details**

### **Automatic Features (No Code Changes Needed):**

✅ **Language Switcher**: Automatically includes all configured locales  
✅ **Blog Post Routing**: Dynamic slug resolution across all languages  
✅ **Static Page Generation**: Generates routes for all locales  
✅ **API Validation**: Validates all supported locales dynamically  
✅ **Contentful Integration**: Maps app locales to Contentful locales  
✅ **Error Handling**: Provides helpful error messages with supported locales  

### **Components That Auto-Update:**

- **LanguageSwitcher**: Shows all available languages
- **Blog Post Pages**: Generates static params for all locales
- **API Routes**: Validates any supported locale
- **Contentful Queries**: Uses correct locale mappings

### **Dynamic Functions Available:**

```typescript
import { 
  getAllLocales,           // Get all locale configurations
  getLocaleConfig,         // Get specific locale config
  getSupportedLocaleCodes, // Get array of locale codes
  getContentfulLocale,     // Get Contentful format
  isLocaleSupported,       // Validate locale
  getDefaultLocale,        // Get primary locale
  getNextLocale           // Get next locale (for cycling)
} from '@/lib/locale-config';
```

---

## 📝 **Example: Adding French Support**

### **1. Add to Configuration:**
```typescript
{
  code: 'fr',
  contentful: 'fr-FR',
  name: 'French',
  nativeName: 'Français',
  flag: '🇫🇷',
}
```

### **2. Configure Contentful:**
- Add `fr-FR` locale in Contentful
- Set fallback to `en-US`
- Translate blog posts and other content

### **3. Test URLs:**
- Home: `/fr/`
- About: `/fr/about`
- Blog: `/fr/blog`
- Blog Post: `/fr/blog/innovations-medicales`

### **4. Verify Language Switcher:**
- Should show: English, Deutsch, Français
- Should work on all pages including blog posts

---

## 🌟 **Advanced Features**

### **Smart Fallbacks:**
- If French blog post doesn't exist, redirects to `/fr/blog`
- If page doesn't exist in French, can fallback to English
- API gracefully handles missing translations

### **SEO Optimization:**
- Each locale gets proper URL structure
- Static generation for all language combinations
- Proper hreflang attributes (can be added)

### **Performance:**
- Only loads necessary locale data
- Efficient Contentful queries
- Client-side language switching with loading states

---

## 🚨 **Important Notes**

### **Contentful Setup:**
1. **Locale must exist in Contentful** before adding to configuration
2. **Use standard locale codes** (ISO 639-1 + ISO 3166-1)
3. **Set appropriate fallbacks** to prevent content gaps

### **URL Structure:**
- Routes follow pattern: `/{locale}/{page}`
- Blog posts: `/{locale}/blog/{slug}`
- API calls automatically validate all locales

### **Testing Checklist:**
- [ ] Language switcher shows new locale
- [ ] Static pages load correctly
- [ ] Blog posts switch languages properly
- [ ] API validation includes new locale
- [ ] Fallbacks work when translation missing
- [ ] Error messages are helpful

---

## 🎯 **Future Enhancements**

### **Potential Additions:**
- **Auto-detection** based on browser language
- **Remember preference** in localStorage/cookies  
- **RTL support** for Arabic, Hebrew, etc.
- **Currency/date formatting** per locale
- **Dynamic translation loading** for large sites

### **SEO Improvements:**
- **Hreflang tags** for better search engine understanding
- **Sitemap generation** for all locales
- **Structured data** in multiple languages

---

## ✅ **Current Status**

**Fully Scalable**: ✅ Ready for unlimited locales  
**Zero Hardcoding**: ✅ No hardcoded language references  
**Dynamic Validation**: ✅ API validates any supported locale  
**Blog Integration**: ✅ Full blog post language switching  
**Performance**: ✅ Optimized for any number of languages  
**Developer Friendly**: ✅ Single configuration point  

**The system is now completely future-proof for international expansion!** 🌍