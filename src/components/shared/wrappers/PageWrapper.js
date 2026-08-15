"use client";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import MobileFloatingNav from "@/components/layout/header/MobileFloatingNav";
import FooterContextProvider from "@/context_api/FooterContext";
import HeaderContextProvider from "@/context_api/HeaderContext";
import PortfolioRenderContextProvider from "@/context_api/PortfolioRenderContext";
import useSticky from "@/hooks/useSticky";
import animateInvertText from "@/libs/animateInvertText";
import animateSplitText from "@/libs/animateSplitText ";
import controlVanillaTilt from "@/libs/controlVanillaTilt";
import scrollToHash from "@/libs/scrollToHash";
import smoothScroll from "@/libs/smoothScroll";
import tjTitleAnim from "@/libs/tjTitleAnim";
import { useEffect } from "react";
import BackToTop from "../others/BackToTop";
import Preloader from "../others/Preloader";

const PageWrapper = ({
	children,
	isIndexPage,
	isInnerPage,
	isResumeBtn,
	headerType,
	footerType,
}) => {
	useSticky();
	useEffect(() => {
		import("wow.js").then(({ default: WOW }) => {
			new WOW().init();
			controlVanillaTilt();
		});
		smoothScroll();
		animateSplitText();
		animateInvertText();
		tjTitleAnim();
		// Sections render client-side, so a #hash present on load (e.g. arriving
		// at /#contact from the blog) has no target when the browser's native
		// hash-scroll fires. Scroll to it ourselves once it mounts.
		const cancelHashScroll = scrollToHash(window.location.hash);
		return () => cancelHashScroll && cancelHashScroll();
	}, []);
	return (
		<div>
			<Preloader isHome={!!isIndexPage} />

			<BackToTop />
			<HeaderContextProvider
				value={{ isIndexPage, isInnerPage, headerType, isResumeBtn }}
			>
				<Header />
				<Header isSticky={true} />
				<MobileFloatingNav />
			</HeaderContextProvider>
			<PortfolioRenderContextProvider>
				{children ? children : ""}
			</PortfolioRenderContextProvider>
			<FooterContextProvider value={{ footerType }}>
				<Footer />
			</FooterContextProvider>
		</div>
	);
};

export default PageWrapper;
