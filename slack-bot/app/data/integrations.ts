import {
  IconAd,
  IconAnalyze,
  IconBrandSlack,
  IconBrandYoutube,
  IconCalendar,
  IconChartBar,
  IconCode,
  IconCreditCard,
  IconFileText,
  IconForms,
  IconHeadset,
  IconMail,
  IconNews,
  IconPointer,
  IconSearch,
  IconUsers,
  IconVideo,
  IconWorld,
} from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";

/**
 * Integration category metadata
 */
export interface CategoryMeta {
  icon: TablerIcon;
  title: string;
  description: string;
  color: string;
}

/**
 * Individual integration
 */
export interface Integration {
  id: string;
  name: string;
  description: string;
  logo?: string;
  comingSoon?: boolean;
}

/**
 * Simple integration format (used in ProductClient)
 */
export interface SimpleIntegration {
  category: string;
  platforms: Array<{
    name: string;
    logo: string;
  }>;
}

/**
 * Category metadata with icons and descriptions.
 * Single source of truth for integration categories.
 */
export const CATEGORY_META: Record<string, CategoryMeta> = {
  analytics: {
    icon: IconChartBar,
    title: "Web Analytics",
    description:
      "Track visitor behavior, traffic sources, and conversion paths to understand what's driving growth.",
    color: "cyan",
  },
  social: {
    icon: IconWorld,
    title: "Social Media",
    description:
      "Publish content, engage audiences, and track performance across all major social platforms.",
    color: "violet",
  },
  email: {
    icon: IconMail,
    title: "Email Marketing",
    description:
      "Send campaigns, automate sequences, and track engagement to nurture leads into customers.",
    color: "orange",
  },
  cms: {
    icon: IconNews,
    title: "Content Management",
    description:
      "Publish blog posts, landing pages, and SEO content directly to your website or CMS.",
    color: "cyan",
  },
  crm: {
    icon: IconUsers,
    title: "CRM",
    description:
      "Sync leads, track deals, and maintain a unified view of your customer relationships.",
    color: "violet",
  },
  ads: {
    icon: IconAd,
    title: "Advertising",
    description: "Manage ad campaigns, track ROAS, and optimize spend across paid channels.",
    color: "red",
  },
  community: {
    icon: IconUsers,
    title: "Community",
    description: "Build and engage your community with discussion forums and member management.",
    color: "yellow",
  },
  revenue: {
    icon: IconCreditCard,
    title: "Revenue & Payments",
    description: "Track MRR, churn, LTV, and payment analytics to understand your revenue health.",
    color: "green",
  },
  messaging: {
    icon: IconBrandSlack,
    title: "Team Messaging",
    description: "Get real-time notifications and updates delivered to your team's chat workspace.",
    color: "violet",
  },
  product_analytics: {
    icon: IconAnalyze,
    title: "Product Analytics",
    description:
      "Understand user behavior, track events, and identify opportunities to improve retention.",
    color: "cyan",
  },
  meetings: {
    icon: IconVideo,
    title: "Meeting Intelligence",
    description:
      "Analyze customer calls, extract insights, and identify patterns from sales and support conversations.",
    color: "orange",
  },
  seo: {
    icon: IconSearch,
    title: "SEO Tools",
    description:
      "Track rankings, monitor backlinks, and identify keyword opportunities to grow organic traffic.",
    color: "cyan",
  },
  support: {
    icon: IconHeadset,
    title: "Customer Support",
    description:
      "Analyze support tickets, identify common issues, and improve customer satisfaction.",
    color: "violet",
  },
  ux_analytics: {
    icon: IconPointer,
    title: "UX Analytics",
    description:
      "Watch session replays, analyze heatmaps, and understand how users interact with your product.",
    color: "orange",
  },
  scheduling: {
    icon: IconCalendar,
    title: "Scheduling",
    description:
      "Sync calendars, track meetings, and optimize your schedule for maximum productivity.",
    color: "cyan",
  },
  forms: {
    icon: IconForms,
    title: "Forms & Surveys",
    description: "Capture leads, collect feedback, and run surveys to understand customer needs.",
    color: "violet",
  },
  productivity: {
    icon: IconFileText,
    title: "Productivity",
    description: "Sync with your docs and databases to keep everything organized and accessible.",
    color: "yellow",
  },
  devops: {
    icon: IconCode,
    title: "DevOps & Monitoring",
    description: "Track deployments, monitor errors, and keep your development workflow connected.",
    color: "cyan",
  },
  video: {
    icon: IconBrandYoutube,
    title: "Video Platforms",
    description:
      "Manage video content, track analytics, and grow your audience on video platforms.",
    color: "red",
  },
};

/**
 * All integrations organized by category.
 * Single source of truth for integration data.
 */
export const INTEGRATIONS: Record<string, Integration[]> = {
  analytics: [
    {
      id: "google_analytics_4",
      name: "Google Analytics 4",
      description: "Track website traffic, user behavior, and conversion goals",
      logo: "/integrations/google-analytics.svg",
    },
    {
      id: "plausible",
      name: "Plausible",
      description: "Privacy-friendly analytics without cookies",
      logo: "/integrations/plausible.svg",
    },
    {
      id: "fathom",
      name: "Fathom",
      description: "Simple, privacy-first website analytics",
      logo: "/integrations/fathom.svg",
    },
    {
      id: "google_search_console",
      name: "Google Search Console",
      description: "Monitor search performance and indexing status",
      logo: "/integrations/google-search-console.svg",
    },
  ],
  social: [
    {
      id: "linkedin",
      name: "LinkedIn",
      description: "Publish posts and track engagement on LinkedIn",
      logo: "/integrations/linkedin.svg",
    },
    {
      id: "twitter",
      name: "X (Twitter)",
      description: "Schedule tweets and monitor brand mentions",
      logo: "/integrations/twitter.svg",
    },
    {
      id: "facebook",
      name: "Facebook",
      description: "Manage pages and track post performance",
      logo: "/integrations/facebook.svg",
    },
    {
      id: "instagram",
      name: "Instagram",
      description: "Schedule content and analyze engagement",
      logo: "/integrations/instagram.svg",
    },
  ],
  email: [
    {
      id: "sendgrid",
      name: "SendGrid",
      description: "Send transactional and marketing emails at scale",
      logo: "/integrations/sendgrid.svg",
    },
    {
      id: "mailchimp",
      name: "Mailchimp",
      description: "Email campaigns, automation, and audience management",
      logo: "/integrations/mailchimp.svg",
    },
    {
      id: "convertkit",
      name: "ConvertKit",
      description: "Email marketing for creators and founders",
    },
    {
      id: "resend",
      name: "Resend",
      description: "Modern email API for developers",
    },
    {
      id: "gmail",
      name: "Gmail",
      description: "Analyze inbox patterns and response times",
    },
    {
      id: "outlook",
      name: "Outlook",
      description: "Microsoft email integration and calendar sync",
    },
  ],
  cms: [
    {
      id: "webflow",
      name: "Webflow",
      description: "Publish directly to your Webflow CMS collections",
      logo: "/integrations/webflow.svg",
    },
    {
      id: "wordpress",
      name: "WordPress",
      description: "Publish blog posts to your WordPress site",
      logo: "/integrations/wordpress.svg",
    },
    {
      id: "ghost",
      name: "Ghost",
      description: "Publish to Ghost's modern publishing platform",
    },
    {
      id: "medium",
      name: "Medium",
      description: "Cross-post content to Medium for wider reach",
    },
  ],
  crm: [
    {
      id: "hubspot",
      name: "HubSpot",
      description: "Sync contacts, deals, and marketing data",
      logo: "/integrations/hubspot.svg",
    },
    {
      id: "salesforce",
      name: "Salesforce",
      description: "Enterprise CRM integration for larger teams",
    },
  ],
  ads: [
    {
      id: "google_ads",
      name: "Google Ads",
      description: "Track campaign performance and optimize spend",
    },
    {
      id: "facebook_ads",
      name: "Facebook Ads",
      description: "Monitor ad performance and ROAS",
    },
    {
      id: "linkedin_ads",
      name: "LinkedIn Ads",
      description: "Track B2B advertising campaigns",
    },
  ],
  community: [
    {
      id: "circle",
      name: "Circle",
      description: "Community platform analytics and engagement",
    },
  ],
  revenue: [
    {
      id: "stripe",
      name: "Stripe",
      description: "Track MRR, churn, LTV, and payment analytics",
      logo: "/integrations/stripe.svg",
    },
    {
      id: "paddle",
      name: "Paddle",
      description: "Subscription metrics and payment analytics",
    },
    {
      id: "lemon_squeezy",
      name: "Lemon Squeezy",
      description: "Revenue tracking for digital products",
      logo: "/integrations/lemonsqueezy.svg",
    },
  ],
  messaging: [
    {
      id: "slack",
      name: "Slack",
      description: "Get task notifications and AI insights in Slack",
      logo: "/integrations/slack.svg",
    },
    {
      id: "discord",
      name: "Discord",
      description: "Notifications and updates in Discord servers",
      logo: "/integrations/discord.svg",
    },
    {
      id: "ms_teams",
      name: "Microsoft Teams",
      description: "Enterprise team notifications and updates",
    },
  ],
  product_analytics: [
    {
      id: "mixpanel",
      name: "Mixpanel",
      description: "Track user events, funnels, and retention",
      logo: "/integrations/mixpanel.svg",
    },
    {
      id: "amplitude",
      name: "Amplitude",
      description: "Product analytics and user behavior insights",
      logo: "/integrations/amplitude.svg",
    },
    {
      id: "posthog",
      name: "PostHog",
      description: "Open-source product analytics and feature flags",
      logo: "/integrations/posthog.svg",
    },
  ],
  meetings: [
    {
      id: "loom",
      name: "Loom",
      description: "Analyze video content and viewer engagement",
      logo: "/integrations/loom.svg",
    },
    {
      id: "zoom",
      name: "Zoom",
      description: "Meeting transcripts and conversation analysis",
      logo: "/integrations/zoom.svg",
    },
    {
      id: "fathom_video",
      name: "Fathom AI",
      description: "AI meeting notes and call intelligence",
    },
    {
      id: "fireflies",
      name: "Fireflies.ai",
      description: "Transcribe and analyze meeting conversations",
      logo: "/integrations/fireflies.svg",
    },
  ],
  seo: [
    {
      id: "ahrefs",
      name: "Ahrefs",
      description: "Track backlinks, keywords, and competitor analysis",
      comingSoon: true,
    },
    {
      id: "semrush",
      name: "Semrush",
      description: "SEO audits, rank tracking, and keyword research",
      comingSoon: true,
    },
  ],
  support: [
    {
      id: "intercom",
      name: "Intercom",
      description: "Customer messaging and support analytics",
      logo: "/integrations/intercom.svg",
    },
    {
      id: "zendesk",
      name: "Zendesk",
      description: "Help desk metrics and ticket analysis",
    },
    {
      id: "freshdesk",
      name: "Freshdesk",
      description: "Customer support platform integration",
    },
    {
      id: "crisp",
      name: "Crisp",
      description: "Live chat and customer support analytics",
    },
    {
      id: "front",
      name: "Front",
      description: "Shared inbox and customer communication",
    },
    {
      id: "help_scout",
      name: "Help Scout",
      description: "Customer service platform and knowledge base",
    },
  ],
  ux_analytics: [
    {
      id: "hotjar",
      name: "Hotjar",
      description: "Heatmaps, session recordings, and user feedback",
      logo: "/integrations/hotjar.svg",
    },
    {
      id: "fullstory",
      name: "FullStory",
      description: "Digital experience analytics and session replay",
    },
    {
      id: "logrocket",
      name: "LogRocket",
      description: "Session replay with console logs for debugging",
    },
  ],
  scheduling: [
    {
      id: "calendly",
      name: "Calendly",
      description: "Track meeting bookings and scheduling patterns",
      logo: "/integrations/calendly.svg",
    },
    {
      id: "cal_com",
      name: "Cal.com",
      description: "Open-source scheduling and availability",
    },
    {
      id: "google_calendar",
      name: "Google Calendar",
      description: "Sync events and track meeting patterns",
    },
  ],
  forms: [
    {
      id: "typeform",
      name: "Typeform",
      description: "Analyze form responses and survey results",
    },
    {
      id: "tally",
      name: "Tally",
      description: "Form builder with response analytics",
    },
  ],
  productivity: [
    {
      id: "notion",
      name: "Notion",
      description: "Sync docs, databases, and project info",
      logo: "/integrations/notion.svg",
    },
    {
      id: "airtable",
      name: "Airtable",
      description: "Database sync and automation workflows",
    },
  ],
  devops: [
    {
      id: "github",
      name: "GitHub",
      description: "Track commits, PRs, and development velocity",
      logo: "/integrations/github.svg",
    },
    {
      id: "vercel",
      name: "Vercel",
      description: "Deployment analytics and performance metrics",
      logo: "/integrations/vercel.svg",
    },
    {
      id: "sentry",
      name: "Sentry",
      description: "Error tracking and performance monitoring",
    },
    {
      id: "linear",
      name: "Linear",
      description: "Issue tracking and project management sync",
    },
    {
      id: "jira",
      name: "Jira",
      description: "Atlassian project management integration",
    },
  ],
  video: [
    {
      id: "youtube",
      name: "YouTube",
      description: "Video analytics, engagement, and channel growth",
      logo: "/integrations/youtube.svg",
    },
  ],
};

/**
 * Category display order.
 * Controls the order categories appear in the integrations page.
 */
export const CATEGORY_ORDER = [
  "analytics",
  "product_analytics",
  "revenue",
  "cms",
  "social",
  "email",
  "crm",
  "ads",
  "support",
  "meetings",
  "messaging",
  "ux_analytics",
  "seo",
  "scheduling",
  "forms",
  "productivity",
  "devops",
  "video",
  "community",
] as const;

/**
 * Simple integrations format for ProductClient display.
 * Derived from main INTEGRATIONS data.
 */
export const SIMPLE_INTEGRATIONS: SimpleIntegration[] = [
  {
    category: "Analytics",
    platforms: [
      { name: "Google Analytics 4", logo: "/integrations/google-analytics.svg" },
      { name: "Plausible", logo: "/integrations/plausible.svg" },
    ],
  },
  {
    category: "Product",
    platforms: [{ name: "Mixpanel", logo: "/integrations/mixpanel.svg" }],
  },
  {
    category: "Revenue",
    platforms: [{ name: "Stripe", logo: "/integrations/stripe.svg" }],
  },
  {
    category: "Email",
    platforms: [{ name: "SendGrid", logo: "/integrations/sendgrid.svg" }],
  },
  {
    category: "CMS",
    platforms: [
      { name: "Webflow", logo: "/integrations/webflow.svg" },
      { name: "WordPress", logo: "/integrations/wordpress.svg" },
    ],
  },
  {
    category: "Meetings",
    platforms: [
      { name: "Zoom", logo: "/integrations/zoom.svg" },
      { name: "Fireflies", logo: "/integrations/fireflies.svg" },
      { name: "Fathom", logo: "/integrations/fathom.svg" },
      { name: "Loom", logo: "/integrations/loom.svg" },
    ],
  },
  {
    category: "Team",
    platforms: [{ name: "Slack", logo: "/integrations/slack.svg" }],
  },
];

/**
 * Get total count of all integrations
 */
export function getTotalIntegrationsCount(): number {
  return Object.values(INTEGRATIONS).flat().length;
}
