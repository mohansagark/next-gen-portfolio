"use client";
import { useState } from "react";
import { useAdminAuth } from "@/context_api/AdminAuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/admin");
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: "fa-solid fa-home",
    },
    {
      name: "Portfolio Projects",
      href: "/admin/portfolio",
      icon: "fa-solid fa-briefcase",
    },
    {
      name: "Blog Posts",
      href: "/admin/blogs",
      icon: "fa-solid fa-newspaper",
    },
    {
      name: "Skills",
      href: "/admin/skills",
      icon: "fa-solid fa-code",
    },
    {
      name: "Services",
      href: "/admin/services",
      icon: "fa-solid fa-cogs",
    },
    {
      name: "Testimonials",
      href: "/admin/testimonials",
      icon: "fa-solid fa-star",
    },
    {
      name: "Resume",
      href: "/admin/resume",
      icon: "fa-solid fa-file-alt",
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: "fa-solid fa-gear",
    },
    {
      name: "UI Demo",
      href: "/admin/demo",
      icon: "fa-solid fa-sparkles",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-primary-color">
          <h1 className="text-lg sm:text-xl font-bold text-white">
            Admin Panel
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200 transition-colors"
          >
            <i className="fa-solid fa-times text-xl"></i>
          </button>
        </div>

        <nav className="mt-5 px-2 pb-4 overflow-y-auto h-full">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setSidebarOpen(false)} // Close sidebar on mobile when link is clicked
              className={`${
                pathname === item.href
                  ? "bg-primary-color text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              } group flex items-center px-3 py-3 text-sm font-medium rounded-md mb-1 transition-all duration-300 nav-link-animate transform hover:translate-x-1`}
            >
              <i
                className={`${item.icon} mr-3 flex-shrink-0 h-4 w-4 transition-transform duration-300 group-hover:scale-110`}
              ></i>
              <span className="truncate">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 lg:hidden mr-3"
              >
                <i className="fa-solid fa-bars text-xl"></i>
              </button>
              <h2 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-white truncate">
                Portfolio Management
              </h2>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <img
                    src="/img/hero/me.png"
                    alt="Mohan Sagar"
                    className="w-8 h-8 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600"
                    style={{ display: "none" }}
                  >
                    <span className="text-white text-xs font-bold">MS</span>
                  </div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Welcome, Mohan Sagar
                </span>
              </div>

              {/* Mobile Profile Picture */}
              <div className="sm:hidden flex-shrink-0">
                <img
                  src="/img/hero/me.png"
                  alt="Mohan Sagar"
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600"
                  style={{ display: "none" }}
                >
                  <span className="text-white text-xs font-bold">MS</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
              >
                <i className="fa-solid fa-sign-out-alt mr-1 sm:mr-2"></i>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 admin-main-content">
          <div className="py-4 sm:py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 page-enter">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
