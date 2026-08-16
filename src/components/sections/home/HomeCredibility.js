"use client";

import Image from "next/image";
import getProfile from "@/libs/getProfile";
import getSkills from "@/libs/getSkills";
import ScrollReveal from "@/components/sections/home/ScrollReveal";
import { isOptimizableImageSrc } from "@/libs/optimizableImage";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

function SkillsPackedTicker({ skills }) {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  const items = useMemo(() => {
    const seen = new Set();
    const out = [];
    for (const s of skills || []) {
      if (!s?.name || seen.has(s.name)) continue;
      seen.add(s.name);
      out.push({ name: s.name, img: s.img || "" });
    }
    return out;
  }, [skills]);

  if (!items.length) {
    return (
      <p className="text-sm text-[#374151] dark:text-[#9aa3af]">
        Stack loading…
      </p>
    );
  }

  if (reduceMotion) {
    return (
      <ul
        className="cred-skills-static flex flex-wrap gap-x-2 gap-y-1.5 max-w-full overflow-x-hidden"
        aria-label="Tech stack skills"
      >
        {items.map((skill) => (
          <li key={skill.name} className="min-w-0">
            <SkillChip skill={skill} />
          </li>
        ))}
      </ul>
    );
  }

  const durationSec = Math.max(6, items.length * 0.55);

  return (
    <div
      className="cred-skills-ticker relative h-[6.75rem] sm:h-[3.5rem] max-w-full overflow-hidden overflow-x-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Tech stack skills"
    >
      <div
        className="cred-skills-ticker__track will-change-transform"
        style={{
          animationPlayState: paused ? "paused" : "running",
          ["--cred-ticker-duration"]: `${durationSec}s`,
        }}
      >
        <div className="cred-skills-ticker__set flex flex-wrap gap-x-2 gap-y-1.5 content-start w-full">
          {items.map((skill) => (
            <SkillChip key={skill.name} skill={skill} />
          ))}
        </div>
        <div
          className="cred-skills-ticker__set flex flex-wrap gap-x-2 gap-y-1.5 content-start w-full"
          aria-hidden
        >
          {items.map((skill) => (
            <SkillChip key={`dup-${skill.name}`} skill={skill} ariaHidden />
          ))}
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-white dark:from-[#12151a] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-white dark:from-[#12151a] to-transparent"
        aria-hidden
      />
    </div>
  );
}

function SkillChip({ skill, ariaHidden = false }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 shrink-0 rounded-md bg-teal-700/[0.07] dark:bg-teal-300/[0.08] px-1.5 py-1 sm:px-2"
      aria-hidden={ariaHidden || undefined}
    >
      {skill.img ? (
        isOptimizableImageSrc(skill.img) ? (
          <Image
            src={skill.img}
            alt=""
            width={16}
            height={16}
            sizes="16px"
            className="h-4 w-4 shrink-0 object-contain"
          />
        ) : (
          <img
            src={skill.img}
            alt=""
            width={16}
            height={16}
            className="h-4 w-4 shrink-0 object-contain"
            loading="lazy"
            decoding="async"
          />
        )
      ) : (
        <span
          className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded bg-teal-700/15 dark:bg-teal-300/15 text-[8px] font-semibold text-teal-800 dark:text-teal-200"
          aria-hidden
        >
          {skill.name.slice(0, 1)}
        </span>
      )}
      <span className="whitespace-nowrap text-[0.75rem] sm:text-[0.8125rem] font-medium text-[#12151a] dark:text-[#e8eaed] leading-none">
        {skill.name}
      </span>
    </span>
  );
}

/**
 * "Tech Stack" label + ticker, with an expand button that morphs the whole
 * strip into a modal showing every skill in a static, readable grid (the
 * ticker is nice to glance at but hard to actually scan). The button and
 * modal panel share a Framer Motion layoutId — Motion's documented behavior
 * for two elements claiming the same layoutId is "the newest mount wins,
 * the rest fade out," which drives the morph (transform/opacity, GPU-
 * composited) without any manual FLIP bookkeeping.
 *
 * The FLIP measurement only runs on click, never on mount/paint, so it
 * can't touch LCP/TBT/CLS. The full skill list is already present in the
 * DOM at all times (duplicated for the ticker's seamless loop), so search
 * engines see every skill regardless of whether the modal's ever opened.
 */
function TechStackStrip({ skills }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const panelId = useId();
  const triggerRef = useRef(null);
  const closeRef = useRef(null);

  const items = useMemo(() => {
    const seen = new Set();
    const out = [];
    for (const s of skills || []) {
      if (!s?.name || seen.has(s.name)) continue;
      seen.add(s.name);
      out.push({ name: s.name, img: s.img || "", group: s.group || "Other" });
    }
    return out;
  }, [skills]);

  // Preserve first-seen category order (matches CMS ordering) rather than
  // alphabetizing — groups appear in the modal in the same order they were
  // defined in admin.devmohan.in.
  const groups = useMemo(() => {
    const byGroup = new Map();
    for (const item of items) {
      if (!byGroup.has(item.group)) byGroup.set(item.group, []);
      byGroup.get(item.group).push(item);
    }
    return [...byGroup.entries()];
  }, [items]);

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

  return (
    <div className="flex flex-col justify-center gap-2 min-w-0 h-full px-5 py-4 sm:px-6 sm:py-5 sm:col-span-2 border-t sm:border-t-0 border-[#e5e7eb] dark:border-[#262b33] overflow-x-hidden">
      <div className="flex items-center justify-between gap-2">
        <p className="shrink-0 text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-[#6b7280] dark:text-[#8b939e]">
          Tech Stack
        </p>
        {items.length ? (
          <motion.button
            ref={triggerRef}
            type="button"
            layoutId={`tech-stack-panel-${panelId}`}
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-label="Expand tech stack"
            title="Expand"
            className="inline-flex items-center justify-center rounded-full border border-teal-700/30 dark:border-teal-300/30 bg-teal-700/[0.06] dark:bg-teal-300/[0.08] h-6 w-6 sm:h-7 sm:w-7 text-teal-700 dark:text-teal-300 hover:bg-teal-700/[0.1] dark:hover:bg-teal-300/[0.12] transition-colors shrink-0"
          >
            <i
              className="fa-solid fa-up-right-and-down-left-from-center text-[10px]"
              aria-hidden
            />
          </motion.button>
        ) : null}
      </div>

      <SkillsPackedTicker skills={skills} />

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
              layoutId={`tech-stack-panel-${panelId}`}
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
                  Full stack ({items.length})
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Minimize"
                  className="inline-flex items-center gap-1.5 rounded-full border border-black/8 dark:border-white/10 px-3 py-1.5 text-xs font-medium text-primary-color-light/90 dark:text-white/85 hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors"
                >
                  <i
                    className="fa-solid fa-down-left-and-up-right-to-center text-[10px]"
                    aria-hidden
                  />
                  Minimize
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {groups.map(([group, groupSkills]) => (
                  <div key={group}>
                    <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#6b7280] dark:text-[#8b939e]">
                      {group}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {groupSkills.map((skill) => (
                        <SkillChip key={skill.name} skill={skill} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function HomeCredibility() {
  const profile = getProfile() || {};
  const skills = getSkills() || [];
  const credibility = profile.credibility || {};
  const strip = credibility.strip || {};
  const stats = credibility.stats || [
    { label: "Years of industry experience", value: "10" },
    { label: "Users of shipped AI products", value: "8,000+" },
    { label: "Users across shipped platforms", value: "5M+" },
  ];

  const location = profile.location || "Remote · Available worldwide";

  const openTo = {
    label: strip.openTo?.label || "Open to",
    title:
      strip.openTo?.title ||
      (/worldwide|remote|global/i.test(location)
        ? "Global Opportunities"
        : location),
  };

  const bandClass =
    "rounded-2xl border border-[#e5e7eb] dark:border-[#262b33] bg-white dark:bg-[#12151a] shadow-[0_1px_2px_rgba(15,23,42,0.04)] overflow-hidden max-w-full";
  // Desktop: stats row + Open to|Tech stack share the same strip height
  const stripBandClass = "sm:min-h-[7.75rem] sm:h-full";

  return (
    <section
      id="credibility"
      className="scroll-mt-24 lg:scroll-mt-28 py-6 sm:py-8 md:py-10 overflow-x-hidden"
      aria-label="Credibility"
    >
      <div className="container max-w-[1240px] min-[1920px]:!max-w-[1680px] px-5 sm:px-6 overflow-x-hidden">
        <ScrollReveal>
          <div className="flex flex-col gap-3 sm:grid sm:grid-rows-[1fr_1fr] sm:gap-4 min-w-0 overflow-x-hidden">
            {/* Stats — 3-card grid (no horizontal scroll) */}
            <dl
              className={`grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 min-w-0 overflow-x-hidden ${stripBandClass}`}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center text-center min-w-0 h-full rounded-2xl border border-[#e5e7eb] dark:border-[#262b33] bg-white dark:bg-[#12151a] shadow-[0_1px_2px_rgba(15,23,42,0.04)] px-2 py-3 sm:px-5 sm:py-5"
                >
                  <dt className="text-[#374151] dark:text-[#9aa3af] text-xs sm:text-sm leading-tight mb-1.5 sm:mb-2">
                    {stat.label}
                  </dt>
                  <dd className="text-xl sm:text-3xl md:text-4xl text-[#0b0d10] dark:text-[#f3f4f6] font-semibold tracking-tight font-display leading-none">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Open to (left) | Tech stack (right) — Open to ~1 col, stack ~2 */}
            <div className={`${bandClass} ${stripBandClass}`}>
              <div className="grid grid-cols-1 sm:grid-cols-3 items-stretch h-full min-w-0 max-w-full overflow-x-hidden">
                <div className="flex flex-col items-center justify-center text-center gap-2 min-w-0 h-full px-5 py-4 sm:px-6 sm:py-5 sm:border-r border-[#e5e7eb] dark:border-[#262b33]">
                  <span
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-700/10 dark:bg-teal-300/10 text-teal-700 dark:text-[#5eead4]"
                    aria-hidden
                  >
                    <i className="fa-solid fa-globe text-[15px]" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-[#6b7280] dark:text-[#8b939e]">
                      {openTo.label}
                    </p>
                    <p className="text-[0.9375rem] sm:text-base font-semibold text-[#12151a] dark:text-[#f3f4f6] leading-snug">
                      {openTo.title}
                    </p>
                  </div>
                </div>

                <TechStackStrip skills={skills} />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
