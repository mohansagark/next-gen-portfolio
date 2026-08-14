"use client";

import { Globe } from "@/components/ui/globe";

/** Isolated Magic UI Globe page for clean WebGL verification. */
export default function MagicUIGlobePageClient() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--black-color)] px-4 py-16 text-[var(--body-color)]">
      <div className="w-full max-w-lg space-y-6">
        <header className="space-y-2 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--primary-color)]">
            Magic UI
          </p>
          <h1 className="text-2xl font-semibold text-[var(--white-color)]">
            Globe component demo
          </h1>
          <p className="text-sm text-[var(--gray-color)]">
            Drag to spin. Isolated from other WebGL samples.
          </p>
        </header>
        <div className="bg-background relative mx-auto flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(ellipse_at_center,rgba(18,28,36,0.95),#0b0d10_70%)]">
          <span className="pointer-events-none z-10 bg-gradient-to-b from-white to-white/15 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent md:text-7xl">
            Globe
          </span>
          <Globe className="top-[4.5rem] bottom-[-15%]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),transparent)]" />
        </div>
        <p className="text-center text-sm text-[var(--gray-color)]">
          <a
            href="/globe-samples/#magicui"
            className="text-[var(--primary-color)] underline-offset-2 hover:underline"
          >
            ← Back to all samples
          </a>
        </p>
      </div>
    </main>
  );
}
