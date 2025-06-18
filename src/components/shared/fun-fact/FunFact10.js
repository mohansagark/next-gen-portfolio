"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
const FunFact10 = () => {
	const [value, setValue] = useState(0);
	const [value2, setValue2] = useState(0);
	const [value3, setValue3] = useState(0);

	const [Odometer, setOdometer] = useState(null);
	// Intersection Observer
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.4, // Adjust as needed
	});
	useEffect(() => {
		import("react-odometerjs").then(mod => setOdometer(() => mod.default));
	}, []);

	// Trigger odometer when visible
	useEffect(() => {
		if (inView) {
			const timeoutId = setTimeout(() => {
				setValue(30);
				setValue2(100);
				setValue3(300);
			}, 250);
			return () => clearTimeout(timeoutId);
		}
	}, [inView]);

	return (
		<>
			{Odometer ? (
				<div
					ref={ref}
					className="funfact-9 flex md:inline-flex  flex-wrap items-center md:items-start justify-center md:justify-start gap-y-1.5 md:gap-y-2 lg:gap-y-3 xl:gap-y-6  text-primary-color bg-white-color dark:bg-primary-color-light  rounded-15px"
				>
					<div className="funfact-item-2 flex  flex-col  text-center md:text-start justify-center lg:justify-start items-center sm:items-start px-[34px] pt-22px pb-[26px] sm:pr-5 md:px-5 xl:px-[34px] sm:border-r border-border-color dark:border-border-color-3 last:border-r-0 ">
						<div className="number inline-flex items-center text-size-32 sm:text-size-45 md:text-5xl  font-bold leading-1 ">
							<Odometer
								className="!font-sora tracking-[0.04em]"
								value={value}
							/>{" "}
							<span className="symbol"> +</span>
						</div>
						<div className="text-size-13 sm:text-base text-seondary-color dark:text-white-color-4 leading-1 ">
							{" "}
							Years of
							<br />
							Experience
						</div>
					</div>

					<div className="funfact-item-2 flex  flex-col  text-center md:text-start justify-center lg:justify-start items-center sm:items-start px-[34px] pt-22px pb-[26px] sm:pr-5 md:px-5 xl:px-[34px] sm:border-r border-border-color dark:border-border-color-3 last:border-r-0 ">
						<div className="number inline-flex items-center text-size-32 sm:text-size-45 md:text-5xl  font-bold leading-1 ">
							<Odometer
								className="!font-sora tracking-[0.04em]"
								value={value2}
							/>{" "}
							<span className="symbol">+</span>
						</div>
						<div className="text-size-13 sm:text-base text-seondary-color dark:text-white-color-4  leading-1">
							{" "}
							Project
							<br />
							Completed
						</div>
					</div>

					<div className="funfact-item-2 flex  flex-col  text-center md:text-start justify-center lg:justify-start items-center sm:items-start px-[34px] pt-22px pb-[26px] sm:pr-5 md:px-5 xl:px-[34px] sm:border-r border-border-color dark:border-border-color-3 last:border-r-0 ">
						<div className="number inline-flex items-center text-size-32 sm:text-size-45 md:text-5xl  font-bold leading-1 ">
							<Odometer
								className="!font-sora tracking-[0.04em]"
								value={value3}
							/>{" "}
							<span className="symbol"> +</span>
						</div>
						<div className="text-size-13 sm:text-base text-seondary-color dark:text-white-color-4 leading-1">
							{" "}
							Successful
							<br />
							Project
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
};

export default FunFact10;
