---
description: Create a new blog post with proper frontmatter, SEO metadata, and blog registry entry
---

## Steps

1. Ask for the blog topic/title if not provided.

2. Create the blog markdown file at `blogs/{YYYY-MM-DD}/{slug}.md` using today's date.
   - Use kebab-case for the slug (e.g. `why-pmf-matters.md`)
   - Include YAML frontmatter with: `title`, `date`, `author` (default: "Thomas McDonough")

3. Write the blog content following this structure:
   - Opening hook (1-2 paragraphs — bold, contrarian, or counterintuitive)
   - Problem framing (### heading)
   - Supporting stories / strategies (#### subheadings, real examples preferred)
   - Growthmind connection (tie it back to the product naturally, not salesy)
   - Closing CTA paragraph (punchy, memorable one-liner ending)

4. Add the new blog entry to `app/blogs/blog.data.ts`:
   - Add a new object to the `blogs` array with: `slug`, `title`, `date`, `description`, `readTime`, `category`
   - Keep the array sorted by date (newest first)

// turbo
5. Run `yarn typecheck` to verify no TypeScript errors were introduced.

6. Review the final post for tone: confident, founder-to-founder, slightly provocative. Avoid corporate jargon.
