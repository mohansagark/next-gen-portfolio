import getBlogs from "./getBlogs";

const getBlogCategories = () => {
  const blogs = getBlogs();

  // Extract unique categories from actual blog data
  const categories = blogs?.reduce((acc, blog) => {
    if (blog.category && !acc.includes(blog.category)) {
      acc.push(blog.category);
    }
    return acc;
  }, []);

  // Sort categories alphabetically
  return categories?.sort();
};

export default getBlogCategories;
