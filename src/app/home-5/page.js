import Index5Main from "@/components/layout/main/Index5Main";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export default function Home5() {
	return (
		<PageWrapper isIndexPage={true} headerType={5} footerType={5}>
			<Index5Main />
		</PageWrapper>
	);
}
