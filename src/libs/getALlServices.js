import servicesData from "../../public/fakedata/services.json";

const getALlServices = () => {
  return servicesData || [];
};

export default getALlServices;
