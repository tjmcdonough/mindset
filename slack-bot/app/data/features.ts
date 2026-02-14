import {
  IconBulb,
  IconChartBar,
  IconFlask,
  IconLayersLinked,
  IconMessageChatbot,
  IconTarget,
  IconUserCheck,
  IconSearch,
  IconClipboardList,
  IconFileText,
  IconPlugConnected,
  IconRefresh,
} from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";

/**
 * Feature item with icon, title, description, and color
 */
export interface Feature {
  icon: TablerIcon;
  title: string;
  description: string;
  color: string;
}

/**
 * Core feature with additional benefit field and URL slug
 */
export interface CoreFeature extends Feature {
  slug: string;
  benefit: string;
}

/**
 * Differentiator feature (shorter description)
 */
export interface Differentiator {
  icon: TablerIcon;
  title: string;
  description: string;
}

/**
 * Key capabilities displayed on the homepage.
 * Reframed around the experiment loop, not feature count.
 */
export const KEY_CAPABILITIES: Feature[] = [
  {
    icon: IconMessageChatbot,
    title: "Interrogation",
    description:
      "Challenges your assumptions before giving advice. Surfaces blind spots most AI tools ignore.",
    color: "cyan",
  },
  {
    icon: IconTarget,
    title: "Stage Diagnosis",
    description:
      "Determines your real stage and constrains recommendations to only what works there.",
    color: "violet",
  },
  {
    icon: IconFlask,
    title: "Weekly Experiments",
    description:
      "Designs focused, falsifiable experiments each week. Hypothesis in, market signal out.",
    color: "orange",
  },
  {
    icon: IconBulb,
    title: "Compounding Learnings",
    description:
      "Every experiment feeds back into your growth profile. Smarter recommendations over time.",
    color: "cyan",
  },
];

/**
 * Core features displayed on the product page.
 * Reframed around the experiment loop and decision-making.
 */
export const CORE_FEATURES: CoreFeature[] = [
  {
    slug: "interrogation-ai",
    icon: IconMessageChatbot,
    title: "Interrogation-First AI",
    description:
      "Before answering any question, the AI challenges your assumptions. It asks what must be true, what evidence you have, and what would prove you wrong. Strategies built on reality, not wishful thinking.",
    benefit: "Advice grounded in your reality, not generic templates",
    color: "cyan",
  },
  {
    slug: "stage-diagnosis",
    icon: IconTarget,
    title: "Stage Diagnosis",
    description:
      "80% of teams misdiagnose their stage. The AI figures out whether you're at idea, validation, or early traction — then constrains advice to only what works at that stage. No premature scaling.",
    benefit: "Stop wasting months on the wrong growth tactics for your stage",
    color: "violet",
  },
  {
    slug: "market-research",
    icon: IconSearch,
    title: "AI-Powered Market Research",
    description:
      "Automated analysis of your market, competitors, and ideal customers using live data. Covers company stage, brand positioning, ICP, competitive landscape, and strategic gaps.",
    benefit: "Market intelligence in minutes instead of weeks",
    color: "orange",
  },
  {
    slug: "experiment-planning",
    icon: IconFlask,
    title: "Weekly Experiment Framework",
    description:
      "Each week: identify your riskiest assumption, design a minimum viable test, run it, collect signal, and decide next steps. A repeating cycle of hypothesis, test, learn, iterate.",
    benefit: "Find what works through focused weekly experiments",
    color: "cyan",
  },
  {
    slug: "task-execution",
    icon: IconClipboardList,
    title: "Experiment Execution",
    description:
      "The AI generates the specific tasks needed for each experiment — landing pages, outreach sequences, content pieces — prioritised by impact and effort. Clear execution plan, no guesswork.",
    benefit: "Know exactly what to build and test each week",
    color: "violet",
  },
  {
    slug: "content-generation",
    icon: IconFileText,
    title: "Test Asset Generation",
    description:
      "Landing pages, outreach messages, social posts, and email sequences — all generated to test specific hypotheses, optimised for your brand voice and ICP.",
    benefit: "Test assets built in minutes, not days",
    color: "orange",
  },
  {
    slug: "review-queue",
    icon: IconUserCheck,
    title: "Human-in-the-Loop Review",
    description:
      "Nothing goes live without your approval. AI proposes experiments, generates assets, and recommends decisions — you review, edit, and approve. Full control, minimal effort.",
    benefit: "AI proposes, you decide",
    color: "cyan",
  },
  {
    slug: "reality-anchored-strategies",
    icon: IconLayersLinked,
    title: "Reality-Anchored Strategies",
    description:
      "Every recommendation combines your unique business context with real-time market data. No hallucinated advice. No generic playbooks. Strategies grounded in what's actually true.",
    benefit: "Growth plans grounded in evidence, not assumptions",
    color: "violet",
  },
  {
    slug: "performance-analytics",
    icon: IconChartBar,
    title: "Experiment Analytics",
    description:
      "Track what's working across experiments. The AI interprets results, extracts signal from noise, and recommends whether to double down, iterate, or pivot.",
    benefit: "Know what's working without spreadsheet headaches",
    color: "orange",
  },
  {
    slug: "integrations",
    icon: IconPlugConnected,
    title: "Platform Integrations",
    description:
      "Connect your existing tools — analytics, CMS, email, social — so experiments can publish and measure in one place. Spend time on decisions, not tool-switching.",
    benefit: "Run experiments across channels from one place",
    color: "cyan",
  },
  {
    slug: "feedback-loop",
    icon: IconBulb,
    title: "Compounding Learning Loop",
    description:
      "Every experiment — whether it succeeds or fails — feeds back into your growth profile. The AI learns your market, your audience, and what resonates. Recommendations get sharper over time.",
    benefit: "Smarter strategies the more you use it",
    color: "violet",
  },
  {
    slug: "automated-workflows",
    icon: IconRefresh,
    title: "Automated Experiment Cycles",
    description:
      "Strategy auto-renewal, weekly experiment scheduling, and continuous feedback collection. The system keeps your experiment cadence running so you never lose momentum.",
    benefit: "Consistent weekly cadence without manual tracking",
    color: "orange",
  },
];

/**
 * Key differentiators displayed on the product page.
 * Focused on what makes Growthmind's approach unique.
 */
export const DIFFERENTIATORS: Differentiator[] = [
  {
    icon: IconMessageChatbot,
    title: "Interrogation-First",
    description: "Questions your assumptions before giving answers",
  },
  {
    icon: IconTarget,
    title: "Stage-Aware",
    description: "Constrains advice to what works at your actual stage",
  },
  {
    icon: IconFlask,
    title: "Experiment-Driven",
    description: "Weekly hypothesis → test → learn → iterate cycles",
  },
  {
    icon: IconUserCheck,
    title: "Human-in-the-Loop",
    description: "AI proposes, you approve — nothing happens without you",
  },
  {
    icon: IconLayersLinked,
    title: "Reality-Anchored",
    description: "Your context + live market data = grounded strategy",
  },
];
