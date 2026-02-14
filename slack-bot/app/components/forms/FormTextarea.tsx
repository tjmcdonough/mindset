"use client";

import { Textarea, type TextareaProps } from "@mantine/core";

export interface FormTextareaProps extends Omit<
  TextareaProps,
  "classNames" | "styles"
> {
  /** Input name for form handling */
  name: string;
}

/**
 * Styled form textarea with consistent website theming.
 * Wraps Mantine Textarea with pre-configured styles.
 */
export function FormTextarea({ name, ...props }: FormTextareaProps) {
  return (
    <Textarea
      name={name}
      {...props}
    />
  );
}
