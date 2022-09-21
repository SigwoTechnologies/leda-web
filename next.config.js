/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // TODO: enable eslint when the project is all typescript
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
