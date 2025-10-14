/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  assetPrefix: '/',

  images: {
    unoptimized: true,
    domains: [
      'firebasestorage.googleapis.com',
      'samridhya.com',
      'www.samridhya.com',
      'lh3.googleusercontent.com', // Firebase Auth profile images
      'upload.wikimedia.org',      // Google Play Store badge
      'developer.apple.com',       // App Store badge
    ],
  },

  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'react-icons',
      'lucide-react',
      '@headlessui/react',
      'date-fns',
      'lodash',
      'clsx',
      'tailwind-merge',
    ],
    scrollRestoration: true,
    optimizeCss: true,
  },

  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  skipTrailingSlashRedirect: true,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          { key: 'Content-Type', value: 'text/xml' },
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/sitemap-index.xml',
        headers: [
          { key: 'Content-Type', value: 'text/xml' },
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
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

      config.resolve.alias = {
        ...config.resolve.alias,
        '@': require('path').resolve(__dirname, 'src'),
      };
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    if (!isServer) {
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

  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

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

  serverRuntimeConfig: {
    firebaseServiceAccount: process.env.FIREBASE_SERVICE_ACCOUNT,
  },
};

module.exports = nextConfig;
