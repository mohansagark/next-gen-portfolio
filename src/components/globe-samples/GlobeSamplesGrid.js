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

const CobeGlobeSample = dynamic(() => import("./CobeGlobeSample"), {
  ssr: false,
  loading: () => loadingFallback,
});

const R3FEarthSample = dynamic(() => import("./R3FEarthSample"), {
  ssr: false,
  loading: () => loadingFallback,
});

const ReactGlobeNightSample = dynamic(() => import("./ReactGlobeNightSample"), {
  ssr: false,
  loading: () => loadingFallback,
});

const MagicUIGlobeSample = dynamic(() => import("./MagicUIGlobeSample"), {
  ssr: false,
  loading: () => loadingFallback,
});

const MagicUIGlobeDarkSample = dynamic(
  () => import("./MagicUIGlobeDarkSample"),
  { ssr: false, loading: () => loadingFallback }
);

const MagicUIGlobeFullSample = dynamic(
  () => import("./MagicUIGlobeFullSample"),
  { ssr: false, loading: () => loadingFallback }
);

const MagicUIGlobeFullLightSample = dynamic(
  () => import("./MagicUIGlobeFullLightSample"),
  { ssr: false, loading: () => loadingFallback }
);

const VARIANTS = [
  {
    id: "magicui",
    name: "Magic UI Globe (light · cropped)",
    pros: "Official Magic UI demo look — light map, partial sphere, drag-to-spin.",
    Component: MagicUIGlobeSample,
  },
  {
    id: "magicui-dark",
    name: "Magic UI Globe (dark · cropped)",
    pros: "Same Magic UI crop layout with cobe dark: 1 + teal markers.",
    Component: MagicUIGlobeDarkSample,
  },
  {
    id: "magicui-full",
    name: "Magic UI Globe (dark · full)",
    pros: "Complete centered sphere — better for a hero column than the crop.",
    Component: MagicUIGlobeFullSample,
  },
  {
    id: "magicui-full-light",
    name: "Magic UI Globe (light · full)",
    pros: "Full sphere with the default light/white cobe map.",
    Component: MagicUIGlobeFullLightSample,
  },
  {
    id: "react-globe-day",
    name: "react-globe.gl (day + arcs)",
    pros: "Feature-rich: arcs, atmosphere, bump map — closest to the current hero.",
    Component: ReactGlobeDaySample,
  },
  {
    id: "cobe",
    name: "cobe",
    pros: "Tiny WebGL footprint; clean marketing-style markers; great for performance.",
    Component: CobeGlobeSample,
  },
  {
    id: "r3f-earth",
    name: "R3F / Three.js sphere",
    pros: "Full control via Fiber + Drei; simple textured Earth with auto-rotate.",
    Component: R3FEarthSample,
  },
  {
    id: "react-globe-night",
    name: "react-globe.gl (night)",
    pros: "Same API as day globe; city-lights texture suits dark portfolio themes.",
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
          <div className="flex min-h-[320px] items-center justify-center overflow-hidden rounded-xl bg-[radial-gradient(ellipse_at_center,rgba(18,28,36,0.9),#0b0d10_70%)]">
            <Component />
          </div>
        </section>
      ))}
    </div>
  );
}
