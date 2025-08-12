'use client'

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type HoverIndicatorProps = {
  active: boolean
  color?: string
}

// Animated pulsing rings used to indicate a hovered planet
const HoverIndicator: React.FC<HoverIndicatorProps> = ({ active, color = '#2af1ff' }) => {
  const meshesRef = useRef<(THREE.Mesh | null)[]>([])
  const materialsRef = useRef<(THREE.MeshBasicMaterial | null)[]>([])

  // Use delta-based timer so speed is frame-rate independent
  const timeRef = React.useRef(0)
  useFrame((_, delta) => {
    if (!active) {
      // Hide all rings when inactive
      materialsRef.current.forEach((mat) => {
        if (mat) mat.opacity = 0
      })
      return
    }
    timeRef.current += delta

    // Three rings, evenly phase-shifted
    const phases = [0, 1 / 3, 2 / 3]
    phases.forEach((phaseOffset, index) => {
      const mesh = meshesRef.current[index]
      const material = materialsRef.current[index]
      if (!mesh || !material) return

      // Period controls the speed of pulses
      const period = 1.5
      const t = (timeRef.current / period + phaseOffset) % 1

      // Scale grows from 1 to ~1.6, opacity fades out
      const scale = 1 + t * 0.6
      const opacity = (1 - t) * 0.85

      mesh.scale.setScalar(scale)
      material.opacity = opacity
    })
  })

  return (
    <>
      {/* Equatorial set */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        {[0, 1, 2].map((i) => (
          <mesh
            key={`eq-${i}`}
            ref={(el) => (meshesRef.current[i] = el)}
          >
            <ringGeometry args={[1.15, 1.3, 128]} />
            <meshBasicMaterial
              ref={(el) => (materialsRef.current[i] = el)}
              color={color}
              transparent
              opacity={0}
              depthWrite={false}
              // Keep depthTest so it doesn't draw through the planet
              // depthTest defaults to true
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </>
  )
}

export default HoverIndicator

