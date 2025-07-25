import { blogsData } from "../data/adminData";

const getBlogs = () => {
  return blogsData || [];
};

export default getBlogs;
