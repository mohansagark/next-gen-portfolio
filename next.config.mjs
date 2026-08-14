/** @type {import('next').NextConfig} */

const nextConfig = {
  // Images served unoptimized (includes remote raw.githubusercontent.com URLs)
  images: {
    unoptimized: true,
  },

  trailingSlash: true,

  async rewrites() {
    return [
      {
        source: "/ux/outpero",
        destination: "/ux/outpero/index.html",
      },
      {
        source: "/ux/outpero/",
        destination: "/ux/outpero/index.html",
      },
    ];
  },
};

export default nextConfig;
