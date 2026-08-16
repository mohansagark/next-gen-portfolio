"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { getStackIcon } from "@/libs/stackIcons";

const COMPACT_LIMIT = 6;

function StackMark({ tech }) {
  const icon = getStackIcon(tech);
  if (icon.type === "badge") {
    return (
      <span
        className="inline-flex h-4 min-w-4 items-center justify-center rounded-[3px] px-0.5 text-[0.55rem] font-bold leading-none text-white"
        style={{ backgroundColor: icon.color || "#3178C6" }}
        title={icon.title}
        aria-hidden
      >
        {icon.label}
      </span>
    );
  }
  return (
    <i
      className={`${icon.className} text-[0.95em]`}
      style={{ color: icon.color || "#14B8A6" }}
      aria-hidden
    />
  );
}

function Chip({ tech }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/8 dark:border-white/10 bg-white dark:bg-[#0f1217] px-3 py-1.5 text-xs sm:text-sm text-primary-color-light/90 dark:text-white/85">
      <StackMark tech={tech} />
      {tech}
    </span>
  );
}

/**
 * Compact chip row that expands into a modal showing the full stack list.
 * The expand button and modal panel share a layoutId so Motion morphs
 * between them (FLIP via transform, GPU-composited — no layout thrash).
 * The FLIP measurement only runs on click, never on mount/paint, so it
 * can't touch LCP/TBT/CLS — and this only renders on work detail pages,
 * which the Lighthouse CI gate (homepage only) never visits anyway.
 * The full list also renders sr-only in the initial HTML so search
 * engines still see every stack item, not just the first COMPACT_LIMIT.
 */
export default function TechStackModal({ stack }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const panelId = useId();
  const triggerRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();
    const trigger = triggerRef.current;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      trigger?.focus();
    };
  }, [open]);

  if (!stack?.length) return null;

  const visible = stack.slice(0, COMPACT_LIMIT);
  const hiddenCount = stack.length - visible.length;

  return (
    <div className="mb-6">
      <p className="text-[0.7rem] uppercase tracking-[0.14em] text-teal-700 dark:text-teal-300/80 mb-2.5 font-medium">
        Stack
      </p>

      {hiddenCount > 0 ? (
        <span className="sr-only">Full stack: {stack.join(", ")}</span>
      ) : null}

      <div className="flex flex-wrap gap-2 items-center">
        {visible.map((tech) => (
          <Chip key={tech} tech={tech} />
        ))}
        {hiddenCount > 0 ? (
          <motion.button
            ref={triggerRef}
            type="button"
            // Only the currently-visible element (button vs. panel) carries
            // the shared layoutId — Motion needs exactly one at a time to
            // morph between, not two simultaneous claims on the same id.
            layoutId={open ? undefined : `stack-panel-${panelId}`}
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="inline-flex items-center gap-1.5 rounded-full border border-teal-700/30 dark:border-teal-300/30 bg-teal-700/[0.06] dark:bg-teal-300/[0.08] px-3 py-1.5 text-xs sm:text-sm font-medium text-teal-700 dark:text-teal-300 hover:bg-teal-700/[0.1] dark:hover:bg-teal-300/[0.12] transition-colors"
          >
            +{hiddenCount} more
            <i className="fa-solid fa-up-right-and-down-left-from-center text-[10px]" aria-hidden />
          </motion.button>
        ) : null}
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              layoutId={`stack-panel-${panelId}`}
              role="dialog"
              aria-modal="true"
              aria-label="Full tech stack"
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", bounce: 0.15, duration: 0.5 }
              }
              className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl border border-black/8 dark:border-white/10 bg-white dark:bg-[#12151a] p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-700 dark:text-teal-300/80">
                  Full stack ({stack.length})
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Minimize"
                  className="inline-flex items-center gap-1.5 rounded-full border border-black/8 dark:border-white/10 px-3 py-1.5 text-xs font-medium text-primary-color-light/90 dark:text-white/85 hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors"
                >
                  <i className="fa-solid fa-down-left-and-up-right-to-center text-[10px]" aria-hidden />
                  Minimize
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <Chip key={tech} tech={tech} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
