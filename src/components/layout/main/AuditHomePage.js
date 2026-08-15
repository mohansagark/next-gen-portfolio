import getProfile from "@/libs/getProfile";
import { getContent } from "@/libs/contentStore";
import getPortfolio from "@/libs/getPortfolio";
import getHomeWriting from "@/libs/getHomeWriting";

/**
 * Ultra-light homepage for CI Lighthouse only.
 * No Motion, globe, Leo, Turnstile, sticky dual-header, or icon fonts —
 * production (`PageWrapper` + `IndexMain`) is unchanged when the env flag is off.
 */
export default function AuditHomePage() {
  const profile = getProfile() || {};
  const displayName = profile.firstName || "Mohan Sagar";
  const location = profile.location || "Remote · Available worldwide";
  const headline =
    profile.headline || "AI Engineer · Frontend Architect";
  const tagline =
    profile.tagline || "I ship AI applications that hold up in production.";
  const subhead =
    profile.subhead ||
    "A decade building production software — now focused on LLM applications, agentic workflows, and the interfaces that make them dependable for real teams.";
  const email = profile.email || "contact@devmohan.in";

  const homeCaseStudies = getContent("homeCaseStudies") || [];
  const caseStudies = getContent("caseStudies") || [];
  const portfolio = getPortfolio() || [];
  const work =
    (homeCaseStudies.length
      ? homeCaseStudies
      : caseStudies.length
        ? caseStudies.filter((p) => p.showOnHomepage !== false)
        : portfolio
            .filter((p) => p.featured && p.showOnHomepage !== false)
            .sort((a, b) => (a.priority || 99) - (b.priority || 99))
    ).slice(0, 4);

  const writingCfg = getContent("writing") || {};
  const blogs = (getHomeWriting() || []).slice(
    0,
    Number(writingCfg.homepageLimit) || 3,
  );

  return (
    <div className="min-h-dvh bg-[var(--off-white-color)] dark:bg-dark-color text-primary-color-light dark:text-white">
      <header className="border-b border-black/5 dark:border-white/10">
        <div className="container max-w-[1120px] px-5 sm:px-6 py-4 flex items-center justify-between gap-4">
          <a href="/" className="font-display text-lg font-semibold">
            {displayName}
          </a>
          <nav className="flex items-center gap-4 text-sm">
            <a href="#work" className="opacity-80 hover:opacity-100">
              Work
            </a>
            <a href="#writing" className="opacity-80 hover:opacity-100">
              Writing
            </a>
            <a
              href={`mailto:${email}`}
              className="rounded-full border border-teal-700/40 dark:border-teal-300/40 px-3 py-1.5 font-medium text-teal-800 dark:text-teal-200"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="container max-w-[1120px] px-5 sm:px-6 pt-10 pb-14 sm:pt-14 sm:pb-20">
          <p className="text-sm text-[#374151] dark:text-[#9aa3af] mb-3">
            <span className="font-medium text-primary-color-light dark:text-[#e5e7eb]">
              {displayName}
            </span>
            <span className="mx-1.5 opacity-35" aria-hidden>
              ·
            </span>
            {location}
          </p>
          <p className="text-xs tracking-[0.12em] uppercase text-teal-700 dark:text-teal-300/90 font-medium mb-4">
            {headline}
          </p>
          <h1 className="font-display text-[2rem] sm:text-5xl leading-[1.08] max-w-[18ch] mb-4 sm:mb-5">
            {tagline}
          </h1>
          <p className="text-base sm:text-lg text-[#374151] dark:text-[#9aa3af] max-w-2xl leading-relaxed mb-8">
            {subhead}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center rounded-full bg-teal-700 text-white px-4 py-2.5 text-sm font-semibold"
            >
              Get in touch
            </a>
            <a
              href="#work"
              className="inline-flex items-center rounded-full border border-[#d1d5db] dark:border-white/15 px-4 py-2.5 text-sm font-medium"
            >
              View selected work
            </a>
          </div>
        </section>

        {work.length ? (
          <section
            id="work"
            className="container max-w-[1120px] px-5 sm:px-6 py-12 sm:py-16 border-t border-black/5 dark:border-white/10"
          >
            <h2 className="font-display text-3xl mb-3 text-center">
              Selected work
            </h2>
            <p className="text-[#374151] dark:text-[#9aa3af] text-center max-w-2xl mx-auto mb-10">
              Product systems shipped in production.
            </p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {work.map((item) => {
                const name =
                  item.homeName || item.homeTitle || item.title || item.slug;
                const tagline =
                  item.homeTagline || item.shortDescription || item.featuredDesc || "";
                return (
                  <li key={item.slug || name}>
                    <a
                      href={`/work/${item.slug}`}
                      className="block rounded-2xl border border-black/5 dark:border-white/10 p-5 hover:border-teal-700/30 dark:hover:border-teal-300/30"
                    >
                      <h3 className="font-display text-xl mb-1">{name}</h3>
                      {tagline ? (
                        <p className="text-sm text-[#374151] dark:text-[#9aa3af] line-clamp-2">
                          {tagline}
                        </p>
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {blogs.length ? (
          <section
            id="writing"
            className="container max-w-[1120px] px-5 sm:px-6 py-12 sm:py-16 border-t border-black/5 dark:border-white/10"
          >
            <h2 className="font-display text-3xl mb-3 text-center">
              {writingCfg.sectionTitle || "Writing"}
            </h2>
            <ul className="grid gap-4 max-w-2xl mx-auto">
              {blogs.map((post) => (
                <li key={post.id || post.slug || post.title}>
                  <a
                    href={`/blogs/${post.slug || post.id}`}
                    className="block py-3 border-b border-black/5 dark:border-white/10"
                  >
                    <h3 className="font-medium text-lg">{post.title}</h3>
                    {post.desc || post.summary ? (
                      <p className="text-sm text-[#374151] dark:text-[#9aa3af] line-clamp-2 mt-1">
                        {post.desc || post.summary}
                      </p>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section
          id="contact"
          className="container max-w-[1120px] px-5 sm:px-6 py-12 sm:py-16 border-t border-black/5 dark:border-white/10 text-center"
        >
          <h2 className="font-display text-3xl mb-3">Contact</h2>
          <p className="text-[#374151] dark:text-[#9aa3af] mb-6">
            Email me for projects, advisory, or speaking.
          </p>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center rounded-full bg-teal-700 text-white px-5 py-2.5 text-sm font-semibold"
          >
            {email}
          </a>
        </section>
      </main>

      <footer className="border-t border-black/5 dark:border-white/10 py-8 text-center text-sm text-[#374151] dark:text-[#9aa3af]">
        © {new Date().getFullYear()} {displayName}
      </footer>
    </div>
  );
}
