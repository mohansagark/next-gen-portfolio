"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import getProfile from "@/libs/getProfile";
import getSocials from "@/libs/getSocials";
import { sendContactEmail } from "@/libs/sendContactEmail";
import ScrollReveal from "@/components/sections/home/ScrollReveal";
import { btnMetallicWhiteClass } from "@/components/shared/buttons/ButtonPrimary";

const SOCIAL_ICONS = {
  linkedin: "fa-brands fa-linkedin-in",
  github: "fa-brands fa-github",
  medium: "fa-brands fa-medium",
};

const REASONS = [
  "Project / product build",
  "Technical advisory",
  "Speaking / collaboration",
  "General enquiry",
];

const inputClass =
  "w-full rounded-xl border border-[#e5e7eb] dark:border-[#262b33] bg-white dark:bg-[#0b0d10] px-4 py-3 text-sm text-[#0b0d10] dark:text-[#f3f4f6] placeholder:text-[#6b7280] dark:placeholder:text-[#9aa3af] outline-none focus:border-teal-700 dark:focus:border-[#5eead4] transition-colors";

/* text-base (16px) avoids iOS focus-zoom that misplaces the native picker;
   appearance-none only themes the closed control — mobile still uses the OS menu. */
const selectClass = `${inputClass.replace(
  "text-sm",
  "text-base"
)} appearance-none cursor-pointer pr-10`;

// Production: Invisible widget sitekey from Cloudflare (required at build time).
// Dev-only fallback is Cloudflare's always-pass test sitekey — never bake that
// into production bundles or siteverify will reject tokens against a real secret.
const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
  (process.env.NODE_ENV !== "production" ? TURNSTILE_TEST_SITE_KEY : "");
const TURNSTILE_EXECUTE_TIMEOUT_MS = 20_000;

function isDarkMode() {
  return (
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
  );
}

export default function HomeContact() {
  const profile = getProfile() || {};
  const socials = (getSocials() || []).filter((s) =>
    ["linkedin", "github", "medium"].includes(String(s.id).toLowerCase())
  );

  const widgetRef = useRef(null);
  const widgetIdRef = useRef(null);
  const themeRef = useRef(null);
  /** @type {React.MutableRefObject<{ resolve: (t: string) => void, reject: (e: Error) => void } | null>} */
  const tokenWaiterRef = useRef(null);

  const sectionRef = useRef(null);
  const [loadTurnstile, setLoadTurnstile] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    reason: REASONS[0],
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // success | error | null
  const [errorMessage, setErrorMessage] = useState("");
  const [challengePending, setChallengePending] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoadTurnstile(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const clearTokenWaiter = useCallback((error) => {
    const waiter = tokenWaiterRef.current;
    if (!waiter) return;
    tokenWaiterRef.current = null;
    if (error) waiter.reject(error);
  }, []);

  const resetTurnstile = useCallback(() => {
    clearTokenWaiter(new Error("Turnstile reset"));
    setChallengePending(false);
    if (
      typeof window !== "undefined" &&
      window.turnstile &&
      widgetIdRef.current != null
    ) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [clearTokenWaiter]);

  const removeWidget = useCallback(() => {
    clearTokenWaiter(new Error("Turnstile removed"));
    if (
      typeof window !== "undefined" &&
      window.turnstile &&
      widgetIdRef.current != null
    ) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }
  }, [clearTokenWaiter]);

  const renderWidget = useCallback(
    (force = false) => {
      if (
        typeof window === "undefined" ||
        !window.turnstile ||
        !widgetRef.current ||
        !TURNSTILE_SITE_KEY
      ) {
        return;
      }

      const theme = isDarkMode() ? "dark" : "light";

      if (widgetIdRef.current != null) {
        if (!force && themeRef.current === theme) return;
        removeWidget();
      }

      themeRef.current = theme;
      // Invisible flow: defer challenge until submit (execution: execute) and
      // only show UI when Cloudflare needs interaction (appearance).
      // Dashboard widget type should be Invisible for the production sitekey.
      widgetIdRef.current = window.turnstile.render(widgetRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme,
        appearance: "interaction-only",
        execution: "execute",
        action: "contact",
        callback: (t) => {
          setChallengePending(false);
          const waiter = tokenWaiterRef.current;
          tokenWaiterRef.current = null;
          if (waiter) waiter.resolve(t);
        },
        "expired-callback": () => {
          clearTokenWaiter(new Error("Turnstile token expired"));
          setChallengePending(false);
        },
        "error-callback": () => {
          clearTokenWaiter(new Error("Turnstile verification failed"));
          setChallengePending(false);
        },
      });
    },
    [removeWidget, clearTokenWaiter]
  );

  useEffect(() => {
    if (window.turnstile) renderWidget();

    const observer = new MutationObserver(() => {
      const nextTheme = isDarkMode() ? "dark" : "light";
      if (themeRef.current !== nextTheme) {
        renderWidget(true);
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
      removeWidget();
    };
  }, [renderWidget, removeWidget]);

  const obtainTurnstileToken = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!TURNSTILE_SITE_KEY) {
        reject(
          new Error(
            "Contact form is misconfigured (missing Turnstile site key)."
          )
        );
        return;
      }
      if (
        typeof window === "undefined" ||
        !window.turnstile ||
        widgetIdRef.current == null
      ) {
        reject(new Error("Security check is still loading. Please try again."));
        return;
      }

      clearTokenWaiter(new Error("Superseded"));

      const timer = setTimeout(() => {
        if (tokenWaiterRef.current?.reject !== reject) return;
        tokenWaiterRef.current = null;
        setChallengePending(false);
        reject(new Error("Security check timed out. Please try again."));
      }, TURNSTILE_EXECUTE_TIMEOUT_MS);

      tokenWaiterRef.current = {
        resolve: (token) => {
          clearTimeout(timer);
          resolve(token);
        },
        reject: (error) => {
          clearTimeout(timer);
          reject(error);
        },
      };
      setChallengePending(true);

      try {
        window.turnstile.execute(widgetIdRef.current);
      } catch (err) {
        clearTimeout(timer);
        tokenWaiterRef.current = null;
        setChallengePending(false);
        reject(
          err instanceof Error
            ? err
            : new Error("Could not start security check.")
        );
      }
    });
  }, [clearTokenWaiter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);
    setStatus(null);
    setErrorMessage("");

    try {
      const token = await obtainTurnstileToken();
      const result = await sendContactEmail({ ...formData, token });
      if (result.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          reason: REASONS[0],
          message: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(
          result.data?.error || "Failed to send message. Please try again."
        );
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error && err.message
          ? err.message
          : "Failed to send message. Please try again."
      );
    } finally {
      setSending(false);
      resetTurnstile();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="scroll-mt-24 lg:scroll-mt-28 py-16 sm:py-20 md:py-28"
    >
      {loadTurnstile ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="lazyOnload"
          onLoad={() => renderWidget()}
        />
      ) : null}
      <div className="container max-w-[1120px] min-[1920px]:!max-w-[1680px] px-5 sm:px-6">
        {/* Form stays outside ScrollReveal — motion transform breaks mobile <select> menus. */}
        <div className="rounded-2xl md:rounded-[2rem] border border-[#e5e7eb] dark:border-[#262b33] bg-[#f3f4f6] dark:bg-[#12151a] p-6 sm:p-8 md:p-12">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#0b0d10] dark:text-[#f3f4f6] mb-4 max-w-2xl leading-tight text-center mx-auto">
              Building an AI product?
            </h2>
            <p className="text-[#374151] dark:text-[#9aa3af] max-w-2xl mb-8 leading-relaxed text-base sm:text-lg text-center mx-auto">
              If you need a senior engineer who can help take it from concept to
              production, reach out.
            </p>
          </ScrollReveal>

          <form
              onSubmit={handleSubmit}
              className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2"
              noValidate
            >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#6b7280] dark:text-[#9aa3af]"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#6b7280] dark:text-[#9aa3af]"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-company"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#6b7280] dark:text-[#9aa3af]"
                  >
                    Company{" "}
                    <span className="normal-case tracking-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company or project"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#6b7280] dark:text-[#9aa3af]"
                  >
                    Phone{" "}
                    <span className="normal-case tracking-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 555 000 0000"
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="contact-reason"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#6b7280] dark:text-[#9aa3af]"
                  >
                    Reason
                  </label>
                  <div className="relative">
                    <select
                      id="contact-reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      className={selectClass}
                    >
                      {REASONS.map((reason) => (
                        <option
                          key={reason}
                          value={reason}
                          className="bg-white dark:bg-[#0b0d10] text-[#0b0d10] dark:text-[#f3f4f6]"
                        >
                          {reason}
                        </option>
                      ))}
                    </select>
                    <span
                      className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#6b7280] dark:text-[#9aa3af]"
                      aria-hidden
                    >
                      <i className="fa-solid fa-chevron-down text-[10px]" />
                    </span>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#6b7280] dark:text-[#9aa3af]"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What are you building, and how can I help?"
                    className={`${inputClass} resize-y min-h-[120px]`}
                  />
                </div>

                {/* Mount point for invisible Turnstile; only expands if a challenge is shown. */}
                <div
                  ref={widgetRef}
                  className="cf-turnstile sm:col-span-2 empty:hidden [&_iframe]:!max-w-full"
                  aria-hidden={!challengePending}
                />

                <div className="sm:col-span-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
                  {challengePending ? (
                    <p
                      className="text-xs text-[#6b7280] dark:text-[#9aa3af]"
                      role="status"
                      aria-live="polite"
                    >
                      Verifying you’re human…
                    </p>
                  ) : null}
                  <button
                    type="submit"
                    disabled={sending}
                    className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed sm:self-center ${btnMetallicWhiteClass}`}
                  >
                    {sending ? "Sending…" : "Send enquiry"}
                    {!sending ? (
                      <i
                        className="fa-solid fa-arrow-right text-[12px]"
                        aria-hidden
                      />
                    ) : null}
                  </button>
                </div>

                {status === "success" ? (
                  <p
                    className="sm:col-span-2 text-sm text-teal-700 dark:text-[#5eead4]"
                    role="status"
                  >
                    Thanks — your message is on its way. I&apos;ll reply soon.
                  </p>
                ) : null}
                {status === "error" ? (
                  <p
                    className="sm:col-span-2 text-sm text-red-600 dark:text-red-400"
                    role="alert"
                  >
                    {errorMessage}
                  </p>
                ) : null}
          </form>

          <aside className="mt-8 flex flex-col gap-6">
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={`mailto:${profile.email || "contact@devmohan.in"}`}
                className={`group inline-flex items-center gap-2 rounded-full ${btnMetallicWhiteClass} pl-4 pr-2 py-2 text-sm font-semibold`}
              >
                <i
                  className="fa-solid fa-envelope text-[13px]"
                  aria-hidden
                />
                Email me
                <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                  <i
                    className="fa-solid fa-arrow-right text-[12px]"
                    aria-hidden
                  />
                </span>
              </a>
              {socials.map((s) => {
                const id = String(s.id).toLowerCase();
                const icon =
                  s.iconName || SOCIAL_ICONS[id] || `fa-brands fa-${id}`;
                return (
                  <a
                    key={s.id}
                    href={s.path}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d1d5db] dark:border-[#3f4654] text-[#0b0d10] dark:text-[#e8eaed] px-5 py-3 text-sm font-medium capitalize hover:border-teal-600 dark:hover:border-teal-300/50"
                  >
                    <i className={`${icon} text-[14px]`} aria-hidden />
                    {s.id}
                  </a>
                );
              })}
              {profile.resumeUrl ? (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d1d5db] dark:border-[#3f4654] text-[#0b0d10] dark:text-[#e8eaed] px-5 py-3 text-sm font-medium hover:border-teal-600 dark:hover:border-teal-300/50"
                >
                  <i
                    className="fa-solid fa-file-arrow-down text-[13px]"
                    aria-hidden
                  />
                  Resume
                </a>
              ) : null}
            </div>
            <div className="text-center">
              <p className="text-sm text-[#374151] dark:text-[#9aa3af]">
                Remote-ready · Open to startups worldwide
              </p>
              <p className="mt-2 text-sm text-[#374151] dark:text-[#c6ccd6]">
                {profile.email || "contact@devmohan.in"}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
