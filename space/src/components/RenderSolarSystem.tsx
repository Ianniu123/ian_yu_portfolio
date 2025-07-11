'use client'
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import { Stars } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

const SolarSystem = dynamic(() => import("./SolarSystem"), {
  ssr: false,
});

export default function RenderSolarSystem() {
    const [mounted, setMounted] = useState(false)
    
    useEffect(() => {
        setMounted(true)
    }, [])
    
    if (!mounted) {
        return null
    }

    return (
        <Canvas
            style={{ background: 'black' }}
            gl={{ antialias: true }}
        >
            <Stars
                radius={100}        // How far the stars are
                depth={50}          // How many layers of stars
                count={1000}        // Number of stars
                factor={5}          // Size factor
                saturation={0}      // 0 for white stars
                fade                // Enables fading for depth
            />

            <SolarSystem />
            <OrbitControls />
            <EffectComposer>
                <Bloom
                intensity={2}             // Strength of the bloom
                luminanceThreshold={0.2}    // Brightness threshold
                luminanceSmoothing={0.9}    // How softly it transitions
                />
            </EffectComposer>
        </Canvas>
    )
}


