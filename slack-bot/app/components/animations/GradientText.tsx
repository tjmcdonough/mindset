"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface GradientTextProps {
  children: ReactNode;
  animate?: boolean;
  className?: string;
  colors?: string[];
}

export function GradientText({
  children,
  animate = true,
  className,
  colors = ["#00d9ff", "#7c3aed", "#f59e0b", "#00d9ff"],
}: GradientTextProps) {
  const gradientStyle = {
    background: `linear-gradient(90deg, ${colors.join(", ")})`,
    backgroundSize: animate ? "200% auto" : "100% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  if (!animate) {
    return (
      <span className={className} style={gradientStyle}>
        {children}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      style={gradientStyle}
      animate={{
        backgroundPosition: ["0% center", "200% center"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}
