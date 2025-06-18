const progressBar = () => {
	const speed = 30;
	const items = document.querySelectorAll(".progress_bar .progress-item");

	if (items?.length) {
		const speed = 30;
		const items = document.querySelectorAll(".progress_bar .progress-item");

		// Intersection Observer options
		const options = {
			root: null, // viewport
			threshold: 0.1, // trigger when 10% of the item is visible
		};

		// Callback function for Intersection Observer
		const observer = new IntersectionObserver(function (entries, observer) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					// When the element becomes visible, start the progress bar animation
					const item = entry.target;
					const progress = item.querySelector(".progress");
					const itemValue = progress.getAttribute("data-progress");
					let i = 0;

					const count = setInterval(function () {
						if (i <= itemValue) {
							progress.style.width = i + "%";
							const itemValueElement = item.querySelector(".item_value");
							itemValueElement.innerHTML = i + "%";
						} else {
							clearInterval(count);
						}
						i++;
					}, speed);

					// Stop observing the element after the animation starts
					observer.unobserve(item);
				}
			});
		}, options);

		// Observe each progress item
		items.forEach(function (item) {
			observer.observe(item);
		});
	}
};

export default progressBar;
