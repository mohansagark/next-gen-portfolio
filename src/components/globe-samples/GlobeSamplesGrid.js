"use client";

import dynamic from "next/dynamic";

const loadingFallback = (
  <div className="mx-auto flex aspect-square w-full max-w-[380px] items-center justify-center rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.1),transparent_65%)]">
    <span className="text-sm text-[var(--gray-color)]">Loading globe…</span>
  </div>
);

const ReactGlobeDaySample = dynamic(() => import("./ReactGlobeDaySample"), {
  ssr: false,
  loading: () => loadingFallback,
});

const ReactGlobeNightSample = dynamic(() => import("./ReactGlobeNightSample"), {
  ssr: false,
  loading: () => loadingFallback,
});

/** Winning hero library only — losing candidates (cobe / R3F / Magic UI) removed from prod deps. */
const VARIANTS = [
  {
    id: "react-globe-day",
    name: "react-globe.gl (day + arcs)",
    pros: "Feature-rich: arcs, atmosphere, bump map — live on the home hero in light theme.",
    Component: ReactGlobeDaySample,
  },
  {
    id: "react-globe-night",
    name: "react-globe.gl (night)",
    pros: "Same API as day globe; city-lights texture for dark portfolio themes.",
    Component: ReactGlobeNightSample,
  },
];

export default function GlobeSamplesGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
      {VARIANTS.map(({ id, name, pros, Component }) => (
        <section
          key={id}
          id={id}
          className="rounded-2xl border border-white/10 bg-[var(--secondary-color)]/80 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] md:p-6"
        >
          <header className="mb-4 space-y-1.5">
            <h2 className="text-lg font-semibold tracking-tight text-[var(--white-color)] md:text-xl">
              {name}
            </h2>
            <p className="text-sm leading-relaxed text-[var(--gray-color)]">{pros}</p>
          </header>
          <div className="flex min-h-[320px] items-center justify-center overflow-hidden rounded-xl bg-[radial-gradient(ellipse_at_center,rgb(18,28,36,0.9),#0b0d10_70%)]">
            <Component />
          </div>
        </section>
      ))}
    </div>
  );
}
