'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context_api/ThemeContext';

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

export function Footer3D() {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', href: '#home' },
        { label: 'Portfolio', href: '#portfolio' },
        { label: 'Skills', href: '#skills' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: '#blog' },
        { label: 'Resume', href: '/resume.pdf' },
        { label: 'Documentation', href: '#docs' },
        { label: 'GitHub', href: 'https://github.com' },
      ],
    },
    {
      title: 'Social',
      links: [
        { label: 'Twitter', href: 'https://twitter.com' },
        { label: 'LinkedIn', href: 'https://linkedin.com' },
        { label: 'GitHub', href: 'https://github.com' },
        { label: 'Email', href: 'mailto:hello@mohansagar.dev' },
      ],
    },
  ];

  return (
    <footer className={`${isDark ? 'bg-slate-950' : 'bg-slate-900'}`}>
      {/* Main Footer Content */}
      <div className={`${isDark ? 'bg-slate-900' : 'bg-slate-800'} py-16 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto">
          {/* Footer Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          >
            {/* Brand */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                Mohan Sagar
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Full Stack Developer crafting immersive digital experiences with cutting-edge web technologies.
              </p>
            </motion.div>

            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <motion.div key={index} variants={itemVariants}>
                <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <div className={`border-t ${isDark ? 'border-slate-700' : 'border-slate-700/50'} my-12`} />

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              © {currentYear} Mohan Sagar. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {['LinkedIn', 'GitHub', 'Twitter', 'Email'].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    isDark
                      ? 'bg-slate-800 hover:bg-blue-600 text-gray-300 hover:text-white'
                      : 'bg-slate-700 hover:bg-blue-600 text-gray-300 hover:text-white'
                  }`}
                >
                  {social[0]}
                </motion.a>
              ))}
            </div>

            {/* Tech Stack Info */}
            <div className="text-gray-400 text-xs text-center md:text-right">
              Built with <span className="text-blue-400 font-semibold">React</span>, <span className="text-purple-400 font-semibold">Three.js</span>, and <span className="text-pink-400 font-semibold">Tailwind</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTopButton isDark={isDark} />
    </footer>
  );
}

function ScrollToTopButton({ isDark }) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-40 p-3 rounded-full transition-colors ${
            isDark
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function AnimatePresence({ children }) {
  return children;
}
