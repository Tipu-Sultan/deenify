/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true, // Catches potential issues
  images: {
    domains: ['https://unsplash.com/'], // For Next.js Image component
  },
};

module.exports = nextConfig;


