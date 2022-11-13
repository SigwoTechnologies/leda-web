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
        hostname: 'chocolate-impressed-bandicoot-860.mypinata.cloud',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
