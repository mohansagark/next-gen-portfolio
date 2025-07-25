"use client";

import { useEffect, useRef } from "react";

const useScrollAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add staggered delay based on element position
            const index = Array.from(entry.target.parentNode.children).indexOf(
              entry.target
            );
            setTimeout(() => {
              entry.target.classList.add("animate-in");
            }, index * 100);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "20px",
      }
    );

    // Observe all scroll-animate elements
    const animateElements = container.querySelectorAll(
      ".scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale"
    );

    animateElements.forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return containerRef;
};

export default useScrollAnimation;
