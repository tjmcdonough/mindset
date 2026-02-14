---
name: prd
description: Create a comprehensive Product Requirements Document from a GitHub issue or direct input. Includes discovery questions, codebase analysis, ESLint constraints, and enterprise readiness criteria.
argument-hint: "[issue-number or feature description]"
disable-model-invocation: true
---

# Create PRD

Generate a comprehensive Product Requirements Document (PRD) enriched with codebase context. Can be sourced from a GitHub issue or direct user input.

**Enterprise-First Mindset:** All features must be designed with enterprise scalability in mind - code should be ready for a 10-engineer team to maintain, extend, and onboard onto.

**Input:** $ARGUMENTS — Optional GitHub issue number (e.g., `42` or `#42`), or leave blank to describe the feature directly.

## Steps

### 1. Determine Input Source

1. **If a GitHub issue number is provided in $ARGUMENTS:**
   - Strip any `#` prefix
   - Use `gh issue view <number>` to fetch issue details
   - Extract: Title, Body, Labels, Assignees, Milestone, Comments

2. **If a feature description is provided (not a number):**
   - Use the provided text as the feature source

3. **If $ARGUMENTS is empty:**
   - Ask: "Would you like to provide a GitHub issue number or describe the feature directly?"

### 2. Requirements Discovery (Conversational)

Before generating the PRD, engage in discovery. This is NOT optional.

1. **Summarize understanding** (1-2 sentences)
2. **Ask 4-5 targeted questions** from these categories:
   - Problem & Context (what pain point, current workarounds)
   - Users & Scope (who uses it, segments, frequency)
   - Requirements (success criteria, must-haves vs nice-to-haves)
   - Technical (integrations, performance considerations)
   - UX & Design (UI placement, reference implementations, design input needed)
3. **Wait for responses** before proceeding
4. **Confirm understanding** with a brief summary, get user approval

### 3. Search Codebase Context

1. Search for related code — existing implementations, affected modules, patterns to follow
2. Check `docs/` for relevant architecture docs
3. Read `eslint.config.mjs` to extract module boundary rules, layer restrictions, client/server boundaries

### 4. Generate PRD

Create PRD with these sections:
- Executive Summary, Problem Statement, Target Users
- Goals & Success Metrics, Scope (In/Out), User Stories
- Functional Requirements (P0/P1/P2)
- Technical Approach (affected modules, architecture patterns, ESLint constraints, DB changes, API changes)
- Security & Configuration, Design Input
- Enterprise Readiness (10-engineer collaboration requirements)
- Implementation Phases (Foundation → Core → Polish)
- Dependencies & Risks, Future Considerations, Open Questions
- Human Acceptance Test, Acceptance Criteria (Functional + Quality + Enterprise + UX)

### 5. Save PRD

1. **Check for existing PRDs** in `docs/prds/` with similar names first
2. If from GitHub issue: `docs/prds/[DD-MM-YY]/gh-[issue_number]-[feature-slug].md`
3. If from direct input: `docs/prds/[DD-MM-YY]/[feature-slug].md`
4. Use kebab-case, create directory if needed

### 6. Output Confirmation

```
## PRD Created

**File:** `docs/prds/[path]`
**Feature:** [Name]
**Key Requirements (P0):** [top 3]
**Design Required:** [Yes/No/Partial]
**Open Questions:** [count]

**Next Steps:**
1. Review PRD for accuracy
2. Answer open questions
3. Run `/architect [prd-path]` to design architecture
```
