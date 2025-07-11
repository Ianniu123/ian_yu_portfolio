'use client'

import { useTexture } from '@react-three/drei'
import { SunPos } from '../data/data'

type Props = {
    children?: React.ReactNode;
}

const Sun = (props: Props) => {
  const texture = useTexture("/textures/2k_sun.jpg")

  return (
    <mesh
      receiveShadow
      castShadow
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, Math.PI / 9]}
      scale={5}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive="#ffffff"
          emissiveIntensity={2}
      />
    </mesh>
  )
}

export default Sun