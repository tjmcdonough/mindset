/**
 * Slack Bot types for GrowthMind AI Growth Co-Founder.
 * @module slack-bot/types
 */

/** A single interrogation checkpoint — finding → question → options. */
export interface Checkpoint {
  key: string;
  finding: string;
  question: string;
  options: {
    label: string;
    reveals_textarea: boolean;
    textarea_placeholder?: string;
  }[];
}

/** Per-workspace state for the Slack bot MVP (in-memory). */
export interface WorkspaceState {
  workspace_id: string;
  channel_id: string;
  url: string | null;
  company_name: string | null;
  phase:
    | "onboarding"
    | "url_provided"
    | "analyzing"
    | "interrogation"
    | "experiments"
    | "active";
  website_content: string | null;
  founder_profile: Record<string, unknown> | null;
  insights: Insight[];
  findings: string[];
  checkpoints: Checkpoint[];
  checkpoint_answers: Record<
    string,
    { selected: string; detail: string | null }
  >;
  current_checkpoint: number;
  experiments: Experiment[];
  mirror_insights: MirrorInsight[];
  created_at: string;
  updated_at: string;
}

/** A Tier-1 insight from the website analysis agent. */
export interface Insight {
  severity: "critical" | "warning" | "strength";
  headline: string;
  detail: string;
}

/** A Tier-2 growth experiment. */
export interface Experiment {
  title: string;
  hypothesis: string;
  the_play: string;
  effort: string;
  expected_outcome: string;
  success_metric: string;
  kill_signal: string;
}

/** A Founder Mirror insight. */
export interface MirrorInsight {
  severity: "blind_spot" | "bias" | "bright_spot";
  headline: string;
  detail: string;
  hard_question?: string;
}

/** Slack Block Kit block (simplified). */
export interface Block {
  type: string;
  text?: { type: string; text: string; emoji?: boolean };
  fields?: { type: string; text: string }[];
  elements?: unknown[];
  accessory?: unknown;
  block_id?: string;
  [key: string]: unknown;
}
