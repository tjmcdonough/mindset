# Growthmind Website — Project Rules

## Project Overview
- **Product**: Growthmind — an AI-powered growth strategy platform for startups
- **Stack**: Next.js 16, React 19, TypeScript, Mantine 8, Framer Motion, CSS Modules
- **Deployment**: Vercel (auto-deploy on push to `main`)
- **Package Manager**: Yarn 4 (via Corepack)
- **Dev Server**: `yarn dev` → `http://localhost:3001`

## Code Conventions

### General
- Always use TypeScript with strict types — no `any` unless absolutely necessary
- Use `'use client'` directive only on components that need browser APIs, hooks, or interactivity
- Keep server components as the default; push client boundaries as low as possible
- Use path aliases: `@/app/...` for imports

### Components
- Place reusable components in `app/components/`
- Use PascalCase for component files and names
- Use CSS Modules (`.module.css`) for styling — no inline styles, no Tailwind
- Use Mantine components for layout primitives (`Container`, `Stack`, `Group`, `Title`, `Text`, etc.)
- Use Framer Motion for animations — follow existing `whileInView` patterns
- Use `clsx` for conditional classnames
- Icons come from `@tabler/icons-react`

### Pages
- Each route has a `page.tsx` (server component) that exports `metadata`
- Interactive content lives in a separate `{Page}Client.tsx` with `'use client'`
- Always include OpenGraph + Twitter metadata
- Add new public pages to `app/sitemap.ts`

### Blog Posts
- Markdown files live in `blogs/{YYYY-MM-DD}/{slug}.md`
- Frontmatter requires: `title`, `date`, `author`
- Blog registry lives in `app/blogs/blog.data.ts`
- Writing tone: Confident, founder-to-founder, slightly provocative, no corporate jargon
- Author is always "Thomas McDonough" unless specified otherwise

## Git Conventions
- Use Conventional Commits: `feat:`, `fix:`, `style:`, `content:`, `chore:`, `refactor:`
- Subject line under 72 characters
- Never force-push to `main`

## Quality Gates
- `yarn lint` must pass (ESLint + TypeScript)
- `yarn build` must succeed before deploying
- Husky pre-commit hooks run lint-staged automatically

## Design Principles
- Premium, modern aesthetic — dark mode friendly
- Micro-animations for engagement (Framer Motion)
- Mobile-first responsive design
- SEO-first: every page needs proper metadata, semantic HTML, heading hierarchy
