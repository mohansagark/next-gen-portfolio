"use client";

import dynamic from "next/dynamic";

const loadingFallback = (
  <div className="mx-auto flex aspect-square w-full max-w-[360px] items-center justify-center rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.1),transparent_65%)]">
    <span className="text-sm text-[var(--gray-color)]">Loading…</span>
  </div>
);

const ReactGlobeDaySample = dynamic(
  () => import("@/components/globe-samples/ReactGlobeDaySample"),
  { ssr: false, loading: () => loadingFallback }
);

const ReactGlobeNightSample = dynamic(
  () => import("@/components/globe-samples/ReactGlobeNightSample"),
  { ssr: false, loading: () => loadingFallback }
);

const MagicUIGlobeFullLightSample = dynamic(
  () => import("@/components/globe-samples/MagicUIGlobeFullLightSample"),
  { ssr: false, loading: () => loadingFallback }
);

const CobeGlobeSample = dynamic(
  () => import("@/components/globe-samples/CobeGlobeSample"),
  { ssr: false, loading: () => loadingFallback }
);

const CURRENT = [
  {
    id: "current-light",
    label: "Current hero · light",
    note: "react-globe.gl day marble + teal arcs (live on home in light theme)",
    Component: ReactGlobeDaySample,
  },
  {
    id: "current-dark",
    label: "Current hero · dark",
    note: "react-globe.gl night earth + indigo arcs (live on home in dark theme)",
    Component: ReactGlobeNightSample,
  },
];

const CANDIDATES = [
  {
    id: "candidate-magicui-full-light",
    label: "Candidate · Magic UI light · full",
    note: "cobe via Magic UI — full uncropped sphere, light map, drag-to-spin",
    Component: MagicUIGlobeFullLightSample,
  },
  {
    id: "candidate-cobe",
    label: "Candidate · cobe",
    note: "Lightweight dotted globe with teal markers — strong marketing look",
    Component: CobeGlobeSample,
  },
];

function Panel({ id, label, note, Component }) {
  return (
    <section
      id={id}
      className="rounded-2xl border border-white/10 bg-[var(--secondary-color)]/80 p-5 md:p-6"
    >
      <header className="mb-4 space-y-1">
        <h3 className="text-base font-semibold tracking-tight text-[var(--white-color)] md:text-lg">
          {label}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--gray-color)]">{note}</p>
      </header>
      <div className="flex min-h-[340px] items-center justify-center overflow-hidden rounded-xl bg-[radial-gradient(ellipse_at_center,rgba(18,28,36,0.9),#0b0d10_70%)]">
        <Component />
      </div>
    </section>
  );
}

export default function GlobeCompareView() {
  return (
    <div className="space-y-10 md:space-y-12">
      <section className="space-y-4">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-teal-300/90">
            Now on the home hero
          </p>
          <h2 className="text-xl font-semibold text-[var(--white-color)] md:text-2xl">
            Current light & dark globes
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {CURRENT.map((item) => (
            <Panel key={item.id} {...item} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-teal-300/90">
            Looking better
          </p>
          <h2 className="text-xl font-semibold text-[var(--white-color)] md:text-2xl">
            Shortlisted candidates
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {CANDIDATES.map((item) => (
            <Panel key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}
