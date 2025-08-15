import { Request, Response } from 'express';
import { BlogPostService } from '../services/BlogPostService';

const blogService = new BlogPostService();

// Helper function to ensure consistent response structure
const sendResponse = (res: Response, success: boolean, data?: any, message?: string, error?: string, statusCode: number = 200) => {
  const response: any = { success };
  
  if (data !== undefined) {
    response.data = data;
  }
  
  if (message) {
    response.message = message;
  }
  
  if (error) {
    response.error = error;
  }
  
  res.status(statusCode).json(response);
};

// Health check
export const healthCheck = async (req: Request, res: Response) => {
  sendResponse(res, true, {
    message: 'Blog API is running',
    timestamp: new Date().toISOString()
  });
};

// GET /api/blog/posts - Get all posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    const { status, category, featured, limit, offset } = req.query;
    
    const result = await blogService.getPosts({
      status: status as 'draft' | 'published',
      category: category as string,
      featured: featured === 'true',
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined
    });

    sendResponse(res, true, result);
  } catch (error) {
    sendResponse(res, false, undefined, undefined, error instanceof Error ? error.message : 'Internal server error', 500);
  }
};

// GET /api/blog/posts/:id - Get post by ID
export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await blogService.getPostById(id);
    
    if (!post) {
      return sendResponse(res, false, undefined, undefined, 'Post not found', 404);
    }

    // Increment views for published posts
    if (post.status === 'published') {
      await blogService.incrementViews(id);
    }

    return sendResponse(res, true, post);
  } catch (error) {
    return sendResponse(res, false, undefined, undefined, error instanceof Error ? error.message : 'Internal server error', 500);
  }
};

// GET /api/blog/posts/slug/:slug - Get post by slug
export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    // Decode the URL-encoded slug to handle special characters like &, ?, etc.
    const decodedSlug = decodeURIComponent(slug);
    const post = await blogService.getPostBySlug(decodedSlug);
    
    if (!post) {
      return sendResponse(res, false, undefined, undefined, 'Post not found', 404);
    }

    // Increment views for published posts
    if (post.status === 'published') {
      await blogService.incrementViews(post.id);
    }

    return sendResponse(res, true, post);
  } catch (error) {
    return sendResponse(res, false, undefined, undefined, error instanceof Error ? error.message : 'Internal server error', 500);
  }
};

// POST /api/blog/posts - Create new post
export const createPost = async (req: Request, res: Response) => {
  try {
    const postData = req.body;
    const post = await blogService.createPost(postData);
    
    sendResponse(res, true, post, 'Post created successfully', undefined, 201);
  } catch (error) {
    sendResponse(res, false, undefined, undefined, error instanceof Error ? error.message : 'Bad request', 400);
  }
};

// PUT /api/blog/posts/:id - Update post
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const post = await blogService.updatePost(id, updateData);
    
    sendResponse(res, true, post, 'Post updated successfully');
  } catch (error) {
    sendResponse(res, false, undefined, undefined, error instanceof Error ? error.message : 'Bad request', 400);
  }
};

// DELETE /api/blog/posts/:id - Delete post
export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await blogService.deletePost(id);
    
    sendResponse(res, true, undefined, 'Post deleted successfully');
  } catch (error) {
    sendResponse(res, false, undefined, undefined, error instanceof Error ? error.message : 'Bad request', 400);
  }
};

// GET /api/blog/search - Search posts
export const searchPosts = async (req: Request, res: Response) => {
  try {
    const { q, limit } = req.query;
    
    if (!q || typeof q !== 'string') {
      return sendResponse(res, false, undefined, undefined, 'Search query is required', 400);
    }

    const posts = await blogService.searchPosts(q, limit ? Number(limit) : 10);
    
    return sendResponse(res, true, posts);
  } catch (error) {
    return sendResponse(res, false, undefined, undefined, error instanceof Error ? error.message : 'Internal server error', 500);
  }
};

// POST /api/blog/posts/:id/like - Like a post
export const likePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await blogService.incrementLikes(id);
    
    sendResponse(res, true, undefined, 'Post liked successfully');
  } catch (error) {
    sendResponse(res, false, undefined, undefined, error instanceof Error ? error.message : 'Internal server error', 500);
  }
};

// GET /api/blog/categories - Get categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await blogService.getCategories();
    
    sendResponse(res, true, categories);
  } catch (error) {
    sendResponse(res, false, undefined, undefined, error instanceof Error ? error.message : 'Internal server error', 500);
  }
};

// GET /api/blog/tags - Get tags
export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await blogService.getTags();
    
    sendResponse(res, true, tags);
  } catch (error) {
    sendResponse(res, false, undefined, undefined, error instanceof Error ? error.message : 'Internal server error', 500);
  }
};

// GET /api/blog/featured - Get featured posts
export const getFeaturedPosts = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query;
    const posts = await blogService.getFeaturedPosts(limit ? Number(limit) : 5);
    
    sendResponse(res, true, posts);
  } catch (error) {
    sendResponse(res, false, undefined, undefined, error instanceof Error ? error.message : 'Internal server error', 500);
  }
};

// GET /api/blog/popular - Get popular posts
export const getPopularPosts = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query;
    const posts = await blogService.getPopularPosts(limit ? Number(limit) : 5);
    
    sendResponse(res, true, posts);
  } catch (error) {
    sendResponse(res, false, undefined, undefined, error instanceof Error ? error.message : 'Internal server error', 500);
  }
}; 



 