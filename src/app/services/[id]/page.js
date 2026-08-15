import { notFound, permanentRedirect } from "next/navigation";
import { fetchAllContent } from "@/libs/portfolioData";

/**
 * Legacy template route. Capability detail pages live under /capabilities/[slug].
 * Old numeric /services/<id> IDs mapped to the removed agency services list, not
 * capabilities — unmatched IDs 404 instead of permanently redirecting to `/`.
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
  notFound();
}
