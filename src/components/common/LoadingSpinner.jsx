import React from "react";
import { motion } from "framer-motion";

function LoadingSpinner({ size = "medium" }) {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  const textClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "linear",
      },
    },
  };

  const pulseVariants = {
    initial: { opacity: 0.5 },
    animate: {
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1.5,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-12">
      {/* Custom SVG Spinner */}
      <motion.div
        className={sizeClasses[size]}
        variants={spinnerVariants}
        animate="animate"
      >
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            className="text-blue-500 opacity-30"
          />
          <motion.path
            d="M12 2a10 10 0 0 1 10 10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            className="text-blue-600"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>

      {/* Pulsing Text */}
      <motion.p
        className={`text-gray-600 font-medium ${textClasses[size]}`}
        variants={pulseVariants}
        initial="initial"
        animate="animate"
      >
        Loading...
      </motion.p>
    </div>
  );
}

export default LoadingSpinner;
