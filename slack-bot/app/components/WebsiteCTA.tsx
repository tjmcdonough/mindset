"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { IconArrowRight, IconBrain } from "@tabler/icons-react";
import {
  Box,
  Button,
  Card,
  Container,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { FadeInUp } from "./animations";
import classes from "../website.module.css";

interface CTAAction {
  /** Button label */
  label: string;
  /** Link href (optional - use onClick for custom handlers) */
  href?: string;
  /** Click handler (optional) */
  onClick?: () => void;
}

interface WebsiteCTAProps {
  /** Icon displayed at the top of the CTA */
  icon?: ReactNode;
  /** CTA headline */
  title: string;
  /** CTA description */
  subtitle: string;
  /** Primary action button configuration */
  primaryAction: CTAAction;
  /** Optional secondary action button */
  secondaryAction?: CTAAction;
  /** Style variant */
  variant?: "bordered" | "gradient";
  /** Whether to show background styling */
  withBackground?: boolean;
  /** Optional maximum width for subtitle */
  subtitleMaxWidth?: number;
}

/**
 * Reusable CTA section component for marketing pages.
 * Provides consistent styling for call-to-action sections.
 *
 * @example
 * <WebsiteCTA
 *   title="Ready to Automate Your Growth?"
 *   subtitle="Join teams who are scaling with AI-powered strategies."
 *   primaryAction={{ label: "View Pricing", href: "/pricing" }}
 *   secondaryAction={{ label: "Read the Docs", href: "/docs" }}
 * />
 */
export function WebsiteCTA({
  icon,
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  variant = "bordered",
  withBackground = false,
  subtitleMaxWidth = 500,
}: WebsiteCTAProps) {
  const cardStyle =
    variant === "gradient"
      ? {
          background:
            "linear-gradient(135deg, var(--website-card-bg) 0%, rgba(0, 217, 255, 0.08) 100%)",
          border: "1px solid var(--website-primary)",
        }
      : {
          background:
            "linear-gradient(135deg, var(--website-card-bg) 0%, rgba(0, 217, 255, 0.05) 100%)",
          border: "1px solid var(--website-primary)",
        };

  const renderPrimaryButton = () => {
    if (primaryAction.href) {
      const isExternal = primaryAction.href.startsWith("http");
      if (isExternal) {
        return (
          <Button
            component="a"
            href={primaryAction.href}
            size="lg"
            className={classes.ctaButton}
            rightSection={<IconArrowRight size={18} />}
          >
            {primaryAction.label}
          </Button>
        );
      }
      return (
        <Button
          component={Link}
          href={primaryAction.href}
          size="lg"
          className={classes.ctaButton}
          rightSection={<IconArrowRight size={18} />}
        >
          {primaryAction.label}
        </Button>
      );
    }

    return (
      <Button
        size="lg"
        className={classes.ctaButton}
        rightSection={<IconArrowRight size={18} />}
        onClick={primaryAction.onClick}
      >
        {primaryAction.label}
      </Button>
    );
  };

  const renderSecondaryButton = () => {
    if (!secondaryAction) return null;

    if (secondaryAction.href) {
      const isExternal = secondaryAction.href.startsWith("http");
      if (isExternal) {
        return (
          <Button
            component="a"
            href={secondaryAction.href}
            size="lg"
            variant="outline"
            className={classes.outlineButton}
          >
            {secondaryAction.label}
          </Button>
        );
      }
      return (
        <Button
          component={Link}
          href={secondaryAction.href}
          size="lg"
          variant="outline"
          className={classes.outlineButton}
        >
          {secondaryAction.label}
        </Button>
      );
    }

    return (
      <Button
        size="lg"
        variant="outline"
        className={classes.outlineButton}
        onClick={secondaryAction.onClick}
      >
        {secondaryAction.label}
      </Button>
    );
  };

  const content = (
    <FadeInUp>
      <Card
        padding={60}
        style={{
          ...cardStyle,
          textAlign: "center",
        }}
      >
        <Stack align="center" gap="xl">
          {/* Icon */}
          {icon !== null && (
            <ThemeIcon size={64} radius="xl" className={classes.logoIcon}>
              {icon || <IconBrain size={32} />}
            </ThemeIcon>
          )}

          {/* Title */}
          <Title order={2}>{title}</Title>

          {/* Subtitle */}
          <Text size="lg" c="dimmed" maw={subtitleMaxWidth}>
            {subtitle}
          </Text>

          {/* Actions */}
          <Group gap="md">
            {renderPrimaryButton()}
            {renderSecondaryButton()}
          </Group>
        </Stack>
      </Card>
    </FadeInUp>
  );

  if (withBackground) {
    return (
      <Box py={80} style={{ background: "var(--website-muted-bg)" }}>
        <Container size="md">{content}</Container>
      </Box>
    );
  }

  return (
    <Box py={100}>
      <Container size="md">{content}</Container>
    </Box>
  );
}
