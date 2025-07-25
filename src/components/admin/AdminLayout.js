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
        <div className="flex items-center justify-center h-16 px-4 bg-primary-color">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        </div>

        <nav className="mt-5 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${
                pathname === item.href
                  ? "bg-primary-color text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              } group flex items-center px-2 py-2 text-sm font-medium rounded-md mb-1 transition-all duration-300 nav-link-animate transform hover:translate-x-1`}
            >
              <i
                className={`${item.icon} mr-3 flex-shrink-0 h-4 w-4 transition-transform duration-300 group-hover:scale-110`}
              ></i>
              {item.name}
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
                className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 lg:hidden"
              >
                <i className="fa-solid fa-bars text-xl"></i>
              </button>
              <h2 className="ml-4 text-lg font-semibold text-gray-800 dark:text-white lg:ml-0">
                Portfolio Management
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
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
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
              >
                <i className="fa-solid fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 admin-main-content">
          <div className="py-6">
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
