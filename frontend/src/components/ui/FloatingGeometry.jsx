import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, TorusKnot, Float } from '@react-three/drei';
import * as THREE from 'three';

export const FloatingShapes = () => {
  const icoRef = useRef();
  const torusRef = useRef();

  useFrame((state, delta) => {
    if (icoRef.current) {
      icoRef.current.rotation.x += delta * 0.1;
      icoRef.current.rotation.y += delta * 0.15;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x -= delta * 0.1;
      torusRef.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#4f46e5" />
      <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#e81cff" />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Icosahedron ref={icoRef} args={[2.5, 0]} position={[5, 2, -10]}>
          <meshStandardMaterial 
            color="#4f46e5" 
            wireframe 
            transparent 
            opacity={0.15} 
            emissive="#4f46e5"
            emissiveIntensity={0.5}
            blending={THREE.AdditiveBlending} 
            depthWrite={false}
          />
        </Icosahedron>
      </Float>

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <TorusKnot ref={torusRef} args={[2, 0.4, 64, 8]} position={[-6, -3, -15]}>
          <meshStandardMaterial 
            color="#e81cff" 
            wireframe 
            transparent 
            opacity={0.1} 
            emissive="#e81cff"
            emissiveIntensity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </TorusKnot>
      </Float>
    </>
  );
};

const FloatingGeometry = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <FloatingShapes />
      </Canvas>
    </div>
  );
};

export default FloatingGeometry;
