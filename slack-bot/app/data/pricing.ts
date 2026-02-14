import { IconCrown, IconStar } from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";

/**
 * Pricing plan feature
 */
export interface PricingFeature {
  text: string;
}

/**
 * Pricing plan configuration
 */
export interface PricingPlan {
  icon: TablerIcon;
  title: string;
  price: string;
  description: string;
  features: string[];
  highlight: boolean;
  cta: string;
  badge?: string;
  color: string;
}

/**
 * Single source of truth for pricing plans.
 * Used by PricingSection.tsx and PricingClient.tsx.
 */
export const PRICING_PLANS: PricingPlan[] = [
  {
    icon: IconStar,
    title: "Starter",
    price: "$20",
    description: "For solo marketers and makers validating ideas.",
    features: [
      "Stage Diagnosis & Growth Profile",
      "Weekly Experiment Planning",
      "AI Strategy Generation",
      "Basic Test Asset Drafts",
      "Human-in-the-Loop Review",
      "Compounding Learning Loop",
    ],
    highlight: false,
    cta: "Start with Starter",
    color: "gray",
  },
  {
    icon: IconCrown,
    title: "Growth",
    price: "$200",
    description: "Full experiment loop with execution support.",
    features: [
      "Everything in Starter",
      "Advanced Market Research",
      "Multi-Channel Experiment Execution",
      "Platform Integrations",
      "AI Strategy Consultants",
      "Priority Support",
    ],
    highlight: true,
    cta: "Start with Growth",
    badge: "Most Popular",
    color: "cyan",
  },
];

/**
 * Free tier messaging - used for callout cards
 */
export const FREE_TIER = {
  title: "Get Your Free Product & Growth Analysis",
  description:
    "Share your company details and product. We'll analyze what's working, what's broken in your product AND growth, and what to fix first to reach 80% product-market fit — completely free.",
  cta: "Get Free Analysis",
};

/**
 * Money-back guarantee messaging
 */
export const GUARANTEE = {
  text: "7-day money-back guarantee. No questions asked.",
};
