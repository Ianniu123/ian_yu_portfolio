'use client'

import { useTexture } from '@react-three/drei'

const Sun = () => {
  const texture = useTexture("/textures/2k_sun.jpg")

  return (
    <mesh
      receiveShadow
      castShadow
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
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