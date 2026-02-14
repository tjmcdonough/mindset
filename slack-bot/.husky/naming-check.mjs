import fs from "fs";
import path from "path";

// Settings
const ROOT_DIR = process.cwd();
const IGNORE_DIRS = ["node_modules", ".git", ".husky", ".next", "dist", "build", "public", "test-utils"];
const IGNORE_FILES = [".eslintrc.cjs", ".eslintrc.js", "eslint.config.js", "eslint.config.mjs", "eslint-plugin-naming-convention.cjs"];

// Special Next.js files that should be excluded from naming convention rules
const NEXTJS_SPECIAL_FILES = ["page.tsx", "page.ts", "layout.tsx", "layout.ts", "loading.tsx", "error.tsx", "not-found.tsx", "route.ts"];

// TSX files that are allowed to start with lowercase (React conventions)
const LOWERCASE_TSX_PATTERNS = [
  /^use[A-Z]/, // React hooks (useCallback, useState, etc.)
  /^context\.tsx$/, // React context files
];

// TSX files in these directories are allowed to start with lowercase
const LOWERCASE_TSX_DIRS = ["hooks", "context"];

let errors = [];

// Check if the first character is uppercase
function isFirstCharUppercase(name) {
  const firstChar = name.charAt(0);
  return firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase();
}

// Check if the first character is lowercase
function isFirstCharLowercase(name) {
  const firstChar = name.charAt(0);
  return firstChar === firstChar.toLowerCase() && firstChar !== firstChar.toUpperCase();
}

// Check if a TSX file is allowed to be lowercase
function isAllowedLowercaseTsx(fileName, relativePath) {
  // Check if file matches any lowercase pattern
  if (LOWERCASE_TSX_PATTERNS.some(pattern => pattern.test(fileName))) {
    return true;
  }

  // Check if file is in an allowed directory
  const parentDir = path.basename(path.dirname(relativePath));
  if (LOWERCASE_TSX_DIRS.includes(parentDir)) {
    return true;
  }

  return false;
}

// Process a file
function processFile(filePath, relativePath) {
  const fileName = path.basename(filePath);

  // Skip ignored files and dot files
  if (IGNORE_FILES.includes(fileName) || fileName.startsWith(".")) {
    return;
  }

  // Skip Next.js special files like page.tsx, layout.tsx, etc.
  if (NEXTJS_SPECIAL_FILES.includes(fileName)) {
    return;
  }

  if (fileName.endsWith(".tsx")) {
    // Allow lowercase TSX for hooks and context files
    if (!isFirstCharUppercase(fileName) && !isAllowedLowercaseTsx(fileName, relativePath)) {
      errors.push(`TSX file must start with a capital letter: ${relativePath}`);
    }
  } else if (fileName.endsWith(".ts")) {
    if (!isFirstCharLowercase(fileName)) {
      errors.push(`TS file must start with a small letter: ${relativePath}`);
    }
  }
}

// Process a directory
function processDirectory(dirPath, relativePath = "") {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    // Process entries
    for (const entry of entries) {
      const entryPath = path.join(dirPath, entry.name);
      const entryRelativePath = path.join(relativePath, entry.name);

      if (entry.isDirectory()) {
        // Skip directories in the ignore list
        if (!IGNORE_DIRS.includes(entry.name) && !entry.name.startsWith(".")) {
          processDirectory(entryPath, entryRelativePath);
        }
      } else if (entry.isFile()) {
        processFile(entryPath, entryRelativePath);
      }
    }
  } catch (err) {
    console.error(`Error processing directory ${dirPath}: ${err.message}`);
  }
}

// Start processing from the root directory
console.log("Checking file naming conventions...");
processDirectory(ROOT_DIR);

// Report errors
if (errors.length > 0) {
  console.error("\n❌ File naming convention check failed. Please fix the following issues before committing:");
  errors.forEach(error => console.error(`  - ${error}`));
  console.error("\nNaming conventions:");
  console.error("  🔹 TSX files must start with a capital letter (except hooks like useXxx.tsx and context.tsx)");
  console.error("  🔹 TS files must start with a small letter");
  process.exit(1);
} else {
  console.log("✅ File naming convention check passed.");
  process.exit(0);
}
