"use client";

import FunFact8 from "@/components/shared/fun-fact/FunFact8";
import BrandMarque from "./BrandMarque";
const BrandMarque2 = ({ type }) => {
	return (
		<div className=" overflow-x-hidden ">
			<div className="tj-roll-section">
				<div className="bg-primary-color   pb-5 md:pb-0 pt-2 md:pt-0 ">
					<div className="lg:container">
						<div className="flex flex-col items-center   md:grid-cols-12 md:grid md:items-center">
							<div className="md:col-start-1 md:col-span-3 lg:col-span-2 md:pl-15px lg:pl-0 ">
								<FunFact8 />
							</div>
							<div className="md:col-start-4 lg:col-start-3 md:col-span-9 lg:col-span-10 relative z-0 after:absolute after:left-0 after:top-0 after:w-full after:h-full after:z-1 after:bg-primary-color after:mask-fade-horizontal">
								<BrandMarque type={3} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BrandMarque2;
