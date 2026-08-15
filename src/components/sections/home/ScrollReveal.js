"use client";

import { motion, useReducedMotion } from "motion/react";

const MOTION_TAGS = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
  article: motion.article,
  span: motion.span,
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}) {
  const reduceMotion = useReducedMotion();
  const Tag = MOTION_TAGS[as] || motion.div;

  if (reduceMotion) {
    const Static = as === "li" ? "li" : as === "section" ? "section" : "div";
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -6% 0px" }}
      transition={{
        type: "spring",
        bounce: 0.18,
        duration: 0.65,
        delay: delay / 1000,
      }}
    >
      {children}
    </Tag>
  );
}
