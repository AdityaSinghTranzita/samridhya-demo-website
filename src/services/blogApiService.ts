import { apiService } from './apiService';
import { BlogPost, Category } from './blogService';
import { toISOString, toDate } from '@/utils/dateUtils';

// Blog API Service Class for public-facing operations
class BlogApiService {
  // ==================== PUBLIC BLOG OPERATIONS ====================

  // Get all published blog posts
  async getAllPosts(params: {
    category?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  } = {}): Promise<{ posts: BlogPost[]; pagination: any }> {
    try {
      const response = await apiService.getBlogPosts({
        ...params,
        status: 'published' // Only published posts for public
      });
      return {
        posts: response.posts,
        pagination: { total: response.total }
      };
    } catch (error) {
      console.error('Error fetching published posts:', error);
      throw error;
    }
  }

  // Get a single published blog post by ID
  async getPostById(id: string): Promise<BlogPost | null> {
    try {
      const post = await apiService.getBlogPostById(id);
      
      // Only return published posts
      if (post.status !== 'published') {
        return null;
      }
      
      return post;
    } catch (error) {
      console.error('Error fetching post:', error);
      if (error instanceof Error && error.message.includes('not found')) {
        return null;
      }
      throw error;
    }
  }

  // Get a single published blog post by slug
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const post = await apiService.getBlogPostBySlug(slug);
      
      // Only return published posts
      if (post.status !== 'published') {
        return null;
      }
      
      return post;
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      if (error instanceof Error && error.message.includes('not found')) {
        return null;
      }
      throw error;
    }
  }

  // Get featured posts
  async getFeaturedPosts(limit: number = 5): Promise<{ posts: BlogPost[]; pagination: any }> {
    try {
      const posts = await apiService.getFeaturedPosts(limit);
      return {
        posts,
        pagination: { total: posts.length }
      };
    } catch (error) {
      console.error('Error fetching featured posts:', error);
      throw error;
    }
  }

  // Get recent posts
  async getRecentPosts(limit: number = 5): Promise<{ posts: BlogPost[]; pagination: any }> {
    try {
      const response = await apiService.getPublishedPosts(limit, 0);
      return {
        posts: response.posts.slice(0, limit),
        pagination: { total: response.total }
      };
    } catch (error) {
      console.error('Error fetching recent posts:', error);
      throw error;
    }
  }

  // Get posts by category
  async getPostsByCategory(category: string, limit: number = 10, offset: number = 0): Promise<{ posts: BlogPost[]; pagination: any }> {
    try {
      const response = await apiService.getPostsByCategory(category, limit, offset);
      return {
        posts: response.posts,
        pagination: { total: response.total }
      };
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      throw error;
    }
  }

  // Search published posts
  async searchPosts(query: string, limit: number = 10, offset: number = 0): Promise<{ posts: BlogPost[]; pagination: any }> {
    try {
      const posts = await apiService.searchBlogPosts(query, limit);
      return {
        posts,
        pagination: { total: posts.length }
      };
    } catch (error) {
      console.error('Error searching posts:', error);
      throw error;
    }
  }

  // ==================== CATEGORIES & TAGS ====================

  // Get all categories
  async getCategories(): Promise<Category[]> {
    try {
      const categories = await apiService.getCategories();
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  // Get all tags
  async getTags(): Promise<string[]> {
    try {
      const tags = await apiService.getTags();
      return tags;
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  }

  // ==================== USER INTERACTIONS ====================

  // Like a blog post
  async likePost(id: string): Promise<void> {
    try {
      await apiService.likeBlogPost(id);
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  }

  // Share a blog post (not implemented in API yet)
  async sharePost(id: string): Promise<void> {
    try {
      // TODO: Implement share functionality when API is ready
      console.log('Share functionality not yet implemented');
    } catch (error) {
      console.error('Error sharing post:', error);
      throw error;
    }
  }

  // ==================== UTILITY METHODS ====================

  // Format date for display
  formatDate(date: Date): string {
    return apiService.formatDate(date);
  }

  // Get reading time estimate
  getReadingTime(content: string): string {
    return apiService.getReadingTime(content);
  }

  // ==================== RELATED POSTS ====================

  // Get related posts based on tags and category
  async getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
    try {
      // Get posts with similar tags or category
      const allPosts = await this.getAllPosts({ limit: 50 });
      const posts = allPosts.posts.filter(post => post.id !== currentPost.id);

      // Score posts based on similarity
      const scoredPosts = posts.map(post => {
        let score = 0;
        
        // Same category gets high score
        if (post.category === currentPost.category) {
          score += 5;
        }
        
        // Same subcategory gets medium score
        if (post.subcategory === currentPost.subcategory) {
          score += 3;
        }
        
        // Shared tags get points
        const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
        score += sharedTags.length * 2;
        
        return { post, score };
      });

      // Sort by score and return top results
      return scoredPosts
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.post);
    } catch (error) {
      console.error('Error fetching related posts:', error);
      return [];
    }
  }

  // ==================== POPULAR POSTS ====================

  // Get popular posts based on views
  async getPopularPosts(limit: number = 5): Promise<BlogPost[]> {
    try {
      const allPosts = await this.getAllPosts({ limit: 100 });
      const posts = allPosts.posts;

      // Sort by views and return top results
      return posts
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching popular posts:', error);
      return [];
    }
  }

  // Get trending posts based on recent engagement
  async getTrendingPosts(limit: number = 5): Promise<BlogPost[]> {
    try {
      const allPosts = await this.getAllPosts({ limit: 100 });
      const posts = allPosts.posts;

      // Calculate engagement score (likes + shares) per view
      const scoredPosts = posts.map(post => {
        const views = post.views || 1; // Avoid division by zero
        const likes = post.likes || 0;
        const shares = post.shares || 0;
        const engagementScore = (likes + shares) / views;
        
        return { post, engagementScore };
      });

      // Sort by engagement score and return top results
      return scoredPosts
        .sort((a, b) => b.engagementScore - a.engagementScore)
        .slice(0, limit)
        .map(item => item.post);
    } catch (error) {
      console.error('Error fetching trending posts:', error);
      return [];
    }
  }

  // ==================== ARCHIVE & PAGINATION ====================

  // Get posts by month/year for archive
  async getPostsByDate(year: number, month?: number, limit: number = 10, offset: number = 0): Promise<{ posts: BlogPost[]; pagination: any }> {
    try {
      const allPosts = await this.getAllPosts({ limit: 1000 });
      const posts = allPosts.posts;

      // Filter posts by date
      const filteredPosts = posts.filter(post => {
        const postDate = toDate(post.publishedAt || post.createdAt) || new Date();
        const postYear = postDate.getFullYear();
        const postMonth = postDate.getMonth() + 1; // getMonth() returns 0-11

        if (month !== undefined) {
          return postYear === year && postMonth === month;
        }
        return postYear === year;
      });

      // Apply pagination
      const paginatedPosts = filteredPosts.slice(offset, offset + limit);

      return {
        posts: paginatedPosts,
        pagination: {
          total: filteredPosts.length,
          limit,
          offset,
          hasMore: offset + limit < filteredPosts.length
        }
      };
    } catch (error) {
      console.error('Error fetching posts by date:', error);
      throw error;
    }
  }

  // Get archive data (years and months with posts)
  async getArchiveData(): Promise<{ year: number; month?: number; count: number }[]> {
    try {
      const allPosts = await this.getAllPosts({ limit: 1000 });
      const posts = allPosts.posts;

      const archiveMap = new Map<string, number>();

      posts.forEach(post => {
        const postDate = toDate(post.publishedAt || post.createdAt) || new Date();
        const year = postDate.getFullYear();
        const month = postDate.getMonth() + 1;

        // Count by year
        const yearKey = `${year}`;
        archiveMap.set(yearKey, (archiveMap.get(yearKey) || 0) + 1);

        // Count by year-month
        const monthKey = `${year}-${month}`;
        archiveMap.set(monthKey, (archiveMap.get(monthKey) || 0) + 1);
      });

      const archiveData: { year: number; month?: number; count: number }[] = [];

      archiveMap.forEach((count, key) => {
        const parts = key.split('-');
        const year = parseInt(parts[0]);
        const month = parts.length > 1 ? parseInt(parts[1]) : undefined;

        archiveData.push({ year, month, count });
      });

      // Sort by year (desc) then by month (desc)
      return archiveData.sort((a, b) => {
        if (a.year !== b.year) {
          return b.year - a.year;
        }
        if (a.month && b.month) {
          return b.month - a.month;
        }
        return 0;
      });
    } catch (error) {
      console.error('Error fetching archive data:', error);
      return [];
    }
  }

  // ==================== SEO & META DATA ====================

  // Get SEO data for a post
  getPostSEO(post: BlogPost): {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
    publishedTime?: string;
    modifiedTime?: string;
  } {
    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      keywords: post.seoKeywords || post.tags,
      ogImage: post.featuredImage,
      publishedTime: toISOString(post.publishedAt),
      modifiedTime: toISOString(post.updatedAt)
    };
  }

  // Get structured data for a post (JSON-LD)
  getPostStructuredData(post: BlogPost): object {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.featuredImage,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Samridhya",
        "logo": {
          "@type": "ImageObject",
          "url": "https://samridhya.com/logo.png"
        }
      },
      "datePublished": toISOString(post.publishedAt),
      "dateModified": toISOString(post.updatedAt),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://samridhya.com/blog/${post.slug}`
      },
      "keywords": post.tags.join(", "),
      "articleSection": post.category,
      "wordCount": post.content.split(' ').length
    };
  }
}

// Export singleton instance
export const blogApiService = new BlogApiService(); 