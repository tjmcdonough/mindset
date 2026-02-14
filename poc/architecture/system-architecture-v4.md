# GrowthMind System Architecture v4.0
# "Replace the Growth Hacker"

## Philosophy
The diagnosis is the hook. The ongoing growth system is the product.
GrowthMind doesn't generate content or send messages — it tells founders
exactly what to do, why, and what to expect. Then it tracks whether they did it.

## The Four Jobs
1. **DIAGNOSE** — Understand the business deeply (one-time, refreshable)
2. **PRESCRIBE** — What to do, in what order (one-time, updated per cycle)
3. **GUIDE** — Specific weekly actions, content topics, outreach targets (ongoing)
4. **TRACK** — Are experiments working? Keep/kill/pivot? (ongoing)

---

## Layer 1: FOUNDATION (automated research, no founder input needed)

### Company Seed + Founder Research
- Scrape website, LinkedIn, RocketReach, Crunchbase, academic sources
- Auto-research founders: background, team size, funding
- Output: company-seed.json

### Market Intel
- Market size, growth rates, trends
- Competitor landscape with funding, revenue, positioning
- Customer signals from communities
- Output: market-intel.json

### Growth Voice
- Brand archetype and tone analysis
- Messaging pillars with proof points
- Audience-specific tone variations
- Competitor voice comparison
- Output: growth-voice.json

### Audience Pulse
- Find where ICP hangs out (Reddit, Twitter, communities)
- Surface active discussions about the problem
- Score signals by relevance and engagement
- Output: audience-pulse.json

### Channel Finder ← NEW
- Directories, listings, marketplaces to be present on
- Communities to actively engage in
- Competitor presence map (where are they listed?)
- Prioritised action plan: this week / this month / this quarter
- Output: channel-finder.json

### Competitor Radar ← NEW (periodic)
- Monitor competitor product changes, GTM moves, funding, positioning
- Threat assessment with impact scoring
- Surface opportunities, not just threats
- Output: competitor-radar.json (refreshed weekly/bi-weekly)

---

## Layer 2: INTERROGATION (independent — cascade stops here by default)

### Interrogation Agent
- Analyse gaps in Foundation data
- Generate targeted questions — ONLY things unknowable from research
- **Deliver questions to Tom immediately — cascade STOPS here by default**
- Tom forwards to founder, waits for answers
- When answers arrive: update Company Seed → trigger Phase 3+
- Output: interrogation.json → updated company-seed.json

### Independence
- Interrogation is a standalone module. Delete it and the system still works end-to-end (at lower confidence).
- Foundation answers feed INTO Interrogation (it reads gaps in Company Seed to know what to ask).
- Interrogation answers feed BACK into Foundation (updating Company Seed), which makes all downstream agents better.
- But downstream agents CAN run without it — they just work with whatever Foundation data exists.
- **Default: stop and wait. Override: Tom explicitly says "skip interrogation" or "run fully."**

---

## Layer 3: CORE ANALYSIS (after interrogation)

### Strategic Assessment
- Demand scorecard (6 dimensions, 0-100)
- SWOT analysis
- GO / NO-GO / CONDITIONAL verdict
- Risk flags (red/yellow)
- Output: strategic-assessment.json

### Growth Pulse
- What's working / what needs work
- Confidence score (improves with data)
- Output: growth-pulse.json

### Growth Experiments
- Prescribed experiments with hypotheses
- Success criteria, duration, effort, risk
- Sequenced in priority waves
- Output: growth-experiments.json

### Founder Mirror
- Uncomfortable truths with evidence
- Cognitive bias identification
- Questions that challenge assumptions
- Output: founder-mirror.json

### Content Strategist ← NEW
- Suggest content topics, formats, distribution
- WHY each piece matters and WHAT to expect
- Realistic cadence for founder's time budget
- Anti-suggestions (what NOT to create)
- Output: content-strategy.json

### Outreach Planner ← NEW
- Target identification (users, influencers, partners, media)
- Messaging ANGLES (not scripts)
- Realistic expected response rates
- Output: outreach-plan.json

---

## Layer 4: PROJECTIONS (synthesis & delivery)

### Strategist Brief
- The One Thing
- 90-day roadmap
- Channel deep dive
- Output: strategist-brief.json

### Weekly Growth Brief ← NEW (recurring)
- This week's ONE focus
- Experiment status (traffic lights)
- Content calendar for the week
- Outreach targets for the week
- Competitor alerts (if any)
- Numbers check (prompt for metrics)
- Output: weekly-brief.json (generated weekly)

### Experiment Tracker ← NEW (recurring)
- Track experiment status vs success criteria
- Generate check-in questions
- Keep/kill/pivot recommendations
- Output: experiment-tracker.json (updated per check-in)

### Growth Diagnosis Report
- Client-facing HTML report combining all outputs
- Output: diagnosis-report.html

### Activity Feed
- Timeline of all events, decisions, experiment results
- Output: activity-feed.json

---

## Cascade Execution Order

### Initial Diagnosis (one-time)
```
Phase 1: Foundation (parallel where possible)
  Company Seed + Founder Research
  Market Intel ──┐
  Growth Voice ──┤ (parallel)
  Audience Pulse ┤
  Channel Finder ┘

Phase 2: Interrogation (DEFAULT STOP)
  Generate questions → Deliver to Tom → STOP
  Tom forwards to founder → waits for answers → updates Seed
  (Override: Tom says "skip" → proceed at low confidence)

Phase 3: Core Analysis (after answers OR explicit skip)
  Strategic Assessment ──┐
  Growth Pulse ──────────┤ (parallel)
  Growth Experiments ────┤
  Founder Mirror ────────┤
  Content Strategist ────┤
  Outreach Planner ──────┘

Phase 4: Projections
  Strategist Brief
  Growth Diagnosis Report
  Weekly Growth Brief (first edition)
```

### Ongoing (weekly/bi-weekly cycle)
```
  Competitor Radar (scan)
  Audience Pulse (refresh)
  Experiment Tracker (check-in)
  Weekly Growth Brief (generate)
  Content Strategist (refresh suggestions)
```

---

## Revenue Model Alignment

| Layer | Frequency | Value | Pricing |
|-------|-----------|-------|---------|
| Foundation + Diagnosis | One-time | "We understand your business" | Free / cheap (the hook) |
| Experiments + Strategy | One-time | "Here's what to do" | Included with diagnosis |
| Content + Outreach + Channels | Ongoing | "Here's what to do THIS WEEK" | Subscription |
| Experiment Tracking | Ongoing | "Is it working? Keep or kill?" | Subscription |
| Competitor Radar | Ongoing | "What are they doing?" | Subscription |
| Weekly Brief | Ongoing | "Your growth hacker's weekly standup" | Subscription |

The diagnosis gets them in. The weekly brief keeps them paying.
