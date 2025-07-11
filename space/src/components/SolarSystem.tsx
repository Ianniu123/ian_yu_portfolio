'use client'

import React, { useRef, useEffect } from 'react'
import { useGLTF, useHelper, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Sun from './CelestialBodies/Sun'
import Planet from './CelestialBodies/Planet'
import SaturnRing from './CelestialBodies/SaturnRing'
import * as THREE from 'three';

type Props = {
  children?: React.ReactNode;
};

const SolarSystem = (props: Props) => {
  const group = useRef<THREE.Group>(null)
  const lightRef = useRef<THREE.PointLight>(null!)
  const { nodes, materials } = useGLTF('/scene.gltf')

  const Neptune = <Planet texturePath='textures/2k_neptune.jpg' position={[-0.001, -0.001, 0.203]} rotation={[1.42, 0.639, 0.09]} scale={8.5} />
  const Saturn = <Planet texturePath='textures/2k_saturn.jpg' position={[-0.107, -0.024, -0.002]} rotation={[0.151, -0.098, 0.015]} scale={8.5} />
  const Mecury = <Planet texturePath='textures/2k_mercury.jpg' position={[0, 0, -0.001]} rotation={[-0.07, 0, 0]} scale={0.9}/>
  const Venus = <Planet texturePath='textures/2k_venus_surface.jpg' position={[0, 0, 0]} rotation={[0.036, 0, 0]} scale={1.14} />
  const Earth = <Planet texturePath='textures/2k_earth_daymap.jpg' position={[2.253, -0.127, 15.477]} rotation={[-1.279, 0.235, -1.326]} scale={1.27} />
  const Moon = <Planet texturePath='textures/2k_moon.jpg' position={[0.651, 1.221, 15.774]} rotation={[-Math.PI / 2, 0, 0]} scale={0.35} />
  const Mars = <Planet texturePath='textures/2k_mars.jpg' position={[1.219, 0.791, 20.413]} rotation={[-1.648, 0, 0]} scale={1.14} />
  const Uranus = <Planet texturePath='textures/2k_uranus.jpg' position={[5.814, 1.954, 36.949]} rotation={[-1.643, -0.08, -0.006]} scale={1.27} />
  const Pluto = <Planet texturePath='textures/PlutoColour.webp' position={[7.508, 3.243, 46.042]} rotation={[-1.702, -0.096, -0.013]} scale={0.65} />
  const Jupiter = <Planet texturePath='textures/2k_jupiter.jpg' position={[5.110, 1.122, 25.291]} rotation={[-1.733, 0.078, 0.387]} scale={1.69} />
  // Add a helper to visualize the directional light
  useHelper(lightRef, THREE.PointLightHelper, 10, 'red')

  useFrame((state, delta) => {
    if (group.current) {
      // group.current.rotation.y += 0.1 * delta
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
    <ambientLight intensity={0.1} />
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.05}>
        <group rotation={[Math.PI / 2, 0, 0]}>

          {/* This is Neptune */}
          <group position={[3.135, 0.869, 43.78]} rotation={[-1.674, 0.096, 0]} scale={0.148}>
            {Neptune}
          </group>

          {/* This is Saturn and its Ring */}
          <group position={[-5.187, 0.512, 31.487]} rotation={[-Math.PI / 2, 0, 0]}>
            <group
              position={[0.106, 0.075, 0.003]}
              rotation={[-0.24, -0.235, -0.019]}
              scale={0.148}>

                {Saturn}
            </group>

            <SaturnRing position={[-0.008, -0.008, -0.061]} rotation={[-0.175, 0.175, 0]} scale={2} />
          </group>

          {/* This is Mecury */}
          <group position={[0.058, 0.062, 11.272]} rotation={[-Math.PI / 2, 0, 0]} >
            {Mecury}
          </group>

          {/* This is Venus */}
          <group position={[-5.181, -0.218, 11.591]} rotation={[-Math.PI / 2, 0, 0]}>
            {Venus}
          </group>

          {/* This is Earth */}
          {Earth}
          
          {/* This is Moon */}
          {Moon}

          {/* This is Mars */}
          {Mars}

          {/* This is Uranus */}
          {Uranus}

          {/* This is Uranus */}
          {Pluto}

          {/* This is Jupiter */}
          {Jupiter}

          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Circle005__0 as THREE.Mesh).geometry}
            position={[-0.042, -0.454, 2.257]}
            rotation={[-1.641, 0, 0]}
            scale={[0.218, 0.277, 0.225]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Circle006__0 as THREE.Mesh).geometry}
            position={[-0.24, 0.029, 2.251]}
            rotation={[-1.535, 0, 0]}
            scale={[0.189, 0.24, 0.195]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Circle007__0 as THREE.Mesh).geometry}
            position={[-0.24, -0.137, 1.999]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[0.189, 0.24, 0.195]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Circle008__0 as THREE.Mesh).geometry}
            position={[-0.438, -0.853, 2.035]}
            rotation={[-1.648, 0, 0]}
            scale={[0.189, 0.24, 0.195]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Circle009__0 as THREE.Mesh).geometry}
            position={[-0.439, -1.254, 1.832]}
            rotation={[-1.684, 0.077, 0.009]}
            scale={[0.189, 0.24, 0.195]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Circle010__0 as THREE.Mesh).geometry}
            position={[-0.287, -1.812, 1.841]}
            rotation={[-1.659, -0.08, -0.007]}
            scale={[0.189, 0.24, 0.195]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Circle011__0 as THREE.Mesh).geometry}
            position={[-0.402, -1.661, 1.69]}
            rotation={[-1.643, -0.08, -0.006]}
            scale={[0.189, 0.24, 0.195]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Circle012__0 as THREE.Mesh).geometry}
            position={[-0.537, -3.134, 1.779]}
            rotation={[-1.674, 0.096, 0]}
            scale={[0.189, 0.24, 0.195]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Circle013__0 as THREE.Mesh).geometry}
            position={[-0.195, -3.418, 1.993]}
            rotation={[-1.702, -0.096, -0.013]}
            scale={[0.189, 0.24, 0.195]}
          />

          <Sun />
          <pointLight ref={lightRef} color="0xFFFFFF" intensity={4} distance={100} position={[0, 0, 0]}/>

          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Circle014__0 as THREE.Mesh).geometry}
            position={[-0.24, -0.137, 33.567]}
            rotation={[-1.501, -0.429, -0.081]}
            scale={[0.349, 0.746, 0.195]}
          />
          
          {
          /* Asteroids 
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.asteroides__0 as THREE.Mesh).geometry}
            material={materials.Circle005__0}
            position={[-17.149, 12.114, 8.764]}
            rotation={[-1.674, 1.134, -1.727]}
            scale={[-1, 1, 1]}
          /> */}
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/scene.gltf')

export default SolarSystem