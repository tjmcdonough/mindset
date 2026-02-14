"use client";

import type { ReactNode } from "react";
import { Stack, Text, Title } from "@mantine/core";
import { FadeInUp, GradientText } from "./animations";

interface SectionHeaderProps {
  /** Section title - can include GradientText for highlighted portions */
  title: ReactNode;
  /** Text to render with gradient effect (alternative to using GradientText in title) */
  highlightedText?: string;
  /** Optional subtitle displayed below the title */
  subtitle?: string;
  /** Text alignment */
  align?: "left" | "center";
  /** Maximum width of subtitle */
  subtitleMaxWidth?: number;
  /** Title heading level */
  order?: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Reusable section header component with gradient text support.
 * Provides consistent styling for section titles across marketing pages.
 *
 * @example
 * // With inline gradient text
 * <SectionHeader
 *   title={<>Core <GradientText animate>Features</GradientText></>}
 *   subtitle="Every capability exists to serve the experiment loop"
 * />
 *
 * @example
 * // With highlightedText prop
 * <SectionHeader
 *   title="Frequently Asked"
 *   highlightedText="Questions"
 *   align="center"
 * />
 */
export function SectionHeader({
  title,
  highlightedText,
  subtitle,
  align = "center",
  subtitleMaxWidth = 600,
  order = 2,
}: SectionHeaderProps) {
  // Build title with optional highlighted text
  const titleContent = highlightedText ? (
    <>
      {title} <GradientText animate>{highlightedText}</GradientText>
    </>
  ) : (
    title
  );

  return (
    <Stack align={align} mb={60}>
      <FadeInUp>
        <Title order={order} ta={align}>
          {titleContent}
        </Title>
      </FadeInUp>

      {subtitle && (
        <FadeInUp delay={0.1}>
          <Text size="lg" c="dimmed" ta={align} maw={subtitleMaxWidth}>
            {subtitle}
          </Text>
        </FadeInUp>
      )}
    </Stack>
  );
}
