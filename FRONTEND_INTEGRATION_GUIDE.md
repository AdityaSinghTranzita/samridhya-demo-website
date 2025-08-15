# Frontend Integration Guide

This guide explains how to integrate the simplified Blog API with your frontend application.

## 🚀 Quick Start

### 1. Environment Setup

Add the API URL to your environment variables:

```env
# .env.local
NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL=https://api-brz76cmlca-uc.a.run.app
```

### 2. Import the Services

```typescript
import { blogService, BlogPost, Category } from '../services/blogService';
```

## 📋 Available Methods

### Blog Posts

#### Get All Posts
```typescript
const posts = await blogService.getAllPosts();
```

#### Get Published Posts Only
```typescript
const publishedPosts = await blogService.getPublishedPosts();
```

#### Get Post by ID
```typescript
const post = await blogService.getPostById('post-id-here');
```

#### Get Post by Slug
```typescript
const post = await blogService.getPostBySlug('my-blog-post-slug');
```

#### Create New Post
```typescript
const newPost = {
  title: "My New Blog Post",
  excerpt: "A brief description of the post",
  content: "The full content of the blog post...",
  author: "John Doe",
  status: "draft", // or "published"
  category: "Technology",
  tags: ["tech", "programming", "web"]
};

const postId = await blogService.createPost(newPost);
```

#### Update Post
```typescript
const updateData = {
  title: "Updated Title",
  status: "published",
  featured: true
};

await blogService.updatePost('post-id', updateData);
```

#### Delete Post
```typescript
await blogService.deletePost('post-id');
```

#### Search Posts
```typescript
const searchResults = await blogService.getPostsBySearch('search term');
```

#### Like a Post
```typescript
await blogService.likePost('post-id');
```

### Categories & Tags

#### Get Categories
```typescript
const categories = await blogService.getCategories();
// Returns: [{ name: "Technology", count: 5 }, { name: "Business", count: 3 }]
```

#### Get Tags
```typescript
const tags = await blogService.getTags();
// Returns: ["javascript", "react", "typescript", ...]
```

### Special Queries

#### Get Featured Posts
```typescript
const featuredPosts = await blogService.getFeaturedPosts();
```

#### Get Popular Posts
```typescript
const popularPosts = await blogService.getPopularPosts(5); // limit to 5 posts
```

#### Get Posts by Category
```typescript
const techPosts = await blogService.getPostsByCategory('Technology');
```

#### Get Posts by Status
```typescript
const draftPosts = await blogService.getPostsByStatus('draft');
const publishedPosts = await blogService.getPostsByStatus('published');
```

## 🎯 React Component Examples

### Basic Blog List Component

```typescript
import React, { useState, useEffect } from 'react';
import { blogService, BlogPost } from '../services/blogService';

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const publishedPosts = await blogService.getPublishedPosts();
      setPosts(publishedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id} className="mb-6 p-4 border rounded">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-gray-600">{post.excerpt}</p>
          <div className="mt-2 text-sm text-gray-500">
            By {post.author} • {blogService.formatDate(post.createdAt)}
          </div>
        </article>
      ))}
    </div>
  );
};
```

### Search Component

```typescript
import React, { useState } from 'react';
import { blogService, BlogPost } from '../services/blogService';

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BlogPost[]>([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setSearching(true);
      const searchResults = await blogService.getPostsBySearch(query);
      setResults(searchResults);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={handleSearch}
          disabled={searching}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {searching ? 'Searching...' : 'Search'}
        </button>
      </div>

      {results.length > 0 && (
        <div>
          <h3>Search Results ({results.length})</h3>
          {results.map((post) => (
            <div key={post.id} className="mb-2 p-2 bg-gray-50 rounded">
              <h4 className="font-medium">{post.title}</h4>
              <p className="text-sm text-gray-600">{post.excerpt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

### Create Post Form

```typescript
import React, { useState } from 'react';
import { blogService } from '../services/blogService';

const CreatePostForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    tags: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      
      const postData = {
        ...formData,
        status: 'draft' as const,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };

      const postId = await blogService.createPost(postData);
      alert(`Post created successfully! ID: ${postId}`);
      
      // Reset form
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        category: '',
        tags: ''
      });
    } catch (err) {
      alert('Failed to create post: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Excerpt</label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
          required
          className="w-full px-3 py-2 border rounded"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          required
          className="w-full px-3 py-2 border rounded"
          rows={6}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Author</label>
        <input
          type="text"
          value={formData.author}
          onChange={(e) => setFormData({...formData, author: e.target.value})}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({...formData, tags: e.target.value})}
          placeholder="tech, programming, web"
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        {submitting ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
};
```

## 🔧 Error Handling

The API service includes comprehensive error handling:

```typescript
try {
  const posts = await blogService.getPublishedPosts();
  // Handle success
} catch (error) {
  if (error instanceof Error) {
    console.error('API Error:', error.message);
    // Handle specific error
  } else {
    console.error('Unknown error:', error);
    // Handle unknown error
  }
}
```

## 📊 Data Types

### BlogPost Interface
```typescript
interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  status: 'draft' | 'published';
  featuredImage?: string;
  tags: string[];
  category?: string;
  readTime?: string;
  featured?: boolean;
  views?: number;
  likes?: number;
  publishedAt?: Date | any;
  createdAt: Date | any;
  updatedAt: Date | any;
}
```

### Category Interface
```typescript
interface Category {
  name: string;
  count: number;
}
```

## 🎨 Utility Functions

### Format Date
```typescript
const formattedDate = blogService.formatDate(post.createdAt);
// Returns: "Jan 15, 2024"
```

### Generate Slug
```typescript
const slug = blogService.generateSlug("My Blog Post Title");
// Returns: "my-blog-post-title"
```

### Calculate Reading Time
```typescript
const readingTime = blogService.getReadingTime(post.content);
// Returns: "3 min read"
```

### Validate Post Data
```typescript
const validation = blogService.validateBlogPost(postData);
if (!validation.isValid) {
  console.error('Validation errors:', validation.errors);
}
```

## 🚀 Performance Tips

1. **Use Pagination**: For large datasets, use the pagination parameters
2. **Cache Results**: Implement client-side caching for frequently accessed data
3. **Error Boundaries**: Wrap your components with error boundaries
4. **Loading States**: Always show loading states during API calls
5. **Optimistic Updates**: Update UI immediately for better UX

## 🔍 Testing

Use the provided test script to verify integration:

```bash
node test-frontend-integration.js
```

This will test all API endpoints and verify they work correctly with your frontend.

## 📝 Notes

- The API automatically generates slugs and read times for new posts
- All timestamps are in Firestore format (with `_seconds` and `_nanoseconds`)
- The service handles CORS and network errors automatically
- Retry logic is built-in for network failures
- All responses follow a consistent format with `success`, `data`, and `error` fields

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your domain is allowed in Firebase Functions CORS settings
2. **Network Errors**: Check your internet connection and API URL
3. **Type Errors**: Make sure you're using the correct TypeScript interfaces
4. **Validation Errors**: Check that all required fields are provided when creating posts

### Debug Mode

Enable debug logging by adding this to your environment:

```env
NEXT_PUBLIC_DEBUG_API=true
```

This will log all API requests and responses to the console.

---

🎉 **Your frontend is now fully integrated with the simplified Blog API!** 