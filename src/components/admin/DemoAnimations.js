"use client";

import { useState, useEffect } from "react";

const DemoAnimations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    // Animated counter
    const interval = setInterval(() => {
      setCount((prev) => (prev < 100 ? prev + 2 : 100));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const demoCards = [
    {
      title: "Hover Animation",
      description: "Interactive card with scale and shadow effects",
      icon: "fa-solid fa-magic-wand-sparkles",
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: "Gradient Effects",
      description: "Beautiful gradient backgrounds and text",
      icon: "fa-solid fa-palette",
      color: "from-pink-500 to-rose-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
    },
    {
      title: "Loading States",
      description: "Smooth loading animations and transitions",
      icon: "fa-solid fa-spinner",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Micro Interactions",
      description: "Delightful hover states and click effects",
      icon: "fa-solid fa-hand-pointer",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div
        className={`text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="text-4xl font-bold gradient-text mb-4">
          Enhanced Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Showcasing modern UI/UX improvements with animations and interactions
        </p>
      </div>

      {/* Animated Counter */}
      <div className="text-center">
        <div className="inline-block bg-gradient-to-r from-primary-color to-blue-600 rounded-full px-8 py-4 shadow-lg">
          <div className="text-white text-3xl font-bold">{count}% Enhanced</div>
        </div>
      </div>

      {/* Demo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {demoCards.map((card, index) => (
          <div
            key={index}
            className={`group relative ${
              card.bgColor
            } rounded-2xl p-6 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              animationDelay: `${index * 200}ms`,
              transitionDelay: `${index * 100}ms`,
            }}
            onClick={() => setActiveCard(activeCard === index ? null : index)}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative">
              <div
                className={`bg-gradient-to-r ${card.color} rounded-xl p-4 w-fit mb-4 transform group-hover:rotate-6 transition-transform duration-300`}
              >
                <i className={`${card.icon} text-white text-2xl`}></i>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-color transition-colors duration-300">
                {card.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {card.description}
              </p>

              {/* Expandable Content */}
              <div
                className={`mt-4 overflow-hidden transition-all duration-500 ${
                  activeCard === index
                    ? "max-h-32 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2 text-primary-color">
                    <i className="fa-solid fa-check-circle"></i>
                    <span className="text-sm font-medium">
                      Feature activated!
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    This demonstrates the interactive capabilities of the
                    enhanced admin interface.
                  </p>
                </div>
              </div>

              {/* Hover Effect Line */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-color to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Elements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Glassmorphism Card */}
        <div className="glass-effect rounded-2xl p-8 text-center">
          <div className="mb-6">
            <div className="inline-block bg-white/20 rounded-full p-4 mb-4">
              <i className="fa-solid fa-sparkles text-3xl text-primary-color admin-card-float"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Glassmorphism Effect
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Modern glass-like design with backdrop blur
            </p>
          </div>
        </div>

        {/* Gradient Animation Card */}
        <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-2xl p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
          <div className="relative z-10">
            <div className="mb-6">
              <i className="fa-solid fa-heart text-4xl mb-4 admin-pulse-slow"></i>
              <h3 className="text-2xl font-bold mb-2">Animated Gradients</h3>
              <p className="opacity-90">
                Dynamic background transitions on hover
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar Demo */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Enhanced Progress Indicators
        </h3>
        <div className="space-y-4">
          {[
            { label: "UI/UX Improvements", value: 95, color: "bg-green-500" },
            { label: "Animation System", value: 88, color: "bg-blue-500" },
            {
              label: "Interactive Elements",
              value: 92,
              color: "bg-purple-500",
            },
            {
              label: "Performance Optimization",
              value: 85,
              color: "bg-orange-500",
            },
          ].map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {item.label}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {item.value}%
                </span>
              </div>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className={`${item.color} h-full rounded-full transition-all duration-1000 ease-out`}
                  style={{
                    width: isVisible ? `${item.value}%` : "0%",
                    transitionDelay: `${index * 200}ms`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemoAnimations;
