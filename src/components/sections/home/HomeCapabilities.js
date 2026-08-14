"use client";

import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/libs/contentStore";
import ScrollReveal from "@/components/sections/home/ScrollReveal";

export default function HomeCapabilities() {
  const capabilities = getContent("capabilities");
  if (!capabilities?.items?.length) return null;

  return (
    <section id="capabilities" className="scroll-mt-24 lg:scroll-mt-28 py-16 sm:py-20 md:py-28">
      <div className="container max-w-[1120px] min-[1920px]:!max-w-[1680px] px-5 sm:px-6">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl text-primary-color-light dark:text-white mb-3 text-center">
            {capabilities.sectionTitle}
          </h2>
          {capabilities.sectionSubcopy ? (
            <p className="text-gray-color2 dark:text-[#9aa3af] max-w-2xl mb-10 md:mb-12 leading-relaxed text-center mx-auto">
              {capabilities.sectionSubcopy}
            </p>
          ) : (
            <div className="mb-10 md:mb-12" />
          )}
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {capabilities.items.map((item, i) => {
            const href = `/capabilities/${item.slug || item.id}`;
            return (
              <ScrollReveal key={item.id} delay={i * 70}>
                <Link
                  href={href}
                  aria-label={`${item.title} — open capability`}
                  className="group block h-full rounded-[1.25rem] border border-black/5 dark:border-white/10 bg-cream-light-color/80 dark:bg-white/[0.025] p-1 transition-[transform,border-color,box-shadow,background-color] duration-300 ease-out will-change-transform hover:-translate-y-1.5 hover:border-teal-700/35 dark:hover:border-teal-300/35 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)] dark:hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.75)] active:translate-y-0 active:scale-[0.985] active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 dark:focus-visible:ring-teal-300/40"
                >
                  <article className="h-full rounded-[calc(1.25rem-0.15rem)] bg-white dark:bg-[#0f1217] overflow-hidden flex flex-col text-center transition-colors duration-300 group-hover:bg-[#fafbfc] dark:group-hover:bg-[#12161c] group-active:bg-white dark:group-active:bg-[#0f1217]">
                    {item.image || item.imageLight ? (
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-transparent">
                        {item.imageLight ? (
                          <Image
                            src={item.imageLight}
                            alt=""
                            fill
                            sizes="(max-width: 1024px) 50vw, 25vw"
                            className="object-cover scale-[1.02] transition-transform duration-500 ease-out group-hover:scale-[1.08] group-active:scale-[1.04] dark:hidden"
                          />
                        ) : null}
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            sizes="(max-width: 1024px) 50vw, 25vw"
                            className={
                              item.imageLight
                                ? "object-cover scale-[1.02] transition-transform duration-500 ease-out group-hover:scale-[1.08] group-active:scale-[1.04] hidden dark:block"
                                : "object-cover scale-[1.02] transition-transform duration-500 ease-out group-hover:scale-[1.08] group-active:scale-[1.04]"
                            }
                          />
                        ) : null}
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col p-3.5 sm:p-4 md:p-5">
                      <h3 className="text-primary-color-light dark:text-white text-sm sm:text-base md:text-lg font-semibold mb-1.5 sm:mb-2 leading-snug transition-colors duration-300 group-hover:text-teal-800 dark:group-hover:text-teal-200">
                        {item.title}
                      </h3>
                      <p className="text-gray-color2 dark:text-[#9aa3af] text-xs sm:text-sm leading-relaxed flex-1">
                        {item.body}
                      </p>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
