import { apiService, PaginatedResponse } from './apiService';

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  status: 'draft' | 'published';
  featuredImage?: string;
  tags: string[];
  category?: string;
  subcategory?: string;
  readTime?: string;
  featured?: boolean;
  views?: number;
  likes?: number;
  shares?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  name: string;
  count: number;
  slug?: string;
  icon?: string;
}

export interface BlogData {
  posts: BlogPost[];
  categories: Category[];
  tags: string[];
}

class BlogService {
  // Normalize blog post data to handle both old and new structures
  private normalizeBlogPost(post: any): BlogPost {
    // Helper function to convert date strings to Date objects
    const convertToDate = (dateValue: any): Date | undefined => {
      if (!dateValue) return undefined;
      if (dateValue instanceof Date) return dateValue;
      if (typeof dateValue === 'string') {
        const parsed = new Date(dateValue);
        return isNaN(parsed.getTime()) ? undefined : parsed;
      }
      // Handle Firestore timestamp objects
      if (dateValue && typeof dateValue === 'object') {
        if (dateValue.toDate && typeof dateValue.toDate === 'function') {
          return dateValue.toDate();
        }
        if (dateValue._seconds) {
          return new Date(dateValue._seconds * 1000);
        }
        if (dateValue.seconds) {
          return new Date(dateValue.seconds * 1000);
        }
      }
      return undefined;
    };

    // Helper function to normalize numeric values
    const normalizeNumber = (value: any, defaultValue: number = 0): number => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string') {
        const parsed = parseInt(value, 10);
        return isNaN(parsed) ? defaultValue : parsed;
      }
      return defaultValue;
    };

    return {
      id: post.id || '',
      title: post.title || 'Untitled',
      slug: post.slug || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      author: post.author || 'Unknown',
      status: post.status || 'draft',
      featuredImage: post.featuredImage,
      tags: Array.isArray(post.tags) ? post.tags : [],
      category: post.category || 'Uncategorized',
      subcategory: post.subcategory,
      readTime: post.readTime,
      featured: Boolean(post.featured),
      // Handle both old (meta object) and new (direct properties) structures
      views: normalizeNumber(post.views || post.meta?.views),
      likes: normalizeNumber(post.likes || post.meta?.likes),
      shares: normalizeNumber(post.shares || post.meta?.shares),
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      seoKeywords: Array.isArray(post.seoKeywords) ? post.seoKeywords : [],
      publishedAt: convertToDate(post.publishedAt),
      createdAt: convertToDate(post.createdAt),
      updatedAt: convertToDate(post.updatedAt)
    };
  }

  // Normalize array of blog posts
  private normalizeBlogPosts(posts: any[]): BlogPost[] {
    return posts.map(post => this.normalizeBlogPost(post));
  }

  // Create a new blog post
  async createPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const post = await apiService.createBlogPost(postData);
      return post.id || '';
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  // Get all blog posts
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      const response = await apiService.getBlogPosts();
      return this.normalizeBlogPosts(response.posts);
    } catch (error) {
      console.error('Error getting posts:', error);
      throw error;
    }
  }

  // Get published posts only
  async getPublishedPosts(): Promise<BlogPost[]> {
    try {
      const response = await apiService.getPublishedPosts();
      return this.normalizeBlogPosts(response.posts);
    } catch (error) {
      console.error('Error getting published posts:', error);
      throw error;
    }
  }

  // Get a single post by ID
  async getPostById(id: string): Promise<BlogPost | null> {
    try {
      const post = await apiService.getBlogPostById(id);
      return this.normalizeBlogPost(post);
    } catch (error) {
      console.error('Error getting post:', error);
      // If post not found, return null instead of throwing
      if (error instanceof Error && (error.message.includes('not found') || error.message.includes('404'))) {
        return null;
      }
      throw error;
    }
  }

  // Get a single post by slug
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const post = await apiService.getBlogPostBySlug(slug);
      return this.normalizeBlogPost(post);
    } catch (error) {
      console.error('Error getting post by slug:', error);
      // If post not found, return null instead of throwing
      if (error instanceof Error && (error.message.includes('not found') || error.message.includes('404'))) {
        return null;
      }
      throw error;
    }
  }

  // Update a blog post
  async updatePost(id: string, postData: Partial<BlogPost>): Promise<void> {
    try {
      await apiService.updateBlogPost(id, postData);
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  }

  // Delete a blog post
  async deletePost(id: string): Promise<void> {
    try {
      await apiService.deleteBlogPost(id);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }

  // Get posts by status
  async getPostsByStatus(status: 'draft' | 'published'): Promise<BlogPost[]> {
    try {
      const response = await apiService.getBlogPosts({ status });
      return this.normalizeBlogPosts(response.posts);
    } catch (error) {
      console.error('Error getting posts by status:', error);
      throw error;
    }
  }

  // Get featured posts
  async getFeaturedPosts(): Promise<BlogPost[]> {
    try {
      const posts = await apiService.getFeaturedPosts();
      return this.normalizeBlogPosts(posts);
    } catch (error) {
      console.error('Error getting featured posts:', error);
      throw error;
    }
  }

  // Get posts by category
  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    try {
      const response = await apiService.getPostsByCategory(category);
      return this.normalizeBlogPosts(response.posts);
    } catch (error) {
      console.error('Error getting posts by category:', error);
      throw error;
    }
  }

  // Get posts by search query
  async getPostsBySearch(query: string): Promise<BlogPost[]> {
    try {
      const posts = await apiService.searchBlogPosts(query);
      return this.normalizeBlogPosts(posts);
    } catch (error) {
      console.error('Error searching posts:', error);
      throw error;
    }
  }

  // Get popular posts
  async getPopularPosts(limitCount: number = 5): Promise<BlogPost[]> {
    try {
      const posts = await apiService.getPopularPosts(limitCount);
      return this.normalizeBlogPosts(posts);
    } catch (error) {
      console.error('Error getting popular posts:', error);
      throw error;
    }
  }

  // Get all categories
  async getCategories(): Promise<Category[]> {
    try {
      const categories = await apiService.getCategories();
      
      // Add "All" category at the beginning
      const allCategory: Category = {
        name: 'All',
        count: 0, // This will be calculated below
      };

      // Get total count of published posts for "All" category
      try {
        const publishedPosts = await this.getPublishedPosts();
        allCategory.count = publishedPosts.length;
      } catch (error) {
        console.warn('Could not get post count for "All" category:', error);
      }

      return [allCategory, ...categories];
    } catch (error) {
      console.error('Error getting categories:', error);
      throw error;
    }
  }

  // Get all tags
  async getTags(): Promise<string[]> {
    try {
      return await apiService.getTags();
    } catch (error) {
      console.error('Error getting tags:', error);
      throw error;
    }
  }

  // Like a blog post
  async likePost(id: string): Promise<void> {
    try {
      await apiService.likeBlogPost(id);
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  }

  // Get posts with pagination
  async getPostsWithPagination(params: {
    status?: 'draft' | 'published';
    category?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
  } = {}): Promise<PaginatedResponse<BlogPost>> {
    try {
      const response = await apiService.getBlogPosts(params);
      return {
        ...response,
        posts: this.normalizeBlogPosts(response.posts)
      };
    } catch (error) {
      console.error('Error getting posts with pagination:', error);
      throw error;
    }
  }

  // Format date - Improved to handle various date formats
  formatDate(date: Date | string | any): string {
    try {
      let dateObj: Date;
      
      // Handle different date formats
      if (date instanceof Date) {
        dateObj = date;
      } else if (typeof date === 'string') {
        dateObj = new Date(date);
      } else if (date && typeof date === 'object') {
        if (date.toDate && typeof date.toDate === 'function') {
          // Handle Firestore timestamp
          dateObj = date.toDate();
        } else if (date._seconds) {
          // Handle Firestore timestamp with _seconds
          dateObj = new Date(date._seconds * 1000);
        } else if (date.seconds) {
          // Handle Firestore timestamp with seconds
          dateObj = new Date(date.seconds * 1000);
        } else {
          // Try to convert to Date
          dateObj = new Date(date);
        }
      } else {
        // Fallback to current date
        dateObj = new Date();
      }
      
      // Check if the date is valid
      if (isNaN(dateObj.getTime())) {
        return 'Invalid date';
      }
      
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error, date);
      return 'Unknown date';
    }
  }

  // Get reading time estimate
  getReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  }

  // Generate slug from title
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Validate blog post data
  validateBlogPost(postData: Partial<BlogPost>): { isValid: boolean; errors: string[] } {
    return apiService.validateBlogPost(postData);
  }

  // Health check
  async healthCheck(): Promise<{ message: string; timestamp: string }> {
    try {
      return await apiService.healthCheck();
    } catch (error) {
      console.error('Error checking API health:', error);
      throw error;
    }
  }
}

export const blogService = new BlogService(); 