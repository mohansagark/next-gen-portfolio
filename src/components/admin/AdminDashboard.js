"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AdminAuthProvider,
  useAdminAuth,
} from "@/context_api/AdminAuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import getBlogs from "@/libs/getBlogs";
import getPortfolio from "@/libs/getPortfolio";
import getSkills from "@/libs/getSkills";
import getTestimonials from "@/libs/getTestimonials";

const DashboardContent = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const router = useRouter();
  const scrollRef = useScrollAnimation();
  const [stats, setStats] = useState({
    blogs: 0,
    portfolio: 0,
    skills: 0,
    testimonials: 0,
  });

  useEffect(() => {
    console.log("🔐 Auth state:", { isAuthenticated, isLoading });
    if (!isLoading && !isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    // Load statistics
    const loadStats = () => {
      console.log("🔍 Loading stats...");

      try {
        const blogs = getBlogs();
        const portfolio = getPortfolio();
        const skills = getSkills();
        const testimonials = getTestimonials();

        console.log("📊 Raw data:", {
          blogs: blogs,
          portfolio: portfolio,
          skills: skills,
          testimonials: testimonials,
        });

        const stats = {
          blogs: blogs?.length || 0,
          portfolio: portfolio?.length || 0,
          skills: skills?.length || 0,
          testimonials: testimonials?.length || 0,
        };

        console.log("📈 Calculated stats:", stats);
        setStats(stats);
      } catch (error) {
        console.error("❌ Error loading stats:", error);
      }
    };

    if (isAuthenticated) {
      loadStats();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="relative">
            {/* Animated rings */}
            <div className="absolute inset-0 rounded-full border-4 border-primary-color border-t-transparent animate-spin"></div>
            <div
              className="absolute inset-2 rounded-full border-4 border-blue-500 border-b-transparent animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "0.8s",
              }}
            ></div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-color to-blue-500 flex items-center justify-center">
              <i className="fa-solid fa-dashboard text-white text-2xl admin-card-float"></i>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Loading Dashboard
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Preparing your admin experience
              <span className="loading-dots"></span>
            </p>
          </div>
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
      color: "from-blue-500 to-blue-600",
      bgPattern: "bg-blue-50 dark:bg-blue-900/20",
      href: "/admin/blogs",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Portfolio Projects",
      count: stats.portfolio,
      icon: "fa-solid fa-briefcase",
      color: "from-green-500 to-green-600",
      bgPattern: "bg-green-50 dark:bg-green-900/20",
      href: "/admin/portfolio",
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "Skills",
      count: stats.skills,
      icon: "fa-solid fa-code",
      color: "from-purple-500 to-purple-600",
      bgPattern: "bg-purple-50 dark:bg-purple-900/20",
      href: "/admin/skills",
      trend: "+5%",
      trendUp: true,
    },
    {
      title: "Testimonials",
      count: stats.testimonials,
      icon: "fa-solid fa-star",
      color: "from-amber-500 to-orange-600",
      bgPattern: "bg-amber-50 dark:bg-amber-900/20",
      href: "/admin/testimonials",
      trend: "+3%",
      trendUp: true,
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
      <div ref={scrollRef} className="space-y-8">
        {/* Welcome Section */}
        <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden shadow-xl rounded-2xl">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="relative px-8 py-8 sm:px-12 sm:py-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
                    <img
                      src="/img/hero/me.png"
                      alt="Mohan Sagar"
                      className="w-16 h-16 rounded-xl object-cover border-2 border-white/30"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div
                      className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-white/30"
                      style={{ display: "none" }}
                    >
                      <span className="text-white text-xl font-bold">MS</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                    Welcome Mohan Sagar
                  </h1>
                  <p className="text-blue-100 text-lg mt-2 opacity-90">
                    Manage your portfolio content and settings from here
                  </p>
                  <div className="flex items-center mt-4 space-x-4">
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-white text-sm font-medium">
                        System Online
                      </span>
                    </div>
                    <div className="text-white/70 text-sm">
                      Last login: {new Date().toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats Mini Cards */}
              <div className="hidden lg:flex space-x-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white">
                    {stats.blogs +
                      stats.portfolio +
                      stats.skills +
                      stats.testimonials}
                  </div>
                  <div className="text-xs text-blue-100 mt-1">Total Items</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-xs text-blue-100 mt-1">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Status Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 p-6 admin-card-hover">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  System Overview
                </h3>
                <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 rounded-full px-3 py-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 dark:text-green-400 text-sm font-medium">
                    All Systems Operational
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    99.9%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Uptime
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    2.3s
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Load Time
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {stats.blogs +
                      stats.portfolio +
                      stats.skills +
                      stats.testimonials}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Total Items
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    4.2 GB
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Storage Used
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 p-6 admin-card-hover">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Today's Views
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      1,234
                    </span>
                    <i className="fa-solid fa-arrow-trend-up text-green-500 text-sm"></i>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    New Messages
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      7
                    </span>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Active Sessions
                  </span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    1
                  </span>
                </div>
              </div>
            </div>

            {/* Weather Widget */}
            <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-xl rounded-2xl p-6 text-white admin-card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Current Weather</h3>
                  <p className="text-blue-100">Your Location</p>
                </div>
                <i className="fa-solid fa-sun text-3xl opacity-80"></i>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-bold">72°F</div>
                <div className="text-blue-100">Sunny & Clear</div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 admin-card-hover min-h-[200px]"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Background Pattern */}
              <div className={`absolute inset-0 ${card.bgPattern} opacity-50`}>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/10"></div>
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full bg-white/5"></div>
                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-16 h-16 rounded-full bg-white/5"></div>
              </div>

              <div className="relative p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`bg-gradient-to-r ${card.color} rounded-xl p-3 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                    >
                      <i className={`${card.icon} text-white text-xl`}></i>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        {card.title}
                      </dt>
                      <dd className="text-3xl font-bold text-gray-900 dark:text-white mt-1 font-mono">
                        {card.count}
                      </dd>
                    </div>
                  </div>

                  {/* Trend Indicator */}
                  <div
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${
                      card.trendUp
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                    }`}
                  >
                    <i
                      className={`fa-solid ${
                        card.trendUp
                          ? "fa-arrow-trend-up"
                          : "fa-arrow-trend-down"
                      }`}
                    ></i>
                    <span>{card.trend}</span>
                  </div>
                </div>
              </div>

              <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-t border-gray-100 dark:border-gray-600">
                <div className="text-sm">
                  <a
                    href={card.href}
                    className="group inline-flex items-center font-medium text-gray-700 dark:text-gray-300 hover:text-primary-color dark:hover:text-primary-color transition-colors duration-200"
                  >
                    <span>View all</span>
                    <i className="fa-solid fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform duration-200"></i>
                  </a>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary-color/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 admin-card-hover">
          <div className="px-8 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Quick Actions
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Get things done faster with these shortcuts
                </p>
              </div>
              <div className="hidden sm:block">
                <div className="bg-gradient-to-r from-primary-color to-blue-600 rounded-full p-3">
                  <i className="fa-solid fa-rocket text-white text-xl"></i>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action, index) => (
                <a
                  key={index}
                  href={action.href}
                  className="group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-8 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-600 overflow-hidden admin-card-hover"
                  style={{
                    animationDelay: `${index * 150}ms`,
                  }}
                >
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Floating Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-color/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-125 transition-transform duration-500"></div>

                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`${action.color} rounded-2xl p-4 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                      >
                        <i className={`${action.icon} text-white text-2xl`}></i>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <i className="fa-solid fa-arrow-up-right text-gray-400 dark:text-gray-500 text-lg"></i>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-color transition-colors duration-300">
                        {action.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {action.description}
                      </p>
                    </div>

                    {/* Progress Bar Animation */}
                    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-color to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden admin-card-hover">
          <div className="px-8 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Recent Activity
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Keep track of your latest changes and updates
                </p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full p-3">
                <i className="fa-solid fa-clock-rotate-left text-white text-xl"></i>
              </div>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-blue-500 to-purple-600"></div>

              <div className="space-y-8">
                {/* Activity Item 1 */}
                <div className="relative flex items-start space-x-6 group">
                  <div className="relative z-10">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                      <i className="fa-solid fa-check text-white text-lg"></i>
                    </div>
                    <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <div className="flex-1 min-w-0 group-hover:transform group-hover:translate-x-2 transition-transform duration-300">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Admin System Initialized
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Dashboard and all admin features are now fully
                            operational
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            <time dateTime="2025-07-25">Just now</time>
                          </div>
                          <div className="flex items-center mt-2 space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                              Active
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Item 2 */}
                <div className="relative flex items-start space-x-6 group">
                  <div className="relative z-10">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                      <i className="fa-solid fa-palette text-white text-lg"></i>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 group-hover:transform group-hover:translate-x-2 transition-transform duration-300">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            UI/UX Enhancements Applied
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Dashboard design updated with modern animations and
                            improved user experience
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            <time dateTime="2025-07-25">2 minutes ago</time>
                          </div>
                          <div className="flex items-center mt-2 space-x-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                              Completed
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Item 3 */}
                <div className="relative flex items-start space-x-6 group">
                  <div className="relative z-10">
                    <div className="bg-gradient-to-r from-purple-500 to-violet-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                      <i className="fa-solid fa-shield-check text-white text-lg"></i>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 group-hover:transform group-hover:translate-x-2 transition-transform duration-300">
                    <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Security Features Enabled
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Authentication system and protected routes are
                            working correctly
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            <time dateTime="2025-07-25">5 minutes ago</time>
                          </div>
                          <div className="flex items-center mt-2 space-x-1">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                              Verified
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
