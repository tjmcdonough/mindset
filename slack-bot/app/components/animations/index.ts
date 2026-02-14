"use client";

export { FadeIn, FadeInUp, FadeInLeft, FadeInRight, ScaleIn, SlideIn } from "./FadeIn";
export { StaggerContainer, StaggerItem } from "./Stagger";
export { ScrollReveal } from "./ScrollReveal";
export { TypeWriter } from "./TypeWriter";
export { AnimatedCounter } from "./AnimatedCounter";
export { FloatingElement } from "./FloatingElement";
export { GradientText } from "./GradientText";
export { ParallaxSection } from "./ParallaxSection";
export { AnimatedCard } from "./AnimatedCard";

// Animation variants for reuse
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const fadeInLeftVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const fadeInRightVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
