"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AdminAuthProvider,
  useAdminAuth,
} from "@/context_api/AdminAuthContext";
import AdminLayout from "@/components/admin/AdminLayout";

const SettingsContent = () => {
  const { isAuthenticated, isLoading, user } = useAdminAuth();
  const router = useRouter();
  const [settings, setSettings] = useState({
    siteTitle: "Next-Gen Portfolio",
    siteDescription: "Modern portfolio website built with Next.js",
    primaryColor: "#7c3aed",
    enableDarkMode: true,
    enableBlogComments: true,
    contactEmail: "contact@example.com",
    socialLinks: {
      github: "https://github.com/username",
      linkedin: "https://linkedin.com/in/username",
      twitter: "https://twitter.com/username",
    },
    seoSettings: {
      enableSEO: true,
      metaTitle: "Portfolio - Full Stack Developer",
      metaDescription:
        "Professional portfolio showcasing web development projects and skills",
      ogImage: "/img/og-image.jpg",
    },
  });
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, isLoading, router]);

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
    { id: "general", name: "General", icon: "fa-solid fa-cog" },
    { id: "appearance", name: "Appearance", icon: "fa-solid fa-palette" },
    { id: "social", name: "Social Links", icon: "fa-solid fa-share-alt" },
    { id: "seo", name: "SEO", icon: "fa-solid fa-search" },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    setTimeout(() => {
      setSaveMessage("Settings saved successfully!");
      setIsSaving(false);
      setTimeout(() => setSaveMessage(""), 3000);
    }, 1000);
  };

  const handleInputChange = (section, key, value) => {
    if (section) {
      setSettings({
        ...settings,
        [section]: {
          ...settings[section],
          [key]: value,
        },
      });
    } else {
      setSettings({
        ...settings,
        [key]: value,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Configure your portfolio website settings
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary-color hover:bg-primary-color/90 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Saving...
              </>
            ) : (
              <>
                <i className="fa-solid fa-save mr-2"></i>
                Save Changes
              </>
            )}
          </button>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-md">
            <i className="fa-solid fa-check-circle mr-2"></i>
            {saveMessage}
          </div>
        )}

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
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site Title
                  </label>
                  <input
                    type="text"
                    value={settings.siteTitle}
                    onChange={(e) =>
                      handleInputChange(null, "siteTitle", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site Description
                  </label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) =>
                      handleInputChange(null, "siteDescription", e.target.value)
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) =>
                      handleInputChange(null, "contactEmail", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableBlogComments"
                    checked={settings.enableBlogComments}
                    onChange={(e) =>
                      handleInputChange(
                        null,
                        "enableBlogComments",
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 text-primary-color focus:ring-primary-color border-gray-300 rounded"
                  />
                  <label
                    htmlFor="enableBlogComments"
                    className="ml-2 block text-sm text-gray-900 dark:text-white"
                  >
                    Enable blog comments
                  </label>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) =>
                        handleInputChange(null, "primaryColor", e.target.value)
                      }
                      className="h-10 w-20 border border-gray-300 dark:border-gray-600 rounded-md"
                    />
                    <input
                      type="text"
                      value={settings.primaryColor}
                      onChange={(e) =>
                        handleInputChange(null, "primaryColor", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableDarkMode"
                    checked={settings.enableDarkMode}
                    onChange={(e) =>
                      handleInputChange(
                        null,
                        "enableDarkMode",
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 text-primary-color focus:ring-primary-color border-gray-300 rounded"
                  />
                  <label
                    htmlFor="enableDarkMode"
                    className="ml-2 block text-sm text-gray-900 dark:text-white"
                  >
                    Enable dark mode support
                  </label>
                </div>
              </div>
            )}

            {/* Social Links */}
            {activeTab === "social" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={settings.socialLinks.github}
                    onChange={(e) =>
                      handleInputChange("socialLinks", "github", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={settings.socialLinks.linkedin}
                    onChange={(e) =>
                      handleInputChange(
                        "socialLinks",
                        "linkedin",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Twitter URL
                  </label>
                  <input
                    type="url"
                    value={settings.socialLinks.twitter}
                    onChange={(e) =>
                      handleInputChange(
                        "socialLinks",
                        "twitter",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* SEO Settings */}
            {activeTab === "seo" && (
              <div className="space-y-6">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="enableSEO"
                    checked={settings.seoSettings.enableSEO}
                    onChange={(e) =>
                      handleInputChange(
                        "seoSettings",
                        "enableSEO",
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 text-primary-color focus:ring-primary-color border-gray-300 rounded"
                  />
                  <label
                    htmlFor="enableSEO"
                    className="ml-2 block text-sm text-gray-900 dark:text-white"
                  >
                    Enable SEO optimization
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={settings.seoSettings.metaTitle}
                    onChange={(e) =>
                      handleInputChange(
                        "seoSettings",
                        "metaTitle",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={settings.seoSettings.metaDescription}
                    onChange={(e) =>
                      handleInputChange(
                        "seoSettings",
                        "metaDescription",
                        e.target.value
                      )
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    OG Image URL
                  </label>
                  <input
                    type="text"
                    value={settings.seoSettings.ogImage}
                    onChange={(e) =>
                      handleInputChange(
                        "seoSettings",
                        "ogImage",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const AdminSettings = () => {
  return (
    <AdminAuthProvider>
      <SettingsContent />
    </AdminAuthProvider>
  );
};

export default AdminSettings;
