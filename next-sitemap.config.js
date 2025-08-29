/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://samridhya.com',   
    generateRobotsTxt: true,            
    sitemapSize: 5000,
    changefreq: 'weekly',
    priority: 0.7,
    exclude: ['/api/*', '/server-scripts/*'],
    robotsTxtOptions: {
      additionalSitemaps: [
        'https://samridhya.com/sitemap.xml',
      ],
    },
  };
  