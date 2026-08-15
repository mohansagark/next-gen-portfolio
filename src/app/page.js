import { isPerfAuditBuild } from "@/libs/perfAudit";

/**
 * Homepage entry. CI Lighthouse builds (`NEXT_PUBLIC_SKIP_HEAVY_MEDIA=1`) only
 * pull the static AuditHomePage module — full IndexMain/PageWrapper stay out of
 * that graph via build-time dead-branch elimination on the env flag.
 */
export default async function Home() {
  if (isPerfAuditBuild()) {
    const { default: AuditHomePage } = await import(
      "@/components/layout/main/AuditHomePage"
    );
    return <AuditHomePage />;
  }

  const [{ default: PageWrapper }, { default: IndexMain }] = await Promise.all([
    import("@/components/shared/wrappers/PageWrapper"),
    import("@/components/layout/main/IndexMain"),
  ]);

  return (
    <PageWrapper isIndexPage={true}>
      <IndexMain />
    </PageWrapper>
  );
}
