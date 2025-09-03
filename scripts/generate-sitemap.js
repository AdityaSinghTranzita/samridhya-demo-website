const fs = require('fs');
const path = require('path');

// Function to escape XML special characters
function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Function to generate sitemap XML
function generateSitemapXml(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${escapeXml(url.lastmod)}</lastmod>
    ${url.changefreq ? `<changefreq>${escapeXml(url.changefreq)}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;
}

// Function to fetch blog posts from API
async function fetchBlogPosts() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL || 'https://api-brz76cmlca-uc.a.run.app';
    const response = await fetch(`${apiUrl}/api/blog/posts?status=published`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`✅ Fetched ${data.data?.posts?.length || 0} published blog posts from API`);
    return data.data?.posts || [];
  } catch (error) {
    console.error('⚠️ Could not fetch blog posts from API:', error.message);
    console.log('📝 Using fallback blog URLs...');
    return [];
  }
}

// Function to convert Firestore timestamp to ISO string
function getDateString(dateValue) {
  if (!dateValue) return new Date().toISOString();
  
  if (dateValue.toDate && typeof dateValue.toDate === 'function') {
    // Firestore timestamp
    return dateValue.toDate().toISOString();
  } else if (dateValue._seconds) {
    // Firestore timestamp with _seconds
    return new Date(dateValue._seconds * 1000).toISOString();
  } else if (dateValue.seconds) {
    // Firestore timestamp with seconds
    return new Date(dateValue.seconds * 1000).toISOString();
  } else {
    // Regular date string or Date object
    return new Date(dateValue).toISOString();
  }
}

async function generateSitemap() {
  try {
    console.log('🔧 Generating dynamic sitemap...');
    
    const baseUrl = 'https://samridhya.com';
    const now = new Date().toISOString();
    
    // Generate static URLs
    const staticUrls = [
      {
        loc: baseUrl,
        lastmod: now,
        changefreq: 'weekly',
        priority: 1.0
      },
      {
        loc: `${baseUrl}/about`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        loc: `${baseUrl}/blog`,
        lastmod: now,
        changefreq: 'daily',
        priority: 0.9
      },
      {
        loc: `${baseUrl}/contact`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/partners`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/loans`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        loc: `${baseUrl}/calculators`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      }
    ];
    
    // Fetch dynamic blog posts from API
    const blogPosts = await fetchBlogPosts();
    
    // Generate blog URLs from fetched posts
    const blogUrls = blogPosts.map(post => ({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: getDateString(post.updatedAt || post.publishedAt || post.createdAt),
      changefreq: 'monthly',
      priority: post.featured ? 0.8 : 0.6
    }));
    
    // Combine all URLs
    const allUrls = [...staticUrls, ...blogUrls];
    
    // Generate the sitemap XML
    const sitemap = generateSitemapXml(allUrls);
    
    // Write to public directory
    const outputPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, sitemap);
    
    console.log(`✅ Sitemap generated successfully!`);
    console.log(`📁 Location: ${outputPath}`);
    console.log(`📊 Total URLs: ${allUrls.length}`);
    console.log(`📝 Static URLs: ${staticUrls.length}`);
    console.log(`📝 Blog URLs: ${blogUrls.length}`);
    
    // Also generate sitemap index
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://samridhya.com/sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;
    
    const indexOutputPath = path.join(__dirname, '../public/sitemap-index.xml');
    fs.writeFileSync(indexOutputPath, sitemapIndex);
    
    console.log(`✅ Sitemap index generated successfully!`);
    console.log(`📁 Location: ${indexOutputPath}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the script
generateSitemap();
