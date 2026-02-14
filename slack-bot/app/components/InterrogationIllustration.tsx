"use client";

import { motion } from "framer-motion";
import { Box } from "@mantine/core";

export function InterrogationIllustration() {
  return (
    <Box
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: "600px", maxHeight: "400px" }}
      >
        {/* Background gradient circles */}
        <motion.circle
          cx="300"
          cy="200"
          r="120"
          fill="url(#gradient1)"
          opacity="0.1"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.circle
          cx="300"
          cy="200"
          r="80"
          fill="url(#gradient2)"
          opacity="0.15"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Central AI brain/processor */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Brain outline */}
          <motion.path
            d="M300 160 Q320 155 330 165 Q340 175 340 190 Q340 210 330 220 Q320 230 300 230 Q280 230 270 220 Q260 210 260 190 Q260 175 270 165 Q280 155 300 160 Z"
            stroke="url(#gradient3)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Neural network nodes inside brain */}
          {[
            { cx: 285, cy: 180 },
            { cx: 300, cy: 185 },
            { cx: 315, cy: 180 },
            { cx: 290, cy: 200 },
            { cx: 310, cy: 200 },
            { cx: 300, cy: 215 },
          ].map((node, i) => (
            <motion.circle
              key={i}
              cx={node.cx}
              cy={node.cy}
              r="3"
              fill="#00d9ff"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.g>

        {/* Question marks floating in - representing interrogation */}
        {[
          { x: 150, y: 100, delay: 0 },
          { x: 450, y: 120, delay: 0.3 },
          { x: 100, y: 250, delay: 0.6 },
          { x: 500, y: 280, delay: 0.9 },
        ].map((q, i) => (
          <motion.g
            key={i}
            initial={{ x: q.x, y: q.y - 50, opacity: 0 }}
            animate={{
              y: [q.y - 50, q.y, q.y],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: q.delay,
              times: [0, 0.3, 1],
            }}
          >
            <text
              x={q.x}
              y={q.y}
              fill="#7c3aed"
              fontSize="24"
              fontWeight="bold"
              opacity="0.6"
            >
              ?
            </text>
          </motion.g>
        ))}

        {/* Data particles flowing into the brain */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const startX = 300 + Math.cos(angle) * 200;
          const startY = 200 + Math.sin(angle) * 150;

          return (
            <motion.circle
              key={`particle-${i}`}
              r="2.5"
              fill="#00d9ff"
              initial={{ cx: startX, cy: startY, opacity: 0 }}
              animate={{
                cx: [startX, 300],
                cy: [startY, 195],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.25,
                ease: "easeIn",
              }}
            />
          );
        })}

        {/* Insight/signal bursts coming out */}
        {[
          { angle: -45, color: "#00d9ff", delay: 0 },
          { angle: 45, color: "#7c3aed", delay: 0.4 },
          { angle: 135, color: "#f59e0b", delay: 0.8 },
          { angle: 225, color: "#10b981", delay: 1.2 },
        ].map((burst, i) => {
          const rad = (burst.angle * Math.PI) / 180;
          const endX = 300 + Math.cos(rad) * 150;
          const endY = 200 + Math.sin(rad) * 100;

          return (
            <motion.g key={`burst-${i}`}>
              <motion.line
                x1="300"
                y1="200"
                x2={endX}
                y2={endY}
                stroke={burst.color}
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 1],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: burst.delay,
                  times: [0, 0.4, 1],
                }}
              />
              <motion.circle
                cx={endX}
                cy={endY}
                r="4"
                fill={burst.color}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.2, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: burst.delay + 0.3,
                }}
              />
            </motion.g>
          );
        })}

        {/* Analysis waves/rings */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`wave-${i}`}
            cx="300"
            cy="200"
            r="40"
            stroke="#00d9ff"
            strokeWidth="2"
            fill="none"
            opacity="0"
            animate={{
              r: [40, 100],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Gradients */}
        <defs>
          <radialGradient id="gradient1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00d9ff" />
            <stop offset="100%" stopColor="#7c3aed" />
          </radialGradient>
          <radialGradient id="gradient2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d9ff" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  );
}
