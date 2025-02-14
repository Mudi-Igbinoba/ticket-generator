import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/about',
        destination: '/',
        permanent: true
      },
      // Wildcard path matching
      {
        source: '/tickets',
        destination: '/',
        permanent: true
      }
    ];
  }
};

export default nextConfig;
