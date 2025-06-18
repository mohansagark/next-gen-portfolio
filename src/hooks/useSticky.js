"use client";

import { useEffect } from "react";

const useSticky = () => {
	useEffect(() => {
		var sticky;
		let stickyElement = document.querySelectorAll(".tj-sticky");
		import("sticky-js").then(({ default: Sticky }) => {
			if (stickyElement?.length) {
				sticky = new Sticky(".tj-sticky");
			}
		});

		return () => {
			if (stickyElement?.length && sticky) {
				sticky.destroy();
			}
		};
	}, []);
};

export default useSticky;
