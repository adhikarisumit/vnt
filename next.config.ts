import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [400, 640, 828, 1080, 1200, 1600, 1920, 2400],
  },
  async redirects() {
    return [
      // Legacy STUDIO URLs -> new locale-scoped routes.
      { source: '/PremiumHotel', destination: '/ja/hotels', permanent: true },
      { source: '/fuji-premium-hotel', destination: '/ja/hotels/fuji', permanent: true },
      { source: '/nagoya-premium-hotel', destination: '/ja/hotels/nagoya', permanent: true },
      { source: '/premium-toji', destination: '/ja/hotels/toji', permanent: true },
      { source: '/restaurant', destination: '/ja/dining', permanent: true },
      { source: '/geisyatei', destination: '/ja/dining/geisyatei', permanent: true },
      { source: '/warakutei-yakiniku', destination: '/ja/dining/warakutei-yakiniku', permanent: true },
      { source: '/warakutei-yakitori', destination: '/ja/dining/warakutei-yakitori', permanent: true },
      { source: '/ikegami', destination: '/ja/retail', permanent: true },
      { source: '/product', destination: '/ja/business', permanent: true },
      { source: '/company', destination: '/ja/company', permanent: true },
      { source: '/contact', destination: '/ja/contact', permanent: true },
      { source: '/reservation', destination: '/ja/reservation', permanent: true },
      { source: '/news', destination: '/ja/news', permanent: true },
    ];
  },
};

export default nextConfig;
