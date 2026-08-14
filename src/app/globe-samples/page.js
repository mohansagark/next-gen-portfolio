import GlobeSamplesGrid from "@/components/globe-samples/GlobeSamplesGrid";

export const metadata = {
  title: "Globe samples",
  description: "Compare globe implementations for the portfolio hero.",
  robots: { index: false, follow: false },
};

export default function GlobeSamplesPage() {
  return (
    <main className="min-h-screen bg-[var(--black-color)] text-[var(--body-color)]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(94,234,212,0.06),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.05),transparent_40%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <header className="mb-10 max-w-2xl space-y-3 md:mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--primary-color)]">
            Hero selection
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--white-color)] sm:text-4xl">
            Pick a globe style for the hero
          </h1>
          <p className="text-base leading-relaxed text-[var(--gray-color)]">
            Live side-by-side demos. The home hero is unchanged — choose a look
            here, then we can wire the winner into the page.{" "}
            <a
              href="/globe-samples/compare/"
              className="text-teal-300/90 underline-offset-4 hover:underline"
            >
              Focused compare (current vs Magic UI / cobe) →
            </a>
          </p>
        </header>
        <GlobeSamplesGrid />
      </div>
    </main>
  );
}
