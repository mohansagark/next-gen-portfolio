import ServiceCard from "@/components/shared/cards/ServiceCard";
import getALlServices from "@/libs/getALlServices";
import React from "react";

const Services2 = () => {
  const services = getALlServices();
  return (
    <section id="services">
      <div className="pt-60px md:pt-100px lg:pt-30">
        <div className="container">
          {/* <!-- section heading --> */}
          <div className="mb-10 md:mb-50px">
            <h2
              className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 inline-block bg-gradient-text-light dark:bg-gradient-text bg-clip-text leading-1.2 text-transparent wow fadeInUp"
              data-wow-delay=".3s"
            >
              My Specialization
            </h2>
          </div>
          {/* <!-- services --> */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* <!-- service single --> */}
            {services?.length
              ? services?.map((service, idx) => (
                  <ServiceCard key={idx} idx={idx} service={service} />
                ))
              : ""}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services2;
