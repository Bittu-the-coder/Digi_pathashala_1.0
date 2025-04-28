import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

/**
 * A customizable loading spinner component with smooth animations.
 *
 * @param {Object} props - Component props
 * @param {string} [props.size="medium"] - Size of the spinner (small, medium, large)
 * @param {string} [props.color="primary"] - Color theme (primary, secondary, neutral)
 * @param {string} [props.text="Loading..."] - Loading text to display
 * @param {boolean} [props.showText=true] - Whether to show loading text
 * @returns {React.Element} LoadingSpinner component
 */
function LoadingSpinner({
  size = "medium",
  color = "primary",
  text = "Loading...",
  showText = true,
}) {
  // Size configuration
  const sizeClasses = {
    container: {
      small: "w-8 h-8",
      medium: "w-12 h-12",
      large: "w-16 h-16",
    },
    text: {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    },
  };

  // Color configuration
  const colorClasses = {
    primary: {
      track: "text-blue-500 opacity-30",
      path: "text-blue-600",
      text: "text-gray-600",
    },
    secondary: {
      track: "text-purple-500 opacity-30",
      path: "text-purple-600",
      text: "text-gray-700",
    },
    neutral: {
      track: "text-gray-400 opacity-30",
      path: "text-gray-600",
      text: "text-gray-500",
    },
  };

  // Animation variants
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

  const pathVariants = {
    initial: { pathLength: 0 },
    animate: {
      pathLength: 1,
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    initial: { opacity: 0.6 },
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
    <div
      className="flex flex-col items-center justify-center gap-4"
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      {/* Animated Spinner */}
      <motion.div
        className={sizeClasses.container[size]}
        variants={spinnerVariants}
        animate="animate"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="w-full h-full" focusable="false">
          {/* Background track */}
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            className={colorClasses[color].track}
          />

          {/* Animated path */}
          <motion.path
            d="M12 2a10 10 0 0 1 10 10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            className={colorClasses[color].path}
            variants={pathVariants}
            initial="initial"
            animate="animate"
          />
        </svg>
      </motion.div>

      {/* Optional loading text */}
      {showText && (
        <motion.p
          className={`font-medium ${sizeClasses.text[size]} ${colorClasses[color].text}`}
          variants={pulseVariants}
          initial="initial"
          animate="animate"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf(["primary", "secondary", "neutral"]),
  text: PropTypes.string,
  showText: PropTypes.bool,
};

export default LoadingSpinner;
