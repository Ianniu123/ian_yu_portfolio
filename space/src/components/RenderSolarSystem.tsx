'use client'
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'

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
            style={{ background: 'radial-gradient(ellipse at center, #0a0a2a 0%, #000000 100%)' }}
            gl={{ 
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            }}
        >
            {/* Enhanced star field */}
            <Stars
                radius={200}
                depth={100}
                count={2000}
                factor={4}
                saturation={0}
                fade
                speed={0.5}
            />

            <SolarSystem />
            
            <OrbitControls />
            
            <EffectComposer>
                <Bloom
                    intensity={1.5}
                    luminanceThreshold={0.3}
                    luminanceSmoothing={0.9}
                    mipmapBlur
                />
                <ChromaticAberration 
                    offset={[0.0005, 0.0005]} 
                />
                <Vignette 
                    darkness={0.3}
                    offset={0.5}
                />
            </EffectComposer>
        </Canvas>
    )
}


