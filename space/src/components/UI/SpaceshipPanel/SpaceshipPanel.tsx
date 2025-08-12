import React from 'react';
import { Variants, motion } from 'framer-motion';
import './SpaceshipPanel.css';
import { PanelName, ui } from '@/state/ui';

type Props = {
  onClose: () => void;
  section: PanelName,
  children?: React.ReactNode;
};

const SpaceshipPanel = ({ onClose, section, children }: Props) => {
  const panelVariants: Variants = {
    hidden:  { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    exit:    { opacity: 0, scale: 0.8, transition: { duration: 0.8, ease: 'easeIn' } }
  };

  const closeButtonVariants: Variants = {
    hover: { scale: 1.1, transition: { duration: 0.2 }},
    tap: { scale: 0.9 }
  };

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`spaceship-panel`}
      onAnimationComplete={() => {
        // Only unlock after enter completes (not while exiting)
        if (ui.panel && ui.isTransitioning && ui.nextPanel === null) {
          console.log("hello")
          ui.isTransitioning = false;
        }
      }}
    >
      <div className="panel-header">
        <motion.button 
          variants={closeButtonVariants} 
          whileHover="hover" 
          whileTap="tap" 
          className="close-btn" 
          onClick={onClose} 
          aria-label="Close panel"
        >
          <span className="close-icon">×</span>
        </motion.button>
        <h1 className="title">{section}</h1>
      </div>
      {children}
    </motion.div>
  )
};

export default SpaceshipPanel;
