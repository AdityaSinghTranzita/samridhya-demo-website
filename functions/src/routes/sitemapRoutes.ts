import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

// Function to escape XML special characters
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Function to generate sitemap XML
function generateSitemapXml(urls: Array<{
  loc: string;
  lastmod: string;
  changefreq?: string;
  priority?: number;
}>): string {
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

// Function to convert Firestore timestamp to ISO string
function getDateString(dateValue: any): string {
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

// Cache for sitemap data
let sitemapCache: {
  xml: string;
  lastGenerated: number;
  urls: any[];
} | null = null;

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function generateSitemap(req: Request, res: Response) {
  try {
    const baseUrl = 'https://samridhya.com';
    const now = new Date().toISOString();
    
    // Check cache first
    if (sitemapCache && (Date.now() - sitemapCache.lastGenerated) < CACHE_DURATION) {
      console.log('📄 Serving sitemap from cache');
      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes
      res.setHeader('Last-Modified', new Date(sitemapCache.lastGenerated).toUTCString());
      return res.send(sitemapCache.xml);
    }
    
    console.log('🔧 Generating fresh sitemap...');
    
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
        loc: `${baseUrl}/calculators`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      // Individual loan pages
      {
        loc: `${baseUrl}/loans/personal-loan`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        loc: `${baseUrl}/loans/business-loan`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        loc: `${baseUrl}/loans/education-loan`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        loc: `${baseUrl}/loans/medical-loan`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        loc: `${baseUrl}/loans/travel-loan`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        loc: `${baseUrl}/loans/wedding-loan`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8
      },
      // Individual calculator pages
      {
        loc: `${baseUrl}/calculators/personal-loan-calculator`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/business-loan-calculator`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/auto-loan-calculator`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/mortgage-calculator`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/loan-calculator`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/amortization-calculator`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/refinance-calculator`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },

      {
        loc: `${baseUrl}/calculators/sip-calculator`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/fd-calculator`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/rd-calculator`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/lumpsum-calculator`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/compound-interest`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/simple-interest-calculator`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/future-value-calculator`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/roi-calculator`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/inflation-calculator`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/currency-converter`,
        lastmod: now,
        changefreq: 'daily',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/income-tax`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/gst-calculator`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/budget-calculator`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/gold-loan-calculator`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/retirement-calculator`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/savings-goal`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/child-planning`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/net-worth`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/debt-to-income`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/credit-card-payoff`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/credit-score-checker`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/calculators/mortgage-vs-rent`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      // Policy pages
      {
        loc: `${baseUrl}/privacy-policy`,
        lastmod: now,
        changefreq: 'yearly',
        priority: 0.3
      },
      {
        loc: `${baseUrl}/term-of-use`,
        lastmod: now,
        changefreq: 'yearly',
        priority: 0.3
      },
      {
        loc: `${baseUrl}/intellectual-property-policy`,
        lastmod: now,
        changefreq: 'yearly',
        priority: 0.3
      },
      {
        loc: `${baseUrl}/grievance-redressal-policy`,
        lastmod: now,
        changefreq: 'yearly',
        priority: 0.3
      }
    ];
    
    // Fetch dynamic blog posts from Firestore
    const db = admin.firestore();
    const blogPostsSnapshot = await db
      .collection('blog-posts')
      .where('status', '==', 'published')
      .orderBy('publishedAt', 'desc')
      .get();
    
    const blogPosts = blogPostsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`✅ Fetched ${blogPosts.length} published blog posts from Firestore`);
    
    // Generate blog URLs from fetched posts
    const blogUrls = blogPosts.map((post: any) => ({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: getDateString(post.updatedAt || post.publishedAt || post.createdAt),
      changefreq: 'daily',
      priority: post.featured ? 0.8 : 0.6
    }));
    
    // Combine all URLs
    const allUrls = [...staticUrls, ...blogUrls];
    
    // Generate the sitemap XML
    const sitemapXml = generateSitemapXml(allUrls);
    
    // Update cache
    sitemapCache = {
      xml: sitemapXml,
      lastGenerated: Date.now(),
      urls: allUrls
    };
    
    // Set appropriate headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes
    res.setHeader('Last-Modified', new Date().toUTCString());
    
    console.log(`✅ Sitemap generated successfully!`);
    console.log(`📊 Total URLs: ${allUrls.length}`);
    console.log(`📝 Static URLs: ${staticUrls.length}`);
    console.log(`📝 Blog URLs: ${blogUrls.length}`);
    
    return res.send(sitemapXml);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate sitemap'
    });
  }
}

export async function generateSitemapIndex(req: Request, res: Response) {
  try {
    const baseUrl = 'https://samridhya.com';
    const now = new Date().toISOString();
    
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;
    
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes
    res.setHeader('Last-Modified', new Date().toUTCString());
    
    console.log('✅ Sitemap index generated successfully!');
    return res.send(sitemapIndex);
    
  } catch (error) {
    console.error('❌ Error generating sitemap index:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate sitemap index'
    });
  }
}

// Function to clear sitemap cache (called when content changes)
export function clearSitemapCache() {
  sitemapCache = null;
  console.log('🗑️ Sitemap cache cleared');
}
