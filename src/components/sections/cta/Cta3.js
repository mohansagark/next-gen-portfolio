import Link from "next/link";

const Cta3 = () => {
	return (
		<section className="pb-20 md:pb-100px xl:pb-30  dark:bg-black-color">
			<div className="container">
				<div className="flex flex-wrap md:flex-nowrap justify-center md:justify-stretch gap-30px xl:gap-10 2xl:gap-60px items-center bg-[url('/img/shapes/h4-cta.jpg')] bg-cover bg-no-repeat bg-center py-30px  px-15px lg:px-25px xl:p-50px rounded-25px ">
					<div
						className="w-full h-full max-w-full sm:max-w-230px lg:max-w-295px rounded-25px overflow-hidden wow fadeInLeft"
						data-wow-delay=".3s"
					>
						<img
							src="/img/project/h5-cta.png"
							className="h-full w-full object-contain "
							alt=""
						/>
					</div>
					<div className="flex gap-5 flex-col md:flex-row items-end justify-between">
						<div>
							<h2
								className="text-3xl md:text-size-35 lg:text-size-42 xl:text-size-50 2xl:text-6xl -tracking-0.02em inline-block text-white-color leading-1.2  2xl:leading-1.2 font-semibold  mb-30px xl:mb-10  wow fadeInUp "
								data-wow-delay=".3s"
							>
								Ready to Collaborate and Let’s Make Magic Happen?
							</h2>
							<p
								className="text-white-color   wow fadeInUp "
								data-wow-delay=".4s"
							>
								Have a project in mind? Let’s together to bring your vision to
								life
							</p>
						</div>

						<div className="flex-shrink-0 wow zoomIn " data-wow-delay=".3s">
							<Link
								href="#contact"
								className=" text-size-25px xl:text-3xl xl:leading-1 w-75px lg:w-90px 2xl:w-30 h-75px lg:h-90px 2xl:h-120px text-white-color  bg-black-color outline-1 outline outline-transparent dark:outline-bg-color-2 group-hover:border-transparent  rounded-100% leading-1 transition-all duration-300  inline-flex justify-center items-center group"
							>
								<span className="relative overflow-hidden -rotate-45">
									<i className="fa-regular fa-arrow-right  group-hover:translate-x-150% transition-all duration-500 inline-block"></i>
									<i className="fa-regular fa-arrow-right absolute left-0 top-0 -translate-x-150% group-hover:-translate-x-0 transition-all duration-500"></i>
								</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Cta3;
