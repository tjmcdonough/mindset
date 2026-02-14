# Growth Agentic OS Skill

Orchestrate the GrowthMind.ai 5-phase growth cascade. This skill turns the GrowthMind research and analysis framework into a programmatic agentic system.

## Project Structure
- `agents/`: Contains the markdown specifications for the 19 individual growth agents.
- `data/`: Customer-specific data files (Company Seed, Interrogation answers, etc.).
- `output/`: Generated reports and brief summaries.

## The Cascade
The cascade is split into two primary execution phases to allow for human-in-the-loop "interrogation."

### Phase A: Discovery (Automated)
1. **Foundation**: Company Seed, Founder Research, Market Intel, Growth Voice, Audience Pulse, Channel Finder, Domain Expert.
2. **Gap Analysis**: Phase 0.5 assessment for missing specialist agents.
3. **Interrogation**: Analyze discovery data and generate high-value questions for the founder.
**Action**: Deliver questions to the user and PAUSE.

### Phase B: Analysis & Execution (Post-Interrogation)
1. **Core Analysis**: Update Seed with answers, then run Growth Pulse, Strategic Assessment, Experiments, Founder Mirror, etc.
2. **Projections**: Strategist Brief, Growth Advisor, Weekly Growth Brief.
3. **Delivery**: Generate the Growth Diagnosis Report (HTML).

## Tools & Commands
Use these within the Growth Agentic OS environment.

### `growth-start <url>`
Initializes a new customer session.
1. Creates directory in `data/<domain>`.
2. Runs Phase A (Discovery).
3. Delivers Interrogation questions.

### `growth-analyze <domain>`
Continues the cascade for a customer.
1. Reads interrogation answers from `data/<domain>/answers.json`.
2. Runs Phase B (Analysis & Projections).
3. Generates final report in `output/<domain>/`.

### `growth-coach <domain>`
Triggers the weekly Phase 6 Execution Loop.
1. Checks in with the founder (Monday/Wednesday).
2. Updates Growth Pulse based on experiment results.

## Agent Definitions
Refer to the individual files in `agents/` for the "soul" and "logic" of each specialist:
- `company-seed.md`: Foundation data collector.
- `interrogation.md`: Question generator.
- `growth-pulse.md`: The "Health & Confidence" engine.
- `execution-coach.md`: The behavior and accountability engine.

## Implementation Notes
- **Isolation**: Each customer should ideally run in its own `sessions_spawn` to prevent context leakage.
- **Human-in-the-loop**: Never skip Phase 2 (Interrogation) unless the user explicitly overrides with `growth-analyze --skip-interrogation`.
- **Integrations**: Use `web_search` for Market Intel and `message` for Interrogation/Coaching delivery.
