import * as THREE from 'three'
import { useMemo } from 'react'
import { Line } from '@react-three/drei'

type OrbitProps = {
  a?: number              // semi-major axis
  b?: number              // semi-minor axis
  segments?: number
  color?: THREE.ColorRepresentation
  receiveShadow?: boolean
  castShadow?: boolean
}
const Orbit: React.FC<OrbitProps> = ({
  a = 5,
  b = 3,
  segments = 100,
  color = 'white',
}) => {
  // Generate elliptical points (XZ plane)
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2
      const x = a * Math.cos(theta)
      const z = b * Math.sin(theta)
      pts.push(new THREE.Vector3(x, 0, z))
    }
    return pts
  }, [a, b, segments])

  return (
    <Line
      points={points}
      color={color}
      lineWidth={1} // Only visible with Line2, not native WebGL1
      dashed={false}
    />
  )
}

export default Orbit