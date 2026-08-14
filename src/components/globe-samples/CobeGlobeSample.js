"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { DEMO_SIZE } from "./shared";

/**
 * Lightweight cobe globe (cobe@0.6 — same major as Magic UI).
 * Config width/height are drawing-buffer pixels (CSS size × devicePixelRatio).
 */
export default function CobeGlobeSample() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let phi = 0;
    const dpr = 2;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: DEMO_SIZE * dpr,
      height: DEMO_SIZE * dpr,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      scale: 1.05,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [0.37, 0.92, 0.83],
      glowColor: [0.6, 0.85, 1],
      markers: [
        { location: [17.385, 78.4867], size: 0.08 },
        { location: [37.7749, -122.4194], size: 0.05 },
        { location: [51.5074, -0.1278], size: 0.05 },
        { location: [1.3521, 103.8198], size: 0.04 },
        { location: [40.7128, -74.006], size: 0.06 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[380px] items-center justify-center">
      <canvas
        ref={canvasRef}
        style={{ width: DEMO_SIZE, height: DEMO_SIZE, maxWidth: "100%" }}
        aria-label="Cobe lightweight globe"
      />
    </div>
  );
}
