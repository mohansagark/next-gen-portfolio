"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AdminAuthProvider,
  useAdminAuth,
} from "@/context_api/AdminAuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import getBlogs from "@/libs/getBlogs";
import getPortfolio from "@/libs/getPortfolio";
import getSkills from "@/libs/getSkills";
import getTestimonials from "@/libs/getTestimonials";

const DashboardContent = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    blogs: 0,
    portfolio: 0,
    skills: 0,
    testimonials: 0,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    // Load statistics
    const loadStats = () => {
      const blogs = getBlogs();
      const portfolio = getPortfolio();
      const skills = getSkills();
      const testimonials = getTestimonials();

      setStats({
        blogs: blogs?.length || 0,
        portfolio: portfolio?.length || 0,
        skills: skills?.length || 0,
        testimonials: testimonials?.length || 0,
      });
    };

    if (isAuthenticated) {
      loadStats();
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

  const dashboardCards = [
    {
      title: "Blog Posts",
      count: stats.blogs,
      icon: "fa-solid fa-newspaper",
      color: "bg-blue-500",
      href: "/admin/blogs",
    },
    {
      title: "Portfolio Projects",
      count: stats.portfolio,
      icon: "fa-solid fa-briefcase",
      color: "bg-green-500",
      href: "/admin/portfolio",
    },
    {
      title: "Skills",
      count: stats.skills,
      icon: "fa-solid fa-code",
      color: "bg-purple-500",
      href: "/admin/skills",
    },
    {
      title: "Testimonials",
      count: stats.testimonials,
      icon: "fa-solid fa-star",
      color: "bg-yellow-500",
      href: "/admin/testimonials",
    },
  ];

  const quickActions = [
    {
      title: "Add New Blog Post",
      description: "Create a new blog post",
      icon: "fa-solid fa-plus",
      href: "/admin/blogs/new",
      color: "bg-blue-500",
    },
    {
      title: "Add Portfolio Project",
      description: "Add a new project to your portfolio",
      icon: "fa-solid fa-folder-plus",
      href: "/admin/portfolio/new",
      color: "bg-green-500",
    },
    {
      title: "Manage Skills",
      description: "Update your skills and expertise",
      icon: "fa-solid fa-wrench",
      href: "/admin/skills",
      color: "bg-purple-500",
    },
    {
      title: "Site Settings",
      description: "Configure site-wide settings",
      icon: "fa-solid fa-gear",
      href: "/admin/settings",
      color: "bg-gray-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <i className="fa-solid fa-dashboard text-4xl text-primary-color"></i>
              </div>
              <div className="ml-5">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome to Admin Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage your portfolio content and settings from here
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${card.color} rounded-md p-3`}>
                      <i className={`${card.icon} text-white text-xl`}></i>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        {card.title}
                      </dt>
                      <dd className="text-3xl font-semibold text-gray-900 dark:text-white">
                        {card.count}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                <div className="text-sm">
                  <a
                    href={card.href}
                    className="font-medium text-primary-color hover:text-primary-color/80 transition-colors duration-200"
                  >
                    View all <i className="fa-solid fa-arrow-right ml-1"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action, index) => (
                <a
                  key={index}
                  href={action.href}
                  className="relative group bg-gray-50 dark:bg-gray-700 p-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <div>
                    <span
                      className={`${action.color} rounded-lg inline-flex p-3`}
                    >
                      <i className={`${action.icon} text-white text-xl`}></i>
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {action.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {action.description}
                    </p>
                  </div>
                  <span className="absolute top-6 right-6 text-gray-300 group-hover:text-gray-400 transition-colors duration-200">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            <div className="flow-root">
              <ul className="-mb-8">
                <li>
                  <div className="relative pb-8">
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="bg-green-500 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                          <i className="fa-solid fa-check text-white text-sm"></i>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Admin system initialized successfully
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                          <time dateTime="2025-07-25">Just now</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const AdminDashboard = () => {
  return (
    <AdminAuthProvider>
      <DashboardContent />
    </AdminAuthProvider>
  );
};

export default AdminDashboard;
