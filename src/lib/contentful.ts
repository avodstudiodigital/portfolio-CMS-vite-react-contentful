
import { createClient } from 'contentful';

// These values should come from environment variables in production
const CONTENTFUL_SPACE_ID = 'your-space-id';
const CONTENTFUL_ACCESS_TOKEN = 'your-access-token';

// Create a Contentful client
export const contentfulClient = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

// Content type IDs from Contentful
export enum ContentTypes {
  PROJECT = 'project',
  SKILL = 'skill', 
  ABOUT = 'about',
}

// Type definitions for Contentful responses
export interface ProjectFields {
  title: string;
  slug: string;
  description: string;
  content: any;
  featuredImage: any;
  technologiesUsed: string[];
  projectUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  order?: number;
}

export interface SkillFields {
  name: string;
  category: string;
  proficiencyLevel: number;
  icon?: any;
}

export interface AboutFields {
  name: string;
  title: string;
  bio: any;
  profileImage: any;
  email?: string;
  phone?: string;
  location?: string;
  socialLinks?: Record<string, string>;
}

export interface Asset {
  fields: {
    title: string;
    description: string;
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

// Helper function to get asset URL
export function getAssetUrl(asset: any): string {
  if (!asset || !asset.fields || !asset.fields.file) {
    return '';
  }
  
  return `https:${asset.fields.file.url}`;
}

// Fetch all entries of a specific content type
export async function getEntries<T>(contentType: ContentTypes) {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: contentType,
    });
    
    return entries.items as unknown as T[];
  } catch (error) {
    console.error(`Error fetching ${contentType} entries:`, error);
    return [];
  }
}

// Fetch a single entry by its slug
export async function getEntryBySlug<T>(contentType: ContentTypes, slug: string) {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: contentType,
      'fields.slug': slug,
    });
    
    if (entries.items.length === 0) {
      return null;
    }
    
    return entries.items[0] as unknown as T;
  } catch (error) {
    console.error(`Error fetching ${contentType} entry with slug ${slug}:`, error);
    return null;
  }
}

// Fetch about information (typically just one entry)
export async function getAboutInfo() {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: ContentTypes.ABOUT,
      limit: 1,
    });
    
    if (entries.items.length === 0) {
      return null;
    }
    
    return entries.items[0];
  } catch (error) {
    console.error('Error fetching about information:', error);
    return null;
  }
}
