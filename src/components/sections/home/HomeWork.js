"use client";

import Link from "next/link";
import { getContent } from "@/libs/contentStore";
import getPortfolio from "@/libs/getPortfolio";
import ScrollReveal from "@/components/sections/home/ScrollReveal";
import CaseStudyVisual from "@/components/sections/home/CaseStudyVisual";

function homeItems() {
  const homeCaseStudies = getContent("homeCaseStudies");
  const caseStudies = getContent("caseStudies");
  const portfolio = getPortfolio() || [];
  const raw =
    homeCaseStudies?.length
      ? homeCaseStudies
      : caseStudies?.length
        ? caseStudies.filter((p) => p.showOnHomepage !== false)
        : portfolio
            .filter((p) => p.featured && p.showOnHomepage !== false)
            .sort((a, b) => (a.priority || 99) - (b.priority || 99));

  return raw.slice(0, 6);
}

export default function HomeWork() {
  const items = homeItems();
  if (!items.length) return null;

  return (
    <section id="work" className="scroll-mt-24 lg:scroll-mt-28 py-16 sm:py-20 md:py-28">
      <div className="container max-w-[1120px] min-[1920px]:!max-w-[1680px] px-5 sm:px-6">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl text-primary-color-light dark:text-white mb-3 text-center">
            Selected work
          </h2>
          <p className="text-gray-color2 dark:text-[#9aa3af] max-w-2xl mb-10 md:mb-14 leading-relaxed text-center mx-auto">
            Product systems shipped in production — each panel is a proof point.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
          {items.map((item, i) => {
            const kind =
              item.kind ||
              (item.category?.includes("Employer") ? "employer" : "personal");
            const name = item.homeName || item.homeTitle || item.title;
            const tagline = item.homeTagline || "";
            const metrics =
              item.homeMetrics?.length > 0
                ? item.homeMetrics
                : item.homeMetric
                  ? String(item.homeMetric)
                      .split("·")
                      .map((m) => m.trim())
                      .filter(Boolean)
                  : [];
            const reverse = i % 2 === 1;
            const companyLabel =
              item.company &&
              item.company !== "Personal" &&
              item.company !== "Open source"
                ? item.company
                : kind === "employer"
                  ? "Employer"
                  : item.company === "Open source"
                    ? "Open source"
                    : "Personal system";

            return (
              <ScrollReveal
                key={item.slug || item.id}
                delay={i * 50}
                className="h-full"
              >
                <Link
                  href={`/work/${item.slug}`}
                  aria-label={`${name} — open showcase`}
                  className="group grid h-full grid-cols-2 gap-0 overflow-hidden rounded-[1.35rem] border border-black/5 dark:border-white/10 bg-cream-light-color/70 dark:bg-white/[0.025] transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-teal-700/30 dark:hover:border-teal-300/30 hover:shadow-[0_22px_50px_-28px_rgba(15,23,42,0.4)] dark:hover:shadow-[0_22px_50px_-24px_rgba(0,0,0,0.8)] active:translate-y-0 active:scale-[0.995] active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 dark:focus-visible:ring-teal-300/40"
                >
                  <div
                    className={`relative min-h-[140px] sm:min-h-[220px] lg:min-h-[260px] overflow-hidden bg-[#12151a] ${
                      reverse ? "order-2" : ""
                    }`}
                  >
                    <CaseStudyVisual
                      slug={item.slug}
                      src={
                        item.coverImage ||
                        (item.image?.startsWith("/images/work/")
                          ? item.image
                          : undefined)
                      }
                      alt=""
                      featured
                    />
                  </div>

                  <div
                    className={`flex flex-col justify-center gap-2 sm:gap-2.5 p-3.5 sm:p-5 lg:p-6 bg-white dark:bg-[#0f1217] ${
                      reverse ? "order-1" : ""
                    }`}
                  >
                    <p className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.14em] text-teal-700 dark:text-teal-300/85 font-medium">
                      {companyLabel}
                    </p>

                    <h3 className="font-display text-base sm:text-xl lg:text-2xl text-primary-color-light dark:text-white leading-tight transition-colors duration-300 group-hover:text-teal-800 dark:group-hover:text-teal-200">
                      {name}
                    </h3>

                    {tagline ? (
                      <p className="text-[0.7rem] sm:text-sm text-gray-color2 dark:text-[#9aa3af] leading-snug">
                        {tagline}
                      </p>
                    ) : null}

                    {kind === "employer" && item.companyDomain ? (
                      <p className="text-[0.65rem] sm:text-xs text-primary-color-light/65 dark:text-white/55 leading-snug line-clamp-3">
                        {item.companyDomain}
                      </p>
                    ) : null}

                    {metrics.length ? (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                        {metrics.map((metric) => (
                          <span
                            key={metric}
                            className="inline-flex items-center rounded-md border border-black/8 dark:border-white/10 bg-cream-light-color/80 dark:bg-white/[0.04] px-2 py-1 text-[0.65rem] sm:text-xs font-medium text-primary-color-light/90 dark:text-white/85"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
