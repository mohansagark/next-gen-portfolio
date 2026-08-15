/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.devmohan.in",
        // CMS uses /images/**; allow /img/** too for older/fakedata paths.
        pathname: "/**",
      },
    ],
  },

  trailingSlash: true,
};

export default nextConfig;
