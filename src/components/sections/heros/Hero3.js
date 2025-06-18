import Button2 from "@/components/shared/buttons/Button2";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

const Hero3 = () => {
  return (
    <section className="hero-section relative pt-140px md:pt-150px lg:pt-230px  after:absolute after:top-0 after:right-0 after:w-322px after:h-308px after:blur-[150px] after:rounded-50% after:bg-gradient-circle after:-z-1 after:-mt-5% after:-mr-5% overflow-hidden">
      <div className="container">
        <div
          className="grid md:grid-cols-12 items-center gap-x-6 wow fadeInUp"
          data-wow-delay="0.3s"
        >
          <div className="md:col-start-1 md:col-span-5 hidden md:block relative">
            <img
              src="/img/hero/me.png"
              alt="banner image"
              className="rounded-100% border-2 border-seondary-color hover:border-primary-color mx-auto transition-all duration-300"
            />
          </div>
          <div className="md:col-start-6 md:col-span-7 pl-0 lg:pl-10">
            <h4 className="text-seondary-color dark:text-body-color text-size-22 md:text-size-25 lg:text-4xl lg:leading-1.5 font-bold mb-1.5 xl:mb-10px">
              Hi, I am Mohan Sagar.
            </h4>
            <h1 className="text-3xl  lg:text-size-50 xl:text-6xl 2xl:text-size-65 bg-gradient-text-light dark:bg-gradient-text bg-clip-text leading-1.2  xl:leading-1.2 text-transparent mb-30px">
              A creative Web developer <br />
              based in India
            </h1>

            <div className="flex md:hidden justify-center items-center max-w-438px my-30px">
              <img
                src="/img/hero/me.png"
                alt="banner image"
                className="rounded-100% border-2 border-seondary-color hover:border-primary-color transition-all duration-300 max-w-[80%]"
              />
            </div>
            <p className="text-xl leading-1.5 font-light text-primary-color-light dark:text-body-color max-w-540px">
              I design and code beautifully simple things and i love what i do.
              Just simple like that!
            </p>
            {/* <!-- action and social --> */}
            <div className="flex items-center gap-25px mt-5 md:mt-35px flex-wrap lg:flex-nowrap">
              <Button2 url={"#"}>Got a project?</Button2>
              <ButtonPrimary type={2} url={"/#contact"}>
                Lets talk!
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero3;
