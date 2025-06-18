const tjTitleAnim = async () => {
	if (typeof window === "undefined") return;
	import("gsap").then(({ gsap }) => {
		import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
			import("./gsap-split-text.min").then(({ default: SplitText }) => {
				const elList = document.querySelectorAll(".tj_title_anim");
				function controllAnimation() {
					if (!elList.length) return;

					gsap.registerPlugin(ScrollTrigger, SplitText);
					let tj_title_anim = gsap.utils.toArray(".tj_title_anim");
					tj_title_anim.forEach(splitTextLine => {
						var delay_value = 0.5;
						if (splitTextLine.getAttribute("data-delay")) {
							delay_value = splitTextLine.getAttribute("data-delay");
						}
						const tl = gsap.timeline({
							scrollTrigger: {
								trigger: splitTextLine,
								start: "top 90%",
								duration: 1.5,
								scrub: false,
								markers: false,
								toggleActions: "play none none none",
							},
						});

						const itemSplitted = new SplitText(splitTextLine, {
							type: "lines",
						});
						gsap.set(splitTextLine, {
							perspective: 400,
						});
						itemSplitted.split({
							type: "lines",
						});
						tl.from(itemSplitted.lines, {
							duration: 1,
							delay: delay_value,
							opacity: 0,
							rotationX: -80,
							force3D: true,
							transformOrigin: "top center -50",
							stagger: 0.1,
						});
					});
				}
				controllAnimation();
			});
		});
	});
};

export default tjTitleAnim;
