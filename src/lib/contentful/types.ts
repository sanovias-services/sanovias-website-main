import { Document } from '@contentful/rich-text-types';
import { Asset, Entry, EntrySkeletonType } from 'contentful';

// Contentful Asset interface extension
export interface ContentfulAsset extends Asset {
  fields: {
    title: string;
    description?: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

// Content Type Skeletons for new Contentful SDK
export interface IBlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'blogPost';
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    content: Document;
    featuredImage: ContentfulAsset;
    category: Entry<ICategorySkeleton>;
    author: Entry<IAuthorSkeleton>;
    publishDate: string;
    tags?: string[];
    metaTitle?: string;
    metaDescription?: string;
    featured?: boolean;
    status: 'draft' | 'published';
    readingTime: number;
  };
}

export interface ICategorySkeleton extends EntrySkeletonType {
  contentTypeId: 'category';
  fields: {
    name: string;
    slug: string;
    description?: string;
    color: string;
    icon?: string;
  };
}

export interface IAuthorSkeleton extends EntrySkeletonType {
  contentTypeId: 'author';
  fields: {
    name: string;
    title: string;
    bio: Document;
    avatar: ContentfulAsset;
    specialties?: string[];
    credentials?: string[];
    linkedinUrl?: string;
    websiteUrl?: string;
  };
}

// Type aliases for easier use
export type BlogPost = Entry<IBlogPostSkeleton>;
export type Category = Entry<ICategorySkeleton>;
export type Author = Entry<IAuthorSkeleton>;

// Legacy field types for backward compatibility
export type IBlogPostFields = IBlogPostSkeleton['fields'];
export type ICategoryFields = ICategorySkeleton['fields'];
export type IAuthorFields = IAuthorSkeleton['fields'];

// API Response types
export interface BlogPostsResponse {
  items: BlogPost[];
  total: number;
  skip: number;
  limit: number;
}

export interface CategoriesResponse {
  items: Category[];
  total: number;
}