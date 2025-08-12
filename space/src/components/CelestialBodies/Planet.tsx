'use client'

import { useTexture } from '@react-three/drei'
import { Vector3, Euler } from '@react-three/fiber';
import React from 'react'
import HoverIndicator from '../UI/HoverIndicator'

type Props = {
  texturePath: string,
  position: Vector3,
  rotation: Euler,
  scale: number,
  name?: string,
  indicatorActive?: boolean,
  onHoverChange?: (hovered: boolean, name?: string) => void,
  onClick?: (name?: string) => void,
}

const Planet = ({ texturePath, position, rotation, scale, name, indicatorActive = false, onHoverChange, onClick }: Props) => {
  const texture = useTexture(texturePath)

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Larger invisible hit area to make hovering reliable */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation()
          onHoverChange?.(true, name)
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          onHoverChange?.(false, name)
        }}
        onClick={(e) => {
          e.stopPropagation()
          onClick?.(name)
        }}
      >
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} depthTest={false} />
      </mesh>

      {/* Visible planet */}
      <mesh receiveShadow castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Hover indicator */}
      <HoverIndicator active={indicatorActive} />
    </group>
  )
}

export default Planet