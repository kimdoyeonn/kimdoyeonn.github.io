const { withContentlayer } = require('next-contentlayer2');

/** @type {import('next').NextConfig} */
const nextConfig = withContentlayer({
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
});

module.exports = nextConfig;
