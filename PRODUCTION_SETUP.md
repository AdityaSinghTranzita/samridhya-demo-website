# Production Setup Guide

This guide will help you deploy your updated frontend to production with the new API integration.

## Environment Configuration

Create a `.env.production` file in your project root with the following configuration:

```env
# Production Environment Configuration
NODE_ENV=production

# API Configuration
NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL=https://api-brz76cmlca-uc.a.run.app

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your-ga-id-here

# Performance
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING=true
```

## Build and Deploy

### 1. Build the Application

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test the production build locally
npm start
```

### 2. Deploy to Firebase Hosting

```bash
# Deploy to Firebase
firebase deploy --only hosting

# Or deploy everything
firebase deploy
```

### 3. Deploy Functions (if needed)

```bash
# Navigate to functions directory
cd functions

# Install dependencies
npm install

# Deploy functions
firebase deploy --only functions
```

## Production Features

### ✅ API Integration
- All blog functionality now uses the Firebase Functions API
- Proper error handling and fallbacks
- Health check monitoring
- Optimized data loading

### ✅ Performance Optimizations
- Client-side rendering for better UX
- Proper loading states
- Error boundaries
- Optimized images and assets

### ✅ SEO Optimizations
- Structured data (JSON-LD)
- Open Graph meta tags
- Twitter Card meta tags
- Proper meta descriptions and titles

### ✅ User Experience
- Responsive design
- Smooth animations
- Loading indicators
- Error messages
- Search functionality
- Category filtering
- Pagination

### ✅ CMS Features
- Create, edit, and delete blog posts
- Draft and published status management
- Rich text editor
- Image upload support
- Category and tag management

## Monitoring and Analytics

### 1. API Health Monitoring
The blog page includes API health status display to monitor connectivity.

### 2. Error Tracking
All API calls include proper error handling and logging.

### 3. Performance Monitoring
Built-in performance tracking for page loads and user interactions.

## Security Considerations

### 1. Environment Variables
- Never commit sensitive data to version control
- Use environment variables for configuration
- Validate all user inputs

### 2. API Security
- CORS is properly configured
- Rate limiting is implemented
- Input validation on all endpoints

### 3. Authentication
- CMS requires proper authentication
- Session management is secure
- Role-based access control

## Troubleshooting

### Common Issues

1. **API Connection Issues**
   - Check the `NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL` environment variable
   - Verify Firebase Functions are deployed and running
   - Check CORS configuration

2. **Build Errors**
   - Ensure all dependencies are installed
   - Check for TypeScript errors
   - Verify environment variables are set

3. **Deployment Issues**
   - Check Firebase project configuration
   - Verify hosting rules
   - Check function deployment status

### Debug Mode

To enable debug mode for troubleshooting:

```env
NEXT_PUBLIC_DEBUG_MODE=true
```

This will show additional logging and error information.

## Performance Checklist

- [ ] Images are optimized and compressed
- [ ] CSS and JS are minified
- [ ] CDN is configured for static assets
- [ ] Caching headers are set properly
- [ ] Database queries are optimized
- [ ] API responses are cached where appropriate

## SEO Checklist

- [ ] All pages have proper meta tags
- [ ] Structured data is implemented
- [ ] Sitemap is generated
- [ ] Robots.txt is configured
- [ ] Canonical URLs are set
- [ ] Open Graph tags are present
- [ ] Twitter Card tags are present

## Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify API connectivity
3. Check Firebase Functions logs
4. Review environment configuration
5. Test with debug mode enabled

---

**Last Updated**: December 2024
**Version**: 2.0.0 