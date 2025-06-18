import Index4Main from "@/components/layout/main/Index4Main";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export default function Home4() {
	return (
		<PageWrapper isIndexPage={true} headerType={4} footerType={4}>
			<Index4Main />
		</PageWrapper>
	);
}
