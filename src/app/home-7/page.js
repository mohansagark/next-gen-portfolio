import Index7Main from "@/components/layout/main/Index7Main";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export default function Home7() {
	return (
		<PageWrapper isIndexPage={true} headerType={6} footerType={7}>
			<Index7Main />
		</PageWrapper>
	);
}
