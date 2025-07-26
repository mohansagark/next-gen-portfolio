"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { AdminAuthProvider } from "@/context_api/AdminAuthContext";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const ScrollDemo = () => {
  const scrollRef = useScrollAnimation();
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      title: "Page Transition Animations",
      description:
        "Smooth fade-in and slide animations when navigating between pages",
      icon: "fa-solid fa-arrows-turn-right",
      color: "from-blue-500 to-indigo-600",
      features: [
        "Fade-in transitions",
        "Slide animations",
        "Scale effects",
        "Staggered reveals",
      ],
    },
    {
      title: "Scroll-triggered Animations",
      description: "Elements animate into view as you scroll down the page",
      icon: "fa-solid fa-arrows-up-down",
      color: "from-green-500 to-emerald-600",
      features: [
        "Intersection Observer",
        "Smooth transitions",
        "Staggered delays",
        "Multiple directions",
      ],
    },
    {
      title: "Enhanced Hover Effects",
      description:
        "Interactive hover states with smooth transitions and transforms",
      icon: "fa-solid fa-hand-pointer",
      color: "from-purple-500 to-violet-600",
      features: [
        "Scale transforms",
        "Shadow effects",
        "Color transitions",
        "Icon animations",
      ],
    },
    {
      title: "Optimized Performance",
      description:
        "Hardware-accelerated animations with smooth 60fps performance",
      icon: "fa-solid fa-gauge-high",
      color: "from-orange-500 to-red-600",
      features: [
        "CSS transforms",
        "GPU acceleration",
        "Optimized rendering",
        "Smooth scrolling",
      ],
    },
  ];

  const demoCards = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Demo Card ${i + 1}`,
    description: `This card demonstrates scroll animation ${i + 1}`,
    color: `from-${
      ["blue", "green", "purple", "pink", "yellow", "indigo"][i % 6]
    }-500 to-${
      ["blue", "green", "purple", "pink", "yellow", "indigo"][i % 6]
    }-600`,
  }));

  const scrollToSection = (index) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      setActiveSection(index);
    }
  };

  return (
    <AdminLayout>
      <div ref={scrollRef} className="space-y-12">
        {/* Header */}
        <div className="text-center scroll-animate">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Animation & Scroll Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the smooth animations, page transitions, and scroll
            effects implemented in the admin dashboard
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center scroll-animate">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(index)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    activeSection === index
                      ? "bg-primary-color text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Section {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Sections */}
        {sections.map((section, index) => (
          <div
            key={index}
            id={`section-${index}`}
            className="scroll-animate"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div
              className={`bg-gradient-to-br ${section.color} rounded-3xl p-8 text-white shadow-2xl admin-card-hover`}
            >
              <div className="flex items-center mb-6">
                <div className="bg-white/20 rounded-2xl p-4 mr-6">
                  <i className={`${section.icon} text-3xl`}></i>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{section.title}</h2>
                  <p className="text-white/90 text-lg">{section.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {section.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 scroll-animate-scale"
                    style={{ animationDelay: `${featureIndex * 100}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <i className="fa-solid fa-check-circle text-white/80"></i>
                      <span className="font-medium">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Demo Cards Grid */}
        <div className="scroll-animate">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Scroll Animation Demo Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {demoCards.map((card, index) => (
              <div
                key={card.id}
                className="scroll-animate admin-card-hover"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white shadow-lg`}
                >
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-xl font-bold">{card.id}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-white/80">{card.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                      <div
                        className="w-2 h-2 bg-white/40 rounded-full animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-white/40 rounded-full animate-pulse"
                        style={{ animationDelay: "1s" }}
                      ></div>
                    </div>
                    <i className="fa-solid fa-arrow-up-right text-white/60 group-hover:text-white transition-colors duration-300"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="scroll-animate">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Interactive Elements
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hover Demo */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 admin-card-hover scroll-animate-left">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Hover Effects Demo
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Hover over the buttons below to see smooth transform animations
              </p>
              <div className="space-y-4">
                {["Primary Action", "Secondary Action", "Danger Action"].map(
                  (label, index) => (
                    <button
                      key={index}
                      className={`w-full p-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                        index === 0
                          ? "bg-primary-color text-white hover:bg-primary-color/90"
                          : index === 1
                          ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      {label}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Animation Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 admin-card-hover scroll-animate-right">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Animation Controls
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Control various animation effects and transitions
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    Page Transitions
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    Scroll Animations
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    Hover Effects
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center scroll-animate">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🎉 Animation System Complete!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The admin dashboard now features smooth page transitions,
              scroll-triggered animations, enhanced hover effects, and optimized
              performance. Navigate between pages to experience the improved
              user interface!
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const AnimationDemo = () => {
  return (
    <AdminAuthProvider>
      <ScrollDemo />
    </AdminAuthProvider>
  );
};

export default AnimationDemo;
