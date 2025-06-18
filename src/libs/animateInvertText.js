const animateInvertText = async () => {
	if (typeof window === "undefined") return;
	import("gsap").then(({ gsap }) => {
		import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
			import("./gsap-split-text.min").then(({ default: SplitText }) => {
				const elList = document.querySelectorAll(".tj-text-invert");
				function controllAnimation() {
					if (!elList.length) return;

					gsap.registerPlugin(ScrollTrigger, SplitText);
					const split = new SplitText(".tj-text-invert", { type: "lines" });
					split.lines.forEach(target => {
						gsap.to(target, {
							backgroundPositionX: 0,
							ease: "none",
							scrollTrigger: {
								trigger: target,
								scrub: 1,
								start: "top 85%",
								end: "bottom center",
							},
						});
					});
				}
				controllAnimation();
			});
		});
	});
};

export default animateInvertText;
