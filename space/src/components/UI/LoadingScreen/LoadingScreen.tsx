import React from "react";
import { motion, type Variants } from "framer-motion";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  message?: string;
  progress?: number; // 0-100 for progress bar
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Initializing ..",
  progress,
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const pulseVariants: Variants = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const orbitVariants: Variants = {
    orbit: {
      rotate: 360,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const progressVariants: Variants = {
    loading: {
      width: `${progress}%`,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className={styles.container}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={styles.content}
      >
        {/* Main Loading Icon */}
        <motion.div variants={itemVariants} className={styles.loadingIcon}>
          {/* Outer Ring */}
          <motion.div
            variants={orbitVariants}
            animate="orbit"
            className={styles.outerRing}
          >
            {/* Orbital Dots */}
            <div className={`${styles.orbitalDot} ${styles.topDot}`} />
            <div
              className={`${styles.orbitalDot} ${styles.rightDot} ${styles.orangeDot}`}
            />
            <div className={`${styles.orbitalDot} ${styles.bottomDot}`} />
          </motion.div>

          {/* Inner Pulsing Core */}
          <motion.div
            variants={pulseVariants}
            animate="pulse"
            className={styles.pulsingCore}
          />

          {/* Energy Rings */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`${styles.energyRing} ${styles.ring1}`}
          />
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.05, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className={`${styles.energyRing} ${styles.ring2}`}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div variants={itemVariants} className={styles.textSection}>
          <motion.h1
            animate={{
              textShadow: [
                "0 0 10px rgba(0, 255, 255, 0.8)",
                "0 0 20px rgba(0, 255, 255, 1)",
                "0 0 10px rgba(0, 255, 255, 0.8)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={styles.loadingTitle}
          >
            Loading...
          </motion.h1>

          <motion.p variants={itemVariants} className={styles.loadingMessage}>
            {message}
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        {typeof progress === "number" && (
          <motion.div
            variants={itemVariants}
            className={styles.progressSection}
          >
            <div className={styles.progressHeader}>
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className={styles.progressBarContainer}>
              <motion.div
                variants={progressVariants}
                animate="loading"
                className={styles.progressBar}
              >
                <motion.div
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={styles.progressShimmer}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
