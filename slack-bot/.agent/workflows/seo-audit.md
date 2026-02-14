---
description: Audit SEO across all pages — metadata, sitemap, structured data, and accessibility
---

## Steps

1. Check all page routes in `app/` for proper `metadata` exports:
   - `title` — unique, descriptive, under 60 characters
   - `description` — compelling, under 160 characters
   - `openGraph` — title, description, URL, images
   - `twitter` — card type, title, description

2. Verify `app/sitemap.ts` includes all public routes and blog posts.

3. Check `app/robots.ts` for correct `allow`/`disallow` rules.

4. Review `app/components/JsonLd.tsx` for valid structured data (Organization, WebSite, Article schemas).

5. Check semantic HTML across pages:
   - Single `<h1>` per page
   - Proper heading hierarchy (h1 → h2 → h3, no skipped levels)
   - Use of semantic elements (`<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`)

6. Check all images for `alt` text.

7. Report findings as a checklist with ✅ / ❌ status.
