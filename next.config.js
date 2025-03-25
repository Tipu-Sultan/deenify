/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true, // Catches potential issues
  images: {
    domains: ['images.unsplash.com','plus.unsplash.com'], // Correct hostname for Unsplash images
  },
};

module.exports = nextConfig;