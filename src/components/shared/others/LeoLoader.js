"use client";

import { useEffect } from "react";

/**
 * Mounts the ai-voice-bot widget.
 * Public config is loaded from /leo-widget-config.json (generated from portfolio-data
 * by scripts/build-leo-config.mjs). API keys never pass through this component.
 */
export default function LeoLoader({ workerUrl }) {
  useEffect(() => {
    if (typeof window === "undefined" || !workerUrl) return;
    let cancelled = false;

    (async () => {
      let widget = {};
      try {
        const res = await fetch("/leo-widget-config.json", { cache: "no-cache" });
        if (res.ok) widget = await res.json();
      } catch {
        // Fall through to minimal defaults — Worker still has full persona via KV.
      }
      if (cancelled) return;

      window.AiVoiceBotConfig = {
        workerUrl,
        branding: widget.branding,
        behavior: widget.behavior,
        privacy: widget.privacy,
        voice: widget.voice ?? { enabled: true, speakByDefault: false },
      };

      const existing = document.querySelector("script[data-ai-voice-bot]");
      if (existing) return;
      const s = document.createElement("script");
      s.src = "/ai-voice-bot.min.js";
      s.async = true;
      s.defer = true;
      s.setAttribute("data-ai-voice-bot", "true");
      document.body.appendChild(s);
    })();

    return () => {
      cancelled = true;
    };
  }, [workerUrl]);

  return null;
}
