---
name: implement-prd
description: Implement a feature from PRD + Architecture Decision Document pair. Follows ADD implementation sequence, validates against acceptance criteria.
argument-hint: "[prd_path] [add_path] [phase=N]"
disable-model-invocation: true
---

# Implement: Execute PRD with Architecture

Implement a feature using an existing PRD and its Architecture Decision Document (ADD). The ADD provides the implementation sequence and architectural decisions; this skill executes them.

**Prerequisite Chain:** PRD → Architect → **Implement** (you are here)

**Input:** $ARGUMENTS — `[prd_path] [add_path]` and optionally `phase=N` (e.g., `docs/prds/01-02-26/feature.md docs/prds/01-02-26/add-feature.md phase=1`)

## Steps

### 1. Validate Dependencies

1. If paths not provided, list recent PRDs in `docs/prds/` and ask user to select
2. Verify both PRD and ADD exist and are valid
3. Check ADD status — warn if "Proposed" (not yet accepted)
4. Default to Phase 1 if no phase specified

### 2. Parse Documents

**From PRD:** Requirements, acceptance criteria, API contracts, DB changes, human acceptance test
**From ADD:** Selected architecture, core abstractions, module structure, implementation sequence, integration points

### 3. Display Implementation Plan

Show the ordered file list from the ADD and ask for user confirmation before coding.

### 4. Execute Implementation

For EACH file in sequence:

1. **Pre-check:** Read ADD spec, check if file exists, read related files
2. **Implement:** Follow ADD structure exactly, use specified interfaces/types, match codebase patterns, no `any` types, add JSDoc for public APIs
3. **Post-verify:** Check TypeScript errors, verify imports, ensure extraction guidelines followed
4. **Report progress** after each file

**Guidelines:**
- Extend base classes (if available)
- Atomic operations for concurrent updates
- Client imports from `@/modules/[name]/client`

### 5. Run Validation

```bash
yarn typecheck
yarn eslint . --quiet
```

Fix any failures before proceeding.

### 6. Verify Against Acceptance Criteria

Check all functional, quality, and architecture criteria from the PRD.

### 7. Run Human Acceptance Test

Guide the user through the acceptance test defined in the PRD. Wait for confirmation.

### 8. Output Report

```
## Implementation Complete

**Phase:** [N] of [total]
**Files Created/Modified:** [list with purposes]
**Validation:** TypeScript [PASS/FAIL], ESLint [PASS/FAIL]
**Acceptance Criteria:** [X/Y passing]

**Next Steps:**
1. Run `/implement-prd [paths] phase=[next]` for next phase
2. Run `/code-quality-review-pr` for independent review
3. Run `/enterprise-readiness-review` for scale verification
4. Create PR with `/ship`
```
