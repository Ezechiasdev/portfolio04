"use client";

import { Float } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// Matière « molle et brillante » : dégradé selon l'orientation, reflet et ondulation lente
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uWobble;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vec3 p = position;
    float w = sin(p.x * 2.1 + uTime * 0.8) * sin(p.y * 2.4 + uTime * 0.6) * sin(p.z * 1.8 + uTime * 0.7);
    p += normal * w * uWobble;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uA;
  uniform vec3 uB;
  uniform vec3 uC;
  uniform float uGlow;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vec3 n = normalize(vNormal);
    vec3 col = mix(uA, uB, smoothstep(-0.6, 0.7, n.y));
    col = mix(col, uC, smoothstep(0.2, 1.0, n.x) * 0.65);
    vec3 L = normalize(vec3(-0.4, 0.8, 0.6));
    float diff = max(dot(n, L), 0.0) * 0.35 + 0.65;
    float fres = pow(1.0 - max(dot(n, vViewDir), 0.0), 2.5);
    float spec = pow(max(dot(n, normalize(L + vViewDir)), 0.0), 60.0);
    col = col * diff + fres * 0.4 * uB + spec * 0.85 + uGlow * fres * uA;
    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function useGlossyMaterial(a: string, b: string, c: string, wobble: number, glow = 0) {
  return useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uWobble: { value: wobble },
          uGlow: { value: glow },
          uA: { value: new THREE.Color(a) },
          uB: { value: new THREE.Color(b) },
          uC: { value: new THREE.Color(c) },
        },
      }),
    [a, b, c, wobble, glow],
  );
}

function WireCube({ position, size }: { position: [number, number, number]; size: number }) {
  const ref = useRef<THREE.LineSegments>(null);
  const geometry = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(size, size, size)),
    [size],
  );
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.15;
    ref.current.rotation.y += delta * 0.2;
  });
  return (
    <lineSegments ref={ref} position={position} geometry={geometry}>
      <lineBasicMaterial color="#5ce1e6" transparent opacity={0.35} />
    </lineSegments>
  );
}

function Shapes() {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const pill = useGlossyMaterial("#7c4dff", "#5ce1e6", "#ff6fd8", 0.04);
  const blob = useGlossyMaterial("#4b2bd1", "#a26bff", "#5ce1e6", 0.12);
  const sun = useGlossyMaterial("#ff8a4c", "#ffc27a", "#ff5e3a", 0.02, 0.6);

  // Les formes restent dans les coins pour ne pas gêner la lecture ;
  // sur un écran étroit, elles sont plus petites et repoussées en haut et en bas
  const narrow = viewport.width < viewport.height;
  const s = narrow ? 0.42 : 0.8;
  const w = viewport.width / 2;
  const h = viewport.height / 2;
  const pos = narrow
    ? { pill: [-w * 0.62, h * 0.9], blob: [w * 0.78, -h * 0.98], sun: [w * 0.7, h * 0.66] }
    : { pill: [-w * 0.68, h * 0.58], blob: [w * 0.74, -h * 0.32], sun: [w * 0.55, h * 0.62] };

  useFrame((state) => {
    if (!group.current) return;
    // Temps des ondulations
    group.current.traverse((obj) => {
      const material = (obj as THREE.Mesh).material;
      if (material instanceof THREE.ShaderMaterial) material.uniforms.uTime.value = state.clock.elapsedTime;
    });
    // Légère réaction à la souris
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.2, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * 0.12, 0.04);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, state.pointer.x * 0.15, 0.04);
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh
          material={pill}
          position={[pos.pill[0], pos.pill[1], -0.5]}
          rotation={[0.3, 0.2, 1.15]}
          scale={s}
        >
          <capsuleGeometry args={[0.55, 1.5, 24, 48]} />
        </mesh>
      </Float>
      <Float speed={0.9} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh material={blob} position={[pos.blob[0], pos.blob[1], -0.8]} rotation={[0.2, -0.4, -0.5]} scale={s}>
          <capsuleGeometry args={[0.85, 1.3, 32, 64]} />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={0.2} floatIntensity={1}>
        <mesh material={sun} position={[pos.sun[0], pos.sun[1], -0.3]} scale={narrow ? 0.7 : 1}>
          <sphereGeometry args={[0.32, 48, 48]} />
        </mesh>
      </Float>
      <WireCube position={[-w * 0.35, -h * 0.55, -1.2]} size={0.45 * s} />
      <WireCube position={[w * 0.2, h * 0.75, -1.6]} size={0.3 * s} />
      <WireCube position={[-w * 0.8, -h * 0.05, -2]} size={0.35 * s} />
    </group>
  );
}

export default function HeroScene({
  active,
  onReady,
}: {
  active: boolean;
  onReady: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={active ? "always" : "never"}
      // La souris est suivie sur toute la page, pas seulement sur le canevas
      eventSource={document.body}
      eventPrefix="client"
      onCreated={onReady}
      aria-hidden
    >
      <Shapes />
    </Canvas>
  );
}
