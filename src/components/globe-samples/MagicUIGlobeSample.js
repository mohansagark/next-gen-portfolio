"use client";

import { useMemo } from "react";
import { Globe } from "@/components/ui/globe";

/**
 * Magic UI Globe demo panel — drag to spin; auto-rotates when idle.
 * https://magicui.design/docs/components/globe
 */
export default function MagicUIGlobeSample() {
  const config = useMemo(
    () => ({
      width: 800,
      height: 800,
      onRender: () => {},
      devicePixelRatio: 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [0.37, 0.92, 0.83],
      glowColor: [1, 1, 1],
      markers: [
        { location: [14.5995, 120.9842], size: 0.03 },
        { location: [19.076, 72.8777], size: 0.1 },
        { location: [23.8103, 90.4125], size: 0.05 },
        { location: [30.0444, 31.2357], size: 0.07 },
        { location: [39.9042, 116.4074], size: 0.08 },
        { location: [-23.5505, -46.6333], size: 0.1 },
        { location: [19.4326, -99.1332], size: 0.1 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [34.6937, 135.5022], size: 0.05 },
        { location: [41.0082, 28.9784], size: 0.06 },
      ],
    }),
    []
  );

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[380px] overflow-hidden">
      <span className="pointer-events-none absolute inset-x-0 top-[10%] z-10 bg-gradient-to-b from-white to-white/15 bg-clip-text text-center text-5xl font-semibold leading-none text-transparent sm:text-6xl">
        Globe
      </span>
      {/* top-[4.5rem] mirrors Magic UI demo's top-28 without fighting inset */}
      <Globe className="top-[4.5rem] bottom-[-10%]" config={config} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),transparent)]" />
    </div>
  );
}
