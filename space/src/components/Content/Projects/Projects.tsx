/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */

// Projects.tsx
import * as THREE from 'three'
import { useRef, useState, useLayoutEffect } from 'react'
import { Canvas, useFrame, ThreeEvent, useThree } from '@react-three/fiber'
import { Image, useTexture } from '@react-three/drei'
import { easing } from 'maath'

type RigProps = {
  rotation: [number, number, number]
  children?: React.ReactNode
}

type CardProps = {
  url: string
  position?: THREE.Vector3 | [number, number, number]
  rotation?: [number, number, number],
  link: string
}

const Projects = () => {
  return (
      <div className="panel-content">
        <Canvas camera={{ fov: 13 }}>
        <ResizeToParent />
          <Rig rotation={[0, 0, 0.15]}>
            <Carousel />
          </Rig>
        </Canvas>
      </div>
  )
}

const Rig = ({ rotation, children }: RigProps) => {
  const ref = useRef<THREE.Group>(null)

  // base rotation (what you passed in)
  const base = useRef(new THREE.Euler(...rotation))

  // drag state
  const dragging = useRef(false)
  const lastX = useRef(0)
  const velocity = useRef(0)     // radians per frame (we’ll damp this)
  const angle = useRef(0)        // accumulated extra Y angle from dragging

  // tune these to taste
  const sensitivity = 0.005      // px -> radians
  const damping = 0.93           // inertia decay (0.9–0.97 feels nice)
  const maxVelocity = 0.2

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    dragging.current = true
    lastX.current = e.clientX
    // capture so dragging continues off-canvas
    ;(e.currentTarget as any).setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging.current) return
    e.stopPropagation()
    const dx = e.clientX - lastX.current
    lastX.current = e.clientX
    const add = dx * sensitivity
    angle.current += add
    velocity.current = THREE.MathUtils.clamp(add, -maxVelocity, maxVelocity)
  }

  const endDrag = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    dragging.current = false
    ;(e.currentTarget as any).releasePointerCapture?.(e.pointerId)
  }

  useFrame((state, delta) => {
    if (!ref.current) return

    // inertia
    angle.current += velocity.current
    velocity.current *= Math.pow(damping, delta * 60) // fps-normalized decay

    // apply rotation: base + drag angle
    const y = base.current.y + angle.current
    ref.current.rotation.set(base.current.x, y, base.current.z)

    // camera: gentle parallax to pointer, look at the group (stable target)
    easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y, 6], 0.3, delta)
    const target = ref.current.getWorldPosition(new THREE.Vector3())
    state.camera.lookAt(target)
  })

  return (
    <group
      ref={ref}
      rotation={rotation}
      // drag handlers on the big group to “grab anywhere”
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerOut={endDrag}
      onPointerCancel={endDrag}
    >
      {/* Optional: cursor feedback */}
      <mesh
        position={[0, 0, 0]}
        onPointerOver={(e) => (document.body.style.cursor = 'grab')}
        onPointerDown={(e) => (document.body.style.cursor = 'grabbing')}
        onPointerUp={(e) => (document.body.style.cursor = 'grab')}
        onPointerOut={(e) => (document.body.style.cursor = 'auto')}
        visible={false}
      />
      {children}
    </group>
  )
}

const Carousel = ({ radius = 0.8, count = 5 }) => {
  const links: string[] = [
    "https://devpost.com/software/planwise-a2krce",
    "https://devpost.com/software/quantitive",
    "https://github.com/Ianniu123/Bike-Guardian",
    "https://github.com/Ianniu123/ian_yu_portfolio",
    "https://github.com/Ianniu123/Course_Graph",
  ]

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <Card
          key={i}
          url={`/images/img${Math.floor(i % 10) + 1}_.jpg`}
          position={[
            Math.sin((i / count) * Math.PI * 2) * radius,
            0,
            Math.cos((i / count) * Math.PI * 2) * radius
          ]}
          rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
          link={links[i]}
        />
      ))}
    </>
  )
}

const Card = ({ url, position, rotation, link }: CardProps) => {
  const ref = useRef<THREE.Mesh | null>(null)
  const [hovered, setHovered] = useState(false)

  // click/drag discrimination
  const down = useRef<{ x: number; y: number; t: number } | null>(null)
  const clicking = useRef(false)

  // tune to taste
  const MOVE_THRESH = 7;       // px
  const TIME_THRESH = 350;     // ms
  const PRESS_SCALE = 0.92;
  const PRESS_DURATION = 160;  // ms

  const [pressing, setPressing] = useState(false)

  useFrame((state, delta) => {
    if (!ref.current) return
    const base = hovered ? 1 : 0.85
    const target = base * (pressing ? PRESS_SCALE : 1)
    // scale (vector form so damp3 works)
    easing.damp3(ref.current.scale, [target, target, target] as any, 0.12, delta)

    const material: any = ref.current.material
    easing.damp(material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta)
    easing.damp(material, 'zoom', hovered ? 1.2 : 1.0, 0.2, delta)
  })

  const tex = useTexture(url)

  const onPointerOver = (e: ThreeEvent<PointerEvent>) => {
    // don’t block bubbling; just update UI
    setHovered(true)
    document.body.style.cursor = 'pointer'
  }

  const onPointerOut = () => {
    setHovered(false)
    document.body.style.cursor = 'auto'
  }

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    // IMPORTANT: no stopPropagation here → Rig still receives pointerDown for dragging
    down.current = { x: e.clientX, y: e.clientY, t: performance.now() }
  }

  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
    // IMPORTANT: no stopPropagation → Rig can complete its drag logic
    const start = down.current
    down.current = null
    if (!start || clicking.current) return

    const dx = Math.abs(e.clientX - start.x)
    const dy = Math.abs(e.clientY - start.y)
    const dt = performance.now() - start.t
    const isClick = dx < MOVE_THRESH && dy < MOVE_THRESH && dt < TIME_THRESH
    if (!isClick) return

    // press → open → release
    clicking.current = true
    setPressing(true)
    setTimeout(() => {
      window.open(link)
      setPressing(false)
      setTimeout(() => (clicking.current = false), 200)
    }, PRESS_DURATION)
  }

  return (
    <Image
      ref={ref}
      texture={tex}
      position={position}
      rotation={rotation}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    />
  )
}

function ResizeToParent() {
  const { gl, setSize, size, camera } = useThree()
  const parent = gl.domElement.parentElement

  useLayoutEffect(() => {
    if (!parent) return
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect
      setSize(cr.width, cr.height)           // updates R3F size/viewport
      if ('aspect' in camera) {
        camera.aspect = cr.width / cr.height // keep projection correct
        camera.updateProjectionMatrix()
      }
    })
    ro.observe(parent)
    return () => ro.disconnect()
  }, [parent, setSize, camera])

  return null
}


export default Projects
