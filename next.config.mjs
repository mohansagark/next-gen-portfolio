import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const perfAudit = process.env.NEXT_PUBLIC_SKIP_HEAVY_MEDIA === "1";

const auditAliases = perfAudit
  ? {
      "@/components/shared/others/ShellExtras.full": path.resolve(
        __dirname,
        "src/components/shared/others/ShellExtras.audit.js",
      ),
      "@/components/providers/ContentProvider": path.resolve(
        __dirname,
        "src/components/providers/ContentProvider.audit.js",
      ),
      "@/app/globals.css": path.resolve(
        __dirname,
        "src/app/globals.audit.css",
      ),
      "@/app/css/backToTop.css": path.resolve(
        __dirname,
        "src/app/css/backToTop.audit.css",
      ),
    }
  : {};

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

  // Next 16 defaults to Turbopack; mirror aliases for both bundlers.
  turbopack: {
    resolveAlias: auditAliases,
  },

  // Used when CI runs `next build --webpack`.
  webpack: (config) => {
    if (perfAudit) {
      config.resolve.alias = {
        ...config.resolve.alias,
        ...auditAliases,
      };
    }
    return config;
  },
};

export default nextConfig;
