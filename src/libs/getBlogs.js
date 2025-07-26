import blogsData from "../../public/blogs.json";

const getBlogs = () => {
  return blogsData || [];
};

export default getBlogs;
