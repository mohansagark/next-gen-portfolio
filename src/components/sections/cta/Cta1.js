"use client";
import textAnimation from "@/libs/textAnimation";
import Link from "next/link";
import { useEffect } from "react";

const Cta1 = () => {
	useEffect(() => {
		textAnimation();
	}, []);
	return (
		<section id="contact" className="text-section">
			<div className="py-20 md:py-100px xl:py-30 dark:bg-black-color-2 bg-cream-light-color overflow-x-hidden">
				<div className="container">
					<div className="section-header max-w-1080px mx-auto">
						<div className="heading-left">
							<p
								className="text-primary-color-light dark:text-white-color py-4 wow fadeInUp"
								data-wow-delay=".3s"
							>
								Want to start a project?
							</p>
							<h2
								id="anim"
								className="section-title text-size-40 md:text-size-82 lg:text-size-110 xl:text-size-128  font-bold text-primary-color flex wow fadeInUp"
								data-wow-delay=".4s"
							>
								Let’s have a chat
							</h2>
						</div>
						<div
							className="chat-mail flex md:justify-end mt-10px md:mt-0 wow fadeInRight"
							data-wow-delay=".5s"
						>
							<Link
								className="link text-xl text-primary-color dark:text-white-color md:text-size-32 inline-flex items-center gap-15px leading-1.5  group relative before:h-1px before:w-0 before:bg-primary-color dark:before:bg-white-color hover:before:w-full before:absolute before:bottom-[-10px] md:before:bottom-[-14px]  before:left-0  before:transition-all before:duration-300 "
								href="mailto:info@taylor.com"
							>
								info@taylor.com{" "}
								<i className="fa-light fa-arrow-right w-30px h-30px  md:w-43px md:h-43px inline-flex justify-center items-center border border-primary-color dark:border-white-color rounded-100% text-lg md:text-size-xl -rotate-45 hover:bg-primary-color group-hover:rotate-0 hover:text-white-color hover:border-primary-color dark:hover:border-primary-color group-hover:no-underline leading-1 transition-all duration-300"></i>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Cta1;
