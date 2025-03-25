import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const DropDownMenu = ({ open, menuOptions, onClose }) => {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50"
      >
        {menuOptions.map((option, index) => (
          <motion.button
            key={option?.label + index}
            whileHover={{ backgroundColor: "#f3f4f6" }}
            onClick={option?.onClick}
            className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <i className={option.icon}></i>
            {option?.label}
          </motion.button>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default DropDownMenu;