"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { EARTH_DAY } from "./shared";

function EarthSphere() {
  const meshRef = useRef(null);
  const map = useTexture(EARTH_DAY);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0.2, -0.6, 0]}>
      <sphereGeometry args={[1.55, 64, 64]} />
      <meshStandardMaterial map={map} roughness={0.7} metalness={0.08} />
    </mesh>
  );
}

export default function R3FEarthSample() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[380px]">
      <Canvas
        camera={{ position: [0, 0.15, 4.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
        }}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[5, 3, 4]} intensity={1.8} color="#fff8f0" />
        <directionalLight position={[-4, -1, -2]} intensity={0.45} color="#5eead4" />
        <Suspense fallback={null}>
          <EarthSphere />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.4}
        />
      </Canvas>
    </div>
  );
}
