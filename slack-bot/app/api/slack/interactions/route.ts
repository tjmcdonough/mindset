/**
 * Slack Interactivity endpoint.
 * Handles button clicks from Block Kit messages (Go Deeper, checkpoint answers).
 * @module api/slack/interactions
 */

import { NextResponse } from "next/server";
import { verifySlackSignature, postMessage } from "@/app/lib/slack-bot/slack";
import { getWorkspace, updateWorkspace } from "@/app/lib/slack-bot/store";
import {
  buildCheckpointMessage,
  buildTier2ResultsMessage,
} from "@/app/lib/slack-bot/messages";
import { generateDeepExperiments } from "@/app/lib/slack-bot/agents";

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

  // Slack sends interactivity payloads as form-encoded with a `payload` field
  const params = new URLSearchParams(rawBody);
  const payloadStr = params.get("payload");
  if (!payloadStr) {
    return NextResponse.json({ error: "Missing payload" }, { status: 400 });
  }

  const payload = JSON.parse(payloadStr) as {
    type: string;
    team: { id: string };
    channel: { id: string };
    message: { ts: string; thread_ts?: string };
    actions: { action_id: string; value?: string }[];
    user: { id: string };
  };

  if (payload.type !== "block_actions") {
    return NextResponse.json({ ok: true });
  }

  const teamId = payload.team.id;
  const channel = payload.channel.id;
  const threadTs = payload.message.thread_ts || payload.message.ts;
  const action = payload.actions[0];
  if (!action) return NextResponse.json({ ok: true });

  const stateKey = `${teamId}:${channel}`;
  const state = getWorkspace(stateKey);

  // Handle "Go Deeper" button
  if (action.action_id === "go_deeper") {
    if (!state || state.checkpoints.length === 0) {
      await postMessage(channel, [], "No analysis found — share a URL first!", threadTs);
      return NextResponse.json({ ok: true });
    }

    updateWorkspace(stateKey, { phase: "interrogation", current_checkpoint: 0 });
    const cp = state.checkpoints[0];
    const msg = buildCheckpointMessage(cp, 0, state.checkpoints.length);
    await postMessage(channel, msg.blocks, msg.text, threadTs);
    return NextResponse.json({ ok: true });
  }

  // Handle checkpoint answers
  if (action.action_id.startsWith("checkpoint_")) {
    if (!state) return NextResponse.json({ ok: true });

    let answerData: { key: string; label: string };
    try {
      answerData = JSON.parse(action.value || "{}");
    } catch {
      return NextResponse.json({ ok: true });
    }

    // Store the answer
    const newAnswers = {
      ...state.checkpoint_answers,
      [answerData.key]: { selected: answerData.label, detail: null },
    };
    const nextIdx = state.current_checkpoint + 1;

    if (nextIdx < state.checkpoints.length) {
      // Send next checkpoint
      updateWorkspace(stateKey, {
        checkpoint_answers: newAnswers,
        current_checkpoint: nextIdx,
      });
      const cp = state.checkpoints[nextIdx];
      const msg = buildCheckpointMessage(cp, nextIdx, state.checkpoints.length);
      await postMessage(channel, msg.blocks, msg.text, threadTs);
    } else {
      // All answered — generate Tier 2
      updateWorkspace(stateKey, {
        checkpoint_answers: newAnswers,
        phase: "experiments",
      });

      await postMessage(
        channel,
        [],
        "🧠 All questions answered! Generating your personalised growth experiments...",
        threadTs,
      );

      // Fire async
      generateDeepExperiments(
        state.website_content || "",
        state.checkpoints,
        newAnswers,
      )
        .then(async (experiments) => {
          updateWorkspace(stateKey, { experiments, phase: "active" });
          const msg = buildTier2ResultsMessage(experiments);
          await postMessage(channel, msg.blocks, msg.text, threadTs);
        })
        .catch(async (err) => {
          console.error("Tier 2 generation failed:", err);
          await postMessage(channel, [], "❌ Experiment generation failed — please try again.", threadTs);
        });
    }

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}
