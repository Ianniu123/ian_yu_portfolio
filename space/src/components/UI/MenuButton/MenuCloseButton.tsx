'use client';
import { motion } from "framer-motion";

type Props = {
  handleOpen: () => void;
};

const MenuCloseButton = ({ handleOpen }: Props) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.8 }}
      onClick={handleOpen}
      className="relative flex items-center justify-center rounded-full overflow-hidden"
    >
      {/* Outer Circle Border */}
      <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-cyan-400 relative" />

      {/* Glow Effect */}
      <div className="absolute w-12 h-12 rounded-full border-4 border-cyan-400 blur-md opacity-50"></div>

      {/* Continuous X Shape */}
      <div className="absolute flex items-center justify-center">
        {/* First Diagonal Bar */}
        <div className="w-5 h-1.5 bg-cyan-400 rotate-45"></div>

        {/* Second Diagonal Bar */}
        <div className="w-5 h-1.5 bg-cyan-400 -rotate-45 absolute"></div>
      </div>
    </motion.button>
  );
};

export default MenuCloseButton;
