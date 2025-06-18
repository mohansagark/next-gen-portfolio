import { useEffect } from "react";

const useProtfolioGrid = () => {
	useEffect(() => {
		// Function to check if all images are loaded
		const imagesLoaded = (container, callback) => {
			const images = container.querySelectorAll("img");
			let loadedCount = 0;

			if (images.length === 0) {
				callback();
				return;
			}

			images.forEach(img => {
				img.onload = img.onerror = () => {
					loadedCount += 1;
					if (loadedCount === images.length) {
						callback();
					}
				};
			});
		};

		// Initialize Isotope after the images are loaded
		const gridWrapper = document.querySelector(".tj-project-4-wrappper");

		if (gridWrapper) {
			imagesLoaded(gridWrapper, () => {
				const iso = new Isotope(gridWrapper, {
					itemSelector: ".tj-project-4-item",
					percentPosition: true,
					masonry: {
						columnWidth: ".tj-project-4-item",
						gutter: 125,
					},
				});
			});
		}

		// Cleanup (if needed)
		return () => {
			const gridWrapper = document.querySelector(".tj-project-4-wrappper");
			if (gridWrapper) {
				const iso = Isotope.data(gridWrapper);
				if (iso) {
					iso.destroy();
				}
			}
		};
	}, []);

	return <div></div>;
};

export default useProtfolioGrid;
