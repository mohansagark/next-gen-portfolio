"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AdminAuthProvider,
  useAdminAuth,
} from "@/context_api/AdminAuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import getPortfolio from "@/libs/getPortfolio";

const PortfolioContent = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const router = useRouter();
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      const items = getPortfolio();
      setPortfolioItems(items || []);
      setFilteredItems(items || []);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    let filtered = portfolioItems;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    setFilteredItems(filtered);
  }, [searchTerm, selectedCategory, portfolioItems]);

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

  const categories = [...new Set(portfolioItems.map((item) => item.category))];

  const handleEdit = (id) => {
    router.push(`/admin/portfolio/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this portfolio item?")) {
      // In a real app, this would be an API call
      const updatedItems = portfolioItems.filter((item) => item.id !== id);
      setPortfolioItems(updatedItems);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Portfolio Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your portfolio projects and showcase items
            </p>
          </div>
          <button
            onClick={() => router.push("/admin/portfolio/new")}
            className="bg-primary-color hover:bg-primary-color/90 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <i className="fa-solid fa-plus mr-2"></i>
            Add New Project
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Projects
              </label>
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Portfolio Items */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Portfolio Items ({filteredItems.length})
              </h2>
            </div>

            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <i className="fa-solid fa-folder-open text-4xl text-gray-400 mb-4"></i>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No portfolio items found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {searchTerm || selectedCategory !== "all"
                    ? "Try adjusting your search criteria."
                    : "Get started by adding your first portfolio project."}
                </p>
                {!searchTerm && selectedCategory === "all" && (
                  <button
                    onClick={() => router.push("/admin/portfolio/new")}
                    className="mt-4 bg-primary-color hover:bg-primary-color/90 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    <i className="fa-solid fa-plus mr-2"></i>
                    Add First Project
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative">
                      {item.img ? (
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <i className="fa-solid fa-image text-4xl text-gray-400"></i>
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <span className="bg-primary-color text-white px-2 py-1 rounded-full text-xs">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {item.desc}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            title="Edit"
                          >
                            <i className="fa-solid fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            title="Delete"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                        <div className="flex space-x-2">
                          {item.livePreview && (
                            <a
                              href={item.livePreview}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                              title="Live Preview"
                            >
                              <i className="fa-solid fa-external-link-alt"></i>
                            </a>
                          )}
                          {item.githubUrl && (
                            <a
                              href={item.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                              title="GitHub"
                            >
                              <i className="fa-brands fa-github"></i>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const AdminPortfolio = () => {
  return (
    <AdminAuthProvider>
      <PortfolioContent />
    </AdminAuthProvider>
  );
};

export default AdminPortfolio;
