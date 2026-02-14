/**
 * Case study metadata and content configuration
 * Centralized data source for all case studies
 * Content is loaded from markdown files in case-studies/
 */

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  company: string;
  industry: string;
  industryTag: string;
  stage: string;
  demandScore: number;
  verdict: "GO" | "CONDITIONAL" | "NO-GO";
  keyFindings: string[];
  theOneThing: string;
  numberThatMatters: string;
  author: string;
  publishedAt: string;
  contentPath: string;
  featured: boolean;
  enabled: boolean;
  website?: string;
  logo?: string;
  diagnosisUrl?: string;
}

/**
 * Helper to get all case studies
 */
export function getAllCaseStudies(): CaseStudy[] {
  return CASE_STUDIES.filter((cs) => cs.enabled);
}

/**
 * Helper to get a case study by slug (only enabled studies)
 */
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug && cs.enabled);
}

/**
 * Case studies data
 * Content is loaded from markdown files in case-studies/
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "linelab",
    title:
      "You have Boeing on the customer list and no idea how to get the next 10 deals.",
    subtitle: "LineLab — Analytical Production System Modeling",
    summary:
      "Enterprise B2B with world-class logos but no repeatable sales motion. Five verticals, zero dominance. 91/100 differentiation score but 58 LinkedIn followers.",
    company: "LineLab",
    industry: "B2B SaaS — Manufacturing / Simulation",
    industryTag: "B2B Enterprise",
    stage: "Early market, crossing the chasm",
    demandScore: 80.5,
    verdict: "GO",
    keyFindings: [
      "Selling across 5 verticals with no beachhead — every deal is a custom pitch",
      "58 LinkedIn followers despite having Boeing as a customer",
      "Category doesn't exist in buyers' minds — invisible in academic reviews",
    ],
    theOneThing:
      "Pick aerospace defense. Build 5 referenceable customers in 6 months. Stop chasing green tech startups.",
    numberThatMatters:
      "91/100 competitive differentiation — genuinely unique methodology with no direct competitor",
    author: "Thomas McDonough",
    publishedAt: "2026-02-13",
    contentPath: "linelab.md",
    featured: true,
    enabled: true,
    website: "https://www.linelab.io",
    logo: "/case-studies/linelab-logo.png",
    diagnosisUrl: "/growth-diagnosis-reports/linelab/linelab-diagnosis-delivery.html",
  },
  {
    slug: "tiny-whirlwinds",
    title:
      "A brilliant product that nobody knows exists is a failed business.",
    subtitle: "Tiny Whirlwinds — Baby Sensory Classes",
    summary:
      "B2C local business with a validated product and zero digital presence. Instagram was 2 days old. Only 4 term bookings with launch 2 weeks away.",
    company: "Tiny Whirlwinds",
    industry: "B2C — Local Services / Early Years",
    industryTag: "B2C Local",
    stage: "Pre-launch",
    demandScore: 68,
    verdict: "CONDITIONAL",
    keyFindings: [
      "Effectively invisible — no Google My Business, no Happity listing, no local partnerships",
      "Franchise ambitions before proving the first location",
      "Solo operator with no backup plan — one illness cancels everything",
    ],
    theOneThing:
      "Get 20 new parents through the door in 30 days. Leaflets, bring-a-friend, Instagram 4x/week.",
    numberThatMatters:
      "80/100 ICP clarity — crystal clear who the customer is. The gap was purely visibility.",
    author: "Thomas McDonough",
    publishedAt: "2026-02-13",
    contentPath: "tiny-whirlwinds.md",
    featured: true,
    enabled: true,
    website: "https://tinywhirlwinds.com",
    logo: "/case-studies/tiny-whirlwinds-logo.png",
    diagnosisUrl: "/growth-diagnosis-reports/tinywhirlwinds/tinywhirlwinds-diagnosis-delivery.html",
  },
  {
    slug: "qala",
    title:
      "You're sitting on a regulatory gold rush and nobody can tell what you actually do.",
    subtitle: "Qala — Data Observability & Compliance",
    summary:
      "€1.7M pre-seed with ex-exit founders, massive regulatory tailwinds, and a website that says everything and nothing. Source-level governance in a $20-30B market.",
    company: "Qala",
    industry: "B2B SaaS — Data Governance / Compliance",
    industryTag: "B2B Enterprise",
    stage: "Pre-seed, €1.7M raised",
    demandScore: 75,
    verdict: "CONDITIONAL",
    keyFindings: [
      "Website reads like enterprise boilerplate — no founder story, no visible customers",
      "Source-level governance is genuinely differentiated but messaging doesn't make it visceral",
      "Targeting all regulated industries instead of picking a beachhead",
    ],
    theOneThing:
      "Lead with the Imburse exit story. Pick European fintech under DORA pressure. Get one design partner.",
    numberThatMatters:
      "$20-30B combined TAM by 2030 — enormous opportunity if they can articulate the difference",
    author: "Thomas McDonough",
    publishedAt: "2026-02-13",
    contentPath: "qala.md",
    featured: true,
    enabled: false,
    website: "https://www.qala.ai",
  },
];

/**
 * Diagnosis report sections — what the £10 diagnosis includes
 */
export const DIAGNOSIS_SECTIONS = [
  {
    title: "Stage Diagnosis & Demand Score",
    description:
      "A 0-100 score across 6 dimensions: problem severity, market readiness, competitive position, founder-market fit, execution capacity, and distribution advantage.",
  },
  {
    title: "Market Intel & Competitive Landscape",
    description:
      "TAM/SAM/SOM sizing, competitor analysis with funding and positioning, and market timing assessment.",
  },
  {
    title: "Strategic Assessment",
    description:
      "GO / NO-GO / CONDITIONAL verdict with SWOT analysis, risk flags (red and yellow), and evidence-backed reasoning.",
  },
  {
    title: "Growth Experiments",
    description:
      "Prioritised experiments with hypotheses, success criteria, kill criteria, and time estimates — designed for your actual capacity.",
  },
  {
    title: "Content Strategy & Channel Recommendations",
    description:
      "Where your customers actually hang out, what to post, and what NOT to waste time on. Anti-suggestions included.",
  },
  {
    title: "Founder Mirror",
    description:
      "The uncomfortable truths. Cognitive biases detected, assumption audits, and the hard questions nobody else will ask.",
  },
  {
    title: "90-Day Growth Roadmap",
    description:
      "The One Thing to focus on, milestone timeline, and a channel-by-channel deep dive.",
  },
  {
    title: "Domain Expert Analysis",
    description:
      "Deep dive into how your specific industry works — buying psychology, ecosystem mapping, and what 'good' looks like.",
  },
];

/**
 * Stats for the "By The Numbers" section
 */
export const DIAGNOSIS_STATS = [
  { value: "30", label: "Minutes" },
  { value: "1000+", label: "Data Points" },
  { value: "6", label: "Demand Dimensions" },
  { value: "$10", label: "vs $5,000 consultants" },
];

/**
 * FAQ for the diagnosis page
 */
export const DIAGNOSIS_FAQ = [
  {
    question: "How long does it take?",
    answer:
      "You'll receive your full diagnosis report within 30 minutes of submitting your details. It's fully automated and instant.",
  },
  {
    question: "What do you need from me?",
    answer:
      "Just your company name, website URL, and a brief description of what you do. We handle the rest — our system researches your market, competitors, positioning, and growth opportunities automatically.",
  },
  {
    question: "What if my startup is pre-launch?",
    answer:
      "We've diagnosed pre-launch companies. If you have a landing page or product description, we can work with it. The diagnosis adapts to your stage — pre-launch companies get different experiments than post-traction ones.",
  },
  {
    question: "Is this just ChatGPT with a wrapper?",
    answer:
      "No. This is a proprietary multi-step analysis engine. Unlike a single prompt, our system performs deep recursive research — validating market demand, cross-referencing competitor data, and stress-testing your value proposition against real-world signals.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes, 7-day money-back guarantee. If the diagnosis doesn't surface at least one insight you hadn't considered, we'll refund you. No questions asked.",
  },
  {
    question: "Is my data kept private?",
    answer:
      "Yes. Your company data is used solely for your diagnosis and is not shared with anyone. We may use anonymised patterns (e.g., 'a B2B SaaS company') to improve our agents, but never your company name or specifics without explicit permission.",
  },
  {
    question: "What makes this worth $10?",
    answer:
      "A growth consultant charges $5,000+ for a comparable analysis — and takes weeks. We deliver in 30 minutes. The $10 covers our compute costs. We're pricing it low because we're building case studies and proving the system works.",
  },
  {
    question: "Will you try to upsell me?",
    answer:
      "The report stands on its own. If you want ongoing growth support after reading it, we offer that — but there's zero pressure. Most founders get enough from the diagnosis to act on for months.",
  },
];
