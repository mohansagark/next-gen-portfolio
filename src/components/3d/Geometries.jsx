'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/context_api/ThemeContext';

export function RotatingCube() {
  const meshRef = useRef();
  const { isDark } = useTheme();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshPhongMaterial
        color={isDark ? '#3b82f6' : '#2563eb'}
        shininess={100}
        emissive={isDark ? '#1e40af' : '#1e3a8a'}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

export function FloatingOrb() {
  const meshRef = useRef();
  const { isDark } = useTheme();
  const time = useRef(0);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      time.current = clock.getElapsedTime();
      meshRef.current.position.y = Math.sin(time.current * 0.5) * 0.5;
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={meshRef} castShadow>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshPhongMaterial
        color={isDark ? '#8b5cf6' : '#7c3aed'}
        shininess={100}
        wireframe={false}
        emissive={isDark ? '#6d28d9' : '#5b21b6'}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

export function GridPlane() {
  const meshRef = useRef();
  const { isDark } = useTheme();

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20, 40, 40]} />
      <meshPhongMaterial
        color={isDark ? '#1f2937' : '#f3f4f6'}
        emissive={isDark ? '#111827' : '#e5e7eb'}
        emissiveIntensity={0.1}
        wireframe={true}
        wireframeLinewidth={1}
      />
    </mesh>
  );
}

export function AnimatedBox() {
  const meshRef = useRef();
  const { isDark } = useTheme();
  const time = useRef(0);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      time.current = clock.getElapsedTime();
      meshRef.current.position.y = Math.sin(time.current * 0.6) * 0.8;
      meshRef.current.rotation.z += 0.01;
      meshRef.current.scale.x = 1 + Math.sin(time.current) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshPhongMaterial
        color={isDark ? '#10b981' : '#059669'}
        emissive={isDark ? '#047857' : '#065f46'}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

export function ParticleSystem() {
  const pointsRef = useRef();
  const { isDark } = useTheme();

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += 0.0001;
      pointsRef.current.rotation.y += 0.0002;
    }
  });

  const particles = new Float32Array(1500);
  for (let i = 0; i < particles.length; i += 3) {
    particles[i] = (Math.random() - 0.5) * 20;
    particles[i + 1] = (Math.random() - 0.5) * 20;
    particles[i + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={isDark ? '#60a5fa' : '#3b82f6'}
        transparent
        sizeAttenuation
      />
    </points>
  );
}
