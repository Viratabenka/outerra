"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera, Html } from "@react-three/drei";
import * as THREE from "three";

interface Kitchen3DViewerProps {
  selectedModel: {
    id: number;
    name: string;
    color?: string;
  } | null;
  selectedModules: string[];
  selectedMaterials: Record<string, string>;
  autoRotate?: boolean;
  rotationSpeed?: number;
}

// Kitchen base model component
function KitchenModel({
  selectedModel,
  selectedModules,
  selectedMaterials,
}: {
  selectedModel: Kitchen3DViewerProps["selectedModel"];
  selectedModules: string[];
  selectedMaterials: Record<string, string>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Get material color based on selection
  const getMaterialColor = (category: string): string => {
    const materialId = selectedMaterials[category];
    if (materialId === "stainless-steel") return "#C0C0C0";
    if (materialId === "teak-wood") return "#8B4513";
    if (materialId === "composite") return "#2F4F4F";
    if (materialId === "stone") return "#696969";
    if (materialId === "powder-coated") return "#4682B4";
    return "#E5E5E5"; // Default gray
  };

  const cabinetColor = getMaterialColor("cabinets");
  const countertopColor = getMaterialColor("countertop");
  const accentColor = getMaterialColor("accents");

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Base Cabinet Structure */}
      <mesh
        position={[0, 0.5, 0]}
        castShadow
        receiveShadow
        onPointerOver={() => setHovered("base")}
        onPointerOut={() => setHovered(null)}
      >
        <boxGeometry args={[3, 1, 1.5]} />
        <meshStandardMaterial
          color={hovered === "base" ? "#4A90E2" : cabinetColor}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Countertop */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.1, 1.7]} />
        <meshStandardMaterial
          color={countertopColor}
          metalness={0.1}
          roughness={0.2}
        />
      </mesh>

      {/* Grill Module */}
      {selectedModules.includes("grill") && (
        <mesh
          position={[-0.8, 1.15, 0]}
          castShadow
          onPointerOver={() => setHovered("grill")}
          onPointerOut={() => setHovered(null)}
        >
          <boxGeometry args={[0.6, 0.2, 0.6]} />
          <meshStandardMaterial
            color={hovered === "grill" ? "#FF6B6B" : "#2C2C2C"}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      )}

      {/* Sink Module */}
      {selectedModules.includes("sink") && (
        <mesh
          position={[0.8, 1.15, 0]}
          castShadow
          onPointerOver={() => setHovered("sink")}
          onPointerOut={() => setHovered(null)}
        >
          <boxGeometry args={[0.5, 0.15, 0.5]} />
          <meshStandardMaterial
            color={hovered === "sink" ? "#4ECDC4" : "#E0E0E0"}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      )}

      {/* Storage Cabinets */}
      {selectedModules.includes("storage") && (
        <group>
          <mesh position={[-1.2, 0.5, 0.8]} castShadow receiveShadow>
            <boxGeometry args={[0.4, 1, 0.3]} />
            <meshStandardMaterial
              color={cabinetColor}
              metalness={0.2}
              roughness={0.5}
            />
          </mesh>
          <mesh position={[1.2, 0.5, 0.8]} castShadow receiveShadow>
            <boxGeometry args={[0.4, 1, 0.3]} />
            <meshStandardMaterial
              color={cabinetColor}
              metalness={0.2}
              roughness={0.5}
            />
          </mesh>
        </group>
      )}

      {/* Prep Station */}
      {selectedModules.includes("prep") && (
        <mesh position={[0, 1.15, 0.6]} castShadow>
          <boxGeometry args={[1, 0.1, 0.4]} />
          <meshStandardMaterial
            color={countertopColor}
            metalness={0.1}
            roughness={0.2}
          />
        </mesh>
      )}

      {/* Refrigerator */}
      {selectedModules.includes("refrigerator") && (
        <mesh position={[1.5, 0.7, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 1.4, 0.6]} />
          <meshStandardMaterial
            color="#F0F0F0"
            metalness={0.1}
            roughness={0.3}
          />
        </mesh>
      )}

      {/* Accent Details */}
      <mesh position={[0, 0.2, 0.75]} castShadow>
        <boxGeometry args={[3, 0.05, 0.1]} />
        <meshStandardMaterial
          color={accentColor}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Model Label */}
      {selectedModel && (
        <Html position={[0, 2, 0]} center>
          <div className="bg-black/70 text-white px-3 py-1 rounded text-sm font-semibold">
            {selectedModel.name}
          </div>
        </Html>
      )}
    </group>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <Html center>
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="mt-4 text-gray-600">Loading 3D Model...</p>
      </div>
    </Html>
  );
}

export default function Kitchen3DViewer({
  selectedModel,
  selectedModules,
  selectedMaterials,
  autoRotate = true,
  rotationSpeed = 0.5,
}: Kitchen3DViewerProps) {
  const [isRotating, setIsRotating] = useState(autoRotate);
  const [showControls, setShowControls] = useState(true);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden border-2 border-gray-300">
      {/* Control Panel */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors text-sm font-semibold text-gray-700 flex items-center gap-2"
        >
          {isRotating ? (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Pause Rotation
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Start Rotation
            </>
          )}
        </button>
        <button
          onClick={() => setShowControls(!showControls)}
          className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors text-sm font-semibold text-gray-700"
        >
          {showControls ? "Hide Controls" : "Show Controls"}
        </button>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg text-xs text-gray-600">
        <p className="font-semibold mb-1">Controls:</p>
        <p>🖱️ Drag to rotate • 🔍 Scroll to zoom • Right-click to pan</p>
      </div>

      {/* 3D Canvas */}
      <Canvas
        shadows
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<LoadingFallback />}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.5} />

          {/* Camera */}
          <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={50} />

          {/* Environment */}
          <Environment preset="sunset" />

          {/* Kitchen Model */}
          <KitchenModel
            selectedModel={selectedModel}
            selectedModules={selectedModules}
            selectedMaterials={selectedMaterials}
          />

          {/* Floor */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -1, 0]}
            receiveShadow
          >
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#E8E8E8" />
          </mesh>

          {/* Controls */}
          {showControls && (
            <OrbitControls
              autoRotate={isRotating}
              autoRotateSpeed={rotationSpeed}
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={3}
              maxDistance={10}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2.2}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

