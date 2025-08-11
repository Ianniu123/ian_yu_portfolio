'use client'

import RenderSolarSystem from "./RenderSolarSystem";
import Overlay from "./UI/Overlay";
import LoadingScreen from "./UI/LoadingScreen/LoadingScreen";
import { useEffect, useState } from 'react';

const Panel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 500)
          return 100;
        }

        return prev + 10;
      })
    }, 10000)

    return () => clearInterval(timer);
  }, [])

  if (isLoading) {
    return (
      <LoadingScreen
        message="Initializing web page..."
        progress={progress}
      />
    )
  }

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute top-0 left-0 h-screen w-screen z-0">
        <RenderSolarSystem />
      </div>
          
      <div className="z-10">
        <Overlay /> 
      </div>
    </div>
  );
}

export default Panel