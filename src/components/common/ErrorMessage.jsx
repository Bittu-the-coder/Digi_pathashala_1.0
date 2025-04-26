import React from "react";
import { motion } from "framer-motion";

function ErrorMessage({
  message = "Something went wrong!",
  onRetry,
  fullWidth = false,
}) {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const shakeVariants = {
    shake: {
      x: [0, -5, 5, -5, 5, 0],
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className={`${
        fullWidth ? "w-full" : "max-w-md"
      } mx-auto p-4 bg-red-50 border border-red-200 rounded-lg`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex items-start gap-3"
        variants={shakeVariants}
        animate="shake"
      >
        {/* Custom SVG Error Icon */}
        <div className="flex-shrink-0">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-red-500"
          >
            <motion.path
              d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          </svg>
        </div>

        <div className="flex-1">
          <h3 className="text-red-800 font-medium">Error occurred</h3>
          <p className="text-red-600 text-sm mt-1">{message}</p>

          {onRetry && (
            <motion.button
              className="mt-3 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md text-sm font-medium transition-colors"
              onClick={onRetry}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Try Again
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ErrorMessage;
