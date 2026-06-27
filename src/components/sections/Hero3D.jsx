'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scene3D } from './Scene3D';
import { RotatingCube, FloatingOrb, ParticleSystem, GridPlane } from './Geometries';
import { useTheme } from '@/context_api/ThemeContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export function Hero3D() {
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className={`relative min-h-screen overflow-hidden ${isDark ? 'bg-slate-950' : 'bg-gradient-to-br from-white to-gray-100'}`}>
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 w-full h-screen">
        <Scene3D className="w-full h-full">
          <ParticleSystem />
          <GridPlane />
          <RotatingCube />
          <FloatingOrb />
        </Scene3D>
      </div>

      {/* Overlay gradient for better text contrast */}
      <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-transparent via-transparent to-slate-950/80' : 'bg-gradient-to-b from-transparent via-transparent to-white/80'}`} />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Glowing badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border ${isDark ? 'border-blue-500/50 bg-blue-500/10' : 'border-blue-300 bg-blue-100/50'}`}>
              <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'} animate-pulse`} />
              <span className={`text-sm font-medium ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                Welcome to My 3D Portfolio
              </span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            Mohan Sagar
            <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Full Stack Developer
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className={`text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Crafting immersive digital experiences with cutting-edge web technologies. 
            5+ years of expertise in React, Node.js, and modern web development.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-lg font-semibold border-2 transition-all ${isDark ? 'border-blue-400 text-blue-400 hover:bg-blue-400/10' : 'border-blue-500 text-blue-500 hover:bg-blue-100'}`}
            >
              Contact Me
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${isDark ? 'border-gray-500' : 'border-gray-400'}`}>
              <div className={`w-1 h-2 rounded-full mt-2 ${isDark ? 'bg-gray-500' : 'bg-gray-400'}`} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
