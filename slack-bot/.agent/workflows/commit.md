---
description: Stage changes and create a conventional commit message
---

## Steps

// turbo
1. Run `git status` to see what has changed.

// turbo
2. Run `git diff --stat` to get a summary of changes.

3. Stage the appropriate files with `git add`. Use specific paths, not `git add .`, unless the user confirms staging everything.

4. Generate a commit message using **Conventional Commits** format:
   - `feat:` — new feature or blog post
   - `fix:` — bug fix
   - `style:` — CSS / styling changes
   - `content:` — blog or copy updates
   - `chore:` — tooling, config, dependencies
   - `refactor:` — code restructuring
   - Keep the subject line under 72 characters.
   - Add a body if the change is non-trivial.

5. Run `git commit -m "<message>"` with the generated message.

6. Ask the user if they want to push (do NOT auto-push).
