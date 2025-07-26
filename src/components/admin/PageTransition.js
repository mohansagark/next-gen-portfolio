"use client";

import { useState, useEffect, useRef } from "react";

const PageTransition = ({ children, className = "" }) => {
  const [isMounted, setIsMounted] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);

    if (contentRef.current) {
      // Add intersection observer for scroll animations
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-in");
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "50px",
        }
      );

      // Observe all elements with scroll-animate class
      const animateElements =
        contentRef.current.querySelectorAll(".scroll-animate");
      animateElements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }
  }, []);

  return (
    <div
      ref={contentRef}
      className={`transition-all duration-700 ease-out ${
        isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default PageTransition;
