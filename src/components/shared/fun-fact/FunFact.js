"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
const FunFact = ({ type }) => {
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
	// Dynamically import Odometer only on the client
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
				setValue4(14);
			}, 250);
			return () => clearTimeout(timeoutId);
		}
	}, [inView]);
	return (
		<>
			{Odometer ? (
				<div
					className={`funfact-area ${
						type === 2
							? "py-10 md:py-50px xl:py-20 "
							: "mt-60px xl:mt-70px 2xl:mt-30"
					}`}
				>
					<div className="container">
						<div
							ref={ref}
							className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-30px text-primary-color dark:text-body-color"
						>
							<div className="funfact-item flex flex-wrap sm:flex-nowrap flex-col sm:flex-row justify-center lg:justify-start items-center gap-15px">
								<div
									className={`number text-size-45 md:text-size-55 xl:text-size-64 inline-flex items-cener ${
										type === 2 ? "font-bold" : "font-medium "
									}`}
								>
									<Odometer
										className="!font-sora tracking-[0.04em] inline-flex items-end"
										value={value}
									/>
								</div>
								<div className="text">
									Years of <br />
									Experience
								</div>
							</div>

							<div className="funfact-item flex flex-wrap sm:flex-nowrap flex-col sm:flex-row justify-center lg:justify-start items-center gap-15px">
								<div
									className={`number text-size-45 md:text-size-55 xl:text-size-64 inline-flex items-cener ${
										type === 2 ? "font-bold" : "font-medium "
									}`}
								>
									<Odometer
										className="!font-sora tracking-[0.04em]"
										value={value2}
									/>{" "}
									<span className="symbol"> +</span>
								</div>
								<div className="text">
									Project <br />
									Completed
								</div>
							</div>

							<div className="funfact-item flex flex-wrap sm:flex-nowrap flex-col sm:flex-row justify-center lg:justify-start items-center gap-15px">
								<div
									className={`number text-size-45 md:text-size-55 xl:text-size-64 inline-flex items-cener ${
										type === 2 ? "font-bold" : "font-medium "
									}`}
								>
									<Odometer
										className="!font-sora tracking-[0.04em]"
										value={value3}
									/>{" "}
									<span className="symbol">K</span>
								</div>
								<div className="text">
									Happy <br />
									Clients
								</div>
							</div>

							<div className="funfact-item flex flex-wrap sm:flex-nowrap flex-col sm:flex-row justify-center lg:justify-start items-center gap-15px">
								<div
									className={`number text-size-45 md:text-size-55 xl:text-size-64 inline-flex items-cener ${
										type === 2 ? "font-bold" : "font-medium "
									}`}
								>
									<Odometer
										className="!font-sora tracking-[0.04em]"
										value={value4}
									/>
								</div>
								<div className="text">
									Years of <br />
									Experience
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

export default FunFact;
