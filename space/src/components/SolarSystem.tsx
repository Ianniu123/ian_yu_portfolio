'use client'

import React, { useRef, useEffect } from 'react'
// import { useHelper } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Sun from './CelestialBodies/Sun'
import Planet from './CelestialBodies/Planet'
import SaturnRing from './CelestialBodies/SaturnRing'
import Orbit from './CelestialBodies/Orbit'
import * as THREE from 'three';
import { onCloseAndSwitch, PanelName, ui } from '@/state/ui'

type Props = {
  children?: React.ReactNode;
};

const SolarSystem = (props: Props) => {
  const group = useRef<THREE.Group>(null)
  const lightRef = useRef<THREE.PointLight>(null!)
  
  // Add refs for each planet
  const mercuryRef = useRef<THREE.Group>(null!)
  const venusRef = useRef<THREE.Group>(null!)
  const earthRef = useRef<THREE.Group>(null!)
  const marsRef = useRef<THREE.Group>(null!)
  const jupiterRef = useRef<THREE.Group>(null!)
  const saturnRef = useRef<THREE.Group>(null!)
  const uranusRef = useRef<THREE.Group>(null!)
  const neptuneRef = useRef<THREE.Group>(null!)
  const plutoRef = useRef<THREE.Group>(null!)

  // Random starting angles for each planet; accumulated using delta each frame
  const anglesRef = useRef({
    mercury: Math.random() * Math.PI * 2,
    venus: Math.random() * Math.PI * 2,
    earth: Math.random() * Math.PI * 2,
    mars: Math.random() * Math.PI * 2,
    jupiter: Math.random() * Math.PI * 2,
    saturn: Math.random() * Math.PI * 2,
    uranus: Math.random() * Math.PI * 2,
    neptune: Math.random() * Math.PI * 2,
    pluto: Math.random() * Math.PI * 2,
  })

  // Axial tilts for each planet (in radians)
  const axialTilts = {
    mercury: 0.034, // ~2°
    venus: 3.096,   // ~177° (retrograde)
    earth: 0.409,   // ~23.5°
    mars: 0.439,    // ~25.2°
    jupiter: 0.055, // ~3.1°
    saturn: 0.466,  // ~26.7°
    uranus: 1.706,  // ~97.8°
    neptune: 0.494, // ~28.3°
    pluto: 0.299,   // ~17.1°
  }

  const mapping: Record<string, string> = {
    Mercury: 'Mecury',
    Venus: 'Venus',
    Earth: 'About Me',
    Mars: 'Experience',
    Jupiter: 'Jupiter',
    Saturn: 'Projects',
    Uranus: 'Uranus',
    Neptune: 'Neptune',
    Pluto: 'Pluto',
    Moon: 'Moon',
  }

  const [hoveredPlanet, setHoveredPlanet] = React.useState<string | null>(null);
  const orbitsPaused = hoveredPlanet !== null; // derived, always correct

  const handlePlanetHoverChange = (hovered: boolean, name?: string) => {
    // Ignore noisy events with no name
    if (!name) return;
  
    if (hovered) {
      setHoveredPlanet(name);
      return; // UI text handled by effect below
    }
  
    // Only clear if we're leaving the currently hovered planet
    setHoveredPlanet(prev => (prev === name ? null : prev));
  };
  
  // Single source of truth for the top status bar text
  useEffect(() => {
    if (hoveredPlanet) {
      ui.hoverTitle = hoveredPlanet;
      const panel = mapping[hoveredPlanet];
      ui.hoverSubtitle = panel ? `Open: ${panel}` : '';
    } else {
      ui.hoverTitle = '';
      ui.hoverSubtitle = '';
    }
  }, [hoveredPlanet]);

  const handlePlanetClick = (name?: string) => {
    // Map planet names to panels. Adjust as desired.
    const mapping: Record<string, PanelName> = {
      Mercury: 'Other',
      Venus: 'Other',
      Earth: 'About Me',
      Mars: 'Experience',
      Jupiter: 'Other',
      Saturn: 'Projects',
      Uranus: 'Other',
      Neptune: 'Other',
      Pluto: 'Other',
      Moon: 'Other',
    }
    const target = name ? mapping[name] ?? 'About Me' : 'About Me'
    onCloseAndSwitch(target)
  }

  const Neptune = <Planet name='Neptune' indicatorActive={hoveredPlanet === 'Neptune'} onHoverChange={handlePlanetHoverChange} onClick={handlePlanetClick} texturePath='textures/2k_neptune.jpg' position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1.35} />
  const Saturn = <Planet name='Saturn' indicatorActive={hoveredPlanet === 'Saturn'} onHoverChange={handlePlanetHoverChange} onClick={handlePlanetClick} texturePath='textures/2k_saturn.jpg' position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1.6} />
  const Mecury = <Planet name='Mercury' indicatorActive={hoveredPlanet === 'Mercury'} onHoverChange={handlePlanetHoverChange} onClick={handlePlanetClick} texturePath='textures/2k_mercury.jpg' position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.9}/>
  const Venus = <Planet name='Venus' indicatorActive={hoveredPlanet === 'Venus'} onHoverChange={handlePlanetHoverChange} onClick={handlePlanetClick} texturePath='textures/2k_venus_surface.jpg' position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1.14} />
  const Earth = <Planet name='Earth' indicatorActive={hoveredPlanet === 'Earth'} onHoverChange={handlePlanetHoverChange} onClick={handlePlanetClick} texturePath='textures/2k_earth_daymap.jpg' position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1.27} />
  const Moon = <Planet name='Moon' indicatorActive={hoveredPlanet === 'Moon'} onHoverChange={handlePlanetHoverChange} onClick={handlePlanetClick} texturePath='textures/2k_moon.jpg' position={[-1, 1.221, 1]} rotation={[0, 0, 0]} scale={0.35} />
  const Mars = <Planet name='Mars' indicatorActive={hoveredPlanet === 'Mars'} onHoverChange={handlePlanetHoverChange} onClick={handlePlanetClick} texturePath='textures/2k_mars.jpg' position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1.14} />
  const Uranus = <Planet name='Uranus' indicatorActive={hoveredPlanet === 'Uranus'} onHoverChange={handlePlanetHoverChange} onClick={handlePlanetClick} texturePath='textures/2k_uranus.jpg' position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1.4} />
  const Pluto = <Planet name='Pluto' indicatorActive={hoveredPlanet === 'Pluto'} onHoverChange={handlePlanetHoverChange} onClick={handlePlanetClick} texturePath='textures/PlutoColour.webp' position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.65} />
  const Jupiter = <Planet name='Jupiter' indicatorActive={hoveredPlanet === 'Jupiter'} onHoverChange={handlePlanetHoverChange} onClick={handlePlanetClick} texturePath='textures/2k_jupiter.jpg' position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1.69} />
  // Add a helper to visualize the directional light
  // useHelper(lightRef, THREE.PointLightHelper, 10, 'red')

  useFrame((state, delta) => {
    if (orbitsPaused) return
    
    // Orbital angular velocities (radians per second approx)
    const orbitSpeed = {
      mercury: 0.5,
      venus: 0.4,
      earth: 0.3,
      mars: 0.25,
      jupiter: 0.15,
      saturn: 0.12,
      uranus: 0.08,
      neptune: 0.06,
      pluto: 0.04,
    }

    // Spin angular velocities (radians per second approx)
    const spinSpeed = {
      mercury: 0.5,
      venus: -0.02,
      earth: 1.0,
      mars: 0.97,
      jupiter: 2.4,
      saturn: 2.1,
      uranus: 1.4,
      neptune: 1.6,
      pluto: 0.15,
    }

    // Integrate angles
    anglesRef.current.mercury += orbitSpeed.mercury * delta
    anglesRef.current.venus += orbitSpeed.venus * delta
    anglesRef.current.earth += orbitSpeed.earth * delta
    anglesRef.current.mars += orbitSpeed.mars * delta
    anglesRef.current.jupiter += orbitSpeed.jupiter * delta
    anglesRef.current.saturn += orbitSpeed.saturn * delta
    anglesRef.current.uranus += orbitSpeed.uranus * delta
    anglesRef.current.neptune += orbitSpeed.neptune * delta
    anglesRef.current.pluto += orbitSpeed.pluto * delta

    if (mercuryRef.current) {
      const angle = anglesRef.current.mercury
      mercuryRef.current.position.x = 9.5 * Math.cos(angle)
      mercuryRef.current.position.z = 12 * Math.sin(angle)
      mercuryRef.current.rotation.y += spinSpeed.mercury * delta
      mercuryRef.current.rotation.x = axialTilts.mercury
    }
    if (venusRef.current) {
      const angle = anglesRef.current.venus
      venusRef.current.position.x = 12 * Math.cos(angle)
      venusRef.current.position.z = 15 * Math.sin(angle)
      venusRef.current.rotation.y += spinSpeed.venus * delta
      venusRef.current.rotation.x = axialTilts.venus
    }
    if (earthRef.current) {
      const angle = anglesRef.current.earth
      earthRef.current.position.x = 15.5 * Math.cos(angle)
      earthRef.current.position.z = 19 * Math.sin(angle)
      earthRef.current.rotation.y += spinSpeed.earth * delta
      earthRef.current.rotation.x = axialTilts.earth
    }
    if (marsRef.current) {
      const angle = anglesRef.current.mars
      marsRef.current.position.x = 19.5 * Math.cos(angle)
      marsRef.current.position.z = 24 * Math.sin(angle)
      marsRef.current.rotation.y += spinSpeed.mars * delta
      marsRef.current.rotation.x = axialTilts.mars
    }
    if (jupiterRef.current) {
      const angle = anglesRef.current.jupiter
      jupiterRef.current.position.x = 25 * Math.cos(angle)
      jupiterRef.current.position.z = 31 * Math.sin(angle)
      jupiterRef.current.rotation.y += spinSpeed.jupiter * delta
      jupiterRef.current.rotation.x = axialTilts.jupiter
    }
    if (saturnRef.current) {
      const angle = anglesRef.current.saturn
      saturnRef.current.position.x = 30 * Math.cos(angle)
      saturnRef.current.position.z = 38 * Math.sin(angle)
      saturnRef.current.rotation.y += spinSpeed.saturn * delta
      saturnRef.current.rotation.x = axialTilts.saturn
    }
    if (uranusRef.current) {
      const angle = anglesRef.current.uranus
      uranusRef.current.position.x = 36 * Math.cos(angle)
      uranusRef.current.position.z = 44 * Math.sin(angle)
      uranusRef.current.rotation.y += spinSpeed.uranus * delta
      uranusRef.current.rotation.x = axialTilts.uranus
    }
    if (neptuneRef.current) {
      const angle = anglesRef.current.neptune
      neptuneRef.current.position.x = 42 * Math.cos(angle)
      neptuneRef.current.position.z = 52 * Math.sin(angle)
      neptuneRef.current.rotation.y += spinSpeed.neptune * delta
      neptuneRef.current.rotation.x = axialTilts.neptune
    }
    if (plutoRef.current) {
      const angle = anglesRef.current.pluto
      plutoRef.current.position.x = 48 * Math.cos(angle)
      plutoRef.current.position.z = 58 * Math.sin(angle)
      plutoRef.current.rotation.y += spinSpeed.pluto * delta
      plutoRef.current.rotation.x = axialTilts.pluto
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
    <ambientLight intensity={0.1} />
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.05}>
        <group rotation={[Math.PI / 2, 0, 0]}>

          {/* This is Mecury */}
          <group
            position={[-0.042, -0.46, 2.257]}
            rotation={[-0.07, 0, 0]}
          >
            <Orbit 
              a={9.5}
              b={12}
            />
            <group ref={mercuryRef}>
              {Mecury}
            </group>
          </group>

          <group
            position={[-0.24, 0.029, 2.251]}
            rotation={[0.035, 0, 0]}
          >
            <Orbit 
              a={12}
              b={15}
            />
            <group ref={venusRef}>
              {Venus}
            </group>
          </group>

          <group
            position={[-0.25, -0.137, 1.999]}
            rotation={[0.00, 0, 0]}
          >
            <Orbit 
              a={15.5}
              b={19}
            />
            <group ref={earthRef}>
              {Earth}
              {Moon}
            </group>
          </group>

          <group
            position={[-0.438, -0.853, 2.035]}
            rotation={[-0.075, 0, 0]}
          >
            <Orbit 
              a={19.5}
              b={24}
            />
            <group ref={marsRef}>
              {Mars}
            </group>
          </group>

          <group
            position={[-0.439, -1.254, 1.832]}
            rotation={[-0.11, 0.1, -0.08]}
          >
            <Orbit 
              a={25}
              b={31}
            />
            <group ref={jupiterRef}>
              {Jupiter}
            </group>
          </group>

          <group
            position={[-0.287, -1.812, 1.841]}
            rotation={[-0.09, 0.03, 0.09]}
          >
            <Orbit 
              a={30}
              b={38}
            />
            <group ref={saturnRef}>
              {Saturn}
              <SaturnRing position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={2} />
            </group>
          </group>

          <group
            position={[-0.402, -1.661, 1.69]}
            rotation={[-0.08, 0.1, 0.08]}
          >
            <Orbit 
              a={36}
              b={44}
            />
            <group ref={uranusRef}>
              {Uranus}
            </group>
          </group>

          <group
            position={[-0.537, -3.134, 1.779]}
            rotation={[-0.11, -0.09, -0.09]}
          >
            <Orbit 
              a={42}
              b={52}
            />
            <group ref={neptuneRef}>
              {Neptune}
            </group>
          </group>

          <group
            position={[-0.195, -3.418, 1.993]}
            rotation={[-0.12, -0.1, 0.1]}
          >
            <Orbit 
              a={48}
              b={58}
            />
            <group ref={plutoRef}>
              {Pluto}
            </group>
          </group>

          <Sun />
          <pointLight ref={lightRef} color="#ffffff" intensity={4} distance={1000} position={[0, 0, 0]}/>

        </group>
      </group>
    </group>
  )
}

export default SolarSystem