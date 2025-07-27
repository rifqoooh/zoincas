import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        'https://res.cloudinary.com/dq3ztcghr/image/upload/v1753508303/single-fake-gold-dollar-coin-crop_xuzcwx.webp'
      ),
    ],
  },
};

export default nextConfig;
