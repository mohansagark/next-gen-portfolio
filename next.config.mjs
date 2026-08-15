/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.devmohan.in",
        pathname: "/images/**",
      },
    ],
  },

  trailingSlash: true,
};

export default nextConfig;
