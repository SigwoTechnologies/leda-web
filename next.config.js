/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL,
        pathname: '/ipfs/**',
      },
    ],
  },
};

module.exports = nextConfig;
