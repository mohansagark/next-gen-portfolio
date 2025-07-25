"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AdminAuthProvider,
  useAdminAuth,
} from "@/context_api/AdminAuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import getSkills from "@/libs/getSkills";

const SkillsContent = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const router = useRouter();
  const [skills, setSkills] = useState([]);
  const [editingSkill, setEditingSkill] = useState(null);
  const [newSkill, setNewSkill] = useState({
    name: "",
    percentage: 85,
    category: "frontend",
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      const skillsData = getSkills();
      setSkills(skillsData || []);
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
    "frontend",
    "backend",
    "database",
    "tools",
    "design",
    "other",
  ];

  const handleAddSkill = () => {
    if (!newSkill.name.trim()) return;

    const skill = {
      id: Date.now().toString(),
      ...newSkill,
      percentage: parseInt(newSkill.percentage),
    };

    setSkills([...skills, skill]);
    setNewSkill({ name: "", percentage: 85, category: "frontend" });
  };

  const handleEditSkill = (skill) => {
    setEditingSkill({ ...skill });
  };

  const handleUpdateSkill = () => {
    const updatedSkills = skills.map((skill) =>
      skill.id === editingSkill.id ? editingSkill : skill
    );
    setSkills(updatedSkills);
    setEditingSkill(null);
  };

  const handleDeleteSkill = (id) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      setSkills(skills.filter((skill) => skill.id !== id));
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <AdminLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Skills Management
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Manage your technical skills and expertise levels
            </p>
          </div>
        </div>

        {/* Add New Skill */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Add New Skill
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Skill Name
              </label>
              <input
                type="text"
                placeholder="e.g., React, Node.js, Python"
                value={newSkill.name}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Proficiency (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={newSkill.percentage}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, percentage: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={newSkill.category}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
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
                onClick={handleAddSkill}
                className="w-full bg-primary-color hover:bg-primary-color/90 text-white px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium admin-touch-target"
              >
                <i className="fa-solid fa-plus mr-2"></i>
                Add Skill
              </button>
            </div>
          </div>
        </div>

        {/* Skills by Category */}
        {Object.keys(groupedSkills).map((category) => (
          <div
            key={category}
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow"
          >
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 capitalize">
              {category} Skills ({groupedSkills[category].length})
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {groupedSkills[category].map((skill) => (
                <div
                  key={skill.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-gray-50 dark:bg-gray-700"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-2 sm:space-y-0">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                      {skill.name}
                    </h3>
                    <div className="flex space-x-2 self-start">
                      <button
                        onClick={() => handleEditSkill(skill)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1 admin-touch-target"
                        title="Edit"
                      >
                        <i className="fa-solid fa-edit text-sm"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1 admin-touch-target"
                        title="Delete"
                      >
                        <i className="fa-solid fa-trash text-sm"></i>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Proficiency</span>
                      <span className="font-medium">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-primary-color h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {skills.length === 0 && (
          <div className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-lg shadow text-center">
            <i className="fa-solid fa-code text-3xl sm:text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No skills added yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              Start by adding your first skill using the form above.
            </p>
          </div>
        )}

        {/* Edit Modal */}
        {editingSkill && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
            <div className="relative top-10 sm:top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white dark:bg-gray-800">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Edit Skill
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Skill Name
                    </label>
                    <input
                      type="text"
                      value={editingSkill.name}
                      onChange={(e) =>
                        setEditingSkill({
                          ...editingSkill,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Proficiency (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editingSkill.percentage}
                      onChange={(e) =>
                        setEditingSkill({
                          ...editingSkill,
                          percentage: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={editingSkill.category}
                      onChange={(e) =>
                        setEditingSkill({
                          ...editingSkill,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
                  <button
                    onClick={handleUpdateSkill}
                    className="flex-1 bg-primary-color hover:bg-primary-color/90 text-white px-4 py-2 rounded-md transition-colors duration-200 admin-touch-target"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditingSkill(null)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition-colors duration-200 admin-touch-target"
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

const AdminSkills = () => {
  return (
    <AdminAuthProvider>
      <SkillsContent />
    </AdminAuthProvider>
  );
};

export default AdminSkills;
