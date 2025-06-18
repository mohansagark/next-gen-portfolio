import ServiceDetailsMain from "@/components/layout/main/ServiceDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import getALlServices from "@/libs/getALlServices";
import { notFound } from "next/navigation";

const services = getALlServices();

export const metadata = {
  title:
    "Service Details - Dev Mohan - Personal Portfolio React  NextJs Template",
  description:
    "Service Details - Dev Mohan - Personal Portfolio React  NextJs Template",
};

export default async function ServiceDetails({ params }) {
  const { id } = await params;

  const isExistservice = services?.find(({ id: id1 }) => id1 === parseInt(id));
  if (!isExistservice) {
    notFound();
  }
  return (
    <PageWrapper isInnerPage={true}>
      <ServiceDetailsMain />
    </PageWrapper>
  );
}
export async function generateStaticParams() {
  return services?.map(({ id }) => ({ id: id.toString() }));
}
