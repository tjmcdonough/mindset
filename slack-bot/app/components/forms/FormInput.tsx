"use client";

import { TextInput, type TextInputProps } from "@mantine/core";

export interface FormInputProps extends Omit<
  TextInputProps,
  "classNames" | "styles"
> {
  /** Input name for form handling */
  name: string;
}

/**
 * Styled form text input with consistent website theming.
 * Wraps Mantine TextInput with pre-configured styles.
 */
export function FormInput({ name, ...props }: FormInputProps) {
  return (
    <TextInput
      name={name}
      {...props}
    />
  );
}
