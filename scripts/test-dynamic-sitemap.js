const fetch = require('node-fetch');

async function testDynamicSitemap() {
  try {
    console.log('🧪 Testing dynamic sitemap...');
    
    // Test the dynamic sitemap endpoint
    const apiUrl = process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL || 'https://api-brz76cmlca-uc.a.run.app';
    const sitemapUrl = `${apiUrl}/sitemap.xml`;
    
    console.log(`📡 Fetching sitemap from: ${sitemapUrl}`);
    
    const response = await fetch(sitemapUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const sitemapXml = await response.text();
    
    console.log('✅ Sitemap fetched successfully!');
    console.log(`📊 Content length: ${sitemapXml.length} characters`);
    console.log(`📄 Content-Type: ${response.headers.get('content-type')}`);
    console.log(`⏰ Last-Modified: ${response.headers.get('last-modified')}`);
    console.log(`🗄️ Cache-Control: ${response.headers.get('cache-control')}`);
    
    // Parse and analyze the sitemap
    const urlMatches = sitemapXml.match(/<loc>(.*?)<\/loc>/g);
    const totalUrls = urlMatches ? urlMatches.length : 0;
    
    console.log(`🔗 Total URLs found: ${totalUrls}`);
    
    // Extract and display some URLs
    const urls = urlMatches ? urlMatches.map(match => match.replace(/<\/?loc>/g, '')) : [];
    console.log('\n📋 Sample URLs:');
    urls.slice(0, 5).forEach((url, index) => {
      console.log(`  ${index + 1}. ${url}`);
    });
    
    if (urls.length > 5) {
      console.log(`  ... and ${urls.length - 5} more URLs`);
    }
    
    // Check if it's valid XML
    if (sitemapXml.includes('<?xml version="1.0"') && sitemapXml.includes('<urlset')) {
      console.log('✅ Valid XML sitemap format detected');
    } else {
      console.log('⚠️ Warning: XML format may be invalid');
    }
    
    // Test cache behavior
    console.log('\n🔄 Testing cache behavior...');
    const startTime = Date.now();
    const response2 = await fetch(sitemapUrl);
    const endTime = Date.now();
    
    console.log(`⏱️ Second request took: ${endTime - startTime}ms`);
    
    if (response2.headers.get('x-cache') || response2.headers.get('cf-cache-status')) {
      console.log('✅ Cache headers detected');
    } else {
      console.log('ℹ️ No cache headers detected (this is normal for the first request)');
    }
    
  } catch (error) {
    console.error('❌ Error testing dynamic sitemap:', error.message);
    process.exit(1);
  }
}

// Run the test
testDynamicSitemap();
