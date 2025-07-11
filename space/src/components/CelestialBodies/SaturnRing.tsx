'use client'

import React from 'react';
import { Vector3, Euler } from '@react-three/fiber';
import { DoubleSide } from 'three';
import { RADIUS_SCALE, DISTANCE_SCALE } from '../data/data';

type RingProps = {
    position: Vector3,
    rotation: Euler,
    scale: number,
    inner: number,
    outer: number, 
    color: string,
    opacity: number
}

type RingGroupProps = {
  position: Vector3,
  rotation: Euler,
  scale: number,
  children?: React.ReactNode;
}

const SaturnRingLayer= ({ position, rotation, scale, inner, outer, color, opacity }: RingProps) => {
  return (
    <mesh 
        position={position}
        rotation={rotation}
        scale={scale}
    >
      <ringGeometry args={[inner, outer, 128]} />
      <meshStandardMaterial
        color={color}
        side={DoubleSide}
        transparent={true}
        opacity={opacity}
      />
    </mesh>
  );
}

const SaturnRing = (props: RingGroupProps) => {
  // Example of 4 layered rings with different colors and opacities
  const layers = [
    { inner: 1.2, outer: 1.5, color: '#e5e4e2', opacity: 0.5 },
    { inner: 1.5, outer: 1.8, color: '#c2b280', opacity: 0.4 },
    { inner: 1.8, outer: 2.1, color: '#b0a160', opacity: 0.3 },
    { inner: 2.1, outer: 2.4, color: '#f5f5dc', opacity: 0.2 },
  ];
  return (
    <>
      {layers.map((layer, i) => (
        <SaturnRingLayer key={i} {...layer} {...props} />
      ))}
    </>
  );
}

export default SaturnRing