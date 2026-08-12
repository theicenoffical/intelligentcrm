import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 140;
const RADIUS = 5.2;

function Network() {
  const group = useRef();
  const lineMat = useRef();

  const { positions, linePositions, lineColors, seeds } = useMemo(() => {
    const pos = new Float32Array(NODE_COUNT * 3);
    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = RADIUS * (0.55 + Math.random() * 0.45);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      const z = r * Math.cos(phi);
      nodes.push(new THREE.Vector3(x, y, z));
      pos.set([x, y, z], i * 3);
    }
    const lines = [];
    const colors = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 2.1) {
          lines.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
          const isSignal = Math.random() < 0.06;
          const c = isSignal ? [1.0, 0.2, 0.2] : [0.35, 0.35, 0.42];
          colors.push(...c, ...c);
        }
      }
    }
    const seeds = new Float32Array(NODE_COUNT);
    for (let i = 0; i < NODE_COUNT; i++) seeds[i] = Math.random() * Math.PI * 2;
    return {
      positions: pos,
      linePositions: new Float32Array(lines),
      lineColors: new Float32Array(colors),
      seeds,
    };
  }, []);

  const pointsRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.045;
      group.current.rotation.x = Math.sin(t * 0.08) * 0.06;
    }
    if (pointsRef.current) {
      const sizes = pointsRef.current.geometry.attributes.position;
      const arr = sizes.array;
      for (let i = 0; i < NODE_COUNT; i++) {
        arr[i * 3 + 1] = positions[i * 3 + 1] + Math.sin(t * 0.7 + seeds[i]) * 0.08;
      }
      sizes.needsUpdate = true;
    }
    if (lineMat.current) {
      lineMat.current.opacity = 0.16 + Math.sin(t * 0.5) * 0.04;
    }
  });

  return (
    <group ref={group}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions.slice(), 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.055} color="#d8d8e2" transparent opacity={0.9} sizeAttenuation />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial ref={lineMat} vertexColors transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
}

const Hero3D = () => (
  <div className="absolute inset-0" aria-hidden="true" data-testid="hero-3d">
    <Canvas camera={{ position: [0, 0, 9.5], fov: 50 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <Network />
      </Suspense>
    </Canvas>
  </div>
);

export default Hero3D;
