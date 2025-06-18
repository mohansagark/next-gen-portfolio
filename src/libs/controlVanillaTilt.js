const controlVanillaTilt = () => {
	const tiltElements = document.querySelectorAll("[data-tilt]");
	if (tiltElements?.length) {
		import("vanilla-tilt").then(module => {
			const VanillaTilt = module.default;
			VanillaTilt.init(tiltElements, {});
		});
	}
};

export default controlVanillaTilt;
