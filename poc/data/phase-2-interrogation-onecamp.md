# Phase 2: Interrogation — OneCamp (Pre-Interrogation Mode)

**Date:** 2026-02-13
**Mode:** Questions generated for founder. Marked as unlock items. Current analysis uses inferences where answers are unknown.

---

## 🔓 Unlock Questions (Higher Confidence)

### Product & Technical
1. **Is OneCamp open source or proprietary?** What license? Is the code on GitHub?
   - *Why it matters:* This single decision determines your entire GTM strategy, community dynamics, and competitive positioning. If OSS, you ride the Mattermost/Rocket.Chat backlash wave. If proprietary, you need a very different playbook.
   - *Current inference:* Proprietary/closed source (no GitHub links found)

2. **What's your tech stack?** (Language, framework, database, WebRTC implementation)
   - *Why it matters:* Determines contributor pool if OSS, hosting requirements, and scaling characteristics
   - *Current inference:* Unknown

3. **How does video/audio calling work?** Own WebRTC implementation, Jitsi integration, LiveKit, or third-party?
   - *Why it matters:* Video is the hardest feature to build and scale. If it's a wrapper around Jitsi, that's fine but different positioning than "built from scratch."
   - *Current inference:* Unknown — building this solo is a red flag for quality/scalability

4. **What does "observability" mean in your feature list?** Application monitoring? User analytics? System health?
   - *Current inference:* Likely system health dashboard for the self-hosted instance

5. **What's the Docker resource footprint?** RAM/CPU requirements for a 10-person team? 100-person?
   - *Why it matters:* Self-hosted users care deeply about resource efficiency

### Business Model
6. **How do you plan to make money?** Open core? Paid support? Managed hosting? Per-seat license?
   - *Current inference:* No business model yet (pre-revenue, pre-beta)

7. **Who is your target customer?** Homelabbers? Small dev teams? Enterprises? Government?
   - *Current inference:* Unclear — Reddit posts suggest indie/small team audience

8. **What's your runway?** Are you funded? Working a day job? How long can you sustain solo development?
   - *Why it matters:* Building Slack + Zoom + Asana + Notion alone is a multi-year endeavor. Sustainability is the #1 risk.

### Market & Users
9. **Have you talked to any potential customers?** Not Reddit commenters — actual teams who might use this.
   - *Current inference:* No (zero users, no evidence of customer discovery)

10. **Why self-hosted specifically?** Personal conviction? Market research? Scratching your own itch?
    - *Why it matters:* "I want to self-host" is different from "teams are begging for a self-hosted all-in-one tool"

11. **Do you have any beta testers yet from the Reddit DMs?** How many responded?
    - *Current inference:* Unknown — no follow-up posts about beta tester numbers

12. **What's your competitive differentiation beyond "all-in-one"?** Every competitor claims integration.
    - *Current inference:* The positioning is "one Docker stack replaces five tools" — needs sharpening

### Growth & Marketing
13. **Why no website?** Is one planned? What's blocking it?
    - *Why it matters:* You literally cannot be discovered without a URL. This is existential.

14. **Are you building in public anywhere?** Blog, YouTube, X threads?
    - *Current inference:* Minimal — occasional Reddit posts only

15. **Do you have screenshots, a demo video, or a live demo?**
    - *Current inference:* Not publicly available

---

## Impact of Unknowns on Analysis

| Unknown | Confidence Impact | Affected Phases |
|---------|-------------------|-----------------|
| Open source status | CRITICAL | All strategic recommendations |
| Tech stack | HIGH | Domain expert, competitor analysis |
| Business model | CRITICAL | Growth experiments, projections |
| Target customer | HIGH | Channel strategy, pricing, positioning |
| Runway/funding | HIGH | Timeline recommendations, prioritization |
| Beta tester response rate | MEDIUM | Growth pulse, validation signals |
| Video calling implementation | MEDIUM | Technical risk assessment |
