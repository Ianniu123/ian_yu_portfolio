'use client'

import Menu from "./Menu"
import { useState } from 'react'
import SpaceshipPanel from "./SpaceshipPanel/SpaceshipPanel"
import { AnimatePresence } from 'framer-motion'

type Props = {}

const Overlay = ({}: Props) => {
  const [panel, setActivePanel] = useState<string | null>(null)
  const [nextPanel, setNextPanel] = useState<string | null>(null)

  const onClose = () => {
    setActivePanel(null)
  }

  const onCloseAndSwitch = (section: string) => {
    if (panel === section) return;  // If clicking the same panel, do nothing.
    if (panel === null) {
      setActivePanel(section)
      return
    } else {
      setNextPanel(section);
      setActivePanel(null);  // Trigger exit animation first.
    }
  }

  const handleExitComplete = () => {
    if (nextPanel) {
      setActivePanel(nextPanel);
      setNextPanel(null);  // Reset nextPanel.
    }
  }

  return (
    <div>
      <div className="fixed -bottom-51 -right-51">
        <Menu onCloseAndSwitch={onCloseAndSwitch} />
      </div>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <AnimatePresence onExitComplete={handleExitComplete}>
          {panel && <SpaceshipPanel key={panel} onClose={onClose} />}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Overlay
