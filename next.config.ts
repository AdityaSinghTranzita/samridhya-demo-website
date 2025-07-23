// next.config.js

import { hostname } from "os"

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
      
    ],
  },
}

module.exports = nextConfig
