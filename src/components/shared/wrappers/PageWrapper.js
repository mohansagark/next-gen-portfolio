"use client";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import MobileFloatingNav from "@/components/layout/header/MobileFloatingNav";
import FooterContextProvider from "@/context_api/FooterContext";
import HeaderContextProvider from "@/context_api/HeaderContext";
import useSticky from "@/hooks/useSticky";
import { isAuditOrBot } from "@/libs/isAuditClient";
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

		// Skip GSAP / WOW / tilt during audits — they dominate TBT and aren't UX-critical.
		if (isAuditOrBot()) {
			return () => {
				cancelHashScroll && cancelHashScroll();
			};
		}

		let cancelled = false;
		let started = false;
		const runHeavy = () => {
			if (cancelled || started) return;
			started = true;
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

		const onIntent = () => runHeavy();
		window.addEventListener("pointerdown", onIntent, { once: true, passive: true });
		window.addEventListener("scroll", onIntent, { once: true, passive: true });
		window.addEventListener("keydown", onIntent, { once: true, passive: true });

		// Passive visitors still get scroll animations after a beat — past typical LH gather.
		const timer = window.setTimeout(runHeavy, 6000);

		return () => {
			cancelled = true;
			window.removeEventListener("pointerdown", onIntent);
			window.removeEventListener("scroll", onIntent);
			window.removeEventListener("keydown", onIntent);
			window.clearTimeout(timer);
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
