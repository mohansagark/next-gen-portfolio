"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useMotionValue, useSpring } from "motion/react";

import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG = {
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
  markerColor: [251 / 255, 100 / 255, 21 / 255],
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
};

/**
 * Magic UI Globe — autorotating interactive WebGL globe (cobe + motion).
 * https://magicui.design/docs/components/globe
 * Registry item: @magicui/globe (depends on cobe@^0.6.4)
 */
export function Globe({ className, config = GLOBE_CONFIG }) {
  const canvasRef = useRef(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const onResize = () => {
      widthRef.current = canvas.offsetWidth;
    };

    window.addEventListener("resize", onResize);
    onResize();

    const cssWidth = Math.max(
      widthRef.current || canvas.clientWidth || canvas.parentElement?.clientWidth || 300,
      1
    );
    widthRef.current = cssWidth;

    let globe;
    try {
      globe = createGlobe(canvas, {
        ...config,
        width: cssWidth * 2,
        height: cssWidth * 2,
        onRender: (state) => {
          if (!pointerInteracting.current) phiRef.current += 0.005;
          state.phi = phiRef.current + rs.get();
          const next = Math.max(widthRef.current, 1) * 2;
          state.width = next;
          state.height = next;
        },
      });
    } catch (err) {
      console.error("[Magic UI Globe] createGlobe failed:", err);
      return () => window.removeEventListener("resize", onResize);
    }

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 0);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);

  return (
    <div
      className={cn(
        // Magic UI: max-w-150 (TW4). Portfolio TW3.4 → 37.5rem.
        // Avoid combining inset-0 with top-* (TW source-order conflict).
        "absolute inset-x-0 bottom-0 top-0 mx-auto aspect-square w-full max-w-[37.5rem]",
        className
      )}
    >
      <canvas
        className="size-full opacity-0 transition-opacity duration-500"
        style={{ width: "100%", height: "100%", display: "block" }}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
