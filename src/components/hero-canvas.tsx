"use client";

import { Float, MeshTransmissionMaterial, Points, PointMaterial, TorusKnot } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";

export function HeroCanvas() {
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(850 * 3);
    const pseudoRandom = (value: number) => {
      const x = Math.sin(value * 127.1) * 43758.5453123;
      return x - Math.floor(x);
    };

    for (let i = 0; i < 850; i += 1) {
      const i3 = i * 3;
      const radius = 2.8 + pseudoRandom(i + 1) * 2.4;
      const theta = pseudoRandom(i + 7) * Math.PI * 2;
      const phi = Math.acos(2 * pseudoRandom(i + 13) - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i3 + 2] = radius * Math.cos(phi);
    }

    return positions;
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.2, 6.8], fov: 40 }}>
        <color attach="background" args={["#0a0a0a"]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 3, 4]} intensity={1.4} color="#ff4d4d" />
        <pointLight position={[-2, -1, 3]} intensity={2} color="#ff1a1a" />

        <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.7}>
          <TorusKnot args={[1.05, 0.35, 280, 36]}>
            <MeshTransmissionMaterial
              clearcoat={1}
              thickness={0.45}
              roughness={0.08}
              chromaticAberration={0.03}
              anisotropy={0.35}
              ior={1.2}
              color="#920000"
              attenuationColor="#ff1a1a"
              attenuationDistance={0.65}
            />
          </TorusKnot>
        </Float>

        <Points positions={particlePositions} stride={3} frustumCulled>
          <PointMaterial size={0.02} color="#ff8a8a" transparent opacity={0.8} sizeAttenuation depthWrite={false} />
        </Points>
      </Canvas>
    </div>
  );
}
