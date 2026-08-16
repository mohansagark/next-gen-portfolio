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
    // Skill/logo icons from the CMS are a mix of raster and SVG. next/image
    // rejects SVG sources by default (they can carry <script>); this is the
    // documented safe way to allow them — served with an isolating CSP
    // sandbox and forced download disposition, never executed inline.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
