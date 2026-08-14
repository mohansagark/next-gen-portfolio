"use client";

import { useMemo } from "react";
import { Globe } from "@/components/ui/globe";

const MARKERS = [
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
];

/**
 * Magic UI Globe — full uncropped sphere (centered), dark map for the sample page.
 */
export default function MagicUIGlobeFullSample() {
  const config = useMemo(
    () => ({
      width: 800,
      height: 800,
      onRender: () => {},
      devicePixelRatio: 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.15,
      mapSamples: 16000,
      mapBrightness: 3.4,
      baseColor: [0.2, 0.24, 0.3],
      markerColor: [0.37, 0.92, 0.83],
      glowColor: [0.14, 0.18, 0.24],
      markers: MARKERS,
    }),
    []
  );

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[380px]">
      <Globe
        className="!inset-0 mx-auto max-w-none"
        config={config}
      />
    </div>
  );
}
