"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { ARC_HUBS, DEMO_SIZE, EARTH_BUMP, EARTH_DAY, buildArcs } from "./shared";

function configureGlobe(globe) {
  if (!globe) return;
  globe.pointOfView({ lat: 18, lng: 40, altitude: 2.6 }, 0);
  const controls = globe.controls();
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.55;
}

export default function ReactGlobeDaySample() {
  const wrapRef = useRef(null);
  const globeRef = useRef(null);
  const [size, setSize] = useState(DEMO_SIZE);
  const arcsData = useMemo(() => buildArcs(), []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      setSize(Math.max(240, Math.floor(Math.min(width, height, DEMO_SIZE))));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onGlobeReady = useCallback(() => {
    configureGlobe(globeRef.current);
  }, []);

  useEffect(() => {
    configureGlobe(globeRef.current);
  }, [size]);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto flex aspect-square w-full max-w-[380px] items-center justify-center"
    >
      {size > 0 ? (
        <Globe
          ref={globeRef}
          width={size}
          height={size}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl={EARTH_DAY}
          bumpImageUrl={EARTH_BUMP}
          showAtmosphere
          atmosphereColor="#5eead4"
          atmosphereAltitude={0.12}
          arcsData={arcsData}
          arcColor={() => ["rgba(94,234,212,0.12)", "rgba(94,234,212,0.55)"]}
          arcDashLength={0.4}
          arcDashGap={0.6}
          arcDashAnimateTime={2800}
          arcAltitude={0.14}
          arcStroke={0.55}
          pointsData={ARC_HUBS}
          pointLat="lat"
          pointLng="lng"
          pointAltitude={0.01}
          pointRadius={0.3}
          pointColor={() => "#5eead4"}
          animateIn={false}
          waitForGlobeReady
          onGlobeReady={onGlobeReady}
          rendererConfig={{ antialias: true, alpha: true }}
        />
      ) : null}
    </div>
  );
}
