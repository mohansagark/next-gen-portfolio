"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Globe from "react-globe.gl";

const EARTH_DAY = "/images/hero/earth-blue-marble.jpg";
const EARTH_NIGHT = "/images/hero/earth-night.jpg";
const EARTH_BUMP = "/images/hero/earth-topology.png";

/**
 * Camera altitude in globe-radius units above the surface.
 * Lower = larger sphere; keep high enough that atmosphere/arcs stay inside the canvas
 * (parent layout uses overflow-x-hidden, so we cannot safely bleed outside the box).
 */
const VIEW_ALTITUDE = 2.48;

/** City hubs for teal network arcs — visual only (mid density) */
const ARC_HUBS = [
  { lat: 17.385, lng: 78.4867 }, // Hyderabad
  { lat: 28.6139, lng: 77.209 }, // Delhi
  { lat: 1.3521, lng: 103.8198 }, // Singapore
  { lat: 35.6762, lng: 139.6503 }, // Tokyo
  { lat: -33.8688, lng: 151.2093 }, // Sydney
  { lat: 37.7749, lng: -122.4194 }, // San Francisco
  { lat: 40.7128, lng: -74.006 }, // New York
  { lat: 43.6532, lng: -79.3832 }, // Toronto
  { lat: 51.5074, lng: -0.1278 }, // London
  { lat: 52.52, lng: 13.405 }, // Berlin
  { lat: 25.2048, lng: 55.2708 }, // Dubai
  { lat: -26.2041, lng: 28.0473 }, // Johannesburg
  { lat: -23.5505, lng: -46.6333 }, // São Paulo
  { lat: 19.4326, lng: -99.1332 }, // Mexico City
];

const THEME_LOOK = {
  light: {
    globeImageUrl: EARTH_DAY,
    bumpImageUrl: EARTH_BUMP,
    atmosphereColor: "#0f766e",
    atmosphereAltitude: 0.13,
    arcColor: ["rgba(15,118,110,0.12)", "rgba(13,148,136,0.55)"],
    pointColor: "#0f766e",
  },
  dark: {
    globeImageUrl: EARTH_NIGHT,
    bumpImageUrl: null,
    atmosphereColor: "#5eead4",
    atmosphereAltitude: 0.15,
    arcColor: ["rgba(94,234,212,0.15)", "rgba(45,212,191,0.65)"],
    pointColor: "#5eead4",
  },
};

const themeListeners = new Set();
let themeObserver = null;

function subscribeTheme(listener) {
  themeListeners.add(listener);
  if (!themeObserver) {
    themeObserver = new MutationObserver(() => {
      themeListeners.forEach((cb) => cb());
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }
  return () => {
    themeListeners.delete(listener);
    if (themeListeners.size === 0 && themeObserver) {
      themeObserver.disconnect();
      themeObserver = null;
    }
  };
}

function readTheme() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function useTheme() {
  return useSyncExternalStore(subscribeTheme, readTheme, () => "dark");
}

/** ~28 arcs — denser than the original 8, lighter than the ~100+ mesh */
function buildArcs() {
  const arcs = [];
  const n = ARC_HUBS.length;
  const offsets = [3, 7];
  for (let i = 0; i < n; i += 1) {
    const start = ARC_HUBS[i];
    offsets.forEach((offset) => {
      const end = ARC_HUBS[(i + offset) % n];
      arcs.push({
        startLat: start.lat,
        startLng: start.lng,
        endLat: end.lat,
        endLng: end.lng,
      });
    });
  }
  return arcs;
}

function configureGlobe(globe, reducedMotion) {
  if (!globe) return;

  globe.pointOfView({ lat: 16, lng: 48, altitude: VIEW_ALTITUDE }, 0);

  const controls = globe.controls();
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.minDistance = 1;
  controls.maxDistance = 2000;
  controls.autoRotate = !reducedMotion;
  controls.autoRotateSpeed = 0.42;
}

export default function HeroGlobeCanvas({ reducedMotion = false }) {
  const wrapRef = useRef(null);
  const globeRef = useRef(null);
  const [size, setSize] = useState(0);
  const theme = useTheme();
  const look = THEME_LOOK[theme];
  const arcsData = useMemo(() => buildArcs(), []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      setSize(Math.max(0, Math.floor(Math.min(width, height))));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onGlobeReady = useCallback(() => {
    configureGlobe(globeRef.current, reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    configureGlobe(globeRef.current, reducedMotion);
  }, [reducedMotion, size, theme]);

  return (
    <div
      ref={wrapRef}
      className="home-hero-globe relative mx-auto flex h-full w-full max-w-[520px] sm:max-w-[560px] lg:max-w-[720px] min-[1920px]:max-w-[900px] aspect-square items-center justify-center overflow-visible"
    >
      <div
        className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(94,234,212,0.28),transparent_60%)] blur-2xl dark:bg-[radial-gradient(circle_at_35%_30%,rgba(94,234,212,0.2),transparent_60%)]"
        aria-hidden
      />
      {size > 0 ? (
        <Globe
          key={theme}
          ref={globeRef}
          width={size}
          height={size}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl={look.globeImageUrl}
          bumpImageUrl={look.bumpImageUrl || undefined}
          showAtmosphere
          atmosphereColor={look.atmosphereColor}
          atmosphereAltitude={look.atmosphereAltitude}
          arcsData={arcsData}
          arcColor={() => look.arcColor}
          arcDashLength={0.35}
          arcDashGap={0.65}
          arcDashAnimateTime={reducedMotion ? 0 : 3200}
          arcAltitudeAutoScale={0.4}
          arcAltitude={0.16}
          arcStroke={0.45}
          pointsData={ARC_HUBS}
          pointLat="lat"
          pointLng="lng"
          pointAltitude={0.01}
          pointRadius={0.22}
          pointColor={() => look.pointColor}
          animateIn={false}
          waitForGlobeReady
          onGlobeReady={onGlobeReady}
          rendererConfig={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        />
      ) : null}
      <div
        className="pointer-events-none absolute inset-x-[22%] bottom-[3%] h-[9%] rounded-[100%] bg-black/10 blur-xl dark:bg-black/30"
        aria-hidden
      />
    </div>
  );
}
