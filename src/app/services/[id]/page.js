import { permanentRedirect } from "next/navigation";
import { fetchAllContent } from "@/libs/portfolioData";

/**
 * Legacy template route. Capability detail pages live under /capabilities/[slug].
 */
export default async function ServiceDetails({ params }) {
  const { id } = await params;
  const content = await fetchAllContent();
  const capabilities = content.capabilities?.items || [];
  const match = capabilities.find(
    (item) =>
      String(item.id) === String(id) ||
      item.slug === id ||
      String(item.slug) === String(id)
  );
  if (match?.slug) {
    permanentRedirect(`/capabilities/${match.slug}`);
  }
  permanentRedirect("/");
}
