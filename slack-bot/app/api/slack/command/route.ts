/**
 * Slack slash command endpoint: /growthmind
 * Subcommands: diagnose <url>, experiments, status, mirror
 * @module api/slack/command
 */

import { NextResponse } from "next/server";
import { verifySlackSignature, postMessage } from "@/app/lib/slack-bot/slack";
import { getWorkspace, createWorkspace, updateWorkspace, isRateLimited } from "@/app/lib/slack-bot/store";
import {
  buildAnalyzingMessage,
  buildTier1ResultsMessage,
  buildTier2ResultsMessage,
  buildMirrorMessage,
} from "@/app/lib/slack-bot/messages";
import { analyzeWebsite, generateMirror } from "@/app/lib/slack-bot/agents";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const timestamp = request.headers.get("x-slack-request-timestamp") || "";
  const signature = request.headers.get("x-slack-signature") || "";

  const signingSecret = process.env.SLACK_SIGNING_SECRET;
  if (signingSecret) {
    const valid = await verifySlackSignature(signingSecret, signature, timestamp, rawBody);
    if (!valid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  const params = new URLSearchParams(rawBody);
  const teamId = params.get("team_id") || "";
  const channelId = params.get("channel_id") || "";
  const text = (params.get("text") || "").trim();
  const responseUrl = params.get("response_url") || "";

  const stateKey = `${teamId}:${channelId}`;
  const state = getWorkspace(stateKey);

  // Parse subcommand
  const parts = text.split(/\s+/);
  const subcommand = parts[0]?.toLowerCase() || "help";

  // Acknowledge immediately (Slack requires <3s response)
  if (subcommand === "diagnose") {
    const url = parts[1];
    if (!url || !url.startsWith("http")) {
      return new Response("Usage: `/growthmind diagnose https://your-startup.com`", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }

    if (isRateLimited(teamId)) {
      return new Response("⚠️ Rate limit reached — max 10 analyses per day.", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // Respond immediately, process async
    handleDiagnose(teamId, channelId, stateKey, url, responseUrl).catch((err) =>
      console.error("Diagnose error:", err),
    );

    return new Response("🔍 Starting analysis... I'll post results in this channel.", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  if (subcommand === "experiments") {
    if (!state || state.experiments.length === 0) {
      return new Response("No experiments yet — run `/growthmind diagnose <url>` first and complete the questions.", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }
    const msg = buildTier2ResultsMessage(state.experiments);
    await postMessage(channelId, msg.blocks, msg.text);
    return new Response("📊 Experiments posted above.", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  if (subcommand === "status") {
    if (!state) {
      return new Response("No analysis yet — run `/growthmind diagnose <url>` to get started.", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }
    const status = [
      `*Company:* ${state.company_name || "Unknown"}`,
      `*URL:* ${state.url || "None"}`,
      `*Phase:* ${state.phase}`,
      `*Insights:* ${state.insights.length}`,
      `*Experiments:* ${state.experiments.length}`,
      `*Questions answered:* ${Object.keys(state.checkpoint_answers).length}/${state.checkpoints.length}`,
    ].join("\n");
    return new Response(status, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  if (subcommand === "mirror") {
    if (!state || !state.website_content) {
      return new Response("No analysis yet — run `/growthmind diagnose <url>` first.", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }

    handleMirror(stateKey, channelId).catch((err) =>
      console.error("Mirror error:", err),
    );

    return new Response("🪞 Generating your Founder Mirror...", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // Help / unknown
  return new Response(
    [
      "*GrowthMind Commands:*",
      "• `/growthmind diagnose <url>` — Analyse a website",
      "• `/growthmind experiments` — Show your growth experiments",
      "• `/growthmind status` — Current analysis status",
      "• `/growthmind mirror` — Get your Founder Mirror",
    ].join("\n"),
    { status: 200, headers: { "Content-Type": "text/plain" } },
  );
}

async function handleDiagnose(
  teamId: string,
  channelId: string,
  stateKey: string,
  url: string,
  _responseUrl: string,
): Promise<void> {
  let state = getWorkspace(stateKey);
  if (!state) {
    state = createWorkspace(teamId, channelId);
  }
  updateWorkspace(stateKey, { url, phase: "analyzing" });

  const { blocks, text } = buildAnalyzingMessage(url);
  await postMessage(channelId, blocks, text);

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

  const tier1 = buildTier1ResultsMessage(result.insights, result.companyName);
  await postMessage(channelId, tier1.blocks, tier1.text);
}

async function handleMirror(stateKey: string, channelId: string): Promise<void> {
  const state = getWorkspace(stateKey);
  if (!state) return;

  const mirrorInsights = await generateMirror(
    state.website_content || "",
    state.founder_profile,
    state.checkpoint_answers,
  );

  updateWorkspace(stateKey, { mirror_insights: mirrorInsights });
  const msg = buildMirrorMessage(mirrorInsights);
  await postMessage(channelId, msg.blocks, msg.text);
}
