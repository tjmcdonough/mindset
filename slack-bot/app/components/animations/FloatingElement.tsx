"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface FloatingElementProps {
  children: ReactNode;
  amplitude?: number;
  duration?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function FloatingElement({
  children,
  amplitude = 20,
  duration = 6,
  delay = 0,
  className,
  style,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      style={style}
      animate={{
        y: [-amplitude / 2, amplitude / 2, -amplitude / 2],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
