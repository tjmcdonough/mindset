# Phase 1.1: Company Seed — GreenOnion

## Basic Information
- **URL:** https://greenonion.ai
- **App URL:** https://app.greenonion.ai
- **Product:** AI listing image generator for Amazon, Etsy, Shopify
- **Founded:** ~Late 2025 (repositioned to ecommerce ~Jan 2026)
- **Stage:** Pre-seed / bootstrapped [INFERRED]
- **Location:** Athens, Greece [from founder data]
- **Team Size:** Solo founder

## Product Details
- Generates 9 professional listing images from 1 product photo in 30-60 seconds
- Zero-prompt interface — upload photo, optionally add description, AI does the rest
- 8-step pipeline: Upload → Description → Analyze → Design Plans → Generate Copy → Edit Copy → Configure → Generate Images
- Image types: Hero, Core Value Prop, Key Features, Usage Scenario, Quality/Origin, Detail/Close-Up, Size/Quantity, Comparison, Lifestyle
- Amazon-compliant outputs (white BG RGB 255,255,255, 1600px+)
- Also generates: product ads (Facebook/Instagram), social media posts, lifestyle scenes, studio shots
- Automatic brand matching (extracts logo, colors, fonts, voice & visual style)

## Pricing (Current)
| Plan | Price | Credits | Effective per 9-image set |
|------|-------|---------|--------------------------|
| Creator | $19/mo | 60 credits (15 generations) | ~$1.27 |
| Professional | $49/mo | 180 credits (45 generations) | ~$1.09 |
| Enterprise | $149/mo | 500 credits (125 generations) | ~$1.19 |

**NOTE:** The HN post mentions "$149 for ~33 A+ Content pieces" — this maps to the Enterprise tier. The site claims $4.90 per 9-image set in marketing copy, which aligns with the per-generation unit economics.

## Key Messaging (from website)
- "30 Seconds Average Generation Time"
- "Zero Prompts — Just Upload & Generate"
- "On Brand — Automatic Brand Matching"
- Heavy emphasis on cost comparison: photographer ($500-2K) vs designer ($200-800) vs GreenOnion ($4.90)
- ROI calculator showing 3,058% ROI claim

## Technical Architecture [INFERRED from HN post]
- "Layered prompts across models" — multi-model orchestration
- Constrained outputs for 95%+ usability
- API-based (no proprietary model training) [CONFIRMED by founder]
- Likely using combination of: GPT-4V/Claude for analysis, DALL-E 3/Midjourney/Flux for image generation [INFERRED]

## Traction (from HN post, ~1 week old)
- 9 paying customers
- First customer bought highest tier ($149) immediately
- One customer emotional reaction ("wanted to cry")
- Founder uses outputs on own site
- Launched ~1 month ago after repositioning

## Website Quality Assessment
- Clean, professional site
- Strong use-cases page with detailed workflow explanation
- Good SEO content (problem-agitate-solve structure)
- Missing: case studies, testimonials (beyond HN anecdote), about page, blog
- Free trial available (no credit card required)
