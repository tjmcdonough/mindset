# Growthmind - Website Project Instructions

## Quick Reference

Read `AGENTS.md` for the full project conventions, architecture, and coding standards. That file is the canonical source of truth for this project.

## Key Architecture Rules (from AGENTS.md)

- **Tech Stack**: Next.js 16, React 19.2, Mantine v8, TypeScript strict, Yarn
- **App-Like Features**: Focus on dynamic, responsive, and stateful interactions
- **Client/Server**: Client imports from `@/modules/[name]/client`, server from `@/modules/[name]`
- **No dynamic imports** — `await import()` is prohibited
- **CSS/UI**:
    - Use CSS-only interaction states where possible
    - `touch-action: manipulation` on tappable elements
    - Semantic tokens over raw values

## Validation Commands

```bash
yarn typecheck         # TypeScript check
yarn lint              # Lint check
```

## Available Commands

Run `/command-name` to invoke these workflows:
- `/prd` — Create a Product Requirements Document
- `/architect` — Generate Architecture Decision Document from PRD
- `/implement-prd` — Implement feature from PRD + ADD pair
- `/code-quality-review` — Review staged/uncommitted changes
- `/inngest-realtime-jobs` — Reference for real-time job progress pattern (Reference)

