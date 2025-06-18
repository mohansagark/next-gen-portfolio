"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
const FunFact7 = () => {
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
				setValue(20);
				setValue2(80);
				setValue3(1.5);
				setValue4(200);
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
					<div
						className="funfact-item max-w-full w-full sm:w-240px md:w-310px lg:w-290px xl:w-310px flex flex-wrap sm:flex-nowrap flex-col justify-center items-center text-center bg-cream-light-color dark:bg-transparent  border border-body-color dark:border-0 dark:bg-gradient-12 pt-10 pb-50px px-15px md:px-30px rounded-10px wow fadeInUp"
						data-wow-delay=".3s"
					>
						<div className="number inline-flex items-center text-size-45 md:text-size-55 xl:text-size-64 font-bold leading-1 ">
							<Odometer
								className="!font-sora tracking-[0.04em]"
								value={value}
							/>{" "}
							<span className="symbol"> +</span>
						</div>
						<div className="text leading-1 "> Years of Experience</div>
					</div>

					<div
						className="funfact-item max-w-full w-full sm:w-240px md:w-310px lg:w-290px xl:w-310px flex flex-wrap sm:flex-nowrap flex-col justify-center items-center text-center bg-cream-light-color dark:bg-transparent  border border-body-color dark:border-0 dark:bg-gradient-12 pt-10 pb-50px px-15px md:px-30px rounded-10px wow fadeInUp"
						data-wow-delay=".5s"
					>
						<div className="number inline-flex items-center text-size-45 md:text-size-55 xl:text-size-64 font-bold leading-1 ">
							<Odometer
								className="!font-sora tracking-[0.04em]"
								value={value2}
							/>{" "}
							<span className="symbol">+</span>
						</div>
						<div className="text leading-1"> Project Completed</div>
					</div>

					<div
						className="funfact-item max-w-full w-full sm:w-240px md:w-310px lg:w-290px xl:w-310px flex flex-wrap sm:flex-nowrap flex-col justify-center items-center text-center bg-cream-light-color dark:bg-transparent  border border-body-color dark:border-0 dark:bg-gradient-12 pt-10 pb-50px px-15px md:px-30px rounded-10px wow fadeInUp"
						data-wow-delay=".7s"
					>
						<div className="number inline-flex items-center text-size-45 md:text-size-55 xl:text-size-64 font-bold leading-1 ">
							<Odometer
								className="!font-sora tracking-[0.04em]"
								value={value3}
							/>{" "}
							<span className="symbol">K</span>
						</div>
						<div className="text leading-1"> Happy Client</div>
					</div>
					<div
						className="funfact-item max-w-full w-full sm:w-240px md:w-310px lg:w-290px xl:w-310px flex flex-wrap sm:flex-nowrap flex-col justify-center items-center text-center bg-cream-light-color dark:bg-transparent  border border-body-color dark:border-0 dark:bg-gradient-12 pt-10 pb-50px px-15px md:px-30px rounded-10px wow fadeInUp"
						data-wow-delay=".9s"
					>
						<div className="number inline-flex items-center text-size-45 md:text-size-55 xl:text-size-64 font-bold leading-1 ">
							<Odometer
								className="!font-sora tracking-[0.04em]"
								value={value4}
							/>{" "}
						</div>
						<div className="text leading-1"> 5 Star Review</div>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
};

export default FunFact7;
