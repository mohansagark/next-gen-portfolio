"use client";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import MobileFloatingNav from "@/components/layout/header/MobileFloatingNav";
import FooterContextProvider from "@/context_api/FooterContext";
import HeaderContextProvider from "@/context_api/HeaderContext";
import useSticky from "@/hooks/useSticky";
import scrollToHash from "@/libs/scrollToHash";
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
		const cancelHashScroll = scrollToHash(window.location.hash);

		let cancelled = false;
		const runHeavy = () => {
			if (cancelled) return;
			void import("wow.js").then(({ default: WOW }) => {
				if (cancelled) return;
				new WOW().init();
			});
			void import("@/libs/controlVanillaTilt").then((m) => m.default?.());
			void import("@/libs/smoothScroll").then((m) => m.default?.());
			void import("@/libs/animateSplitText ").then((m) => m.default?.());
			void import("@/libs/animateInvertText").then((m) => m.default?.());
			void import("@/libs/tjTitleAnim").then((m) => m.default?.());
		};

		const idleId =
			typeof window.requestIdleCallback === "function"
				? window.requestIdleCallback(runHeavy, { timeout: 4000 })
				: null;
		const timer = idleId == null ? window.setTimeout(runHeavy, 2000) : null;

		return () => {
			cancelled = true;
			if (idleId != null) window.cancelIdleCallback?.(idleId);
			if (timer != null) window.clearTimeout(timer);
			cancelHashScroll && cancelHashScroll();
		};
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
			{children ? children : ""}
			<FooterContextProvider value={{ footerType }}>
				<Footer />
			</FooterContextProvider>
		</div>
	);
};

export default PageWrapper;
