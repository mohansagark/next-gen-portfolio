"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AdminAuthProvider,
  useAdminAuth,
} from "@/context_api/AdminAuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import getResume from "@/libs/getResume";

const ResumeContent = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const router = useRouter();
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      summary: "",
    },
    experience: [],
    education: [],
    certifications: [],
    awards: [],
  });
  const [activeTab, setActiveTab] = useState("personal");
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({});

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      const resume = getResume();
      if (resume && resume.length > 0) {
        // Parse resume data from the array format
        const parsedResume = {
          personalInfo: {
            name: "John Doe",
            title: "Full Stack Developer",
            email: "john@example.com",
            phone: "+1 234 567 8900",
            location: "New York, NY",
            website: "https://johndoe.com",
            summary:
              "Experienced full stack developer with 5+ years in web development.",
          },
          experience: resume || [],
          education: [],
          certifications: [],
          awards: [],
        };
        setResumeData(parsedResume);
      }
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

  const tabs = [
    { id: "personal", name: "Personal Info", icon: "fa-solid fa-user" },
    { id: "experience", name: "Experience", icon: "fa-solid fa-briefcase" },
    { id: "education", name: "Education", icon: "fa-solid fa-graduation-cap" },
    {
      id: "certifications",
      name: "Certifications",
      icon: "fa-solid fa-certificate",
    },
    { id: "awards", name: "Awards", icon: "fa-solid fa-trophy" },
  ];

  const handlePersonalInfoChange = (field, value) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    });
  };

  const handleAddItem = (section) => {
    const item = {
      id: Date.now().toString(),
      ...newItem,
    };

    setResumeData({
      ...resumeData,
      [section]: [...resumeData[section], item],
    });

    setNewItem({});
  };

  const handleEditItem = (section, item) => {
    setEditingItem({ section, item: { ...item } });
  };

  const handleUpdateItem = () => {
    const { section, item } = editingItem;
    setResumeData({
      ...resumeData,
      [section]: resumeData[section].map((i) => (i.id === item.id ? item : i)),
    });
    setEditingItem(null);
  };

  const handleDeleteItem = (section, id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setResumeData({
        ...resumeData,
        [section]: resumeData[section].filter((item) => item.id !== id),
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Resume Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your professional resume and career information
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? "border-primary-color text-primary-color"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
                >
                  <i className={`${tab.icon} mr-2`}></i>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Personal Information */}
            {activeTab === "personal" && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.name}
                      onChange={(e) =>
                        handlePersonalInfoChange("name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Professional Title
                    </label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.title}
                      onChange={(e) =>
                        handlePersonalInfoChange("title", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) =>
                        handlePersonalInfoChange("email", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) =>
                        handlePersonalInfoChange("phone", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.location}
                      onChange={(e) =>
                        handlePersonalInfoChange("location", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={resumeData.personalInfo.website}
                      onChange={(e) =>
                        handlePersonalInfoChange("website", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Professional Summary
                  </label>
                  <textarea
                    value={resumeData.personalInfo.summary}
                    onChange={(e) =>
                      handlePersonalInfoChange("summary", e.target.value)
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* Experience */}
            {activeTab === "experience" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Work Experience
                  </h3>
                  <button
                    onClick={() =>
                      setNewItem({
                        title: "",
                        company: "",
                        period: "",
                        description: "",
                      })
                    }
                    className="bg-primary-color hover:bg-primary-color/90 text-white px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    <i className="fa-solid fa-plus mr-2"></i>
                    Add Experience
                  </button>
                </div>

                {/* Add new experience form */}
                {newItem.hasOwnProperty("title") && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={newItem.title || ""}
                        onChange={(e) =>
                          setNewItem({ ...newItem, title: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={newItem.company || ""}
                        onChange={(e) =>
                          setNewItem({ ...newItem, company: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Period (e.g., Jan 2020 - Present)"
                      value={newItem.period || ""}
                      onChange={(e) =>
                        setNewItem({ ...newItem, period: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
                    />
                    <textarea
                      placeholder="Job description and achievements..."
                      value={newItem.description || ""}
                      onChange={(e) =>
                        setNewItem({ ...newItem, description: e.target.value })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAddItem("experience")}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setNewItem({})}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Experience list */}
                {resumeData.experience.length === 0 ? (
                  <div className="text-center py-12">
                    <i className="fa-solid fa-briefcase text-4xl text-gray-400 mb-4"></i>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No work experience added yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Start by adding your professional experience.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {resumeData.experience.map((exp) => (
                      <div
                        key={exp.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {exp.title || exp.role}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {exp.company} • {exp.period || exp.duration}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                              {exp.description || exp.details}
                            </p>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <button
                              onClick={() => handleEditItem("experience", exp)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <i className="fa-solid fa-edit"></i>
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteItem("experience", exp.id)
                              }
                              className="text-red-600 hover:text-red-800"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Other sections (Education, Certifications, Awards) would follow similar patterns */}
            {(activeTab === "education" ||
              activeTab === "certifications" ||
              activeTab === "awards") && (
              <div className="text-center py-12">
                <i
                  className={`fa-solid ${
                    activeTab === "education"
                      ? "fa-graduation-cap"
                      : activeTab === "certifications"
                      ? "fa-certificate"
                      : "fa-trophy"
                  } text-4xl text-gray-400 mb-4`}
                ></i>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
                  Management
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  This section is ready for implementation. You can add{" "}
                  {activeTab} management here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Edit {editingItem.section}
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={
                      editingItem.item.title || editingItem.item.role || ""
                    }
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        item: {
                          ...editingItem.item,
                          title: e.target.value,
                          role: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Company/Organization"
                    value={editingItem.item.company || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        item: { ...editingItem.item, company: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <textarea
                    placeholder="Description"
                    value={
                      editingItem.item.description ||
                      editingItem.item.details ||
                      ""
                    }
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        item: {
                          ...editingItem.item,
                          description: e.target.value,
                          details: e.target.value,
                        },
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={handleUpdateItem}
                    className="flex-1 bg-primary-color hover:bg-primary-color/90 text-white px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditingItem(null)}
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

const AdminResume = () => {
  return (
    <AdminAuthProvider>
      <ResumeContent />
    </AdminAuthProvider>
  );
};

export default AdminResume;
