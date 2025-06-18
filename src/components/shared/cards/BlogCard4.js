import sliceText from "@/libs/sliceText";
import Link from "next/link";

const BlogCard4 = ({ blog, idx }) => {
	const { id, img, title, blogTopList, category, date } = blog ? blog : {};
	const showAbleBlogTopList = blogTopList?.slice(1, 3);

	return (
		<div
			className="blog-item group wow fadeInUp"
			data-wow-delay={`0.${3 + (idx === 0 ? idx : idx + idx)}s`}
		>
			<div className="relative anim-reveal-item">
				<div className=" px-15px py-30px lg:px-30px lg:py-[38px] border border-body-color dark:border-bg-color-2  rounded-10px  wow fadeInUp  relative">
					<div className="flex flex-wrap gap-25px justify-between items-center relative z-10">
						<div className="max-w-[645px]">
							<ul className="flex gap-4 items-center mb-4">
								<li>
									<Link
										href="#"
										className="text-size-15 leading-1 text-primary-color-light dark:text-white-color group-hover:text-white-color  dark:hover:text-white-color"
									>
										Optimization
									</Link>
								</li>
								<li className="font-medium">
									<span className="text-primary-color-light  dark:text-body-color-2 group-hover:text-white-color dark:group-hover:text-white-color pl-5  relative transition-all duration-300 before:w-1 before:h-1 before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:bg-primary-color-light  dark:before:bg-body-color-2 group-hover:before:bg-white-color dark:group-hover:before:bg-white-color before:rounded-100% ">
										SEP 14, 2025
									</span>
								</li>
							</ul>
							<h4>
								<Link
									href={`/blogs/${id}`}
									className="text-primary-color-light dark:text-white-color group-hover:text-white-color dark:group-hover:text-white-color w-full  text-size-22 md:text-2xl lg:text-size-26 font-semibold  leading-1.2 lg:leading-1.2 uppercase bg-[0_100%] [background-size:0_1px] bg-no-repeat bg-gradient-primary-11 group-hover:[background-size:100%_1px] tracking-0.02em inline duration-500"
								>
									{sliceText(title, 36)}
								</Link>
							</h4>
						</div>
						{/* <!-- action --> */}
						<div className="flex-shrink-0">
							<Link
								href={`/blogs/${id}`}
								className="flex-shrink-0 text-size-25px w-50px h-50px lg:w-70px lg:h-70px text-primary-color-light dark:text-white-color group-hover:text-white-color   bg-transparent group-hover:bg-primary-color outline-1  outline outline-border-color dark:outline-bg-color-2 group-hover:outline-transparent dark:group-hover:outline-transparent rounded-100% leading-1 transition-all duration-300  inline-flex justify-center items-center"
							>
								<span className="relative overflow-hidden -rotate-45">
									<i className="fa-regular fa-arrow-right  text-lg group-hover:translate-x-150% transition-all duration-500 inline-block"></i>
									<i className="fa-regular fa-arrow-right absolute left-0 top-0 -translate-x-150% text-lg group-hover:-translate-x-0 transition-all duration-500"></i>
								</span>
							</Link>
						</div>
					</div>
				</div>

				{/* <!-- img--> */}
				<div
					className={`anim-reveal-bg absolute top-0 left-0 w-[350px] h-[350px]  opacity-0 
-mt-[180px] -ml-[180px] overflow-hidden pointer-events-none 
bg-center bg-cover bg-no-repeat rounded-15px 
transition-all duration-500 ease-[cubic-bezier(0.215,0.61,0.355,1)] 
z-[2] `}
				>
					<img src={img} className="w-full h-full" alt="" />
				</div>
			</div>
		</div>
	);
};

export default BlogCard4;
