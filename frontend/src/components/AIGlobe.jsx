import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

const GlobeNodes = ({ count = 600 }) => {
  const mesh = useRef();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = 2.5 * Math.cos(theta) * Math.sin(phi);
      const y = 2.5 * Math.sin(theta) * Math.sin(phi);
      const z = 2.5 * Math.cos(phi);
      
      const scale = Math.random() * 0.05 + 0.01;
      temp.push({ x, y, z, scale });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    particles.forEach((particle, i) => {
      dummy.position.set(particle.x, particle.y, particle.z);
      // Pulsating effect
      const t = state.clock.elapsedTime;
      const pulse = Math.sin(t * 2 + i) * 0.01 + particle.scale;
      dummy.scale.set(pulse, pulse, pulse);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.rotation.y += 0.001;
    mesh.current.rotation.x += 0.0005;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      {/* High emissive intensity for Bloom */}
      <meshStandardMaterial color="#4f46e5" emissive="#4f46e5" emissiveIntensity={3} toneMapped={false} />
    </instancedMesh>
  );
};

const ConnectingLines = () => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[2.48, 48, 48]}>
        <meshBasicMaterial color="#4f46e5" transparent opacity={0.15} wireframe />
      </Sphere>
    </group>
  );
};

const DataFlows = ({ count = 30 }) => {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const flows = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const axis = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();
      
      temp.push({ 
        axis, 
        speed: Math.random() * 0.02 + 0.01,
        offset: Math.random() * Math.PI * 2,
        radius: 2.52 
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    
    flows.forEach((flow, i) => {
      const position = new THREE.Vector3(flow.radius, 0, 0);
      position.applyAxisAngle(flow.axis, t * flow.speed + flow.offset);
      dummy.position.copy(position);
      
      const pulse = Math.sin(t * 5 + i) * 0.02 + 0.03;
      dummy.scale.set(pulse, pulse, pulse);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.rotation.y += 0.001;
    mesh.current.rotation.x += 0.0005;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#e81cff" emissive="#e81cff" emissiveIntensity={6} toneMapped={false} />
    </instancedMesh>
  );
};

const LightBeams = ({ count = 12 }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= 0.0005;
      groupRef.current.rotation.z += 0.0002;
    }
  });

  // Create cylinders shooting out from the center
  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        const x = Math.cos(theta) * Math.sin(phi);
        const y = Math.sin(theta) * Math.sin(phi);
        const z = Math.cos(phi);
        
        return (
          <mesh 
            key={i} 
            position={[0, 0, 0]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          >
            {/* Very thin, long cylinders */}
            <cylinderGeometry args={[0.01, 0.05, 12, 8]} />
            {/* Additive blending makes overlapping beams intensely bright */}
            <meshBasicMaterial 
              color={i % 2 === 0 ? "#4f46e5" : "#e81cff"} 
              transparent 
              opacity={0.1}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const BackgroundGlows = () => {
  return (
    <group>
      {/* Huge, very soft, slow-moving glowing spheres in the far background */}
      <Float speed={1} rotationIntensity={0} floatIntensity={2}>
        <Sphere args={[8, 32, 32]} position={[-5, 2, -10]}>
          <meshBasicMaterial color="#4f46e5" transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
        </Sphere>
      </Float>
      <Float speed={1.5} rotationIntensity={0} floatIntensity={3}>
        <Sphere args={[10, 32, 32]} position={[6, -4, -12]}>
          <meshBasicMaterial color="#e81cff" transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} />
        </Sphere>
      </Float>
    </group>
  );
}

const AIGlobe = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#4f46e5" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#e81cff" />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />
        
        <BackgroundGlows />
        
        {/* Floating wrapper gives the whole globe structure a natural zero-G drift */}
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
          <GlobeNodes count={1000} />
          <ConnectingLines />
          <DataFlows count={50} />
          <LightBeams count={20} />
        </Float>

        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default AIGlobe;
