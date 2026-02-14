---
description: Create a new reusable component following the existing Mantine + Framer Motion patterns
---

## Steps

1. Ask for the component's purpose and where it will be used if not clear.

2. Create the component file at `app/components/{ComponentName}.tsx`:
   - Use PascalCase naming
   - Add `'use client'` directive if it uses hooks, animations, or browser APIs
   - Use TypeScript with explicit prop interfaces
   - Use Mantine components for layout and typography
   - Use Framer Motion for scroll/entrance animations (follow `DiagnosisSection.tsx` or `HeroSection.tsx` patterns)
   - Use CSS Modules — either `website.module.css` for shared styles or create a co-located module

3. Follow the existing style conventions:
   - Props interface named `{ComponentName}Props`
   - Default export for the component
   - Use `clsx` for conditional class names
   - Import icons from `@tabler/icons-react`
   - Use the project's color palette (reference `app/theme.ts` and `app/globals.css`)

// turbo
4. Run `yarn typecheck` to verify.
