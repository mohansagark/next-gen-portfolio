'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context_api/ThemeContext';
import { portfolioData } from '@/data/adminData';

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

export function Portfolio3D() {
  const { isDark } = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...new Set(portfolioData.map(p => p.category))];
  const filteredProjects = filter === 'all' 
    ? portfolioData 
    : portfolioData.filter(p => p.category === filter);

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
            Featured Projects
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Explore some of my best work across different domains and technologies.
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

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard3D
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
              isDark={isDark}
            />
          ))}
        </motion.div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            isDark={isDark}
          />
        )}
      </div>
    </section>
  );
}

function ProjectCard3D({ project, index, onClick, isDark }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full cursor-pointer"
      onClick={onClick}
    >
      <div
        className={`h-full rounded-xl overflow-hidden transition-all duration-300 ${
          isDark
            ? 'bg-slate-800 hover:shadow-xl hover:shadow-blue-500/20'
            : 'bg-white hover:shadow-xl hover:shadow-blue-200'
        }`}
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
          <motion.div
            initial={{ scale: 1 }}
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex items-center justify-center"
          >
            <div className="text-white text-center">
              <div className="text-5xl mb-2">
                {index % 3 === 0 ? '🚀' : index % 3 === 1 ? '💻' : '🎨'}
              </div>
              <p className="font-semibold">{project.category}</p>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {project.title}
          </h3>
          <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {project.description}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map(tech => (
              <span
                key={tech}
                className={`text-xs px-3 py-1 rounded-full ${
                  isDark
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                project.status === 'completed'
                  ? isDark
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-green-100 text-green-700'
                  : isDark
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {project.status}
            </span>
            <motion.button
              whileHover={{ x: 5 }}
              className={`text-sm font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
            >
              View →
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectDetailModal({ project, onClose, isDark }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className={`max-w-2xl w-full rounded-xl overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-white'}`}
      >
        {/* Modal Header */}
        <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-end justify-between p-6">
          <h2 className="text-3xl font-bold text-white">{project.title}</h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4">
          <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
            {project.content}
          </p>

          <div>
            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span
                  key={tech}
                  className={`px-3 py-1 rounded-full text-sm ${
                    isDark
                      ? 'bg-blue-500/20 text-blue-300'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-lg font-semibold text-center transition-colors ${
                  isDark
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                View Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-lg font-semibold text-center transition-colors border-2 ${
                  isDark
                    ? 'border-blue-400 text-blue-400 hover:bg-blue-400/10'
                    : 'border-blue-500 text-blue-500 hover:bg-blue-50'
                }`}
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
