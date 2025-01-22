import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'frosty-gates-d2d96b.netlify.app',
        port: '',
        pathname: '/.netlify/images/**',
        search: 'url',
      },
    ],
  },
};

export default nextConfig;
