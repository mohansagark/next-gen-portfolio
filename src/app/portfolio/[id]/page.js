import { permanentRedirect } from "next/navigation";
import { fetchAllContent } from "@/libs/portfolioData";
import getPortfolio from "@/libs/getPortfolio";

/**
 * Legacy template route. Canonical case studies live under /work/[slug].
 */
export default async function PortfolioDetails({ params }) {
  const { id } = await params;
  const content = await fetchAllContent();
  const portfolio = content.portfolio || getPortfolio() || [];
  const match = portfolio.find(
    ({ slug, id: pid }) => slug === id || String(pid) === String(id)
  );
  if (match?.slug) {
    permanentRedirect(`/work/${match.slug}`);
  }
  permanentRedirect("/");
}
