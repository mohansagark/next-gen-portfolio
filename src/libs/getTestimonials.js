import testimonialsData from "../../public/fakedata/testimonials.json";

const getTestimonials = () => {
  return testimonialsData || [];
};

export default getTestimonials;
