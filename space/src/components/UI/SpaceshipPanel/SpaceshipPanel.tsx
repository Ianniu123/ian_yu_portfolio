import React, { useState, useEffect } from 'react';
import { Variants, motion, AnimatePresence } from 'framer-motion';
import './SpaceshipPanel.css';

type Props = {
  onClose: () => void;
};

const SpaceshipPanel = ({ onClose }: Props) => {
  const panelVariants: Variants = {
    hidden:  { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1,   y: 0,  transition: { duration: 0.8, ease: 'easeOut' } },
    exit:    { opacity: 0, scale: 0.8, y: -50, transition: { duration: 0.8, ease: 'easeIn' } }
  };

  // const buttonVariants = {
  //   hover: {
  //     scale: 1.05,
  //     y: -2,
  //     transition: {
  //       duration: 0.2,
  //       ease: "easeOut"
  //     }
  //   },
  //   tap: {
  //     scale: 0.95,
  //     y: 0
  //   }
  // };

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
        <h1 className="title">Simone Andreotti</h1>
        <p className="subtitle">Frontend developer</p>
      </div>
      
      <div className="panel-content">
        <div className="left-section">
          <h2 className="welcome-text">Welcome to my website!</h2>
          
          <p className="description">
            Close this panel and move around the planets or use the bottom arrows 
            to discover more about me and my world!
          </p>
          
          <p className="navigation-text">
            You can navigate like you would do on a map, every planet have 
            different informations.
          </p>
          
          <p className="enjoy-text">Enjoy your trip!</p>
        </div>
        
        <div className="right-section">
          <p className="experience-text">
            If you look for the full experience you can hop on the spaceship and 
            start the journey in the open world version of the website.
          </p>
          
          <p className="vr-text">
            For even a better experience this website is fully compatible with VR headsets.
          </p>

          <p className="disclaimer">*This option is not available on a mobile device</p>
        </div>
      </div>
      
      <div className="bottom-controls">
        <button className="open-map-btn" onClick={() => console.log("dont know")}>
          OPEN MAP
        </button>
      </div>
    </motion.div>
  )
};

export default SpaceshipPanel;
