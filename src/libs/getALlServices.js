import { getContent } from "./contentStore";
import servicesData from "../../public/fakedata/services.json";

const getALlServices = () => {
  return getContent("services") || servicesData || [];
};

export default getALlServices;
