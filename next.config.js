/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org", "bit.ly", "files.stripe.com"],
  },
};

module.exports = nextConfig;
