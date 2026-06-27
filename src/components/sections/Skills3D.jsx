'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context_api/ThemeContext';
import { skillsData } from '@/data/adminData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function Skills3D() {
  const { isDark } = useTheme();
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...new Set(skillsData.map(s => s.category))];
  const filteredSkills = filter === 'all' 
    ? skillsData 
    : skillsData.filter(s => s.category === filter);

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Skills & Expertise
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            A comprehensive overview of my technical skills and expertise across different domains.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all capitalize ${
                filter === cat
                  ? isDark 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-500 text-white'
                  : isDark
                    ? 'bg-slate-800 text-gray-400 hover:text-gray-300'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredSkills.map(skill => (
            <SkillCard3D
              key={skill.id}
              skill={skill}
              isDark={isDark}
            />
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className={`p-8 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
            <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Proficiency Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['Expert', 'Advanced', 'Intermediate', 'Learning'].map((level, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${
                    index === 0 ? 'text-green-500' :
                    index === 1 ? 'text-blue-500' :
                    index === 2 ? 'text-yellow-500' : 'text-purple-500'
                  }`}>
                    {[10, 8, 4, 2][index]}
                  </div>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{level}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard3D({ skill, isDark }) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const getProficiencyColor = () => {
    if (skill.level >= 85) return isDark ? 'from-green-500 to-green-600' : 'from-green-400 to-green-500';
    if (skill.level >= 70) return isDark ? 'from-blue-500 to-blue-600' : 'from-blue-400 to-blue-500';
    if (skill.level >= 50) return isDark ? 'from-yellow-500 to-yellow-600' : 'from-yellow-400 to-yellow-500';
    return isDark ? 'from-purple-500 to-purple-600' : 'from-purple-400 to-purple-500';
  };

  return (
    <motion.div
      ref={containerRef}
      variants={itemVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <div
        className={`h-full p-6 rounded-xl transition-all duration-300 flex flex-col ${
          isDark
            ? 'bg-slate-800 hover:shadow-xl hover:shadow-blue-500/20'
            : 'bg-white hover:shadow-xl hover:shadow-blue-200 border border-gray-200'
        }`}
      >
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {skill.name}
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {skill.category}
              </p>
            </div>
            <div className="text-3xl">{skill.icon}</div>
          </div>
        </div>

        {/* Level Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Proficiency
            </span>
            <span className={`text-sm font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              {skill.level}%
            </span>
          </div>
          
          <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className={`h-full rounded-full bg-gradient-to-r ${getProficiencyColor()}`}
            />
          </div>
        </div>

        {/* Experience */}
        <div className={`text-sm mb-4 p-3 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
          <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
            <span className="font-semibold">Experience:</span> {skill.experience}
          </p>
        </div>

        {/* Description */}
        <p className={`flex-grow text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {skill.description}
        </p>

        {/* Featured Badge */}
        {skill.featured && (
          <div className="mt-4 pt-4 border-t border-gray-300/20">
            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
              isDark
                ? 'bg-blue-500/20 text-blue-300'
                : 'bg-blue-100 text-blue-700'
            }`}>
              ⭐ Featured Skill
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
