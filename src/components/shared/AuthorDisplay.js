"use client";

import { createPortal } from "react-dom";
import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const LINKEDIN_VANITY = "mohansagark";
const LINKEDIN_URL = `https://in.linkedin.com/in/${LINKEDIN_VANITY}?trk=profile-badge`;
const LINKEDIN_LABEL = "Mohan Sagar Killamsetty";
const LINKEDIN_SCRIPT_SRC = "https://platform.linkedin.com/badges/js/profile.js";
const PANEL_GAP = 8;
const VIEWPORT_MARGIN = 16;
const CLOSE_DELAY = 200;
const BADGE_FAIL_MS = 8000;
// Medium HORIZONTAL badge footprint used as the loading placeholder.
const PLACEHOLDER_WIDTH = 300;
const PLACEHOLDER_HEIGHT = 120;

// One shared <script> for the whole page, loaded on first hover only.
// Rendering it per instance is wrong: the loader dedupes on src, so every
// instance after the first silently never fires onLoad.
let scriptPromise = null;

function loadLinkedInScript() {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve) => {
    const el = document.createElement("script");
    el.src = LINKEDIN_SCRIPT_SRC;
    el.async = true;
    el.onload = () => resolve(true);
    el.onerror = () => resolve(false);
    document.body.appendChild(el);
  });
  return scriptPromise;
}

// One shared MutationObserver instead of one per author instance.
const themeListeners = new Set();
let themeObserver = null;

function subscribeTheme(listener) {
  themeListeners.add(listener);
  if (!themeObserver) {
    themeObserver = new MutationObserver(() => {
      themeListeners.forEach((cb) => cb());
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }
  return () => {
    themeListeners.delete(listener);
    if (themeListeners.size === 0 && themeObserver) {
      themeObserver.disconnect();
      themeObserver = null;
    }
  };
}

function readTheme() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function useTheme() {
  return useSyncExternalStore(subscribeTheme, readTheme, () => "dark");
}

function renderLinkedInBadges() {
  if (typeof window === "undefined") return;
  if (typeof window.LIRenderAll === "function") {
    window.LIRenderAll();
  }
}

function isBadgePainted(node) {
  if (!node) return false;
  return Boolean(
    node.querySelector("iframe") ||
      node.querySelector(".profile-badge") ||
      node.querySelector("[class*='LI-profile-badge'] iframe")
  );
}

function BadgeLoader() {
  return (
    <div
      className="load-text"
      style={{ fontSize: 12, letterSpacing: "0.35em" }}
      aria-live="polite"
      aria-label="Loading LinkedIn badge"
    >
      <span>L</span>
      <span>o</span>
      <span>a</span>
      <span>d</span>
      <span>i</span>
      <span>n</span>
      <span>g</span>
    </div>
  );
}

const AuthorDisplay = ({ author, className = "", showBy = true }) => {
  const isBot = author === "Agent Bot";
  const [open, setOpen] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [badgeReady, setBadgeReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const badgeRef = useRef(null);
  const closeTimer = useRef(null);
  const panelId = useId();
  const theme = useTheme();

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  }, [cancelClose]);

  const openPanel = useCallback(() => {
    cancelClose();
    setOpen(true);
    loadLinkedInScript().then((ok) => {
      if (!ok) {
        setLoadFailed(true);
        return;
      }
      setScriptReady(true);
    });
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  // Reset paint state whenever the panel closes or the theme remounts the badge.
  useEffect(() => {
    if (!open) {
      setBadgeReady(false);
      setLoadFailed(false);
    }
  }, [open]);

  useEffect(() => {
    setBadgeReady(false);
    setLoadFailed(false);
  }, [theme]);

  // The panel is portalled to the end of <body>, so Tab from the trigger would
  // skip past it — hand focus over explicitly for keyboard users.
  const handingOff = useRef(false);

  const onTriggerKeyDown = (e) => {
    if (e.key !== "Tab" || e.shiftKey || !open) return;
    const target = panelRef.current?.querySelector("a, iframe, [tabindex]");
    if (!target) return;
    e.preventDefault();
    handingOff.current = true;
    target.focus();
    setTimeout(() => {
      handingOff.current = false;
    }, 0);
  };

  const onTriggerBlur = (e) => {
    if (handingOff.current) return;
    if (panelRef.current?.contains(e.relatedTarget)) return;
    scheduleClose();
  };

  const onPanelBlur = (e) => {
    if (panelRef.current?.contains(e.relatedTarget)) return;
    if (rootRef.current?.contains(e.relatedTarget)) return;
    scheduleClose();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e) => {
      const inRoot = rootRef.current?.contains(e.target);
      const inPanel = panelRef.current?.contains(e.target);
      if (!inRoot && !inPanel) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  // Panel is portalled to <body> so card ancestors with overflow-hidden cannot
  // clip it; position it against the trigger and keep it inside the viewport.
  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const panel = panelRef.current;
      const root = rootRef.current;
      if (!panel || !root) return;
      const anchor = root.getBoundingClientRect();
      const { offsetWidth: width, offsetHeight: height } = panel;
      const maxLeft = window.innerWidth - width - VIEWPORT_MARGIN;
      const left = Math.min(
        Math.max(VIEWPORT_MARGIN, anchor.left),
        Math.max(VIEWPORT_MARGIN, maxLeft)
      );
      const below = anchor.bottom + PANEL_GAP;
      const flip =
        below + height > window.innerHeight - VIEWPORT_MARGIN &&
        anchor.top - height - PANEL_GAP > VIEWPORT_MARGIN;
      panel.style.left = `${left}px`;
      panel.style.top = `${flip ? anchor.top - height - PANEL_GAP : below}px`;
    };

    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    const observer = new ResizeObserver(place);
    if (panelRef.current) observer.observe(panelRef.current);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
      observer.disconnect();
    };
  }, [open, theme, scriptReady, badgeReady, loadFailed]);

  // LinkedIn only paints badges present at script load; re-scan after hover mount
  // and watch until the iframe replaces the fallback text link.
  useEffect(() => {
    if (!open || !scriptReady || loadFailed) return;
    const el = badgeRef.current;
    if (!el) return;

    let done = false;
    const markReady = () => {
      if (done || !isBadgePainted(el)) return false;
      done = true;
      setBadgeReady(true);
      return true;
    };

    const id = window.requestAnimationFrame(() => renderLinkedInBadges());
    if (markReady()) {
      return () => window.cancelAnimationFrame(id);
    }

    const mo = new MutationObserver(() => {
      if (markReady()) mo.disconnect();
    });
    mo.observe(el, { childList: true, subtree: true });

    const failTimer = window.setTimeout(() => {
      if (!markReady()) setLoadFailed(true);
    }, BADGE_FAIL_MS);

    return () => {
      window.cancelAnimationFrame(id);
      mo.disconnect();
      window.clearTimeout(failTimer);
    };
  }, [open, scriptReady, theme, loadFailed]);

  if (isBot) {
    return (
      <span className={`inline-flex items-center gap-1 ${className}`}>
        {showBy ? <span>By</span> : null}
        <i className="fa-solid fa-robot" title="AI Bot"></i>
        <span>{author}</span>
      </span>
    );
  }

  const showLoader = open && !badgeReady && !loadFailed;

  const panel = (
    <div
      ref={panelRef}
      id={panelId}
      role="dialog"
      aria-label={`${author} LinkedIn profile`}
      aria-busy={showLoader}
      className="fixed z-[1000] text-left normal-case leading-none"
      style={{ top: -9999, left: -9999, maxWidth: `calc(100vw - ${VIEWPORT_MARGIN * 2}px)` }}
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
      onBlur={onPanelBlur}
    >
      {loadFailed ? (
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border-color dark:border-gray-color-3 bg-white dark:bg-primary-color-light px-3 py-2 text-xs font-semibold text-[#0A66C2] shadow-lg hover:underline"
        >
          View LinkedIn profile
          <i
            className="fa-solid fa-arrow-up-right-from-square text-[10px]"
            aria-hidden="true"
          />
        </a>
      ) : (
        <div
          className="relative overflow-hidden"
          style={
            badgeReady
              ? undefined
              : {
                  width: PLACEHOLDER_WIDTH,
                  height: PLACEHOLDER_HEIGHT,
                  maxWidth: "100%",
                }
          }
        >
          {showLoader ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg border border-border-color dark:border-gray-color-3 bg-white dark:bg-primary-color-light shadow-lg">
              <BadgeLoader />
            </div>
          ) : null}

          {/* Mounted under the loader so LinkedIn can paint; fallback text is sr-only. */}
          <div
            key={theme}
            className={badgeReady ? "block" : "opacity-0"}
            aria-hidden={!badgeReady}
          >
            <div
              ref={badgeRef}
              className="badge-base LI-profile-badge"
              data-locale="en_US"
              data-size="medium"
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
                style={{
                  position: "absolute",
                  width: 1,
                  height: 1,
                  padding: 0,
                  margin: -1,
                  overflow: "hidden",
                  clip: "rect(0, 0, 0, 0)",
                  whiteSpace: "nowrap",
                  border: 0,
                }}
              >
                {LINKEDIN_LABEL}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <span
      ref={rootRef}
      className={`relative inline-flex items-center gap-1 ${className}`}
      onMouseEnter={openPanel}
      onMouseLeave={scheduleClose}
    >
      {showBy ? <span>By</span> : null}
      <i className="fa-solid fa-user" title="Human Author" aria-hidden="true"></i>
      <button
        type="button"
        className="text-inherit capitalize hover:text-primary-color transition-colors duration-300 underline-offset-2 hover:underline bg-transparent border-0 p-0 cursor-pointer font-inherit"
        aria-expanded={open}
        aria-controls={panelId}
        onFocus={openPanel}
        onBlur={onTriggerBlur}
        onKeyDown={onTriggerKeyDown}
        onClick={openPanel}
      >
        {author}
      </button>

      {open && typeof document !== "undefined"
        ? createPortal(panel, document.body)
        : null}
    </span>
  );
};

export default AuthorDisplay;
