"use client";
import Link from "next/link";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

// Circular page / arrow cells.
const CELL =
  "size-8 sm:size-9 text-sm font-medium rounded-full inline-flex justify-center items-center border transition-all duration-300 select-none shrink-0";
const IDLE =
  "bg-transparent text-primary-color-light dark:text-white-color border-transparent hover:text-primary-color";
const ACTIVE =
  "bg-primary-color text-white-color border-primary-color shadow-sm";
const DISABLED = "opacity-40 pointer-events-none";

const ITEM_PX = 36;
const GAP_PX = 6;
const SIDE_CONTROLS = 2;
const BAR_PAD_PX = 16;
// Total width for all ellipsis blocks combined (~20–30% of the bar).
const DOTS_TOTAL_RATIO = 0.25;

/** Trailing pages stay compact; extra width grows the start cluster. */
function endCountForWidth(width) {
  if (width < 400) return 1;
  if (width < 900) return 2;
  return 3;
}

/** Page-number cells that fit (prev/next + ~25% reserved for dots). */
function pageSlotsForWidth(width) {
  if (!width) return 9;
  const arrowSpace = SIDE_CONTROLS * (ITEM_PX + GAP_PX);
  const dotsReserve = width * DOTS_TOTAL_RATIO;
  const usable = Math.max(
    0,
    width - arrowSpace - BAR_PAD_PX - dotsReserve
  );
  const slots = Math.floor((usable + GAP_PX) / (ITEM_PX + GAP_PX));
  return Math.max(5, slots);
}

function pageNodes(from, to) {
  const nodes = [];
  for (let i = from; i <= to; i += 1) {
    nodes.push({ type: "page", value: i });
  }
  return nodes;
}

/**
 * Ideal: 1 2 3 4 5 … 15 16 17 … 40 41
 * Middle = prev / current / next.
 * Extra width loads more starting page numbers (not wider dots).
 */
function buildPages(current, total, maxSlots, endTarget) {
  if (total <= 0) return [];
  if (total <= maxSlots) {
    return pageNodes(0, total - 1);
  }

  const last = total - 1;
  const midBudget = 3;

  let endBound = Math.max(1, Math.min(endTarget, maxSlots - midBudget - 1));
  // All remaining slots go to the start cluster.
  let startBound = Math.max(1, maxSlots - midBudget - endBound);

  const startEnd = startBound - 1;
  const endStart = last - endBound + 1;

  let midStart = current - 1;
  let midEnd = current + 1;
  if (midStart < 0) {
    midStart = 0;
    midEnd = Math.min(last, midBudget - 1);
  }
  if (midEnd > last) {
    midEnd = last;
    midStart = Math.max(0, last - midBudget + 1);
  }

  // Near start → absorb middle into the leading run (one right gap).
  if (midStart <= startEnd + 1) {
    const leadEnd = Math.min(endStart - 2, Math.max(midEnd, maxSlots - endBound - 1));
    return [
      ...pageNodes(0, leadEnd),
      { type: "gap", key: "gap-right" },
      ...pageNodes(endStart, last),
    ];
  }

  // Near end → absorb middle into the trailing run (one left gap).
  if (midEnd >= endStart - 1) {
    const trailStart = Math.max(
      startEnd + 2,
      Math.min(midStart, last - (maxSlots - startBound) + 1)
    );
    return [
      ...pageNodes(0, startEnd),
      { type: "gap", key: "gap-left" },
      ...pageNodes(trailStart, last),
    ];
  }

  // Middle: 1 2 3 4 5 … 10 11 12 … 40 41
  return [
    ...pageNodes(0, startEnd),
    { type: "gap", key: "gap-left" },
    ...pageNodes(midStart, midEnd),
    { type: "gap", key: "gap-right" },
    ...pageNodes(endStart, last),
  ];
}

function dotsCountForWidth(widthPx) {
  // Keep clear space between dots so they never merge into a solid line.
  const DOT_PX = 4;
  const MIN_GAP_PX = 8;
  const PAD_PX = 8;
  if (!widthPx || widthPx < DOT_PX + PAD_PX) return 3;
  const usable = Math.max(DOT_PX, widthPx - PAD_PX);
  return Math.max(3, Math.min(10, Math.floor((usable + MIN_GAP_PX) / (DOT_PX + MIN_GAP_PX))));
}

function DotsGap({ widthPx }) {
  const count = dotsCountForWidth(widthPx);
  const dots = Array.from({ length: count }, (_, i) => (
    <span
      key={i}
      className="size-1 shrink-0 rounded-full bg-[#cfcfcf] dark:bg-white-color/35"
    />
  ));
  return (
    <span className="flex items-center justify-between w-full min-w-0 px-1.5">
      {dots}
    </span>
  );
}

const Paginations = ({ paginationDetails }) => {
  const { currentpage, totalPages, handleCurrentPage } = paginationDetails;
  // Measure the constrained parent, not the list content (avoids overflow feedback loop).
  const measureRef = useRef(null);
  const [barWidth, setBarWidth] = useState(0);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el || typeof ResizeObserver === "undefined") return undefined;
    const measure = () => setBarWidth(el.getBoundingClientRect().width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pages = useMemo(() => {
    const slots = pageSlotsForWidth(barWidth);
    const endCount = endCountForWidth(barWidth);
    return buildPages(currentpage, totalPages, slots, endCount);
  }, [barWidth, currentpage, totalPages]);

  if (!totalPages || totalPages <= 1) return null;

  const isFirst = currentpage <= 0;
  const isLast = currentpage >= totalPages - 1;
  const gapCount = pages.filter((item) => item.type === "gap").length;
  const hasDots = gapCount > 0;
  // Split the 25% dots budget across however many ellipsis blocks are shown.
  const gapWidthPct =
    gapCount > 0 ? (DOTS_TOTAL_RATIO * 100) / gapCount : 0;
  const gapWidthPx =
    gapCount > 0 && barWidth > 0 ? (barWidth * gapWidthPct) / 100 : 0;

  return (
    <nav
      ref={measureRef}
      aria-label="Blog pagination"
      className="wow fadeInUp w-full max-w-full min-w-0"
      data-wow-delay=".3s"
    >
      <ul
        className={`paginations flex flex-nowrap items-center w-full max-w-full min-w-0 overflow-hidden gap-1.5 sm:gap-2 box-border ${
          hasDots ? "" : "justify-center"
        }`}
      >
        <li className="shrink-0">
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
            className={`${CELL} ${IDLE} ${isFirst ? DISABLED : ""}`}
          >
            <i className="fal fa-chevron-left text-xs" />
          </Link>
        </li>

        {pages.map((item) =>
          item.type === "gap" ? (
            <li
              key={item.key}
              className="shrink-0 inline-flex items-center justify-center min-w-0"
              style={{
                width: `${gapWidthPct}%`,
                flex: `0 0 ${gapWidthPct}%`,
              }}
              aria-hidden="true"
            >
              <DotsGap widthPx={gapWidthPx} />
            </li>
          ) : (
            <li
              key={item.value}
              className={`shrink-0 ${
                item.value === currentpage ? "active" : ""
              }`}
            >
              <Link
                href="#blogs"
                aria-label={`Page ${item.value + 1}`}
                aria-current={item.value === currentpage ? "page" : undefined}
                onClick={(e) => handleCurrentPage(e, item.value)}
                className={`${CELL} ${
                  item.value === currentpage ? ACTIVE : IDLE
                }`}
              >
                {item.value + 1}
              </Link>
            </li>
          )
        )}

        <li className="shrink-0">
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
            className={`${CELL} ${IDLE} ${isLast ? DISABLED : ""}`}
          >
            <i className="fal fa-chevron-right text-xs" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Paginations;
