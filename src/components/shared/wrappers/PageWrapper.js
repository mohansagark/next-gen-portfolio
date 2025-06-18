"use client";
import Footer from "@/components/layout/footer/Footer";
import Footer2 from "@/components/layout/footer/Footer2";
import Footer3 from "@/components/layout/footer/Footer3";
import Footer4 from "@/components/layout/footer/Footer4";
import Footer5 from "@/components/layout/footer/Footer5";
import Footer6 from "@/components/layout/footer/Footer6";
import Footer7 from "@/components/layout/footer/Footer7";
import Header from "@/components/layout/header/Header";
import FooterContextProvider from "@/context_api/FooterContext";
import HeaderContextProvider from "@/context_api/HeaderContext";
import PortfolioRenderContextProvider from "@/context_api/PortfolioRenderContext";
import useSticky from "@/hooks/useSticky";
import animateInvertText from "@/libs/animateInvertText";
import animateSplitText from "@/libs/animateSplitText ";
import controlVanillaTilt from "@/libs/controlVanillaTilt";
import smoothScroll from "@/libs/smoothScroll";
import tjTitleAnim from "@/libs/tjTitleAnim";
import { useEffect } from "react";
import BackToTop from "../others/BackToTop";
import MagicCusror1 from "../others/MagicCusror1";
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
	}, []);
	return (
		<div>
			<Preloader />

			<BackToTop />
			{headerType === 4 ? <MagicCusror1 /> : ""}
			<HeaderContextProvider
				value={{ isIndexPage, isInnerPage, headerType, isResumeBtn }}
			>
				<Header />
				<Header isSticky={true} />
			</HeaderContextProvider>
			<PortfolioRenderContextProvider>
				{children ? children : ""}
			</PortfolioRenderContextProvider>
			<FooterContextProvider value={{ footerType }}>
				{footerType === 10 ? (
					<Footer7 />
				) : footerType === 9 ? (
					<Footer6 />
				) : footerType === 8 || footerType === 7 ? (
					<Footer5 />
				) : footerType === 6 ? (
					<Footer4 />
				) : footerType === 5 ? (
					<Footer3 />
				) : footerType === 4 ? (
					<Footer2 />
				) : (
					<Footer />
				)}
			</FooterContextProvider>
		</div>
	);
};

export default PageWrapper;
