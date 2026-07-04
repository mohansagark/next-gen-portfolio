import ServiceDetailsMain from "@/components/layout/main/ServiceDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import { fetchAllContent } from "@/libs/portfolioData";
import getALlServices from "@/libs/getALlServices";
import { notFound } from "next/navigation";

async function loadServices() {
  const content = await fetchAllContent();
  return content.services || getALlServices();
}

function findService(services, id) {
  return services?.find(({ id: id1 }) => id1 === parseInt(id));
}

// Existence check lives here: metadata resolves before the response starts
// streaming, so notFound() from this function produces a real 404 status.
export async function generateMetadata({ params }) {
  const { id } = await params;
  if (!findService(await loadServices(), id)) {
    notFound();
  }
  return {
    title:
      "Service Details - Dev Mohan - Personal Portfolio React  NextJs Template",
    description:
      "Service Details - Dev Mohan - Personal Portfolio React  NextJs Template",
  };
}

export default async function ServiceDetails({ params }) {
  const { id } = await params;
  if (!findService(await loadServices(), id)) {
    notFound();
  }
  return (
    <PageWrapper isInnerPage={true}>
      <ServiceDetailsMain />
    </PageWrapper>
  );
}

export async function generateStaticParams() {
  const services = await loadServices();
  return services?.map(({ id }) => ({ id: id.toString() }));
}
