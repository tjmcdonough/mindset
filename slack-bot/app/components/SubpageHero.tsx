"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Badge, Box, Container, Stack, Text, Title } from "@mantine/core";
import classes from "../website.module.css";

interface SubpageHeroBadge {
  /** Badge text content */
  text: string;
  /** Optional icon to display before text */
  icon?: ReactNode;
  /** Optional badge color (defaults to cyan) */
  color?: string;
}

interface SubpageHeroProps {
  /** Optional badge displayed above the title */
  badge?: SubpageHeroBadge;
  /** Hero title - supports ReactNode for gradient text */
  title: ReactNode;
  /** Subtitle/description text */
  subtitle: string;
  /** Optional CTA buttons or other actions */
  actions?: ReactNode;
  /** Minimum height of the hero section */
  minHeight?: number;
  /** Additional content below subtitle but above actions */
  children?: ReactNode;
}

/**
 * Reusable hero component for subpages (product, pricing, integrations, etc.).
 * Provides consistent styling with background effects and animations.
 *
 * @example
 * <SubpageHero
 *   badge={{ text: "Interrogation-First AI", icon: <IconBrain size={14} /> }}
 *   title={<>Everything You Need to <GradientText>Scale Growth</GradientText></>}
 *   subtitle="From market research to content publishing..."
 *   actions={
 *     <Group>
 *       <Button>Primary CTA</Button>
 *       <Button variant="outline">Secondary CTA</Button>
 *     </Group>
 *   }
 * />
 */
export function SubpageHero({
  badge,
  title,
  subtitle,
  actions,
  minHeight = 500,
  children,
}: SubpageHeroProps) {
  return (
    <Box className={classes.hero} style={{ minHeight, paddingTop: "120px" }}>
      {/* Background effects */}
      <div className={classes.gridBg} />
      <div className={classes.floatingOrb1} />
      <div className={classes.floatingOrb2} />

      <Container size="lg" className={classes.heroContent}>
        <Stack align="center" gap="xl">
          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                size="lg"
                variant="light"
                color={badge.color ?? "cyan"}
                leftSection={badge.icon}
              >
                {badge.text}
              </Badge>
            </motion.div>
          )}

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: badge ? 0.1 : 0 }}
          >
            <Title order={1} ta="center" className={classes.heroTitle}>
              {title}
            </Title>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: badge ? 0.2 : 0.1 }}
          >
            <Text size="xl" c="dimmed" ta="center" maw={700}>
              {subtitle}
            </Text>
          </motion.div>

          {/* Additional content */}
          {children}

          {/* Actions */}
          {actions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: badge ? 0.3 : 0.2 }}
            >
              {actions}
            </motion.div>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
