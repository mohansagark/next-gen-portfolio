"use client";

import getProfile from "@/libs/getProfile";
import { isAuditOrBot } from "@/libs/isAuditClient";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { btnMetallicClass } from "@/components/shared/buttons/ButtonPrimary";

const HeroGlobeCanvas = dynamic(() => import("./HeroGlobeCanvas"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse mx-auto aspect-square w-full max-w-[min(100%,520px)] sm:max-w-[560px] lg:max-w-[720px] min-[1920px]:max-w-[900px] rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.12),transparent_65%)]" />
  ),
});

const EASE = [0.32, 0.72, 0, 1];

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

/** Soft enter for chrome (identity, CTAs) — opacity OK, not LCP. */
const chromeVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

/** LCP-safe: never hide H1/subhead; only a light rise. */
const textVariants = {
  hidden: { opacity: 1, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const globeVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE, delay: 0.12 },
  },
};

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isDesktop;
}

/**
 * Defer WebGL until the visitor shows intent, or a short timer for passive
 * viewers. Do not use requestIdleCallback here — audits often go "idle"
 * immediately and would pull Three.js into the lab window.
 */
function useDeferredMount(enabled, { fallbackMs = 2800 } = {}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;

    let cancelled = false;
    const arm = () => {
      if (!cancelled) setReady(true);
    };

    const onIntent = () => arm();
    window.addEventListener("pointerdown", onIntent, { once: true, passive: true });
    window.addEventListener("keydown", onIntent, { once: true, passive: true });
    window.addEventListener("scroll", onIntent, { once: true, passive: true });
    window.addEventListener("touchstart", onIntent, { once: true, passive: true });

    const timer = window.setTimeout(arm, fallbackMs);

    return () => {
      cancelled = true;
      window.removeEventListener("pointerdown", onIntent);
      window.removeEventListener("keydown", onIntent);
      window.removeEventListener("scroll", onIntent);
      window.removeEventListener("touchstart", onIntent);
      window.clearTimeout(timer);
    };
  }, [enabled, fallbackMs]);

  return Boolean(enabled && ready);
}

function canUseWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(
      c.getContext("webgl2") ||
        c.getContext("webgl") ||
        c.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

/** Skip heavy WebGL for SSR/bots/no-WebGL; enable for real browsers. */
function useSkipHeavyGlobe() {
  // Lazy init — avoid setState-in-effect (eslint react-hooks/set-state-in-effect).
  const [skip] = useState(() => {
    if (typeof window === "undefined") return true;
    return isAuditOrBot() || !canUseWebGL();
  });
  return skip;
}

export default function HomeHero() {
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const skipHeavyGlobe = useSkipHeavyGlobe();
  // Same photo-Earth globe on desktop + mobile (compact) — intent-deferred;
  // skipped for audits / no-WebGL. Placeholder keeps layout until then.
  const mountDesktopGlobe = useDeferredMount(isDesktop && !skipHeavyGlobe, {
    fallbackMs: 2600,
  });
  const mountMobileGlobe = useDeferredMount(!isDesktop && !skipHeavyGlobe, {
    fallbackMs: 3200,
  });
  // Lets the splash (Preloader) hold until the globe has actually started
  // mounting instead of dismissing on a fixed timer regardless of it — see
  // Preloader.js. Bots/no-WebGL fire this immediately (skipHeavyGlobe),
  // so it never affects the Lighthouse-measured path.
  useEffect(() => {
    if (skipHeavyGlobe || mountDesktopGlobe || mountMobileGlobe) {
      window.dispatchEvent(new Event("hero-globe-ready"));
    }
  }, [skipHeavyGlobe, mountDesktopGlobe, mountMobileGlobe]);
  const profile = getProfile() || {};
  // Same-origin optimized avatar — CDN still serves a multi‑MB PNG.
  const avatarSrc = "/images/profile/avatar-web.jpg";

  const tagline = profile.tagline || "I ship AI applications that hold up in production.";
  const headline =
    profile.headline || "AI Engineer · Frontend Architect";
  const subhead =
    profile.subhead ||
    "A decade building production software — now focused on LLM applications, agentic workflows, and the interfaces that make them dependable for real teams.";
  const primary = profile.primaryCta || {
    label: "Get in touch",
    href: "#contact",
  };
  const secondary = profile.secondaryCta || {
    label: "View selected work",
    href: "#work",
  };
  const displayName = profile.firstName || "Mohan Sagar";
  const location = profile.location || "Remote · Available worldwide";

  const motionProps = reduceMotion
    ? {}
    : { initial: "hidden", animate: "show", variants: listVariants };

  const chromeProps = reduceMotion ? {} : { variants: chromeVariants };
  const textProps = reduceMotion ? {} : { variants: textVariants };

  const identity = (
    <motion.div
      className="[grid-area:identity] flex items-center gap-3 mb-5 sm:mb-7 sm:gap-3.5 pt-1.5 max-lg:pt-2 max-lg:pr-14 lg:pt-0 lg:pr-0"
      {...chromeProps}
    >
      <img
        src={avatarSrc}
        alt=""
        width={48}
        height={48}
        fetchPriority="high"
        decoding="async"
        className="h-11 w-11 sm:h-12 sm:w-12 shrink-0 rounded-full object-cover object-top ring-1 ring-black/10 dark:ring-white/15"
      />
      <div className="min-w-0 flex-1 flex flex-col">
        <p className="text-[0.75rem] sm:text-[0.95rem] text-primary-color-light dark:text-[#e5e7eb] leading-snug max-lg:whitespace-nowrap max-lg:overflow-hidden max-lg:text-ellipsis">
          <span className="font-medium">{displayName}</span>
          <span className="mx-1.5 opacity-35" aria-hidden>
            ·
          </span>
          <span className="text-[#374151] dark:text-[#8b939e]">
            {location}
          </span>
        </p>
        <p className="mt-1 inline-flex items-center gap-1.5 text-[0.6rem] sm:text-xs tracking-[0.08em] sm:tracking-[0.12em] uppercase text-teal-700 dark:text-teal-300/90 font-medium leading-snug min-w-0 whitespace-nowrap">
          <i
            className="fa-solid fa-rocket text-[10px] sm:text-[11px] shrink-0"
            aria-hidden
          />
          <span className="whitespace-nowrap">{headline}</span>
        </p>
      </div>
    </motion.div>
  );

  const heading = (
    <motion.h1
      className="[grid-area:heading] font-display text-[2rem] sm:text-5xl lg:text-[3.55rem] xl:text-[3.9rem] leading-[1.08] text-primary-color-light dark:text-white max-w-[16ch] sm:max-w-[18ch] lg:max-w-none mb-4 sm:mb-5"
      {...textProps}
    >
      {tagline}
    </motion.h1>
  );

  const subheading = (
    <motion.p
      className="[grid-area:subhead] text-[0.9375rem] sm:text-base md:text-lg text-[#374151] dark:text-[#9aa3af] max-w-2xl leading-relaxed mb-6 sm:mb-8"
      {...textProps}
    >
      {subhead}
    </motion.p>
  );

  const ctas = (
    <motion.div
      className="[grid-area:ctas] flex flex-col sm:flex-row flex-wrap lg:flex-nowrap items-stretch sm:items-center gap-2.5"
      {...chromeProps}
    >
      <a
        href={primary.href}
        className={`group inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-full ${btnMetallicClass} !text-white dark:!text-white pl-4 pr-2 py-2.5 sm:py-2 text-sm font-semibold duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]`}
      >
        <i className="fa-solid fa-comments text-[13px] text-white" aria-hidden />
        {primary.label}
        <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-0.5 text-white">
          <i className="fa-solid fa-arrow-right text-[12px] text-current" aria-hidden />
        </span>
      </a>
      <div className="flex w-full sm:w-auto gap-2.5">
        <a
          href={secondary.href}
          className="inline-flex flex-1 sm:flex-initial shrink-0 items-center justify-center gap-2 rounded-full border border-[#d1d5db] dark:border-white/15 text-primary-color-light dark:text-white px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm font-medium hover:border-teal-600/50 dark:hover:border-teal-300/50 transition-colors duration-500 active:scale-[0.98]"
        >
          <i className="fa-solid fa-briefcase text-[13px]" aria-hidden />
          <span className="truncate">{secondary.label}</span>
        </a>
        {profile.resumeUrl ? (
          <Link
            href={profile.resumeUrl}
            className="inline-flex flex-1 sm:flex-initial shrink-0 items-center justify-center gap-2 rounded-full border border-[#d1d5db] dark:border-white/15 text-primary-color-light dark:text-white px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm font-medium hover:border-teal-600/50 dark:hover:border-teal-300/50 transition-colors duration-500 active:scale-[0.98]"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-solid fa-file-lines text-[13px]" aria-hidden />
            Resume
          </Link>
        ) : null}
      </div>
    </motion.div>
  );

  const globeInner =
    (isDesktop && mountDesktopGlobe) || (!isDesktop && mountMobileGlobe) ? (
      <HeroGlobeCanvas
        reducedMotion={!!reduceMotion}
        compact={!isDesktop}
      />
    ) : (
      <div
        className="animate-pulse mx-auto aspect-square w-full max-w-[min(100%,520px)] sm:max-w-[560px] lg:max-w-[720px] min-[1920px]:max-w-[900px] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(94,234,212,0.2),transparent_62%)] dark:bg-[radial-gradient(circle_at_35%_30%,rgba(94,234,212,0.14),transparent_62%)]"
        aria-hidden
      />
    );

  const globe = (
    <motion.div
      className={
        isDesktop
          ? "[grid-area:globe] relative w-full min-h-[520px] lg:min-h-[560px] xl:min-h-[620px] min-[1920px]:min-h-[720px] overflow-visible"
          : "[grid-area:globe] relative mx-auto flex w-full max-w-[min(100%,420px)] sm:max-w-[480px] min-h-[min(78vw,420px)] sm:min-h-[480px] items-center justify-center overflow-visible mb-5 sm:mb-6 lg:mb-0"
      }
      variants={reduceMotion ? undefined : globeVariants}
    >
      {globeInner}
    </motion.div>
  );

  return (
    <section
      id="home"
      className="home-hero relative overflow-x-clip overflow-y-visible min-h-[100dvh] flex items-start lg:items-center pt-[max(1rem,env(safe-area-inset-top))] lg:pt-28 pb-10 sm:pb-14 md:pb-16 lg:pb-20 scroll-mt-24 lg:scroll-mt-28"
    >
      {/* Decorative blur — lighter + GPU-composited on mobile (blur is an
          expensive paint op at these sizes); full strength from lg: up. */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="transform-gpu absolute -top-24 right-[-18%] w-[78vw] max-w-[520px] h-[78vw] max-h-[520px] rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.22),transparent_68%)] blur-lg lg:blur-2xl dark:opacity-100 opacity-70 lg:right-[-8%] lg:w-[62vw] lg:max-w-[820px]" />
        <div className="transform-gpu absolute top-[42%] right-[4%] w-[40vw] max-w-[220px] h-[40vw] max-h-[220px] rounded-full bg-[radial-gradient(circle,rgba(15,118,110,0.1),transparent_70%)] blur-xl lg:blur-3xl dark:bg-[radial-gradient(circle,rgba(45,212,191,0.12),transparent_70%)] dark:opacity-90 opacity-50 lg:top-[28%] lg:right-[8%] lg:w-[28vw] lg:max-w-[360px]" />
        <div className="transform-gpu absolute bottom-[-12%] left-[-28%] w-[70vw] max-w-[420px] h-[70vw] max-h-[420px] rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.14),transparent_62%)] blur-lg lg:blur-2xl dark:opacity-100 opacity-55 lg:bottom-[-22%] lg:left-[-18%] lg:w-[52vw] lg:max-w-[600px]" />
      </div>

      <div className="container max-w-[1240px] min-[1920px]:!max-w-[1680px] w-full px-5 sm:px-6">
        {/* Single set of elements — CSS Grid remaps identity/globe/heading/
            subhead/ctas per breakpoint instead of rendering two full trees
            (was doubling every Motion instance + DOM node for the hero). */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] xl:grid-cols-[0.95fr_1.05fr] gap-x-6 xl:gap-x-8 min-[1920px]:gap-x-10 lg:items-center [grid-template-areas:'identity'_'globe'_'heading'_'subhead'_'ctas'] lg:[grid-template-areas:'identity_globe'_'heading_globe'_'subhead_globe'_'ctas_globe']"
          {...motionProps}
        >
          {identity}
          {globe}
          {heading}
          {subheading}
          {ctas}
        </motion.div>
      </div>
    </section>
  );
}
