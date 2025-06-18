"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
const FunFact5 = () => {
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
				<div
					ref={ref}
					className="flex flex-wrap xl:flex-nowrap items-center justify-center gap-30px text-primary-color dark:text-body-color"
				>
					<div className="funfact-item max-w-full w-full sm:w-240px md:w-310px lg:w-290px xl:w-310px flex flex-wrap sm:flex-nowrap flex-col justify-center items-center text-center bg-cream-light-color dark:bg-transparent  border border-body-color dark:border-bg-color-2 py-45px sm:py-50px md:pt-90px md:pb-97px px-15px md:px-30px rounded-10px">
						<div className="number inline-flex items-center text-size-45 md:text-size-55 xl:text-size-64 font-bold leading-1 ">
							<Odometer
								className="!font-sora tracking-[0.04em]"
								value={value}
							/>{" "}
							<span className="symbol"> +</span>
						</div>
						<div className="text leading-1 "> Job achievements</div>
					</div>

					<div className="funfact-item max-w-full w-full sm:w-240px md:w-310px lg:w-290px xl:w-310px flex flex-wrap sm:flex-nowrap flex-col justify-center items-center text-center bg-cream-light-color dark:bg-transparent  border border-body-color dark:border-bg-color-2 py-45px sm:py-50px md:pt-90px md:pb-97px px-15px md:px-30px rounded-10px">
						<div className="number inline-flex items-center text-size-45 md:text-size-55 xl:text-size-64 font-bold leading-1 ">
							<Odometer
								className="!font-sora tracking-[0.04em]"
								value={value2}
							/>{" "}
							<span className="symbol">%</span>
						</div>
						<div className="text leading-1"> Job achievements</div>
					</div>

					<div className="funfact-item max-w-full w-full sm:w-240px md:w-310px lg:w-290px xl:w-310px flex flex-wrap sm:flex-nowrap flex-col justify-center items-center text-center bg-cream-light-color dark:bg-transparent  border border-body-color dark:border-bg-color-2 py-45px sm:py-50px md:pt-90px md:pb-97px px-15px md:px-30px rounded-10px">
						<div className="number inline-flex items-center text-size-45 md:text-size-55 xl:text-size-64 font-bold leading-1 ">
							<Odometer
								className="!font-sora tracking-[0.04em]"
								value={value3}
							/>{" "}
							<span className="symbol">+</span>
						</div>
						<div className="text leading-1"> Years of Experience</div>
					</div>
					<div
						className="funfact-item max-w-full w-full sm:w-240px md:w-310px lg:w-290px xl:w-310px flex flex-wrap sm:flex-nowrap flex-col justify-center items-center text-center bg-cream-light-color dark:bg-transparent  border border-body-color dark:border-bg-color-2 py-45px sm:py-50px md:pt-90px md:pb-97px px-15px md:px-30px rounded-10px"
						data-wow-delay=".6s"
					>
						<div className="number inline-flex items-center text-size-45 md:text-size-55 xl:text-size-64 font-bold leading-1 ">
							<Odometer
								className="!font-sora tracking-[0.04em]"
								value={value4}
							/>{" "}
							<span className="symbol">K</span>
						</div>
						<div className="text leading-1"> Happy Clients</div>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
};

export default FunFact5;
