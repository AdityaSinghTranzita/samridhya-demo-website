import { BlogPost, Category } from './blogService';
import { getApiConfig, ApiResponse, PaginatedResponse } from '@/config/api';

// API Service Class
class ApiService {
  private baseUrl: string;
  private maxRetries: number = 3;
  private retryDelay: number = 1000; // 1 second
  private config: ReturnType<typeof getApiConfig>;

  constructor() {
    this.config = getApiConfig();
    this.baseUrl = this.config.BASE_URL;
    
    // Handle server-side rendering
    if (typeof window === 'undefined') {
      // We're on the server side
      this.baseUrl = process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL || 'https://api-brz76cmlca-uc.a.run.app';
    }
  }

  // Generic request method with retry logic
  private async makeRequest<T>(
    url: string,
    options: RequestInit,
    retryCount: number = 0
  ): Promise<Response> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...options.headers,
        },
        credentials: 'include', // Include credentials for CORS
      });

      return response;
    } catch (error) {
      // Retry on network errors
      if (retryCount < this.maxRetries && this.isRetryableError(error)) {
        console.warn(`API request failed, retrying... (${retryCount + 1}/${this.maxRetries})`);
        await this.delay(this.retryDelay * Math.pow(2, retryCount)); // Exponential backoff
        return this.makeRequest(url, options, retryCount + 1);
      }
      
      throw error;
    }
  }

  // Check if error is retryable
  private isRetryableError(error: any): boolean {
    return (
      error.name === 'TypeError' ||
      error.message?.includes('Network error') ||
      error.message?.includes('Failed to fetch') ||
      error.message?.includes('CORS') ||
      error.code === 'ECONNREFUSED' ||
      error.code === 'ETIMEDOUT'
    );
  }

  // Delay utility
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Generic GET request method
  private async getRequest<T>(endpoint: string, params: Record<string, any> = {}): Promise<ApiResponse<T>> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
      
      const url = queryParams.toString() 
        ? `${this.baseUrl}${endpoint}?${queryParams.toString()}`
        : `${this.baseUrl}${endpoint}`;
      
      const response = await this.makeRequest(url, {
        method: 'GET',
      });

      // Handle CORS errors
      if (!response.ok && response.status === 0) {
        throw new Error('CORS error: Unable to connect to API. Please check your network connection and CORS configuration.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API GET request failed:', error);
      
      // Provide more helpful error messages
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Network error: Unable to connect to the API server. Please check your internet connection and try again.');
      }
      
      if (error.message?.includes('CORS')) {
        throw new Error('CORS error: The API server is not configured to accept requests from this origin. Please contact the administrator.');
      }
      
      throw error;
    }
  }

  // Generic POST/PUT/DELETE request method
  private async requestWithBody<T>(
    method: 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    body: any = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await this.makeRequest(url, {
        method,
        body: JSON.stringify(body),
      });

      // Handle CORS errors
      if (!response.ok && response.status === 0) {
        throw new Error('CORS error: Unable to connect to API. Please check your network connection and CORS configuration.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API ${method} request failed:`, error);
      
      // Provide more helpful error messages
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Network error: Unable to connect to the API server. Please check your internet connection and try again.');
      }
      
      if (error.message?.includes('CORS')) {
        throw new Error('CORS error: The API server is not configured to accept requests from this origin. Please contact the administrator.');
      }
      
      throw error;
    }
  }

  // ==================== BLOG POSTS API ====================

  // Create a new blog post
  async createBlogPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    const response = await this.requestWithBody<BlogPost>('POST', this.config.ENDPOINTS.CREATE_BLOG_POST, postData);

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create blog post');
    }

    return response.data;
  }

  // Get all blog posts with filtering and pagination
  async getBlogPosts(params: {
    status?: 'draft' | 'published';
    category?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
  } = {}): Promise<PaginatedResponse<BlogPost>> {
    const response = await this.getRequest<PaginatedResponse<BlogPost>>(this.config.ENDPOINTS.GET_BLOG_POSTS, params);

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch blog posts');
    }

    return response.data;
  }

  // Get a single blog post by ID
  async getBlogPostById(id: string): Promise<BlogPost> {
    const response = await this.getRequest<BlogPost>(`${this.config.ENDPOINTS.GET_BLOG_POST_BY_ID}/${id}`);

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch blog post');
    }

    return response.data;
  }

  // Get a single blog post by slug
  async getBlogPostBySlug(slug: string): Promise<BlogPost> {
    // URL encode the slug to handle special characters like &, ?, etc.
    const encodedSlug = encodeURIComponent(slug);
    const response = await this.getRequest<BlogPost>(`${this.config.ENDPOINTS.GET_BLOG_POST_BY_SLUG}/${encodedSlug}`);

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch blog post');
    }

    return response.data;
  }

  // Update a blog post
  async updateBlogPost(id: string, postData: Partial<BlogPost>): Promise<BlogPost> {
    const response = await this.requestWithBody<BlogPost>('PUT', `${this.config.ENDPOINTS.UPDATE_BLOG_POST}/${id}`, postData);

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update blog post');
    }

    return response.data;
  }

  // Delete a blog post
  async deleteBlogPost(id: string): Promise<void> {
    const response = await this.requestWithBody<void>('DELETE', `${this.config.ENDPOINTS.DELETE_BLOG_POST}/${id}`);

    if (!response.success) {
      throw new Error(response.error || 'Failed to delete blog post');
    }
  }

  // Search blog posts
  async searchBlogPosts(query: string, limit: number = 10): Promise<BlogPost[]> {
    const response = await this.getRequest<BlogPost[]>(this.config.ENDPOINTS.SEARCH_BLOG_POSTS, {
      q: query,
      limit: String(limit),
    });

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to search blog posts');
    }

    return response.data;
  }

  // ==================== CATEGORIES & TAGS API ====================

  // Get all categories
  async getCategories(): Promise<Category[]> {
    const response = await this.getRequest<Category[]>(this.config.ENDPOINTS.GET_CATEGORIES);

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch categories');
    }

    return response.data;
  }

  // Get all tags
  async getTags(): Promise<string[]> {
    const response = await this.getRequest<string[]>(this.config.ENDPOINTS.GET_TAGS);

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch tags');
    }

    return response.data;
  }

  // ==================== ANALYTICS & INTERACTIONS ====================

  // Like a blog post
  async likeBlogPost(id: string): Promise<void> {
    const response = await this.requestWithBody<void>('POST', `${this.config.ENDPOINTS.LIKE_BLOG_POST}/${id}/like`);

    if (!response.success) {
      throw new Error(response.error || 'Failed to like blog post');
    }
  }

  // ==================== CONVENIENCE METHODS ====================

  // Get published posts (convenience method)
  async getPublishedPosts(limit: number = 10, offset: number = 0): Promise<PaginatedResponse<BlogPost>> {
    return this.getBlogPosts({
      status: 'published',
      limit,
      offset,
    });
  }

  // Get draft posts (convenience method)
  async getDraftPosts(limit: number = 10, offset: number = 0): Promise<PaginatedResponse<BlogPost>> {
    return this.getBlogPosts({
      status: 'draft',
      limit,
      offset,
    });
  }

  // Get featured posts (convenience method)
  async getFeaturedPosts(limit: number = 5): Promise<BlogPost[]> {
    const response = await this.getRequest<BlogPost[]>(this.config.ENDPOINTS.GET_FEATURED_POSTS, { 
      limit: String(limit) 
    });

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch featured posts');
    }

    return response.data;
  }

  // Get popular posts (convenience method)
  async getPopularPosts(limit: number = 5): Promise<BlogPost[]> {
    const response = await this.getRequest<BlogPost[]>(this.config.ENDPOINTS.GET_POPULAR_POSTS, { 
      limit: String(limit) 
    });

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch popular posts');
    }

    return response.data;
  }

  // Get posts by category (convenience method)
  async getPostsByCategory(category: string, limit: number = 10, offset: number = 0): Promise<PaginatedResponse<BlogPost>> {
    return this.getBlogPosts({
      category,
      limit,
      offset,
    });
  }

  // ==================== HEALTH CHECK ====================

  // Check if API is running
  async healthCheck(): Promise<{ message: string; timestamp: string }> {
    const response = await this.getRequest<{ message: string; timestamp: string }>(this.config.ENDPOINTS.HEALTH_CHECK);

    if (!response.success || !response.data) {
      throw new Error(response.error || 'API health check failed');
    }

    return response.data;
  }

  // ==================== UTILITY METHODS ====================

  // Format date
  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
    const errors: string[] = [];

    if (!postData.title?.trim()) {
      errors.push('Title is required');
    }

    if (!postData.content?.trim()) {
      errors.push('Content is required');
    }

    if (!postData.author?.trim()) {
      errors.push('Author is required');
    }

    if (!postData.status || !['draft', 'published'].includes(postData.status)) {
      errors.push('Status must be either "draft" or "published"');
    }

    if (!postData.category?.trim()) {
      errors.push('Category is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export types for use in other files
export type { ApiResponse, PaginatedResponse }; 