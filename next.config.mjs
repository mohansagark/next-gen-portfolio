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

  // Lighthouse "Missing source maps for large first-party JavaScript" —
  // safe to ship; only affects an opt-in debugging surface.
  productionBrowserSourceMaps: true,

  // Framing/origin-isolation headers only — no script-src/style-src CSP here.
  // This app has an inline boot script (theme init, layout.js) plus
  // GSAP/Framer Motion/Leo/Vercel Analytics; a real script-src policy needs
  // nonce plumbing and live browser verification neither of which is safe to
  // guess blind. These three are purely additive and can't break page
  // functionality.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
