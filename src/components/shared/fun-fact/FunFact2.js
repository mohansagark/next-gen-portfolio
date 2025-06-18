"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
const FunFact2 = () => {
	const [value, setValue] = useState(0);
	const [value2, setValue2] = useState(0);
	const [value3, setValue3] = useState(0);
	const [value4, setValue4] = useState(0);
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
				setValue(14);
				setValue2(50);
				setValue3(1.5);
				setValue4(50);
			}, 250);
			return () => clearTimeout(timeoutId);
		}
	}, [inView]);

	return (
		<>
			{Odometer ? (
				<div className="funfact-area mt-35px">
					<div className="container">
						<div
							ref={ref}
							className="flex  flex-wrap items-center justify-between px-5 py-30px xl:px-75px xl:py-35px bg-cream-light-color dark:bg-primary-color-light border border-body-color dark:border-seondary-color rounded-15px gap-x-15px gap-y-35px sm:gap-y-30px md:gap-25px text-primary-color dark:text-body-color"
						>
							<div className="funfact-item flex flex-wrap sm:flex-nowrap flex-col justify-center lg:justify-start">
								<div className="">
									<i className="tj flaticon flaticon-trophy clear-start text-3xl sm:text-size-32 text-primary-color leading-1 sm:leading-1"></i>
								</div>
								<div className="number text-size-40 sm:text-size-45 md:text-size-55 xl:text-size-64 font-medium inline-flex items-cener ">
									<Odometer
										className="!font-sora tracking-[0.04em]"
										value={value}
									/>{" "}
									<span className="symbol"> %</span>
								</div>
								<div className="text-sm sm:text-base leading-1 sm:leading-1">
									Job achievements
								</div>
							</div>

							<div className="funfact-item flex flex-wrap sm:flex-nowrap flex-col justify-center lg:justify-start">
								<div className="">
									<i className="tj flaticon flaticon-hand-bag text-size-32 text-primary-color leading-1"></i>
								</div>
								<div className="number text-size-40 sm:text-size-45 md:text-size-55 xl:text-size-64 font-medium inline-flex items-cener ">
									<Odometer
										className="!font-sora tracking-[0.04em]"
										value={value2}
									/>{" "}
									<span className="symbol"> +</span>
								</div>
								<div className="text-sm sm:text-base leading-1 sm:leading-1">
									Years of Experience
								</div>
							</div>

							<div className="funfact-item flex flex-wrap sm:flex-nowrap flex-col justify-center lg:justify-start">
								<div className="">
									<i className="tj flaticon flaticon-menu text-size-32 text-primary-color leading-1"></i>
								</div>
								<div className="number text-size-40 sm:text-size-45 md:text-size-55 xl:text-size-64 font-medium inline-flex items-cener ">
									<Odometer
										className="!font-sora tracking-[0.04em]"
										value={value3}
									/>{" "}
									<span className="symbol"> K</span>
								</div>
								<div className="text-sm sm:text-base leading-1 sm:leading-1">
									Happy Clients
								</div>
							</div>

							<div className="funfact-item flex flex-wrap sm:flex-nowrap flex-col justify-center lg:justify-start">
								<div className="">
									<i className="tj flaticon flaticon-crown text-size-32 text-primary-color leading-1"></i>
								</div>
								<div className="number text-size-40 sm:text-size-45 md:text-size-55 xl:text-size-64 font-medium inline-flex items-cener ">
									<Odometer
										className="!font-sora tracking-[0.04em]"
										value={value4}
									/>{" "}
									<span className="symbol"> +</span>
								</div>
								<div className="text-sm sm:text-base leading-1 sm:leading-1">
									Project Completed
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
};

export default FunFact2;
