import PortfoliodetailsMain from "@/components/layout/main/PortfoliodetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import getPortfolio from "@/libs/getPortfolio";
import { notFound } from "next/navigation";
const portfolio = getPortfolio();
export const metadata = {
  title:
    "Portfolio Details - Dev Mohan - Personal Portfolio React  NextJs Template",
  description:
    "Portfolio Details - Dev Mohan - Personal Portfolio React  NextJs Template",
};

export default async function PortfolioDetails({ params }) {
  const { id } = await params;

  // Check if portfolio exists by slug first, then by ID
  const isExistPortfolio = portfolio?.find(
    ({ slug, id: id1 }) => slug === id || id1 === parseInt(id)
  );
  if (!isExistPortfolio) {
    notFound();
  }
  return (
    <PageWrapper isInnerPage={true}>
      <PortfoliodetailsMain />
    </PageWrapper>
  );
}
export async function generateStaticParams() {
  return portfolio?.map(({ id, slug }) => ({ id: slug || id.toString() }));
}
