"use client";
import HeroBreadcarumb from "@/components/sections/heros/HeroBreadcarumb";
import ServiceDetailsPrimary from "@/components/sections/service-details/ServiceDetailsPrimary";
import getAService from "@/libs/getAService";
import { useParams } from "next/navigation";
import React from "react";

const ServiceDetailsMain = () => {
  const params = useParams();
  const service = getAService(params?.id);
  const { title } = service || {};
  return (
    <main>
      <HeroBreadcarumb
        title={title ? title : "Service Details"}
        text={title ? title : "Service Details"}
        actualItem={"Services"}
        path="/#services"
      />
      <ServiceDetailsPrimary />
    </main>
  );
};

export default ServiceDetailsMain;
