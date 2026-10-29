"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type CoreProps = { mouse: React.MutableRefObject<THREE.Vector2>; pulse: React.MutableRefObject<number> };

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform float uPulse;
attribute float aAngle;
attribute float aRadius;
attribute float aSeed;
varying float vGlow;
varying float vSeed;
void main() {
  float drift = sin(aAngle * 4.0 + uTime * 0.48 + aSeed * 9.0) * 0.055;
  float ripple = sin(aAngle * 17.0 - uTime * 1.55 + aSeed * 6.0) * 0.027;
  float mousePull = (uMouse.x * cos(aAngle) + uMouse.y * sin(aAngle)) * 0.12;
  float pulse = uPulse * (0.14 + 0.12 * sin(aAngle * 8.0 + uTime * 2.0));
  float radius = aRadius + drift + ripple + mousePull + pulse;
  vec3 p = vec3(cos(aAngle) * radius, sin(aAngle) * radius * 0.78, sin(aAngle * 3.0 + uTime * 0.35 + aSeed * 5.0) * 0.14);
  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = clamp((2.0 + 2.2 * aSeed + uPulse * 2.0) * (8.0 / -mvPosition.z), 1.0, 7.0);
  vGlow = 0.45 + 0.55 * sin(aAngle * 6.0 + uTime * 0.9 + aSeed * 12.0);
  vSeed = aSeed;
}`;

const fragmentShader = `
varying float vGlow;
varying float vSeed;
void main() {
  vec2 p = gl_PointCoord - vec2(0.5);
  float d = length(p);
  float dotCore = smoothstep(0.5, 0.03, d);
  float halo = smoothstep(0.5, 0.12, d) * 0.28;
  vec3 amber = vec3(1.0, 0.55, 0.15);
  vec3 ice = vec3(0.32, 0.74, 0.95);
  vec3 colour = mix(amber, ice, smoothstep(0.62, 1.0, vSeed));
  gl_FragColor = vec4(colour * (0.6 + vGlow * 0.8), (dotCore + halo) * (0.32 + vGlow * 0.65));
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

function ParticleRing({ mouse, pulse }: CoreProps) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const points = useMemo(() => {
    const count = 2600;
    const positions = new Float32Array(count * 3);
    const angles = new Float32Array(count);
    const radii = new Float32Array(count);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.1 + Math.random() * 1.22;
      angles[i] = angle; radii[i] = radius; seeds[i] = Math.random();
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.78;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.18;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aAngle", new THREE.BufferAttribute(angles, 1));
    geometry.setAttribute("aRadius", new THREE.BufferAttribute(radii, 1));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return geometry;
  }, []);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(0, 0) }, uPulse: { value: 0 } }), []);
  useFrame((_, delta) => {
    if (!material.current) return;
    uniforms.uTime.value += Math.min(delta, 0.04);
    uniforms.uMouse.value.lerp(mouse.current, 0.055);
    uniforms.uPulse.value = THREE.MathUtils.damp(uniforms.uPulse.value, pulse.current, 4.5, delta);
    pulse.current = THREE.MathUtils.damp(pulse.current, 0, 2.4, delta);
  });
  useEffect(() => () => points.dispose(), [points]);
  return <points geometry={points}><shaderMaterial ref={material} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending}/></points>;
}

function CoreScene({ mouse, pulse }: CoreProps) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.z += delta * 0.035;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, mouse.current.y * 0.08, 1.4, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, mouse.current.x * 0.12, 1.4, delta);
    group.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.012 + pulse.current * 0.035);
  });
  return <group ref={group}>
    <ParticleRing mouse={mouse} pulse={pulse}/>
    <mesh><torusGeometry args={[1.08, 0.006, 8, 180]}/><meshBasicMaterial color="#ff9b3d" transparent opacity={0.32}/></mesh>
    <mesh rotation={[0, 0, 0.21]}><torusGeometry args={[2.36, 0.003, 6, 180]}/><meshBasicMaterial color="#62bce8" transparent opacity={0.27}/></mesh>
    <mesh rotation={[0, 0, -0.32]}><torusGeometry args={[2.05, 0.0025, 6, 180]}/><meshBasicMaterial color="#f4f0e8" transparent opacity={0.13}/></mesh>
  </group>;
}

export default function AeroCore() {
  const mouse = useRef(new THREE.Vector2(0, 0));
  const pulse = useRef(0);
  useEffect(() => {
    const burst = () => { pulse.current = Math.min(1.8, pulse.current + 1); };
    window.addEventListener("aero:burst", burst);
    return () => window.removeEventListener("aero:burst", burst);
  }, []);
  return <div className="core-canvas" aria-label="Interactive AERO particle core"
    onPointerMove={(event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      mouse.current.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -(((event.clientY - rect.top) / rect.height) * 2 - 1));
    }}
    onPointerDown={() => { pulse.current = Math.min(1.8, pulse.current + 0.9); }}>
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7.3], fov: 43 }} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }} fallback={<div className="core-fallback" aria-hidden="true"><span/></div>}>
      <Suspense fallback={null}><CoreScene mouse={mouse} pulse={pulse}/></Suspense>
    </Canvas>
  </div>;
}