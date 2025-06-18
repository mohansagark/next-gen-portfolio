import FunFact5 from "@/components/shared/fun-fact/FunFact5";

const FunfacTsection1 = () => {
	return (
		// <!-- funfact -->
		<section>
			<div className="funfact-area relative after:absolute after:top-1/2 after:-translate-y-1/2 after:right-5 after:w-650px after:h-550px after:blur-[150px] after:rounded-50% after:bg-gradient-circle-2 after:-z-1  after:translate-x-1/2 after:opacity-60">
				<div className="container">
					{/* <!-- section heading --> */}
					<div className="mb-10 md:mb-50px xl:mb-60px ">
						<div className="mb-25px  ">
							<span
								className="text-xs  uppercase text-primary-color  font-medium relative inline-block tracking-0.2em  wow fadeInUp"
								data-wow-delay=".3s"
							>
								Behind the Pixels
							</span>
						</div>
						<h2
							className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color wow fadeInUp"
							data-wow-delay=".4s"
						>
							Measuring Success
						</h2>
					</div>

					{/* <!-- funfact main --> */}
					<FunFact5 />
				</div>
			</div>
		</section>
	);
};

export default FunfacTsection1;
