'use client'

import React from 'react'
import { useSnapshot } from 'valtio'
import { ui } from '@/state/ui'
import { motion, AnimatePresence } from 'framer-motion'

const TopStatusBar: React.FC = () => {
  const snap = useSnapshot(ui)
  const hasContent = Boolean(snap.hoverTitle || snap.hoverSubtitle)

  return (
    <div className="pointer-events-none fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <AnimatePresence>
        {hasContent && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="px-4 py-2 rounded-md"
            style={{
              background: 'rgba(10, 46, 66, 0.7)',
              boxShadow: '0 0 10px rgba(42, 241, 255, 0.35)',
              border: '1px solid rgba(42, 241, 255, 0.5)'
            }}
          >
            <div className="text-center">
              {snap.hoverTitle && (
                <div className="text-white text-lg tracking-wide">
                  {snap.hoverTitle}
                </div>
              )}
              {snap.hoverSubtitle && (
                <div className="text-cyan-300 text-sm mt-0.5">
                  {snap.hoverSubtitle}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TopStatusBar

