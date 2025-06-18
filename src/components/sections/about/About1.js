import ButtonPrimary3 from "@/components/shared/buttons/ButtonPrimary3";
import Image from "next/image";
import React from "react";

const About1 = () => {
  return (
    <section>
      <div id="about" className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-35px mt-35px">
          {/* <!-- left --> */}
          <div className="lg:col-start-1 lg:col-span-7 px-5 py-30px xl:px-10 xl:py-30px 2xl:px-65px 2xl:py-10 bg-cream-light-color dark:bg-primary-color-light border border-body-color dark:border-seondary-color rounded-15px gap-x-15px gap-y-30px md:gap-25px text-primary-color dark:text-body-color">
            <div>
              <h2
                className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 font-medium bg-gradient-text-light inline-block dark:bg-gradient-text bg-clip-text leading-1.2 xl:leading-1.2 text-transparent mb-5 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                Achievements in my <br />
                professional life.
              </h2>

              <p
                className="text-xl leading-1.5 text-primary-color-light dark:text-body-color max-w-540px wow fadeInUp"
                data-wow-delay="0.4s"
              >
                Since beginning my journey as a freelance designer nearly 8
                years ago, I've done remote work for agencies, consulted for
                startups, and collaborated with talented people to create
                digital products for both business and consumer us
              </p>
              {/* <!-- action and social --> */}

              <div
                className="mt-50px 2xl:mt-20 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <ButtonPrimary3 url={"#contact"}>Contact Me</ButtonPrimary3>
              </div>
            </div>
          </div>
          {/* <!-- right --> */}
          <div className="lg:col-start-8 lg:col-span-5 bg-cream-light-color dark:bg-primary-color-light border border-body-color dark:border-seondary-color rounded-15px gap-x-15px gap-y-30px md:gap-25px text-primary-color dark:text-body-color overflow-hidden">
            <div className="px-5 pt-30px xl:px-30px xl:pt-10 2xl:px-10 2xl:pt-30px">
              <h4
                className="text-xl font-bold bg-gradient-text-light inline-block dark:bg-gradient-text bg-clip-text leading-1.2 text-transparent mb-15px wow fadeInRight"
                data-wow-delay="0.3s"
              >
                Interface Designer
              </h4>

              <p
                className="leading-1.5 text-primary-color-light dark:text-body-color max-w-330px wow fadeInRight"
                data-wow-delay="0.4s"
              >
                As a UI designer, I work closely with clients to understand
                their needs and goals for their software or website.
              </p>
            </div>
            {/* <!-- img --> */}
            <div className="2xl:-mt-10px">
              <Image
                width={515}
                height={349}
                className="w-full"
                src="/img/hero/about-1.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About1;
