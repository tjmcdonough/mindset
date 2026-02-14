"use client";

import { useState, useCallback, useRef, type SyntheticEvent } from "react";
import { Button, Stack, Text } from "@mantine/core";
import { FormInput } from "./FormInput";
import { FormTextarea } from "./FormTextarea";
import { FormSuccessMessage } from "./FormSuccessMessage";
import { UrlInput, type UrlInputRef } from "./UrlInput";
import { type VerifyWebsiteResult } from "@/lib/domain-validation";
import classes from "../../website.module.css";

export interface FreeGrowthFormValues {
  companyName: string;
  domain: string;
  productUrl: string;
  additionalInfo: string;
}

interface FormErrors {
  companyName?: string;
  domain?: string;
  productUrl?: string;
  additionalInfo?: string;
}

export interface FreeGrowthFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const INITIAL_FORM_VALUES: FreeGrowthFormValues = {
  companyName: "",
  domain: "",
  productUrl: "",
  additionalInfo: "",
};

function validateForm(values: FreeGrowthFormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.companyName.trim()) {
    errors.companyName = "Company name is required";
  }

  if (!values.domain.trim()) {
    errors.domain = "Domain is required";
  }

  // Domain and Product URL validation is handled by UrlInput components

  return errors;
}

export function FreeGrowthForm({ onSuccess, onError }: FreeGrowthFormProps) {
  const [values, setValues] = useState<FreeGrowthFormValues>(INITIAL_FORM_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Set<keyof FreeGrowthFormValues>>(
    new Set(),
  );

  const domainInputRef = useRef<UrlInputRef>(null);
  const productUrlInputRef = useRef<UrlInputRef>(null);

  const handleChange = useCallback(
    (field: keyof FreeGrowthFormValues) =>
      (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setValues((prev) => ({ ...prev, [field]: newValue }));

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
    (field: keyof FreeGrowthFormValues) => () => {
      setTouched((prev) => new Set(prev).add(field));

      const fieldErrors = validateForm(values);
      if (fieldErrors[field]) {
        setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
      }
    },
    [values],
  );

  const handleDomainValidation = useCallback((result: VerifyWebsiteResult | null) => {
    if (result && !result.exists) {
      setErrors((prev) => ({ ...prev, domain: result.error || "Website not found" }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.domain;
        return next;
      });
    }
  }, []);

  const handleProductUrlValidation = useCallback((result: VerifyWebsiteResult | null) => {
    if (result && !result.exists) {
      setErrors((prev) => ({ ...prev, productUrl: result.error || "Website not found" }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.productUrl;
        return next;
      });
    }
  }, []);

  const handleSubmit = useCallback(
    async (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();

      // Validate domain with async verification
      const isDomainValid = await domainInputRef.current?.validate();

      // Validate product URL if provided
      let isProductUrlValid = true;
      if (values.productUrl.trim()) {
        isProductUrlValid = await productUrlInputRef.current?.validate() ?? true;
      }

      const formErrors = validateForm(values);
      if (Object.keys(formErrors).length > 0 || !isDomainValid || !isProductUrlValid) {
        setErrors(formErrors);
        setTouched(new Set(Object.keys(values) as (keyof FreeGrowthFormValues)[]));
        return;
      }

      setLoading(true);

      try {
        const response = await fetch("/api/free-growth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("Failed to submit form");
        }

        setSubmitted(true);
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
    field: keyof FreeGrowthFormValues,
  ): string | undefined => {
    return touched.has(field) ? errors[field] : undefined;
  };

  if (submitted) {
    return (
      <FormSuccessMessage
        title="Thank You!"
        description="The platform isn't quite ready for you to use yet, but we'll personally analyze your product and business. You'll receive: Company Seed, Product Status (UX feedback, improvements), Market Intel, Growth Voice, and Growth Pulse (stage diagnosis + what to do this week). We'll reach out within 24 hours with your complete analysis — completely free."
        onReset={() => setSubmitted(false)}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack gap="md">
        <Text size="lg" fw={600} ta="center" mb="xs">
          Get Your Free Product & Growth Analysis
        </Text>
        <Text size="sm" c="dimmed" ta="center" mb="md">
          The platform isn&apos;t quite ready yet, but we&apos;ll personally analyze your
          product AND growth strategy — what&apos;s working, what&apos;s broken, and what to
          fix first. Completely free.
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

        <UrlInput
          ref={domainInputRef}
          name="domain"
          label="Website Domain"
          placeholder="example.com"
          required
          value={values.domain}
          onChange={(val) => {
            setValues((prev) => ({ ...prev, domain: val }));
            if (errors.domain) {
              setErrors((prev) => {
                const next = { ...prev };
                delete next.domain;
                return next;
              });
            }
          }}
          enableVerification
          onValidationComplete={handleDomainValidation}
          error={getFieldError("domain")}
          disabled={loading}
        />

        <UrlInput
          ref={productUrlInputRef}
          name="productUrl"
          label="Product URL"
          placeholder="app.example.com"
          value={values.productUrl}
          onChange={(val) => {
            setValues((prev) => ({ ...prev, productUrl: val }));
            if (errors.productUrl) {
              setErrors((prev) => {
                const next = { ...prev };
                delete next.productUrl;
                return next;
              });
            }
          }}
          enableVerification
          onValidationComplete={handleProductUrlValidation}
          error={getFieldError("productUrl")}
          disabled={loading}
          description="Optional — Link to your actual product so we can review UX, identify what's working/missing, and suggest improvements"
        />

        <FormTextarea
          name="additionalInfo"
          label="Tell us about your goals"
          placeholder="What are your current challenges? What growth stage are you at? Any specific areas you'd like us to focus on?"
          minRows={8}
          value={values.additionalInfo}
          onChange={handleChange("additionalInfo")}
          onBlur={handleBlur("additionalInfo")}
          error={getFieldError("additionalInfo")}
          description="Optional — helps us provide more targeted insights"
        />

        <Button
          type="submit"
          size="lg"
          className={classes.ctaButton}
          loading={loading}
          mt="md"
        >
          Get Free Strategy
        </Button>

        <Text size="xs" c="dimmed" ta="center">
          No credit card required • No commitment • No sales calls
        </Text>
      </Stack>
    </form>
  );
}
