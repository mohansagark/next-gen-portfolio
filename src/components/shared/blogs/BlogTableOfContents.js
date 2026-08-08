import React from "react";

/**
 * In-page TOC for long posts. Shown when there are enough H2s (or caller opts in).
 */
const BlogTableOfContents = ({ headings = [] }) => {
  if (!headings?.length) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="mb-8 rounded-lg border border-border-color dark:border-gray-color-3 bg-cream-light-color/60 dark:bg-primary-color-light/60 px-5 py-5"
    >
      <h2 className="text-primary-color-light dark:text-white-color text-lg font-bold mb-3">
        On this page
      </h2>
      <ol className="space-y-2 list-none m-0 p-0">
        {headings.map(({ id, text, level }) => (
          <li
            key={id}
            className={level === 3 ? "pl-4" : ""}
          >
            <a
              href={`#${id}`}
              className="text-primary-color-light dark:text-white-color hover:text-primary-color dark:hover:text-primary-color text-[0.95rem] leading-snug transition-colors duration-300"
            >
              {text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BlogTableOfContents;
