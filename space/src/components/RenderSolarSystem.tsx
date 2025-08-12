'use client'
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import React, { useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import CameraController from './CameraController'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

const SolarSystem = dynamic(() => import("./SolarSystem"), {
  ssr: false,
});

export default function RenderSolarSystem() {
  const [mounted, setMounted] = useState(false)
  const controlsRef = useRef<OrbitControlsImpl>(null)
    
  useEffect(() => {
      setMounted(true)
  }, [])
    
  if (!mounted) {
    return null
  }

  return (
    <Canvas
      style={{ 
        background: 'radial-gradient(ellipse at center, #0a0a2a 0%, #000000 100%)' 
      }}
      camera={{ position: [5, 5, 0], fov: 50}}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance"}}
    >
      {/* Enhanced star field */}
      <Stars
        radius={200}
        depth={100}
        count={10000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      <SolarSystem />

      {/* Controls with ref for CameraController */}
      <OrbitControls 
        ref={controlsRef}
        target={[0, 0, 0]}          // ⬅️ where the camera looks
        enableDamping
        dampingFactor={0.08}

        // Rotation limits (in radians)
        // Keep between ~15° and ~75° vertical tilt:
        minPolarAngle={Math.PI * 0.08}
        maxPolarAngle={Math.PI * 0.42}

        // Zoom limits (distance from target)
        minDistance={1}
        maxDistance={1500}

        // Optional feel tweaks
        zoomSpeed={0.8}
        rotateSpeed={0.9}
        enablePan={false}
      />
      {/* Camera animation controller uses the controls ref */}
      <CameraController controlsRef={controlsRef} />
            
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration offset={[0.0005, 0.0005]} />
          <Vignette 
            darkness={0.3}
            offset={0.5}
          />
      </EffectComposer>
    </Canvas>
  )
}


