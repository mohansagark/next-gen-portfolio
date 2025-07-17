import getBlogs from "./getBlogs";

const getABlog = (blogId) => {
  const blogs = getBlogs();
  // Handle both numeric IDs (legacy) and string slugs
  const blog = blogs?.find(({ id }) => {
    if (typeof blogId === "number") {
      return parseInt(blogId) === id;
    }
    return id === blogId;
  });
  return blog;
};

export default getABlog;
