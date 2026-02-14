import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Global TypeScript rule adjustments
  {
    rules: {
      // Allow unused variables/args prefixed with underscore (common convention)
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },

  // Enable TS deprecation warnings
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: { project: true },
    },
    rules: {
      "@typescript-eslint/no-deprecated": "warn",
    },
  },

  // Prevent dynamic imports for consistent bundling
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "ImportExpression",
          message:
            "Dynamic imports are prohibited. Use static imports at the top of the file instead.",
        },
      ],
    },
  },

  // Global ignores
  globalIgnores([
    ".next/**",
    ".git/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    "yarn.lock",
  ]),
]);

export default eslintConfig;
