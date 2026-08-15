import { notFound, permanentRedirect } from "next/navigation";
import { fetchAllContent } from "@/libs/portfolioData";
import getPortfolio from "@/libs/getPortfolio";
import {
  findLegacyPortfolioMatch,
  legacyPortfolioTarget,
} from "@/libs/legacyRedirects";

/**
 * Legacy template route. Canonical case studies live under /work/[slug].
 */
export default async function PortfolioDetails({ params }) {
  const { id } = await params;
  const content = await fetchAllContent();
  const portfolio = content.portfolio || getPortfolio() || [];
  const match = findLegacyPortfolioMatch(portfolio, id);
  const target = legacyPortfolioTarget(match);
  if (target) {
    permanentRedirect(target);
  }
  notFound();
}
