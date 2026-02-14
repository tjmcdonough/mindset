import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// In-memory rate limiting — resets on server restart
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
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

interface AnswerEntry {
  selected: string;
  detail: string | null;
}

interface CheckpointOption {
  label: string;
  reveals_textarea: boolean;
  textarea_placeholder?: string;
}

interface Checkpoint {
  key: string;
  finding: string;
  question: string;
  options: CheckpointOption[];
}

interface DeepMirrorRequest {
  url: string;
  websiteContent: string;
  checkpoints: Checkpoint[];
  answers: Record<string, AnswerEntry>;
  findings: string[];
}

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Try again later.", rateLimited: true },
        { status: 429 },
      );
    }

    const body = (await request.json()) as DeepMirrorRequest;
    const { url, websiteContent, checkpoints, answers, findings } = body;

    if (!url || !answers) {
      return NextResponse.json(
        { error: "URL and answers are required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service not configured" },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const fmtAnswer = (a: AnswerEntry) => a?.detail ? `${a.selected} — "${a.detail}"` : a?.selected || "No answer";
    const findingsBlock = findings?.length ? `\nFINDINGS FROM WEBSITE SCAN:\n${findings.map((f, i) => `${i + 1}. ${f}`).join("\n")}` : "";

    // Format checkpoint Q&A dynamically
    const checkpointAnswersBlock = (checkpoints || []).map((cp, i) => {
      const answer = answers[cp.key];
      return `${i + 1}. Finding: "${cp.finding}"
   Question: ${cp.question}
   Answer: ${fmtAnswer(answer)}`;
    }).join("\n");

    // Fallback for old-format answers (without checkpoints)
    const answersBlock = checkpointAnswersBlock || Object.entries(answers).map(([key, val], i) => {
      return `${i + 1}. ${key}: ${fmtAnswer(val as AnswerEntry)}`;
    }).join("\n");

    const prompt = `You are the Founder Mirror — a deeply experienced growth advisor who holds up a mirror to founders. You surface uncomfortable truths backed by EVIDENCE, identify cognitive biases, and ask hard questions. You're the honest friend who tells them what nobody else will — not to be cruel, but because the truth is the most valuable thing a growth advisor can offer.

You have TWO sources of truth:
1. What the founder's WEBSITE shows the world
2. What the founder PRIVATELY ADMITTED in a questionnaire

WEBSITE URL: ${url}
WEBSITE CONTENT:
${websiteContent || "Could not fetch - analyse based on URL and answers alone."}
${findingsBlock}

FOUNDER'S PRIVATE ANSWERS:
${answersBlock}

Generate exactly 5 insights as a JSON array. Each must have:
- "severity": "critical", "warning", or "strength"
- "headline": a specific, punchy one-liner (under 20 words). Format as a named insight like "#1 — The Building Trap" or "#2 — Your Hidden Advantage"
- "detail": 3-4 sentences. MUST reference specific evidence — their exact answers, specific things from their website, or contradictions between the two. Every claim needs backing.
- "hard_question": One thought-provoking question for the founder to sit with (not answer immediately). Open-ended, not leading.

APPROACH:
1. **Uncomfortable Truths (2-3 insights):** Compare what their website SHOWS vs what they ADMITTED. Find the gap. Reference specific website copy or features alongside their answers. Each truth must have evidence — no vibes.
2. **Cognitive Bias Detection (1 insight):** Identify a specific bias visible in their approach — confirmation bias, sunk cost fallacy, curse of knowledge, planning fallacy, optimism bias. Name the bias, show the evidence, explain the impact, offer a reframe.
3. **Bright Spot (1 insight, severity "strength"):** Find something genuinely good — an advantage they're undervaluing, something their honesty reveals, or a real strength in their product/approach. This must be genuine, not consolation.

RULES:
- NEVER be cruel or dismissive. The goal is growth, not humiliation.
- Every truth MUST have specific evidence from their website or answers. Say "You said '${answers.users.selected}'" or "Your website claims X but..."
- Don't assume the founder's emotional state — present evidence and let them draw conclusions.
- Acknowledge uncertainty: "The data suggests X, but you know your customers better than we do."
- Calibrate intensity: a founder with zero users gets different truths than one with traction.
- The hard questions should be genuinely thought-provoking. No right answer implied.
- Ratio: ~60% challenge, ~40% encouragement. The mirror should make them THINK, not feel attacked.
- These insights should feel like they could ONLY have been written for THIS specific founder and THIS specific business.

Respond ONLY with a valid JSON array, no markdown, no code fences.`;

    const geminiResult = await model.generateContent(prompt);
    const responseText = geminiResult.response.text().trim();

    let insights;
    try {
      const cleaned = responseText.replace(/^```json?\s*\n?/i, "").replace(/\n?```\s*$/i, "");
      insights = JSON.parse(cleaned);
    } catch {
      const firstAnswer = Object.values(answers)[0] as AnswerEntry | undefined;
      insights = [
        {
          severity: "critical",
          headline: "The gap between your website and reality is your biggest risk",
          detail: firstAnswer ? `You said '${firstAnswer.selected}' — but your website tells a different story. This disconnect between narrative and reality is exactly where startups die.` : "The disconnect between what your website promises and your reality is where startups die — not from bad products, but from self-deception.",
        },
        {
          severity: "warning",
          headline: "Your answers reveal more than you think",
          detail: "The pattern in your answers tells a story. The things you chose — and the things you avoided — paint a picture of where you really are versus where you think you are.",
        },
        {
          severity: "strength",
          headline: "You answered honestly. Most founders can't even do that.",
          detail: "The fact that you were willing to admit uncomfortable truths puts you in the top 10% of founders we've analysed. Self-awareness is the prerequisite for everything else.",
        },
      ];
    }

    // Slack notification with founder answers (gold data)
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (slackWebhookUrl) {
      fetch(slackWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `🪞🔥 Deep Mirror completed: ${url}`,
          blocks: [
            {
              type: "header",
              text: {
                type: "plain_text",
                text: "🪞🔥 Deep Mirror — Founder Answers Captured!",
                emoji: true,
              },
            },
            {
              type: "section",
              fields: [
                { type: "mrkdwn", text: `*URL:*\n<${url}|${url}>` },
                { type: "mrkdwn", text: `*Questions:*\n${(checkpoints || []).length || Object.keys(answers).length}` },
              ],
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*Answers:*\n${(checkpoints || []).map((cp) => {
                  const a = answers[cp.key];
                  return `• ${cp.question}: ${a?.selected || "N/A"}${a?.detail ? ` — "${a.detail}"` : ""}`;
                }).join("\n") || Object.entries(answers).map(([k, v]) => `• ${k}: ${(v as AnswerEntry).selected}${(v as AnswerEntry).detail ? ` — "${(v as AnswerEntry).detail}"` : ""}`).join("\n")}`,
              },
            },
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: `Submitted at: ${new Date().toLocaleString("en-US", { timeZone: "UTC" })} UTC`,
                },
              ],
            },
          ],
        }),
      }).catch(() => {});
    }

    return NextResponse.json({
      insights,
      tier: 2,
    });
  } catch (error) {
    console.error("Deep Mirror API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
