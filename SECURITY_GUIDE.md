# Security Guide - API Endpoint Protection

## Overview
This guide explains the security measures implemented to protect your API endpoints from unauthorized access and exposure.

## Security Issues Fixed

### 1. Hardcoded API URLs Removed
- **Before**: API URLs were hardcoded in source files
- **After**: All API URLs are now configured via environment variables
- **Impact**: Prevents accidental exposure of production endpoints in source code

### 2. Environment Variable Configuration
- **Before**: Fallback URLs exposed actual endpoints
- **After**: Empty fallbacks with proper error handling
- **Impact**: Forces proper configuration and prevents default endpoint exposure

### 3. Documentation Security
- **Before**: Documentation contained actual project URLs
- **After**: Placeholder text with configuration instructions
- **Impact**: Prevents endpoint exposure in public documentation

## Environment Variables Setup

### Required Environment Variables

Create a `.env.local` file in your project root:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Functions URL
# Development (local emulator)
NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL=http://127.0.0.1:5001/your_project_id/us-central1/api

# Production (replace with your actual deployed function URL)
# NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL=https://your_region-your_project_id.cloudfunctions.net/api

# CORS Configuration (for Firebase Functions)
ALLOWED_ORIGIN_1=https://your-production-domain.com
ALLOWED_ORIGIN_2=https://your-staging-domain.com
ALLOWED_ORIGIN_3=https://your-cdn-domain.com
ALLOWED_ORIGIN_4=https://your-admin-domain.com
```

### Environment-Specific Configuration

#### Development
```bash
NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL=http://127.0.0.1:5001/your_project_id/us-central1/api
```

#### Production
```bash
NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL=https://your_region-your_project_id.cloudfunctions.net/api
```

## Security Best Practices

### 1. Environment Variables
- ✅ Use environment variables for all sensitive configuration
- ✅ Never commit `.env.local` to version control
- ✅ Use `.env.example` for documentation
- ❌ Never hardcode URLs in source files

### 2. API Access Control
- ✅ Implement proper authentication
- ✅ Use Firebase Auth tokens
- ✅ Validate user permissions
- ❌ Don't expose internal endpoints

### 3. CORS Configuration
- ✅ Configure allowed origins properly
- ✅ Restrict to specific domains
- ❌ Don't use wildcard origins in production

### 4. Error Handling
- ✅ Don't expose internal error details
- ✅ Log errors server-side
- ✅ Return generic error messages to clients

## Files Modified for Security

### Source Code Files
- `src/config/api.ts` - Removed hardcoded fallback URLs
- `src/services/apiService.ts` - Removed hardcoded fallback URLs


### Configuration Files
- `test-frontend-api.js` - Added environment variable validation
- `deploy-production.sh` - Replaced hardcoded URLs with placeholders
- `deploy-functions.sh` - Replaced hardcoded URLs with placeholders
- `functions/src/middleware/cors.ts` - Replaced hardcoded domains with environment variables

### Documentation Files
- `SETUP_GUIDE.md` - Replaced actual URLs with placeholders
- `API_STRUCTURE.md` - Replaced actual URLs with placeholders
- `FIREBASE_FUNCTIONS_INTEGRATION.md` - Replaced actual URLs with placeholders
- `functions/API_USAGE.md` - Updated with generic examples

## Validation

### Environment Variable Check
The application now validates that required environment variables are set:

```javascript
if (!API_BASE_URL) {
  console.error('API_BASE_URL is not configured. Please set NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL environment variable.');
  process.exit(1);
}
```

### Runtime Validation
- API service checks for valid base URL before making requests
- Graceful error handling when environment variables are missing
- Clear error messages for configuration issues

## Deployment Security

### Production Deployment
1. Set environment variables in your hosting platform
2. Never commit production URLs to version control
3. Use different URLs for different environments
4. Regularly rotate API keys and tokens

### Environment Separation
- **Development**: Local emulator URLs
- **Staging**: Separate staging environment
- **Production**: Production environment URLs

## Monitoring and Logging

### Security Monitoring
- Monitor API access patterns
- Log authentication failures
- Track rate limiting violations
- Alert on suspicious activity

### Error Logging
- Log all API errors server-side
- Don't expose internal errors to clients
- Use structured logging for analysis

## Additional Security Measures

### 1. Rate Limiting
Implement rate limiting on your API endpoints to prevent abuse.

### 2. Input Validation
Validate all input data to prevent injection attacks.

### 3. HTTPS Only
Ensure all API communication uses HTTPS in production.

### 4. Regular Updates
Keep dependencies updated to patch security vulnerabilities.

## Troubleshooting

### Common Issues

#### "API_BASE_URL is not configured"
**Solution**: Set the `NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL` environment variable.

#### "Network error: Unable to connect to API"
**Solution**: Check that your Firebase Functions are deployed and accessible.

#### "CORS error"
**Solution**: Verify CORS configuration in your Firebase Functions.

## Support

For security-related issues or questions:
1. Check this security guide
2. Review Firebase security documentation
3. Contact your development team
4. Consider security audit for production deployments 