# API Structure Documentation

This document describes the new Firebase Functions-based API structure for the Samridhya blog and CMS system.

## Overview

The new API structure replaces direct Firebase SDK usage with custom Firebase Functions, providing:

- **Better Customization**: Full control over API logic and responses
- **Enhanced Security**: Server-side validation and business logic
- **Improved Performance**: Optimized queries and caching
- **Better Error Handling**: Consistent error responses
- **Scalability**: Easy to extend and modify

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Service    │    │ Firebase        │
│   (Next.js)     │◄──►│   (Functions)    │◄──►│   Firestore     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## API Services

### 1. Core API Service (`apiService.ts`)
- Handles all HTTP communication with Firebase Functions
- Provides generic request methods with error handling
- Includes retry logic and timeout handling

### 2. Blog API Service (`blogApiService.ts`)
- Public-facing blog operations
- Only returns published posts
- Includes SEO and structured data generation

### 3. CMS Service (`cmsService.ts`)
- Admin/CMS operations
- Full CRUD operations including drafts
- Dashboard statistics and batch operations

## API Endpoints

### Blog Posts

#### Create Blog Post
```http
POST /createBlogPost
Content-Type: application/json

{
  "title": "Blog Post Title",
  "slug": "blog-post-slug",
  "excerpt": "Post excerpt...",
  "content": "Full post content...",
  "author": "Author Name",
  "status": "draft|published",
  "tags": ["tag1", "tag2"],
  "category": "Category Name",
  "featuredImage": "image-url",
  "featured": false,
  "seoTitle": "SEO Title",
  "seoDescription": "SEO Description",
  "seoKeywords": ["keyword1", "keyword2"]
}
```

#### Get Blog Posts
```http
GET /getBlogPosts?status=published&category=finance&limit=10&offset=0&orderBy=publishedAt&orderDirection=desc
```

#### Get Blog Post by ID
```http
GET /getBlogPostById/{id}
```

#### Get Blog Post by Slug
```http
GET /getBlogPostBySlug/{slug}
```

#### Update Blog Post
```http
PUT /updateBlogPost/{id}
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "published"
}
```

#### Delete Blog Post
```http
DELETE /deleteBlogPost/{id}
```

#### Search Blog Posts
```http
GET /searchBlogPosts?q=search+query&limit=10&offset=0
```

### Categories & Tags

#### Get Categories
```http
GET /getCategories
```

#### Get Tags
```http
GET /getTags
```

### Analytics & Interactions

#### Like Blog Post
```http
POST /likeBlogPost/{id}
```

#### Share Blog Post
```http
POST /shareBlogPost/{id}
```

### Health Check
```http
GET /healthCheck
```

## Response Format

All API responses follow this structure:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: any;
}
```

### Success Response
```json
{
  "success": true,
  "data": {
    "id": "post-id",
    "title": "Blog Post Title",
    "content": "Post content...",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Blog post created successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Validation error",
  "details": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

## Pagination

Paginated responses include pagination metadata:

```typescript
interface PaginatedResponse<T> {
  posts: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}
```

## Usage Examples

### Frontend Usage

#### Using the Blog API Service
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

#### Using the CMS Service
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

### Direct API Calls

```typescript
import { apiService } from '@/services/apiService';

// Create a post
const post = await apiService.createBlogPost({
  title: 'My Post',
  slug: 'my-post',
  excerpt: 'Post excerpt...',
  content: 'Full content...',
  author: 'Author',
  status: 'draft',
  tags: ['tag1', 'tag2']
});

// Get posts with filters
const response = await apiService.getBlogPosts({
  status: 'published',
  category: 'finance',
  featured: true,
  limit: 5
});
```

## Configuration

### Environment Variables

```bash
# Development
NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL=http://localhost:5001/samridhya-v2/us-central1

# Production
NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL=[YOUR_PRODUCTION_API_URL]
```

### API Configuration

The API configuration is centralized in `src/config/api.ts`:

```typescript
import { getApiConfig } from '@/config/api';

const config = getApiConfig();
console.log(config.BASE_URL);
```

## Validation

All API endpoints include server-side validation using Zod schemas:

- **Title**: Required, max 200 characters
- **Slug**: Required, alphanumeric with hyphens only
- **Excerpt**: Required, max 500 characters
- **Content**: Required
- **Author**: Required
- **Status**: Must be 'draft' or 'published'
- **Tags**: At least one tag required

## Error Handling

The API includes comprehensive error handling:

- **Validation Errors**: 400 Bad Request with detailed field errors
- **Not Found**: 404 Not Found for missing resources
- **Conflict**: 409 Conflict for duplicate slugs
- **Server Errors**: 500 Internal Server Error

## Caching

The API supports caching for improved performance:

- **Cache TTL**: 5 minutes
- **Stale While Revalidate**: 10 minutes
- **Development**: Caching disabled for easier debugging

## Security

- **CORS**: Configured for cross-origin requests
- **Input Validation**: All inputs validated server-side
- **Rate Limiting**: Can be added via Firebase Functions configuration
- **Authentication**: Can be extended with Firebase Auth integration

## Deployment

### Deploy Functions

```bash
# Make script executable
chmod +x deploy-functions.sh

# Deploy
./deploy-functions.sh
```

### Manual Deployment

```bash
cd functions
npm install
npm run build
cd ..
firebase deploy --only functions
```

## Monitoring

### Firebase Functions Logs

```bash
firebase functions:log
```

### Health Check

```bash
curl [YOUR_PRODUCTION_API_URL]/healthCheck
```

## Migration from Direct Firebase

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

## Benefits

1. **Better Control**: Full control over API logic and responses
2. **Enhanced Security**: Server-side validation and business logic
3. **Improved Performance**: Optimized queries and caching
4. **Better Error Handling**: Consistent error responses
5. **Scalability**: Easy to extend and modify
6. **Monitoring**: Better logging and monitoring capabilities
7. **Testing**: Easier to test API endpoints independently
8. **Documentation**: Clear API documentation and examples

## Next Steps

1. Deploy the Firebase Functions
2. Update environment variables
3. Replace direct Firebase usage with API services
4. Test all endpoints
5. Monitor performance and logs
6. Add authentication if needed
7. Implement rate limiting
8. Add more advanced features (search, analytics, etc.) 