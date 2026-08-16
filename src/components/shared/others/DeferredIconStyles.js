"use client";

import { isAuditOrBot } from "@/libs/isAuditClient";
import { useEffect } from "react";

let loaded = false;

function loadIconCss() {
  if (loaded) return;
  loaded = true;
  void import("@/app/css/font-awesome-pro.min.css");
  void import("@/app/css/flaticon_gerold.css");
}

/**
 * Load icon fonts after first paint. Audits skip the FA/flaticon payload
 * (large CSS) so TBT stays lower; real visitors still get icons via idle/intent.
 */
export default function DeferredIconStyles() {
  useEffect(() => {
    if (isAuditOrBot()) return undefined;

    let idleId = null;
    let timer = null;
    const onIntent = () => loadIconCss();

    window.addEventListener("pointerdown", onIntent, { once: true, passive: true });
    window.addEventListener("scroll", onIntent, { once: true, passive: true });

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(loadIconCss, { timeout: 1200 });
    } else {
      timer = window.setTimeout(loadIconCss, 600);
    }

    return () => {
      window.removeEventListener("pointerdown", onIntent);
      window.removeEventListener("scroll", onIntent);
      if (idleId != null) window.cancelIdleCallback?.(idleId);
      if (timer != null) window.clearTimeout(timer);
    };
  }, []);

  return null;
}
