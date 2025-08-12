'use client'

import { motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import { ui, onCloseAndSwitch } from '@/state/ui'
import { goHome } from '@/state/camera'

const HomeButton = () => {
  const snap = useSnapshot(ui)

  const handleClick = () => {
    if (snap.isTransitioning) return
    goHome()
    onCloseAndSwitch(null)
  }

  return (
    <motion.button
      aria-label="Go to home"
      className="fixed bottom-6 left-6 z-20 rounded-full bg-cyan-900/60 border border-cyan-400/50 text-cyan-200 shadow-lg backdrop-blur p-3 hover:bg-cyan-800/70"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      style={{
        pointerEvents: snap.isTransitioning ? 'none' : 'auto',
        opacity: snap.isTransitioning ? 0.6 : 1,
      }}
    >
      {/* Home icon (SVG) */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 10.5L12 3l9 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 10.5V20a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </motion.button>
  )
}

export default HomeButton

