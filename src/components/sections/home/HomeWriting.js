"use client";

import Link from "next/link";
import getBlogs from "@/libs/getBlogs";
import { getContent } from "@/libs/contentStore";
import ScrollReveal from "@/components/sections/home/ScrollReveal";

const FALLBACK_WRITING = {
  sectionTitle: "Writing",
  sectionSubcopy:
    "Notes on AI applications, product engineering, and shipping software.",
  homepageLimit: 3,
  preferredSlugs: [],
};

function resolveCover(post) {
  const cover = post.coverImage || post.img || post.image || "";
  if (cover) {
    if (
      cover.startsWith("http") ||
      cover.startsWith("//") ||
      cover.startsWith("/blog-images/")
    ) {
      return cover;
    }
    const file = cover.split("/").pop();
    if (file) return `/blog-images/${file}`;
  }
  return `/blog-images/${post.id}.jpg`;
}

export default function HomeWriting() {
  const writing = getContent("writing") || FALLBACK_WRITING;
  const preferredSlugs = writing.preferredSlugs || [];
  const limit = Math.max(1, Number(writing.homepageLimit) || 3);

  const blogs = (getBlogs() || []).filter((b) => !b.isBlogQuote);
  const preferred = preferredSlugs
    .map((id) => blogs.find((b) => b.id === id || b.slug === id))
    .filter(Boolean);
  const items = (preferred.length ? preferred : blogs).slice(0, limit);
  const blogBase =
    process.env.NEXT_PUBLIC_BLOG_URL || "https://blog.devmohan.in";

  return (
    <section
      id="writing"
      className="scroll-mt-24 lg:scroll-mt-28 py-16 sm:py-20 md:py-28"
    >
      <div className="container max-w-[1120px] min-[1920px]:!max-w-[1680px] px-5 sm:px-6">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center gap-4 mb-10 md:mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-primary-color-light dark:text-white mb-3">
                {writing.sectionTitle || "Writing"}
              </h2>
              {writing.sectionSubcopy ? (
                <p className="text-gray-color2 dark:text-[#9aa3af] max-w-2xl leading-relaxed mx-auto">
                  {writing.sectionSubcopy}
                </p>
              ) : null}
            </div>
            <a
              href={blogBase}
              className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 dark:text-teal-200 hover:opacity-80 transition-opacity"
              target="_blank"
              rel="noreferrer"
            >
              View All
              <i className="fa-solid fa-arrow-right text-[12px]" aria-hidden />
            </a>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {items.map((post, i) => {
            const cover = resolveCover(post);
            return (
              <ScrollReveal key={post.id} delay={i * 70}>
                <Link
                  href={`${blogBase.replace(/\/$/, "")}/${post.id}`}
                  className="group h-full flex flex-col rounded-[1.5rem] border border-black/5 dark:border-white/10 overflow-hidden bg-white dark:bg-white/[0.025] hover:border-teal-700/25 dark:hover:border-teal-300/25 transition-colors duration-500"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="relative aspect-[16/10] bg-cream-light-color dark:bg-[#0f1217] overflow-hidden">
                    <img
                      src={cover}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      onError={(e) => {
                        e.currentTarget.style.opacity = "0";
                      }}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(15,118,110,0.12),transparent_55%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(94,234,212,0.16),transparent_55%)] pointer-events-none" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs text-gray-color2 dark:text-[#6b7280] mb-2">
                      {post.date || post.dateRaw || ""}
                    </span>
                    <h3 className="text-primary-color-light dark:text-white text-lg font-medium leading-snug group-hover:text-teal-700 dark:group-hover:text-teal-200 transition-colors">
                      {post.title}
                    </h3>
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
