"use client";

import { useEffect } from "react";

export default function LeoLoader({ workerUrl }) {
  useEffect(() => {
    if (typeof window === "undefined" || !workerUrl) return;
    window.AiVoiceBotConfig = {
      workerUrl,
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
      voice: { enabled: true, speakByDefault: false },
    };
    const existing = document.querySelector("script[data-ai-voice-bot]");
    if (existing) return;
    const s = document.createElement("script");
    s.src = "/ai-voice-bot.min.js";
    s.async = true;
    s.defer = true;
    s.setAttribute("data-ai-voice-bot", "true");
    document.body.appendChild(s);
  }, [workerUrl]);

  return null;
}
