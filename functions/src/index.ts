/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { withCors } from './middleware/cors';

// Initialize Firebase Admin SDK
admin.initializeApp();

// Import route handlers
import {
  healthCheck,
  getPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
  likePost,
  getCategories,
  getTags,
  getFeaturedPosts,
  getPopularPosts
} from './routes/blogRoutes';

// Main API handler
export const api = functions.https.onRequest(
  withCors(async (req: any, res: any) => {
    const { method, url } = req;

    // Add debugging
    console.log(`API Request: ${method} ${url}`);

    try {
      // Health check
      if (method === 'GET' && url === '/health') {
        await healthCheck(req, res);
        return;
      }



      // Blog routes
      if (method === 'GET' && url.startsWith('/api/blog/posts')) {
        if (url === '/api/blog/posts' || url.startsWith('/api/blog/posts?')) {
          await getPosts(req, res);
          return;
        }



        // Extract ID from URL like /api/blog/posts/123
        const idMatch = url.match(/^\/api\/blog\/posts\/([^\/]+)$/);
        if (idMatch) {
          req.params = { id: idMatch[1] };
          await getPostById(req, res);
          return;
        }

        // Extract slug from URL like /api/blog/posts/slug/my-post
        const slugMatch = url.match(/^\/api\/blog\/posts\/slug\/(.+)$/);
        if (slugMatch) {
          req.params = { slug: slugMatch[1] };
          await getPostBySlug(req, res);
          return;
        }
      }

      if (method === 'POST' && url === '/api/blog/posts') {
        await createPost(req, res);
        return;
      }

      if (method === 'PUT' && url.match(/^\/api\/blog\/posts\/[^\/]+$/)) {
        const idMatch = url.match(/^\/api\/blog\/posts\/([^\/]+)$/);
        if (idMatch) {
          req.params = { id: idMatch[1] };
          await updatePost(req, res);
          return;
        }
      }

      if (method === 'DELETE' && url.match(/^\/api\/blog\/posts\/[^\/]+$/)) {
        const idMatch = url.match(/^\/api\/blog\/posts\/([^\/]+)$/);
        if (idMatch) {
          req.params = { id: idMatch[1] };
          await deletePost(req, res);
          return;
        }
      }

      // Search and analytics
      if (method === 'GET' && (url === '/api/blog/search' || url.startsWith('/api/blog/search?'))) {
        await searchPosts(req, res);
        return;
      }

      if (method === 'POST' && url.match(/^\/api\/blog\/posts\/[^\/]+\/like$/)) {
        const idMatch = url.match(/^\/api\/blog\/posts\/([^\/]+)\/like$/);
        if (idMatch) {
          req.params = { id: idMatch[1] };
          await likePost(req, res);
          return;
        }
      }

      // Categories and tags
      if (method === 'GET' && (url === '/api/blog/categories' || url.startsWith('/api/blog/categories?'))) {
        await getCategories(req, res);
        return;
      }

      if (method === 'GET' && (url === '/api/blog/tags' || url.startsWith('/api/blog/tags?'))) {
        await getTags(req, res);
        return;
      }

      // Featured and popular posts
      if (method === 'GET' && (url === '/api/blog/featured' || url.startsWith('/api/blog/featured?'))) {
        await getFeaturedPosts(req, res);
        return;
      }

      if (method === 'GET' && (url === '/api/blog/popular' || url.startsWith('/api/blog/popular?'))) {
        await getPopularPosts(req, res);
        return;
      }

      // 404 handler
      res.status(404).json({
        success: false,
        error: 'Route not found'
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  })
);

// Firestore Triggers - Temporarily commented out for deployment
/*
export const onBlogPostChange = onDocumentWritten('blog-posts/{docId}', async (event) => {
  const logger = new Logger('FirestoreTrigger');
  
  try {
    const { before, after } = event.data!;
    
    if (!before && after) {
      // Document created
      logger.info('Blog post created', { 
        docId: event.params.docId,
        title: after.data()?.title 
      });
    } else if (before && after) {
      // Document updated
      logger.info('Blog post updated', { 
        docId: event.params.docId,
        title: after.data()?.title 
      });
    } else if (before && !after) {
      // Document deleted
      logger.info('Blog post deleted', { 
        docId: event.params.docId 
      });
    }
  } catch (error) {
    logger.error('Error in blog post change trigger', { 
      error: error instanceof Error ? error.message : String(error),
      docId: event.params.docId 
    });
  }
});
*/
