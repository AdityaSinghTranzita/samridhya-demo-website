# Dynamic Sitemap Setup

## Overview

This implementation provides a **dynamic sitemap** that automatically updates when you add new blog posts via your CMS, without requiring site redeployment. The sitemap is served as a static file but generated dynamically from your Firebase Functions.

## How It Works

### 1. Dynamic Generation
- The sitemap is generated on-demand by Firebase Functions
- It fetches all published blog posts from Firestore
- Combines static URLs with dynamic blog post URLs
- Returns properly formatted XML sitemap

### 2. Caching System
- **5-minute cache**: Reduces database queries and improves performance
- **Automatic cache invalidation**: When blog posts are created/updated/deleted
- **Proper HTTP headers**: Cache-Control, Last-Modified for SEO

### 3. Firestore Triggers
- Automatically clears sitemap cache when blog posts change
- No manual intervention required
- Real-time updates for search engines

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Search Engine │───▶│  Firebase Hosting │───▶│ Firebase Functions│
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                         │
                                                         ▼
                                                ┌─────────────────┐
                                                │   Firestore DB  │
                                                │  (blog-posts)   │
                                                └─────────────────┘
```

## URLs

- **Main Sitemap**: `https://samridhya.com/sitemap.xml`
- **Sitemap Index**: `https://samridhya.com/sitemap-index.xml`

## Features

### ✅ Automatic Updates
- New blog posts automatically appear in sitemap
- No manual sitemap regeneration needed
- No site redeployment required

### ✅ Performance Optimized
- 5-minute caching reduces database load
- Fast response times for search engines
- Proper HTTP caching headers

### ✅ SEO Friendly
- Valid XML sitemap format
- Includes lastmod, changefreq, and priority
- Proper XML escaping for special characters

### ✅ Real-time Cache Invalidation
- Firestore triggers clear cache on content changes
- Immediate updates when posts are published/unpublished
- Maintains data consistency

## Implementation Details

### Files Created/Modified

1. **`functions/src/routes/sitemapRoutes.ts`**
   - Dynamic sitemap generation logic
   - Caching mechanism
   - XML formatting functions

2. **`functions/src/triggers/blogTriggers.ts`**
   - Firestore triggers for cache invalidation
   - Automatic cache clearing on content changes

3. **`functions/src/index.ts`**
   - Added sitemap routes
   - Exported Firestore triggers

4. **`firebase.json`**
   - Added rewrites to serve sitemap from functions
   - Configured hosting to route sitemap requests

5. **`scripts/test-dynamic-sitemap.js`**
   - Test script to verify functionality
   - Performance and cache testing

## Usage

### For Search Engines
Search engines will automatically discover and use your sitemap at:
- `https://samridhya.com/sitemap.xml`

### For CMS Users
When you add/edit/delete blog posts via your CMS:
1. The Firestore trigger automatically detects the change
2. Sitemap cache is cleared
3. Next request generates fresh sitemap with new content
4. No manual action required

### Testing
Run the test script to verify everything works:
```bash
node scripts/test-dynamic-sitemap.js
```

## Configuration

### Cache Duration
You can adjust the cache duration in `functions/src/routes/sitemapRoutes.ts`:
```typescript
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
```

### Static URLs
Add or modify static URLs in the `generateSitemap` function:
```typescript
const staticUrls = [
  {
    loc: baseUrl,
    lastmod: now,
    changefreq: 'weekly',
    priority: 1.0
  },
  // Add more static URLs here
];
```

### Blog Post Priority
Featured posts get higher priority in the sitemap:
```typescript
priority: post.featured ? 0.8 : 0.6
```

## Deployment

1. **Deploy Firebase Functions**:
   ```bash
   firebase deploy --only functions
   ```

2. **Deploy Hosting Configuration**:
   ```bash
   firebase deploy --only hosting
   ```

3. **Test the Sitemap**:
   ```bash
   node scripts/test-dynamic-sitemap.js
   ```

## Monitoring

### Logs
Check Firebase Functions logs for sitemap generation:
```bash
firebase functions:log --only api
```

### Performance
Monitor sitemap response times and cache hit rates in Firebase Console.

## Benefits

1. **No Redeployment**: Add content via CMS, sitemap updates automatically
2. **SEO Optimized**: Search engines get fresh, accurate sitemap data
3. **Performance**: Caching reduces database load and improves response times
4. **Scalable**: Handles unlimited blog posts without performance degradation
5. **Reliable**: Firestore triggers ensure data consistency

## Troubleshooting

### Sitemap Not Updating
1. Check Firestore triggers are deployed
2. Verify blog post status is "published"
3. Check Firebase Functions logs for errors

### Performance Issues
1. Increase cache duration if needed
2. Check Firestore query performance
3. Monitor function execution times

### XML Format Issues
1. Verify XML escaping functions
2. Check for special characters in blog post titles/slugs
3. Validate sitemap with online tools

## Future Enhancements

- **Multiple Sitemaps**: Split into multiple files for large sites
- **Image Sitemaps**: Include blog post images
- **News Sitemaps**: Special format for news articles
- **Analytics**: Track sitemap usage and performance
