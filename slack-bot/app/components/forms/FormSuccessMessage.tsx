"use client";

import type { ReactNode } from "react";
import { Button, Stack, Text, Title } from "@mantine/core";
import { ScaleIn } from "../animations";
import classes from "../../website.module.css";

export interface FormSuccessMessageProps {
  /** Success title text */
  title: string;
  /** Success description text */
  description: string;
  /** Button label for reset action */
  resetLabel?: string;
  /** Callback when user wants to send another message */
  onReset?: () => void;
  /** Optional icon or visual element */
  icon?: ReactNode;
  /** Container height */
  height?: number;
}

/**
 * Generic success message displayed after form submission.
 * Provides consistent styling with animation and optional reset action.
 */
export function FormSuccessMessage({
  title,
  description,
  resetLabel = "Send another message",
  onReset,
  icon,
  height = 400,
}: FormSuccessMessageProps) {
  return (
    <ScaleIn>
      <Stack align="center" justify="center" h={height} gap="md">
        {icon ?? (
          <div className={classes.badgeDot} style={{ width: 64, height: 64 }} />
        )}
        <Title order={3} mt="md">
          {title}
        </Title>
        <Text c="dimmed" ta="center">
          {description}
        </Text>
        {onReset && (
          <Button variant="light" onClick={onReset} mt="lg">
            {resetLabel}
          </Button>
        )}
      </Stack>
    </ScaleIn>
  );
}
