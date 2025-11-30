import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/greeting-flower',
        destination: '/wildflower/index.html',
      },
      {
        source: '/20150213194513_1_0_0c9c3c2/:path*',
        destination: '/wildflower/20150213194513_1_0_0c9c3c2/:path*',
      },
      {
        source: '/favicon.ico',
        destination: '/wildflower/favicon.ico',
      },
    ];
  },
};

export default nextConfig;
