import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
