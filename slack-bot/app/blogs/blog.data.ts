/**
 * Blog metadata and content configuration
 * Centralized data source for all blog posts
 */

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  contentPath: string;
  image?: string;
}

/**
 * Blog posts metadata
 * Content is loaded from markdown files in blogs/{date}/
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "stop-speaking-to-users",
    title: "Stop 'Speaking to Users' — Why You Need Desperate People Who Speak to You First",
    summary:
      "Most startup advice says 'speak to users'. This is often wrong. You need a strategy to identify desperate users who speak to you first. Here is how we and our customers did it.",
    author: "Thomas McDonough",
    authorRole: "Product & Engineering",
    authorAvatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    publishedAt: "2026-02-11",
    readTime: "6 min read",
    tags: ["Startup Strategy", "Customer Discovery", "Product Market Fit", "Growth Experiments"],
    featured: true,
    contentPath: "2026-02-11/stop-speaking-to-users.md",
    image: "/blogs/2026-02-11/stop-speaking-to-users.jpg",
  },
  {
    slug: "forget-saas-yc-bet-service-as-a-software",
    title:
      "Forget SaaS. YC's New Bet is Service-as-a-Software — And We're All In.",
    summary:
      "Y Combinator's recent RFS highlights the shift to 'Service-as-a-Software'. Here is how Growthmind is applying this thesis to replace the traditional growth agency.",
    author: "Thomas McDonough",
    authorRole: "Product & Engineering",
    authorAvatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    publishedAt: "2026-02-05",
    readTime: "5 min read",
    tags: ["Service-as-a-Software", "Agency Model", "AI Agents", "Y Combinator"],
    featured: true,
    contentPath: "2026-02-05/forget-saas-yc-bet-service-as-a-software.md",
    image: "/blogs/2026-02-05/forget-saas-yc-bet-service-as-a-software.png",
  },
  {
    slug: "shortcut-to-getting-on-yc",
    title: "The Shortcut to Getting into Y Combinator: We Built an AI That Benchmarks You Against S25 & W26 Cohorts",
    summary:
      "Applying to YC is a black box. We cracked it open. Our new free tool analyzes your startup against thousands of successful applications to tell you exactly where you stand—before you hit submit.",
    author: "Thomas McDonough",
    authorRole: "Product & Engineering",
    authorAvatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    publishedAt: "2026-02-05",
    readTime: "4 min read",
    tags: ["Y Combinator", "Startup Strategy", "AI Analysis", "Launch"],
    featured: true,
    contentPath: "2026-02-05/shortcut-to-getting-on-yc.md",
    image: "/blogs/2026-02-05/shortcut-to-getting-on-yc.png",
  },
  {
    slug: "why-founders-skip-validation",
    title: "Why 90% of Founders Skip Validation (And Die For It)",
    summary:
      "The graveyard of startups is filled with founders who were 'too busy building' to validate. There is a reason 90% of startups fail, and it's not lack of talent—it's lack of honesty.",
    author: "Thomas McDonough",
    authorRole: "Product & Engineering",
    authorAvatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    publishedAt: "2026-01-30",
    readTime: "7 min read",
    tags: [
      "Startup Strategy",
      "Validation",
      "Founder Psychology",
      "Product Market Fit",
    ],
    featured: true,
    contentPath: "2026-01-30/why-founders-skip-validation.md",
  },
  {
    slug: "why-progressive-interrogation-ux-will-be-the-end-of-chat-based-ux-in-ai-apps",
    title:
      "Why Progressive Interrogation UX will be the End of Chat-Based UX in AI Apps",
    summary:
      "Every product manager in AI knows the rule: reduce friction. Make onboarding seamless. Drop them into the chat interface as fast as possible. I believed this completely. Until I realized it was killing our product.",
    author: "Thomas McDonough",
    authorRole: "Product & Engineering",
    authorAvatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    publishedAt: "2026-01-20",
    readTime: "8 min read",
    tags: ["AI UX", "Product Design", "Onboarding", "Chat Interfaces"],
    featured: true,
    contentPath: "2026-01-20/blog-progressive-interrogation.md",
    image: "/blogs/2026-01-20/progressive-interrogation.svg",
  },
  {
    slug: "we-let-our-own-ai-roast-our-business-model",
    title: "We Let Our Own AI Roast Our Business Model. It Was Brutal.",
    summary:
      "Most founders lie to themselves about their startup's flaws. We decided to let our own AI do the judging. It gave us a 53/60 score—but it also highlighted three existential threats we were trying to ignore.",
    author: "Thomas McDonough",
    authorRole: "Product & Engineering",
    authorAvatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    publishedAt: "2026-01-29",
    readTime: "5 min read",
    tags: [
      "Startup Strategy",
      "AI Analysis",
      "Transparency",
      "Founder Journey",
    ],
    featured: true,
    contentPath: "2026-01-29/we-let-our-own-ai-roast-our-business-model.md",
  },
  {
    slug: "agency-replacement-why-retainers-are-dead",
    title:
      'The $5k/mo Retainer is Dead: Why We’re Betting on "Agency Replacement"',
    summary:
      "Our internal assessment flagged 'Agency Fatigue' as our single biggest market opportunity. The market is tired of high retainers for low results.",
    author: "Thomas McDonough",
    authorRole: "Product & Engineering",
    authorAvatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    publishedAt: "2026-01-30",
    readTime: "6 min read",
    tags: ["Agency Model", "Future of Work", "AI Agents", "Cost Savings"],
    featured: false,
    contentPath: "2026-01-30/agency-replacement-why-retainers-are-dead.md",
  },
  {
    slug: "painkiller-vs-vitamin",
    title:
      'Painkiller vs. Vitamin: If Your AI Startup Is Just "Nice to Have," You Are Already Dead.',
    summary:
      "In our Business Assessment, the most important field isn't the score—it's the Classification. Why tools that don't solve 'death of the company' problems will see massive churn.",
    author: "Thomas McDonough",
    authorRole: "Product & Engineering",
    authorAvatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    publishedAt: "2026-01-28",
    readTime: "5 min read",
    tags: ["Startup Strategy", "Product Market Fit", "B2B SaaS", "Founders"],
    featured: false,
    contentPath: "2026-01-28/painkiller-vs-vitamin.md",
  },
  {
    slug: "uncomfortable-questions-before-launching",
    title:
      "3 Uncomfortable Questions We Had to Answer Before Launching Growthmind",
    summary:
      "The hardest part of our own AI assessment wasn't the market data—it was the 'Uncomfortable Questions'. 'Why would a founder trust an AI with their brand voice?'",
    author: "Thomas McDonough",
    authorRole: "Product & Engineering",
    authorAvatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    publishedAt: "2026-01-25",
    readTime: "7 min read",
    tags: ["Transparency", "Building in Public", "Trust", "AI Safety"],
    featured: false,
    contentPath: "2026-01-25/uncomfortable-questions-before-launching.md",
  },
  {
    slug: "buyer-user-paradox-selling-outcomes",
    title: "The B2B Paradox: Why Your Buyer and Your User Are at War",
    summary:
      "In B2B, the person signing the check often has opposite incentives to the person using the tool. Here is how to bridge the gap between 'Control' and 'Speed'.",
    author: "Thomas McDonough",
    authorRole: "Product & Engineering",
    authorAvatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    publishedAt: "2026-01-29",
    readTime: "5 min read",
    tags: ["B2B SaaS", "Product Strategy", "Sales", "Enterprise"],
    featured: false,
    contentPath: "2026-01-29/the-buyer-user-chasm.md",
  },
];

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getAllBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

/**
 * Get a single blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

/**
 * Get featured blog posts
 */
export function getFeaturedBlogPosts(): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.featured);
}

/**
 * Get blog posts by tag
 */
export function getBlogPostsByTag(tag: string): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.tags.includes(tag));
}
