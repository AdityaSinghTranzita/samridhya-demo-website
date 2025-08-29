// API Configuration
export const API_CONFIG = {
  // Base URL for Firebase Functions - Standardized fallback
  BASE_URL: process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL || 'https://api-brz76cmlca-uc.a.run.app',
  
  // API Endpoints - Updated to match actual Firebase Functions routes
  ENDPOINTS: {
    // Blog Posts
    CREATE_BLOG_POST: '/api/blog/posts',
    GET_BLOG_POSTS: '/api/blog/posts',
    GET_BLOG_POST_BY_ID: '/api/blog/posts',
    GET_BLOG_POST_BY_SLUG: '/api/blog/posts/slug',
    UPDATE_BLOG_POST: '/api/blog/posts',
    DELETE_BLOG_POST: '/api/blog/posts',
    SEARCH_BLOG_POSTS: '/api/blog/search',
    
    // Categories & Tags
    GET_CATEGORIES: '/api/blog/categories',
    GET_TAGS: '/api/blog/tags',
    
    // Analytics & Interactions
    LIKE_BLOG_POST: '/api/blog/posts',
    
    // Featured and Popular Posts
    GET_FEATURED_POSTS: '/api/blog/featured',
    GET_POPULAR_POSTS: '/api/blog/popular',
    
    // Health Check
    HEALTH_CHECK: '/health',
  },
  
  // Request Configuration
  REQUEST: {
    TIMEOUT: 30000, // 30 seconds
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // 1 second
  },
  
  // Pagination Defaults
  PAGINATION: {
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
    DEFAULT_OFFSET: 0,
  },
  
  // Cache Configuration
  CACHE: {
    ENABLED: true,
    TTL: 5 * 60 * 1000, // 5 minutes
    STALE_WHILE_REVALIDATE: 10 * 60 * 1000, // 10 minutes
  },
  
  // Error Messages
  ERRORS: {
    NETWORK_ERROR: 'Network error occurred. Please check your connection.',
    TIMEOUT_ERROR: 'Request timed out. Please try again.',
    VALIDATION_ERROR: 'Invalid data provided.',
    NOT_FOUND: 'Resource not found.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    SERVER_ERROR: 'Server error occurred. Please try again later.',
  },
  
  // Success Messages
  SUCCESS: {
    POST_CREATED: 'Blog post created successfully.',
    POST_UPDATED: 'Blog post updated successfully.',
    POST_DELETED: 'Blog post deleted successfully.',
    POST_PUBLISHED: 'Blog post published successfully.',
    POST_UNPUBLISHED: 'Blog post unpublished successfully.',
    POST_LIKED: 'Post liked successfully.',
  },
};

// Environment-specific configurations
export const getApiConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    ...API_CONFIG,
    BASE_URL: process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL || 'https://api-brz76cmlca-uc.a.run.app',
    REQUEST: {
      ...API_CONFIG.REQUEST,
      TIMEOUT: isDevelopment ? 60000 : API_CONFIG.REQUEST.TIMEOUT, // Longer timeout in development
    },
    CACHE: {
      ...API_CONFIG.CACHE,
      ENABLED: isProduction, // Disable cache in development for easier debugging
    },
  };
};

// API Response Types - Standardized
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: any;
}

export interface PaginatedResponse<T = any> {
  posts: T[];
  total: number;
  limit?: number;
  offset?: number;
  hasMore?: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// API Request Options
export interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retryAttempts?: number;
  cache?: boolean;
}

// API Query Parameters
export interface BlogPostsQueryParams {
  status?: 'draft' | 'published';
  category?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

export interface SearchQueryParams {
  q: string;
  limit?: number;
  offset?: number;
}

// Export default configuration
export default getApiConfig(); 