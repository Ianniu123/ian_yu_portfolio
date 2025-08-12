'use client'

import Menu from "./Menu"
import SpaceshipPanel from "./SpaceshipPanel/SpaceshipPanel"
import TopStatusBar from "./TopStatusBar"
import HomeButton from "./HomeButton"

import { AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio';
import { ui, closePanel, handleExitComplete, PanelName } from '@/state/ui';
import { About, Experience, Projects, Other } from '@/components/Content/Content'

type ConcretePanel = Exclude<PanelName, null>;

// Map each panel to what should render inside the panel shell
const contentByPanel: Record<ConcretePanel, React.ReactNode> = {
  'Home': null,
  'About Me': <About />,
  'Experience': <Experience />,
  'Projects': <Projects />,
  'Other': <Other />,
};

const Overlay = () => {
  const snap = useSnapshot(ui);
  return (
    <div>
      <TopStatusBar />
      <HomeButton />
      <div className="fixed -bottom-51 -right-51">
        <Menu />
      </div>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <AnimatePresence onExitComplete={handleExitComplete}>
          {
            snap.panel && 
            <SpaceshipPanel 
              key={snap.panel} 
              section={snap.panel} 
              onClose={closePanel}
            >
              {contentByPanel[snap.panel]}
            </SpaceshipPanel>
          }
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Overlay
