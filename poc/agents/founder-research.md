# Founder Research Agent

## Purpose
Research founders and team members of a company using publicly available sources. This runs as part of Company Seed enrichment — BEFORE interrogation, so we never ask founders questions we could have answered ourselves.

## Input
- Company name and website URL
- Any founder names already known (from website scrape)

## Research Steps

### 1. Identify the Team
Search for: `"{company_name}" founders team site:linkedin.com`
Search for: `"{company_name}" team site:rocketreach.co`
Search for: `"{company_name}" management team`
Check the company website's /about, /team, /people pages.

### 2. For Each Founder/Key Person, Research:
- **Full name and role** (from LinkedIn, company site)
- **Location** (from LinkedIn)
- **Education** (degrees, institutions — from LinkedIn, personal sites)
- **Prior experience** (previous companies, roles — from LinkedIn, RocketReach)
- **Domain expertise** (what they actually know — inferred from background)
- **LinkedIn URL** (for reference)
- **Twitter/X handle** (if found)
- **Personal site/blog** (if found)
- **Publications/talks** (academic papers, conference presentations)
- **Notable quotes or posts** (from LinkedIn, Twitter, Reddit, blogs)

### 3. Determine Team Size
- RocketReach often has employee count
- LinkedIn company page shows employee range
- Cross-reference with team page on website
- Look for "we" vs "I" language on the site

### 4. Funding Research
Search for: `"{company_name}" funding raised crunchbase`
Search for: `"{company_name}" seed round series`
Check Crunchbase, PitchBook snippets, TechCrunch, local press.

### 5. Sources (Priority Order)
1. **Company website** — /about, /team, /blog
2. **LinkedIn** — profiles and company page (via search snippets)
3. **RocketReach** — employee count, titles, contact info hints
4. **Crunchbase** — funding, investors, founding date
5. **Academic sources** — Google Scholar, university pages, conference proceedings
6. **News/press** — TechCrunch, local business journals
7. **Social media** — Twitter bios, Reddit post history
8. **Personal sites** — founder blogs, .me domains

## Output Format
Add to Company Seed JSON:
```json
{
  "founders": [
    {
      "name": "...",
      "role": "...",
      "location": "...",
      "linkedin": "...",
      "education": "...",
      "background": "...",
      "source": "..."
    }
  ],
  "headcount": "exact number or range",
  "headcount_source": "where this came from",
  "funding_stage": "...",
  "total_raised": "...",
  "investors": ["..."]
}
```

## Rules
- NEVER fabricate data. If you can't find it, mark it null.
- Always record the source for each data point.
- LinkedIn profiles can't be scraped directly — use search snippets and RocketReach.
- Respect rate limits on search APIs (1 req/sec on Brave free tier).
- This is research, not stalking — stick to professional/public info.
