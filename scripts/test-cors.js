#!/usr/bin/env node

/**
 * CORS Test Script
 * This script tests the CORS configuration of the Firebase Functions API
 */

const https = require('https');
const http = require('http');

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'https://api-brz76cmlca-uc.a.run.app';
const TEST_ENDPOINTS = [
  '/health',
  '/api/blog/posts',
  '/api/blog/categories'
];

// Test origins
const TEST_ORIGINS = [
  'http://localhost:3000',
  'https://samridhya-website.web.app',
  'https://samridhya.com',
  'https://invalid-origin.com'
];

function makeRequest(url, origin = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'CORS-Test-Script/1.0'
      }
    };

    if (origin) {
      options.headers['Origin'] = origin;
    }

    const client = urlObj.protocol === 'https:' ? https : http;
    
    const req = client.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function testCORS() {
  console.log('🔍 Testing CORS Configuration...\n');
  console.log(`API Base URL: ${API_BASE_URL}\n`);

  for (const endpoint of TEST_ENDPOINTS) {
    console.log(`📡 Testing endpoint: ${endpoint}`);
    console.log('─'.repeat(50));

    // Test without origin
    try {
      console.log('\n1. Testing without Origin header:');
      const response1 = await makeRequest(`${API_BASE_URL}${endpoint}`);
      console.log(`   Status: ${response1.statusCode}`);
      console.log(`   CORS Headers:`);
      console.log(`     Access-Control-Allow-Origin: ${response1.headers['access-control-allow-origin'] || 'Not set'}`);
      console.log(`     Access-Control-Allow-Methods: ${response1.headers['access-control-allow-methods'] || 'Not set'}`);
      console.log(`     Access-Control-Allow-Headers: ${response1.headers['access-control-allow-headers'] || 'Not set'}`);
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }

    // Test with different origins
    for (const origin of TEST_ORIGINS) {
      try {
        console.log(`\n2. Testing with Origin: ${origin}`);
        const response2 = await makeRequest(`${API_BASE_URL}${endpoint}`, origin);
        console.log(`   Status: ${response2.statusCode}`);
        console.log(`   CORS Headers:`);
        console.log(`     Access-Control-Allow-Origin: ${response2.headers['access-control-allow-origin'] || 'Not set'}`);
        console.log(`     Access-Control-Allow-Methods: ${response2.headers['access-control-allow-methods'] || 'Not set'}`);
        console.log(`     Access-Control-Allow-Headers: ${response2.headers['access-control-allow-headers'] || 'Not set'}`);
        
        // Check if CORS is working
        const corsOrigin = response2.headers['access-control-allow-origin'];
        if (corsOrigin === '*' || corsOrigin === origin) {
          console.log(`   ✅ CORS: Allowed`);
        } else if (corsOrigin) {
          console.log(`   ⚠️  CORS: Partially allowed (${corsOrigin})`);
        } else {
          console.log(`   ❌ CORS: Not configured`);
        }
      } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
      }
    }

    // Test OPTIONS preflight request
    try {
      console.log('\n3. Testing OPTIONS preflight request:');
      const response3 = await makeRequest(`${API_BASE_URL}${endpoint}`, 'http://localhost:3000');
      console.log(`   Status: ${response3.statusCode}`);
      console.log(`   Preflight Headers:`);
      console.log(`     Access-Control-Allow-Origin: ${response3.headers['access-control-allow-origin'] || 'Not set'}`);
      console.log(`     Access-Control-Allow-Methods: ${response3.headers['access-control-allow-methods'] || 'Not set'}`);
      console.log(`     Access-Control-Allow-Headers: ${response3.headers['access-control-allow-headers'] || 'Not set'}`);
      console.log(`     Access-Control-Max-Age: ${response3.headers['access-control-max-age'] || 'Not set'}`);
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }

    console.log('\n' + '='.repeat(60) + '\n');
  }

  console.log('🎉 CORS testing completed!');
}

// Run the test
if (require.main === module) {
  testCORS().catch(console.error);
}

module.exports = { testCORS, makeRequest }; 