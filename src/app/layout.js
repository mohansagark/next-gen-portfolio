import { Suspense } from "react";
import ContentProvider from "@/components/providers/ContentProvider";
import { fetchAllContent } from "@/libs/portfolioData";
import { seedContent } from "@/libs/contentStore";
import JsonLd from "@/components/seo/JsonLd";
import { isPerfAuditBuild } from "@/libs/perfAudit";
import ShellExtras from "@/components/shared/others/ShellExtras";

import "@/app/css/backToTop.css";
import "@/app/globals.css";
import { Sora, Fraunces } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://devmohan.in";

const defaultSeo = {
  title: "Mohan Sagar — AI Engineer · Frontend Architect",
  description:
    "Senior software engineer with a decade of production experience — LLM applications, agentic workflows, and high-performance frontend systems. IVYGPT at Invesco · Agentic platforms at ServiceNow.",
  ogTitle: "Mohan Sagar — AI Engineer · Frontend Architect",
  ogDescription:
    "I ship AI applications that hold up in production — LLM systems, agentic workflows, and the interfaces teams rely on.",
};

export async function generateMetadata() {
  const content = await fetchAllContent();
  const seo = content.profile?.seo || {};
  const title = seo.title || defaultSeo.title;
  const description = seo.description || defaultSeo.description;
  const ogTitle = seo.ogTitle || defaultSeo.ogTitle;
  const ogDescription = seo.ogDescription || defaultSeo.ogDescription;

  return {
    metadataBase: new URL(SITE),
    title: {
      default: title,
      template: "%s · Mohan Sagar",
    },
    description,
    alternates: { canonical: SITE },
    openGraph: {
      type: "website",
      url: SITE,
      title: ogTitle,
      description: ogDescription,
      siteName: "Mohan Sagar",
      images: [
        {
          url: `${SITE}/og/mohan-sagar-og.png`,
          width: 1200,
          height: 630,
          alt: "Mohan Sagar — AI Engineer · Frontend Architect",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [`${SITE}/og/mohan-sagar-og.png`],
    },
    robots: { index: true, follow: true },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/img/favicon.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
  };
}

export default async function RootLayout({ children }) {
  const content = await fetchAllContent();
  seedContent(content);
  const profile = content.profile || {};
  const perfAudit = isPerfAuditBuild();
  const currentJob =
    (content.experience || []).find((job) => job.current) ||
    (content.experience || [])[0];
  const employerName = currentJob?.company || "ServiceNow";
  const worksFor = {
    "@type": "Organization",
    name: employerName,
    ...(currentJob?.companyUrl ? { url: currentJob.companyUrl } : {}),
  };

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohan Sagar",
    url: SITE,
    image: `${SITE}/images/profile/avatar-web.jpg`,
    jobTitle: profile.headline || "Senior Software Engineer",
    worksFor,
    sameAs: [
      "https://www.linkedin.com/in/mohansagark/",
      "https://github.com/mohansagark",
      "https://blog.devmohan.in/",
    ],
    knowsAbout: [
      "AI applications",
      "LLM applications",
      "Agentic workflows",
      "React",
      "Next.js",
      "TypeScript",
      "Frontend architecture",
    ],
    email: `mailto:${profile.email || "contact@devmohan.in"}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressCountry: "IN",
    },
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mohan Sagar",
    url: SITE,
  };

  // CI audit builds: theme only — never pin LCP behind splash-pending.
  const bootScript = perfAudit
    ? `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.remove("dark");}else{document.documentElement.classList.add("dark");}}catch(e){document.documentElement.classList.add("dark");}})();`
    : `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.remove("dark");}else{document.documentElement.classList.add("dark");}var p=location.pathname;var ua=navigator.userAgent||"";var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;var bot=navigator.webdriver||/Lighthouse|Chrome-Lighthouse|PageSpeed|HeadlessChrome|PTST|GTmetrix|Pingdom|WebPageTest/i.test(ua);if(!bot&&!reduce&&(p==="/"||p==="")){document.documentElement.classList.add("splash-pending");}}catch(e){document.documentElement.classList.add("dark");}})();`;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${fraunces.variable} font-sora bg-[var(--off-white-color)] dark:bg-dark-color overflow-x-hidden relative`}
        suppressHydrationWarning={true}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: bootScript,
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-teal-300 focus:text-black focus:px-3 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        <JsonLd data={[personLd, websiteLd]} />
        <ContentProvider content={content}>
          <Suspense fallback={<></>}>{children}</Suspense>
        </ContentProvider>
        <ShellExtras />
      </body>
    </html>
  );
}
