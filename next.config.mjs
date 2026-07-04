/** @type {import('next').NextConfig} */

const nextConfig = {
  // Images served unoptimized (includes remote raw.githubusercontent.com URLs)
  images: {
    unoptimized: true,
  },

  trailingSlash: true,
};

export default nextConfig;
