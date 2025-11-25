import { Variants, TargetAndTransition } from 'framer-motion';

// Easing curves
export const EASING = {
  DEFAULT: [0.25, 0.1, 0.25, 1.0] as const, // Cubic bezier for smooth, modern feel
  SPRING: { type: "spring", stiffness: 300, damping: 30 } as const,
};

// Standard durations
export const DURATION = {
  FAST: 0.3,
  MEDIUM: 0.5,
  SLOW: 0.8,
};

// Page transitions
export const PAGE_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: DURATION.MEDIUM,
      ease: EASING.DEFAULT,
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: {
      duration: DURATION.FAST,
      ease: EASING.DEFAULT
    }
  }
};

// Container with stagger
export const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Standard fade up item
export const FADE_UP_ITEM: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: DURATION.MEDIUM,
      ease: EASING.DEFAULT
    }
  }
};

// Fade in only
export const FADE_IN: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: {
      duration: DURATION.MEDIUM,
      ease: EASING.DEFAULT
    }
  }
};

// Scale in (for images or cards)
export const SCALE_IN: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: DURATION.MEDIUM,
      ease: EASING.DEFAULT
    }
  }
};

// Hover effects
export const HOVER_SCALE: TargetAndTransition = {
  scale: 1.02,
  transition: { duration: 0.2, ease: "easeInOut" }
};

export const HOVER_LIFT: TargetAndTransition = {
  y: -5,
  transition: { duration: 0.2, ease: "easeInOut" }
};
