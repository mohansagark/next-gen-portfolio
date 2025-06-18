import Index10Main from "@/components/layout/main/Index10Main";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export default function Home10() {
	return (
		<PageWrapper isIndexPage={true} headerType={10} footerType={10}>
			<Index10Main />
		</PageWrapper>
	);
}
