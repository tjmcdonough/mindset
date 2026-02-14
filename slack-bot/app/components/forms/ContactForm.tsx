"use client";

import { useState, useCallback, type SyntheticEvent } from "react";
import { Button, SimpleGrid, Stack } from "@mantine/core";
import {
  type ContactFormValues,
  INITIAL_FORM_VALUES,
} from "../../data/contact";
import { FormInput } from "./FormInput";
import { FormTextarea } from "./FormTextarea";
import classes from "../../website.module.css";

/** Form field validation errors */
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface ContactFormProps {
  /** Callback fired on successful submission */
  onSuccess?: () => void;
  /** Callback fired on submission error */
  onError?: (error: Error) => void;
}

/** Email validation regex */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates form values and returns errors object.
 * Returns empty object if all fields are valid.
 */
function validateForm(values: ContactFormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!values.subject.trim()) {
    errors.subject = "Subject is required";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
}

/**
 * Contact form with validation and error handling.
 * Handles form state internally with controlled inputs.
 */
export function ContactForm({ onSuccess, onError }: ContactFormProps) {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_FORM_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Set<keyof ContactFormValues>>(
    new Set(),
  );

  const handleChange = useCallback(
    (field: keyof ContactFormValues) =>
      (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setValues((prev) => ({ ...prev, [field]: newValue }));

        // Clear error when user starts typing
        if (errors[field]) {
          setErrors((prev) => {
            const next = { ...prev };
            delete next[field];
            return next;
          });
        }
      },
    [errors],
  );

  const handleBlur = useCallback(
    (field: keyof ContactFormValues) => () => {
      setTouched((prev) => new Set(prev).add(field));

      // Validate single field on blur
      const fieldErrors = validateForm(values);
      if (fieldErrors[field]) {
        setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
      }
    },
    [values],
  );

  const handleSubmit = useCallback(
    async (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();

      // Validate all fields
      const formErrors = validateForm(values);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        setTouched(new Set(Object.keys(values) as (keyof ContactFormValues)[]));
        return;
      }

      setLoading(true);

      try {
        // TODO: Replace with actual API call
        // await submitContactForm(values);
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setValues(INITIAL_FORM_VALUES);
        setErrors({});
        setTouched(new Set());
        onSuccess?.();
      } catch (error) {
        const err =
          error instanceof Error ? error : new Error("Submission failed");
        onError?.(err);
      } finally {
        setLoading(false);
      }
    },
    [values, onSuccess, onError],
  );

  const getFieldError = (
    field: keyof ContactFormValues,
  ): string | undefined => {
    return touched.has(field) ? errors[field] : undefined;
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack gap="md">
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <FormInput
            name="firstName"
            label="First Name"
            placeholder="Jane"
            required
            value={values.firstName}
            onChange={handleChange("firstName")}
            onBlur={handleBlur("firstName")}
            error={getFieldError("firstName")}
          />
          <FormInput
            name="lastName"
            label="Last Name"
            placeholder="Doe"
            required
            value={values.lastName}
            onChange={handleChange("lastName")}
            onBlur={handleBlur("lastName")}
            error={getFieldError("lastName")}
          />
        </SimpleGrid>

        <FormInput
          name="email"
          label="Email"
          placeholder="jane@startup.com"
          required
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          onBlur={handleBlur("email")}
          error={getFieldError("email")}
        />

        <FormInput
          name="subject"
          label="Subject"
          placeholder="I have a question about..."
          required
          value={values.subject}
          onChange={handleChange("subject")}
          onBlur={handleBlur("subject")}
          error={getFieldError("subject")}
        />

        <FormTextarea
          name="message"
          label="Message"
          placeholder="Tell us what's on your mind..."
          required
          minRows={5}
          value={values.message}
          onChange={handleChange("message")}
          onBlur={handleBlur("message")}
          error={getFieldError("message")}
        />

        <Button
          type="submit"
          size="lg"
          className={classes.ctaButton}
          loading={loading}
          fullWidth
          mt="md"
        >
          Send Message
        </Button>
      </Stack>
    </form>
  );
}
