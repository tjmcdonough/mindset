# PRD: Replace "14-Day Strategy" with "Week Experiment" Messaging

**ClickUp Ticket:** [Create manually] | **Status:** Ready for Development | **Priority:** High
**Author:** AI-Generated | **Date:** 2026-02-04
**Type:** Enhancement / Messaging Rebrand

---

## Executive Summary

This PRD covers the comprehensive rebranding of Growthmind's website messaging from a "14-Day Action Plan/Strategy" model to a "Week Experiment" model. The change reflects a strategic pivot to better serve pre-product-market-fit (pre-PMF) founders who need fast validation cycles rather than prescriptive roadmaps.

The core shift is from **execution-focused language** ("roadmap", "action plan", "sprint") to **learning-focused language** ("experiment", "hypothesis", "validation", "signal"). This affects 7+ files across the website, including a significant visual component redesign.

**MVP Goal:** Update all website copy and visuals to reflect the "Week Experiment" positioning, emphasizing iterative learning loops over fixed plans.

## Problem Statement

**Current State:** The website messaging centers around a "14-Day Validation Sprint" with daily tasks and a prescriptive roadmap. This implies a fixed plan that founders execute over two weeks.

**Desired State:** Messaging reflects an iterative experiment model where founders run one focused experiment per week, test assumptions, get signal, and iterate. This better matches the reality of pre-PMF founders who need to learn fast, not execute a plan.

**Why This Matters:** Pre Product-Market Fit founders don't know what works yet. Giving them a 14-day plan implies we know what they should do—but we don't. The experiment model is honest: we help them discover what works through rapid iteration.

## Target Users

| Persona | Description | Key Needs |
|---------|-------------|-----------|
| Pre Product-Market Fit Founder | Early-stage founder searching for product-market fit | Fast feedback loops, hypothesis validation, avoiding wasted effort |
| Solo Indie Hacker | Building alone with limited resources | Clarity on what to test next, not a long to-do list |
| Technical Founder | Strong on product, weak on GTM | Framework for validating market assumptions |

**Technical Comfort Level:** Medium (can follow instructions, not necessarily marketers)

## Goals & Success Metrics

- **Primary Goal:** Align website messaging with the pre-PMF founder's reality: iterative learning, not prescriptive execution
- **Success Metrics:**
  - [ ] All "14 day" references removed from website
  - [ ] New "Week Experiment" messaging consistent across all pages
  - [ ] Visual timeline replaced with experiment loop visual
  - [ ] Copy reflects learning/discovery language throughout

## Scope

### ✅ In Scope (MVP)

**Core Functionality:**

- [ ] Update all "14-day" text references to "week experiment" messaging
- [ ] Replace 14-day timeline grid with experiment loop visual
- [ ] Update hero section features and CTAs
- [ ] Update pricing page FAQ and guarantees
- [ ] Update free tier description
- [ ] Update docs glossary terms
- [ ] Review and update any blog references (non-breaking, contextual)

**Technical:**

- [ ] Modify `HeroSection.tsx` - hero features and CTA button
- [ ] Modify `DeliverablePreviewSection.tsx` - complete redesign of timeline visual
- [ ] Modify `HomeClient.tsx` - CTA subtitle
- [ ] Modify `PricingClient.tsx` - FAQ items
- [ ] Modify `pricing.ts` - FREE_TIER and GUARANTEE constants
- [ ] Modify `DocsClient.tsx` - glossary term

### ❌ Out of Scope

- [ ] Blog post content rewrites (only update if reference is prominent)
- [ ] Backend/app changes (website only)
- [ ] New pages or sections
- [ ] SEO metadata changes (can be done separately)

## User Stories

### Primary Stories

1. **As a** pre-PMF founder visiting the homepage, **I want to** see messaging about experiments and validation, **so that** I understand Growthmind helps me learn what works rather than prescribe what to do.
   - _Example:_ Hero says "Run one focused experiment per week. Get signal. Find PMF faster."

2. **As a** founder evaluating pricing, **I want to** see a guarantee that matches my risk tolerance, **so that** I feel safe trying the product.
   - _Example:_ "7-day money-back guarantee" instead of 14-day.

3. **As a** founder on the homepage, **I want to** see a visual that represents iteration, **so that** I understand the product is about continuous learning, not a one-time plan.
   - _Example:_ Experiment loop visual (Define → Build → Measure → Learn → Repeat)

### Edge Cases

- **As a** returning visitor who saw the old messaging, **when** I return after the rebrand, **I expect** consistent new messaging without references to old "14-day" language.

## Functional Requirements

### Must Have (P0)

- [ ] Remove all "14-day", "14 day", "14-Day" text from website
- [ ] Replace hero feature "Clear 14-Day Validation Sprint" with "Focused Weekly Experiments"
- [ ] Replace CTA "See the 14-Day Plan" with "See How Experiments Work"
- [ ] Replace `DeliverablePreviewSection` timeline grid with experiment loop visual
- [ ] Update subtitle "Your 14-Day Growth Sprint" to "Your Weekly Experiment Cycle"
- [ ] Update pricing FAQ answers referencing 14-day
- [ ] Update guarantee from "14-day money-back" to "7-day money-back"
- [ ] Update free tier description

### Should Have (P1)

- [ ] Update section title "14-Day Action Plan" to "Week Experiment Framework"
- [ ] Update docs glossary term
- [ ] Review language throughout for "sprint", "roadmap" → "experiment", "hypothesis"

### Nice to Have (P2)

- [ ] Update blog post if reference is prominent in excerpt
- [ ] Add new supporting copy about experiment methodology

## Technical Approach

### Affected Files

| File | Changes | Impact |
|------|---------|--------|
| `app/components/HeroSection.tsx` | Update HERO_FEATURES array, CTA button text | High |
| `app/components/DeliverablePreviewSection.tsx` | Complete redesign - replace timeline grid with loop visual | High |
| `app/components/HomeClient.tsx` | Update WebsiteCTA subtitle | Medium |
| `app/pricing/PricingClient.tsx` | Update FAQ_ITEMS array (2 items) | Medium |
| `app/data/pricing.ts` | Update FREE_TIER.description, GUARANTEE.text | Medium |
| `app/docs/DocsClient.tsx` | Update glossary term | Low |
| `blogs/ideas/painkiller-vs-vitamin.md` | Review reference (optional) | Low |

### Architecture & Patterns

**Design Patterns:**
- Component-based React architecture
- Data constants in `/data/` folder for reusable content
- CSS Modules for styling (`website.module.css`)

**Key Principles:**
- Keep content in constants where possible for easier future updates
- Maintain existing animation patterns (framer-motion)
- Preserve responsive design behavior

### ESLint Compliance

**Module Boundaries:**
All changes are within the `website` directory - no cross-module concerns.

**Layer Restrictions:**
| File Location | Compliance |
|---------------|------------|
| `app/components/**` | ✅ UI layer - no restricted imports |
| `app/data/**` | ✅ Data constants - no restricted imports |

**Syntax Restrictions:**
- [ ] **No dynamic imports:** All imports remain static
- [ ] **Standard React patterns:** No new patterns introduced

### Database Changes

**None.** This is a website-only content change.

### API Changes

**None.** This is a website-only content change.

### Technology Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Next.js 16 | App Router |
| UI | Mantine v8 | Badge, Card, Grid, ThemeIcon components |
| Animation | framer-motion | Preserve existing animation patterns |
| Styling | CSS Modules | website.module.css |

## Security & Configuration

**No security considerations.** This is a content-only change with no authentication, API calls, or user data handling.

## Design Input

> **For Designers:** This section captures design requirements and considerations.

### Design Required?

- **Requires Design Work:** Yes - Partial
- **Design Type:** UI Enhancement (timeline → loop visual)

### Visual & Interaction Design

**UI Components Affected:**

- [ ] `DeliverablePreviewSection` - Replace 14-day grid with experiment loop
- [ ] Hero feature badges - Text update only
- [ ] CTA buttons - Text update only

**Design Considerations:**

- [ ] Experiment loop should communicate **iteration** (circular/cyclical visual)
- [ ] Four phases: Define → Build → Measure → Learn
- [ ] Should feel dynamic, not static (animation opportunity)
- [ ] Color coding can be preserved: research=cyan, strategy=violet, content=orange, execution=green

**Reference Designs:**

- Lean Startup "Build-Measure-Learn" loop
- PDCA (Plan-Do-Check-Act) cycle visualizations
- Existing site uses framer-motion animations - loop could animate through phases

### User Experience

**User Flow:**

1. User lands on homepage
2. Sees hero messaging about "experiments" and "validation"
3. Scrolls to deliverables section, sees loop visual (not 14-day grid)
4. Understands Growthmind = iterative learning, not prescriptive plan
5. CTAs invite them to "start first experiment"

**Edge Cases to Design For:**

- [ ] Mobile responsive: Loop visual should stack/simplify on mobile
- [ ] Animation: Should work without motion-reduced preference

### Design Questions

- [ ] Should the loop animate automatically, or on scroll/hover?
- [ ] Should we show example experiment content within the loop?
- [ ] Color scheme: Keep existing type colors or simplify to 2-3?

### Design Sign-off

- **Designer:** Not Assigned
- **Design Status:** [ ] Not Started
- **Design Artifacts:** None yet

---

## Enterprise Readiness

_This is a website-only content change with minimal enterprise impact._

### Module Boundaries & Ownership

- **Owning Team/Module:** Website / Marketing
- **Boundary Strategy:** Self-contained in `website/` directory
- **Cross-Module Needs:** None

### Onboarding & Discoverability

- [ ] Content constants in `/data/` are self-documenting
- [ ] Component names clearly indicate purpose
- [ ] No new patterns introduced

### Contract Stability

- [ ] No API contracts affected
- [ ] No breaking changes to component interfaces
- [ ] Internal data structure changes only

### Operational Readiness

- [ ] No logging required (static content)
- [ ] No error handling required
- [ ] Vercel deployment handles rollback if needed

### Scale Considerations

| Scenario | Consideration |
|----------|---------------|
| Future messaging changes | Content in `/data/` constants enables easy updates |
| A/B testing | Could split-test old vs new messaging via Vercel Edge Config |

### Feature Flags

- **Behind feature flag?** No - Direct replacement
- **Rollout strategy:** Deploy to production, monitor for issues

## Implementation Phases

### Phase 1: Content Updates (Text Changes)

**Goal:** Update all text references from 14-day to week experiment
**Deliverables:**

- [ ] Update `HeroSection.tsx` - HERO_FEATURES and CTA
- [ ] Update `HomeClient.tsx` - WebsiteCTA subtitle
- [ ] Update `PricingClient.tsx` - FAQ_ITEMS
- [ ] Update `pricing.ts` - FREE_TIER and GUARANTEE
- [ ] Update `DocsClient.tsx` - glossary term

**Validation:** `yarn eslint . --quiet` passes, no 14-day references in updated files

### Phase 2: Visual Redesign (DeliverablePreviewSection)

**Goal:** Replace 14-day timeline grid with experiment loop visual
**Deliverables:**

- [ ] Design new experiment loop visual (4 phases)
- [ ] Implement loop component with animations
- [ ] Update surrounding copy to match
- [ ] Ensure mobile responsiveness

**Validation:** Visual review, responsive testing

### Phase 3: Polish & Review

**Goal:** Ensure consistency and quality
**Deliverables:**

- [ ] Full-page review for any missed references
- [ ] Language consistency check (sprint→experiment, roadmap→hypothesis)
- [ ] Cross-browser testing
- [ ] Lighthouse performance check (no regression)

**Validation:** Manual QA pass

## Dependencies & Risks

### Dependencies

| Dependency | Type | Owner | Status |
|------------|------|-------|--------|
| Design approval for loop visual | Internal | Designer/Founder | Pending |

### Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Missed 14-day reference | Med | Low | Grep search before deployment |
| Loop visual complexity | Med | Med | Start simple, iterate |
| SEO impact from messaging change | Low | Low | Monitor organic traffic |

## Future Considerations

- [ ] A/B test new messaging vs. control
- [ ] Create dedicated "How Experiments Work" page
- [ ] Update app onboarding to match website messaging
- [ ] Create experiment templates/examples showcase

## Open Questions

- [ ] Should blog posts be updated? (Currently marked as optional)
- [ ] Exact loop visual design - 4 phases confirmed, animation TBD
- [ ] Any SEO considerations for URL/meta changes?

## Acceptance Criteria

### Functional Criteria

- [ ] Zero occurrences of "14-day", "14 day", "14-Day" in website source code
- [ ] Hero section shows "Focused Weekly Experiments" in features
- [ ] Hero CTA says "See How Experiments Work" (or approved alternative)
- [ ] Deliverables section shows experiment loop visual, not timeline grid
- [ ] Pricing FAQ reflects 7-day guarantee
- [ ] Free tier description updated
- [ ] Docs glossary updated

### Quality Criteria

- [ ] No TypeScript errors (`yarn typecheck` passes)
- [ ] No ESLint errors (`yarn eslint . --quiet` passes)
- [ ] Follows project conventions and patterns
- [ ] Mobile responsive maintained
- [ ] Animations work correctly

### UX Criteria

- [ ] Messaging feels cohesive across all pages
- [ ] Loop visual communicates iteration (not one-time plan)
- [ ] CTAs are clear and action-oriented

---

## Appendix: Detailed File Changes

### 1. `app/components/HeroSection.tsx`

**Current:**
```typescript
const HERO_FEATURES = [
  "Clear 14-Day Validation Sprint",
  "Diagnoses Before Prescriptions",
  "Purpose-Built System, Not a Prompt Toy",
];
```

**New:**
```typescript
const HERO_FEATURES = [
  "Focused Weekly Experiments",
  "Diagnoses Before Prescriptions",
  "Purpose-Built System, Not a Prompt Toy",
];
```

**CTA Button - Current:**
```tsx
See the 14-Day Plan
```

**CTA Button - New:**
```tsx
See How Experiments Work
```

### 2. `app/data/pricing.ts`

**Current:**
```typescript
export const FREE_TIER = {
  title: "Start for Free",
  description:
    "Get your business assessment, initial market research, and 14-day plan preview—no credit card required.",
  cta: "Start Free",
};

export const GUARANTEE = {
  text: "14-day money-back guarantee. No questions asked.",
};
```

**New:**
```typescript
export const FREE_TIER = {
  title: "Start for Free",
  description:
    "Get your business assessment, initial market research, and first experiment plan—no credit card required.",
  cta: "Start Free",
};

export const GUARANTEE = {
  text: "7-day money-back guarantee. No questions asked.",
};
```

### 3. `app/pricing/PricingClient.tsx` (FAQ_ITEMS)

**Item 2 - Current:**
> "You'll start with our onboarding flow where the AI asks you questions about your business. Within minutes, you'll have your Growth Profile created, initial market research completed, and a 14-day action plan generated."

**Item 2 - New:**
> "You'll start with our onboarding flow where the AI asks you questions about your business. Within minutes, you'll have your Growth Profile created, initial market research completed, and your first experiment plan generated. From there, the system helps you iterate weekly."

**Item 3 - Current:**
> "Yes, absolutely. We offer monthly billing with no long-term contracts. You can cancel anytime from your account settings. We also offer a 14-day money-back guarantee if you're not satisfied."

**Item 3 - New:**
> "Yes, absolutely. We offer monthly billing with no long-term contracts. You can cancel anytime from your account settings. We also offer a 7-day money-back guarantee if you're not satisfied."

### 4. `app/components/HomeClient.tsx`

**Current:**
```tsx
subtitle="Get your personalized 14-day growth plan in minutes. No credit card required."
```

**New:**
```tsx
subtitle="Run your first experiment this week. Get signal. Find product-market fit faster."
```

### 5. `app/components/DeliverablePreviewSection.tsx`

**Complete redesign required.** Replace:
- `FOURTEEN_DAY_PLAN` array with `EXPERIMENT_PHASES` array
- Timeline grid with loop/cycle visualization
- "14-Day Action Plan" title with "Week Experiment Framework"
- Day-based tasks with phase-based outcomes

**New Data Structure:**
```typescript
interface ExperimentPhase {
  phase: number;
  title: string;
  type: "define" | "build" | "measure" | "learn";
  description: string;
  outcomes: string[];
}

const EXPERIMENT_PHASES: ExperimentPhase[] = [
  {
    phase: 1,
    title: "Define",
    type: "define",
    description: "Identify your riskiest assumption",
    outcomes: ["Clear hypothesis", "Success criteria", "Falsifiable prediction"],
  },
  {
    phase: 2,
    title: "Build",
    type: "build",
    description: "Create minimum viable test",
    outcomes: ["Landing page", "Outreach campaign", "Prototype"],
  },
  {
    phase: 3,
    title: "Measure",
    type: "measure",
    description: "Collect real market signal",
    outcomes: ["Conversion data", "User feedback", "Behavioral insights"],
  },
  {
    phase: 4,
    title: "Learn",
    type: "learn",
    description: "Interpret results and decide next move",
    outcomes: ["Validated/invalidated hypothesis", "Next experiment", "Pivot or persevere"],
  },
];
```

### 6. `app/docs/DocsClient.tsx`

**Glossary Term - Current:**
```typescript
{
  term: "14-Day Action Plan",
  definition: "The tangible deliverable from your first strategy generation: a prioritized set of 15-25 tasks..."
}
```

**Glossary Term - New:**
```typescript
{
  term: "Week Experiment",
  definition: "A focused validation cycle: define your riskiest assumption, build a minimum viable test, measure real market signal, and learn what to do next. Repeat weekly until you find product-market fit."
}
```

---

_Generated on 2026-02-04_
