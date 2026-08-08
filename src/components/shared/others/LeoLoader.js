"use client";

import { useEffect } from "react";

/**
 * Mounts the ai-voice-bot widget.
 * Public config is loaded from /leo-widget-config.json (generated from portfolio-data
 * by scripts/build-leo-config.mjs). API keys never pass through this component.
 */

/**
 * Used when /leo-widget-config.json is missing or unreadable — a skipped prebuild, a fresh
 * clone, a bad deploy. The file is gitignored, so without this the widget would silently
 * fall back to its own generic strings ("Hi, I'm Leo — how can I help?") with no error.
 */
const FALLBACK_WIDGET = {
  branding: {
    botName: "Leo",
    greeting:
      "Hi, I'm Leo — Mohan's assistant. Ask me about his work, projects, or how to get in touch.",
  },
  behavior: { autoGreet: true, rememberReturning: true, language: "en-US" },
  privacy: {
    consentText: "I agree to share my info so I can be followed up with.",
    privacyPolicyUrl: null,
  },
  // Chat-first: TTS stays off until the visitor unmutes the sound control.
  voice: { enabled: true, speakByDefault: false },
};
export default function LeoLoader({ workerUrl }) {
  useEffect(() => {
    if (typeof window === "undefined" || !workerUrl) return;
    let cancelled = false;

    (async () => {
      let widget = {};
      try {
        const res = await fetch("/leo-widget-config.json", { cache: "no-cache" });
        if (res.ok) widget = await res.json();
        else console.warn(`[leo] widget config HTTP ${res.status} — using built-in defaults.`);
      } catch {
        console.warn("[leo] widget config unreachable — using built-in defaults.");
      }
      if (cancelled) return;

      // Section-wise merge: a partial config fills gaps from FALLBACK_WIDGET rather than
      // handing the widget `undefined` and inheriting its generic strings.
      window.AiVoiceBotConfig = {
        workerUrl,
        branding: { ...FALLBACK_WIDGET.branding, ...(widget.branding ?? {}) },
        behavior: { ...FALLBACK_WIDGET.behavior, ...(widget.behavior ?? {}) },
        privacy: { ...FALLBACK_WIDGET.privacy, ...(widget.privacy ?? {}) },
        voice: { ...FALLBACK_WIDGET.voice, ...(widget.voice ?? {}) },
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
