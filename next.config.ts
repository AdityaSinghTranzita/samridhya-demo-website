/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'react-icons', 'lucide-react'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
