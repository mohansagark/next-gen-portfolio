import BlogComments from "@/components/shared/blog-details/BlogComments";
import BlogSidebar from "@/components/shared/sidebar/BlogSidebar";
import countCommentLength from "@/libs/countCommentLength";
import makePath from "@/libs/makePath";
import sliceText from "@/libs/sliceText";
import Image from "next/image";
import Link from "next/link";

const BlogDetailsPrimary = ({
	prevId,
	nextId,
	blog,
	pervblog,
	nextblog,
	isPrevBlog,
	isNextBlog,
}) => {
	const {
		id,
		detailsImg,
		title,
		desc,
		desc1,
		desc2,
		desc3,
		blogTopList,
		category,
		author,
		comments,
		tags,
	} = blog ? blog : {};
	const { title: prevBlogTitle, img: prevBlogImg } = pervblog || {};
	const { title: nextBlogTitle, img: nextBlogImg } = nextblog || {};
	return (
		<section id="blogs">
			<div className="py-60px md:py-20 lg:py-100px xl:py-30 dark:bg-black-color">
				<div className="container">
					<div className="lg:grid lg:gap-6 lg:grid-cols-12">
						{/* <!-- blogs details --> */}
						<div className="lg:col-start-1 lg:col-span-8">
							<article
								className="group relative flex flex-col items-center wow fadeInUp"
								data-wow-delay=".3s"
							>
								<div className="rounded-lg relative overflow-hidden">
									<div className="rounded-t-lg overflow-hidden">
										<Image src={detailsImg} alt="" width={2000} height={2000} />
									</div>
									<Link
										href={`/blogs?category=${makePath(category)}`}
										className="text-size-13 uppercase px-15px py-10px rounded-50px leading-1 absolute top-[15px] right-[15px] text-white-color bg-gradient-secondary-2 bg-200 hover:bg-100"
									>
										{category}
									</Link>

									<div className="pt-25px md:pt-30px -mt-10px">
										<div className="transition-all duration-500">
											<div className="relative z-0">
												<div className="relative z-10">
													<ul className="flex flex-wrap gap-x-15px md:gap-x-25px gap-y-10px items-center mb-15px md:mb-5">
														{blogTopList?.length
															? blogTopList?.map(
																	({ iconName, name, path }, idx) => (
																		<li
																			key={1000 + idx}
																			className="text-primary-color dark:text-white-color "
																		>
																			<i
																				className={`${iconName} mr-1 text-primary-color transition-all duration-500`}
																			></i>{" "}
																			{path ? (
																				<Link
																					href={`${
																						idx === 2
																							? `#comment-reply`
																							: `/blogs?author=${makePath(
																									author
																							  )}`
																					}`}
																					className="text-primary-color dark:text-white-color hover:text-primary-color transition-all duration-500 capitalize"
																				>
																					{idx === 2
																						? `${name} (${countCommentLength(
																								comments
																						  )})`
																						: `By ${name}`}
																				</Link>
																			) : (
																				name
																			)}
																		</li>
																	)
															  )
															: ""}
													</ul>
													<h3 className="mb-15px md:mb-5">
														<span className="text-primary-color dark:text-white-color capitalize relative z-0 text-size-22 md:text-3xl font-bold">
															{title}
														</span>
													</h3>
													<p className="text-primary-color-light dark:text-white-color mb-15px md:mb-5">
														{desc}
													</p>
													<p className="text-primary-color-light dark:text-white-color mb-15px md:mb-5">
														{desc1}
													</p>
													<p className="text-primary-color-light dark:text-white-color mb-15px md:mb-5">
														{desc2}
													</p>
													{/* <!-- blog quote --> */}
													<div className="rounded-lg relative overflow-hidden bg-primary-color-light">
														<blockquote className="py-25px px-15px md:p-30px relative block before:content-['\f10e'] before:block before:text-size-40 before:leading-none before:font-fontawesome before:font-light before:relative before:mb-3">
															<div className="transition-all duration-500">
																<div className="relative z-0">
																	<div className="relative z-10">
																		<p className="text-white-color mb-15px">
																			“Welcome to our blog, where we celebrate
																			our achievement as an AWS SaaS Competency
																			Partner and share insights on how we
																			accomplished this significant milestone.{" "}
																			<br />
																			As businesses unlock growth opportunities
																			in the digital age, harnessing the power
																			of cloud computing has become essential.
																			Amazon Web Services (AWS) offers the AWS
																			SaaS Competency.”
																		</p>
																		<p className="text-white-color mb-2">
																			<cite className="text-xl relative inline-block before:inline-block before:w-[35px] before:h-0.5 before:bg-primary-color before:rounded-[2px] before:relative before:-top-[6px] before:mr-15px">
																				Silvester Scott
																			</cite>
																		</p>
																	</div>
																</div>
															</div>
														</blockquote>
													</div>
													{/* <!-- role of technology --> */}
													<div>
														<h3 className="mb-15px mt-5 md:mt-30px">
															<span className="text-primary-color-light dark:text-white-color capitalize relative z-0 text-size-22 md:text-2xl font-bold">
																{title}
															</span>
														</h3>
														<p className="text-primary-color-light dark:text-white-color mb-15px md:mb-5">
															{desc}
														</p>
														<p className="text-primary-color-light dark:text-white-color mb-15px md:mb-5">
															{desc1}
														</p>
														<p className="text-primary-color-light dark:text-white-color mb-15px md:mb-5">
															{desc2}
														</p>
														<p className="text-primary-color-light dark:text-white-color mb-15px md:mb-5">
															Explore the transformative impact of technology on
															logistics management. Discuss how technologies
															like IoT, AI, and blockchain are reshaping the
															industry and improving efficiency.
														</p>
													</div>

													{/* <!-- keypoint --> */}
													<div className="mb-5">
														<h5 className="mb-10px mt-5 md:mt-30px">
															<span className="text-primary-color-light dark:text-white-color capitalize relative z-0 text-size-15 md:text-base lg:text-lg font-bold">
																Key Points
															</span>
														</h5>
														<ul>
															<li className="pl-25px mb-10px relative before:content-['\f058'] before:font-fontawesome before:absolute before:left-0 before:top-0 before:text-primary-color before:font-bold">
																<span className="text-primary-color-light dark:text-white-color">
																	IoT and Real-Time Tracking
																</span>
															</li>
															<li className="pl-25px mb-10px relative before:content-['\f058'] before:font-fontawesome before:absolute before:left-0 before:top-0 before:text-primary-color before:font-bold">
																<span className="text-primary-color-light dark:text-white-color">
																	Artificial Intelligence in Route Optimization
																	and Predictive Analytics
																</span>
															</li>
															<li className="pl-25px mb-10px relative before:content-['\f058'] before:font-fontawesome before:absolute before:left-0 before:top-0 before:text-primary-color before:font-bold">
																<span className="text-primary-color-light dark:text-white-color">
																	Blockchain for Enhanced Transparency and
																	Security
																</span>
															</li>
															<li className="pl-25px relative before:content-['\f058'] before:font-fontawesome before:absolute before:left-0 before:top-0 before:text-primary-color before:font-bold">
																<span className="text-primary-color-light dark:text-white-color">
																	Warehouse Automation and Robotics
																</span>
															</li>
														</ul>
													</div>
													{/* <!-- conclusion --> */}
													<div>
														<h3 className="mb-15px mt-5 md:mt-30px">
															<span className="text-primary-color-light dark:text-white-color capitalize relative z-0 text-size-22 md:text-2xl font-bold">
																Conclusion
															</span>
														</h3>
														<p className="text-primary-color-light dark:text-white-color mb-15px md:mb-5">
															Emphasize the long-term benefits of integrating
															sustainable practices into logistics operations,
															both for the planet and a company's reputation.
														</p>
														<p className="text-primary-color-light dark:text-white-color mb-15px md:mb-5">
															These outlines can be expanded into comprehensive
															blog posts, each providing valuable insights and
															information on the respective topics.
														</p>
													</div>
													{/* <!-- tags and social --> */}
												</div>
											</div>
										</div>
									</div>
								</div>
							</article>
							<div className="flex gap-5 md:gap-x-30px flex-wrap md:flex-nowrap md:items-center md:justify-between py-30px mt-50px border-y border-border-color dark:border-gray-color-3">
								{/* <!-- tags --> */}
								<div className="flex gap-x-5 md:gap-x-30px ice">
									<div>
										<h3>
											<span className="text-primary-color-light dark:text-white-color capitalize relative z-0 text-size-22 md:text-2xl font-bold">
												Tags:
											</span>
										</h3>
									</div>
									<div>
										<ul className="flex flex-wrap gap-10px items-center">
											{tags?.length
												? tags?.map((tag, idx) => (
														<li key={5000000 + idx} className="font-medium">
															<Link
																href={`/blogs?tag=${makePath(tag)}`}
																className="py-11px px-15px bg-cream-light-color dark:bg-seondary-color hover:bg-primary-color dark:hover:bg-primary-color text-primary-color hover:text-white-color dark:text-white-color transition-all duration-500 rounded-50px leading-1"
															>
																{tag}
															</Link>
														</li>
												  ))
												: ""}
										</ul>
									</div>
								</div>
								{/* <!-- socials --> */}
								<div>
									<ul className="flex gap-x-5">
										<li>
											<Link
												href="https://www.facebook.com"
												className="text-primary-color dark:text-white-color border border-primary-color hover:bg-primary-color w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
											>
												<i className="fa-brands fa-facebook-f"></i>
											</Link>
										</li>
										<li>
											<Link
												href="https://x.com"
												className="text-primary-color dark:text-white-color border border-primary-color hover:bg-primary-color w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
											>
												<i className="fa-brands fa-x-twitter"></i>
											</Link>
										</li>
										<li>
											<Link
												href="https://www.linkedin.com"
												className="text-primary-color dark:text-white-color border border-primary-color hover:bg-primary-color w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
											>
												<i className="fa-brands fa-linkedin-in"></i>
											</Link>
										</li>
										<li>
											<Link
												href="https://www.pinterest.com"
												className="text-primary-color dark:text-white-color border border-primary-color hover:bg-primary-color w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
											>
												<i className="fa-brands fa-pinterest-p"></i>
											</Link>
										</li>
									</ul>
								</div>
							</div>
							{/* <!-- prev next blog --> */}
							<div className="py-30px border-b border-border-color dark:border-gray-color-3">
								<div className="flex flex-wrap md:flex-nowrap md:grid gap-5 xl:gap-30px md:grid-cols-2">
									{/* <!-- prev blog --> */}
									<div>
										{isPrevBlog ? (
											<>
												<div className="group flex gap-x-5 max-w-355px md:max-w-full w-full relative overflow-hidden bg-cream-light-color dark:bg-primary-color-light px-5 py-30px md:px-25px md:py-35px">
													<div>
														<Link
															href={isPrevBlog ? `/blogs/${prevId}` : "#"}
															className="overflow-hidden w-85px h-85px"
														>
															<Image
																src={prevBlogImg}
																alt=""
																className="w-85px h-85px"
																width={2000}
																height={2000}
															/>
														</Link>
													</div>
													<div>
														<div className="relative z-10">
															<Link
																href={isPrevBlog ? `/blogs/${prevId}` : "#"}
																className="uppercase text-primary-color mb-1.5 inline-flex gap-2 items-center"
															>
																<i className="fa-regular fa-angle-double-left"></i>
																<span> previous</span>
															</Link>
															<h3>
																<Link
																	href={isPrevBlog ? `/blogs/${prevId}` : "#"}
																	className="text-primary-color-light dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize relative z-0 text-lg font-medium"
																>
																	{sliceText(prevBlogTitle, 45)}
																</Link>
															</h3>
														</div>
													</div>
												</div>
											</>
										) : (
											""
										)}
									</div>
									{/* <!-- next blog --> */}
									<div className="ml-auto md:ml-0">
										{isNextBlog ? (
											<div className="group flex items-start gap-x-5 max-w-355px md:max-w-full w-full relative overflow-hidden bg-cream-light-color dark:bg-primary-color-light px-5 py-30px md:px-25px md:py-35px">
												<div>
													<div className="relative z-10 flex flex-col items-end">
														<Link
															href={isNextBlog ? `/blogs/${nextId}` : "#"}
															className="uppercase text-primary-color mb-1.5 inline-flex gap-2 items-center"
														>
															<span> Next</span>
															<i className="fa-regular fa-angle-double-right"></i>
														</Link>
														<h3>
															<Link
																href={isNextBlog ? `/blogs/${nextId}` : "#"}
																className="text-primary-color-light dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize relative z-0 text-lg font-medium text-end"
															>
																{sliceText(nextBlogTitle, 45)}
															</Link>
														</h3>
													</div>
												</div>
												<div>
													<Link
														href={isNextBlog ? `/blogs/${nextId}` : "#"}
														className="overflow-hidden w-85px h-85px"
													>
														<Image
															src={nextBlogImg}
															alt=""
															className="w-85px h-85px"
															width={2000}
															height={2000}
														/>
													</Link>
												</div>
											</div>
										) : (
											""
										)}
									</div>
								</div>
							</div>

							{/* <!-- comments --> */}

							<div className="mt-50px">
								<h3 className="mb-30px pb-3 relative after:w-60px after:h-0.5 after:bg-primary-color after:absolute after:bottom-0 after:left-0 z-1">
									<span className="text-primary-color-light dark:text-white-color capitalize relative z-0 text-size-22 md:text-3xl font-bold">
										3 Comments
									</span>
								</h3>
								{/* <!-- comments --> */}
								<BlogComments comments={comments} />
							</div>
							{/* <!-- comment form --> */}

							<div className="pt-50px" id="comment-reply">
								<h3 className="mb-30px pb-3 relative after:w-60px after:h-0.5 after:bg-primary-color after:absolute after:bottom-0 after:left-0 z-1">
									<span className="text-primary-color-light dark:text-white-color capitalize relative z-0 text-size-22 md:text-3xl font-bold">
										Leave a Reply
									</span>
								</h3>
								<p className="text-primary-color-light dark:text-body-color mb-4">
									I design and code beautifully simple things and i love what i
									do. Just simple like that!
								</p>
								{/* <!-- form --> */}
								<form>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
										{/* <!--  name --> */}
										<div>
											<input
												type="text"
												placeholder="Enter Name"
												className="text-white-color w-full px-5 py-14px border border-gray-color-3 bg-cream-light-color dark:bg-primary-color-light focus:border-primary-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-gray-color leading-1"
											/>
										</div>
										{/* <!-- email --> */}
										<div>
											<input
												type="email"
												placeholder="Enter Email"
												className="text-white-color w-full px-5 py-14px border border-gray-color-3 bg-cream-light-color dark:bg-primary-color-light focus:border-primary-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-gray-color leading-1"
											/>
										</div>

										<div className="sm:col-start-1 sm:col-span-2">
											<div>
												<input
													type="text"
													placeholder="Enter Website"
													className="text-white-color w-full px-5 py-14px border border-gray-color-3 bg-cream-light-color dark:bg-primary-color-light focus:border-primary-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-gray-color leading-1"
												/>
											</div>
										</div>
										<div className="sm:col-start-1 sm:col-span-2">
											<textarea
												cols="1"
												rows="10"
												placeholder="Write Your Comments"
												className="text-white-color w-full px-5 py-14px border border-gray-color-3 bg-cream-light-color dark:bg-primary-color-light focus:border-primary-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-gray-color leading-1"
											/>
										</div>
										<div className="sm:col-start-1 sm:col-span-2 -mt-1">
											<label
												htmlFor="agreetocomment"
												className="text-primary-color-light dark:text-body-color flex items-center gap-2 mb-1"
											>
												<input type="checkbox" id="agreetocomment" />
												<span>
													Save my name, email, and website in this browser for
													the next time I comment.
												</span>
											</label>
										</div>
										<div className="sm:col-start-1 sm:col-span-2">
											<button
												type="submit"
												className="text-size-15 font-bold text-white-color capitalize py-17px px-35px bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full leading-1 transition-all duration-300"
											>
												Post Comment
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
						{/* <!-- sidebar --> */}
						<BlogSidebar />
					</div>
				</div>
			</div>
		</section>
	);
};

export default BlogDetailsPrimary;
