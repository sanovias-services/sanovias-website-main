# Sanovias Healthcare Website

> A comprehensive healthcare platform built with Next.js 15, featuring multilingual content management, rich media support, and seamless internationalization.

## 🏗️ **Architecture Overview**

### **Framework Foundation**
- **Next.js 15** with App Router architecture
- **TypeScript** for type safety and developer experience
- **React 18** with Server Components and Suspense
- **Tailwind CSS** for utility-first styling
- **Contentful CMS** for headless content management

### **Core Systems**

#### **1. Internationalization (i18n)**
```
📁 Locale System
├── /src/lib/locale-config.ts          # Centralized locale configuration
├── /src/app/[locale]/                 # Dynamic locale routing
├── /src/app/api/blog/slug-switch/     # Blog translation API
└── Components with dynamic locale support
```

**Features:**
- **Dynamic Locale Configuration**: Add new languages without code changes
- **Blog-Aware Language Switching**: Intelligent slug resolution across languages
- **Contentful Integration**: Seamless multilingual content delivery
- **SEO Optimized**: Proper locale routing and metadata

#### **2. Content Management**
```
📁 Contentful Integration
├── /src/lib/contentful/               # CMS API layer
│   ├── api.ts                        # Core API functions
│   ├── client.ts                     # Contentful client setup
│   ├── types.ts                      # TypeScript definitions
│   ├── utils.ts                      # Shared utility functions
│   ├── preview-server.ts             # Server-side preview utilities
│   └── preview.ts                    # Client-side preview utilities
├── Rich Text Rendering               # Comprehensive content display
└── Dynamic Content Types            # Blog posts, pages, media
```

**Capabilities:**
- **Rich Text Rendering**: Support for all Contentful node types
- **Media Management**: Images, videos, PDFs, galleries
- **Interactive Content**: Accordions, CTAs, embedded components
- **Performance Optimized**: Lazy loading, image optimization

#### **3. Application Structure**
```
📁 Next.js App Router
├── /src/app/                         # App Router root
│   ├── [locale]/                     # Internationalized routes
│   │   ├── layout.tsx               # Locale-specific layout
│   │   ├── page.tsx                 # Homepage
│   │   ├── blog/                    # Blog system
│   │   ├── about/                   # About pages
│   │   ├── services/                # Service pages
│   │   ├── contact/                 # Contact forms
│   │   └── components/              # Shared UI components
│   └── api/                         # API routes
│       ├── contact/                 # Contact form handler
│       └── blog/                    # Blog-related APIs
```

### **Component Architecture**

#### **Server Components (Default)**
- **Purpose**: Data fetching, SEO, performance
- **Location**: Pages, layouts, data-heavy components
- **Benefits**: Zero client-side JavaScript, better SEO, faster initial load

#### **Client Components ("use client")**
- **Purpose**: Interactivity, state management, browser APIs
- **Location**: Forms, language switcher, interactive elements
- **Benefits**: Rich user interactions, real-time updates

#### **Hybrid Approach**
```typescript
// Server Component (data fetching)
async function BlogPage({ params }: { params: { locale: string, slug: string } }) {
  const post = await getBlogPost(params.slug, params.locale);
  
  return (
    <article>
      <BlogHeader post={post} />
      <RichTextRenderer content={post.content} />  {/* Server */}
      <LanguageSwitcher currentLocale={params.locale} /> {/* Client */}
    </article>
  );
}
```

## 🛠️ **Configuration Files**

### **Core Configuration**
- **`package.json`**: Dependencies, scripts, and project metadata
- **`next.config.ts`**: Next.js customization (redirects, images, i18n)
- **`tsconfig.json`**: TypeScript compiler configuration
- **`eslint.config.mjs`**: Code quality and style rules
- **`postcss.config.mjs`**: CSS processing pipeline
- **`tailwind.config.ts`**: Utility-first CSS framework setup

### **Environment Configuration**
```bash
# .env.local (not in repo)
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_PREVIEW_SECRET=your_secret_key_for_preview
```

## 🚀 **Development Workflow**

### **Getting Started**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
http://localhost:3000
```

### **Available Scripts**
```bash
npm run dev      # Development server with hot reload
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
npm run type-check # TypeScript type checking
```

### **Development Features**
- **Hot Reload**: Instant updates during development
- **TypeScript**: Real-time type checking
- **ESLint**: Code quality enforcement
- **Turbopack**: Ultra-fast bundler (Next.js 15)

## 🎨 **Design System Integration**

### **Sanovias Brand Colors**
```css
/* Primary Palette */
--turquoise: #2CA6A4;      /* Primary actions, links */
--navy: #1C3C47;           /* Headings, emphasis */
--gold: #C9A66B;           /* Accents, highlights */
--sand: #F7F5F2;           /* Background sections */

/* Text Colors */
--charcoal: #1F2937;       /* Primary text */
--cool-gray: #6B7280;      /* Secondary text */
--mist-gray: #E6E8EA;      /* Subtle elements */
```

### **Typography System**
```css
/* Headings - Playfair Display */
.font-playfair {
  font-family: 'Playfair Display', serif;
  font-weight: 400, 600, 700;
}

/* Body Text - Inter */
.font-inter {
  font-family: 'Inter', sans-serif;
  font-weight: 300, 400, 500, 600;
}
```

## 📱 **Responsive Design**

### **Breakpoint System**
```css
/* Tailwind CSS Breakpoints */
sm: 640px    /* Mobile landscape */
md: 768px    /* Tablet */
lg: 1024px   /* Desktop */
xl: 1280px   /* Large desktop */
2xl: 1536px  /* Extra large */
```

### **Mobile-First Approach**
- **Base styles**: Mobile (320px+)
- **Progressive enhancement**: Larger screens
- **Touch-friendly**: 44px minimum touch targets
- **Performance**: Optimized images and lazy loading

## 🌐 **Internationalization**

### **Supported Locales**
```typescript
// Current Configuration
en: English (Primary)
de: German (Deutsch)

// Easy Addition Process
// 1. Add to locale-config.ts
// 2. Configure in Contentful
// 3. Deploy - No code changes needed
```

### **Locale Features**
- **Dynamic Language Switching**: Intelligent blog post translation
- **SEO Optimization**: Proper hreflang and metadata
- **Content Fallbacks**: Graceful handling of missing translations
- **URL Structure**: `/en/page` and `/de/seite` patterns

## 📊 **Content Management**

### **Contentful Integration**
```typescript
// Content Types
BlogPost: Rich articles with media
Page: Static pages (About, Services)
Author: Team member profiles
Media: Images, videos, documents
Navigation: Dynamic menu structure
```

### **Rich Text Capabilities**
- **Text Formatting**: Bold, italic, links, lists
- **Media Embedding**: Images, videos, PDFs
- **Interactive Elements**: Accordions, CTAs, galleries
- **Code Blocks**: Syntax highlighting ready
- **Custom Components**: Service cards, team profiles

### **Preview Mode & Draft Support**
- **Draft Content**: View unpublished content in preview mode
- **Content Editor Integration**: Direct preview from Contentful
- **Status Indicators**: Visual draft badges and warnings
- **Secure Access**: Token-based preview authentication
- **Cross-Language Support**: Preview drafts in all locales

## 🔍 **Preview Mode System**

### **How It Works**
1. **Contentful Integration**: Content editors can preview drafts directly from Contentful
2. **Secure Authentication**: Token-based system prevents unauthorized access
3. **Visual Indicators**: Draft content is clearly marked with warning banners
4. **Cross-Language Support**: Preview works across all supported locales

### **Preview URL Format**
```
/api/blog/preview?secret=YOUR_SECRET&slug=blog-post-slug&locale=en&contentType=blogPost
```

### **Contentful Configuration**
In your Contentful space settings, configure the preview URL as:
```
https://your-domain.com/api/blog/preview?secret=YOUR_SECRET&slug={entry.fields.slug}&locale=en
```

### **Environment Variables**
```bash
CONTENTFUL_PREVIEW_SECRET=your_secure_secret_key
```

### **Features**
- **Draft Visualization**: Unpublished content with clear draft indicators
- **Exit Preview**: Easy preview mode exit with banner controls
- **Debug Information**: Detailed preview status for content editors
- **Error Handling**: Graceful fallbacks for missing or invalid content
- **Security**: Secret token validation and secure cookie management

## 🔒 **Security & Performance**

### **Security Features**
- **Type Safety**: Full TypeScript coverage
- **Environment Variables**: Secure API key management
- **Content Validation**: Contentful schema enforcement
- **HTTPS**: SSL/TLS encryption (production)

### **Performance Optimizations**
- **Server Components**: Reduced client-side JavaScript
- **Image Optimization**: Next.js automatic optimization
- **Lazy Loading**: Progressive content loading
- **Caching**: Efficient data fetching and storage
- **Bundle Splitting**: Optimized code delivery

## 🧪 **Testing Strategy**

### **Quality Assurance**
- **TypeScript**: Compile-time error catching
- **ESLint**: Code quality enforcement
- **Browser Testing**: Cross-browser compatibility
- **Responsive Testing**: Multi-device validation
- **Performance Monitoring**: Core Web Vitals tracking

### **Content Validation**
- **Rich Text Rendering**: All Contentful node types
- **Language Switching**: Cross-locale navigation
- **Media Loading**: Images, videos, documents
- **Interactive Elements**: Forms, accordions, CTAs

## 🚀 **Deployment**

### **Production Environments**
```bash
# Vercel (Recommended)
- Automatic deployments from Git
- Global CDN distribution
- Serverless functions
- Preview deployments

# Alternative Platforms
- AWS Amplify
- Netlify
- Digital Ocean
- Traditional VPS
```

### **Build Process**
```bash
npm run build    # Creates optimized production build
npm run start    # Starts production server
```

### **Environment Setup**
```bash
# Production Environment Variables
CONTENTFUL_SPACE_ID=production_space
CONTENTFUL_ACCESS_TOKEN=production_token
NEXT_PUBLIC_SITE_URL=https://sanovias.com
```

## 📈 **Analytics & Monitoring**

### **Performance Tracking**
- **Core Web Vitals**: LCP, FID, CLS monitoring
- **User Experience**: Page load times, interaction metrics
- **Content Performance**: Blog engagement, conversion tracking
- **Error Monitoring**: Runtime error tracking and alerts

### **SEO Optimization**
- **Meta Tags**: Dynamic title, description, keywords
- **Structured Data**: JSON-LD for rich snippets
- **Sitemap**: Automatic generation for all locales
- **Robots.txt**: Search engine indexing control

## 🔄 **Development Best Practices**

### **Code Organization**
```
📁 Clean Architecture
├── Components: Reusable UI elements
├── Utilities: Helper functions and constants
├── Types: TypeScript definitions
├── API: External service integrations
└── Styles: Global CSS and Tailwind extensions
```

### **Naming Conventions**
- **Files**: kebab-case for folders, PascalCase for components
- **Variables**: camelCase for variables, UPPER_CASE for constants
- **Functions**: Descriptive names with clear purpose
- **Components**: PascalCase with descriptive naming

### **Git Workflow**
- **Feature Branches**: Isolated development
- **Descriptive Commits**: Clear commit messages
- **Code Reviews**: Quality assurance process
- **Automated Testing**: CI/CD pipeline integration

## 📚 **Learning Resources**

### **Next.js Framework**
- [Next.js Documentation](https://nextjs.org/docs) - Official framework guide
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) - Server-side rendering
- [App Router](https://nextjs.org/docs/app) - Modern routing system

### **Development Tools**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Type system mastery
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first styling
- [Contentful CMS](https://www.contentful.com/developers/docs/) - Headless content management

---

## 🤝 **Contributing**

This project follows modern web development standards and practices. When contributing:

1. **Follow TypeScript**: Maintain type safety
2. **Use Server Components**: Default to server-side rendering
3. **Responsive Design**: Mobile-first approach
4. **Performance**: Optimize images and lazy load content
5. **Accessibility**: Ensure WCAG compliance
6. **Internationalization**: Support all configured locales

**Happy Coding!** 🎉

# Vendor Docu
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
