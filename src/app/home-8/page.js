import Index8Main from "@/components/layout/main/Index8Main";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export default function Home8() {
	return (
		<PageWrapper isIndexPage={true} headerType={6} footerType={8}>
			<Index8Main />
		</PageWrapper>
	);
}
