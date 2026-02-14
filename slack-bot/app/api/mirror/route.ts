import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// In-memory rate limiting — resets on server restart
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: Request) {
  try {
    // Rate limiting by IP
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Try again later.", rateLimited: true },
        { status: 429 },
      );
    }

    const body = (await request.json()) as { url: string };
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Fetch website content
    let websiteContent = "";
    let title = "";
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "GrowthMind-Mirror/1.0" },
        signal: AbortSignal.timeout(8000),
      });
      const html = await res.text();

      const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
      title = titleMatch?.[1]?.trim() || "";

      websiteContent = html
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 8000);
    } catch {
      // Site fetch failed
    }

    const companyName =
      title?.split(/[|\-–—]/)[0]?.trim() ||
      new URL(url).hostname.replace("www.", "").split(".")[0] ||
      "Your Startup";

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service not configured" },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    // === TWO AGENTS IN PARALLEL ===
    // Agent 1: Website analysis (insights + findings)
    // Agent 2: Founder research (who is behind this?)

    const websiteAnalysisPrompt = `You are a brutally honest startup advisor who has seen 1,000+ startups fail. Analyse this website and generate 3-5 "uncomfortable truth" insights about the business.

Website URL: ${url}
Company Name: ${companyName}
Website Content:
${websiteContent || "Could not fetch website content - analyse based on the URL alone."}

Generate a JSON object with two keys: "insights" and "findings".

"insights" is an array. Each insight must have:
- "severity": one of "critical", "warning", or "strength"
- "headline": a punchy, provocative one-liner (under 20 words). Be specific to THIS business, not generic.
- "detail": 2-3 sentences expanding on the insight. Reference specific things from their website.

"findings" is an array of exactly 5 short observations (1 sentence each) about this business that can be used to personalise follow-up questions. Each finding should reference something SPECIFIC you observed about their website — missing social proof, feature count, no pricing, no blog, competitor positioning, etc. Write them in second person ("Your website...").

Rules for insights:
- At least one must be "critical"
- At least one must be "strength" (find something genuinely good)
- Be uncomfortably specific — reference actual copy, features, or gaps from their site
- No generic startup advice. Every insight must be about THIS specific company.
- Don't be mean for the sake of it — be honest because it helps

Respond ONLY with a valid JSON object like {"insights": [...], "findings": [...]}, no markdown, no code fences.`;

    const founderResearchPrompt = `You are a startup research analyst. Your job is to find out WHO is behind this website and what their background is.

Website URL: ${url}
Company Name: ${companyName}
Website Content:
${websiteContent || "Could not fetch website content."}

Extract any information about the founder(s) from the website content. Look for:
- Names (from about page, footer, team section, blog posts, meta tags)
- Roles/titles
- Background clues (technical vs business, years of experience)
- How long the company has been around (copyright dates, blog post dates, "since" mentions)
- Solo founder or team
- Any personal details they've shared (why they built this, their story)

Generate a JSON object:
{
  "founderName": "name or null if not found",
  "founderRole": "role or null",
  "isTeam": true/false,
  "teamSize": number or null,
  "background": "1-2 sentence summary of founder background based on available info",
  "companyAge": "how long they've been at this, if detectable",
  "founderStory": "any personal narrative about why they built this, or null",
  "signals": ["list of 3-5 observations about the founder as second-person statements — e.g. 'Your background is engineering — no marketing experience visible on the site', 'You appear to be a solo founder wearing all hats', 'You left a corporate role to build this'"]
}

If you can't find founder info, still return the JSON with null values and note what's missing in signals (e.g. "There's no about page — you're hiding behind the product").

Respond ONLY with a valid JSON object, no markdown, no code fences.`;

    // === Agent 3: Interrogation checkpoints ===
    const checkpointsPrompt = `You are an interrogation agent for a startup advisor system. You've just analysed a website and need to generate 5 follow-up questions to dig deeper into the founder's situation.

Each question follows the "Finding → Question → Options" pattern:
- Finding: A specific observation about their website that prompted this question (1-2 sentences, second person "Your...")
- Question: A direct question to the founder based on that finding (concise, punchy)
- Options: 3-4 answer choices. Each option should be a realistic answer a founder might give. At least one option should have reveals_textarea: true with a textarea_placeholder for additional detail.

The questions should cover these areas (but adapt to what you actually found):
1. Traction/validation — how real is the usage/demand?
2. Customer contact — have they actually talked to anyone?
3. Time allocation — building vs selling vs stuck?
4. Avoidance — what are they putting off?
5. Commitment — how serious are they?

But ADAPT the specific questions and options to what the website reveals. For example:
- If the site has a "Book a Demo" CTA → ask about demo conversion, not just "do you have users"
- If the site mentions specific customers → ask about those relationships
- If the site has pricing → ask about conversion at that price point
- If there's no blog → ask about their content strategy
- If it's a B2B product → ask about sales pipeline
- If it's B2C → ask about acquisition channels

IMPORTANT: The options must be SPECIFIC to the question, not generic. If asking about pricing, the options should reference their actual price. If asking about customers, reference the type of customer their product targets.

Website URL: ${url}
Company Name: ${companyName}
Website Content: ${websiteContent || "Could not fetch website content - analyse based on URL alone."}

Return a JSON object:
{
  "checkpoints": [
    {
      "key": "unique_key_like_traction_validation",
      "finding": "Your website mentions 'trusted by 100+ teams' but has no logos, testimonials, or case studies to back this up.",
      "question": "How many teams are actually using this right now?",
      "options": [
        { "label": "None yet — that claim is aspirational", "reveals_textarea": false },
        { "label": "A handful (under 10)", "reveals_textarea": false },
        { "label": "10-50 teams", "reveals_textarea": true, "textarea_placeholder": "Tell us about your best customer" },
        { "label": "50+", "reveals_textarea": true, "textarea_placeholder": "What's your biggest challenge at this scale?" }
      ]
    }
  ]
}

Rules:
- Exactly 5 checkpoints
- Each must have 3-4 options
- At least 1 option per question should have reveals_textarea: true
- Questions should feel like they could ONLY be asked about THIS specific website
- No generic startup questions — every question must reference something from the website
- Options should cover the realistic range of answers (from worst case to best case)
- Keep finding text to 1-2 sentences max
- Keep questions concise (under 15 words ideal)

Respond ONLY with a valid JSON object, no markdown, no code fences.`;

    // Fire all three in parallel
    const [websiteResult, founderResult, checkpointsResult] = await Promise.all([
      model.generateContent(websiteAnalysisPrompt),
      model.generateContent(founderResearchPrompt),
      model.generateContent(checkpointsPrompt),
    ]);

    const websiteText = websiteResult.response.text().trim();
    const founderText = founderResult.response.text().trim();
    const checkpointsText = checkpointsResult.response.text().trim();

    // Parse website analysis
    let insights;
    let findings: string[] = [];
    try {
      const cleaned = websiteText.replace(/^```json?\s*\n?/i, "").replace(/\n?```\s*$/i, "");
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed)) {
        insights = parsed;
      } else {
        insights = parsed.insights || [];
        findings = (parsed.findings || []).map((f: unknown) =>
          typeof f === "string"
            ? f
            : typeof f === "object" && f !== null
              ? (f as Record<string, string>).finding ||
                (f as Record<string, string>).text ||
                JSON.stringify(f)
              : String(f),
        );
      }
    } catch {
      insights = [
        {
          severity: "warning" as const,
          headline: "Your website is doing the talking, but is anyone listening?",
          detail: `${companyName}'s website exists, but standing out in a crowded market takes more than just showing up. The question is whether your value proposition hits in under 10 seconds.`,
        },
        {
          severity: "critical" as const,
          headline:
            "You might be building for yourself instead of your customer",
          detail: "Most founders build what they think is cool, not what a paying customer desperately needs. The gap between 'interesting product' and 'must-have product' is the gap between a hobby and a business.",
        },
        {
          severity: "strength" as const,
          headline: "You have a website. That's more than most.",
          detail: "Having a live product that you're willing to put in front of strangers takes guts. The fact that you're looking for honest feedback puts you ahead of 90% of founders who only want validation.",
        },
      ];
      findings = [];
    }

    // Parse founder research
    let founderProfile: Record<string, unknown> | null = null;
    try {
      const cleaned = founderText.replace(/^```json?\s*\n?/i, "").replace(/\n?```\s*$/i, "");
      founderProfile = JSON.parse(cleaned);
    } catch {
      founderProfile = null;
    }

    // Parse checkpoints
    let checkpoints: Array<{
      key: string;
      finding: string;
      question: string;
      options: Array<{ label: string; reveals_textarea: boolean; textarea_placeholder?: string }>;
    }> = [];
    try {
      const cleaned = checkpointsText.replace(/^```json?\s*\n?/i, "").replace(/\n?```\s*$/i, "");
      const parsed = JSON.parse(cleaned);
      checkpoints = parsed.checkpoints || parsed || [];
      if (!Array.isArray(checkpoints)) checkpoints = [];
    } catch {
      checkpoints = [];
    }

    // Enrich findings with founder-specific signals
    if (founderProfile) {
      const founderSignals = ((founderProfile.signals as string[]) || [])
        .filter((s): s is string => typeof s === "string")
        .slice(0, 3);
      // Weave founder signals into findings — replace some generic website findings
      // with founder-specific ones so questions feel personal
      if (founderSignals.length > 0 && findings.length >= 2) {
        findings[1] = founderSignals[0];
      }
      if (founderSignals.length > 1 && findings.length >= 4) {
        findings[3] = founderSignals[1];
      }
    }

    // Slack notification (fire and forget)
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (slackWebhookUrl) {
      fetch(slackWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `🪞 Founder Mirror scan: ${url}`,
          blocks: [
            {
              type: "header",
              text: {
                type: "plain_text",
                text: "🪞 New Founder Mirror Scan",
                emoji: true,
              },
            },
            {
              type: "section",
              fields: [
                { type: "mrkdwn", text: `*URL:*\n<${url}|${url}>` },
                { type: "mrkdwn", text: `*Company:*\n${companyName}` },
                {
                  type: "mrkdwn",
                  text: `*Founder:*\n${founderProfile?.founderName || "Unknown"}`,
                },
              ],
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*Insights:* ${insights.length} | *Founder signals:* ${(founderProfile?.signals as string[])?.length || 0}`,
              },
            },
          ],
        }),
      }).catch(() => {});
    }

    return NextResponse.json({
      companyName,
      insights,
      findings,
      founderProfile,
      checkpoints,
      tier: 1,
    });
  } catch (error) {
    console.error("Mirror API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
