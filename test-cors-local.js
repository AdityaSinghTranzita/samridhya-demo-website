#!/usr/bin/env node

/**
 * Local CORS Test Script
 * This script tests the CORS configuration locally before deployment
 */

const express = require('express');
const app = express();

// Simulate the CORS configuration from our Firebase Functions
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Define allowed origins
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'https://samridhya.com',
    'https://www.samridhya.com',
    'https://samridhya-website.web.app',
    'https://samridhya-website.firebaseapp.com',
    'https://samridhya-website.vercel.app',
    'https://samridhya.vercel.app'
  ];
  
  // Set CORS headers
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Access-Control-Request-Method, Access-Control-Request-Headers, Cache-Control, Pragma, Expires');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  
  next();
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ 
    message: 'CORS test successful',
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🧪 Local CORS test server running on http://localhost:${PORT}`);
  console.log('📋 Test with: curl -H "Origin: https://samridhya-website.web.app" http://localhost:5000/test');
});

module.exports = app; 