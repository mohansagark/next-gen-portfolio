import Index3Main from "@/components/layout/main/Index3Main";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export default function Home3() {
	return (
		<PageWrapper
			isIndexPage={true}
			headerType={3}
			isResumeBtn={true}
			footerType={3}
		>
			<Index3Main />
		</PageWrapper>
	);
}
