"use client";

import ServiceSidebar from "@/components/shared/sidebar/ServiceSidebar";
import getAService from "@/libs/getAService";
import Image from "next/image";
import { useParams } from "next/navigation";

const ServiceDetailsPrimary = () => {
  const params = useParams();
  const id = params?.id;
  const service = getAService(id);
  const { title, desc, desc1, desc2, img, process } = service || {};
  const {
    title: processTitle,
    desc: processDesc,
    processItems,
  } = process || {};

  return (
    <section>
      <div className="py-60px md:py-20 lg:py-100px xl:py-30 dark:bg-black-color">
        <div className="container">
          <div className="lg:grid lg:gap-6 lg:grid-cols-12">
            {/* <!-- service details --> */}
            <div className="lg:col-start-1 lg:col-span-8">
              <div
                className="group relative flex flex-col items-center wow fadeInUp"
                data-wow-delay=".3s"
              >
                <div className="rounded-lg relative overflow-hidden">
                  <div className="rounded-t-lg overflow-hidden">
                    <Image src={img} alt="" width={2000} height={20000} />
                  </div>

                  <div className="pt-30px md:pt-10">
                    <div className="transition-all duration-500">
                      <div className="relative z-0">
                        <div className="relative z-10">
                          <h3 className="mb-15px md:mb-5">
                            <span className="text-primary-color-light dark:text-white-color capitalize relative z-0 text-size-35 md:text-size-40 lg:text-size-45 font-bold">
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
                          {/* <!-- process --> */}
                          <div>
                            <h3 className="mb-15px md:mb-5">
                              <span className="text-primary-color-light dark:text-white-color capitalize relative z-0 text-size-22 md:text-3xl font-bold">
                                {processTitle ? processTitle : ""}
                              </span>
                            </h3>
                            <p className="text-primary-color-light dark:text-white-color mb-15px md:mb-5">
                              {processDesc ? processDesc : ""}
                            </p>

                            <ul className="grid gap-x-5 md:gap-x-30px grid-col1 sm:grid-cols-2">
                              {processItems?.length
                                ? processItems?.map((processItem, idx) => (
                                    <li
                                      key={idx}
                                      className="pl-25px mb-10px relative before:content-['\f00c'] before:font-fontawesome before:absolute before:left-0 before:top-0 before:text-primary-color before:font-bold"
                                    >
                                      <span className="text-primary-color-light dark:text-white-color">
                                        {processItem}
                                      </span>
                                    </li>
                                  ))
                                : ""}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- sidebar --> */}
            <ServiceSidebar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailsPrimary;
