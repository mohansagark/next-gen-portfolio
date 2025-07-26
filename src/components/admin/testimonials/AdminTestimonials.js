"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AdminAuthProvider,
  useAdminAuth,
} from "@/context_api/AdminAuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import getTestimonials from "@/libs/getTestimonials";

const TestimonialsContent = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const router = useRouter();
  const [testimonials, setTestimonials] = useState([]);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    position: "",
    company: "",
    feedback: "",
    rating: 5,
    img: "",
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      const testimonialsData = getTestimonials();
      setTestimonials(testimonialsData || []);
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

  const handleAddTestimonial = () => {
    if (!newTestimonial.name.trim() || !newTestimonial.feedback.trim()) return;

    const testimonial = {
      id: Date.now().toString(),
      ...newTestimonial,
      rating: parseInt(newTestimonial.rating),
    };

    setTestimonials([...testimonials, testimonial]);
    setNewTestimonial({
      name: "",
      position: "",
      company: "",
      feedback: "",
      rating: 5,
      img: "",
    });
  };

  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial({ ...testimonial });
  };

  const handleUpdateTestimonial = () => {
    const updatedTestimonials = testimonials.map((testimonial) =>
      testimonial.id === editingTestimonial.id
        ? editingTestimonial
        : testimonial
    );
    setTestimonials(updatedTestimonials);
    setEditingTestimonial(null);
  };

  const handleDeleteTestimonial = (id) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials(
        testimonials.filter((testimonial) => testimonial.id !== id)
      );
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`fa-solid fa-star text-sm ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      ></i>
    ));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Testimonials Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage client testimonials and reviews
          </p>
        </div>

        {/* Add New Testimonial */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Add New Testimonial
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Client Name
              </label>
              <input
                type="text"
                placeholder="e.g., John Doe"
                value={newTestimonial.name}
                onChange={(e) =>
                  setNewTestimonial({ ...newTestimonial, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Position
              </label>
              <input
                type="text"
                placeholder="e.g., CEO, Developer"
                value={newTestimonial.position}
                onChange={(e) =>
                  setNewTestimonial({
                    ...newTestimonial,
                    position: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company
              </label>
              <input
                type="text"
                placeholder="e.g., Tech Corp"
                value={newTestimonial.company}
                onChange={(e) =>
                  setNewTestimonial({
                    ...newTestimonial,
                    company: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rating
              </label>
              <select
                value={newTestimonial.rating}
                onChange={(e) =>
                  setNewTestimonial({
                    ...newTestimonial,
                    rating: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} Star{rating !== 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Profile Image URL
              </label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={newTestimonial.img}
                onChange={(e) =>
                  setNewTestimonial({ ...newTestimonial, img: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Testimonial Feedback
            </label>
            <textarea
              placeholder="Write the client's feedback..."
              value={newTestimonial.feedback}
              onChange={(e) =>
                setNewTestimonial({
                  ...newTestimonial,
                  feedback: e.target.value,
                })
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <button
            onClick={handleAddTestimonial}
            className="bg-primary-color hover:bg-primary-color/90 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            <i className="fa-solid fa-plus mr-2"></i>
            Add Testimonial
          </button>
        </div>

        {/* Testimonials List */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Client Testimonials ({testimonials.length})
          </h2>

          {testimonials.length === 0 ? (
            <div className="text-center py-12">
              <i className="fa-solid fa-star text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No testimonials added yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Start by adding your first client testimonial using the form
                above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200 dark:bg-gray-700">
                        {testimonial.img ? (
                          <img
                            src={testimonial.img}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <i className="fa-solid fa-user text-gray-400"></i>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.position}
                          {testimonial.company && ` at ${testimonial.company}`}
                        </p>
                        <div className="flex space-x-1 mt-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditTestimonial(testimonial)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Edit"
                      >
                        <i className="fa-solid fa-edit text-sm"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        title="Delete"
                      >
                        <i className="fa-solid fa-trash text-sm"></i>
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm italic">
                    "{testimonial.feedback}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingTestimonial && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Edit Testimonial
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Client Name
                    </label>
                    <input
                      type="text"
                      value={editingTestimonial.name}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      value={editingTestimonial.position}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          position: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={editingTestimonial.company}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          company: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rating
                    </label>
                    <select
                      value={editingTestimonial.rating}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          rating: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <option key={rating} value={rating}>
                          {rating} Star{rating !== 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Feedback
                    </label>
                    <textarea
                      value={editingTestimonial.feedback}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          feedback: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={handleUpdateTestimonial}
                    className="flex-1 bg-primary-color hover:bg-primary-color/90 text-white px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditingTestimonial(null)}
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

const AdminTestimonials = () => {
  return (
    <AdminAuthProvider>
      <TestimonialsContent />
    </AdminAuthProvider>
  );
};

export default AdminTestimonials;
