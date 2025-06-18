"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
const FunFact4 = () => {
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
				setValue(200);
				setValue2(14);
				setValue3(150);
				setValue4(100);
			}, 250);
			return () => clearTimeout(timeoutId);
		}
	}, [inView]);

	return (
		<>
			{Odometer ? (
				<div className="relative flex-grow">
					<div
						ref={ref}
						className="flex  flex-wrap    items-center  md:items-start justify-center sm:justify-start lg:justify-end gap-x-25px 2xl:gap-x-10 gap-y-25px 2xl:gap-y-35px text-primary-color dark:text-body-color"
					>
						<div
							className="funfact-item-2 flex flex-col  text-start    gap-1 md:gap-15px max-w-310px sm:max-w-240px md:max-w-310px lg:max-w-215px xl:max-w-260px 2xl:max-w-310px w-full pt-30px pb-35px px-15px md:pl-30px md:pr-25px lg:px-15px xl:pl-30px xl:pr-25px  bg-white-color dark:bg-primary-color-light rounded-25px wow fadeInLeft"
							data-wow-delay=".3s"
						>
							<div className="number  text-size-40 lg:text-size-35 xl:text-5xl  font-bold inline-flex items-center ">
								<Odometer
									className="!font-sora tracking-[0.04em]"
									value={value}
								/>{" "}
								<span className="symbol"> +</span>
							</div>
							<div className="text leading-1 text-base text-end text-primary-color-light dark:text-body-color">
								{" "}
								Valued Happy Clients
							</div>
						</div>

						<div
							className="funfact-item-2 flex flex-col  text-start    gap-1 md:gap-15px max-w-310px sm:max-w-240px md:max-w-310px lg:max-w-215px xl:max-w-260px 2xl:max-w-310px w-full pt-30px pb-35px px-15px md:pl-30px md:pr-25px lg:px-15px xl:pl-30px xl:pr-25px  bg-white-color dark:bg-primary-color-light rounded-25px wow fadeInRight"
							data-wow-delay=".4s"
						>
							<div className="number  text-size-40 lg:text-size-35 xl:text-5xl  font-bold inline-flex items-center ">
								<Odometer
									className="!font-sora tracking-[0.04em]"
									value={value2}
								/>{" "}
								<span className="symbol"> +</span>
							</div>
							<div className="text leading-1 text-base text-end text-primary-color-light dark:text-body-color">
								{" "}
								Years of Experience
							</div>
						</div>

						<div
							className="funfact-item-2 flex flex-col  text-start    gap-1 md:gap-15px max-w-310px sm:max-w-240px md:max-w-310px lg:max-w-215px xl:max-w-260px 2xl:max-w-310px w-full pt-30px pb-35px px-15px md:pl-30px md:pr-25px lg:px-15px xl:pl-30px xl:pr-25px  bg-white-color dark:bg-primary-color-light rounded-25px wow fadeInLeft"
							data-wow-delay=".5s"
						>
							<div className="number  text-size-40 lg:text-size-35 xl:text-5xl  font-bold inline-flex items-center ">
								<Odometer
									className="!font-sora tracking-[0.04em]"
									value={value3}
								/>{" "}
							</div>
							<div className="text leading-1 text-base text-end text-primary-color-light dark:text-body-color">
								{" "}
								5 star reviews
							</div>
						</div>
						<div
							className="funfact-item-2 flex flex-col  text-start    gap-1 md:gap-15px max-w-310px sm:max-w-240px md:max-w-310px lg:max-w-215px xl:max-w-260px 2xl:max-w-310px w-full pt-30px pb-35px px-15px md:pl-30px md:pr-25px lg:px-15px xl:pl-30px xl:pr-25px  bg-white-color dark:bg-primary-color-light rounded-25px wow fadeInRight"
							data-wow-delay=".6s"
						>
							<div className="number  text-size-40 lg:text-size-35 xl:text-5xl  font-bold inline-flex items-center ">
								<Odometer
									className="!font-sora tracking-[0.04em]"
									value={value4}
								/>{" "}
								<span className="symbol">%</span>
							</div>
							<div className="text leading-1 text-base text-end text-primary-color-light dark:text-body-color">
								{" "}
								Success Rate
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

export default FunFact4;
