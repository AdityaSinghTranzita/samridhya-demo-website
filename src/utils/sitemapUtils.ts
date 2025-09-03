import { BlogPost } from '../services/blogService';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

// Function to escape XML special characters
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateSitemapXml(urls: SitemapUrl[]): string {
  const baseUrl = 'https://samridhya.com';
  
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

export function generateStaticUrls(): SitemapUrl[] {
  const baseUrl = 'https://samridhya.com';
  const now = new Date().toISOString();
  
  return [
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
}

export function generateBlogUrls(posts: BlogPost[]): SitemapUrl[] {
  const baseUrl = 'https://samridhya.com';
  
  return posts.map(post => {
    // Handle Firestore timestamps and convert to ISO string
    const getDateString = (dateValue: any): string => {
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
    };

    return {
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: getDateString(post.updatedAt || post.publishedAt || post.createdAt),
      changefreq: 'monthly',
      priority: post.featured ? 0.8 : 0.6
    };
  });
}

export function generateSitemapIndexXml(sitemapUrls: string[]): string {
  const baseUrl = 'https://samridhya.com';
  const now = new Date().toISOString();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
${sitemapUrls.map(url => `  <sitemap>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;
}

export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function setSitemapHeaders(res: any, cacheTime: number = 3600): void {
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', `public, s-maxage=${cacheTime}, stale-while-revalidate=${cacheTime * 24}`);
}
