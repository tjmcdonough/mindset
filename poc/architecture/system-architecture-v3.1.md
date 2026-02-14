# Growthmind — System Architecture v3.1

> **Status**: Draft — Architecture Decision Document
> **Date**: 2026-02-11
> **Supersedes**: `growthmind-architecture-v3.html` (visual reference), `LIVING_GROWTH_ENGINE_EVENT_ARCHITECTURE.md` (v2 event design)
> **Purpose**: Canonical target architecture for module boundaries, data ownership, event flows, and cross-cutting concern resolution

---

## Key Changes from v3

| Area | v3 Said | v3.1 Says | Why |
|---|---|---|---|
| Growth Voice | New module `modules/voice/` (Core) | **Growth Voice** (`modules/growth-voice/`) — **Foundation module** | Renamed from Growth Voice. Brand identity is read by nearly every module — same pattern as Company Seed. Cached, read by all. Evolves via core events (not circular — events decouple the upward flow). |
| Learnings | Core module `modules/learnings/` | **Removed** | Never used. Compounding knowledge concept may return later if needed. |
| Peer reads | Max 2 peer reads per core module | **Zero peer reads** — fully event-driven | Peer reads are still coupling. Core modules read Foundation cache + accumulate context from events. Zero runtime dependency between core modules. |
| Growth Experiments module | Separate modules: `hypotheses`, `execution`, `campaigns` | **Consolidated**: `modules/growth-experiments/` | Single source of truth for experiment lifecycle. Cleaner ownership, single agent, single event stream. |
| Orphan modules | ~15 modules unaccounted for | All modules classified — Platform + Feature categories | Nothing gets orphaned. Architecture extends cleanly. |
| Database | PostgreSQL / PlanetScale | **MongoDB** (DB-agnostic language preserved) | We use MongoDB + Mongoose v8. Diagrams stay DB-agnostic per AGENTS.md. |
| Directory structure | `domain/ → agents/ → events/ → queries/` | **Keep existing**: `domain/ → application/ → infrastructure/ → api/ → inngest/` | Matches MODULE_ARCHITECTURE_STANDARD.md. No change needed. |
| Event payloads | "Snapshot-first — events carry full data, consumers never query" | **Domain payloads + cached Foundation + accumulated context** | Snapshot-first creates reverse coupling. See Section 8 for full rationale. |

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Foundation Layer](#2-foundation-layer)
3. [Core Modules](#3-core-modules)
4. [Projection Layer](#4-projection-layer)
5. [Cross-Cutting Modules](#5-cross-cutting-modules)
6. [Platform Modules](#6-platform-modules)
7. [Feature Modules](#7-feature-modules)
8. [Cross-Cutting Concern Resolution (Event Strategy)](#8-cross-cutting-concern-resolution)
9. [Full Dependency Matrix](#9-full-dependency-matrix)
10. [Critical Event Paths](#10-critical-event-paths)
11. [Module Ownership Rules](#11-module-ownership-rules)
12. [Directory Structure](#12-directory-structure)
13. [Migration Path from Current State](#13-migration-path)
14. [Scaling Concerns](#14-scaling-concerns)

---

## 1. Architecture Overview

The system is composed of **4 architectural layers** plus 2 support categories. Data flows strictly downward through layers. No upward dependencies. No circular paths.

> **v3.1.1 Update**: Company Seed expanded to include Customer Intelligence — structured per-customer data (persona, problem, validation, traction, monetization) with enrichment tier tracking. See [Section 2.1](#21-company-seed).

```
┌──────────────────────────────────────────────────────────────────────┐
│                       INGESTION LAYER                                │
│  API Gateway · Onboarding Flow · User Actions · Webhooks · Cron     │
│  Stateless · Validates + emits events · Knows nothing about modules  │
└───────────────────────────────┬──────────────────────────────────────┘
                                │ emit events
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│                     INNGEST EVENT BUS                                 │
│  Idempotent handlers · At-least-once delivery · Fan-out routing      │
└───────────────────────────────┬──────────────────────────────────────┘
                                │ route to handlers
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│               FOUNDATION LAYER (Read by All, Written by Few)         │
│                                                                      │
│  ┌─────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────────┐  │
│  │Company Seed │ │Market Intel│ │Growth Voice│ │Strategic Assess│  │
│  │(identity +  │ │(external)  │ │(brand/ICP) │ │(derived ⚡)    │  │
│  │ customers)  │ │            │ │            │ │                │  │
│  └─────────────┘ └────────────┘ └────────────┘ └────────────────┘  │
│                                                                      │
│  All cached per-tenant. Core reads via cache. Zero runtime queries.  │
│  Seed=leaf. Intel reads Seed. Voice reads Seed+Intel.                │
│  Strategy=projection (events only). Core never queries Strategy.     │
└───────────────────────────────┬──────────────────────────────────────┘
                                │ core reads Foundation via query interface + cache
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│          CORE MODULES (Own Data, Own Agent, Own Events)              │
│                                                                      │
│        ┌───────────────┐   ┌────────────┐   ┌──────────────┐           │
│        │Growth         │   │Founder     │   │Audience Pulse│           │
│        │Experiments    │   │Mirror      │   │              │           │
│        └────────────┘   └────────────┘   └──────────────┘           │
│                                                                      │
│  Zero peer reads. Foundation cache only. Events in, events out.      │
└───────────────────────────────┬──────────────────────────────────────┘
                                │ emit domain events
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│          PROJECTION + CROSS-CUTTING LAYER                            │
│                                                                      │
│  ⚡ Growth Pulse    ⚡ Strategist Brief    ⚡ Activity Feed           │
│  ⚡ Content Library  ✦ Interrogation                                 │
│                                                                      │
│  Subscribe to events · Materialise read models · Never queried by    │
│  core or foundation                                                  │
└───────────────────────────────┬──────────────────────────────────────┘
                                │ persist to
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│                     INFRASTRUCTURE LAYER                              │
│  MongoDB · Vector Store · Cache (Redis/Upstash) · LLM Gateway ·     │
│  Inngest Queue · Multi-tenant isolation                              │
└──────────────────────────────────────────────────────────────────────┘
```

**Support categories** (outside the layered hierarchy):

- **Platform modules** — Auth, settings, billing, integrations. Available to all layers.
- **Feature modules** — Tasks, publishing, brain-dump, specialists. Serve core modules or the UI directly.

---

## 2. Foundation Layer

Foundation modules hold the company context that grounds all AI output. Data flows DOWN from here. Core modules read Foundation via query interfaces and cache. Core modules **never write** to Foundation.

### 2.1 Company Seed

> **Path**: `modules/company-seed/` (new — extracted from `onboarding` + `growth-voice`)
> **Collection**: `company_profiles`
> **Written**: Onboarding Steps 1–2. Enriched progressively via integrations, events, and founder input.
> **📋 Detailed Module Plan**: [COMPANY_SEED_MODULE.md](./COMPANY_SEED_MODULE.md) — Full schemas, agents, events, enrichment pipeline, caching, API, migration plan

Company Seed is the **unified identity root** — it captures both *who you are* (company identity) and *who your customers are* (structured customer intelligence). This is a single Foundation module because your understanding of your customers IS part of your identity.

#### Company Identity (static)

| Field | Description |
|---|---|
| Business idea | Core description of the business |
| Stage summary | Current stage (pre-revenue, post-revenue, etc.) |
| Founder summary | Background, strengths, experience |
| Founded/launch dates | Timeline anchors |
| Primary ICP | Initial customer profile (refined by Experiments + Audience over time) |
| Pain points | Customer pain points |
| Pivot indicators | Signals that a pivot has occurred |

#### Customer Intelligence (enriched progressively)

Structured intelligence about *your customers and their relationship to your product*. Composed of five sub-models, each with `DataPointMeta[]` tracking enrichment origin:

**PersonaIntelligence** — Role, company size, industry, geo

**ProblemIntelligence** — Pain point, trigger event, current workaround, urgency (`hair-on-fire | important | nice-to-have | unknown`)

**ValidationIntelligence** — Active users, aha moment, reaching aha (bool), time to first value, qualitative feedback, returning unprompted (bool)

**TractionIntelligence** — Acquisition source, unprompted referrals, feature requests

**MonetizationIntelligence** — Willingness to pay (`confirmed | signals | untested`), price point, buyer vs user, competitors considered, why chose you, why passed on

#### Composite Shape

```typescript
interface CompanySeed {
  // Identity
  businessIdea: string;
  stageSummary: string;
  founderSummary: string;
  foundedDate: Date;
  launchDate?: Date;
  primaryICP: string;
  painPoints: string[];
  pivotIndicators: string[];

  // Customer Intelligence
  customerIntelligence: {
    persona: PersonaIntelligence;
    problem: ProblemIntelligence;
    validation: ValidationIntelligence;
    traction: TractionIntelligence;
    monetization: MonetizationIntelligence;
  };
}
```

#### DataPointMeta — Enrichment Tier Tracking

Every customer intelligence field is tagged with **how it was sourced**, mapping directly to the [Data Enrichment Tiers](../../business/DATA_ENRICHMENT_TIERS.md):

```typescript
interface DataPointMeta {
  field: string;                                         // Which field this tracks
  source: "tier1_public" | "tier2_connected" | "tier3_founder";  // Enrichment tier
  sourceDetail: string;                                  // e.g., "LinkedIn", "Stripe", "onboarding conversation"
  confidence: "high" | "medium" | "low";                 // Data confidence level
  collectedAt: Date;
  expiresAt?: Date;                                      // For decaying data
}
```

**Enrichment strategy**:
- **Tier 1** (auto-enrichment): PersonaIntelligence (role, industry from LinkedIn), partial TractionIntelligence
- **Tier 2** (connected tools): ValidationIntelligence (activeUsers from analytics), TractionIntelligence (acquisitionSource from UTM), MonetizationIntelligence (pricePoint from Stripe)
- **Tier 3** (founder-only): ProblemIntelligence (urgency, triggerEvent), ValidationIntelligence (ahaMoment), MonetizationIntelligence (whyChoseYou, whyPassedOn)

**Dependencies**: None — leaf node, zero dependencies.

**Events emitted**:
- `company.seed_created` — After onboarding Steps 1–2 complete
- `company.seed_updated` — Founder edit or pivot event
- `company.customer_intel_enriched` — Customer intelligence data point added/updated (any tier)
- `company.validation_milestone` — Significant validation signal (e.g., key validation metric crosses threshold)

**Subscribes to** (for customer intelligence enrichment):
- `audience.high_value_signal` — Audience signal → potential customer intel data point
- `experiment.completed` — Experiment results may surface validation or traction insights
- `interrogation.checkpoint_answered` — Founder answers may surface Tier 3 customer data

**Caching strategy**: Cached in Redis/Upstash per-tenant. Invalidated on `company.seed_updated` or `company.customer_intel_enriched`. TTL: indefinite for identity fields; customer intelligence uses event-driven invalidation. Every core module and agent reads Seed from cache, not from DB.

---

### 2.2 Market Intelligence

> **Path**: `modules/market-intel/` (new — extracted from `onboarding` Steps 3/5 + `research`)
> **Collections**: `market_research`, `competitors`, `user_signals`
> **Written**: Onboarding Steps 3, 5. Periodic refresh (weekly/monthly scans).

| Field | Description |
|---|---|
| Domain analyzed | The market domain being tracked |
| Search results | 8–15 external search results per scan |
| Frustration themes | Patterns in customer frustration |
| Competitors | Competitor analysis with differentiation |
| Market signals | External signals about market movement |

**Dependencies**: Reads Company Seed (needs ICP + domain to know what to research).

**Agent**: MarketResearchAgent (AI — runs external research).

**Events emitted**:
- `market.research_completed` — After a research scan finishes
- `market.competitor_updated` — Competitor landscape changed
- `market.signal_detected` — New external market signal found

**Lifecycle**: Data decays over time. Freshness score tracks age. Weekly/monthly refresh cadence.

---

### 2.3 Growth Voice

> **Path**: `modules/growth-voice/` (renamed from `growth-voice/`)
> **Collection**: `growth_voices` (one document per org, versioned)
> **Agent**: GrowthVoiceAgent (AI — evolves identity based on evidence)

The living brand identity system. Contains:
- **BrandSection**: voice, personality traits, archetype, tone rules, forbidden patterns, audience-specific tone
- **MessagingSection**: one-liner, elevator pitch, brand story, value proposition pillars, positioning statement, taglines
- **ICPSection**: facets, personas, anti-persona, audience keywords
- **ProductSection**: features, JTBD, pricing, proof points

| Field | Description |
|---|---|
| Brand voice | How you should sound — personality, tone rules, forbidden patterns |
| Messaging | One-liner, elevator pitch, value props, positioning statement |
| ICP | Personas, facets, anti-persona, audience keywords |
| Product | Features, JTBD, pricing, proof points |
| Evolution log | `{ trigger, changes[], previous_version, date }` |

**Dependencies**: Reads Company Seed + Market Intel (needs identity + market context to ground voice).

**Subscribes to** (for evolution):
- `experiment.completed` (validated, messaging-related) — messaging that worked
- `audience.high_value_signal` — audience resonance pattern
- `interrogation.checkpoint_answered` (voice-related) — founder voice preference

**Events emitted**:
- `growth_voice.evolved` — Voice/messaging/ICP updated based on evidence
- `growth_voice.manual_update` — Founder edited directly

**Caching strategy**: Cached in Redis/Upstash per-tenant. Invalidated on `growth_voice.evolved` or `growth_voice.manual_update`. Every core module and agent reads Growth Voice from cache.

**Why Foundation, not Core?** Growth Voice is identity data — read by nearly every module (Experiments needs voice for asset generation, Specialists need it, Strategist Brief needs it). Like Company Seed but for brand identity. The "upward" event subscriptions from core modules are NOT circular — events decouple the flow. Core reads cache synchronously (downward). Core emits events (fire-and-forget). Voice handler picks up events asynchronously. Cache invalidated. Next core read gets updated voice.

---

### 2.4 Strategic Assessment

> **Path**: `modules/strategy/` (existing — refactored)
> **Collection**: `strategic_assessments` (materialised)
> **Type**: **Projection** — derived, not source-of-truth. Rebuildable from events.

| Field | Description |
|---|---|
| Demand scorecard | 6-dimension scoring |
| SWOT | Strengths, weaknesses, opportunities, threats |
| GO/NO_GO verdict | Actionability assessment |
| Positioning | Value proposition, messaging pillars |
| Channels | Primary channels, growth motion |
| Roadmap | Priorities, quick wins (30-day) |
| Red/yellow flags | Risk indicators |

**Dependencies**: Subscribes to events only. No runtime queries from core modules.

**Subscribes to**: `company.seed_created`, `market.research_completed`, `company.validation_milestone`, `experiment.completed`

**Agent**: StrategyAssessmentAgent (AI — rebuilds assessment when inputs change).

**Events emitted**: `strategy.assessment_updated`

**Critical rule**: Core modules **never** query Strategic Assessment. It serves the front-end and projection layer only. If a core module needs strategy context, it reads Foundation (Seed + Intel) and derives what it needs locally.

---

## 3. Core Modules

Core modules own their domain data, their agent, and their events. Each module operates independently. Delete any core module: events emit into void, other modules degrade gracefully.

**Zero peer reads.** Core modules read Foundation via cache and accumulate context from events they subscribe to. No core module ever queries another core module at runtime.

### Coupling Budget

| Resource | Budget |
|---|---|
| Foundation reads (cache) | Unlimited — shared context, like reading config |
| Peer reads (other core modules) | **Zero** — all cross-module data flows via events |
| Upward writes to Foundation | **Zero** — emit events, Foundation handlers decide |
| Projection queries | **Zero** — never query projections |
| Event subscriptions | Unlimited — subscribe to any domain event for accumulated context |

---

### 3.1 Growth Experiments

> **Path**: `modules/growth-experiments/` (new — consolidates `hypotheses`, `execution`, `campaigns`)
> **Collection**: `growth_experiments`
> **Agent**: GrowthExperimentAgent (AI)

**Foundation reads (cache)**: Company Seed, Market Intel, Growth Voice
**Peer reads**: None
**Subscribes to**: `audience.high_value_signal` (accumulates recent signals for experiment generation context)
**Events emitted**: `experiment.result_reported`, `experiment.completed`, `experiment.accepted`, `experiment.dismissed`

Full experiment lifecycle: suggested → accepted → running → completed/invalidated/dismissed. AI generates hypothesis, prepared assets, success thresholds. Founder executes and reports results.

**How it works without peer reads**: Growth Experiments reads Growth Voice from Foundation cache (voice, messaging, ICP for asset generation). It subscribes to `audience.high_value_signal` and stores relevant signals in its own `generation_context` field. When the weekly cron or refill triggers, it uses its own accumulated context — never queries Audience Pulse.

---

### 3.2 Founder Mirror

> **Path**: `modules/mirror/` (existing `modules/insights/` — renamed)
> **Collection**: `insights`
> **Agent**: InsightEvaluatorAgent (AI)

**Foundation reads (cache)**: Company Seed, Growth Voice
**Peer reads**: None
**Subscribes to**: `experiment.completed` (verdicts), `audience.high_value_signal` (patterns), `interrogation.checkpoint_answered` (founder signals)
**Events emitted**: `insight.surfaced`, `insight.responded`

Provocative insights and uncomfortable truths that challenge founder assumptions. The "hard look in the mirror."

**How it works without peer reads**: Mirror subscribes to events from Experiments and Audience. Each event carries enough domain data (verdict, hypothesis, signal details) for Mirror to evaluate whether an insight is warranted. Mirror accumulates a local context of recent experiment outcomes and audience patterns — never queries those modules.

---

### 3.3 Audience Pulse

> **Path**: `modules/audience/` (existing `modules/audience-intelligence/` — renamed)
> **Collections**: `signals`, `channels`
> **Agent**: AudienceScanAgent (Hybrid — AI + external APIs)

**Foundation reads (cache)**: Company Seed, Market Intel
**Peer reads**: None (leaf core module — zero dependencies on other core modules)
**Subscribes to**: (none from core — truly independent)
**Events emitted**: `audience.scan_completed`, `audience.high_value_signal`

Live audience signals from external platforms. Channel health monitoring. Pain-level detection. The purest core module — reads Foundation, scans externally, emits signals. No coupling to any other core module.

---

## 4. Projection Layer

Projections are **materialised read models**. They subscribe to events, accumulate state over time, and serve the front-end. Core modules and Foundation never query projections. Projections never query source modules — they build state from event payloads incrementally.

### 4.1 Growth Pulse ⚡

> **Path**: `modules/growth-pulse/` (new — renamed from `command-hero/`)
> **Collection**: `growth_pulses` (one document per organization, materialised)

**Subscribes to**: `experiment.completed`, `audience.*`, `strategy.assessment_updated`, `company.customer_intel_enriched`, `company.validation_milestone`
**Agent**: GrowthPulseMapper (Deterministic + AI summary)
**Serves**: Front-end dashboard. **The aha moment** — a single view that tells founders: *what's working, what needs work, and what to do next.*

#### The Three-Panel Dashboard

Growth Pulse materialises three diagnostic slices from cross-module events. This is the view that makes founders think: *"This platform actually understands where I am."*

| Panel | What It Shows | Data Sources |
|---|---|---|
| ✅ **What's Working** | Validated experiments, strong audience signals, confirmed willingness-to-pay, returning users, successful messaging | `experiment.completed` (positive verdicts), `audience.high_value_signal` (strong signals), `company.customer_intel_enriched` (monetization confirmed, users returning unprompted) |
| ⚠️ **What Needs Work** | Weak validation signals, untested assumptions, gaps in customer intelligence, unknown urgency levels, red/yellow flags | `company.customer_intel_enriched` (empty/low-confidence fields from `DataPointMeta`), `strategy.assessment_updated` (red/yellow flags, SWOT weaknesses), `experiment.completed` (negative verdicts) |
| 🎯 **What To Do Next** | Priority experiments to run, interrogation questions to answer, integrations to connect, specific actions from strategist | `experiment.accepted` (queued experiments), `strategy.assessment_updated` (priority actions, quick wins), `company.customer_intel_enriched` (gaps → actionable items: "validate product-market fit", "connect Stripe to validate WTP") |

**Key insight**: The "What Needs Work" panel isn't just about bad metrics — it's about **missing data**. `DataPointMeta` enrichment tracking tells us exactly which customer intelligence fields are `tier3_founder` (unknown) vs `tier2_connected` (inferred) vs `tier1_public` (confirmed). Missing knowledge becomes actionable: *"You haven't validated willingness-to-pay yet"* → connects to "What To Do Next" → *"Run this pricing experiment"* or *"Connect your Stripe account"*.

#### Materialised Document Shape

```typescript
interface GrowthPulse {
  orgId: string;
  lastUpdated: Date;

  // ✅ What's Working
  working: {
    validatedExperiments: { hypothesis: string; verdict: string; date: Date }[];
    strongSignals: { content: string; platform: string; painLevel: number }[];
    confirmedValidation: { field: string; value: any; confidence: string }[];
    summary: string; // AI-generated summary sentence
  };

  // ⚠️ What Needs Work
  needsWork: {
    failedExperiments: { hypothesis: string; keyLearning: string; date: Date }[];
    knowledgeGaps: { field: string; currentTier: string; actionToResolve: string }[];
    riskFlags: { flag: string; severity: 'red' | 'yellow' }[];
    untestedAssumptions: string[];
    summary: string; // AI-generated summary sentence
  };

  // 🎯 What To Do Next
  nextSteps: {
    priorityExperiment: { hypothesis: string; experimentId: string } | null;
    questionsToAnswer: { question: string; field: string }[];
    integrationsToConnect: { name: string; unlocksField: string }[];
    quickWins: string[];
    summary: string; // AI-generated summary sentence
  };

  // Meta
  overallStage: 'idea' | 'validation' | 'early-traction';
  confidenceScore: number; // 0-100, based on data completeness
}
```

#### How it works

Each event handler updates a slice of the materialised document:
- `experiment.completed` → update working/needsWork based on verdict; refresh nextSteps priority experiment
- `strategy.assessment_updated` → update risk flags, quick wins, stage diagnosis
- `audience.*` → update strong signals in working section
- `company.customer_intel_enriched` → update knowledge gaps (needsWork), confirmed validation (working), integrations to connect (nextSteps)
- `company.validation_milestone` → promote items from needsWork → working; refresh AI summaries

**The aha moment**: Founders see opinionated, diagnostic, prescriptive guidance in seconds — like a doctor saying *"your blood pressure is great, your cholesterol needs work, here's the prescription."* No other tool does this for pre-PMF companies.

---

### 4.2 Strategist Brief ⚡

> **Path**: `modules/strategist/` (new)
> **Collection**: `strategist_briefings` (one per generation, latest is active)

**Subscribes to**: `experiment.*`, `insight.*`, `audience.*`, `growth_voice.*`, `strategy.*`
**Agent**: StrategistBriefingAgent (AI)
**Serves**: Weekly briefing UI. The AI advisor memo — WHERE to focus and WHY.

> **📐 Architectural Note: Growth Pulse vs Strategist Brief**
>
> These two projections subscribe to many of the same events — this is intentional, not duplication. They serve **different user moments** from the same event stream:
>
> - **Growth Pulse** = the health dashboard. *"Where am I right now?"* Present-state, glanceable, diagnostic. Updates in real-time (5s debounce). Tells you **what**.
> - **Strategist Brief** = the weekly coach memo. *"Where should I focus and why?"* Forward-looking, narrative, opinionated. Generated weekly or on significant events. Tells you **why and how**.
>
> They must **never couple to each other** — no imports, no queries, no shared state. They independently materialise their own read models from event payloads. If they contradict each other, it's a bug in event handling, not architecture. Growth Pulse's "What To Do Next" panel is the *summary*; Strategist Brief is the *deep dive*. The front-end may link between them for UX continuity, but the modules remain fully independent.

---

### 4.3 Activity Feed ⚡

> **Path**: `modules/activity/` (existing)
> **Collection**: `activity_events`

**Subscribes to**: All significant domain events (task lifecycle, content lifecycle, strategy, insights, integrations, analytics).
**Serves**: Home page Execution Feed. Timeline of what the system has done.

**Reclassified**: Activity is a projection — it materialises a read model from cross-module events. It never owns source data.

---

### 4.4 Content Library ⚡

> **Path**: `modules/content-library/` (existing)
> **Type**: View module — read-only aggregation, no database entity of its own

**Aggregates from**: Tasks (generated content) + Publishing (publication records)
**Serves**: Content management UI with filters, search, publishing status.

---

## 5. Cross-Cutting Modules

### 5.1 Interrogation ✦

> **Path**: `modules/interrogation/` (existing)
> **Collection**: `checkpoints`
> **Agent**: HardQuestionGenAgent (AI)
> **Type**: Side-channel — killable. Remove it and zero impact on core.

**Subscribes to**: `experiment.*`, `audience.*`, `growth_voice.evolved`, `strategy.assessment_updated`, `market.research_completed`
**Re-entry**: `checkpoint.answered` → feeds Growth Voice evolution (founder voice preference) and Founder Mirror (founder signal)

The Interrogation Layer reads domain event output + context, then decides whether a question is warranted. It uses `BaseInterrogationAgent` and shared streaming infrastructure. All modules decouple interrogation via event subscription — no module embeds interrogation logic.

---

## 6. Platform Modules

Platform modules provide cross-cutting infrastructure. They sit **outside** the Foundation/Core/Projection hierarchy and are available to all layers. They do not participate in the domain event bus (they have their own lifecycle).

| Module | Path | Purpose |
|---|---|---|
| **Auth** | `modules/auth/` | PropelAuth integration, user/org context |
| **OAuth2** | `modules/oauth2/` | OAuth flows for third-party integrations |
| **Settings** | `modules/settings/` | User preferences, UI configuration |
| **Subscriptions** | `modules/subscriptions/` | Billing, plan management, feature gates |
| **Push Subscriptions** | `modules/push-subscriptions/` | Browser push notifications |
| **Integrations** | `modules/integrations/` | Third-party connector management (Slack, analytics, etc.) |
| **Analytics** | `modules/analytics/` | Platform-level analytics tracking |
| **Platform Analytics** | `modules/platform-analytics/` | Platform metrics and reporting |

**Rules**:
- Platform modules may be imported by any layer
- Platform modules never import domain modules (Foundation, Core, Projection)
- Platform modules have their own collections and lifecycle
- No coupling budget applies — they are infrastructure

---

## 7. Feature Modules

Feature modules provide specific product capabilities. They serve core modules, projections, or the UI directly. They follow the same MODULE_ARCHITECTURE_STANDARD but sit alongside core modules, not inside them.

| Module | Path | Serves | Notes |
|---|---|---|---|
| **Tasks** | `modules/tasks/` | Experiments, Content Library | Execution engine. Content generation + task lifecycle. |
| **Publishing** | `modules/publishing/` | Content Library | Publication records, scheduling, platform publishing |
| **Brain Dump** | `modules/brain-dump/` | Mirror, Growth Voice (via events) | User signal ingestion. Categorised → `brain_dump.categorized` → feeds Mirror insights and Voice evolution |
| **Feedback** | `modules/feedback/` | Mirror (via events) | User feedback. `feedback.response_received` → signal/noise classification |
| **Specialists** | `modules/specialists/` | UI, Growth Voice | AI growth specialists. Consume Growth Voice from Foundation cache for voice context. |
| **Assistant** | `modules/assistant/` | UI | AI chat interface. Cross-cutting tool. |
| **AI Prompts** | `modules/ai-prompts/` | All agents | Prompt management infrastructure |
| **Integration Content** | `modules/integration-content/` | Content Library, Audience | Content from third-party integrations |
| **Review** | `modules/review/` | UI | Weekly review interface |
| **YC Assessment** | `modules/yc-assessment/` | Standalone | YC application assessment tool |
| **Onboarding** | `modules/onboarding/` | Foundation (Seed, Intel, Strategy) | Onboarding flow — writes to Foundation modules |
| **Onboarding Assessment** | `modules/onboarding-assessment/` | Foundation (Strategy) | Assessment during onboarding |
| **Onboarding Overlay** | `modules/onboarding-overlay/` | UI | Onboarding UI overlay |
| **Assessment** | `modules/assessment/` | Strategic Assessment (data source) | Assessment computation |
| **Channels** | `modules/channels/` | Audience Pulse (data source) | Channel management |
| **Hypotheses** | `modules/hypotheses/` | Experiments (data source) | Hypothesis tracking |
| **Execution** | `modules/execution/` | Experiments (data source) | Experiment execution |
| **Campaigns** | `modules/campaigns/` | Experiments (data source) | Campaign management |
| **Strategy History** | `modules/strategy-history/` | Strategic Assessment (audit) | Strategy change history |

**Rules**:
- Feature modules follow MODULE_ARCHITECTURE_STANDARD
- Feature modules may read from Foundation (via cache)
- Feature modules communicate with Core modules via events only (same zero-peer-reads rule)
- Feature modules never query Projections
- Feature modules participate in the event bus when they emit domain-significant events

---

## 8. Cross-Cutting Concern Resolution

### The Problem

Modules need data from other modules. Three failed approaches:
1. **Snapshot payloads** — events carry everything all consumers need → reverse coupling, schema bloat
2. **Peer query interfaces** — modules call each other at runtime → still coupling, delete a peer and consumers break
3. **God object** — one giant shared context → monolith in disguise

### The Solution: Two Mechanisms Only

**Foundation data → Cache.** Core module context → Accumulated from events.

No peer reads. No query interfaces between core modules. No fat event payloads.

### 8.1 Foundation Data → Cached Per-Tenant

All four Foundation modules are cached in Redis/Upstash. Every core module, projection, and agent reads Foundation from cache. Near-zero latency. Zero coupling.

```
┌─────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────────┐
│Company Seed │  │Market Intel│  │Growth Voice│  │Strategic Assess│
│(+ customer  │  │(MongoDB)   │  │(MongoDB)   │  │(MongoDB)       │
│ intelligence)│  │            │  │            │  │                │
│(MongoDB)    │  │            │  │            │  │                │
└──────┬──────┘  └─────┬──────┘  └─────┬──────┘  └───────┬────────┘
       │               │               │                  │
       │  on change    │  on change    │  on change       │  on change
       ▼               ▼               ▼                  ▼
┌──────────────────────────────────────────────────────────────────┐
│                    Redis/Upstash Cache                            │
│            Per-tenant. Invalidate on change events.              │
└──────────────────────────────┬───────────────────────────────────┘
                               │ read (near-zero latency)
              ┌────────────────┼────────────────┐
              ▼                ▼                 ▼
        Experiments      Founder Mirror    Audience Pulse
        (+ its agent)    (+ its agent)     (+ its agent)
```

| Foundation Module | Cache Invalidation Event | TTL | Mutation Rate |
|---|---|---|---|
| Company Seed | `company.seed_updated`, `company.customer_intel_enriched` | Indefinite (identity) / event-driven (customer intel) | Rarely for identity; progressive for customer intel |
| Market Intel | `market.research_completed` | 7 days | Weekly/monthly |
| Growth Voice | `growth_voice.evolved`, `growth_voice.manual_update` | Indefinite | On evidence (experiments, audience signals) |
| Strategic Assessment | `strategy.assessment_updated` | 1 day | On Foundation or experiment changes |

- **Write path**: Module writes to DB → emits change event → cache invalidated
- **Read path**: Any module/agent reads from cache (not DB, not event payload)
- **Fallback**: On cache miss, read from DB and populate cache.

#### 8.1.1 Upstash Caching Implementation

See [docs/CACHING_STRATEGY.md](../../CACHING_STRATEGY.md) for comprehensive caching patterns, invalidation, and Upstash usage.

**Quick reference**:

| Concern | Details |
|---|---|
| **Cache keys** | Format: `org:{org_id}:{module-name}`. Always include `org_id` for multi-tenant isolation. |
| **Invalidation** | Event-driven: Change event → Inngest handler → `redis.del(key)`. TTL as fallback. |
| **Read pattern** | Try cache → on miss, read DB → populate cache → return. Transparent fallback to DB on Upstash failure. |
| **Client** | Use `REDIS_URL` (protocol) in Node.js for 5-20ms latency. Use REST API (`KV_REST_API_URL`) in Edge Functions. |
| **Multi-tenancy** | Every key includes `org_id`. Scan and delete with pattern matching on org deletion. |
| **TTL policy** | Company Seed, Growth Voice: indefinite (events only). Market Intel: 7d. Strategic Assessment: 1d + events. |

**Example**: Reading Company Seed from cache

```typescript
async function getCompanySeed(orgId: string) {
  const redis = await getRedisClient();
  const cacheKey = `org:${orgId}:company-seed`;

  // Try cache
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // Cache miss → DB
  const seed = await companySeedRepository.findByOrgId(orgId);

  // Populate cache (best effort)
  await redis.set(cacheKey, JSON.stringify(seed), { ex: 86400 * 365 });

  return seed;
}
```

### 8.2 Cross-Module Context → Accumulated From Events

When a core module needs context from another core module (e.g., Experiments needs recent audience signals), it **subscribes to that module's events and accumulates context locally**.

```
audience.high_value_signal arrives:
  { signal_id, content_snippet, intent, pain_level, platform, user_id, org_id }

Experiments handler:
  1. Read OWN experiments generation_context for this org
  2. Append signal to recent_audience_signals array (keep last 10)
  3. Save back

Weekly cron fires → Experiments generates new batch:
  1. Read Foundation cache (Seed, Intel, Voice)
  2. Read OWN generation_context (has accumulated audience signals)
  3. Generate experiments using all context
  4. Never queries Audience Pulse module
```

**The pattern**: Every module that needs cross-module context maintains its own accumulated view, just like projections do. The difference: projections accumulate for the front-end, core modules accumulate for their own agent/service logic.

```
experiment.completed arrives:
  { experiment_id, hypothesis, verdict, metrics, key_learning, user_id, org_id }

Founder Mirror handler:
  1. Read OWN recent_experiment_context for this org
  2. Store verdict + hypothesis (keep last 20)
  3. Evaluate: does this pattern warrant an insight?
  4. If yes → create insight, emit insight.surfaced
  5. Never queries Experiments module
```

### 8.3 What Goes In Event Payloads

Events carry the **producing module's domain data** — what changed and why. Enough for any subscriber to update its own accumulated state.

- ✅ `experiment.completed { experiment_id, hypothesis, verdict, metrics, key_learning, user_id, org_id }`
- ✗ `experiment.completed { experiment_id }` — forces consumer to query Experiments
- ✗ `experiment.completed { ...experiment, ...companySeed, ...growthVoice }` — reverse coupling

### Decision Matrix

| Data Source | Resolution | Latency | Coupling |
|---|---|---|---|
| Company Seed | **Foundation cache** | Near-zero | Zero |
| Market Intel | **Foundation cache** | Near-zero | Zero |
| Growth Voice | **Foundation cache** | Near-zero | Zero |
| Strategic Assessment | **Foundation cache** (front-end) or **event** (projections) | Near-zero | Zero |
| Another core module's data | **Accumulated from events** into own storage | Zero (already local) | Zero (event-driven) |
| Current event's domain data | **Event payload** (domain-scoped) | Zero (in payload) | Producer-scoped only |

**Result**: Every module is self-contained at runtime. Delete any core module → its events stop arriving → other modules stop getting fresh context from that module but never error out. The strongest possible independence test.

---

## 9. Full Dependency Matrix

Read left→right: "Row depends on Column."

| ↓ depends on → | Seed | Intel | Voice | Experiments | Mirror | Audience | Event Bus | DB |
|---|---|---|---|---|---|---|---|---|
| **Company Seed** | — | — | — | subscribes | — | subscribes | emits | CRITICAL |
| **Market Intel** | cache | — | — | — | — | — | emits | CRITICAL |
| **Growth Voice** | cache | cache | — | subscribes | — | subscribes | emits | CRITICAL |
| **Strategy Assess ⚡** | subscribes | subscribes | — | subscribes | — | — | CRITICAL | CRITICAL |
| **Growth Experiments** | cache | cache | cache | — | — | subscribes | emits | CRITICAL |
| **Founder Mirror** | cache | — | cache | subscribes | — | subscribes | emits | CRITICAL |
| **Audience Pulse** | cache | cache | — | — | — | — | emits | CRITICAL |
| **Growth Pulse ⚡** | via event | — | — | via event | — | via event | CRITICAL | CRITICAL |
| **Strategist ⚡** | via event | via event | via event | via event | via event | via event | CRITICAL | CRITICAL |
| **Activity ⚡** | — | — | — | via event | via event | via event | CRITICAL | CRITICAL |
| **Interrogation ✦** | — | via event | via event | via event | — | via event | CRITICAL | CRITICAL |

**Key**:
- **cache** = Foundation read via Redis/Upstash cache (zero coupling — like reading config)
- **subscribes** = Subscribes to events, accumulates context locally (zero runtime coupling)
- **via event** = Projection event subscription (materialises own read model)
- **emits** = Produces events to bus
- **CRITICAL** = Hard infrastructure dependency

> **Note**: Company Seed now subscribes to `experiment.completed` and `audience.high_value_signal` for customer intelligence enrichment. This is the same decoupled event pattern used by Growth Voice — events flow up asynchronously, cache reads flow down synchronously. No circular dependencies.

### Zero Peer Reads Verification

| Core Module | Foundation Cache | Event Subscriptions | Peer Reads | Status |
|---|---|---|---|---|
| Growth Experiments | Seed, Intel, Voice | `audience.high_value_signal` | **0** | ✅ Self-contained |
| Founder Mirror | Seed, Voice | `experiment.completed`, `audience.high_value_signal` | **0** | ✅ Self-contained |
| Audience Pulse | Seed, Intel | (none) | **0** | ✅ Leaf module |

### Foundation Internal Dependencies

| Foundation Module | Reads (cache) | Event Subscriptions | Type |
|---|---|---|---|
| Company Seed | (none — leaf) | `experiment.completed`, `audience.high_value_signal`, `interrogation.checkpoint_answered` (for customer intel enrichment) | Source of truth + evolving customer intelligence |
| Market Intel | Seed | (none) | Source of truth |
| Growth Voice | Seed, Intel | `experiment.completed`, `audience.high_value_signal`, `interrogation.checkpoint_answered` | Evolving identity |
| Strategic Assessment | (none at runtime) | `company.seed_created`, `market.research_completed`, `company.validation_milestone`, `experiment.completed` | Projection |

---

## 10. Critical Event Paths

### Path A: Onboarding Complete (cold start — user is waiting)

```
User completes onboarding
  → Seed: profile written (Steps 1–2) + Tier 1 auto-enrichment of customer intel → cached
    → Intel: research runs (Steps 3, 5) → cached
      → Voice: initial identity seeded → cached
        → Strategy: assessment built (Steps 4, 6–8) → cached
          → Then parallel:
              Experiments: first batch generated (reads all Foundation from cache)
              ⚡ Growth Pulse: materialised
              ⚡ Strategist Brief: first briefing
```

Foundation builds serial (Seed → Intel → Voice → Strategy). Core modules fan out parallel after.
**Latency-sensitive**: Consider streaming UI as each Foundation step completes.

### Path B: Experiment Result → Full Cascade

```
User reports result
  → Experiments: threshold check → verdict
    → emits experiment.completed { hypothesis, verdict, metrics, key_learning }

  All downstream via event subscriptions (parallel):
    Growth Voice: evolves if messaging was validated
    Founder Mirror: evaluates if insight warranted (from accumulated context)
    ⚡ Growth Pulse: update experiments slice + refresh working/needsWork
    ⚡ Strategist Brief: refresh if significant
    ⚡ Strategy: reassess if experiment invalidated current strategy
    ✦ Interrogation: generate checkpoint if warranted
```

Core depth: **1 hop** from Experiments. Everything else is parallel event fan-out. No sequential core-to-core chains.

### Path C: Market Intel Refresh (Foundation update)

```
Cron or manual trigger
  → Intel: new research completes → cache invalidated
    → Strategy: reassessment (debounce 5min)
    → Growth Voice: evolves if market signals warrant ICP update

  Downstream ripple (lazy):
    Core modules read fresh Intel from cache on their next natural trigger
    ⚡ Strategist: refresh briefing
```

Foundation updates ripple slowly. Core modules don't re-run automatically — they read fresh Foundation data from cache on next cron or next experiment generation.

### Path D: Weekly Pulse (fan-out)

```
Cron fires (staggered by timezone at scale)
  → Intel refresh (parallel)
  → Experiments refill (parallel) — reads Foundation cache + own accumulated context
  → Audience scan (parallel)
  → ⚡ All projections update from accumulated events
```

At 100K users: stagger over 4h by timezone. ~400K events/week (reduced from 600K with Learnings removed).

---

## 11. Module Ownership Rules (Non-Negotiable)

### Rule 1: No Cross-Module Writes

- ✅ Experiments writes to `growth_experiments` only. Emits event → downstream handlers handle it.
- ✗ Experiments must NEVER write to `growth_voices` or `company_profiles`.

### Rule 2: Zero Peer Reads

- ✅ Core modules read Foundation from cache. Context from other core modules comes via event subscriptions accumulated locally.
- ✗ No core module ever calls another core module's service or query interface at runtime.
- ✗ No `import { audiencePulseService } from '@/modules/audience'` in Experiments.

### Rule 3: Foundation Flows Down (Events Flow Up)

- ✅ Core modules read Foundation cache (synchronous, downward).
- ✅ Core modules emit events (fire-and-forget, no dependency).
- ✅ Foundation modules subscribe to core events for evolution (async, decoupled).
- ✅ When an experiment reveals ICP insight, it emits `experiment.completed` → Growth Voice handler decides whether to evolve.
- This is NOT circular — events decouple the "upward" flow. No synchronous call chain goes A→B→A.

### Rule 4: Events Carry Domain Data

- ✅ `experiment.completed { experiment_id, hypothesis, verdict, metrics, key_learning, user_id, org_id }` — projection uses payload to update its slice.
- ✗ `experiment.completed { experiment_id }` — forces consumer to query Experiments at runtime.
- ✗ `experiment.completed { ...experiment, ...companySeed, ...growthVoice, ...audience }` — reverse coupling, payload bloat.

Events carry the **producing module's domain data** — what changed and why. Not the whole world.

### Rule 5: Projections Never Queried by Core

- ✅ Front-end reads Growth Pulse, Strategist, Activity Feed. Core modules never import them.
- ✗ Experiments reading GO/NO_GO verdict from Strategic Assessment — creates circular dependency.

### Rule 6: Module = Folder Boundary

- `modules/experiments/` contains: domain schema, service, agent, event defs, Inngest handlers.
- Only the `index.ts` exports (query interface) are importable from outside.
- Everything else is internal to the module.

### Rule 7: Projections Own Accumulated State

- ✅ Growth Pulse maintains its own materialised document. Each event updates a slice.
- ✗ Projection handlers querying source modules at runtime — defeats the purpose.

### Rule 8: Architecture Extends, Never Breaks

- New modules slot into Foundation, Core, Projection, Cross-cutting, Platform, or Feature.
- Adding a module never requires changing existing modules (unless subscribing to their events).
- The coupling budget and layered flow apply to all new modules.

---

## 12. Directory Structure

**Preserved from MODULE_ARCHITECTURE_STANDARD.md** — no changes to internal module layout.

```
modules/
  ── Foundation (cached, read by all) ──
  company-seed/              ← Foundation: identity + customer intelligence (new — extracted from onboarding + growth-voice)
  market-intel/              ← Foundation: external research + own agent (new — extracted from onboarding + research)
  growth-voice/              ← Foundation: living brand identity, messaging, ICP (renamed from growth-voice)
  strategy/                  ← Foundation projection: SWOT, verdict, positioning (refactored)

  ── Core (zero peer reads, Foundation cache + events only) ──
  growth-experiments/        ← Core: growth experiments lifecycle (new — consolidates hypotheses/execution/campaigns)
  mirror/                    ← Core: founder insights (rename of insights)
  audience/                  ← Core: live audience signals (rename of audience-intelligence)

  ── Projections (materialised read models) ──
  growth-pulse/              ← Projection: three-panel aha moment dashboard — working / needs work / next steps (renamed from command-hero)
  strategist/                ← Projection: weekly briefing (new)
  activity/                  ← Projection: activity feed (reclassified)
  content-library/           ← Projection: content view (existing)

  ── Cross-cutting ──
  interrogation/             ← Cross-cut: hard questions, killable (existing)

  ── Feature ──
  tasks/                     ← Execution engine, content generation
  publishing/                ← Publication management
  brain-dump/                ← User signal ingestion
  feedback/                  ← User feedback signals
  specialists/               ← AI growth specialists
  assistant/                 ← AI chat interface
  ai-prompts/                ← Prompt management
  integration-content/       ← Content from integrations
  review/                    ← Weekly review UI
  yc-assessment/             ← YC application tool
  onboarding/                ← Onboarding flow (writes to Foundation)
  onboarding-assessment/     ← Assessment during onboarding
  onboarding-overlay/        ← Onboarding UI
  assessment/                ← Assessment computation (feeds Strategy)
  channels/                  ← Channel management (feeds Audience)

  ── Platform ──
  auth/                      ← Authentication (PropelAuth)
  oauth2/                    ← OAuth flows
  settings/                  ← User preferences
  subscriptions/             ← Billing, plans
  push-subscriptions/        ← Browser notifications
  integrations/              ← Third-party connectors
  analytics/                 ← Platform analytics
  platform-analytics/        ← Platform metrics

  ── Deprecated (do not reference) ──
  growth-voice/            ← Renamed to growth-voice/
  learning/                  ← Removed (never used)
  strategy-history/          ← Fold into strategy/
  campaigns/                 ← Fold into experiments/
  execution/                 ← Fold into experiments/
  hypotheses/                ← Fold into experiments/

Each module contains (per MODULE_ARCHITECTURE_STANDARD.md):
    domain/                  ← Zod schemas (single source of truth), types
    application/             ← Services (BaseService), factories, agents
    infrastructure/          ← Mongoose schemas (auto-generated), repositories
    api/                     ← Validation, response DTOs, hooks
    inngest/                 ← Event handlers (idempotent)
    index.ts                 ← Server-only exports (query interface)
    client.ts                ← Client-safe exports (types, hooks, schemas)
```

---

## 13. Migration Path

### Phase 1: Foundation Layer (highest value, smallest blast radius)

1. Extract **Company Seed** from `onboarding` + `growth-voice` into `modules/company-seed/`
2. Extract **Market Intelligence** from `onboarding` (Steps 3, 5) + `research` into `modules/market-intel/`
3. Rename **Growth Voice** → **Growth Voice** (`modules/growth-voice/`), move to Foundation layer, add evolution event subscriptions
4. Refactor **Strategic Assessment** in existing `modules/strategy/` to be event-driven projection
5. Set up **Redis/Upstash cache** for all Foundation modules with invalidation on change events

### Phase 2: Event Schema Standardization

1. Define event contracts for all Foundation events (`company.*`, `market.*`, `growth_voice.*`, `strategy.*`)
2. Define event contracts for Core events (`experiment.*`, `insight.*`, `audience.*`)
3. Ensure all events carry domain-scoped payloads (Rule 4 — producer's data only)
4. Wire Foundation modules to subscribe to core events for evolution (Company Seed customer intel enrichment, Growth Voice, Strategic Assessment)

### Phase 3: Core Module Consolidation

1. Build **Growth Experiments** module (consolidate `hypotheses`, `execution`, `campaigns`)
   - Add `generation_context` field for accumulated audience signals
   - Subscribe to `audience.high_value_signal` for context accumulation
2. Rename `insights` → **mirror** (`modules/mirror/`)
   - Add accumulated experiment/audience context fields
   - Subscribe to `experiment.completed`, `audience.high_value_signal`
3. Rename `audience-intelligence` → **audience** (`modules/audience/`)
4. Remove all peer read imports — every core module reads Foundation cache only
5. Delete `learning/` module (already removed)

### Phase 3.5: Customer Intelligence Enrichment (inside Company Seed)

1. Extend Company Seed Zod schemas with `PersonaIntelligence`, `ProblemIntelligence`, `ValidationIntelligence`, `TractionIntelligence`, `MonetizationIntelligence`, `DataPointMeta`
2. Add `customerIntelligence` nested field to `company_profiles` collection
3. Implement enrichment methods on `CompanySeedService` (upsertCustomerIntelDataPoint, enrichFromTier1)
4. Implement Tier 1 auto-enrichment during onboarding (public sources — LinkedIn, Crunchbase, website)
5. Define `company.customer_intel_enriched`, `company.validation_milestone` events
6. Wire integration hooks for Tier 2 (Stripe → monetization, analytics → validation, CRM → persona)
7. Wire conversational extraction for Tier 3 (Interrogation → customer intel data points)
8. Wire event subscriptions (`experiment.completed`, `audience.high_value_signal`, `interrogation.checkpoint_answered`) for progressive enrichment

### Phase 4: Projection Extraction

1. Build **Growth Pulse** materialised read model (three-panel dashboard: working / needs work / next steps)
2. Build **Strategist Brief** materialised read model
3. Reclassify **Activity Feed** as projection
4. Wire projection handlers to accumulate state from events

### Phase 5: Cleanup

1. Deprecate and remove absorbed modules (`growth-voice/`, `hypotheses/`, `execution/`, `campaigns/`, `strategy-history/`, `learning/`)
2. Update ESLint rules to enforce module boundaries (zero cross-core imports)
3. Update AGENTS.md and CLAUDE.md with new architecture

---

## 14. Scaling Concerns

| Concern | Severity | Problem | Mitigation |
|---|---|---|---|
| Weekly cron fan-out | **HIGH** | 100K users × 5 module events = 500K Inngest events | Stagger by timezone over 4h. Batch per-tz cohorts. Priority queue for paid tiers. |
| LLM token budget | **HIGH** | ~7 agents × avg 2K tokens = 14K tokens/user/week. At 100K = 1.4B tokens/week | Tiered model routing: Haiku for scoring, Sonnet for generation, Opus for interrogation only. Cache MarketResearchAgent results. |
| Company Seed as hot read | **HIGH** | Every core module + agent reads Seed. Massive read amplification. | Cache in Redis per-tenant (rarely changes). Invalidate on `company.seed_updated`. |
| Market Intel freshness | **MEDIUM** | External API rate limits, cost, stale data at scale | Shared research pool for common queries. Per-tenant refresh budget. Decay scoring. |
| Strategy reassessment cost | **MEDIUM** | LLM-powered projection. Every Intel refresh or experiment triggers it. | Debounce by 5min. Diff-check: only reassess if inputs materially changed (delta threshold). |
| Tenant isolation | **MEDIUM** | Noisy neighbor: one user's cascades starve queue for others | Per-tenant concurrency limits in Inngest. Fair-share scheduling. |
| Inngest as SPOF | **MEDIUM** | Every module depends on event bus. Bus down = system halts. | DLQ with auto-retry. Sync fallback for onboarding (Path A). Health checks + alerting. |
| Projection rebuild lag | **LOW** | Growth Pulse shows stale data. Eventual consistency gap. | Debounce: 5s for Growth Pulse, 5min for Strategist. Show "updating..." in UI. |

---

## Independence Tests

- **Foundation**: Company Seed has zero dependencies (leaf); its customer intelligence sub-model enriches progressively via events. Market Intel depends on Seed cache only. Growth Voice depends on Seed + Intel cache, evolves via events. Strategic Assessment is a projection — rebuildable from events.
- **Core**: Delete any core module → its events stop arriving → other modules stop getting fresh accumulated context, but **never error out**. No runtime queries between core modules.
- **Projections**: Delete any projection → front-end loses a view, core still runs.
- **Cross-cutting**: Delete Interrogation → zero impact.
- **Platform**: Available to all, imported by none in domain layer.
- **Feature**: Serve core modules or UI. Removable without architectural impact.
- **Foundation evolution**: Delete the `experiment.completed` subscription from Growth Voice → Voice stops evolving from experiments but everything else works. Each subscription is independently removable.

**The hard dependencies are**: MongoDB and Inngest. Everything else is designed to fail independently.

---

## 15. Module Planning Documents

Detailed planning docs for each module — collections, schemas, agents, events, enrichment pipelines, caching, API surfaces, and migration plans.

| Module | Layer | Planning Doc | Status |
|---|---|---|---|
| **Company Seed** | Foundation | [COMPANY_SEED_MODULE.md](./COMPANY_SEED_MODULE.md) | ✅ Draft |
| **Market Intelligence** | Foundation | *TBD* | ⬜ Not started |
| **Growth Voice** | Foundation | *TBD* | ⬜ Not started |
| **Strategic Assessment** | Foundation (Projection) | *TBD* | ⬜ Not started |
| **Growth Experiments** | Core | [growth-experiments-mvp.md](./growth-experiments-mvp.md) | ✅ Draft |
| **Founder Mirror** | Core | *TBD* | ⬜ Not started |
| **Audience Pulse** | Core | *TBD* | ⬜ Not started |
| **Growth Pulse** | Projection | *TBD* | ⬜ Not started |
| **Strategist Brief** | Projection | *TBD* | ⬜ Not started |
| **Interrogation** | Cross-cutting | *TBD* | ⬜ Not started |

---

## Document Priority (Conflict Resolution)

1. **This document** (v3.1) — Module boundaries, data ownership, event strategy
2. **Module Planning Documents** (Section 15) — Detailed per-module specs
3. `AGENTS.md` — Coding conventions, tech stack, patterns
4. `docs/MODULE_ARCHITECTURE_STANDARD.md` — Internal module structure
5. `docs/EVENT_PATTERNS.md` — Event naming, handler patterns
6. `docs/REPOSITORY_PATTERN.md` — Data access patterns
7. `docs/ATOMICITY_STANDARD.md` — Concurrency patterns
