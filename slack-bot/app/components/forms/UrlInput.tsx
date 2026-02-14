"use client";

import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { Box, Loader, TextInput, TextInputProps, Tooltip } from "@mantine/core";
import {
  IconCheck,
  IconAlertCircle,
  IconWorld,
} from "@tabler/icons-react";
import { validateDomain, verifyWebsiteExists, type VerifyWebsiteResult } from "@/lib/domain-validation";

type ValidationStatus = "idle" | "validating" | "valid" | "invalid";

export interface UrlInputProps extends Omit<TextInputProps, "onChange" | "value" | "error"> {
  /** Current URL/domain value */
  value: string;
  /** Called when value changes */
  onChange: (value: string) => void;
  /** External error (from parent, overrides internal) */
  error?: string | null;
  /** Called when async validation completes */
  onValidationComplete?: (result: VerifyWebsiteResult | null) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /**
   * Whether to enable async website verification on blur.
   * @default false
   */
  enableVerification?: boolean;
}

export interface UrlInputRef {
  /** Trigger validation programmatically. Returns true if valid. */
  validate: () => Promise<boolean>;
  /** Get current validation status */
  getStatus: () => ValidationStatus;
  /** Get last verification result */
  getLastResult: () => VerifyWebsiteResult | null;
}

/**
 * URL/Domain input with optional async website verification on blur.
 */
export const UrlInput = forwardRef<UrlInputRef, UrlInputProps>(function UrlInput(
  {
    value,
    onChange,
    error: externalError,
    onValidationComplete,
    disabled = false,
    enableVerification = false,
    ...props
  },
  ref
) {
  const [status, setStatus] = useState<ValidationStatus>("idle");
  const [internalError, setInternalError] = useState<string | null>(null);
  const lastResultRef = useRef<VerifyWebsiteResult | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Use external error if provided, otherwise internal
  const displayError = externalError ?? internalError;

  /**
   * Validate format only (synchronous)
   */
  const validateFormat = useCallback((input: string): string | null => {
    if (!input.trim()) return null;
    return validateDomain(input);
  }, []);

  /**
   * Full async validation: format + website exists
   */
  const runValidation = useCallback(
    async (input: string): Promise<boolean> => {
      const trimmed = input.trim();

      // Empty is valid
      if (!trimmed) {
        setStatus("idle");
        setInternalError(null);
        lastResultRef.current = null;
        onValidationComplete?.(null);
        return true;
      }

      // Check format first
      const formatError = validateFormat(trimmed);
      if (formatError) {
        setStatus("invalid");
        setInternalError(formatError);
        lastResultRef.current = null;
        onValidationComplete?.(null);
        return false;
      }

      // If verification is disabled, format validation is sufficient
      if (!enableVerification) {
        setStatus("valid");
        setInternalError(null);
        const result: VerifyWebsiteResult = { exists: true, domain: trimmed };
        lastResultRef.current = result;
        onValidationComplete?.(result);
        return true;
      }

      // Abort any pending request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      // Verify website exists
      setStatus("validating");
      setInternalError(null);

      try {
        const result = await verifyWebsiteExists(trimmed);
        lastResultRef.current = result;

        if (result.exists) {
          setStatus("valid");
          setInternalError(null);
          onValidationComplete?.(result);
          return true;
        } else {
          setStatus("invalid");
          setInternalError(result.error ?? "Website not found");
          onValidationComplete?.(result);
          return false;
        }
      } catch {
        setStatus("invalid");
        setInternalError("Could not verify website");
        lastResultRef.current = null;
        onValidationComplete?.(null);
        return false;
      }
    },
    [validateFormat, onValidationComplete, enableVerification]
  );

  /**
   * Handle input change - validate format only (instant)
   */
  const handleChange = useCallback(
    (newValue: string) => {
      onChange(newValue);

      // Reset state
      setInternalError(null);
      lastResultRef.current = null;

      if (!newValue.trim()) {
        setStatus("idle");
        return;
      }

      // Instant format check
      const formatError = validateFormat(newValue);
      if (formatError) {
        setStatus("invalid");
        setInternalError(formatError);
      } else {
        setStatus("valid");
      }
    },
    [onChange, validateFormat]
  );

  /**
   * Handle blur - run full async validation if enabled
   */
  const handleBlur = useCallback(() => {
    if (enableVerification) {
      runValidation(value);
    }
  }, [value, runValidation, enableVerification]);

  // Expose ref methods
  useImperativeHandle(
    ref,
    () => ({
      validate: () => runValidation(value),
      getStatus: () => status,
      getLastResult: () => lastResultRef.current,
    }),
    [runValidation, value, status]
  );

  // Icon size
  const iconSize = 18;

  // Right section content
  const getRightSection = () => {
    if (status === "validating") {
      return (
        <Tooltip label="Checking website..." withArrow>
          <Box>
            <Loader size={iconSize} />
          </Box>
        </Tooltip>
      );
    }

    if (status === "valid" && value.trim()) {
      const tooltipLabel = enableVerification ? "Website verified" : "Valid domain format";
      return (
        <Tooltip label={tooltipLabel} withArrow>
          <Box>
            <IconCheck size={iconSize} color="var(--mantine-color-green-6)" />
          </Box>
        </Tooltip>
      );
    }

    if (status === "invalid" && displayError) {
      return (
        <Tooltip label={displayError} withArrow>
          <Box>
            <IconAlertCircle size={iconSize} color="var(--mantine-color-red-6)" />
          </Box>
        </Tooltip>
      );
    }

    return (
      <Box>
        <IconWorld size={iconSize} style={{ color: "var(--mantine-color-dimmed)" }} />
      </Box>
    );
  };

  return (
    <TextInput
      value={value}
      onChange={(e) => handleChange(e.currentTarget.value)}
      onBlur={handleBlur}
      error={displayError}
      disabled={disabled}
      rightSection={getRightSection()}
      {...props}
    />
  );
});
