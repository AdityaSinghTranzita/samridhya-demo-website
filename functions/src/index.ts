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
import express from 'express';

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

import {
  generateSitemap,
  generateSitemapIndex
} from './routes/sitemapRoutes';

// Create Express app
const app = express();

// Comprehensive CORS configuration
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Define allowed origins
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'https://samridhya.com',
    'https://www.samridhya.com',
    'https://samridhya-website.web.app',
    'https://samridhya-website.firebaseapp.com',
    'https://samridhya-website.vercel.app',
    'https://samridhya.vercel.app'
  ];
  
  // Set CORS headers for all requests
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Access-Control-Request-Method, Access-Control-Request-Headers, Cache-Control, Pragma, Expires');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  
  next();
});

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Main API handler
export const api = functions.https.onRequest(app);

// Add routes to Express app
app.get('/health', async (req: any, res: any) => {
  await healthCheck(req, res);
});

app.get('/api/blog/posts', async (req: any, res: any) => {
  await getPosts(req, res);
});

app.get('/api/blog/posts/:id', async (req: any, res: any) => {
  await getPostById(req, res);
});

app.get('/api/blog/posts/slug/:slug', async (req: any, res: any) => {
  await getPostBySlug(req, res);
});

app.post('/api/blog/posts', async (req: any, res: any) => {
  await createPost(req, res);
});

app.put('/api/blog/posts/:id', async (req: any, res: any) => {
  await updatePost(req, res);
});

app.delete('/api/blog/posts/:id', async (req: any, res: any) => {
  await deletePost(req, res);
});

app.get('/api/blog/search', async (req: any, res: any) => {
  await searchPosts(req, res);
});

app.post('/api/blog/posts/:id/like', async (req: any, res: any) => {
  await likePost(req, res);
});

app.get('/api/blog/categories', async (req: any, res: any) => {
  await getCategories(req, res);
});

app.get('/api/blog/tags', async (req: any, res: any) => {
  await getTags(req, res);
});

app.get('/api/blog/featured', async (req: any, res: any) => {
  await getFeaturedPosts(req, res);
});

app.get('/api/blog/popular', async (req: any, res: any) => {
  await getPopularPosts(req, res);
});

// Sitemap routes
app.get('/sitemap.xml', async (req: any, res: any) => {
  await generateSitemap(req, res);
});

app.get('/sitemap-index.xml', async (req: any, res: any) => {
  await generateSitemapIndex(req, res);
});

// 404 handler
app.use('*', (req: any, res: any) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handler
app.use((error: any, req: any, res: any, next: any) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Import Firestore triggers
import { onBlogPostChange } from './triggers/blogTriggers';

// Firestore Triggers
export { onBlogPostChange };
