"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { setColorTheme } from "@/libs/themeController";

function MoonIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

/**
 * Mobile-only segmented theme switcher (Light | Dark) with a sliding pill.
 * Desktop keeps the original edge tab in ThmeModeSwither.
 */
export default function ThemeToggle({ className, tabIndex }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const sync = () =>
      setDark(document.documentElement.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div
      role="group"
      aria-label="Color theme"
      className={cn(
        "relative grid grid-cols-2 rounded-full border border-black/10 dark:border-white/12 bg-black/[0.04] dark:bg-white/[0.06] p-1",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full shadow-sm",
          "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform",
          dark
            ? "translate-x-full bg-[#181c22] ring-1 ring-white/10"
            : "translate-x-0 bg-white",
        )}
      />

      <button
        type="button"
        tabIndex={tabIndex}
        aria-pressed={!dark}
        onClick={() => setColorTheme("light")}
        className={cn(
          "relative z-[1] inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium",
          "transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          !dark ? "text-primary-color-light" : "text-[#9aa3af]",
        )}
      >
        <SunIcon className="size-3.5" />
        Light
      </button>
      <button
        type="button"
        tabIndex={tabIndex}
        aria-pressed={dark}
        onClick={() => setColorTheme("dark")}
        className={cn(
          "relative z-[1] inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium",
          "transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          dark ? "text-white" : "text-primary-color-light/55",
        )}
      >
        <MoonIcon className="size-3.5" />
        Dark
      </button>
    </div>
  );
}
