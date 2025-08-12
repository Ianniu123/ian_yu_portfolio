'use client'

import React, { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useSnapshot } from 'valtio'
import { cameraState, setHome } from '@/state/camera'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

type OrbitControlsRef = React.RefObject<OrbitControlsImpl | null>

type Props = {
  controlsRef: OrbitControlsRef
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

const CameraController: React.FC<Props> = ({ controlsRef }) => {
  const { camera } = useThree()
  const snap = useSnapshot(cameraState)

  const isAnimatingRef = useRef(false)
  const elapsedRef = useRef(0)
  const durationRef = useRef(1.5) // seconds

  const fromPosRef = useRef(new THREE.Vector3())
  const toPosRef = useRef(new THREE.Vector3())

  const fromTargetRef = useRef(new THREE.Vector3())
  const toTargetRef = useRef(new THREE.Vector3())

  const fromFovRef = useRef(50)
  const toFovRef = useRef(50)

  // Establish home on mount from actual camera/controls
  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return
    setHome(
      [camera.position.x, camera.position.y, camera.position.z],
      [controls.target.x, controls.target.y, controls.target.z],
      (camera as THREE.PerspectiveCamera).fov
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // React to state changes to start animation back home
  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return

    // Configure animation params
    fromPosRef.current.copy(camera.position)
    toPosRef.current.set(
      snap.homePosition[0],
      snap.homePosition[1],
      snap.homePosition[2]
    )

    fromTargetRef.current.copy(controls.target)
    toTargetRef.current.set(
      snap.homeTarget[0],
      snap.homeTarget[1],
      snap.homeTarget[2]
    )

    fromFovRef.current = (camera as THREE.PerspectiveCamera).fov
    toFovRef.current = snap.fov

    elapsedRef.current = 0
    isAnimatingRef.current = true
  }, [snap.homeSignal, snap.homePosition, snap.homeTarget, snap.fov, controlsRef, camera])

  useFrame((_, delta) => {
    if (!isAnimatingRef.current) return
    const controls = controlsRef.current
    if (!controls) return

    elapsedRef.current += delta
    const tRaw = Math.min(elapsedRef.current / durationRef.current, 1)
    const t = easeInOutCubic(tRaw)

    // Position
    camera.position.set(
      THREE.MathUtils.lerp(fromPosRef.current.x, toPosRef.current.x, t),
      THREE.MathUtils.lerp(fromPosRef.current.y, toPosRef.current.y, t),
      THREE.MathUtils.lerp(fromPosRef.current.z, toPosRef.current.z, t)
    )

    // Target
    controls.target.set(
      THREE.MathUtils.lerp(fromTargetRef.current.x, toTargetRef.current.x, t),
      THREE.MathUtils.lerp(fromTargetRef.current.y, toTargetRef.current.y, t),
      THREE.MathUtils.lerp(fromTargetRef.current.z, toTargetRef.current.z, t)
    )

    // FOV / zoom
    const cam = camera as THREE.PerspectiveCamera
    cam.fov = THREE.MathUtils.lerp(fromFovRef.current, toFovRef.current, t)
    cam.updateProjectionMatrix()

    controls.update()

    if (tRaw >= 1) {
      isAnimatingRef.current = false
    }
  })

  return null
}

export default CameraController

