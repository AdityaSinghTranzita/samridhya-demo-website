# Firebase Functions Integration

This document explains how the frontend has been integrated with the Firebase Functions API.

## Overview

The frontend now uses a single Firebase Functions endpoint (`/api`) for all blog operations, following the pattern described in `functions/API_USAGE.md`.

## Configuration

### Environment Variables

Add these to your `.env.local` file:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=samridhya-website
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Development
NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL=http://127.0.0.1:5001/samridhya-website/us-central1/api

# Production (uncomment and update with your actual URL)
# NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL=[YOUR_PRODUCTION_API_URL]
```

## API Service Structure

### Base URL
- **Local Development**: `http://127.0.0.1:5001/samridhya-website/us-central1/api`
- **Production**: `[YOUR_PRODUCTION_API_URL]`

### Request Format

#### GET Requests
```
GET /api?action=<action>&<other_params>
```

#### POST/PUT/DELETE Requests
```json
{
  "action": "<action>",
  "id": "<post_id>", // for operations that need post ID
  "data": { /* post data */ } // for create/update operations
}
```

## Updated Services

### 1. API Service (`src/services/apiService.ts`)
- Updated to use single endpoint pattern
- Handles both GET and POST/PUT/DELETE requests
- Includes all actions from the Firebase Functions API
- **Default**: Uses local emulator for development

### 2. Blog Service (`src/services/blogService.ts`)
- Now uses API service instead of direct Firestore calls
- Maintains same interface for backward compatibility
- Includes error handling for API responses

### 3. CMS Service (`src/services/cmsService.ts`)
- Already using API service
- No changes needed

### 4. Blog API Service (`src/services/blogApiService.ts`)
- Already using API service
- No changes needed

## Available Actions

### GET Actions
- `health` - Health check
- `getPosts` - Get all posts with filtering
- `getPostById` - Get post by ID
- `getPostBySlug` - Get post by slug
- `searchPosts` - Search posts
- `getCategories` - Get all categories
- `getTags` - Get all tags
- `getFeaturedPosts` - Get featured posts
- `getPopularPosts` - Get popular posts
- `getRecentPosts` - Get recent posts
- `getPostsByCategory` - Get posts by category
- `getPostsByTag` - Get posts by tag

### POST Actions
- `createPost` - Create new post
- `likePost` - Like a post
- `sharePost` - Share a post

### PUT Actions
- `updatePost` - Update a post

### DELETE Actions
- `deletePost` - Delete a post

## Testing


2. Click the test buttons to verify:
   - Health check
   - Getting posts
   - Getting categories
   - Getting tags

## Error Handling

The API service includes comprehensive error handling:

- Network errors are caught and logged
- API errors include status codes and timestamps
- Graceful fallbacks for missing data
- Console logging for debugging

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation completed successfully"
}
```

Error responses:
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Development Setup

### Local Development with Emulator
1. Start Firebase emulator: `firebase emulators:start --only functions`
2. The frontend will automatically use the local emulator URL
3. Run frontend: `npm run dev`


### Production Deployment
1. Deploy Firebase Functions: `firebase deploy --only functions`
2. Set `NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL` to production URL
3. Deploy frontend: `npm run deploy`

## Migration Notes

- All existing components continue to work without changes
- The blog service interface remains the same
- Error handling has been improved
- Performance should be better with server-side processing
- Caching is handled by the Firebase Functions
- **Cache utilities have been temporarily disabled** to prevent fetch interception issues

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure Firebase Functions has CORS enabled
2. **Authentication Errors**: Check Firebase Auth configuration
3. **Network Errors**: Verify the Firebase Functions URL is correct
4. **Index Errors**: Ensure Firestore indexes are created
5. **Fetch Interception**: Cache utilities have been disabled to prevent API issues

### Debug Steps

1. Check browser console for errors

3. Check Firebase Functions logs: `firebase functions:log`
4. Verify environment variables are set correctly
5. Test API directly: `curl "http://127.0.0.1:5001/samridhya-website/us-central1/api?action=health"`

## Current Status

✅ **Integration Complete**
- Firebase Functions API is working locally
- Frontend services updated to use API

- Cache utilities disabled to prevent conflicts
- Local emulator integration working

🔄 **Next Steps**
1. Test all blog functionality
2. Add sample data to Firestore
3. Test CMS operations
4. Monitor performance
5. Re-enable cache utilities with proper API exclusion

## Sample API Tests

```bash
# Health check
curl "http://127.0.0.1:5001/samridhya-website/us-central1/api?action=health"

# Get posts
curl "http://127.0.0.1:5001/samridhya-website/us-central1/api?action=getPosts&limit=5"

# Get categories
curl "http://127.0.0.1:5001/samridhya-website/us-central1/api?action=getCategories"
``` 