'use client'
import { motion } from "framer-motion";

type Props = {
    handleOpen: () => void;
}

const MenuOpenButton = ({ handleOpen }: Props) => {
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

        {/* Three Horizontal Bars */}
        <div className="absolute flex flex-col justify-center items-center space-y-1 z-10">
          <span className="w-6 h-1 bg-cyan-400" />
          <span className="w-6 h-1 bg-cyan-400" />
          <span className="w-6 h-1 bg-cyan-400" />
        </div>
    </motion.button>
  );
}

export default MenuOpenButton