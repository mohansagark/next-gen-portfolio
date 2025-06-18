import Index6Main from "@/components/layout/main/Index6Main";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export default function Home6() {
	return (
		<PageWrapper isIndexPage={true} headerType={6} footerType={6}>
			<Index6Main />
		</PageWrapper>
	);
}
