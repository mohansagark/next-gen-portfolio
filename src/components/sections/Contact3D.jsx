'use client';

import React, { useState } from 'react';
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

export function Contact3D() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setLoading(false);

    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-slate-950' : 'bg-gradient-to-br from-gray-50 to-white'}`}>
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
            Get In Touch
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Have a project in mind? Let's talk about how I can help you bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Let's Connect
              </h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
              </p>
            </motion.div>

            {/* Contact Details */}
            {[
              {
                icon: '✉️',
                label: 'Email',
                value: 'hello@mohansagar.dev',
                href: 'mailto:hello@mohansagar.dev',
              },
              {
                icon: '📱',
                label: 'Phone',
                value: '+1 (555) 123-4567',
                href: 'tel:+15551234567',
              },
              {
                icon: '📍',
                label: 'Location',
                value: 'San Francisco, CA',
                href: null,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex gap-4 p-4 rounded-lg ${isDark ? 'bg-slate-800/50' : 'bg-white/50'}`}
              >
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <p className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className={`text-lg font-semibold hover:underline ${
                        isDark ? 'text-blue-400' : 'text-blue-600'
                      }`}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {item.value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <p className={`text-sm font-semibold mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Follow Me
              </p>
              <div className="flex gap-4">
                {['LinkedIn', 'GitHub', 'Twitter'].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      isDark
                        ? 'bg-slate-800 hover:bg-blue-600 text-gray-300 hover:text-white'
                        : 'bg-gray-200 hover:bg-blue-500 text-gray-700 hover:text-white'
                    }`}
                  >
                    {social[0]}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`p-8 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-slate-700' : 'border-white/20'}`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 rounded-lg transition-colors ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white placeholder-gray-600 focus:border-blue-500'
                      : 'bg-white/50 border-gray-300 text-slate-900 placeholder-gray-400 focus:border-blue-500'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 rounded-lg transition-colors ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white placeholder-gray-600 focus:border-blue-500'
                      : 'bg-white/50 border-gray-300 text-slate-900 placeholder-gray-400 focus:border-blue-500'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className={`w-full px-4 py-3 rounded-lg transition-colors ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white placeholder-gray-600 focus:border-blue-500'
                      : 'bg-white/50 border-gray-300 text-slate-900 placeholder-gray-400 focus:border-blue-500'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows="5"
                  className={`w-full px-4 py-3 rounded-lg transition-colors resize-none ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white placeholder-gray-600 focus:border-blue-500'
                      : 'bg-white/50 border-gray-300 text-slate-900 placeholder-gray-400 focus:border-blue-500'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                type="submit"
                className={`w-full px-6 py-3 rounded-lg font-semibold transition-all ${
                  loading
                    ? isDark
                      ? 'bg-slate-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : isDark
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>

              {/* Success Message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg text-center ${
                    isDark
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  ✓ Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
