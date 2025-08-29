# Samridhya Blog API Documentation

A simplified, high-performance blog API built with Firebase Functions and Firestore.

## 🚀 Features

- **Simple & Fast**: Optimized for performance with minimal complexity
- **RESTful**: Clean, intuitive REST API design
- **Firestore Native**: Uses Firestore's native features for optimal performance
- **TypeScript**: Full TypeScript support with type safety
- **CORS Ready**: Built-in CORS support for cross-origin requests
- **Comprehensive**: Complete CRUD operations with search and analytics

## 📋 API Endpoints

### Health Check
```
GET /health
```
Check if the API is running.

**Response:**
```json
{
  "success": true,
  "message": "Blog API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Blog Posts

#### Get All Posts
```
GET /api/blog/posts
```

**Query Parameters:**
- `status` (optional): Filter by status (`draft` or `published`)
- `category` (optional): Filter by category
- `featured` (optional): Filter by featured status (`true` or `false`)
- `limit` (optional): Number of posts to return (default: 10)
- `offset` (optional): Number of posts to skip (default: 0)

**Example:**
```
GET /api/blog/posts?status=published&category=Technology&limit=5
```

#### Get Post by ID
```
GET /api/blog/posts/{id}
```

#### Get Post by Slug
```
GET /api/blog/posts/slug/{slug}
```

#### Create New Post
```
POST /api/blog/posts
```

**Request Body:**
```json
{
  "title": "My Blog Post",
  "excerpt": "Brief description",
  "content": "Full content here...",
  "author": "John Doe",
  "status": "draft",
  "category": "Technology",
  "tags": ["tech", "programming"],
  "featuredImage": "https://example.com/image.jpg",
  "featured": false
}
```

**Notes:**
- `slug` is auto-generated from title if not provided
- `readTime` is auto-calculated from content if not provided
- `views` and `likes` are initialized to 0

#### Update Post
```
PUT /api/blog/posts/{id}
```

#### Delete Post
```
DELETE /api/blog/posts/{id}
```

### Search

#### Search Posts
```
GET /api/blog/search?q={query}&limit={limit}
```

Searches in title, excerpt, content, and tags.

### Analytics

#### Like Post
```
POST /api/blog/posts/{id}/like
```

Increments the like count for a post.

### Categories & Tags

#### Get Categories
```
GET /api/blog/categories
```

Returns categories with post counts.

#### Get Tags
```
GET /api/blog/tags
```

Returns all unique tags.

### Featured & Popular

#### Get Featured Posts
```
GET /api/blog/featured?limit={limit}
```

#### Get Popular Posts
```
GET /api/blog/popular?limit={limit}
```

Returns posts ordered by view count.

## 📊 Data Models

### BlogPost
```typescript
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  status: 'draft' | 'published';
  featuredImage?: string;
  tags: string[];
  category: string;
  readTime?: string;
  featured?: boolean;
  views?: number;
  likes?: number;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
}
```

## 🔧 Setup & Deployment

### Prerequisites
- Node.js 18+
- Firebase CLI
- Firebase project with Firestore enabled

### Installation
```bash
cd functions
npm install
```

### Local Development
```bash
npm run serve
```

### Deployment
```bash
npm run deploy
```

## 🗄️ Database Structure

### Collection: `blog-posts`

Each document contains:
- **Auto-generated fields**: `id`, `createdAt`, `updatedAt`, `publishedAt`
- **User-provided fields**: `title`, `slug`, `excerpt`, `content`, `author`, `status`, `category`, `tags`, etc.
- **Analytics fields**: `views`, `likes`
- **Utility fields**: `readTime`, `featured`

### Indexes Required
```javascript
// Basic indexes for common queries
{
  "collectionGroup": "blog-posts",
  "queryScope": "COLLECTION",
  "fields": [
    { "fieldPath": "status", "order": "ASCENDING" },
    { "fieldPath": "createdAt", "order": "DESCENDING" }
  ]
}

{
  "collectionGroup": "blog-posts",
  "queryScope": "COLLECTION",
  "fields": [
    { "fieldPath": "status", "order": "ASCENDING" },
    { "fieldPath": "featured", "order": "ASCENDING" },
    { "fieldPath": "createdAt", "order": "DESCENDING" }
  ]
}

{
  "collectionGroup": "blog-posts",
  "queryScope": "COLLECTION",
  "fields": [
    { "fieldPath": "status", "order": "ASCENDING" },
    { "fieldPath": "views", "order": "DESCENDING" }
  ]
}
```

## 🧪 Testing

### Using Postman
1. Import the provided Postman collection: `Samridhya_Blog_API.postman_collection.json`
2. Update the `baseUrl` variable with your Firebase function URL
3. Test all endpoints

### Using Swagger
1. Open the Swagger documentation: `swagger.json`
2. Use Swagger UI or any OpenAPI client

### Sample Test Data
```json
{
  "title": "Getting Started with Firebase Functions",
  "excerpt": "Learn how to build scalable APIs with Firebase Functions",
  "content": "Firebase Functions is a powerful serverless platform...",
  "author": "Jane Smith",
  "status": "published",
  "category": "Technology",
  "tags": ["firebase", "serverless", "api"],
  "featuredImage": "https://example.com/firebase.jpg",
  "featured": true
}
```

## 🔒 Security

### CORS Configuration
The API includes CORS middleware with configurable origins:
- Development: `http://localhost:3000`, `http://localhost:3001`
- Production: Configure via environment variables

### Validation
- Input validation for all required fields
- Slug uniqueness checking
- Content sanitization (basic)

## 📈 Performance

### Optimizations
- **No Caching**: Removed complex caching for simplicity
- **Firestore Native**: Uses Firestore's built-in features
- **Minimal Processing**: Simple data transformations
- **Efficient Queries**: Optimized Firestore queries

### Expected Performance
- **Response Time**: < 500ms for most operations
- **Throughput**: 1000+ requests/second
- **Scalability**: Automatic scaling with Firebase Functions

## 🐛 Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": "Error message here"
}
```

### Common HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `404`: Not Found
- `500`: Internal Server Error

## 🔄 Migration from Old API

### Key Changes
1. **Simplified Models**: Removed complex validation schemas
2. **RESTful Routes**: Changed from action-based to REST endpoints
3. **Removed Caching**: Simplified by removing cache layer
4. **Streamlined Service**: Reduced from 677 lines to ~200 lines
5. **Better Error Handling**: Simplified error responses

### Breaking Changes
- Route structure changed from `/api?action=createPost` to `/api/blog/posts`
- Response format simplified
- Some complex features removed for simplicity

## 📞 Support

For questions or issues:
- Check the Swagger documentation
- Review the Postman collection examples
- Check Firebase Functions logs for debugging

## 🚀 Future Enhancements

Potential improvements (not included for simplicity):
- Authentication & Authorization
- Image upload functionality
- Advanced search with Elasticsearch
- Caching layer
- Rate limiting
- Webhook support
- Bulk operations 