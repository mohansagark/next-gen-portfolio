import ThmeModeSwither from "@/components/shared/others/ThmeModeSwither";
import LeoLoader from "@/components/shared/others/LeoLoader";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import ContentProvider from "@/components/providers/ContentProvider";
import { fetchAllContent } from "@/libs/portfolioData";
import { seedContent } from "@/libs/contentStore";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./css/animate.min.css";
import "./css/backToTop.css";
import "./css/flaticon_gerold.css";
import "./css/font-awesome-pro.min.css";
import "./css/glightbox.min.css";
import "./css/nice-select2.css";
import "./css/odometer-theme-default.css";
import "./globals.css";

export const metadata = {
  title: "Dev Mohan - Personal Portfolio React  NextJs Template",
  description: "Dev Mohan - Personal Portfolio React  NextJs Template",
};

export default async function RootLayout({ children }) {
  const content = await fetchAllContent();
  seedContent(content); // server-side store, for SSR of client components
  return (
    <html lang="en" className="dark ">
      <body
        className={`font-sora  dark:bg-dark-color overflow-x-hidden  relative`}
        suppressHydrationWarning={true}
      >
        <ContentProvider content={content}>
          <Suspense fallback={<></>}>{children}</Suspense>
        </ContentProvider>
        <ThmeModeSwither />
        <LeoLoader workerUrl={process.env.NEXT_PUBLIC_LEO_WORKER_URL} />
        <Analytics />
      </body>
    </html>
  );
}
