import ThmeModeSwither from "@/components/shared/others/ThmeModeSwither";
import LeoLoader from "@/components/shared/others/LeoLoader";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import ContentProvider from "@/components/providers/ContentProvider";
import { fetchAllContent } from "@/libs/portfolioData";
import { seedContent } from "@/libs/contentStore";
import JsonLd from "@/components/seo/JsonLd";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./css/animate.min.css";
import "./css/backToTop.css";
import "./css/flaticon_gerold.css";
import "./css/font-awesome-pro.min.css";
import "./globals.css";

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
    image: profile.avatar
      ? profile.avatar.startsWith("http")
        ? profile.avatar
        : `https://admin.devmohan.in${profile.avatar}`
      : undefined,
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

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sora bg-[var(--off-white-color)] dark:bg-dark-color overflow-x-hidden relative`}
        suppressHydrationWarning={true}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.remove("dark");}else{document.documentElement.classList.add("dark");}var p=location.pathname;if(p==="/"||p===""){document.documentElement.classList.add("splash-pending");}}catch(e){document.documentElement.classList.add("dark");}})();`,
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
        <ThmeModeSwither />
        <LeoLoader workerUrl={process.env.NEXT_PUBLIC_LEO_WORKER_URL} />
        {/* Analytics script 404s off Vercel (hurts Lighthouse Best Practices). */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
