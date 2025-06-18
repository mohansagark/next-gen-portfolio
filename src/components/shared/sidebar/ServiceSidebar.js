import React from "react";
import GetInTouchWidget from "./widgets/GetInTouchWidget";
import AllServicesWidget from "./widgets/AllServicesWidget";

const ServiceSidebar = () => {
  return (
    <div className="sidebar lg:col-start-9 lg:col-span-4 pt-50px lg:pt-0 mt-10 lg:mt-0 border-t border-border-color dark:border-gray-color-3 lg:border-none">
      <div className="flex flex-col gap-30px">
        {/* <!-- All Services --> */}
        <AllServicesWidget />
        {/* <!-- get in tuouch --> */}
        <GetInTouchWidget />
      </div>
    </div>
  );
};

export default ServiceSidebar;
