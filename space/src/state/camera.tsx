'use client';
import { proxy } from 'valtio';

export const cameraState = proxy({
  homePosition: [5, 5, 0] as [number, number, number],
  homeTarget: [0, 0, 0] as [number, number, number],
  planetPositions: {} as Record<string, [number, number, number]>,
  fov: 50,
  homeSignal: 0,
});

export const setHome = (
  pos: [number, number, number],
  target: [number, number, number],
  fov?: number
) => {
  cameraState.homePosition = pos;
  cameraState.homeTarget = target;
  if (typeof fov === 'number') cameraState.fov = fov;
}; 

export const goHome = () => {
  // bump signal so listeners can react even if we're already in 'home'
  cameraState.homeSignal = Date.now();
};