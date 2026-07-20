"use client";
import Link from "next/link";

// Base circle for every control (page number, arrow, ellipsis).
const CIRCLE =
  "w-9 h-9 sm:w-10 sm:h-10 text-sm sm:text-base font-medium rounded-full inline-flex justify-center items-center transition-all duration-300";
const IDLE =
  "bg-seondary-color dark:bg-transparent text-white-color dark:text-white-color hover:text-white-color hover:bg-primary-color dark:hover:bg-primary-color";
const ACTIVE = "bg-primary-color text-white-color";
const DISABLED = "opacity-40 pointer-events-none";

// Compact page window: always first + last, the current page and its
// neighbours, and an ellipsis wherever there's a gap. Pages are 0-indexed.
const buildPages = (current, total) => {
  const last = total - 1;
  const shown = new Set([0, last]);
  for (let p = current - 1; p <= current + 1; p++) {
    if (p >= 0 && p <= last) shown.add(p);
  }
  const sorted = [...shown].sort((a, b) => a - b);
  const out = [];
  sorted.forEach((page, i) => {
    out.push({ type: "page", value: page });
    if (i < sorted.length - 1 && sorted[i + 1] - page > 1) {
      out.push({ type: "gap", key: `gap-${page}` });
    }
  });
  return out;
};

const Paginations = ({ paginationDetails }) => {
  const { currentpage, totalPages, handleCurrentPage } = paginationDetails;
  if (!totalPages || totalPages <= 1) return null;

  const isFirst = currentpage <= 0;
  const isLast = currentpage >= totalPages - 1;
  const pages = buildPages(currentpage, totalPages);

  return (
    <nav
      aria-label="Blog pagination"
      className="wow fadeInUp"
      data-wow-delay=".3s"
    >
      <ul className="paginations flex flex-nowrap justify-center items-center gap-2 sm:gap-3">
        {/* previous */}
        <li>
          <Link
            href="#blogs"
            aria-label="Previous page"
            aria-disabled={isFirst}
            onClick={(e) => {
              if (isFirst) {
                e.preventDefault();
                return;
              }
              handleCurrentPage(e, currentpage - 1);
            }}
            className={`${CIRCLE} ${IDLE} ${isFirst ? DISABLED : ""}`}
          >
            <i className="fal fa-arrow-left"></i>
          </Link>
        </li>

        {/* page numbers (sm and up) */}
        {pages.map((item) =>
          item.type === "gap" ? (
            <li key={item.key} className="hidden sm:inline-flex">
              <span
                aria-hidden="true"
                className={`${CIRCLE} text-primary-color-light dark:text-white-color opacity-60`}
              >
                …
              </span>
            </li>
          ) : (
            <li
              key={item.value}
              className={`hidden sm:inline-flex ${
                item.value === currentpage ? "active" : ""
              }`}
            >
              <Link
                href="#blogs"
                aria-label={`Page ${item.value + 1}`}
                aria-current={item.value === currentpage ? "page" : undefined}
                onClick={(e) => handleCurrentPage(e, item.value)}
                className={`${CIRCLE} ${
                  item.value === currentpage ? ACTIVE : IDLE
                }`}
              >
                {item.value + 1}
              </Link>
            </li>
          )
        )}

        {/* compact indicator (below sm) */}
        <li className="sm:hidden">
          <span className="px-3 h-9 inline-flex items-center text-sm font-medium text-primary-color-light dark:text-white-color tabular-nums">
            {currentpage + 1} / {totalPages}
          </span>
        </li>

        {/* next */}
        <li>
          <Link
            href="#blogs"
            aria-label="Next page"
            aria-disabled={isLast}
            onClick={(e) => {
              if (isLast) {
                e.preventDefault();
                return;
              }
              handleCurrentPage(e, currentpage + 1);
            }}
            className={`${CIRCLE} ${IDLE} ${isLast ? DISABLED : ""}`}
          >
            <i className="fal fa-arrow-right"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Paginations;
