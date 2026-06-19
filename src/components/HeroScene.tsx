import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sparkles, TorusKnot } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

function NeuralBrain({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.0008;
      groupRef.current.rotation.z += 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.8 + scrollProgress * 0.5} floatIntensity={1.4 + scrollProgress * 0.3}>
        <mesh>
          <icosahedronGeometry args={[1.7, 3]} />
          <meshStandardMaterial 
            color="#7dd3fc" 
            metalness={0.85 + scrollProgress * 0.1} 
            roughness={0.18 - scrollProgress * 0.05} 
            emissive="#0f172a" 
            emissiveIntensity={0.4 + scrollProgress * 0.2} 
          />
        </mesh>
        <mesh scale={1.18}>
          <icosahedronGeometry args={[1.55, 2]} />
          <meshStandardMaterial 
            color="#8b5cf6" 
            wireframe 
            transparent 
            opacity={0.45 + scrollProgress * 0.15} 
          />
        </mesh>
      </Float>
      <Sparkles 
        count={90 + Math.floor(scrollProgress * 30)} 
        scale={[8, 8, 8]} 
        size={3 + scrollProgress * 1.5} 
        speed={0.35 + scrollProgress * 0.2} 
        color="#6ee7ff" 
      />
    </group>
  );
}

function NeuralNetworkLines({ scrollProgress }: { scrollProgress: number }) {
  const points = [
    new THREE.Vector3(-2.8, 1.2, 0),
    new THREE.Vector3(-1.4, -0.7, 0.4),
    new THREE.Vector3(0.5, 1.1, -0.4),
    new THREE.Vector3(2.1, -0.2, 0.2),
  ];

  const curve = new THREE.CatmullRomCurve3(points);
  const positions = curve.getPoints(80).map((point) => [point.x, point.y, point.z] as [number, number, number]);

  return (
    <group>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={new Float32Array(positions.flat())} count={positions.length} itemSize={3} args={[new Float32Array(positions.flat()), 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#6ee7ff" transparent opacity={0.45 + scrollProgress * 0.2} linewidth={2} />
      </line>
      {points.map((point, index) => (
        <mesh key={index} position={point}>
          <sphereGeometry args={[0.08 + scrollProgress * 0.04, 16, 16]} />
          <meshStandardMaterial 
            color={index % 2 === 0 ? '#6ee7ff' : '#8b5cf6'} 
            emissive="#ffffff" 
            emissiveIntensity={0.4 + scrollProgress * 0.3} 
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene() {
  const { scrollY } = useScroll();
  const scrollProgress = useRef(0);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (current) => {
      // Normalize scroll progress (0 to 1) based on viewport height
      scrollProgress.current = Math.min((current as number) / window.innerHeight, 1);
    });

    return () => unsubscribe();
  }, [scrollY]);

  const SceneCamera = () => {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);

    useFrame(() => {
      if (cameraRef.current && scrollProgress.current < 0.5) {
        // Camera zoom and pan based on scroll
        const zoomFactor = 1 + scrollProgress.current * 0.3;
        const panY = scrollProgress.current * 1.5;
        const panZ = scrollProgress.current * 2;

        cameraRef.current.position.z = 6 * zoomFactor;
        cameraRef.current.position.y = panY;
        cameraRef.current.lookAt(0, panY, 0);
      }
    });

    return <perspectiveCamera ref={cameraRef} position={[0, 0, 6]} fov={45} />;
  };

  return (
    <div className="relative h-[420px] w-full rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl md:h-[540px] overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[4, 4, 4]} intensity={2.5} />
        <pointLight position={[-4, -2, 3]} intensity={2} color="#8b5cf6" />
        <Suspense fallback={null}>
          <NeuralBrain scrollProgress={scrollProgress.current} />
          <NeuralNetworkLines scrollProgress={scrollProgress.current} />
          <TorusKnot args={[2.7, 0.45, 160, 32]} position={[0, -2.2, -1.5]}>
            <meshStandardMaterial 
              color="#0f172a" 
              metalness={0.7} 
              roughness={0.25} 
              emissive="#1e293b" 
              emissiveIntensity={0.8 + scrollProgress.current * 0.5} 
            />
          </TorusKnot>
        </Suspense>
        <SceneCamera />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-6 bottom-6 rounded-2xl border border-white/10 bg-slate-950/45 p-4 text-sm text-slate-200 backdrop-blur-xl">
        <span className="animate-pulse">✨ Interactive 3D neural core — scroll to see it react</span>
      </div>
    </div>
  );
}
