/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Firebase hosting (only in production)
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
  }),
  trailingSlash: true,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
    domains: [
      'firebasestorage.googleapis.com',
      'samridhya.com',
      'www.samridhya.com',
      'lh3.googleusercontent.com', // For Firebase Auth profile images
      'upload.wikimedia.org', // For Google Play Store badge
      'developer.apple.com', // For App Store badge
    ],
  },
  
  // Enhanced experimental features for static export
  experimental: {
    optimizePackageImports: [
      'framer-motion', 
      'react-icons', 
      'lucide-react',
      '@headlessui/react',
      'date-fns',
      'lodash',
      'clsx',
      'tailwind-merge'
    ],
    scrollRestoration: true,
    optimizeCss: true,
  },
  
  // Enhanced compression and security
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  skipTrailingSlashRedirect: true,
  
  // Enhanced security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          
        ],
      },
    ];
  },
  
  // Temporarily disabled all redirects and rewrites to fix redirect loops
  // async redirects() {
  //   return [];
  // },
  
  // async rewrites() {
  //   return [];
  // },
  
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },
  
  // Enhanced webpack optimizations for static export
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimize bundle splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
      
      // Optimize module resolution
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': require('path').resolve(__dirname, 'src'),
      };
    }
    
    // Handle SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    // Optimize for static export
    if (!isServer) {
      // Remove server-only dependencies from client bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    
    return config;
  },
  
  // Enhanced environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Enhanced public runtime config
  publicRuntimeConfig: {
    firebaseConfig: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    },
    apiUrl: process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL,
    gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  },
  
  // Enhanced server runtime config
  serverRuntimeConfig: {
    firebaseServiceAccount: process.env.FIREBASE_SERVICE_ACCOUNT,
  },
};

module.exports = nextConfig;
