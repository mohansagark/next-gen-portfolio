import sliceText from "@/libs/sliceText";
import Link from "next/link";

const BlogCard2 = ({ blog, idx }) => {
	const { id, img, title, blogTopList, category, date } = blog ? blog : {};
	const showAbleBlogTopList = blogTopList?.slice(1, 3);

	return (
		<div
			className="group relative flex flex-col items-center wow fadeInUp"
			data-wow-delay={`0.${3 + (idx === 0 ? idx : idx + idx)}s`}
		>
			<div className="p-15px bg-cream-light-color dark:bg-bg-color-6 backdrop-blur-[40px] rounded-10px relative overflow-hidden w-full">
				<Link
					href={`/blogs/${id}`}
					className="mb-4 rounded-10px overflow-hidden"
				>
					<img
						src={img}
						alt=""
						className="group-hover:scale-110 transition-all duration-500"
					/>
				</Link>

				<div className=" p-15px rounded-10px  transition-all duration-500">
					<div className=" w-full ">
						<div className="relative z-10">
							<ul className="flex gap-4 items-center mb-6">
								<li>
									<Link
										href="#"
										className="text-size-15  px-2 py-1 rounded-50px leading-1  text-primary-color hover:text-white-color  bg-bg-color-7 hover:bg-primary-color bg-200 hover:bg-100 capitalize"
									>
										{category}
									</Link>
								</li>
								<li className="font-medium">
									<span className="text-primary-color-light  dark:text-body-color-2 pl-5  relative transition-all duration-500 before:w-1 before:h-1 before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:bg-primary-color-light  dark:before:bg-body-color-2 before:rounded-100% ">
										{date}
									</span>
								</li>
							</ul>
							<h4 className="mb-5">
								<Link
									href={`/blogs/${id}`}
									className="text-primary-color-light dark:text-white-color dark:group-hover:text-white-color w-full  text-size-22 lg:text-2xl font-semibold  leading-1.4 lg:leading-1.4 uppercase bg-[0_100%] [background-size:0_1px] bg-no-repeat bg-gradient-primary-11 hover:[background-size:100%_1px] tracking-0.02em inline duration-500"
								>
									{sliceText(title, 43)}
								</Link>
							</h4>
							<Link
								href={`/blogs/${id}`}
								className="text-primary-color-light dark:text-white-color  transition-all duration-300  inline-flex gap-x-2 items-center  bg-[0_100%] [background-size:0_1px] bg-no-repeat bg-gradient-primary-11 hover:[background-size:100%_1px] leading-1.5 group/nested "
							>
								Read More
								<span className="relative overflow-hidden -rotate-45">
									<i className="fa-regular fa-arrow-right group-hover/nested:translate-x-150% transition-all duration-500 inline-block"></i>
									<i className="fa-regular fa-arrow-right absolute left-0 top-0 -translate-x-150% group-hover/nested:-translate-x-0 transition-all duration-500"></i>
								</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogCard2;
