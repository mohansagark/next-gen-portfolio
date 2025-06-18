import Index9Main from "@/components/layout/main/Index9Main";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export default function Home9() {
	return (
		<PageWrapper isIndexPage={true} headerType={9} footerType={9}>
			<Index9Main />
		</PageWrapper>
	);
}
