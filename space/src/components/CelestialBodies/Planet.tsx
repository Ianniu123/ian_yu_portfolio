'use client'

import { useTexture } from '@react-three/drei'
import { Vector3, Euler } from '@react-three/fiber';

type Props = {
  texturePath: string,
  position: Vector3,
  rotation: Euler,
  scale: number,
  children?: React.ReactNode;
}

const Planet = ({ texturePath, position, rotation, scale, children }: Props) => {
  const texture = useTexture(texturePath)

  return (
    <mesh
      receiveShadow
      castShadow
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
          map={texture}
          // emissiveMap={texture}
          // emissive="#ffffff"
          // emissiveIntensity={2}
      />
    </mesh>
  )
}

export default Planet