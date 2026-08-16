"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

// Matches Tailwind `sm` in this theme (tailwind.config.cjs screens.sm).
const SM_BREAKPOINT_PX = 576;

/**
 * Build a compact page list with ellipsis for desktop/tablet.
 * `current` is 0-based to match usePagination.
 */
function buildPageItems(current, total) {
  if (total <= 0) return [];
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => ({ type: "page", value: i }));
  }

  const show = new Set([0, total - 1]);
  for (let i = current - 1; i <= current + 1; i += 1) {
    if (i >= 0 && i < total) show.add(i);
  }
  if (current <= 2) {
    show.add(1);
    show.add(2);
  }
  if (current >= total - 3) {
    show.add(total - 3);
    show.add(total - 2);
  }

  const sorted = [...show].sort((a, b) => a - b);
  const items = [];
  let prev = null;
  for (const page of sorted) {
    if (prev !== null && page - prev > 1) {
      items.push({ type: "ellipsis", key: `e-${prev}-${page}` });
    }
    items.push({ type: "page", value: page });
    prev = page;
  }
  return items;
}

const Paginations = ({ paginationDetails }) => {
  const { currentpage, totalPages, handleCurrentPage } = paginationDetails;
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mq = window.matchMedia(`(max-width: ${SM_BREAKPOINT_PX - 1}px)`);
    const sync = () => setIsCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const pages = useMemo(
    () => (isCompact ? [] : buildPageItems(currentpage, totalPages)),
    [isCompact, currentpage, totalPages]
  );

  if (!totalPages || totalPages <= 1) return null;

  const isFirst = currentpage <= 0;
  const isLast = currentpage >= totalPages - 1;

  return (
    <Pagination
      aria-label="Blog pagination"
      className="wow fadeInUp w-full max-w-full min-w-0"
      data-wow-delay=".3s"
    >
      <PaginationContent className="flex-wrap justify-center gap-1 sm:gap-1.5">
        <PaginationItem>
          <PaginationPrevious
            href="#blogs"
            aria-disabled={isFirst ? true : undefined}
            tabIndex={isFirst ? -1 : undefined}
            onClick={(e) => {
              if (isFirst) {
                e.preventDefault();
                return;
              }
              handleCurrentPage(e, currentpage - 1);
            }}
            className={cn(
              "min-h-10 min-w-10 touch-manipulation px-2.5 sm:min-h-9 sm:pl-2.5",
              "[&>span]:hidden sm:[&>span]:inline",
              isFirst && "pointer-events-none opacity-40"
            )}
          />
        </PaginationItem>

        {isCompact ? (
          <PaginationItem>
            <span
              className="inline-flex min-h-10 min-w-[4.5rem] items-center justify-center px-2 text-sm font-medium text-foreground tabular-nums"
              aria-current="page"
            >
              {currentpage + 1} / {totalPages}
            </span>
          </PaginationItem>
        ) : (
          pages.map((item) =>
            item.type === "ellipsis" ? (
              <PaginationItem key={item.key}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={item.value}>
                <PaginationLink
                  href="#blogs"
                  isActive={item.value === currentpage}
                  aria-label={`Page ${item.value + 1}`}
                  onClick={(e) => handleCurrentPage(e, item.value)}
                  className="min-h-9 min-w-9 touch-manipulation"
                >
                  {item.value + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )
        )}

        <PaginationItem>
          <PaginationNext
            href="#blogs"
            aria-disabled={isLast ? true : undefined}
            tabIndex={isLast ? -1 : undefined}
            onClick={(e) => {
              if (isLast) {
                e.preventDefault();
                return;
              }
              handleCurrentPage(e, currentpage + 1);
            }}
            className={cn(
              "min-h-10 min-w-10 touch-manipulation px-2.5 sm:min-h-9 sm:pr-2.5",
              "[&>span]:hidden sm:[&>span]:inline",
              isLast && "pointer-events-none opacity-40"
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginations;
