/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  env: {
    API_URL: process.env.API_URL,
    API_PREFIX: process.env.API_PREFIX,
    API_VERSION: process.env.API_VERSION,
    REFRESH_API: process.env.REFRESH_API,
  },
};

export default nextConfig;
