"use client";

import { useEffect } from "react";

/**
 * Mounts the ai-voice-bot widget.
 *
 * Public config resolution order:
 *   1. Worker GET /widget-config  (live after CMS → KV sync — no site redeploy needed)
 *   2. /leo-widget-config.json    (written by scripts/build-leo-config.mjs at site build)
 *   3. FALLBACK_WIDGET below
 *
 * API keys never pass through this component.
 */

/**
 * Used when both live Worker config and /leo-widget-config.json are missing or unreadable.
 * The build artifact is gitignored, so without this the widget would silently fall back to
 * its own generic strings ("Hi, I'm Leo — how can I help?") with no error.
 */
const FALLBACK_WIDGET = {
  branding: {
    botName: "Leo",
    greeting:
      "Hi, I'm Leo — Mohan's assistant. Ask me about his work, projects, or how to get in touch.",
    themeColor: "#6C5CE7",
    themeColorSecondary: "#6C5CE7",
    position: "bottom-right",
  },
  behavior: {
    autoGreet: true,
    rememberReturning: true,
    language: "en-US",
    proactiveGreet: true,
  },
  privacy: {
    consentText: "I agree to share my info so I can be followed up with.",
    privacyPolicyUrl: null,
  },
  // Chat-first: TTS stays off until the visitor unmutes the sound control.
  voice: { enabled: true, speakByDefault: false, ttsVoice: "hannah" },
};

async function loadWidgetConfig(workerUrl) {
  const base = String(workerUrl || "").replace(/\/+$/, "");
  if (base) {
    try {
      const res = await fetch(`${base}/widget-config`, { cache: "no-cache" });
      if (res.ok) {
        const body = await res.json();
        if (body?.widget && typeof body.widget === "object") return body.widget;
      } else {
        console.warn(
          `[leo] Worker /widget-config HTTP ${res.status} — trying static fallback.`,
        );
      }
    } catch {
      console.warn("[leo] Worker /widget-config unreachable — trying static fallback.");
    }
  }

  try {
    const res = await fetch("/leo-widget-config.json", { cache: "no-cache" });
    if (res.ok) return await res.json();
    console.warn(`[leo] widget config HTTP ${res.status} — using built-in defaults.`);
  } catch {
    console.warn("[leo] widget config unreachable — using built-in defaults.");
  }
  return {};
}

export default function LeoLoader({ workerUrl }) {
  useEffect(() => {
    if (typeof window === "undefined" || !workerUrl) return;
    let cancelled = false;

    (async () => {
      const widget = await loadWidgetConfig(workerUrl);
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
