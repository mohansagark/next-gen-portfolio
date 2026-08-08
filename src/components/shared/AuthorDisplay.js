"use client";

import Script from "next/script";
import React, { useEffect, useId, useRef, useState } from "react";

const LINKEDIN_VANITY = "mohansagark";
const LINKEDIN_URL = `https://in.linkedin.com/in/${LINKEDIN_VANITY}?trk=profile-badge`;
const LINKEDIN_LABEL = "Mohan Sagar Killamsetty";

function useIsDarkTheme() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    const sync = () => setIsDark(html.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return isDark;
}

function renderLinkedInBadges() {
  if (typeof window === "undefined") return;
  if (typeof window.LIRenderAll === "function") {
    window.LIRenderAll();
  }
}

const AuthorDisplay = ({
  author,
  className = "",
  showBy = true,
}) => {
  const isBot = author === "Agent Bot";
  const [open, setOpen] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const rootRef = useRef(null);
  const panelId = useId();
  const isDark = useIsDarkTheme();
  const theme = isDark ? "dark" : "light";

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  // LinkedIn only paints badges present at script load; re-scan after hover mount.
  useEffect(() => {
    if (!open || !scriptReady) return;
    const id = window.requestAnimationFrame(() => renderLinkedInBadges());
    return () => window.cancelAnimationFrame(id);
  }, [open, scriptReady, theme]);

  if (isBot) {
    return (
      <span className={`inline-flex items-center gap-1 ${className}`}>
        {showBy ? <span>By</span> : null}
        <i className="fa-solid fa-robot" title="AI Bot"></i>
        <span>{author}</span>
      </span>
    );
  }

  return (
    <span
      ref={rootRef}
      className={`relative inline-flex items-center gap-1 ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Script
        src="https://platform.linkedin.com/badges/js/profile.js"
        strategy="lazyOnload"
        onLoad={() => {
          setScriptReady(true);
          renderLinkedInBadges();
        }}
      />
      {showBy ? <span>By</span> : null}
      <i className="fa-solid fa-user" title="Human Author" aria-hidden="true"></i>
      <button
        type="button"
        className="text-inherit capitalize hover:text-primary-color transition-colors duration-300 underline-offset-2 hover:underline bg-transparent border-0 p-0 cursor-pointer font-inherit"
        aria-expanded={open}
        aria-controls={panelId}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
      >
        {author}
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label={`${author} LinkedIn profile`}
          className="absolute left-0 top-full z-50 pt-2 w-[min(100vw-2rem,340px)] text-left normal-case"
        >
          <div className="rounded-lg border border-border-color dark:border-gray-color-3 bg-white dark:bg-primary-color-light p-2 shadow-lg overflow-hidden">
            <div
              key={theme}
              className="badge-base LI-profile-badge"
              data-locale="en_US"
              data-size="large"
              data-theme={theme}
              data-type="HORIZONTAL"
              data-vanity={LINKEDIN_VANITY}
              data-version="v1"
            >
              <a
                className="badge-base__link LI-simple-link"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {LINKEDIN_LABEL}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </span>
  );
};

export default AuthorDisplay;
