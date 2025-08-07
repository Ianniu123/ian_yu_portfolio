'use client'

import { useTexture } from '@react-three/drei'
import { Vector3, Euler } from '@react-three/fiber';
import { Html } from "@react-three/drei"

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
      <Html className="z-0" distanceFactor={5}>
        <p>hello</p>
      </Html>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
          map={texture}
      />
    </mesh>
  )
}

export default Planet