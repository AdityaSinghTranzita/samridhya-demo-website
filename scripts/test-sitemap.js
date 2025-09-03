const https = require('https');
const http = require('http');

// Test sitemap locally
async function testSitemap() {
  const baseUrl = 'http://localhost:3000';
  const sitemapUrl = `${baseUrl}/sitemap.xml`;
  
  console.log('🔍 Testing dynamic sitemap...');
  console.log(`📍 URL: ${sitemapUrl}`);
  
  try {
    const response = await fetch(sitemapUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const xml = await response.text();
    
    console.log('✅ Sitemap fetched successfully!');
    console.log(`📄 Content length: ${xml.length} characters`);
    
    // Check if it contains blog URLs
    const blogUrlCount = (xml.match(/\/blog\//g) || []).length;
    console.log(`📝 Blog URLs found: ${blogUrlCount}`);
    
    // Check if it's valid XML
    if (xml.includes('<?xml version="1.0"') && xml.includes('</urlset>')) {
      console.log('✅ Valid XML structure detected');
    } else {
      console.log('❌ Invalid XML structure');
    }
    
    // Show first few lines
    console.log('\n📋 First 500 characters:');
    console.log(xml.substring(0, 500) + '...');
    
    // Count total URLs
    const urlCount = (xml.match(/<url>/g) || []).length;
    console.log(`\n📊 Total URLs in sitemap: ${urlCount}`);
    
  } catch (error) {
    console.error('❌ Error testing sitemap:', error.message);
    console.log('\n💡 Make sure your development server is running: npm run dev');
  }
}

// Test production sitemap
async function testProductionSitemap() {
  const baseUrl = 'https://samridhya.com';
  const sitemapUrl = `${baseUrl}/sitemap.xml`;
  
  console.log('\n🌐 Testing production sitemap...');
  console.log(`📍 URL: ${sitemapUrl}`);
  
  try {
    const response = await fetch(sitemapUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const xml = await response.text();
    
    console.log('✅ Production sitemap fetched successfully!');
    console.log(`📄 Content length: ${xml.length} characters`);
    
    // Count URLs
    const urlCount = (xml.match(/<url>/g) || []).length;
    const blogUrlCount = (xml.match(/\/blog\//g) || []).length;
    
    console.log(`📊 Total URLs: ${urlCount}`);
    console.log(`📝 Blog URLs: ${blogUrlCount}`);
    
  } catch (error) {
    console.error('❌ Error testing production sitemap:', error.message);
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Sitemap Test Suite\n');
  
  await testSitemap();
  await testProductionSitemap();
  
  console.log('\n✨ Test completed!');
}

runTests().catch(console.error);
