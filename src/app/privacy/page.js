import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import PrivacyNotice from "@/components/layout/main/PrivacyNotice";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://devmohan.in";

export const metadata = {
  title: "Privacy notice",
  description:
    "How Mohan Sagar processes personal data on devmohan.in, including the contact form and Leo greeter.",
  alternates: { canonical: `${SITE}/privacy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <PageWrapper isInnerPage={true}>
      <PrivacyNotice />
    </PageWrapper>
  );
}
