import Index2Main from "@/components/layout/main/Index2Main";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export default function Home2() {
  return (
    <PageWrapper isIndexPage={true} isResumeBtn={true} footerType={2}>
      <Index2Main />
    </PageWrapper>
  );
}
