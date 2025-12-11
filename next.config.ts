import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'deisishop.pythonanywhere.com',
        port: '',
        pathname: '/media/**', 
      },
    ],
  },
};

export default nextConfig;