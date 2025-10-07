import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Build sırasında ESLint hatalarını görmezden gelir
  },
};

export default nextConfig;