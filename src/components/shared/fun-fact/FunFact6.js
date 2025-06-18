"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
const FunFact6 = () => {
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
			const timeoutId = setTimeout(() => setValue(12), 250);
			return () => clearTimeout(timeoutId);
		}
	}, [inView]);

	return (
		<>
			{Odometer ? (
				<div
					ref={ref}
					className="funfact-single flex-shrink-0 sm:rotate-[-90deg] w-full max-w-260px  border border-x-0 border-body-color dark:border-bg-color-2 sm:mb-70px xl:mb-65px 2xl:mb-45px"
				>
					<div className="funfact-item   flex flex-wrap sm:flex-nowrap flex-col justify-center  bg-transparent  w-full pt-2.5 md:pt-2 xl:pt-1.5">
						<div className="number inline-flex items-center text-6xl sm:text-size-75 xl:text-size-95 2xl:text-size-110 text-primary-color  font-bold leading-1  ">
							<Odometer className="tracking-[0.04em]" value={value} />{" "}
							<span className="symbol"> +</span>
						</div>
						<div className="text-seondary-color dark:text-gray-color-2  text-end -translate-y-[18px] ">
							Years of Experience
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
};

export default FunFact6;
