import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        'https://res.cloudinary.com/dq3ztcghr/image/upload/v1753508303/single-fake-gold-dollar-coin-crop_xuzcwx.webp'
      ),
      new URL(
        'https://res.cloudinary.com/dq3ztcghr/image/upload/v1753601980/light-zoincas-transactions_ackkv2.png'
      ),
      new URL(
        'https://res.cloudinary.com/dq3ztcghr/image/upload/v1753601963/dark-zoincas-transactions_jtiuud.png'
      ),
    ],
  },
};

export default nextConfig;
