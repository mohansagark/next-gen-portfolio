"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AdminAuthProvider,
  useAdminAuth,
} from "@/context_api/AdminAuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import getALlServices from "@/libs/getALlServices";

const ServicesContent = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({
    title: "",
    desc: "",
    icon: "fa-solid fa-code",
    category: "development",
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      const servicesData = getALlServices();
      setServices(servicesData || []);
    }
  }, [isAuthenticated]);

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

  const categories = [
    "development",
    "design",
    "consulting",
    "marketing",
    "other",
  ];
  const icons = [
    "fa-solid fa-code",
    "fa-solid fa-palette",
    "fa-solid fa-lightbulb",
    "fa-solid fa-chart-line",
    "fa-solid fa-mobile-alt",
    "fa-solid fa-desktop",
    "fa-solid fa-database",
    "fa-solid fa-cloud",
    "fa-solid fa-shield-alt",
    "fa-solid fa-search",
  ];

  const handleAddService = () => {
    if (!newService.title.trim() || !newService.desc.trim()) return;

    const service = {
      id: Date.now().toString(),
      ...newService,
    };

    setServices([...services, service]);
    setNewService({
      title: "",
      desc: "",
      icon: "fa-solid fa-code",
      category: "development",
    });
  };

  const handleEditService = (service) => {
    setEditingService({ ...service });
  };

  const handleUpdateService = () => {
    const updatedServices = services.map((service) =>
      service.id === editingService.id ? editingService : service
    );
    setServices(updatedServices);
    setEditingService(null);
  };

  const handleDeleteService = (id) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter((service) => service.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Services Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage the services you offer to clients
          </p>
        </div>

        {/* Add New Service */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Add New Service
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Service Title
              </label>
              <input
                type="text"
                placeholder="e.g., Web Development"
                value={newService.title}
                onChange={(e) =>
                  setNewService({ ...newService, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Icon
              </label>
              <select
                value={newService.icon}
                onChange={(e) =>
                  setNewService({ ...newService, icon: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {icons.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon.replace("fa-solid fa-", "").replace("-", " ")}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={newService.category}
                onChange={(e) =>
                  setNewService({ ...newService, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleAddService}
                className="w-full bg-primary-color hover:bg-primary-color/90 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                <i className="fa-solid fa-plus mr-2"></i>
                Add Service
              </button>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Service Description
            </label>
            <textarea
              placeholder="Describe the service you offer..."
              value={newService.desc}
              onChange={(e) =>
                setNewService({ ...newService, desc: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Services List */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Current Services ({services.length})
          </h2>

          {services.length === 0 ? (
            <div className="text-center py-12">
              <i className="fa-solid fa-cogs text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No services added yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Start by adding your first service using the form above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="bg-primary-color/10 p-3 rounded-lg mr-4">
                        <i
                          className={`${service.icon} text-primary-color text-xl`}
                        ></i>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {service.title}
                        </h3>
                        <span className="text-xs text-primary-color bg-primary-color/10 px-2 py-1 rounded-full">
                          {service.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditService(service)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Edit"
                      >
                        <i className="fa-solid fa-edit text-sm"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        title="Delete"
                      >
                        <i className="fa-solid fa-trash text-sm"></i>
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingService && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Edit Service
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Service Title
                    </label>
                    <input
                      type="text"
                      value={editingService.title}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={editingService.desc}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          desc: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Icon
                    </label>
                    <select
                      value={editingService.icon}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          icon: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {icons.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon.replace("fa-solid fa-", "").replace("-", " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={editingService.category}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={handleUpdateService}
                    className="flex-1 bg-primary-color hover:bg-primary-color/90 text-white px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditingService(null)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

const AdminServices = () => {
  return (
    <AdminAuthProvider>
      <ServicesContent />
    </AdminAuthProvider>
  );
};

export default AdminServices;
