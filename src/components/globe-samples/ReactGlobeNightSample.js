"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { ARC_HUBS, DEMO_SIZE, EARTH_NIGHT, buildArcs } from "./shared";

function configureGlobe(globe) {
  if (!globe) return;
  globe.pointOfView({ lat: 18, lng: 40, altitude: 2.6 }, 0);
  const controls = globe.controls();
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.45;
}

export default function ReactGlobeNightSample() {
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
          globeImageUrl={EARTH_NIGHT}
          showAtmosphere
          atmosphereColor="#818cf8"
          atmosphereAltitude={0.15}
          arcsData={arcsData}
          arcColor={() => ["rgba(165,180,252,0.15)", "rgba(196,181,253,0.65)"]}
          arcDashLength={0.35}
          arcDashGap={0.55}
          arcDashAnimateTime={3200}
          arcAltitude={0.16}
          arcStroke={0.5}
          pointsData={ARC_HUBS}
          pointLat="lat"
          pointLng="lng"
          pointAltitude={0.012}
          pointRadius={0.28}
          pointColor={() => "#c4b5fd"}
          animateIn={false}
          waitForGlobeReady
          onGlobeReady={onGlobeReady}
          rendererConfig={{ antialias: true, alpha: true }}
        />
      ) : null}
    </div>
  );
}
