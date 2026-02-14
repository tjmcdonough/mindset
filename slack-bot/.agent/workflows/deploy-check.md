---
description: Run pre-deployment checks (lint, typecheck, build) before pushing to Vercel
---

## Steps

// turbo
1. Run `yarn lint` to check for ESLint and TypeScript errors.

// turbo
2. Run `yarn build` to verify the production build succeeds.

3. If either step fails, diagnose and fix the errors.

4. Once all checks pass, confirm with the user before pushing:
   - `git push origin main` (or current branch)

5. Remind the user that Vercel will auto-deploy on push to `main`.
