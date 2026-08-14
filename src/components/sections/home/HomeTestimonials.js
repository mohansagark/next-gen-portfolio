"use client";

import { useEffect, useState } from "react";
import getTestimonials from "@/libs/getTestimonials";
import { RAW_BASE } from "@/libs/contentMapping";
import ScrollReveal from "@/components/sections/home/ScrollReveal";

function avatarSrc(t) {
  if (!t?.img) return "";
  return t.img.startsWith("http") ? t.img : `${RAW_BASE}${t.img}`;
}

export default function HomeTestimonials() {
  const list = getTestimonials() || [];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (list.length < 2 || paused) return undefined;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % list.length);
    }, 5500);
    return () => clearInterval(id);
  }, [list.length, paused]);

  if (!list.length) return null;

  const current = list[active] || list[0];

  return (
    <section
      id="testimonials"
      className="scroll-mt-24 lg:scroll-mt-28 py-14 sm:py-16 md:py-20 bg-[#f3f4f6] dark:bg-[#12151a] overflow-hidden"
    >
      <div className="container max-w-[1120px] min-[1920px]:!max-w-[1680px] px-5 sm:px-6">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center gap-2 mb-6 md:mb-8">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-[#0b0d10] dark:text-[#f3f4f6] mb-2">
                People I’ve built with
              </h2>
              <p className="text-[#374151] dark:text-[#9aa3af] max-w-2xl leading-relaxed mx-auto">
                Endorsements from engineers and leaders I’ve shipped with.
              </p>
            </div>
            <p className="text-xs uppercase tracking-[0.14em] text-[#374151] dark:text-[#9aa3af] tabular-nums shrink-0">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(list.length).padStart(2, "0")}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div
            className="relative rounded-2xl border border-[#e5e7eb] dark:border-[#262b33] bg-white dark:bg-[#181c22] p-5 sm:p-6 md:p-7"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div
              className="pointer-events-none absolute -top-20 -right-12 w-52 h-52 rounded-full bg-teal-500/10 dark:bg-teal-300/10 blur-3xl"
              aria-hidden
            />

            <figure className="relative">
              <blockquote
                key={current.id || current.authorName}
                className="testimonial-quote"
              >
                <p className="font-display text-lg sm:text-xl md:text-[1.35rem] leading-snug text-[#0b0d10] dark:text-[#f3f4f6]">
                  “{current.desc}”
                </p>
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                {avatarSrc(current) ? (
                  <img
                    src={avatarSrc(current)}
                    alt=""
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border-2 border-teal-700/30 dark:border-teal-300/40"
                  />
                ) : null}
                <div>
                  <cite className="not-italic text-[#0b0d10] dark:text-[#f3f4f6] font-semibold block text-sm sm:text-base">
                    {current.authorName}
                  </cite>
                  <span className="text-sm text-[#374151] dark:text-[#9aa3af]">
                    {current.authorDesig}
                  </span>
                </div>
              </figcaption>
            </figure>

            <div
              className="relative mt-6 pt-5 border-t border-[#e5e7eb] dark:border-[#262b33] flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Choose endorsement"
            >
              {list.map((t, i) => {
                const selected = i === active;
                return (
                  <button
                    key={t.id || t.authorName}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-label={`Show endorsement from ${t.authorName}`}
                    onClick={() => setActive(i)}
                    className={`group flex items-center gap-2.5 rounded-xl border px-2.5 py-2 text-left transition-colors shrink-0 max-w-[220px] ${
                      selected
                        ? "border-teal-700/50 dark:border-teal-300/40 bg-teal-700/[0.06] dark:bg-teal-300/[0.08]"
                        : "border-[#e5e7eb] dark:border-[#262b33] hover:border-teal-700/30 dark:hover:border-teal-300/25 bg-transparent"
                    }`}
                  >
                    {avatarSrc(t) ? (
                      <img
                        src={avatarSrc(t)}
                        alt=""
                        width={36}
                        height={36}
                        className={`w-9 h-9 rounded-full object-cover shrink-0 ${
                          selected
                            ? "ring-2 ring-teal-700 dark:ring-teal-300"
                            : "opacity-80"
                        }`}
                      />
                    ) : null}
                    <span className="min-w-0">
                      <span
                        className={`block text-sm font-medium truncate ${
                          selected
                            ? "text-[#0b0d10] dark:text-[#f3f4f6]"
                            : "text-[#374151] dark:text-[#9aa3af]"
                        }`}
                      >
                        {t.authorName}
                      </span>
                      <span className="block text-xs text-[#374151] dark:text-[#9aa3af] truncate">
                        {t.authorDesig}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 h-1 rounded-full bg-[#e5e7eb] dark:bg-[#262b33] overflow-hidden">
              <div
                className="h-full bg-teal-700 dark:bg-teal-300 transition-[width] duration-500 ease-out"
                style={{ width: `${((active + 1) / list.length) * 100}%` }}
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
