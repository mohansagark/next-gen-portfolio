import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import { fetchAllContent } from "@/libs/portfolioData";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { btnMetallicClass } from "@/components/shared/buttons/ButtonPrimary";

async function loadCapabilities() {
  const content = await fetchAllContent();
  return content.capabilities?.items || [];
}

function findCapability(items, slug) {
  return items?.find((item) => item.slug === slug || item.id === slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = findCapability(await loadCapabilities(), slug);
  if (!item) notFound();
  const page = item.page || {};
  const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://devmohan.in";
  return {
    title: `${item.title} — Mohan Sagar`,
    description: page.intro || item.body,
    alternates: { canonical: `${SITE}/capabilities/${slug}` },
  };
}

export async function generateStaticParams() {
  const items = await loadCapabilities();
  return (items || [])
    .filter((i) => i.slug || i.id)
    .map((i) => ({ slug: i.slug || i.id }));
}

function CtaRow({ primaryHref, primaryLabel }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      {primaryHref && primaryLabel ? (
        <Link
          href={primaryHref}
          className={`inline-flex items-center justify-center rounded-full ${btnMetallicClass} px-6 py-3.5 text-sm font-semibold`}
        >
          {primaryLabel}
        </Link>
      ) : null}
      <Link
        href="/#capabilities"
        className="inline-flex items-center justify-center rounded-full border border-[#d1d5db] dark:border-white/15 text-primary-color-light dark:text-white px-6 py-3.5 text-sm font-medium hover:border-teal-600/50 dark:hover:border-teal-300/50 transition-colors"
      >
        All services
      </Link>
    </div>
  );
}

export default async function CapabilityPage({ params }) {
  const { slug } = await params;
  const item = findCapability(await loadCapabilities(), slug);
  if (!item?.page) notFound();

  const page = item.page;
  const coverLight = item.imageLight || item.image;
  const coverDark = item.image || item.imageLight;
  const offerings = page.offerings || [];
  const benefits = page.benefits || [];

  return (
    <PageWrapper isInnerPage={true}>
      <main id="main" className="pt-4 md:pt-32 pb-16 md:pb-24">
        {/* Service hero */}
        <section className="px-5 sm:px-6 mb-12 md:mb-16">
          <div className="container max-w-[1120px] min-[1920px]:!max-w-[1680px]">
            <Link
              href="/#capabilities"
              className="text-sm text-gray-color2 dark:text-[#9aa3af] hover:text-teal-700 dark:hover:text-teal-200 mb-6 max-lg:mb-4 inline-block"
            >
              ← What I build
            </Link>

            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 xl:gap-16 items-center">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300/90 mb-3 font-medium">
                  Service · {item.title}
                </p>
                <h1 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] text-primary-color-light dark:text-white leading-[1.12] mb-4">
                  {page.headline || item.title}
                </h1>
                {page.intro ? (
                  <p className="text-gray-color2 dark:text-[#9aa3af] text-base md:text-lg leading-relaxed mb-7 max-w-xl">
                    {page.intro}
                  </p>
                ) : null}
                <CtaRow primaryHref={page.ctaHref} primaryLabel={page.ctaLabel} />
              </div>

              {coverDark || coverLight ? (
                <div className="relative rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 aspect-[4/3] lg:aspect-[5/4] bg-cream-light-color dark:bg-[#12151a] shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)] dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.8)]">
                  {coverLight ? (
                    <Image
                      src={coverLight}
                      alt=""
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover dark:hidden"
                    />
                  ) : null}
                  {coverDark ? (
                    <Image
                      src={coverDark}
                      alt=""
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className={
                        coverLight
                          ? "object-cover hidden dark:block"
                          : "object-cover"
                      }
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* Scope / deliverables */}
        {offerings.length ? (
          <section className="px-5 sm:px-6 mb-12 md:mb-16">
            <div className="container max-w-[1120px] min-[1920px]:!max-w-[1680px]">
              <div className="mb-7 md:mb-8 text-center">
                <p className="text-[0.7rem] uppercase tracking-[0.14em] text-teal-700 dark:text-teal-300/80 mb-2 font-medium">
                  Engagement scope
                </p>
                <h2 className="font-display text-2xl md:text-3xl text-primary-color-light dark:text-white">
                  {page.offeringsTitle || "What I deliver"}
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                {offerings.map((entry, index) => (
                  <div
                    key={entry.title}
                    className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#0f1217] p-5 md:p-6 transition-colors hover:border-teal-700/25 dark:hover:border-teal-300/25"
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="shrink-0 mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal-700/10 dark:bg-teal-300/10 text-teal-800 dark:text-teal-200 text-xs font-semibold tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-primary-color-light dark:text-white font-semibold text-base md:text-lg mb-1.5 leading-snug">
                          {entry.title}
                        </h3>
                        <p className="text-sm text-gray-color2 dark:text-[#9aa3af] leading-relaxed">
                          {entry.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Outcomes */}
        {benefits.length ? (
          <section className="px-5 sm:px-6 mb-12 md:mb-16">
            <div className="container max-w-[1120px] min-[1920px]:!max-w-[1680px]">
              <div className="rounded-[1.75rem] border border-black/5 dark:border-white/10 bg-cream-light-color/90 dark:bg-white/[0.03] px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">
                <div className="mb-7 md:mb-9 text-center max-w-2xl mx-auto">
                  <p className="text-[0.7rem] uppercase tracking-[0.14em] text-teal-700 dark:text-teal-300/80 mb-2 font-medium">
                    Client outcomes
                  </p>
                  <h2 className="font-display text-2xl md:text-3xl text-primary-color-light dark:text-white">
                    {page.benefitsTitle || "How it helps your business"}
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 md:gap-y-8">
                  {benefits.map((entry) => (
                    <div key={entry.title} className="relative pl-4 border-l-2 border-teal-700/40 dark:border-teal-300/35">
                      <h3 className="text-primary-color-light dark:text-white font-semibold text-base mb-1">
                        {entry.title}
                      </h3>
                      <p className="text-sm text-gray-color2 dark:text-[#9aa3af] leading-relaxed">
                        {entry.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* Closing CTA band */}
        <section className="px-5 sm:px-6">
          <div className="container max-w-[1120px] min-[1920px]:!max-w-[1680px]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-2xl border border-teal-700/20 dark:border-teal-300/20 bg-teal-700/[0.06] dark:bg-teal-300/[0.06] px-6 py-7 md:px-8 md:py-8">
              <div>
                <h2 className="font-display text-xl md:text-2xl text-primary-color-light dark:text-white mb-1.5">
                  Let’s improve the outcome for your users
                </h2>
                <p className="text-sm md:text-base text-gray-color2 dark:text-[#9aa3af] max-w-md">
                  Share the product, audience, and timeline — I’ll propose a clear path forward.
                </p>
              </div>
              <CtaRow primaryHref={page.ctaHref} primaryLabel={page.ctaLabel || "Start a conversation"} />
            </div>
          </div>
        </section>
      </main>
    </PageWrapper>
  );
}
