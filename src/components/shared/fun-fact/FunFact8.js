"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
const FunFact8 = () => {
	const [Odometer, setOdometer] = useState(null);
	const [value, setValue] = useState(0);

	// Intersection Observer
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.4, // Adjust as needed
	});

	// Lazy-load OdometerJS
	useEffect(() => {
		import("react-odometerjs").then(mod => setOdometer(() => mod.default));
	}, []);

	// Trigger odometer when visible
	useEffect(() => {
		if (inView) {
			const timeoutId = setTimeout(() => setValue(200), 250);
			return () => clearTimeout(timeoutId);
		}
	}, [inView]);

	return (
		<>
			{Odometer ? (
				<div ref={ref}>
					<div className="funfact-item max-w-full w-full flex flex-wrap sm:flex-nowrap flex-col  md:border-r  md:border-border-color-3 text-white-color py-5">
						<div className="number inline-flex items-center text-6xl  text-size-40 font-semibold  leading-1  ">
							<Odometer
								className="!font-sora tracking-[0.04em]"
								value={value}
							/>{" "}
							<span className="symbol"> +</span>
						</div>
						<div className="text text-size-15 xl:text-lg 2xl:text-xl leading-1 xl:leading-1 2xl:leading-1 font-medium">
							Trusted Clients
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
};

export default FunFact8;
