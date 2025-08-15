# CORS Configuration Guide

## Overview

This document explains the CORS (Cross-Origin Resource Sharing) configuration for the Samridhya website backend API.

## Current Configuration

### Backend CORS Setup

The backend uses a comprehensive CORS configuration with the following features:

1. **Origin Validation**: Only allows requests from specific origins
2. **Method Support**: Supports GET, POST, PUT, DELETE, OPTIONS, PATCH
3. **Header Support**: Includes all necessary headers for modern web applications
4. **Credentials Support**: Enables credentials for authenticated requests
5. **Security Headers**: Additional security headers for protection

### Allowed Origins

```javascript
const allowedOrigins = [
  'http://localhost:3000',           // Local development
  'http://localhost:3001',           // Alternative local port
  'http://localhost:3002',           // Alternative local port
  'https://samridhya.com',           // Production domain
  'https://www.samridhya.com',       // Production domain with www
  'https://samridhya-website.web.app', // Firebase hosting
  'https://samridhya-website.firebaseapp.com', // Firebase hosting
  'https://samridhya-website.vercel.app', // Vercel deployment
  'https://samridhya.vercel.app'     // Vercel deployment
];
```

### Allowed Headers

```javascript
const allowedHeaders = [
  'Content-Type',
  'Authorization',
  'X-Requested-With',
  'Accept',
  'Origin',
  'Access-Control-Request-Method',
  'Access-Control-Request-Headers',
  'Cache-Control',
  'Pragma',
  'Expires'
];
```

### Security Headers

The backend automatically adds these security headers to all responses:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Frontend Configuration

### API Service Headers

The frontend API service includes these headers in all requests:

```javascript
headers: {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
},
credentials: 'include'
```

## Testing CORS Configuration

### Using the Test Script

Run the CORS test script to verify configuration:

```bash
# Test with default API URL
node scripts/test-cors.js

# Test with custom API URL
API_BASE_URL=https://your-api-url.com node scripts/test-cors.js
```

### Manual Testing

You can also test CORS manually using curl:

```bash
# Test without origin
curl -I https://api-brz76cmlca-uc.a.run.app/health

# Test with origin
curl -I -H "Origin: http://localhost:3000" https://api-brz76cmlca-uc.a.run.app/health

# Test preflight request
curl -I -X OPTIONS -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  https://api-brz76cmlca-uc.a.run.app/api/blog/posts
```

### Browser Testing

Open browser developer tools and check the Network tab for CORS errors:

1. Open your website
2. Open Developer Tools (F12)
3. Go to Network tab
4. Make an API request
5. Check for CORS errors in the console

## Common CORS Issues and Solutions

### 1. "No 'Access-Control-Allow-Origin' header"

**Cause**: The server is not sending the CORS headers
**Solution**: Ensure the CORS middleware is properly configured and deployed

### 2. "Request header field X-Requested-With is not allowed"

**Cause**: The header is not in the allowed headers list
**Solution**: Add the header to the `allowedHeaders` array

### 3. "Method POST is not allowed"

**Cause**: The HTTP method is not in the allowed methods list
**Solution**: Add the method to the `methods` array

### 4. "Credentials flag is 'true', but the 'Access-Control-Allow-Origin' header is '*'"

**Cause**: Cannot use wildcard (*) with credentials
**Solution**: Set specific origins instead of wildcard

### 5. Preflight Request Failing

**Cause**: OPTIONS request not handled properly
**Solution**: Ensure OPTIONS method is allowed and preflight requests are handled

## Deployment

### Deploy CORS Changes

After making CORS changes, deploy the functions:

```bash
# Deploy to Firebase
cd samridhya-website
firebase deploy --only functions

# Or use the deployment script
./deploy.sh
```

### Verify Deployment

After deployment, test the CORS configuration:

```bash
# Run the test script
node scripts/test-cors.js

# Check function logs
firebase functions:log
```

## Environment-Specific Configuration

### Development

- All localhost origins are allowed
- Longer timeout for debugging
- Cache disabled for easier debugging

### Production

- Only specific production domains allowed
- Standard timeout
- Cache enabled for performance

## Monitoring and Debugging

### Function Logs

Check Firebase Function logs for CORS-related issues:

```bash
firebase functions:log --only api
```

### CORS Debugging

Enable CORS debugging by checking the console logs for:

- Origin validation messages
- Preflight request handling
- Header validation

### Performance Monitoring

Monitor CORS performance:

- Preflight request frequency
- Response times
- Error rates

## Security Considerations

### Origin Validation

- Always validate origins in production
- Don't use wildcard (*) with credentials
- Log unauthorized origin attempts

### Header Security

- Only allow necessary headers
- Validate header values
- Use security headers

### Rate Limiting

- Implement rate limiting for CORS requests
- Monitor for abuse
- Set appropriate limits

## Troubleshooting Checklist

- [ ] CORS middleware is properly configured
- [ ] Allowed origins include your domain
- [ ] Allowed methods include your HTTP method
- [ ] Allowed headers include your custom headers
- [ ] Credentials are properly configured
- [ ] Preflight requests are handled
- [ ] Security headers are set
- [ ] Function is deployed and running
- [ ] No firewall or proxy blocking requests
- [ ] Browser cache is cleared

## Support

If you encounter CORS issues:

1. Check the troubleshooting checklist
2. Run the CORS test script
3. Check Firebase Function logs
4. Verify deployment status
5. Test with different browsers
6. Check network connectivity

For additional help, refer to:
- [Firebase Functions CORS Documentation](https://firebase.google.com/docs/functions/http-events#using_cors)
- [MDN CORS Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Express CORS Documentation](https://expressjs.com/en/resources/middleware/cors.html) 