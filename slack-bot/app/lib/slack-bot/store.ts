/**
 * In-memory workspace state store for the Slack bot MVP.
 * Will be replaced with a persistent DB in production.
 * @module slack-bot/store
 */

import type { WorkspaceState } from "./types";

const workspaces = new Map<string, WorkspaceState>();

/** Rate-limit tracker: workspace_id → { count, resetAt }. */
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

/** Get workspace state by composite key (workspace_id or workspace_id:channel_id). */
export function getWorkspace(id: string): WorkspaceState | undefined {
  return workspaces.get(id);
}

/** Set workspace state. */
export function setWorkspace(id: string, state: WorkspaceState): void {
  workspaces.set(id, state);
}

/** Partially update workspace state. */
export function updateWorkspace(
  id: string,
  updates: Partial<WorkspaceState>,
): WorkspaceState | undefined {
  const existing = workspaces.get(id);
  if (!existing) return undefined;
  const updated = { ...existing, ...updates, updated_at: new Date().toISOString() };
  workspaces.set(id, updated);
  return updated;
}

/** Create a fresh workspace state. */
export function createWorkspace(
  workspaceId: string,
  channelId: string,
): WorkspaceState {
  const now = new Date().toISOString();
  const state: WorkspaceState = {
    workspace_id: workspaceId,
    channel_id: channelId,
    url: null,
    company_name: null,
    phase: "onboarding",
    website_content: null,
    founder_profile: null,
    insights: [],
    findings: [],
    checkpoints: [],
    checkpoint_answers: {},
    current_checkpoint: 0,
    experiments: [],
    mirror_insights: [],
    created_at: now,
    updated_at: now,
  };
  const key = `${workspaceId}:${channelId}`;
  workspaces.set(key, state);
  return state;
}

/**
 * Check if a workspace has exceeded the daily analysis rate limit.
 * Returns true if rate-limited.
 */
export function isRateLimited(workspaceId: string): boolean {
  const now = Date.now();
  const entry = rateLimits.get(workspaceId);
  if (!entry || now > entry.resetAt) {
    rateLimits.set(workspaceId, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}
