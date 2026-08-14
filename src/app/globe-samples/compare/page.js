import Link from "next/link";
import GlobeCompareView from "@/components/globe-samples/GlobeCompareView";

export const metadata = {
  title: "Globe comparison",
  description:
    "Compare current light/dark hero globes with Magic UI full-light and cobe candidates.",
  robots: { index: false, follow: false },
};

export default function GlobeComparePage() {
  return (
    <main className="min-h-screen bg-[var(--black-color)] text-[var(--body-color)]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(94,234,212,0.06),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.05),transparent_40%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <header className="mb-10 max-w-2xl space-y-3 md:mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--primary-color)]">
            Hero decision
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--white-color)] sm:text-4xl">
            Current vs shortlisted globes
          </h1>
          <p className="text-base leading-relaxed text-[var(--gray-color)]">
            Side-by-side: what&apos;s on the home hero today (light + dark) versus
            Magic UI light·full and cobe. Home is unchanged until you pick a
            winner.
          </p>
          <p className="text-sm text-[var(--gray-color)]">
            <Link
              href="/globe-samples/"
              className="text-teal-300/90 underline-offset-4 hover:underline"
            >
              ← All variants
            </Link>
          </p>
        </header>
        <GlobeCompareView />
      </div>
    </main>
  );
}
