import Link from "next/link";

const Cta2 = () => {
	return (
		<section className="pb-20 md:pb-100px xl:pb-30 ">
			<div className="container">
				<div className="flex flex-col items-center bg-[url('/img/shapes/h4-cta.jpg')] bg-cover bg-no-repeat bg-center py-75px md:py-20 lg:py-95px px-15px lg:px-25px rounded-25px text-center">
					<div
						className="w-98px h-98px mb-10px wow fadeInUp "
						data-wow-delay=".3s"
					>
						<img
							src="/img/project/h4-cta.png"
							className="h-full object-contain rounded-100%"
							alt=""
						/>
					</div>
					<h2 className="text-size-35 sm:text-size-40 md:text-size-45 lg:text-size-50 xl:text-size-58 inline-block text-white-color leading-1.2 font-medium tj-char-animation mb-25px">
						If you have any project in mind
					</h2>
					<p
						className="text-white-color font-medium mb-25px wow fadeInUp "
						data-wow-delay=".4s"
					>
						Have a project in mind? Let’s work together to bring your vision to
						life
					</p>
					<div className="wow fadeInUp " data-wow-delay=".5s">
						<Link
							href="/#contact"
							className="text-size-15 font-bold text-white-color capitalize py-17px px-35px bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full leading-1 transition-all duration-300"
						>
							Hire Me
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Cta2;
