import ButtonPrimary3 from "@/components/shared/buttons/ButtonPrimary3";
import Socials2 from "@/components/shared/socials/Socials2";
import Image from "next/image";
import React from "react";

const Hero2 = () => {
  return (
    <section className="hero-section relative pt-135px after:absolute after:top-0 after:right-0 after:w-322px after:h-308px after:blur-[150px] after:rounded-50% after:bg-gradient-circle after:-z-1 after:-mt-5% after:-mr-5% overflow-hidden">
      <div className="container">
        <div
          className="flex items-center gap-x-60px px-5 py-30px lg:p-30px bg-cream-light-color dark:bg-primary-color-light border border-body-color dark:border-seondary-color rounded-15px wow fadeInUp"
          data-wow-delay="0.3s"
        >
          <div className="md:flex-shrink-0 hidden md:block relative">
            <Image
              width={324}
              height={351}
              src="/img/hero/hero-2.png"
              alt="banner image"
              className="rounded-15px border border-transparent hover:border-primary-color transition-all duration-300"
            />
          </div>
          <div>
            <h1 className="text-size-35 md:text-size-38 lg:text-size-50 xl:text-size-58 font-medium bg-gradient-text-light dark:bg-gradient-text bg-clip-text xl:leading-1.2 text-transparent md:mb-15px">
              Hi, I am Sam - Web <br />
              Developer + UX Designer
            </h1>
            <div className="flex md:hidden justify-center items-center my-30px">
              <Image
                width={324}
                height={351}
                src="/img/hero/me.png"
                alt="banner image"
                className="rounded-38px border-2 border-seondary-color hover:border-primary-color transition-all duration-300 max-w-[80%]"
              />
            </div>
            <p className="text-xl leading-1.5 font-light text-primary-color-light dark:text-body-color max-w-540px">
              I design and code beautifully simple things and i love what i do.
              Just simple like that!
            </p>
            {/* <!-- action and social --> */}
            <div className="flex items-center gap-25px mt-5 md:mt-35px flex-wrap lg:flex-nowrap">
              <div>
                <ButtonPrimary3 url={"#contact"}>Hire me!</ButtonPrimary3>
              </div>
              <div>
                <Socials2 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero2;
