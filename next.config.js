/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["https://image.tmdb.org/","http://127.0.0.1","https://127.0.0.1"],
  },
};

module.exports = nextConfig;
