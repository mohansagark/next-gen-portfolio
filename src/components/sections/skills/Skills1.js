import HeadingPrimary from "@/components/shared/headings/HeadingPrimary";
import getSkills from "@/libs/getSkills";
import Image from "next/image";

const Skills1 = ({ type, subTitle, isNotDesc }) => {
	const skills = getSkills();
	return (
		<section id="skills">
			<div
				className={
					type === 3
						? "py-20 md:py-100px xl:py-30"
						: type === 2
						? "pt-60px md:pt-100px lg:pt-30"
						: "pt-60px pb-60px md:pt-20 md:pb-60px lg:pt-100px lg:pb-20"
				}
			>
				<div className="container">
					{/* <!-- section heading --> */}
					<div
						className={`text-center flex flex-col items-center mb-10 md:mb-50px ${
							type === 3 ? "xl:mb-60px" : ""
						}`}
					>
						<HeadingPrimary className={"mb-0"}>My Skills</HeadingPrimary>
						{isNotDesc ? (
							""
						) : (
							<p
								className="text-primary-color-light dark:text-body-color max-w-700px wow fadeInUp"
								data-wow-delay=".4s"
							>
								We put your ideas and thus your wishes in the form of a unique
								web project that inspires you and you customers.
							</p>
						)}
						{subTitle ? (
							<p
								className=" text-seondary-color dark:text-white-color uppercase mt-15px wow fadeInUp"
								data-wow-delay="0.5s"
							>
								{subTitle}
							</p>
						) : (
							""
						)}
					</div>
					{/* <!-- skills --> */}
					<div className="skills">
						<div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-30px">
							{/* <!-- skills single --> */}
							{skills?.map(({ name, img, perchant }, idx) => (
								<div
									key={idx}
									className="max-w-180px w-full group wow fadeInUp"
									data-wow-delay={`.${3 + idx}s`}
								>
									{/* <!-- contents --> */}
									<div className="flex flex-col items-center py-25px px-15px md:pt-30px 2xl:pt-10 2xl:mb-30px rounded-25px bg-cream-light-color dark:bg-primary-color-light border border-transparent group-hover:border-primary-color group-hover:bg-seondary-color transition-all duration-500 mb-15px">
										<div className="mb-5 md:mb-30px mx-9 2xl:mx-44px w-60px flex flex-col justify-center items-center">
											<Image
												className="grayscale-[90%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110  group-hover:opacity-100 w-60px"
												src={img}
												alt={""}
												width={600}
												height={600}
											/>
										</div>
										<div className="text-xl text-gray-color-2 group-hover:text-primary-color transition-none duration-300 font-extrabold">
											{perchant}
										</div>
									</div>
									<p className="text-primary-color text-center">{name}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Skills1;
