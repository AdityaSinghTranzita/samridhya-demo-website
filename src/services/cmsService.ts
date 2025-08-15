import { apiService } from './apiService';
import { BlogPost, Category } from './blogService';
import { toDate } from '@/utils/dateUtils';

// CMS Service Class
class CMSService {
  // ==================== BLOG POST MANAGEMENT ====================

  // Create a new blog post
  async createPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    try {
      // Validate the post data
      const validation = apiService.validateBlogPost(postData);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }

      // Generate slug if not provided
      if (!postData.slug) {
        postData.slug = apiService.generateSlug(postData.title);
      }

      // Generate reading time if not provided
      if (!postData.readTime) {
        postData.readTime = apiService.getReadingTime(postData.content);
      }

      const post = await apiService.createBlogPost(postData);
      console.log('Blog post created successfully:', post.id);
      return post;
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  }

  // Get all posts for CMS (including drafts)
  async getAllPosts(params: {
    status?: 'draft' | 'published';
    category?: string;
    limit?: number;
    offset?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  } = {}): Promise<{ posts: BlogPost[]; pagination: any }> {
    try {
      const response = await apiService.getBlogPosts(params);
      return {
        posts: response.posts,
        pagination: { total: response.total }
      };
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  // Get a single post by ID
  async getPostById(id: string): Promise<BlogPost | null> {
    try {
      const post = await apiService.getBlogPostById(id);
      return post;
    } catch (error) {
      console.error('Error fetching post:', error);
      if (error instanceof Error && (error.message.includes('not found') || error.message.includes('404'))) {
        return null;
      }
      throw error;
    }
  }

  // Update a blog post
  async updatePost(id: string, postData: Partial<BlogPost>): Promise<BlogPost> {
    try {
      // Validate the post data
      const validation = apiService.validateBlogPost(postData);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }

      // Generate slug if title changed and slug not provided
      if (postData.title && !postData.slug) {
        postData.slug = apiService.generateSlug(postData.title);
      }

      // Generate reading time if content changed and readTime not provided
      if (postData.content && !postData.readTime) {
        postData.readTime = apiService.getReadingTime(postData.content);
      }

      const post = await apiService.updateBlogPost(id, postData);
      console.log('Blog post updated successfully:', id);
      return post;
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
  }

  // Delete a blog post
  async deletePost(id: string): Promise<void> {
    try {
      await apiService.deleteBlogPost(id);
      console.log('Blog post deleted successfully:', id);
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
  }

  // Publish a draft post
  async publishPost(id: string): Promise<BlogPost> {
    try {
      const post = await apiService.updateBlogPost(id, { status: 'published' });
      console.log('Blog post published successfully:', id);
      return post;
    } catch (error) {
      console.error('Error publishing blog post:', error);
      throw error;
    }
  }

  // Unpublish a post (make it draft)
  async unpublishPost(id: string): Promise<BlogPost> {
    try {
      const post = await apiService.updateBlogPost(id, { status: 'draft' });
      console.log('Blog post unpublished successfully:', id);
      return post;
    } catch (error) {
      console.error('Error unpublishing blog post:', error);
      throw error;
    }
  }

  // Toggle featured status
  async toggleFeatured(id: string, featured: boolean): Promise<BlogPost> {
    try {
      const post = await apiService.updateBlogPost(id, { featured });
      console.log(`Blog post ${featured ? 'featured' : 'unfeatured'} successfully:`, id);
      return post;
    } catch (error) {
      console.error('Error toggling featured status:', error);
      throw error;
    }
  }

  // ==================== CATEGORIES & TAGS MANAGEMENT ====================

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

  // ==================== SEARCH & FILTERING ====================

  // Search posts
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

  // ==================== ANALYTICS & INTERACTIONS ====================

  // Like a post
  async likePost(id: string): Promise<void> {
    try {
      await apiService.likeBlogPost(id);
      console.log('Post liked successfully:', id);
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  }

  // Share a post
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

  // Generate slug from title
  generateSlug(title: string): string {
    return apiService.generateSlug(title);
  }

  // Validate blog post data
  validatePost(postData: Partial<BlogPost>): { isValid: boolean; errors: string[] } {
    return apiService.validateBlogPost(postData);
  }

  // Check if API is healthy
  async healthCheck(): Promise<boolean> {
    try {
      await apiService.healthCheck();
      return true;
    } catch (error) {
      console.error('API health check failed:', error);
      return false;
    }
  }

  // ==================== BATCH OPERATIONS ====================

  // Bulk publish posts
  async bulkPublishPosts(ids: string[]): Promise<BlogPost[]> {
    try {
      const promises = ids.map(id => this.publishPost(id));
      const results = await Promise.allSettled(promises);
      
      const successful: BlogPost[] = [];
      const failed: string[] = [];

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          successful.push(result.value);
        } else {
          failed.push(ids[index]);
          console.error(`Failed to publish post ${ids[index]}:`, result.reason);
        }
      });

      if (failed.length > 0) {
        console.warn(`Failed to publish ${failed.length} posts:`, failed);
      }

      console.log(`Successfully published ${successful.length} posts`);
      return successful;
    } catch (error) {
      console.error('Error in bulk publish operation:', error);
      throw error;
    }
  }

  // Bulk delete posts
  async bulkDeletePosts(ids: string[]): Promise<void> {
    try {
      const promises = ids.map(id => this.deletePost(id));
      const results = await Promise.allSettled(promises);
      
      const failed: string[] = [];

      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          failed.push(ids[index]);
          console.error(`Failed to delete post ${ids[index]}:`, result.reason);
        }
      });

      if (failed.length > 0) {
        console.warn(`Failed to delete ${failed.length} posts:`, failed);
        throw new Error(`Failed to delete ${failed.length} posts`);
      }

      console.log(`Successfully deleted ${ids.length} posts`);
    } catch (error) {
      console.error('Error in bulk delete operation:', error);
      throw error;
    }
  }

  // ==================== DASHBOARD STATISTICS ====================

  // Get dashboard statistics
  async getDashboardStats(): Promise<{
    totalPosts: number;
    publishedPosts: number;
    draftPosts: number;
    featuredPosts: number;
    totalViews: number;
    totalLikes: number;
    totalShares: number;
    recentActivity: BlogPost[];
  }> {
    try {
      // Get all posts
      const allPosts = await this.getAllPosts({ limit: 1000 });
      const posts = allPosts.posts;

      // Calculate statistics
      const totalPosts = posts.length;
      const publishedPosts = posts.filter(post => post.status === 'published').length;
      const draftPosts = posts.filter(post => post.status === 'draft').length;
      const featuredPosts = posts.filter(post => post.featured).length;

      // Calculate engagement metrics
      const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
      const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);
      const totalShares = posts.reduce((sum, post) => sum + (post.shares || 0), 0);

      // Get recent activity (last 10 updated posts)
      const recentActivity = posts
        .sort((a, b) => {
          const dateA = a.updatedAt ? toDate(a.updatedAt)?.getTime() || 0 : 0;
          const dateB = b.updatedAt ? toDate(b.updatedAt)?.getTime() || 0 : 0;
          return dateB - dateA;
        })
        .slice(0, 10);

      return {
        totalPosts,
        publishedPosts,
        draftPosts,
        featuredPosts,
        totalViews,
        totalLikes,
        totalShares,
        recentActivity
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const cmsService = new CMSService(); 