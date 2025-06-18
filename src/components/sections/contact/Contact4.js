const Contact4 = () => {
	return (
		<section id="contact">
			<div className=" bg-cream-light-color dark:bg-black-color py-60px md:py-20 lg:py-100px xl:py-30">
				<div className="container">
					<div className="grid lg:grid-cols-12 gap-30px">
						{/* <!-- experience single area --> */}
						<div className="lg:col-start-1 lg:col-span-5 xl:col-span-4">
							<div className="mb-10 md:mb-50px lg:mb-0">
								<div className="mb-25px  ">
									<span
										className="text-xs  uppercase text-primary-color  font-semibold relative inline-block tracking-0.2em wow fadeInUp"
										data-wow-delay=".3s"
									>
										Behind the Pixels
									</span>
								</div>
								<h2
									className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 uppercase font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color  max-w-580px w-full wow fadeInUp "
									data-wow-delay=".4s"
								>
									Ready for your Success? Reach Out to Start.
								</h2>
								<p
									className="text-gray-color-2 dark:text-gray-color-2 mt-15px wow fadeInUp "
									data-wow-delay=".5s"
								>
									I break down complex experiences to problems create integer
									focused to solutions.
								</p>
								<div
									className="mt-30px md:mt-35px wow fadeInUp"
									data-wow-delay=".6s"
								>
									<a
										href="#"
										className="text-size-15 font-bold text-white-color capitalize py-17px px-35px bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full inline-flex gap-10px items-center leading-1 transition-all duration-300 group wow fadeInRight"
										data-wow-delay=".5s"
									>
										Learn More{" "}
										<i className="fa-regular fa-arrow-right transition-all duration-400 -rotate-45 group-hover:rotate-0"></i>
									</a>
								</div>
							</div>
						</div>
						<div className=" lg:col-start-6  lg:col-span-7">
							<div className=" wow fadeInRight" data-wow-delay=".3s">
								<form
									id="contact-form"
									className="contact w-full lg:ml-auto lg:max-w-[645px] px-15px py-30px md:px-5 lg:px-30px lg:py-10 xl:px-10  bg-gradient-17 rounded-15px"
								>
									{/* <!-- inputs --> */}
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-y-30px gap-x-4">
										{/* <!-- first name --> */}
										<div
											className="sm:mb-5 wow fadeInLeft "
											data-wow-delay=".3s"
										>
											<p className=" mb-15px font-semibold text-white-color uppercase ">
												First Name*
											</p>
											<input
												name="conName"
												id="conName"
												type="text"
												placeholder="First name"
												className="text-white-color bg-bg-color-2 w-full px-5 py-4 border border-transparent focus:border-white-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-body-color  leading-1"
											/>
										</div>
										{/* <!-- Last name --> */}
										<div
											className="sm:mb-5 wow fadeInRight "
											data-wow-delay=".4s"
										>
											<p className=" mb-15px font-semibold text-white-color uppercase ">
												Last Name*
											</p>
											<input
												name="conLName"
												id="conLName"
												type="text"
												placeholder="Last name"
												className="text-white-color bg-bg-color-2 w-full px-5 py-4 border border-transparent focus:border-white-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-body-color  leading-1"
											/>
										</div>
										{/* <!-- Email address --> */}
										<div
											className="sm:mb-5 wow fadeInLeft "
											data-wow-delay=".5s"
										>
											<p className=" mb-15px font-semibold text-white-color uppercase ">
												Email*
											</p>
											<input
												name="conEmail"
												id="conEmail"
												type="email"
												placeholder="Email address"
												className="text-white-color bg-bg-color-2 w-full px-5 py-4 border border-transparent focus:border-white-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-body-color  leading-1"
											/>
										</div>
										{/* <!-- Phone number --> */}
										<div
											className="sm:mb-5 wow fadeInRight "
											data-wow-delay=".6s"
										>
											<p className=" mb-15px font-semibold text-white-color uppercase ">
												Phone Name*
											</p>
											<input
												name="conPhone"
												id="conPhone"
												type="text"
												placeholder="Phone number"
												className="text-white-color bg-bg-color-2 w-full px-5 py-4 border border-transparent focus:border-white-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-body-color  leading-1"
											/>
										</div>

										<div
											className="sm:col-start-1 sm:col-span-2 wow fadeInLeft "
											data-wow-delay=".7s"
										>
											<p className=" mb-15px font-semibold text-white-color uppercase ">
												Message*
											</p>
											<textarea
												name="conMessage"
												id="conMessage"
												cols="1"
												rows="10"
												placeholder="Message"
												className="text-white-color bg-bg-color-2 w-full px-5 py-4 border border-transparent focus:border-white-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-body-color  leading-1"
											/>
										</div>
										<div
											className="sm:col-start-1 sm:col-span-2 wow fadeInRight "
											data-wow-delay=".8s"
										>
											<button
												type="submit"
												className="text-size-15 font-bold text-white-color capitalize py-5 px-35px bg-black-color rounded-full inline-flex gap-10px items-center leading-1 transition-all duration-300 group"
											>
												Send Message
												<i className="fa-regular fa-arrow-right transition-all duration-400 -rotate-45 group-hover:rotate-0"></i>
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact4;
