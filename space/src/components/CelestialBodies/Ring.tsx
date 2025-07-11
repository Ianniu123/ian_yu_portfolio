'use client'

import { useTexture } from '@react-three/drei'
import { Vector3, Euler } from '@react-three/fiber';
import { DoubleSide } from 'three';

type Props = {
  texturePath: string,
  position: Vector3,
  rotation: Euler,
  scale: number,
  children?: React.ReactNode;
}

const Ring = ({ texturePath, position, rotation, scale, children }: Props) => {
  const texture = useTexture(texturePath)

  const uniforms = {
    utexture: { value: texture },
    innerRadius: { value: 3 },
    outerRadius: { value: 5 },
  }

  const vertexShader = `
      varying vec3 vPos;
      
      void main() {
        vPos = position;
        vec3 viewPosition = (modelViewMatrix * vec4(position, 1.)).xyz;
        gl_Position = projectionMatrix * vec4(viewPosition, 1.);
      }
    `
  const fragmentShader = `
      uniform sampler2D uTexture;
      uniform float innerRadius;
      uniform float outerRadius;

      varying vec3 vPos;

      vec4 color() {
        vec2 uv = vec2(0.0);
        uv.x = (length(vPos) - innerRadius) / (outerRadius - innerRadius);
        if (uv.x < 0.0 || uv.x > 1.0) {
          discard;
        }

        vec4 pixel = texture(uTexture, uv);
        return pixel;
      }

      void main() {
        gl_FragColor = color();
      }
    `

  return (
    <mesh
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <ringGeometry args={[3, 5, 128]} />
      <meshStandardMaterial
        color="#d2b48c"
        side={DoubleSide}
        transparent={true}
        opacity={0.7}
      />
    </mesh>
  )
}

export default Ring