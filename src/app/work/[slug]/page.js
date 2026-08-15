import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import { fetchAllContent } from "@/libs/portfolioData";
import { notFound } from "next/navigation";
import Link from "next/link";
import CaseStudyVisual from "@/components/sections/home/CaseStudyVisual";
import { getStackIcon } from "@/libs/stackIcons";
import { btnMetallicClass } from "@/components/shared/buttons/ButtonPrimary";

async function loadCaseStudies() {
  const content = await fetchAllContent();
  return content.caseStudies || content.portfolio || [];
}

function findCase(items, slug) {
  return items?.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = findCase(await loadCaseStudies(), slug);
  if (!item) notFound();
  const name = item.homeName || item.title;
  const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://devmohan.in";
  return {
    title: `${name} — Mohan Sagar`,
    description:
      item.homeTagline ||
      item.shortDescription ||
      item.shortDesc ||
      item.description ||
      item.desc,
    alternates: { canonical: `${SITE}/work/${slug}` },
  };
}

export async function generateStaticParams() {
  const items = await loadCaseStudies();
  return (items || [])
    .filter((i) => i.slug)
    .map(({ slug }) => ({ slug }));
}

function metricsFrom(item) {
  if (item.homeMetrics?.length) return item.homeMetrics;
  if (item.homeMetric) {
    return String(item.homeMetric)
      .split("·")
      .map((m) => m.trim())
      .filter(Boolean);
  }
  return [];
}

function StackMark({ tech }) {
  const icon = getStackIcon(tech);
  if (icon.type === "badge") {
    return (
      <span
        className="inline-flex h-4 min-w-4 items-center justify-center rounded-[3px] px-0.5 text-[0.55rem] font-bold leading-none text-white"
        style={{ backgroundColor: icon.color || "#3178C6" }}
        title={icon.title}
        aria-hidden
      >
        {icon.label}
      </span>
    );
  }
  return (
    <i
      className={`${icon.className} text-[0.95em]`}
      style={{ color: icon.color || "#14B8A6" }}
      aria-hidden
    />
  );
}

function StoryBeat({ index, label, body, emphasize = false }) {
  return (
    <article className="relative pl-5 sm:pl-6">
      <span
        className="absolute left-0 top-0 bottom-0 w-px bg-teal-700/25 dark:bg-teal-300/25"
        aria-hidden
      />
      <span
        className="absolute left-[-3px] top-1.5 h-1.5 w-1.5 rounded-full bg-teal-700 dark:bg-teal-300"
        aria-hidden
      />
      <div className="flex items-baseline gap-2.5 mb-2.5">
        <span className="font-display text-xs tabular-nums text-teal-700 dark:text-teal-300/90">
          {String(index).padStart(2, "0")}
        </span>
        <h2 className="text-[0.68rem] uppercase tracking-[0.16em] text-primary-color-light/65 dark:text-white/50 font-medium">
          {label}
        </h2>
      </div>
      <p
        className={
          emphasize
            ? "font-display text-xl sm:text-2xl md:text-[1.65rem] text-primary-color-light dark:text-white leading-snug"
            : "text-primary-color-light dark:text-[#e8eaed] text-[0.95rem] sm:text-base md:text-lg leading-relaxed"
        }
      >
        {body}
      </p>
    </article>
  );
}

export default async function WorkCaseStudyPage({ params }) {
  const { slug } = await params;
  const item = findCase(await loadCaseStudies(), slug);
  if (!item) notFound();

  const name = item.homeName || item.title;
  const tagline = item.homeTagline || item.subtitle || item.title2 || "";
  const kind = item.kind;
  const company = item.company;
  const problem = item.problem || item.desc1;
  const solution = item.solution || item.desc2;
  const result = item.result || item.shortDescription || item.shortDesc;
  const ai = item.ai;
  const stack = item.technologies || item.tags || [];
  const metrics = metricsFrom(item);
  const companyDomain = item.companyDomain || "";
  const github = item.githubUrl;
  const live = item.liveUrl || item.url;
  const coverSrc =
    item.coverImage ||
    (item.image?.startsWith?.("/images/work/") ? item.image : undefined);
  const architectureSrc = item.architectureImage || "";
  const architectureSrcLight =
    item.architectureImageLight || item.architectureImage || "";
  const hasArchitecture = !!(architectureSrc || architectureSrcLight);

  const eyebrow =
    kind === "employer"
      ? company
        ? `Employer · ${company}`
        : "Employer"
      : company === "Open source"
        ? "Open source"
        : "Personal system";

  const panels = {
    problem: problem ? { label: "Problem", body: problem } : null,
    solution: solution ? { label: "Solution", body: solution } : null,
    ai: ai
      ? { label: item.aiLabel || "Where AI fits", body: ai }
      : null,
    outcome: result ? { label: "Outcome", body: result } : null,
  };
  const hasStory = Object.values(panels).some(Boolean);

  return (
    <PageWrapper isInnerPage={true}>
      <main id="main" className="pt-4 md:pt-32 pb-16 md:pb-24">
        <section className="px-5 sm:px-6 mb-8 md:mb-10">
          <div className="container max-w-[1120px] min-[1920px]:!max-w-[1680px]">
            <Link
              href="/#work"
              className="text-sm text-gray-color2 dark:text-[#9aa3af] hover:text-teal-700 dark:hover:text-teal-200 mb-6 max-lg:mb-4 inline-block"
            >
              ← Selected work
            </Link>

            <p className="text-[0.7rem] uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300/90 mb-3 font-medium">
              {eyebrow}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] text-primary-color-light dark:text-white leading-[1.12] mb-3 max-w-3xl">
              {name}
            </h1>
            {tagline ? (
              <p className="text-gray-color2 dark:text-[#9aa3af] text-base md:text-lg leading-relaxed mb-4 max-w-2xl">
                {tagline}
              </p>
            ) : null}

            {kind === "employer" && companyDomain ? (
              <p className="text-sm sm:text-[0.95rem] text-primary-color-light/80 dark:text-white/70 leading-relaxed mb-5 max-w-2xl border-l-2 border-teal-700/30 dark:border-teal-300/30 pl-3.5">
                {companyDomain}
              </p>
            ) : null}

            {metrics.length ? (
              <div className="flex flex-wrap gap-2 mb-5">
                {metrics.map((metric) => (
                  <span
                    key={metric}
                    className="inline-flex items-center rounded-md border border-black/8 dark:border-white/10 bg-cream-light-color/90 dark:bg-white/[0.04] px-2.5 py-1.5 text-xs sm:text-sm font-medium text-primary-color-light dark:text-white/90"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            ) : null}

            {stack.length ? (
              <div className="mb-6">
                <p className="text-[0.7rem] uppercase tracking-[0.14em] text-teal-700 dark:text-teal-300/80 mb-2.5 font-medium">
                  Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {stack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-2 rounded-full border border-black/8 dark:border-white/10 bg-white dark:bg-[#0f1217] px-3 py-1.5 text-xs sm:text-sm text-primary-color-light/90 dark:text-white/85"
                    >
                      <StackMark tech={tech} />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {(live || github) && (
              <div className="flex flex-wrap gap-3">
                {live ? (
                  <a
                    href={live}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center justify-center rounded-full ${btnMetallicClass} px-5 py-2.5 text-sm font-semibold`}
                  >
                    View live
                  </a>
                ) : null}
                {github ? (
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-[#d1d5db] dark:border-white/15 text-primary-color-light dark:text-white px-5 py-2.5 text-sm font-medium hover:border-teal-600/50 dark:hover:border-teal-300/50 transition-colors"
                  >
                    GitHub
                  </a>
                ) : null}
              </div>
            )}
          </div>
        </section>

        <section className="px-5 sm:px-6 mb-12 md:mb-16">
          <div className="container max-w-[1120px] min-[1920px]:!max-w-[1680px]">
            <div
              className={
                hasArchitecture
                  ? "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
                  : "grid grid-cols-1"
              }
            >
              <div className="relative rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 aspect-[16/10] bg-cream-light-color dark:bg-[#12151a] shadow-[0_20px_50px_-32px_rgba(15,23,42,0.4)] dark:shadow-[0_20px_50px_-28px_rgba(0,0,0,0.75)]">
                <CaseStudyVisual
                  slug={slug}
                  src={coverSrc}
                  alt=""
                  featured
                />
              </div>

              {hasArchitecture ? (
                <div className="relative rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 aspect-[16/10] bg-transparent shadow-none">
                  {architectureSrcLight ? (
                    <img
                      src={architectureSrcLight}
                      alt={`Architecture for ${name}`}
                      className="absolute inset-0 h-full w-full object-contain object-center dark:hidden"
                      loading="lazy"
                    />
                  ) : null}
                  {architectureSrc ? (
                    <img
                      src={architectureSrc}
                      alt={`Architecture for ${name}`}
                      className={
                        architectureSrcLight
                          ? "absolute inset-0 h-full w-full object-contain object-center hidden dark:block"
                          : "absolute inset-0 h-full w-full object-contain object-center"
                      }
                      loading="lazy"
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {hasStory ? (
          <section className="px-5 sm:px-6 mb-12 md:mb-16">
            <div className="container max-w-[1120px] min-[1920px]:!max-w-[1680px]">
              {/*
                Narrative arc (intentional, not a random grid):
                01 Problem — full width opener
                02 + 03 Solution | AI — paired middle
                04 Outcome — full width landing beat
                Mobile: same order, single column
              */}
              <div className="flex flex-col gap-8 md:gap-10">
                {panels.problem ? (
                  <div className="max-w-3xl">
                    <StoryBeat
                      index={1}
                      label={panels.problem.label}
                      body={panels.problem.body}
                    />
                  </div>
                ) : null}

                {(panels.solution || panels.ai) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 md:items-start">
                    {panels.solution ? (
                      <StoryBeat
                        index={2}
                        label={panels.solution.label}
                        body={panels.solution.body}
                      />
                    ) : null}
                    {panels.ai ? (
                      <StoryBeat
                        index={3}
                        label={panels.ai.label}
                        body={panels.ai.body}
                      />
                    ) : null}
                  </div>
                )}

                {panels.outcome ? (
                  <div className="rounded-2xl border border-teal-700/15 dark:border-teal-300/15 bg-teal-700/[0.04] dark:bg-teal-300/[0.05] px-5 py-6 sm:px-7 sm:py-7 md:px-8 md:py-8">
                    <StoryBeat
                      index={4}
                      label={panels.outcome.label}
                      body={panels.outcome.body}
                      emphasize
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        <section className="px-5 sm:px-6">
          <div className="container max-w-[1120px] min-[1920px]:!max-w-[1680px]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-teal-700/20 dark:border-teal-300/20 bg-teal-700/[0.06] dark:bg-teal-300/[0.06] px-6 py-6 md:px-8">
              <p className="text-primary-color-light dark:text-white font-medium">
                Want something like this for your team?
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#contact"
                  className={`inline-flex items-center justify-center rounded-full ${btnMetallicClass} px-5 py-2.5 text-sm font-semibold`}
                >
                  Start a conversation
                </Link>
                <Link
                  href="/#work"
                  className="inline-flex items-center justify-center rounded-full border border-[#d1d5db] dark:border-white/15 text-primary-color-light dark:text-white px-5 py-2.5 text-sm font-medium"
                >
                  All work
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageWrapper>
  );
}
