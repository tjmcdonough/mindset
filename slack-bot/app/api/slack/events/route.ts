/**
 * Slack Events API endpoint.
 * Handles url_verification, app_mention, and DM message events.
 * @module api/slack/events
 */

import { NextResponse } from "next/server";
import { verifySlackSignature, postMessage } from "@/app/lib/slack-bot/slack";
import { buildWelcomeMessage, buildAnalyzingMessage, buildTier1ResultsMessage } from "@/app/lib/slack-bot/messages";
import { getWorkspace, createWorkspace, updateWorkspace, isRateLimited } from "@/app/lib/slack-bot/store";
import { analyzeWebsite } from "@/app/lib/slack-bot/agents";

const URL_REGEX = /https?:\/\/[^\s<>]+/;
const START_KEYWORDS = /\b(start|diagnose|help|hello|hi|hey)\b/i;

/** Deduplicate Slack event retries. */
const processedEvents = new Set<string>();

export async function POST(request: Request) {
  const rawBody = await request.text();
  const timestamp = request.headers.get("x-slack-request-timestamp") || "";
  const signature = request.headers.get("x-slack-signature") || "";

  // Verify signature
  const signingSecret = process.env.SLACK_SIGNING_SECRET;
  if (signingSecret) {
    const valid = await verifySlackSignature(signingSecret, signature, timestamp, rawBody);
    if (!valid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  const body = JSON.parse(rawBody) as Record<string, unknown>;

  // URL verification challenge
  if (body.type === "url_verification") {
    return NextResponse.json({ challenge: body.challenge });
  }

  if (body.type !== "event_callback") {
    return NextResponse.json({ ok: true });
  }

  const event = body.event as Record<string, string>;
  const eventId = body.event_id as string;

  // Deduplicate retries
  if (eventId && processedEvents.has(eventId)) {
    return NextResponse.json({ ok: true });
  }
  if (eventId) {
    processedEvents.add(eventId);
    // Clean up after 5 minutes
    setTimeout(() => processedEvents.delete(eventId), 5 * 60 * 1000);
  }

  // Ignore bot messages
  if (event.bot_id || event.subtype === "bot_message") {
    return NextResponse.json({ ok: true });
  }

  const teamId = (body.team_id as string) || "";
  const channel = event.channel || "";
  const text = event.text || "";
  const threadTs = event.thread_ts || event.ts;

  // Handle app_mention and DM messages
  if (event.type === "app_mention" || (event.type === "message" && event.channel_type === "im")) {
    // Respond immediately to Slack (3-second limit), process async
    const responsePromise = handleMessage(teamId, channel, text, threadTs);
    responsePromise.catch((err) => console.error("Slack event handler error:", err));
  }

  return NextResponse.json({ ok: true });
}

async function handleMessage(
  teamId: string,
  channel: string,
  text: string,
  threadTs: string,
): Promise<void> {
  const stateKey = `${teamId}:${channel}`;
  let state = getWorkspace(stateKey);

  // Check for URL in message
  const urlMatch = text.match(URL_REGEX);

  if (urlMatch) {
    // URL shared — start analysis
    const url = urlMatch[0].replace(/[>).,;]+$/, ""); // Clean trailing punctuation

    if (!state) {
      state = createWorkspace(teamId, channel);
    }

    if (isRateLimited(teamId)) {
      await postMessage(channel, [], "⚠️ Rate limit reached — max 10 analyses per day per workspace. Try again tomorrow!", threadTs);
      return;
    }

    updateWorkspace(stateKey, { url, phase: "analyzing" });

    // Send "Analysing..." message
    const { blocks, text: msgText } = buildAnalyzingMessage(url);
    const analyzingTs = await postMessage(channel, blocks, msgText, threadTs);

    try {
      // Run analysis
      const result = await analyzeWebsite(url);

      updateWorkspace(stateKey, {
        company_name: result.companyName,
        insights: result.insights,
        findings: result.findings,
        founder_profile: result.founderProfile,
        checkpoints: result.checkpoints,
        website_content: result.websiteContent,
        phase: "interrogation",
        current_checkpoint: 0,
      });

      // Post Tier 1 results
      const tier1 = buildTier1ResultsMessage(result.insights, result.companyName);
      await postMessage(channel, tier1.blocks, tier1.text, threadTs);

      // Update the "Analysing..." message
      if (analyzingTs) {
        const { updateMessage } = await import("@/app/lib/slack-bot/slack");
        await updateMessage(channel, analyzingTs, [
          {
            type: "section",
            text: { type: "mrkdwn", text: `✅ Analysis complete for *${result.companyName}*` },
          },
        ], `Analysis complete for ${result.companyName}`);
      }
    } catch (err) {
      console.error("Analysis failed:", err);
      await postMessage(channel, [], "❌ Analysis failed — please try again.", threadTs);
      updateWorkspace(stateKey, { phase: "onboarding" });
    }
    return;
  }

  // Start/help keywords or no state — send welcome
  if (!state || START_KEYWORDS.test(text)) {
    if (!state) {
      createWorkspace(teamId, channel);
    }
    const welcome = buildWelcomeMessage();
    await postMessage(channel, welcome.blocks, welcome.text, threadTs);
    return;
  }

  // Default fallback
  await postMessage(
    channel,
    [],
    "👋 Share a website URL and I'll analyse it, or type `help` to see what I can do.",
    threadTs,
  );
}
