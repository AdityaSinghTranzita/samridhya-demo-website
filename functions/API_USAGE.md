# Firebase Functions API Usage Guide

## Base URL
```
https://your-project-id.cloudfunctions.net/api
```

## Authentication
All requests require proper authentication. Include your Firebase ID token in the Authorization header:
```
Authorization: Bearer <your-firebase-id-token>
```

## Available Endpoints

### Health Check
Check if the API is running:
```bash
curl "https://your-project-id.cloudfunctions.net/api?action=health"
```

### Get All Posts
Retrieve all blog posts with optional filtering:
```bash
curl "https://your-project-id.cloudfunctions.net/api?action=getPosts&limit=10&offset=0"
```

### Get Post by ID
Retrieve a specific post by its ID:
```bash
curl "https://your-project-id.cloudfunctions.net/api?action=getPostById&id=post_id_here"
```

### Create New Post
Create a new blog post:
```bash
curl -X POST "https://your-project-id.cloudfunctions.net/api" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "action": "createPost",
    "data": {
      "title": "My New Post",
      "slug": "my-new-post",
      "excerpt": "This is a brief excerpt",
      "content": "This is the full content of the post",
      "author": "John Doe",
      "status": "draft",
      "tags": ["technology", "programming"],
      "category": "Tech"
    }
  }'
```

### Update Post
Update an existing blog post:
```bash
curl -X PUT "https://your-project-id.cloudfunctions.net/api" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "action": "updatePost",
    "id": "post_id_here",
    "data": {
      "title": "Updated Title",
      "content": "Updated content"
    }
  }'
```

### Delete Post
Delete a blog post:
```bash
curl -X DELETE "https://your-project-id.cloudfunctions.net/api" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "action": "deletePost",
    "id": "post_id_here"
  }'
```

### Search Posts
Search for posts by keyword:
```bash
curl -X POST "https://your-project-id.cloudfunctions.net/api" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "searchPosts",
    "query": "search term"
  }'
```

### Get Categories
Retrieve all available categories:
```bash
curl "https://your-project-id.cloudfunctions.net/api?action=getCategories"
```

### Get Tags
Retrieve all available tags:
```bash
curl "https://your-project-id.cloudfunctions.net/api?action=getTags"
```

### Search Posts
Search for posts by keyword:
```bash
curl "https://your-project-id.cloudfunctions.net/api?action=searchPosts&q=javascript&limit=5"
```

### Get Featured Posts
Get featured posts:
```bash
curl "https://your-project-id.cloudfunctions.net/api?action=getFeaturedPosts&limit=3"
```

## Response Format

All API responses follow this standard format:

```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "message": "Operation completed successfully",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Error Handling

Error responses include:
- `success: false`
- `error: "Error message"`
- `statusCode: 400/401/403/404/500`
- `timestamp: "2024-01-01T00:00:00.000Z"`

## Rate Limiting

- Maximum 100 requests per minute per IP
- Maximum 1000 requests per hour per user

## CORS

The API supports CORS for web applications. Allowed origins:
- `http://localhost:3000` (development)
- `https://your-domain.com` (production) 