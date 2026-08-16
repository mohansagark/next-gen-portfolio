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
 * Accent + panel chrome follow the site light/dark toggle (html.dark) via
 * in-place Shadow DOM CSS — never remount on theme change (script only boots once).
 *
 * API keys never pass through this component.
 */

/** Match site teal accents: deep on light surfaces, bright on dark. */
const THEME_ACCENTS = {
  light: { primary: "#0f766e", secondary: "#14b8a6" },
  dark: { primary: "#5eead4", secondary: "#2dd4bf" },
};

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
    themeColor: THEME_ACCENTS.dark.primary,
    themeColorSecondary: THEME_ACCENTS.dark.secondary,
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

function siteMode() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function accentsForMode(mode) {
  return THEME_ACCENTS[mode] || THEME_ACCENTS.dark;
}

/** Full theme override injected into the open shadow root (accents + panel chrome). */
function themeOverrideCss(mode) {
  const { primary: t, secondary: e } = accentsForMode(mode);
  const orbBg = `radial-gradient(circle at 32% 28%, rgba(255,255,255,.5) 0%, rgba(255,255,255,0) 45%), linear-gradient(135deg, ${e}, ${t})`;
  const accentGrad = `linear-gradient(120deg, ${t}, ${e})`;

  if (mode === "light") {
    return `
      .orb {
        background: ${orbBg} !important;
        box-shadow: 0 6px 24px rgba(15,23,42,.2), inset -5px -5px 10px rgba(0,0,0,.25), inset 4px 4px 8px rgba(255,255,255,.18) !important;
      }
      .orb:focus-visible { outline-color: ${t} !important; }
      .orb.idle { animation: none !important; box-shadow: 0 6px 24px rgba(15,23,42,.2), 0 0 0 0 ${t}00, inset -5px -5px 10px rgba(0,0,0,.25), inset 4px 4px 8px rgba(255,255,255,.18) !important; }
      @keyframes avb-site-pulse {
        0%,100% { box-shadow: 0 6px 24px rgba(15,23,42,.2), inset -5px -5px 10px rgba(0,0,0,.25), inset 4px 4px 8px rgba(255,255,255,.18); }
        50% { box-shadow: 0 6px 30px ${t}66, inset -5px -5px 10px rgba(0,0,0,.25), inset 4px 4px 8px rgba(255,255,255,.18); }
      }
      .orb.idle { animation: avb-site-pulse 2.4s ease-in-out infinite !important; }
      .hd, .send, .msg.user { background: ${accentGrad} !important; }
      .avatar { background: ${orbBg} !important; }
      .mic.listening { border-color: ${t} !important; }
      .mic-bars span { background: linear-gradient(180deg, ${e}, ${t}) !important; }
      .waveform span { background: ${t} !important; }
      .panel { background: #f7f8fa !important; color: #12151a !important; box-shadow: 0 12px 48px rgba(15,23,42,.16) !important; }
      .list { color: #12151a !important; }
      .msg.bot { background: #ffffff !important; color: #12151a !important; box-shadow: 0 2px 8px rgba(15,23,42,.08) !important; }
      .msg.note { color: #6b7280 !important; }
      form { border-top-color: rgba(15,23,42,.08) !important; }
      input { background: #ffffff !important; color: #12151a !important; border-color: #d1d5db !important; }
      input::placeholder { color: #6b7280 !important; }
      input:focus-visible { outline-color: ${t} !important; }
      form .mic { border-color: #d1d5db !important; color: #12151a !important; }
      .consent { background: #ffffff !important; border-color: #d1d5db !important; color: #12151a !important; }
      .slot-time { background: #ffffff !important; color: #12151a !important; border-color: #d1d5db !important; }
      .avatar svg circle[fill="#241f30"] { fill: #0f766e !important; }
    `;
  }

  return `
    .orb {
      background: ${orbBg} !important;
      box-shadow: 0 6px 24px rgba(0,0,0,.28), inset -5px -5px 10px rgba(0,0,0,.3), inset 4px 4px 8px rgba(255,255,255,.15) !important;
    }
    .orb:focus-visible { outline-color: ${t} !important; }
    @keyframes avb-site-pulse {
      0%,100% { box-shadow: 0 6px 24px rgba(0,0,0,.28), inset -5px -5px 10px rgba(0,0,0,.3), inset 4px 4px 8px rgba(255,255,255,.15); }
      50% { box-shadow: 0 6px 30px ${t}66, inset -5px -5px 10px rgba(0,0,0,.3), inset 4px 4px 8px rgba(255,255,255,.15); }
    }
    .orb.idle { animation: avb-site-pulse 2.4s ease-in-out infinite !important; }
    .hd, .send, .msg.user { background: ${accentGrad} !important; }
    .avatar { background: ${orbBg} !important; }
    .mic.listening { border-color: ${t} !important; }
    .mic-bars span { background: linear-gradient(180deg, ${e}, ${t}) !important; }
    .waveform span { background: ${t} !important; }
    .panel { background: #12151a !important; color: #e8eaed !important; box-shadow: 0 12px 48px rgba(0,0,0,.45) !important; }
    .list { color: #e8eaed !important; }
    .msg.bot { background: #181c22 !important; color: #e8eaed !important; box-shadow: 0 2px 8px rgba(0,0,0,.35) !important; }
    .msg.note { color: #9aa3af !important; }
    form { border-top-color: rgba(255,255,255,.08) !important; }
    input { background: #181c22 !important; color: #e8eaed !important; border-color: #3f4654 !important; }
    input::placeholder { color: #9aa3af !important; }
    input:focus-visible { outline-color: ${t} !important; }
    form .mic { border-color: #3f4654 !important; color: #e8eaed !important; }
    .consent { background: #181c22 !important; border-color: #3f4654 !important; color: #e8eaed !important; }
    .slot-time { background: #181c22 !important; color: #e8eaed !important; border-color: #3f4654 !important; }
    .avatar svg circle[fill="#241f30"] { fill: #0b0d10 !important; }
  `;
}

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

function unmountLeo() {
  document
    .querySelectorAll("div[data-ai-voice-bot], script[data-ai-voice-bot]")
    .forEach((el) => el.remove());
}

function applySiteTheme(mode) {
  const tryApply = (attempt = 0) => {
    const host = document.querySelector("div[data-ai-voice-bot]");
    const root = host?.shadowRoot;
    if (!root) {
      if (attempt < 40) window.setTimeout(() => tryApply(attempt + 1), 50);
      return false;
    }
    let style = root.getElementById("avb-site-theme");
    if (!style) {
      style = document.createElement("style");
      style.id = "avb-site-theme";
      root.appendChild(style);
    }
    style.textContent = themeOverrideCss(mode);
    return true;
  };
  return tryApply();
}

export default function LeoLoader({ workerUrl }) {
  useEffect(() => {
    if (typeof window === "undefined" || !workerUrl) return;
    let cancelled = false;
    let observer = null;
    let themeObserver = null;
    let safetyTimer = null;
    let lastMode = null;
    let started = false;

    const waitForIntent = () =>
      new Promise((resolve) => {
        const done = () => {
          window.removeEventListener("pointerdown", done);
          window.removeEventListener("keydown", done);
          window.removeEventListener("scroll", done);
          resolve();
        };
        window.addEventListener("pointerdown", done, { once: true, passive: true });
        window.addEventListener("keydown", done, { once: true, passive: true });
        window.addEventListener("scroll", done, { once: true, passive: true });
        // Fallback so the widget still appears for passive visitors.
        safetyTimer = window.setTimeout(done, 12000);
      });

    (async () => {
      await waitForIntent();
      if (cancelled || started) return;
      started = true;

      const widget = await loadWidgetConfig(workerUrl);
      if (cancelled) return;

      const mode = siteMode();
      const accents = accentsForMode(mode);
      lastMode = mode;

      // Section-wise merge: a partial config fills gaps from FALLBACK_WIDGET rather than
      // handing the widget `undefined` and inheriting its generic strings.
      window.AiVoiceBotConfig = {
        workerUrl,
        branding: {
          ...FALLBACK_WIDGET.branding,
          ...(widget.branding ?? {}),
          themeColor: accents.primary,
          themeColorSecondary: accents.secondary,
        },
        behavior: { ...FALLBACK_WIDGET.behavior, ...(widget.behavior ?? {}) },
        privacy: { ...FALLBACK_WIDGET.privacy, ...(widget.privacy ?? {}) },
        voice: { ...FALLBACK_WIDGET.voice, ...(widget.voice ?? {}) },
      };

      // Clear any stale mount, then load the widget once.
      unmountLeo();

      const s = document.createElement("script");
      s.src = `/ai-voice-bot.min.js?v=theme-stable`;
      s.async = true;
      s.defer = true;
      s.setAttribute("data-ai-voice-bot", "true");
      s.onload = () => {
        if (!cancelled) applySiteTheme(siteMode());
      };
      document.body.appendChild(s);

      // Restyle in place on theme toggle — do not remount (script boots only once).
      themeObserver = new MutationObserver(() => {
        const next = siteMode();
        if (next === lastMode) return;
        lastMode = next;
        applySiteTheme(next);
      });
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    })();

    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
      if (themeObserver) themeObserver.disconnect();
      if (safetyTimer) window.clearTimeout(safetyTimer);
    };
  }, [workerUrl]);

  return null;
}
