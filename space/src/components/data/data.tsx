import { Vector3 } from '@react-three/fiber';
import Planet from '../CelestialBodies/Planet'

const RADIUS_SCALE = 2;
const DISTANCE_SCALE = 20;

const SunPos = [0, 0, 0]

type PlanetDatum = {
  name: string;
  texture: string;
  /** planet radius  in Earth-radii */
  r: number;
  /** orbit radius   in AU           */
  a: number;
};

const PLANETS: PlanetDatum[] = [
  { name: 'Mercury', texture: 'textures/2k_mercury.jpg',  r: 0.766,  a: 0.387 },
  { name: 'Venus',   texture: 'textures/2k_venus_surface.jpg', r: 0.949,  a: 0.723 },
  { name: 'Earth',   texture: 'textures/2k_earth_daymap.jpg',  r: 1.000,  a: 1.000 },
  { name: 'Mars',    texture: 'textures/2k_mars.jpg',     r: 0.532,  a: 1.524 },
  { name: 'Jupiter', texture: 'textures/2k_jupiter.jpg',  r: 5.985,  a: 5.203 },
  { name: 'Saturn',  texture: 'textures/2k_saturn.jpg',   r: 2.035,   a: 9.537 },
  { name: 'Uranus',  texture: 'textures/2k_uranus.jpg',   r: 1.99,   a: 19.191 },
  { name: 'Neptune', texture: 'textures/2k_neptune.jpg',  r: 1.93,   a: 30.07 },
  { name: 'Pluto',   texture: 'textures/PlutoColour.webp',r: 0.374,  a: 39.48 },
];

const planetsJsx = PLANETS.map((p) => {
  // Put every planet on the +X axis just for clarity
  const position: Vector3 = [p.a * DISTANCE_SCALE, 0, 0];

  // True-to-scale size
  const scale = p.r * RADIUS_SCALE;

  // Axial tilts in radians (optional – shown for Earth / Jupiter / Saturn)
  const tilt: Record<string, number> = {
    Earth:   23.44 * Math.PI / 180,
    Jupiter: 3.13  * Math.PI / 180,
    Saturn:  26.73 * Math.PI / 180,
  };

  return (
    <Planet
      key={p.name}
      texturePath={p.texture}
      position={position}
      rotation={[tilt[p.name] ?? 0, 0, 0]}
      scale={scale}
    />
  );
});

export { SunPos, planetsJsx, RADIUS_SCALE, DISTANCE_SCALE }
