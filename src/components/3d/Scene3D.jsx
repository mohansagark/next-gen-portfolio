'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Lights, Environment } from '@react-three/drei';
import { useTheme } from '@/context_api/ThemeContext';

export function Scene3D({ children, className = '' }) {
  const { isDark } = useTheme();

  return (
    <Canvas
      className={className}
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 5, 15], fov: 45 }}
    >
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[0, 5, 15]} fov={45} />
        <Lights isDark={isDark} />
        <Environment preset="city" />
        {children}
      </Suspense>
    </Canvas>
  );
}

function Lights({ isDark }) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.4 : 0.6} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={isDark ? 0.8 : 1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight
        position={[-10, 5, -10]}
        intensity={isDark ? 0.3 : 0.5}
        color={isDark ? '#3b82f6' : '#2563eb'}
      />
      <pointLight
        position={[10, 5, 10]}
        intensity={isDark ? 0.3 : 0.5}
        color={isDark ? '#8b5cf6' : '#7c3aed'}
      />
    </>
  );
}
