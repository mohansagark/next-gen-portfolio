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
const EARTH_DAY_MOBILE = "/images/hero/earth-mobile-day.jpg";
const EARTH_NIGHT_MOBILE = "/images/hero/earth-mobile-night.jpg";
const EARTH_BUMP = "/images/hero/earth-topology.png";

const VIEW_ALTITUDE = 2.48;
const VIEW_ALTITUDE_COMPACT = 2.55;

/** City hubs for teal network arcs */
const ARC_HUBS = [
  { lat: 17.385, lng: 78.4867 },
  { lat: 28.6139, lng: 77.209 },
  { lat: 1.3521, lng: 103.8198 },
  { lat: 35.6762, lng: 139.6503 },
  { lat: -33.8688, lng: 151.2093 },
  { lat: 37.7749, lng: -122.4194 },
  { lat: 40.7128, lng: -74.006 },
  { lat: 43.6532, lng: -79.3832 },
  { lat: 51.5074, lng: -0.1278 },
  { lat: 52.52, lng: 13.405 },
  { lat: 25.2048, lng: 55.2708 },
  { lat: -26.2041, lng: 28.0473 },
  { lat: -23.5505, lng: -46.6333 },
  { lat: 19.4326, lng: -99.1332 },
];

/** Fewer hubs on mobile — same aesthetic, less GPU work */
const ARC_HUBS_COMPACT = [
  ARC_HUBS[0], // Hyderabad
  ARC_HUBS[2], // Singapore
  ARC_HUBS[3], // Tokyo
  ARC_HUBS[5], // SF
  ARC_HUBS[6], // NYC
  ARC_HUBS[8], // London
  ARC_HUBS[10], // Dubai
  ARC_HUBS[12], // São Paulo
];

const THEME_LOOK = {
  light: {
    atmosphereColor: "#0f766e",
    atmosphereAltitude: 0.13,
    arcColor: ["rgba(15,118,110,0.12)", "rgba(13,148,136,0.55)"],
    pointColor: "#0f766e",
  },
  dark: {
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

function buildArcs(hubs, offsets) {
  const arcs = [];
  const n = hubs.length;
  for (let i = 0; i < n; i += 1) {
    const start = hubs[i];
    offsets.forEach((offset) => {
      const end = hubs[(i + offset) % n];
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

function configureGlobe(globe, { reducedMotion, compact }) {
  if (!globe) return;

  globe.pointOfView(
    { lat: 16, lng: 48, altitude: compact ? VIEW_ALTITUDE_COMPACT : VIEW_ALTITUDE },
    0,
  );

  const controls = globe.controls();
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.minDistance = 1;
  controls.maxDistance = 2000;
  controls.autoRotate = !reducedMotion;
  controls.autoRotateSpeed = compact ? 0.32 : 0.42;
}

/**
 * @param {{ reducedMotion?: boolean, compact?: boolean }} props
 * compact = mobile: same photo-Earth + arcs, smaller textures, fewer arcs, low-power GPU.
 */
export default function HeroGlobeCanvas({
  reducedMotion = false,
  compact = false,
}) {
  const wrapRef = useRef(null);
  const globeRef = useRef(null);
  const [size, setSize] = useState(0);
  const [visible, setVisible] = useState(true);
  const theme = useTheme();
  const look = THEME_LOOK[theme];
  const hubs = compact ? ARC_HUBS_COMPACT : ARC_HUBS;
  const arcsData = useMemo(
    () => buildArcs(hubs, compact ? [3] : [3, 7]),
    [hubs, compact],
  );

  const globeImageUrl =
    theme === "dark"
      ? compact
        ? EARTH_NIGHT_MOBILE
        : EARTH_NIGHT
      : compact
        ? EARTH_DAY_MOBILE
        : EARTH_DAY;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      let next = Math.max(0, Math.floor(Math.min(width, height)));
      if (compact) next = Math.min(next, 420);
      setSize(next);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    // Pause work when off-screen (big mobile win while scrolling).
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "80px" },
    );
    io.observe(el);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [compact]);

  const onGlobeReady = useCallback(() => {
    configureGlobe(globeRef.current, { reducedMotion, compact });
  }, [reducedMotion, compact]);

  useEffect(() => {
    configureGlobe(globeRef.current, { reducedMotion, compact });
    const controls = globeRef.current?.controls?.();
    if (controls) controls.autoRotate = !reducedMotion && visible;
  }, [reducedMotion, size, theme, compact, visible]);

  return (
    <div
      ref={wrapRef}
      className={
        compact
          ? "home-hero-globe relative mx-auto flex h-full w-full max-w-[min(100%,420px)] sm:max-w-[480px] aspect-square items-center justify-center overflow-visible"
          : "home-hero-globe relative mx-auto flex h-full w-full max-w-[520px] sm:max-w-[560px] lg:max-w-[720px] min-[1920px]:max-w-[900px] aspect-square items-center justify-center overflow-visible"
      }
    >
      <div
        className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(94,234,212,0.28),transparent_60%)] blur-2xl dark:bg-[radial-gradient(circle_at_35%_30%,rgba(94,234,212,0.2),transparent_60%)]"
        aria-hidden
      />
      {size > 0 ? (
        <Globe
          key={`${theme}-${compact ? "m" : "d"}`}
          ref={globeRef}
          width={size}
          height={size}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl={globeImageUrl}
          bumpImageUrl={compact ? undefined : EARTH_BUMP}
          showAtmosphere
          atmosphereColor={look.atmosphereColor}
          atmosphereAltitude={look.atmosphereAltitude}
          arcsData={arcsData}
          arcColor={() => look.arcColor}
          arcDashLength={0.35}
          arcDashGap={0.65}
          arcDashAnimateTime={reducedMotion || !visible ? 0 : compact ? 4000 : 3200}
          arcAltitudeAutoScale={0.4}
          arcAltitude={0.16}
          arcStroke={compact ? 0.4 : 0.45}
          pointsData={hubs}
          pointLat="lat"
          pointLng="lng"
          pointAltitude={0.01}
          pointRadius={compact ? 0.28 : 0.22}
          pointColor={() => look.pointColor}
          animateIn={false}
          waitForGlobeReady
          onGlobeReady={onGlobeReady}
          rendererConfig={{
            antialias: !compact,
            alpha: true,
            powerPreference: compact ? "low-power" : "high-performance",
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
