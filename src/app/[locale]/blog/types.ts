// Blog content types and interfaces for Sanovias Medical Tourism

export interface BlogPost {
  id: string;
  title: {
    en: string;
    de: string;
  };
  slug: {
    en: string;
    de: string;
  };
  excerpt: {
    en: string;
    de: string;
  };
  content: {
    en: string;
    de: string;
  };
  category: BlogCategory;
  author: Author;
  publishDate: string;
  lastModified: string;
  featuredImage: {
    url: string;
    alt: {
      en: string;
      de: string;
    };
    width: number;
    height: number;
  };
  tags: string[];
  metaDescription: {
    en: string;
    de: string;
  };
  readingTime: number; // in minutes
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
}

export interface Author {
  id: string;
  name: string;
  title: {
    en: string;
    de: string;
  };
  bio: {
    en: string;
    de: string;
  };
  avatar: string;
  linkedin?: string;
  specialties: string[];
}

export interface BlogCategory {
  id: string;
  name: {
    en: string;
    de: string;
  };
  slug: {
    en: string;
    de: string;
  };
  description: {
    en: string;
    de: string;
  };
  color: string; // Hex color for category styling
  icon: string; // Icon name or SVG
}

export interface BlogFilters {
  category?: string;
  author?: string;
  tags?: string[];
  dateRange?: {
    from: string;
    to: string;
  };
  featured?: boolean;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
}