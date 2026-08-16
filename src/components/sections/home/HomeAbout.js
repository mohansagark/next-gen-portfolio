"use client";

import Image from "next/image";
import getProfile from "@/libs/getProfile";
import ScrollReveal from "@/components/sections/home/ScrollReveal";

/** Render plain text with simple **bold** markers as <strong>. */
function renderWithBold(text) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={i}
          className="font-semibold text-primary-color-light dark:text-white"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function HomeAbout() {
  const profile = getProfile() || {};
  // bio = lead line; about = body (\\n\\n-separated paragraphs)
  const chunks = [profile.bio, profile.about]
    .filter(Boolean)
    .flatMap((p) => String(p).split(/\n\n+/).map((c) => c.trim()).filter(Boolean));
  const avatarSrc = "/images/profile/avatar-web.jpg";

  return (
    <section
      id="about"
      className="scroll-mt-24 lg:scroll-mt-28 py-16 sm:py-20 md:py-28 bg-cream-light-color/70 dark:bg-[#12151a]/40"
    >
      <div className="container max-w-[1120px] min-[1920px]:!max-w-[1680px] px-5 sm:px-6">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-14 items-center">
          <ScrollReveal>
            <div className="relative max-w-sm mx-auto lg:mx-0 w-full">
              <div className="absolute -inset-3 rounded-[2rem] border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03]" />
              <Image
                src={avatarSrc}
                alt={`${profile.firstName || "Mohan Sagar"}`}
                width={520}
                height={640}
                sizes="(min-width: 1024px) 35vw, 384px"
                className="relative w-full aspect-[4/5] object-cover object-top rounded-[1.6rem] border border-black/5 dark:border-white/10"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="font-display text-3xl md:text-4xl text-primary-color-light dark:text-white mb-6 text-left">
              About
            </h2>
            <div className="space-y-5">
              {chunks.length ? (
                chunks.map((chunk, index) => (
                  <p
                    key={`${index}-${chunk.slice(0, 32)}`}
                    className={
                      index === 0
                        ? "text-primary-color-light dark:text-white text-lg sm:text-xl leading-relaxed"
                        : "text-primary-color-light/90 dark:text-[#c6ccd6] text-base sm:text-lg leading-relaxed"
                    }
                  >
                    {renderWithBold(chunk)}
                  </p>
                ))
              ) : (
                <p className="text-primary-color-light/90 dark:text-[#c6ccd6] text-lg leading-relaxed">
                  I’m Mohan Sagar — a senior software engineer based in Hyderabad,
                  working with remote-friendly teams.
                </p>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
