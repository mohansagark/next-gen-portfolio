/** @type {import('next').NextConfig} */

const nextConfig = {
  // Enable static export for GitHub Actions deployment
  output: "export",

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Configure trailing slash for better static hosting
  trailingSlash: true,

  // Disable server-side features for static export
  experimental: {
    appDir: true,
  },

  // Configure asset prefix for production builds
  assetPrefix: process.env.NODE_ENV === "production" ? "" : "",

  // Configure base path if needed (useful for subdirectory deployments)
  // basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
};

export default nextConfig;
