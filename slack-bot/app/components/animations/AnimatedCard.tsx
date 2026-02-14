"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
  glowColor?: string;
  style?: React.CSSProperties;
}

export function AnimatedCard({
  children,
  className,
  hoverScale = 1.02,
  hoverY = -5,
  glowColor,
  style,
}: AnimatedCardProps) {
  return (
    <motion.div
      className={className}
      style={style}
      whileHover={{
        scale: hoverScale,
        y: hoverY,
        boxShadow: glowColor ? `0 20px 40px ${glowColor}` : "0 20px 40px rgba(0, 217, 255, 0.15)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}
