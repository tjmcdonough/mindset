"use client";

import { Group, Paper, Text } from "@mantine/core";
import { motion } from "framer-motion";
import type { ContactInfo } from "../data/contact";
import classes from "../website.module.css";

export interface ContactInfoCardProps {
  /** Contact information to display */
  contact: ContactInfo;
  /** Animation delay in seconds */
  delay?: number;
}

/**
 * Animated contact information card with hover effects.
 * Displays icon, title, and value as a clickable link.
 */
export function ContactInfoCard({ contact, delay = 0 }: ContactInfoCardProps) {
  const { icon: Icon, title, value, href } = contact;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      whileHover={{ x: 5 }}
    >
      <Paper
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        p="md"
        className={classes.featureCard}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
        }}
      >
        <Group>
          <Icon size={24} className={classes.checkIcon} />
          <div>
            <Text size="sm" c="dimmed">
              {title}
            </Text>
            <Text fw={500}>{value}</Text>
          </div>
        </Group>
      </Paper>
    </motion.div>
  );
}
