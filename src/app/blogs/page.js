import BlogsMain from "@/components/layout/main/BlogsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import { Suspense } from "react";

export const metadata = {
  title: "Blog - Dev Mohan",
  description:
    "Developer blog on frontend, backend, cloud, AI, and engineering practices.",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BLOG_URL || "https://blog.devmohan.in",
  },
};

export default function Blogs() {
  return (
    <PageWrapper isInnerPage={true}>
      {/* Suspense boundary: BlogsMain reads useSearchParams; without this the
          whole page deopts to client-side rendering. */}
      <Suspense fallback={null}>
        <BlogsMain />
      </Suspense>
    </PageWrapper>
  );
}
