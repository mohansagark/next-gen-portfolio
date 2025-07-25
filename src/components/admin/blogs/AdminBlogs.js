"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AdminAuthProvider,
  useAdminAuth,
} from "@/context_api/AdminAuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import getBlogs from "@/libs/getBlogs";
import getBlogCategories from "@/libs/getBlogCategories";

const BlogsContent = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAuthor, setSelectedAuthor] = useState("all");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      const blogData = getBlogs();
      setBlogs(blogData || []);
      setFilteredBlogs(blogData || []);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    let filtered = blogs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }

    // Filter by author
    if (selectedAuthor !== "all") {
      filtered = filtered.filter((blog) => blog.author === selectedAuthor);
    }

    setFilteredBlogs(filtered);
  }, [searchTerm, selectedCategory, selectedAuthor, blogs]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fa-solid fa-spinner fa-spin text-4xl text-primary-color mb-4"></i>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const categories = getBlogCategories();
  const authors = [...new Set(blogs.map((blog) => blog.author))];

  const handleEdit = (id) => {
    router.push(`/admin/blogs/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      // In a real app, this would be an API call
      const updatedBlogs = blogs.filter((blog) => blog.id !== id);
      setBlogs(updatedBlogs);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Blog Management
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Manage your blog posts and articles
            </p>
          </div>
          <button
            onClick={() => router.push("/admin/blogs/new")}
            className="bg-primary-color hover:bg-primary-color/90 text-white px-4 py-2 rounded-lg transition-colors duration-200 w-full sm:w-auto text-center flex items-center justify-center"
          >
            <i className="fa-solid fa-plus mr-2"></i>
            <span className="hidden xs:inline">Add New Post</span>
            <span className="xs:hidden">Add Post</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Posts
              </label>
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by Author
              </label>
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All Authors</option>
                {authors.map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Blog Posts Table */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Blog Posts ({filteredBlogs.length})
              </h2>
            </div>

            {filteredBlogs.length === 0 ? (
              <div className="text-center py-12">
                <i className="fa-solid fa-newspaper text-4xl text-gray-400 mb-4"></i>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No blog posts found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {searchTerm ||
                  selectedCategory !== "all" ||
                  selectedAuthor !== "all"
                    ? "Try adjusting your search criteria."
                    : "Get started by creating your first blog post."}
                </p>
                {!searchTerm &&
                  selectedCategory === "all" &&
                  selectedAuthor === "all" && (
                    <button
                      onClick={() => router.push("/admin/blogs/new")}
                      className="mt-4 bg-primary-color hover:bg-primary-color/90 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      <i className="fa-solid fa-plus mr-2"></i>
                      Create First Post
                    </button>
                  )}
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Author
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredBlogs.map((blog) => (
                        <tr
                          key={blog.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {blog.img ? (
                                  <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src={blog.img}
                                    alt={blog.title}
                                  />
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                                    <i className="fa-solid fa-newspaper text-gray-500"></i>
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                                  {blog.title}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                  {blog.desc}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-primary-color/10 text-primary-color rounded-full">
                              {blog.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            <div className="flex items-center">
                              <i
                                className={`${
                                  blog.author === "Agent Bot"
                                    ? "fa-solid fa-robot"
                                    : "fa-solid fa-user"
                                } mr-2 text-primary-color`}
                              ></i>
                              {blog.author}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {blog.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-3">
                              <button
                                onClick={() =>
                                  window.open(`/blogs/${blog.id}`, "_blank")
                                }
                                className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                title="View"
                              >
                                <i className="fa-solid fa-eye"></i>
                              </button>
                              <button
                                onClick={() => handleEdit(blog.id)}
                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                title="Edit"
                              >
                                <i className="fa-solid fa-edit"></i>
                              </button>
                              <button
                                onClick={() => handleDelete(blog.id)}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                title="Delete"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {filteredBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          {blog.img ? (
                            <img
                              className="h-12 w-12 rounded-full object-cover"
                              src={blog.img}
                              alt={blog.title}
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                              <i className="fa-solid fa-newspaper text-gray-500 text-lg"></i>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                                {blog.title}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                {blog.desc}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-3">
                              <span className="inline-flex px-2 py-1 text-xs font-medium bg-primary-color/10 text-primary-color rounded-full">
                                {blog.category}
                              </span>
                              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                <i
                                  className={`${
                                    blog.author === "Agent Bot"
                                      ? "fa-solid fa-robot"
                                      : "fa-solid fa-user"
                                  } mr-1 text-primary-color`}
                                ></i>
                                {blog.author}
                              </div>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {blog.date}
                            </span>
                          </div>

                          <div className="flex items-center justify-end space-x-4 mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                            <button
                              onClick={() =>
                                window.open(`/blogs/${blog.id}`, "_blank")
                              }
                              className="flex items-center text-sm text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                            >
                              <i className="fa-solid fa-eye mr-1"></i>
                              View
                            </button>
                            <button
                              onClick={() => handleEdit(blog.id)}
                              className="flex items-center text-sm text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              <i className="fa-solid fa-edit mr-1"></i>
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(blog.id)}
                              className="flex items-center text-sm text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <i className="fa-solid fa-trash mr-1"></i>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const AdminBlogs = () => {
  return (
    <AdminAuthProvider>
      <BlogsContent />
    </AdminAuthProvider>
  );
};

export default AdminBlogs;
