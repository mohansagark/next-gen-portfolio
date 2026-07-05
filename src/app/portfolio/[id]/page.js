import PortfoliodetailsMain from "@/components/layout/main/PortfoliodetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import { fetchAllContent } from "@/libs/portfolioData";
import getPortfolio from "@/libs/getPortfolio";
import { notFound } from "next/navigation";

async function loadPortfolio() {
  const content = await fetchAllContent();
  return content.portfolio || getPortfolio();
}

function findPortfolio(portfolio, id) {
  return portfolio?.find(
    ({ slug, id: id1 }) => slug === id || id1 === parseInt(id)
  );
}

// Existence check lives here: metadata resolves before the response starts
// streaming, so notFound() from this function produces a real 404 status.
export async function generateMetadata({ params }) {
  const { id } = await params;
  if (!findPortfolio(await loadPortfolio(), id)) {
    notFound();
  }
  return {
    title:
      "Portfolio Details - Dev Mohan - Personal Portfolio React  NextJs Template",
    description:
      "Portfolio Details - Dev Mohan - Personal Portfolio React  NextJs Template",
  };
}

export default async function PortfolioDetails({ params }) {
  const { id } = await params;
  if (!findPortfolio(await loadPortfolio(), id)) {
    notFound();
  }
  return (
    <PageWrapper isInnerPage={true}>
      <PortfoliodetailsMain />
    </PageWrapper>
  );
}

export async function generateStaticParams() {
  const portfolio = await loadPortfolio();
  return portfolio?.map(({ id, slug }) => ({ id: slug || id.toString() }));
}
