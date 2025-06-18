import FunFact4 from "@/components/shared/fun-fact/FunFact4";

const Success1 = () => {
	return (
		<section className="pb-20 md:pb-100px xl:pb-30 ">
			<div className="relative bg-cream-light-color dark:bg-[url('/img/shapes/h4-fun.jpg')] bg-cover bg-no-repeat bg-center py-20 lg:py-95px">
				<div className="container">
					<div className="flex flex-wrap lg:flex-nowrap gap-25px ">
						{/* <!-- section heading --> */}
						<div className="mb-15px max-w-530px lg:max-w-450px xl:max-w-530px w-full">
							<div className="mb-25px  ">
								<span
									className="text-xs  uppercase py-10px px-5 bg-primary-color dark:bg-seondary-color text-white-color rounded-full font-semibold relative inline-block  wow fadeInRight"
									data-wow-delay=".3s"
								>
									Numbers
								</span>
							</div>
							<h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 inline-block text-seondary-color dark:text-white-color leading-1.2 tj-char-animation ">
								Measuring Success by Numbers
							</h2>
						</div>

						{/* <!-- fanfact --> */}
						<FunFact4 />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Success1;
