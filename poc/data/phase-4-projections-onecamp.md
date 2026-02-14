# Phase 4: Projections — OneCamp

**Date:** 2026-02-13
**Confidence:** LOW-MODERATE (pre-interrogation, zero traction data)

---

## Strategist Brief

### The One-Line Assessment
OneCamp is a technically impressive product with zero distribution, entering a market with well-funded competitors, at a moment when those competitors are alienating their communities. **The window is open but closing.**

### Strategic Priority Stack (30-60-90 Day)

#### Days 1-7: STOP BUILDING, START SHIPPING
1. **Launch a landing page** (4 hours on a Saturday with any template)
   - Product name, one-liner, 5 screenshots, email capture, "Request Beta" button
   - Domain: onecamp.dev or onecamp.io or similar
2. **Record a 2-minute demo video** — screen recording walking through chat → video call → tasks → docs
3. **Create a public Docker quick-start** — `docker compose up` that works in under 5 minutes

#### Days 7-14: FIND YOUR 10
4. **Post to r/selfhosted** — this is THE channel. Docker Compose, screenshots, honest framing.
5. **Post to Hacker News** — "Show HN: Solo-built self-hosted workspace replacing Slack + Zoom + Asana + Notion"
6. **Goal: 10 actual beta users running OneCamp on their infrastructure within 14 days**

#### Days 14-30: LISTEN
7. **Set up a feedback channel** — Discord server or (meta) use your own OneCamp instance for beta community
8. **Talk to every beta user** — 15-minute calls, what do they love, what's broken, what's missing
9. **Decide: open source or not** — this informs everything downstream

#### Days 30-60: POSITION
10. **Write the "Why OneCamp" narrative** — informed by user feedback, not assumptions
11. **Submit to awesome-selfhosted, AlternativeTo, Docker Hub**
12. **Start content engine** — one blog post or video per week minimum

#### Days 60-90: GROW
13. **Reach 50-100 active beta users**
14. **First pricing experiment** — even if it's "pay what you want"
15. **Evaluate: is this a solo project or does it need a co-founder/community?**

---

### The Hard Questions Akash Needs to Answer

**1. Is this a business or a project?**
If it's a project: open source it fully, let the community carry it, enjoy the craft.
If it's a business: you need a business model, and the clock is ticking on solo sustainability.

**2. Can you actually maintain 4 products solo?**
Chat + Video + Tasks + Docs = four distinct engineering challenges, each with its own performance, scaling, and UX requirements. Mattermost has 156 people for JUST chat. What happens when a critical WebRTC bug hits at the same time as a real-time sync issue in docs?

**3. Should you open source?**
Arguments FOR: ride the Mattermost/Rocket.Chat backlash, build community trust, attract contributors, get listed on awesome-selfhosted
Arguments AGAINST: competitors can fork it, harder to monetize
**Our recommendation [INFERRED]:** Open-core model. Core product open source, premium features (SSO, audit logs, priority support, managed hosting) paid. This is the proven model for self-hosted tools.

**4. Should you niche down?**
"All-in-one" is your positioning, but it's also your risk. Consider:
- **Option A:** Stay all-in-one but lead with one module (e.g., "the best self-hosted team chat, plus everything else")
- **Option B:** Target a specific audience (e.g., "the self-hosted workspace for small dev teams")
- **Option C:** Target the pain point (e.g., "replace 5 subscriptions with one Docker stack")
Option C is the most compelling and honest.

---

## Growth Advisor (Catch-All)

### What's Working
- The Reddit posts show the right instinct: be transparent, share milestones, ask for feedback
- The product scope, while risky, is genuinely differentiated if executed
- The timing is better than it's ever been for a self-hosted alternative

### What's Not Working
- **Building in a vacuum.** Months of engineering with zero users is the biggest red flag. Not because the product is bad — it might be great — but because you have no signal.
- **No website.** This alone is costing you 90%+ of potential interest. Every person who reads a Reddit post and wants to learn more hits a dead end.
- **DMs as a CTA.** You're losing leads. Even a Google Form would be better.
- **Only posting in r/SaaS.** Your audience is in r/selfhosted, HN, and DevOps communities. r/SaaS is founders talking to founders.

### Risk Assessment

| Risk | Severity | Likelihood | Mitigation |
|------|----------|------------|------------|
| Solo founder burnout | CRITICAL | HIGH | Get beta users for motivation. Consider co-founder or OSS contributors. |
| Building wrong thing | HIGH | MEDIUM | Get 10 users THIS MONTH. Their feedback is your compass. |
| Competitors crush you | MEDIUM | LOW | They're alienating users. Your window is open. Move fast. |
| Never finding PMF | HIGH | MEDIUM | Niche down if all-in-one doesn't resonate after 50 users |
| Technical debt / scaling | MEDIUM | HIGH | Inevitable for solo-built. Document architecture. Plan for contributors. |
| No business model | HIGH | CERTAIN (currently) | Decide open-core vs. paid by day 30 |

### Projections [HIGHLY SPECULATIVE — 0 data points]

**Optimistic scenario (things go right):**
- Month 1: 50-100 beta users, landing page live, HN/Reddit traction
- Month 3: 200-500 users, first paying customers, small community forming
- Month 6: 1,000+ users, $1-5K MRR, contributor community if OSS
- Month 12: 5,000+ users, $10-20K MRR, potential to raise seed round

**Realistic scenario:**
- Month 1: 10-30 beta users, landing page live
- Month 3: 50-100 users, learning what needs to change, maybe pivoting scope
- Month 6: 200-500 users, $0-2K MRR, still iterating on PMF
- Month 12: 1,000 users, $5-10K MRR, clearer product direction

**Pessimistic scenario:**
- Month 1: Launch lands flat, 5-10 users
- Month 3: Users churned because product isn't polished enough for daily use
- Month 6: Solo founder fatigue sets in, development slows
- Month 12: Project archived or open-sourced as a community project

### The Single Most Important Thing
**Get 10 real users running OneCamp on their own infrastructure this month.** Everything else is noise until you have real human beings using your product and telling you what they think. You've built something. Now find out if anyone wants it.

---

## Appendix: Data Sources & Confidence

| Data Point | Source | Confidence |
|------------|--------|------------|
| Product features | Reddit posts (r/SaaS) | HIGH |
| Founder identity | Reddit posts, X handle | HIGH |
| Zero users / pre-beta | Reddit posts (self-reported) | HIGH |
| Market size ($7.8B self-hosted) | Dataintelo market report | MEDIUM |
| Competitor revenue (Mattermost $33M) | GetLatka | MEDIUM |
| Competitor revenue (Rocket.Chat $31.5M) | GetLatka | MEDIUM |
| OSS backlash trend | Reddit threads, multiple sources | HIGH |
| No website exists | Search results (no domain found) | HIGH |
| Tech stack / architecture | Not available | UNKNOWN |
| Business model | Not disclosed | UNKNOWN |
| Open source status | Not disclosed | UNKNOWN |
| Beta tester response rate | Not disclosed | UNKNOWN |
| Founder background | Not available | UNKNOWN |

---

*Report generated by GrowthMind Cascade — Pre-interrogation mode. Confidence will increase significantly with founder responses to Phase 2 questions.*
