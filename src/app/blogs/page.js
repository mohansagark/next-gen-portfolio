import BlogsMain from "@/components/layout/main/BlogsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import { Suspense } from "react";

export const metadata = {
  title: "Blog - Dev Mohan",
  description:
    "Developer blog on frontend, backend, cloud, AI, and engineering practices.",
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
