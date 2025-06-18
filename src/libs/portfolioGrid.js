const portfolioGrid = () => {
	const portfolioBox = document.querySelector(".tj-project-4-wrappper");

	// Helper to calculate responsive gutter
	const getGutterSize = () => {
		const width = window.innerWidth;
		if (width >= 992 && width <= 1199) {
			return 60;
		} else if (width >= 768 && width <= 991) {
			return 50;
		}
		return 125;
	};

	// Wait for all images to load
	const images = portfolioBox?.querySelectorAll("img");

	const imagesLoaded = () => {
		return new Promise(resolve => {
			let loadedCount = 0;
			images?.forEach(img => {
				if (img.complete) {
					loadedCount++;
				} else {
					img.addEventListener("load", () => {
						loadedCount++;
						if (loadedCount === images?.length) resolve();
					});
					img.addEventListener("error", () => {
						loadedCount++;
						if (loadedCount === images?.length) resolve();
					});
				}
			});
			if (loadedCount === images?.length) resolve();
		});
	};

	imagesLoaded().then(() => {
		// Initialize Isotope
		import("isotope-layout").then(({ default: Isotope }) => {
			const gridWrapper = document.querySelector(".tj-project-4-wrappper");
			if (gridWrapper) {
				const iso = new Isotope(gridWrapper, {
					itemSelector: ".tj-project-4-item",
					percentPosition: true,
					masonry: {
						columnWidth: ".tj-project-4-item",
						gutter: getGutterSize(),
					},
				});

				// Optional: Handle window resize to update gutter dynamically
				window.addEventListener("resize", () => {
					iso.options.masonry.gutter = getGutterSize();
					iso.layout();
				});
			}
		});
	});
};

export default portfolioGrid;
