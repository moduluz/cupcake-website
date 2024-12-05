import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function CakeModel({ url, onError }) {
  const { scene } = useGLTF(url);

  // Ensure the model can cast and receive shadows
  if (scene) {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Enhanced material with more realistic properties
        child.material = new THREE.MeshStandardMaterial({
          color: child.material.color,
          metalness: 0.2,
          roughness: 0.5,
          envMapIntensity: 2,
        });
      }
    });
  }

  if (!scene) {
    onError && onError();
    return (
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="gold" />
      </mesh>
    );
  }

  return <primitive object={scene} scale={7} />;
}

// Fallback Geometry Component
function FallbackGeometry() {
  return (
    <mesh castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gold" />
    </mesh>
  );
}

export default function CakeModelScene() {
  const [modelLoaded, setModelLoaded] = useState(true);
  const [rotation, setRotation] = useState(0);

  const handleModelError = () => {
    console.error("Could not load 3D model");
    setModelLoaded(false);
  };

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotation((prev) => prev + 0.01);
    }, 16);
    return () => clearInterval(rotationInterval);
  }, []);

  return (
    <div style={{ flex: "1", height: "400px" }}>
      <Canvas 
        camera={{ position: [4, 3, 5] }} 
        shadows
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping 
        }}
      >
        <Suspense fallback={<FallbackGeometry />}>
          {modelLoaded ? (
            <>
              {/* Enhanced Lighting */}
              <ambientLight intensity={2.5} />
              <pointLight 
                position={[6, 8, 10]} 
                intensity={2.5} 
                castShadow 
              />
              
              {/* Environment for reflections */}
              <Environment preset="studio" background={false} />
              
              {/* Contact shadows for grounding */}
              <ContactShadows 
                position={[0, -1, 0]} 
                opacity={0.5} 
                scale={10} 
                blur={1.5} 
              />

              <group rotation-y={rotation}>
                <CakeModel 
                  url="/Cake_glb.glb" 
                  onError={handleModelError} 
                />
              </group>
              
              <OrbitControls 
                autoRotate 
                autoRotateSpeed={0.5}
                enableZoom={false} 
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.5}
              />
            </>
          ) : (
            <FallbackGeometry />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}