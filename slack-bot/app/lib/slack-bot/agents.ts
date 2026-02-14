/**
 * AI agent logic for GrowthMind Slack bot.
 * Uses Gemini for website analysis, experiment generation, and founder mirror.
 * @module slack-bot/agents
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Checkpoint, Experiment, Insight, MirrorInsight } from "./types";

function getModel() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
}

/** Parse JSON from a Gemini response, stripping markdown fences. */
function parseJson<T>(text: string): T {
  const cleaned = text
    .trim()
    .replace(/^```json?\s*\n?/i, "")
    .replace(/\n?```\s*$/i, "");
  return JSON.parse(cleaned) as T;
}

/** Fetch and extract text content from a URL. */
async function fetchWebsiteContent(url: string): Promise<{ content: string; title: string }> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "GrowthMind-Bot/1.0" },
      signal: AbortSignal.timeout(8000),
    });
    const html = await res.text();
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    const title = titleMatch?.[1]?.trim() || "";
    const content = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 8000);
    return { content, title };
  } catch {
    return { content: "", title: "" };
  }
}

/** Result from the Tier 1 website analysis. */
export interface AnalysisResult {
  companyName: string;
  insights: Insight[];
  findings: string[];
  founderProfile: Record<string, unknown> | null;
  checkpoints: Checkpoint[];
  websiteContent: string;
}

/**
 * Analyse a website URL with 3 parallel Gemini agents.
 * Returns insights, findings, founder profile, and interrogation checkpoints.
 */
export async function analyzeWebsite(url: string): Promise<AnalysisResult> {
  const model = getModel();
  const { content: websiteContent, title } = await fetchWebsiteContent(url);

  const companyName =
    title?.split(/[|\-–—]/)[0]?.trim() ||
    new URL(url).hostname.replace("www.", "").split(".")[0] ||
    "Your Startup";

  const contentBlock = websiteContent || "Could not fetch website content — analyse based on the URL alone.";

  // Agent 1: Website analysis
  const websitePrompt = `You are a brutally honest startup advisor who has seen 1,000+ startups fail. Analyse this website and generate 3-5 "uncomfortable truth" insights about the business.

Website URL: ${url}
Company Name: ${companyName}
Website Content:
${contentBlock}

Generate a JSON object with two keys: "insights" and "findings".

"insights" is an array. Each insight must have:
- "severity": one of "critical", "warning", or "strength"
- "headline": a punchy, provocative one-liner (under 20 words). Be specific to THIS business.
- "detail": 2-3 sentences expanding on the insight. Reference specific things from their website.

"findings" is an array of exactly 5 short observations (1 sentence each) about this business that can be used to personalise follow-up questions. Each finding should reference something SPECIFIC from their website. Write them in second person.

Rules:
- At least one "critical" and one "strength"
- Be uncomfortably specific — reference actual copy, features, or gaps
- No generic startup advice

Respond ONLY with a valid JSON object, no markdown, no code fences.`;

  // Agent 2: Founder research
  const founderPrompt = `You are a startup research analyst. Extract founder information from this website.

Website URL: ${url}
Company Name: ${companyName}
Website Content:
${contentBlock}

Return a JSON object:
{
  "founderName": "name or null",
  "founderRole": "role or null",
  "isTeam": true/false,
  "teamSize": number or null,
  "background": "1-2 sentence summary",
  "companyAge": "how long, if detectable",
  "founderStory": "narrative or null",
  "signals": ["3-5 second-person observations about the founder"]
}

Respond ONLY with valid JSON, no markdown, no code fences.`;

  // Agent 3: Checkpoints
  const checkpointsPrompt = `You are an interrogation agent for a startup advisor. Generate 5 follow-up questions based on this website analysis.

Each question follows: Finding → Question → Options pattern.

Website URL: ${url}
Company Name: ${companyName}
Website Content: ${contentBlock}

Return JSON:
{
  "checkpoints": [
    {
      "key": "unique_key",
      "finding": "Specific observation about their website (1-2 sentences, second person)",
      "question": "Direct question (under 15 words)",
      "options": [
        { "label": "Answer choice", "reveals_textarea": false },
        { "label": "Answer with detail", "reveals_textarea": true, "textarea_placeholder": "Tell us more..." }
      ]
    }
  ]
}

Rules:
- Exactly 5 checkpoints with 3-4 options each
- At least 1 option per question with reveals_textarea: true
- Cover: traction, customer contact, time allocation, avoidance, commitment
- Adapt to what the website actually shows
- Every question must reference something specific from the website

Respond ONLY with valid JSON, no markdown, no code fences.`;

  const [websiteResult, founderResult, checkpointsResult] = await Promise.all([
    model.generateContent(websitePrompt),
    model.generateContent(founderPrompt),
    model.generateContent(checkpointsPrompt),
  ]);

  // Parse results
  let insights: Insight[] = [];
  let findings: string[] = [];
  try {
    const parsed = parseJson<{ insights: Insight[]; findings: string[] }>(
      websiteResult.response.text(),
    );
    insights = parsed.insights || [];
    findings = (parsed.findings || []).map((f: unknown) =>
      typeof f === "string" ? f : String(f),
    );
  } catch {
    insights = [
      {
        severity: "warning",
        headline: "Your website exists, but is anyone listening?",
        detail: `${companyName}'s website is live, but standing out takes more than showing up.`,
      },
    ];
  }

  let founderProfile: Record<string, unknown> | null = null;
  try {
    founderProfile = parseJson<Record<string, unknown>>(founderResult.response.text());
  } catch {
    founderProfile = null;
  }

  let checkpoints: Checkpoint[] = [];
  try {
    const parsed = parseJson<{ checkpoints: Checkpoint[] }>(
      checkpointsResult.response.text(),
    );
    checkpoints = parsed.checkpoints || [];
  } catch {
    checkpoints = [];
  }

  return { companyName, insights, findings, founderProfile, checkpoints, websiteContent };
}

/**
 * Generate Tier 2 personalised growth experiments.
 */
export async function generateDeepExperiments(
  websiteContent: string,
  checkpoints: Checkpoint[],
  answers: Record<string, { selected: string; detail: string | null }>,
): Promise<Experiment[]> {
  const model = getModel();

  const answersText = checkpoints
    .map((cp) => {
      const answer = answers[cp.key];
      if (!answer) return null;
      return `Finding: ${cp.finding}\nQ: ${cp.question}\nA: ${answer.selected}${answer.detail ? ` — ${answer.detail}` : ""}`;
    })
    .filter(Boolean)
    .join("\n\n");

  const prompt = `You are a growth strategist designing experiments for a startup. Based on the website analysis and founder's answers, generate 5-8 specific, actionable growth experiments.

Website Content: ${websiteContent.slice(0, 4000)}

Founder Answers:
${answersText}

Return a JSON array of experiments. Each experiment:
{
  "title": "Experiment name",
  "hypothesis": "If we do X, then Y because Z",
  "the_play": "Step-by-step what to do (2-3 sentences)",
  "effort": "Low/Medium/High",
  "expected_outcome": "What success looks like",
  "success_metric": "Specific measurable metric",
  "kill_signal": "When to stop this experiment"
}

Rules:
- Experiments must be specific to THIS business and the founder's answers
- Mix of quick wins (low effort) and bigger bets
- No generic advice — reference specifics from the website and answers
- Each experiment should be doable within 1-2 weeks

Respond ONLY with a valid JSON array, no markdown, no code fences.`;

  const result = await model.generateContent(prompt);
  try {
    return parseJson<Experiment[]>(result.response.text());
  } catch {
    return [];
  }
}

/**
 * Generate the Founder Mirror — uncomfortable truths about the founder.
 */
export async function generateMirror(
  websiteContent: string,
  founderProfile: Record<string, unknown> | null,
  answers: Record<string, { selected: string; detail: string | null }>,
): Promise<MirrorInsight[]> {
  const model = getModel();

  const answersText = Object.entries(answers)
    .map(([key, val]) => `${key}: ${val.selected}${val.detail ? ` (${val.detail})` : ""}`)
    .join("\n");

  const prompt = `You are a brutally honest startup psychologist. Generate a Founder Mirror — evidence-based truths about this founder.

Website Content: ${websiteContent.slice(0, 4000)}
Founder Profile: ${JSON.stringify(founderProfile)}
Founder Answers:
${answersText}

Return a JSON array of 4-6 insights:
{
  "severity": "blind_spot" | "bias" | "bright_spot",
  "headline": "Punchy headline",
  "detail": "2-3 sentences with evidence",
  "hard_question": "A question that will make them think (or null)"
}

Rules:
- At least 1 bright_spot
- Reference specific evidence from website and answers
- Hard questions should be genuinely uncomfortable
- No generic founder advice

Respond ONLY with a valid JSON array, no markdown, no code fences.`;

  const result = await model.generateContent(prompt);
  try {
    return parseJson<MirrorInsight[]>(result.response.text());
  } catch {
    return [];
  }
}
