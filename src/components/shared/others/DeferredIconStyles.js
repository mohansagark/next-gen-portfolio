"use client";

import { useEffect } from "react";

let loaded = false;

function loadIconCss() {
  if (loaded) return;
  loaded = true;
  void import("@/app/css/font-awesome-pro.min.css");
  void import("@/app/css/flaticon_gerold.css");
}

/**
 * Load icon fonts right after first paint (idle, ≤400ms).
 * Still not in the render-blocking CSS chain (keeps FCP/LCP), but icons
 * appear quickly instead of waiting for scroll / 8s.
 */
export default function DeferredIconStyles() {
  useEffect(() => {
    let idleId = null;
    let timer = null;

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(loadIconCss, { timeout: 400 });
    } else {
      timer = window.setTimeout(loadIconCss, 200);
    }

    return () => {
      if (idleId != null) window.cancelIdleCallback?.(idleId);
      if (timer != null) window.clearTimeout(timer);
    };
  }, []);

  return null;
}
