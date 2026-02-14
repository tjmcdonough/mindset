---
description: Safely refactor a component or module with type safety verification
---

## Steps

1. Identify the target component/module and understand its current usage:
   - Search for all imports/references across the codebase
   - Understand the prop interface and dependencies

2. Make the refactoring changes.

3. Update all call sites if the interface changed.

// turbo
4. Run `yarn typecheck` to catch any broken references.

// turbo
5. Run `yarn lint` to ensure code quality.

6. Verify the UI still renders correctly by checking `yarn dev` on affected pages.

7. Summarize what changed and why for the commit message.
