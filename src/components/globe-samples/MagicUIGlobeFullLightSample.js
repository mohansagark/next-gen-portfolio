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
 * Magic UI Globe — full uncropped sphere with light (`dark: 0`) map.
 */
export default function MagicUIGlobeFullLightSample() {
  const config = useMemo(
    () => ({
      width: 800,
      height: 800,
      onRender: () => {},
      devicePixelRatio: 2,
      phi: 0,
      theta: 0.25,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [0.37, 0.92, 0.83],
      glowColor: [1, 1, 1],
      markers: MARKERS,
    }),
    []
  );

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[380px]">
      <Globe className="!inset-0 mx-auto max-w-none" config={config} />
    </div>
  );
}
