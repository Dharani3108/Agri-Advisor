/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'hi', 'ta', 'te', 'mr', 'kn', 'bn'],
    defaultLocale: 'hi',
    localeDetection: false,
  },
  images: {
    domains: ['localhost', 'api.agriadvisor.com'],
    formats: ['image/webp', 'image/avif'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
