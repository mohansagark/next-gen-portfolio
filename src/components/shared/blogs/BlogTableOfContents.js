import React from "react";

/**
 * In-page TOC for long posts. Shown when there are enough H2s (or caller opts in).
 */
const BlogTableOfContents = ({ headings = [] }) => {
  if (!headings?.length) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="mb-8 rounded-lg border border-[#e5e7eb] dark:border-[#262b33] bg-white dark:bg-[#12151a] px-5 py-5"
    >
      <h2 className="text-[#0b0d10] dark:text-[#f3f4f6] text-lg font-bold mb-3">
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
              className="text-[#374151] dark:text-[#9aa3af] hover:text-teal-700 dark:hover:text-[#5eead4] text-[0.95rem] leading-snug transition-colors duration-300"
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
