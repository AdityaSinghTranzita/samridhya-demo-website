import { apiService, PaginatedResponse } from './apiService';
import { DateValue } from '@/utils/dateUtils';

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
  publishedAt?: DateValue;
  createdAt?: DateValue;
  updatedAt?: DateValue;
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

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const OFFLINE_CACHE_KEY = 'blog_offline_cache';

class BlogService {
  private cache = new Map<string, { data: any; timestamp: number }>();

  // Cache management
  private getCachedData<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  private setCachedData<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
    
    // Also store in localStorage for offline access (only in browser)
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        const offlineCache = JSON.parse(localStorage.getItem(OFFLINE_CACHE_KEY) || '{}');
        offlineCache[key] = { data, timestamp: Date.now() };
        localStorage.setItem(OFFLINE_CACHE_KEY, JSON.stringify(offlineCache));
      } catch (error) {
        console.warn('Failed to store offline cache:', error);
      }
    }
  }

  private getOfflineCache<T>(key: string): T | null {
    // Only access localStorage in browser environment
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return null;
    }
    
    try {
      const offlineCache = JSON.parse(localStorage.getItem(OFFLINE_CACHE_KEY) || '{}');
      const cached = offlineCache[key];
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION * 12) { // 1 hour for offline cache
        return cached.data;
      }
    } catch (error) {
      console.warn('Failed to read offline cache:', error);
    }
    return null;
  }

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

  // Enhanced API call with caching and offline fallback
  private async apiCallWithCache<T>(
    cacheKey: string,
    apiCall: () => Promise<T>,
    fallbackData?: T
  ): Promise<T> {
    // Check memory cache first
    const cached = this.getCachedData<T>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      // Try API call
      const data = await apiCall();
      this.setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.warn(`API call failed for ${cacheKey}:`, error);
      
      // Check offline cache
      const offlineData = this.getOfflineCache<T>(cacheKey);
      if (offlineData) {
        console.log(`Using offline cache for ${cacheKey}`);
        return offlineData;
      }

      // Use fallback data if provided
      if (fallbackData) {
        console.log(`Using fallback data for ${cacheKey}`);
        return fallbackData;
      }

      throw error;
    }
  }

  // Create a new blog post
  async createPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const post = await apiService.createBlogPost(postData);
      // Clear cache after creating new post
      this.clearCache();
      return post.id || '';
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  // Get all blog posts with caching
  async getAllPosts(): Promise<BlogPost[]> {
    return this.apiCallWithCache(
      'all_posts',
      async () => {
        const response = await apiService.getBlogPosts();
        return this.normalizeBlogPosts(response.posts || []);
      },
      [] // Empty array as fallback
    );
  }

  // Get published posts only with caching
  async getPublishedPosts(): Promise<BlogPost[]> {
    return this.apiCallWithCache(
      'published_posts',
      async () => {
        const response = await apiService.getPublishedPosts();
        return this.normalizeBlogPosts(response.posts || []);
      },
      [] // Empty array as fallback
    );
  }

  // Get a single post by ID with caching
  async getPostById(id: string): Promise<BlogPost | null> {
    return this.apiCallWithCache(
      `post_${id}`,
      async () => {
        try {
          const post = await apiService.getBlogPostById(id);
          return this.normalizeBlogPost(post);
        } catch (error) {
          if (error instanceof Error && (error.message.includes('not found') || error.message.includes('404'))) {
            return null;
          }
          throw error;
        }
      },
      null
    );
  }

  // Get a single post by slug with caching
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    return this.apiCallWithCache(
      `post_slug_${slug}`,
      async () => {
        try {
          const post = await apiService.getBlogPostBySlug(slug);
          return this.normalizeBlogPost(post);
        } catch (error) {
          if (error instanceof Error && (error.message.includes('not found') || error.message.includes('404'))) {
            return null;
          }
          throw error;
        }
      },
      null
    );
  }

  // Update a blog post
  async updatePost(id: string, postData: Partial<BlogPost>): Promise<void> {
    try {
      await apiService.updateBlogPost(id, postData);
      // Clear cache after updating post
      this.clearCache();
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  }

  // Delete a blog post
  async deletePost(id: string): Promise<void> {
    try {
      await apiService.deleteBlogPost(id);
      // Clear cache after deleting post
      this.clearCache();
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }

  // Get posts by status with caching
  async getPostsByStatus(status: 'draft' | 'published'): Promise<BlogPost[]> {
    return this.apiCallWithCache(
      `posts_status_${status}`,
      async () => {
        const response = await apiService.getBlogPosts({ status });
        return this.normalizeBlogPosts(response.posts || []);
      },
      []
    );
  }

  // Get featured posts with caching
  async getFeaturedPosts(): Promise<BlogPost[]> {
    return this.apiCallWithCache(
      'featured_posts',
      async () => {
        const posts = await apiService.getFeaturedPosts();
        return this.normalizeBlogPosts(posts);
      },
      []
    );
  }

  // Get posts by category with caching
  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    return this.apiCallWithCache(
      `posts_category_${category}`,
      async () => {
        const response = await apiService.getPostsByCategory(category);
        return this.normalizeBlogPosts(response.posts || []);
      },
      []
    );
  }

  // Get posts by search query with caching
  async getPostsBySearch(query: string): Promise<BlogPost[]> {
    return this.apiCallWithCache(
      `posts_search_${query}`,
      async () => {
        const posts = await apiService.searchBlogPosts(query);
        return this.normalizeBlogPosts(posts);
      },
      []
    );
  }

  // Get popular posts with caching
  async getPopularPosts(limitCount: number = 5): Promise<BlogPost[]> {
    return this.apiCallWithCache(
      `popular_posts_${limitCount}`,
      async () => {
        const posts = await apiService.getPopularPosts(limitCount);
        return this.normalizeBlogPosts(posts);
      },
      []
    );
  }

  // Get all categories with caching
  async getCategories(): Promise<Category[]> {
    return this.apiCallWithCache(
      'categories',
      async () => {
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
      },
      [{ name: 'All', count: 0 }]
    );
  }

  // Get all tags with caching
  async getTags(): Promise<string[]> {
    return this.apiCallWithCache(
      'tags',
      async () => {
        return await apiService.getTags();
      },
      []
    );
  }

  // Like a blog post
  async likePost(id: string): Promise<void> {
    try {
      await apiService.likeBlogPost(id);
      // Clear cache after liking post
      this.clearCache();
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  }

  // Get posts with pagination with caching
  async getPostsWithPagination(params: {
    status?: 'draft' | 'published';
    category?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
  } = {}): Promise<PaginatedResponse<BlogPost>> {
    const cacheKey = `posts_pagination_${JSON.stringify(params)}`;
    return this.apiCallWithCache(
      cacheKey,
      async () => {
        const response = await apiService.getBlogPosts(params);
        return {
          ...response,
          posts: this.normalizeBlogPosts(response.posts || [])
        };
      },
      { posts: [], total: 0, limit: 10, offset: 0, hasMore: false }
    );
  }

  // Clear all cache
  clearCache(): void {
    this.cache.clear();
    try {
      localStorage.removeItem(OFFLINE_CACHE_KEY);
    } catch (error) {
      console.warn('Failed to clear offline cache:', error);
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

  // Helper method to convert date string back to Date object if needed
  parseDate(dateString: string | null): Date | null {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date;
    } catch (error) {
      console.error('Error parsing date:', error, dateString);
      return null;
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

  // Check if we're online
  isOnline(): boolean {
    return typeof navigator !== 'undefined' && navigator.onLine;
  }

  // Preload critical data for better performance
  async preloadCriticalData(): Promise<void> {
    try {
      // Preload published posts and categories in parallel
      await Promise.all([
        this.getPublishedPosts(),
        this.getCategories(),
        this.getTags()
      ]);
    } catch (error) {
      console.warn('Failed to preload critical data:', error);
    }
  }
}

export const blogService = new BlogService(); 