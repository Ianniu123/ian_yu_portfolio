'use client';

import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { MenuOpenButton, MenuCloseButton } from "./MenuButton/MenuButton";
import { Orbitron } from "next/font/google";

type Props = {
  onCloseAndSwitch: (panel: string) => void;
};

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['600'],
})

const Menu = ({ onCloseAndSwitch }: Props) => {
  const controls = useAnimation();
  const [open, toggleOpen] = useState(false);

  const sections = [
    { text: "Home", angle: -110 },
    { text: "About Me", angle: -125 },
    { text: "Experience", angle: -140 },
    { text: "Projects", angle: -155 },
    { text: "Other", angle: -170 }
  ]

  const handleOpen = () => {
    toggleOpen(!open)
    controls.start({
      rotate: open ? 0 : 180,
      transition: { duration: 2, ease: "easeInOut" },
    })
  };

  return (
    <div>
      <style jsx>{`        
        .menu-color {
          fill: #082e42;
          stroke: rgba(42,241,255,.439);
          stroke-width: 3;
          filter: drop-shadow(0 0 3px #2af1ffd0);
        }
      `}</style>
      <motion.svg
        viewBox="0 0 300 300"
        width="300"
        height="300"
        animate={controls}
        className="overflow-visible"
        style={{
          transformOrigin: '100px 100px'
        }}
      >
        <defs>
          <filter id="neon" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur5" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur10" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur20" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur30" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="50" result="blur50" />
            <feMerge result="blur-merged">
              <feMergeNode in="blur10" />
              <feMergeNode in="blur20" />
              <feMergeNode in="blur30" />
              <feMergeNode in="blur50" />
            </feMerge>
            <feColorMatrix result="glowColor" in="blur-merged" type="matrix"
              values="1 0 0 0 0
                      0 0.6 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0" />
            <feMerge>
              <feMergeNode in="glowColor" />
              <feMergeNode in="blur5" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path d="M100,100 L0,100 A100,100 0 0,1 100,0 Z" className="menu-color" />
        <foreignObject x="35" y="35" width="60" height="60">
          <div className="scale-80 hover:scale-90">
            <MenuOpenButton handleOpen={handleOpen} />
          </div>
        </foreignObject>

        <path d="M100,100 L400,100 A300,300 0 0,1 100,400 Z" className="menu-color" />
        <foreignObject x="120" y="120" width="60" height="60">
          <div className="scale-90 hover:scale-100">
            <MenuCloseButton handleOpen={handleOpen} />
          </div>
        </foreignObject>

        {sections.map((section) => {
          const radius = 250;
          const angleRad = (section.angle * Math.PI) / 180 + Math.PI;
          const x = 100 + radius * Math.cos(angleRad) - 10;
          const y = 100 + radius * Math.sin(angleRad);

          return (
            <foreignObject
              key={section.text}
              x={x - 50}
              y={y - 20}
              width="140"
              height="40"
              style={{
                transform: `rotate(${section.angle}deg)`,
                transformOrigin: `${x}px ${y}px`
              }}
            >
              <motion.div 
                className={`relative group text-cyan-400 text-xl ${orbitron.className} w-full h-full flex justify-center items-center`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCloseAndSwitch(section.text)}
              >
                {/* Neon SVG Border */}
                <motion.svg
                  className="absolute opacity-0 group-hover:opacity-100"
                  viewBox="0 0 140 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.rect
                    x="0" y="0" width="140" height="40" rx="8" ry="8"
                    stroke="cyan"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#neon)"
                  />
                </motion.svg>

                {section.text}
              
              </motion.div>
            </foreignObject>
          );
        })}

        {/* Slice 3 */}
        <path d="M100,100 L100,300 A200,200 0 0,1 -100,100 Z" className="menu-color" />
      </motion.svg>
    </div>
  )
}

export default Menu;
