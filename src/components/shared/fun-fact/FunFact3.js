"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
const FunFact3 = () => {
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
				setValue(14);
				setValue2(50);
				setValue3(200);
			}, 250);
			return () => clearTimeout(timeoutId);
		}
	}, [inView]);
	return (
		<>
			{Odometer ? (
				<div
					ref={ref}
					className="tj-hero-4-bottom-counter relative lg:absolute right-0 top-0 lg:right-0 lg:top-[145px] xl:top-[21%]  3xl:right-[-65px]"
				>
					<div className="flex md:flex-col flex-wrap items-center md:items-start justify-center md:justify-start gap-x-5 md:gap-x-0 gap-y-0.5  md:gap-y-0.5 lg:gap-y-1.5 xl:gap-y-3 text-primary-color dark:text-body-color">
						<div className="funfact-item flex flex-wrap sm:flex-nowrap flex-col sm:flex-row text-center md:text-start justify-center lg:justify-start items-center gap-1 md:gap-15px">
							<div className="number  text-size-32 sm:text-size-45 md:text-5xl  font-bold inline-flex items-center ">
								<Odometer
									className="!font-sora tracking-[0.04em]"
									value={value}
								/>{" "}
							</div>
							<div className="text leading-1.5">
								{" "}
								Years of <br />
								Experience
							</div>
						</div>

						<div className="funfact-item flex flex-wrap sm:flex-nowrap flex-col sm:flex-row text-center md:text-start justify-center lg:justify-start items-center gap-1 md:gap-15px">
							<div className="number  text-size-32 sm:text-size-45 md:text-5xl  font-bold inline-flex items-center ">
								<Odometer
									className="!font-sora tracking-[0.04em]"
									value={value2}
								/>{" "}
								<span className="symbol"> +</span>
							</div>
							<div className="text leading-1.5">
								{" "}
								Project <br />
								Completed
							</div>
						</div>

						<div className="funfact-item flex flex-wrap sm:flex-nowrap flex-col sm:flex-row text-center md:text-start justify-center lg:justify-start items-center gap-1 md:gap-15px">
							<div className="number  text-size-32 sm:text-size-45 md:text-5xl  font-bold inline-flex items-center ">
								<Odometer
									className="!font-sora tracking-[0.04em]"
									value={value3}
								/>{" "}
								<span className="symbol"> +</span>
							</div>
							<div className="text leading-1.5">
								{" "}
								Successful <br />
								Project
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

export default FunFact3;
