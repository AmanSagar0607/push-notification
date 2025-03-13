/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  fallbacks: {
    document: '/offline', // Fix for static export in App Router
  },
});

const nextConfig = {
  output: 'export', // Ensure compatibility with static export
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
};

module.exports = withPWA(nextConfig);
