// Simple Blog Post Model
export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  status: 'draft' | 'published';
  featuredImage?: string;
  tags: string[];
  category: string;
  subcategory?: string;
  readTime?: string;
  featured?: boolean;
  views?: number;
  likes?: number;
  shares?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
}

export interface BlogPostWithId extends BlogPost {
  id: string;
}

// Simple validation functions
export const validateBlogPost = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (!data.slug || data.slug.trim().length === 0) {
    errors.push('Slug is required');
  }

  if (!data.content || data.content.trim().length === 0) {
    errors.push('Content is required');
  }

  if (!data.author || data.author.trim().length === 0) {
    errors.push('Author is required');
  }

  if (!data.status || !['draft', 'published'].includes(data.status)) {
    errors.push('Status must be either "draft" or "published"');
  }

  if (!data.category || data.category.trim().length === 0) {
    errors.push('Category is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Utility functions
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-+|-+$/g, '');
};

export const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
}; 