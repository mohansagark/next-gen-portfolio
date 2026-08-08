"use client";

import Link from "next/link";
import React, { useEffect, useId, useRef, useState } from "react";

const LINKEDIN_URL = "https://www.linkedin.com/in/mohansagark/";
const LINKEDIN_LABEL = "Mohan Sagar Killamsetty";
const LINKEDIN_HEADLINE = "Software Engineer · Dev Mohan";

const AuthorDisplay = ({
  author,
  className = "",
  showBy = true,
  linkedInUrl = LINKEDIN_URL,
}) => {
  const isBot = author === "Agent Bot";
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const panelId = useId();

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
      {showBy ? <span>By</span> : null}
      <i className="fa-solid fa-user" title="Human Author" aria-hidden="true"></i>
      <button
        type="button"
        className="text-inherit capitalize hover:text-primary-color transition-colors duration-300 underline-offset-2 hover:underline bg-transparent border-0 p-0 cursor-pointer font-inherit"
        aria-expanded={open}
        aria-controls={panelId}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen((v) => !v)}
      >
        {author}
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label={`${author} LinkedIn profile`}
          className="absolute left-0 top-full z-50 mt-2 w-72 rounded-lg border border-border-color dark:border-gray-color-3 bg-white dark:bg-primary-color-light p-4 shadow-lg text-left normal-case"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0A66C2] text-white text-lg">
              <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-primary-color-light dark:text-white-color leading-snug">
                {LINKEDIN_LABEL}
              </p>
              <p className="text-xs text-body-color dark:text-gray-color mt-0.5 leading-snug">
                {LINKEDIN_HEADLINE}
              </p>
              <Link
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A66C2] hover:underline"
              >
                View LinkedIn profile
                <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </span>
  );
};

export default AuthorDisplay;
