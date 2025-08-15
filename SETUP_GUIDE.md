# 🚀 Firebase Functions API Setup Guide

This guide will help you set up and use the new Firebase Functions-based API for your Samridhya blog and CMS system.

## 📋 Prerequisites

- Node.js 18+ installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase project configured

## 🔧 Setup Steps

### 1. Install Dependencies

```bash
# Install Firebase Functions dependencies
cd functions
npm install

# Build the functions
npm run build
```

### 2. Start Firebase Emulators

```bash
# From the project root (samridhya-website directory)
firebase emulators:start --only functions,firestore
```

### 3. Test the API

```bash
# Run the test script
node test-api.js
```

### 4. Update Environment Variables

Create or update your `.env.local` file:

```bash
# Development Environment
NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL=http://127.0.0.1:5001/samridhya-website/us-central1

# Production Environment
NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL=[YOUR_PRODUCTION_API_URL]
```

## 🧪 Testing Your API

### Manual Testing

Test individual endpoints using curl:

```bash
# Health Check
curl -X GET "http://127.0.0.1:5001/samridhya-website/us-central1/healthCheck"

# Get Blog Posts
curl -X GET "http://127.0.0.1:5001/samridhya-website/us-central1/getBlogPosts"

# Create Blog Post
curl -X POST "http://127.0.0.1:5001/samridhya-website/us-central1/createBlogPost" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post",
    "slug": "test-post",
    "excerpt": "Test excerpt",
    "content": "Test content",
    "author": "Test Author",
    "status": "published",
    "tags": ["test"],
    "category": "Test"
  }'
```

### Automated Testing

Run the comprehensive test script:

```bash
node test-api.js
```

## 📚 Using the API Services

### 1. Core API Service

```typescript
import { apiService } from '@/services/apiService';

// Create a blog post
const post = await apiService.createBlogPost({
  title: 'My Post',
  slug: 'my-post',
  excerpt: 'Post excerpt...',
  content: 'Full content...',
  author: 'Author',
  status: 'draft',
  tags: ['tag1', 'tag2']
});

// Get blog posts with filters
const response = await apiService.getBlogPosts({
  status: 'published',
  category: 'finance',
  limit: 10,
  offset: 0
});
```

### 2. Blog API Service (Public)

```typescript
import { blogApiService } from '@/services/blogApiService';

// Get all published posts
const { posts, pagination } = await blogApiService.getAllPosts({
  limit: 10,
  offset: 0
});

// Get a specific post
const post = await blogApiService.getPostBySlug('my-blog-post');

// Search posts
const searchResults = await blogApiService.searchPosts('finance tips');

// Get related posts
const relatedPosts = await blogApiService.getRelatedPosts(currentPost, 3);
```

### 3. CMS Service (Admin)

```typescript
import { cmsService } from '@/services/cmsService';

// Create a new post
const newPost = await cmsService.createPost({
  title: 'New Blog Post',
  content: 'Post content...',
  author: 'John Doe',
  status: 'draft',
  tags: ['finance', 'tips']
});

// Update a post
const updatedPost = await cmsService.updatePost(postId, {
  status: 'published'
});

// Get dashboard stats
const stats = await cmsService.getDashboardStats();
```

## 🔄 Migration from Direct Firebase

### Before (Direct Firebase)
```typescript
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';

const querySnapshot = await getDocs(collection(db, 'blog-posts'));
const posts = querySnapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));
```

### After (API Service)
```typescript
import { blogApiService } from '@/services/blogApiService';

const { posts, pagination } = await blogApiService.getAllPosts();
```

## 🚀 Deployment

### 1. Deploy to Production

```bash
# Deploy functions
./deploy-functions.sh

# Or manually
cd functions
npm run build
cd ..
firebase deploy --only functions
```

### 2. Update Production Environment

After deployment, update your production environment variables:

```bash
NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL=[YOUR_PRODUCTION_API_URL]
```

## 📊 Available Endpoints

### Blog Posts
- `POST /createBlogPost` - Create new post
- `GET /getBlogPosts` - Get posts with filters
- `GET /getBlogPostById/{id}` - Get post by ID
- `GET /getBlogPostBySlug/{slug}` - Get post by slug
- `PUT /updateBlogPost/{id}` - Update post
- `DELETE /deleteBlogPost/{id}` - Delete post
- `GET /searchBlogPosts` - Search posts

### Categories & Tags
- `GET /getCategories` - Get all categories
- `GET /getTags` - Get all tags

### Analytics
- `POST /likeBlogPost/{id}` - Like a post
- `POST /shareBlogPost/{id}` - Share a post

### Health Check
- `GET /healthCheck` - API status

## 🔍 Monitoring

### Firebase Functions Logs
```bash
firebase functions:log
```

### Emulator UI
- **Local**: http://127.0.0.1:4000/
- **Functions**: http://127.0.0.1:4000/functions
- **Firestore**: http://127.0.0.1:4000/firestore

## 🛠 Troubleshooting

### Common Issues

1. **Functions not starting**
   ```bash
   cd functions
   npm install
   npm run build
   ```

2. **Port conflicts**
   ```bash
   pkill -f firebase
   # Then restart emulators
   ```

3. **API not responding**
   - Check if emulators are running
   - Verify the correct URL
   - Check function logs

### Error Messages

- **"Functions emulator not running"** - Start emulators
- **"Port taken"** - Kill existing processes
- **"Build failed"** - Check TypeScript errors

## 📈 Benefits

✅ **Better Control** - Full control over API logic and responses  
✅ **Enhanced Security** - Server-side validation and business logic  
✅ **Improved Performance** - Optimized queries and caching  
✅ **Better Error Handling** - Consistent error responses  
✅ **Scalability** - Easy to extend and modify  
✅ **Monitoring** - Better logging and monitoring capabilities  
✅ **Testing** - Easier to test API endpoints independently  

## 🎯 Next Steps

1. ✅ Deploy Firebase Functions
2. ✅ Update environment variables
3. ✅ Replace direct Firebase usage with API services
4. ✅ Test all endpoints
5. ✅ Monitor performance and logs
6. ✅ Add authentication if needed
7. ✅ Implement rate limiting
8. ✅ Add more advanced features

Your new API structure is now ready to use! 🎉 