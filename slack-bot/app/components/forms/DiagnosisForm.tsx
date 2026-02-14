"use client";

import { useState, useCallback, type SyntheticEvent } from "react";
import { Button, Stack, Text } from "@mantine/core";
import { FormInput } from "./FormInput";
import styles from "../../website.module.css";

export interface DiagnosisFormValues {
  companyName: string;
  websiteUrl: string;
  email: string;
  productUrl: string;
}

interface FormErrors {
  companyName?: string;
  websiteUrl?: string;
  email?: string;
}

export type DiagnosisFormProps = object;

const INITIAL_VALUES: DiagnosisFormValues = {
  companyName: "",
  websiteUrl: "",
  email: "",
  productUrl: "",
};

function validateForm(values: DiagnosisFormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.companyName.trim()) {
    errors.companyName = "Company name is required";
  }

  if (!values.websiteUrl.trim()) {
    errors.websiteUrl = "Website URL is required";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  return errors;
}

export function DiagnosisForm() {
  const [values, setValues] = useState<DiagnosisFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Set<keyof DiagnosisFormValues>>(
    new Set(),
  );

  const handleChange = useCallback(
    (field: keyof DiagnosisFormValues) =>
      (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setValues((prev) => ({ ...prev, [field]: newValue }));

        if (errors[field as keyof FormErrors]) {
          setErrors((prev) => {
            const next = { ...prev };
            delete next[field as keyof FormErrors];
            return next;
          });
        }
      },
    [errors],
  );

  const handleBlur = useCallback(
    (field: keyof DiagnosisFormValues) => () => {
      setTouched((prev) => new Set(prev).add(field));
      const fieldErrors = validateForm(values);
      if (fieldErrors[field as keyof FormErrors]) {
        setErrors((prev) => ({
          ...prev,
          [field]: fieldErrors[field as keyof FormErrors],
        }));
      }
    },
    [values],
  );

  const handleSubmit = useCallback(
    async (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formErrors = validateForm(values);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        setTouched(
          new Set(Object.keys(values) as (keyof DiagnosisFormValues)[]),
        );
        return;
      }

      setLoading(true);

      // Simulate API call / processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to no-code payment link
      // TODO: Replace with actual payment link
      window.location.href = "https://buy.stripe.com/test_placeholder";

      setLoading(false);
    },
    [values],
  );

  const getFieldError = (
    field: keyof DiagnosisFormValues,
  ): string | undefined => {
    return touched.has(field)
      ? errors[field as keyof FormErrors]
      : undefined;
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack gap="md">
        <Text size="lg" fw={600} ta="center" mb="xs">
          Get Your $10 Growth Diagnosis
        </Text>
        <Text size="sm" c="dimmed" ta="center" mb="md">
          18 AI agents will analyse your business and deliver a comprehensive
          diagnosis within 48 hours.
        </Text>

        <FormInput
          name="companyName"
          label="Company Name"
          placeholder="Acme Inc."
          required
          value={values.companyName}
          onChange={handleChange("companyName")}
          onBlur={handleBlur("companyName")}
          error={getFieldError("companyName")}
        />

        <FormInput
          name="websiteUrl"
          label="Website URL"
          placeholder="https://example.com"
          required
          value={values.websiteUrl}
          onChange={handleChange("websiteUrl")}
          onBlur={handleBlur("websiteUrl")}
          error={getFieldError("websiteUrl")}
        />

        <FormInput
          name="email"
          label="Email"
          placeholder="you@company.com"
          type="email"
          required
          value={values.email}
          onChange={handleChange("email")}
          onBlur={handleBlur("email")}
          error={getFieldError("email")}
        />

        <FormInput
          name="productUrl"
          label="Product URL"
          placeholder="https://app.example.com"
          value={values.productUrl}
          onChange={handleChange("productUrl")}
          onBlur={handleBlur("productUrl")}
          description="Optional — if your product lives at a different URL"
        />

        <Button
          type="submit"
          size="lg"
          className={styles.ctaButton}
          loading={loading}
          fullWidth
          mt="md"
        >
          Get Full Diagnosis — $10
        </Button>

        <Text size="xs" c="dimmed" ta="center">
          7-day money-back guarantee • Questions within 10 minutes • Full report ~30 minutes after you respond
        </Text>
      </Stack>
    </form>
  );
}
