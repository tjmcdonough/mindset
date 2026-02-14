---
description: Create a new page following the existing Next.js 16 + Mantine architecture
---

## Steps

1. Ask for the page purpose and URL path if not provided.

2. Create the route directory and files:
   - `app/{route}/page.tsx` — Server component with metadata export
   - `app/{route}/{PageName}Client.tsx` — Client component with `'use client'` directive (if interactivity is needed)

3. Follow existing patterns:
   - Export `metadata` from `page.tsx` with `title`, `description`, `openGraph`, and `twitter` fields
   - Use `SubpageHero` component for the hero section (import from `@/app/components/SubpageHero`)
   - Use `WebsiteCTA` component before the footer if appropriate
   - Import shared CSS from `website.module.css` or create a new `{route}.module.css` file
   - Use Mantine components (`Container`, `Title`, `Text`, `Stack`, `Group`, etc.)
   - Use Framer Motion for animations (follow patterns in existing components)

4. Add the page to the sitemap in `app/sitemap.ts` if it's a public page.

5. Add navigation link in `app/components/Header.tsx` if it belongs in the main nav.

// turbo
6. Run `yarn typecheck` to verify no TypeScript errors.

7. Test locally with `yarn dev` and verify the page renders correctly at `http://localhost:3001/{route}`.
