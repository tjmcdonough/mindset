# Phase 1: Foundation — OneCamp

**Date:** 2026-02-13

---

## 1. Company Seed

### Identity
- **Name:** OneCamp
- **Tagline (from Reddit):** "Self-hosted, all-in-one productivity workspace"
- **Positioning:** Replaces Slack + Asana + Zoom + Notion in a single self-hosted Docker deployment
- **Website:** NONE ⚠️ (Critical gap)
- **Online presence:** Reddit (r/SaaS), X (@akashc777)
- **Source code:** Not public [INFERRED — no GitHub links found]

### Product Features (from Reddit posts)
- Channels / DMs / group chat (Slack replacement)
- Video/audio calls with recording + transcription (Zoom/Meet replacement)
- Project management / task tracking (Asana replacement)
- Real-time collaborative docs (Notion replacement)
- Unified search across all modules
- Observability / monitoring
- Docker-based deployment

### Stage
- **Revenue:** $0
- **Users:** 0 paying, seeking beta testers
- **Funding:** None disclosed [INFERRED: bootstrapped]
- **Team:** Solo founder
- **Timeline:** "Several months" of building
- **Status:** "Very early beta" — just reached "stability," moving to "polish"

### Key Signals
- Two Reddit posts in r/SaaS (1 month apart) — both seeking beta testers
- CTA: "DM me BETA" — low-friction but no landing page to capture leads
- Quote: "Building solo is lonely sometimes" — emotional, relatable, but signals isolation from market feedback

---

## 2. Founder Research

### Profile: Akash (@akashc777)
- **Platform:** X (Twitter), Reddit
- **Role:** Solo founder, likely full-stack engineer
- **Skills [INFERRED]:** Full-stack development (building chat, video, docs, task management alone suggests strong technical capability — WebRTC, real-time sync, Docker orchestration)
- **Background:** Unknown — no LinkedIn found, no personal website [INFERRED: technical background, likely experienced developer]
- **Location:** Unknown
- **Reddit behavior:** Posts in r/SaaS seeking feedback and beta testers; transparent about being solo

### Founder Archetype [INFERRED]
- **Builder-first founder:** Months of heads-down engineering before any marketing
- **Risk pattern:** "Build it and they will come" — classic technical founder trap
- **Strength:** Extraordinary technical breadth (building Slack + Zoom + Asana + Notion alone is genuinely impressive)
- **Weakness:** No evidence of customer discovery, validation, or marketing infrastructure

---

## 3. Market Intel

### Total Addressable Market
- **Collaboration software market:** $27.1B in 2024 (Apps Run The World), growing ~12% YoY
- **Team collaboration segment:** $36.1B in 2024 (Grand View Research), 7.4% CAGR to 2030
- **Self-hosted collaboration suite:** $7.82B in 2024 (Dataintelo) — this is OneCamp's relevant market

### Self-Hosted Segment Dynamics
- **Growing demand drivers:**
  - Data sovereignty regulations (GDPR, emerging AI data laws)
  - Enterprise distrust of cloud vendors (vendor lock-in fatigue)
  - Government/military/defense requirements
  - Healthcare (HIPAA) and financial services compliance
- **Headwinds:**
  - Cloud convenience wins for most SMBs
  - Self-hosting requires DevOps expertise
  - Maintenance burden falls on the customer

### Key Market Shift (OPPORTUNITY) 🔥
**Mattermost and Rocket.Chat are alienating their open-source communities:**
- Both are moving features behind paywalls
- Mattermost pushing AI integrations into paid tiers only
- r/selfhosted community actively seeking alternatives (Aug 2025 thread: 90 upvotes asking for "really open source" alternatives)
- This creates a **window of opportunity** for a genuinely open/affordable alternative

### Market Reality Check
- The self-hosted market is real ($7.8B) but dominated by enterprise buyers with long sales cycles
- SMB self-hosters are passionate but price-sensitive (many expect free/OSS)
- The "all-in-one" self-hosted space has strong incumbents with years of head start

---

## 4. Growth Voice

### Reddit Copy Analysis

**Post 1 (newer — "stability" update):**
- Title: "Solo founder update: OneCamp (self-hosted Slack + Asana + Meet + Docs alternative) just reached stability — now moving to polish & beta"
- Voice: Transparent, vulnerable, technical
- Effective elements: Name-drops the tools being replaced (instant clarity), "solo founder" creates empathy
- Weakness: No link to product, no demo, no screenshots visible

**Post 2 (older — "collaborative docs" milestone):**
- Title: "Big milestone: I just shipped collaborative docs — OneCamp is now a full self-hosted Slack + Asana + Meet + Notion alternative (solo founder update)"
- Voice: Celebratory, milestone-driven
- Effective elements: Shows progress, specific feature announcement

### Voice Assessment
- **Tone:** Authentic indie hacker — good for r/SaaS and maker communities
- **Missing:** Technical depth for r/selfhosted audience (architecture, stack details, Docker Compose examples)
- **Missing:** Any visual proof (screenshots, demo video, GIFs)
- **Missing:** Differentiation beyond "all-in-one" — why OneCamp vs. Nextcloud + Mattermost + Wekan?
- **CTA quality:** "DM me BETA" is low-friction but leaks potential — no email capture, no waitlist, no way to follow up

---

## 5. Audience Pulse

### Where Self-Hosted/Privacy-Focused Teams Congregate

**Tier 1 — High density, high relevance:**
- r/selfhosted (Reddit) — 500K+ members, extremely active, direct target audience
- r/homelab — overlapping audience, more infrastructure-focused
- Hacker News — "Show HN" posts for self-hosted tools regularly hit front page
- awesome-selfhosted (GitHub) — curated list, 200K+ stars, major discovery channel

**Tier 2 — Strong communities:**
- r/SaaS, r/startups, r/EntrepreneurRideAlong — maker/founder communities
- Lobste.rs — technical crowd, self-hosted friendly
- Mastodon/Fediverse — self-hosting ethos native to the platform
- Matrix/Element chat rooms — self-hosted community meta-irony (they use self-hosted tools to discuss self-hosted tools)

**Tier 3 — Directories & aggregators:**
- AlternativeTo.net — comparison shopping for software
- Product Hunt — launch moment (but needs a landing page first)
- Docker Hub — discovery through container registry
- GitHub — if open-sourced, massive discovery potential

**Tier 4 — Enterprise/compliance buyers:**
- LinkedIn — IT decision makers, CTOs
- Industry conferences (KubeCon, FOSDEM, SCaLE)
- Gartner/G2 reviews (long-term play)

---

## 6. Channel Finder

### Immediate Channels (next 30 days)

| Channel | Effort | Impact | Notes |
|---------|--------|--------|-------|
| r/selfhosted | Low | HIGH | Post with Docker Compose, screenshots. This is THE audience. |
| Hacker News "Show HN" | Low | HIGH | Technical audience loves self-hosted. Needs a URL though. |
| awesome-selfhosted PR | Low | MEDIUM | Submit to groupware/collaboration category. Needs GitHub repo. |
| r/SaaS | Already done | LOW | Already posted twice. Diminishing returns. |
| Product Hunt | Medium | MEDIUM | Needs landing page + demo. Save for later. |
| Docker Hub | Low | MEDIUM | Good Docker image with README = passive discovery |

### Medium-term Channels (1-3 months)

| Channel | Effort | Impact | Notes |
|---------|--------|--------|-------|
| AlternativeTo | Low | MEDIUM | List as alternative to Slack/Mattermost/Rocket.Chat |
| Dev.to / Hashnode blog | Medium | MEDIUM | Technical content about building all-in-one |
| X/Twitter indie hacker community | Medium | MEDIUM | Build in public content |
| YouTube demo/walkthrough | Medium | HIGH | Video proof of product. Critical for trust. |

### Blocked Channels (need prerequisites)
- **Any channel requiring a URL** — needs a website FIRST
- **GitHub stars / OSS community** — needs to decide on open-source strategy
- **Enterprise directories (G2, Capterra)** — needs paying customers

---

## 7. Domain Expert: Self-Hosted Software Adoption

### How Self-Hosted Software Gets Adopted

**Discovery → Trial → Adoption pipeline:**
1. **Awareness:** HN front page, Reddit post, awesome-selfhosted listing, word of mouth
2. **Evaluation:** README quality, Docker Compose ease, screenshot/demo quality
3. **Trial:** `docker compose up` in under 5 minutes or they bounce
4. **Assessment:** Does it actually work? Is it polished enough? How's the UX?
5. **Commitment:** Data migration, team onboarding, production deployment
6. **Advocacy:** Blog posts, Reddit recommendations, GitHub stars

### Buying Dynamics
- **Hobbyists/homelab:** Free only. Will contribute bug reports. Low commercial value but high word-of-mouth value.
- **Small teams (5-20):** Willing to pay $5-20/user/month for managed or premium features. Need it to "just work."
- **Mid-market (20-500):** Need SSO, audit logs, compliance docs. Will pay $10-30/user/month. Long evaluation cycles.
- **Enterprise (500+):** Need on-prem support, SLAs, security reviews. $20-50+/user/month. 6-12 month sales cycles.

### Open Source Expectations
The self-hosted community has **STRONG opinions** about licensing:
- Open core (free base + paid features) is accepted if the free tier is genuinely useful
- Source-available (look but don't modify) is tolerated but not celebrated
- Proprietary self-hosted is the hardest sell — "why not just use the cloud version?"
- **Current opportunity:** Mattermost and Rocket.Chat are moving features behind paywalls, creating resentment. An "actually open" alternative would get massive goodwill.

### Critical Success Factors for Self-Hosted Tools
1. **One-command deployment** (docker compose up)
2. **Great documentation** (not "docs coming soon")
3. **Active GitHub repo** (signals life, allows contributions)
4. **Responsive maintainer** (issues answered within days)
5. **Migration tools** (import from Slack, export data)
6. **Backup/restore** that works
7. **Update mechanism** that doesn't break things

### The "All-in-One" Positioning Challenge
- **Self-hosted community generally prefers composable tools** — pick best-of-breed for each function
- "All-in-one" raises skepticism: "jack of all trades, master of none"
- **Counter-argument that works:** "One Docker stack instead of five. One backup. One update. One auth system."
- Must position the integration benefit, not just feature breadth
