/**
 * Slack Web API helpers.
 * Wraps chat.postMessage / chat.update with Block Kit support.
 * @module slack-bot/slack
 */

import type { Block } from "./types";

const SLACK_API = "https://slack.com/api";

function getToken(): string {
  const token = process.env.SLACK_BOT_TOKEN;
  if (!token) throw new Error("SLACK_BOT_TOKEN is not set");
  return token;
}

async function slackApi(
  method: string,
  body: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const res = await fetch(`${SLACK_API}/${method}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as Record<string, unknown>;
  if (!data.ok) {
    console.error(`Slack API error (${method}):`, data.error, data);
  }
  return data;
}

/**
 * Post a message to a Slack channel.
 * @returns The message timestamp (ts) for threading.
 */
export async function postMessage(
  channel: string,
  blocks: Block[],
  text: string,
  thread_ts?: string,
): Promise<string | undefined> {
  const body: Record<string, unknown> = { channel, blocks, text };
  if (thread_ts) body.thread_ts = thread_ts;
  const data = await slackApi("chat.postMessage", body);
  return data.ts as string | undefined;
}

/** Update an existing Slack message. */
export async function updateMessage(
  channel: string,
  ts: string,
  blocks: Block[],
  text: string,
): Promise<void> {
  await slackApi("chat.update", { channel, ts, blocks, text });
}

/**
 * Verify a Slack request signature.
 * @see https://api.slack.com/authentication/verifying-requests-from-slack
 */
export async function verifySlackSignature(
  signingSecret: string,
  signature: string,
  timestamp: string,
  rawBody: string,
): Promise<boolean> {
  const encoder = new TextEncoder();
  const baseString = `v0:${timestamp}:${rawBody}`;
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(signingSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(baseString));
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const computed = `v0=${hex}`;

  // Timing-safe comparison
  if (computed.length !== signature.length) return false;
  let mismatch = 0;
  for (let i = 0; i < computed.length; i++) {
    mismatch |= computed.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return mismatch === 0;
}
