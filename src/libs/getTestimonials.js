import { getContent } from "./contentStore";
import testimonialsData from "../../public/fakedata/testimonials.json";

const getTestimonials = () => {
  return getContent("testimonials") || testimonialsData || [];
};

export default getTestimonials;
