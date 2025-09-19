// Animation variants
const backgroundVariants = {
  initial: {
    opacity: 0,
    scale: 0.3,
    y: "60vh", // Start from bottom where preview is
    x: "40vw", // Start from right where preview section is
    borderRadius: "12px", // Start with rounded corners like preview
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    x: 0,
    borderRadius: "0px", // Expand to full screen
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
      scale: { duration: 0.7 },
      y: { duration: 0.7 },
      x: { duration: 0.7 },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3 },
  },
};

const contentVariants = {
  initial: { opacity: 0, y: 50 }, // Start from below
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.15,
      delayChildren: 0.4, // Wait for background to settle
    },
  },
  exit: {
    opacity: 0,
    y: -30, // Exit upward
    transition: { duration: 0.4 },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 30 }, // Start from below
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const buttonVariants = {
  initial: { opacity: 0, y: 30, scale: 0.9 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.8 },
  },
  hover: {
    scale: 1.05,
    y: -2,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95, y: 0 },
};


export {
  backgroundVariants,
  contentVariants,
  itemVariants,
  buttonVariants
};