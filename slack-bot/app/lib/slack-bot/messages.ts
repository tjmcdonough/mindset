/**
 * Slack Block Kit message builders for GrowthMind bot.
 * @module slack-bot/messages
 */

import type { Block, Checkpoint, Experiment, Insight, MirrorInsight } from "./types";

/** Welcome message when bot is first added or "start"/"help" is said. */
export function buildWelcomeMessage(): { blocks: Block[]; text: string } {
  const text =
    "🧠 Hey! I'm Growthmind — your AI Growth Co-Founder.";
  const blocks: Block[] = [
    {
      type: "header",
      text: { type: "plain_text", text: "🧠 Growthmind", emoji: true },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Hey! I'm *Growthmind* — your AI Growth Co-Founder.\n\nI diagnose your startup's growth, design experiments, and hold you accountable weekly.",
      },
    },
    { type: "divider" },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "To get started, share your website URL and I'll analyse your business.\n\nJust type: `@Growthmind https://your-startup.com`",
      },
    },
  ];
  return { blocks, text };
}

/** Shown while analysis is running. */
export function buildAnalyzingMessage(url: string): {
  blocks: Block[];
  text: string;
} {
  const domain = extractDomain(url);
  const text = `🔍 Analysing ${domain}...`;
  const blocks: Block[] = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `🔍 *Analysing ${domain}...*\n\nI'm running three agents in parallel:\n• *Website Analysis* — scanning your product, positioning, and gaps\n• *Founder Research* — finding out who's behind this\n• *Growth Diagnosis* — identifying your biggest opportunities\n\nThis takes about 30 seconds. I'll reply in this thread when ready.`,
      },
    },
  ];
  return { blocks, text };
}

const SEVERITY_EMOJI: Record<string, string> = {
  critical: "🔴",
  warning: "🟡",
  strength: "🟢",
};

/** Tier 1 results with "Go Deeper" button. */
export function buildTier1ResultsMessage(
  insights: Insight[],
  companyName: string,
): { blocks: Block[]; text: string } {
  const text = `Growth diagnosis for ${companyName}`;
  const blocks: Block[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `🪞 Growth Diagnosis: ${companyName}`,
        emoji: true,
      },
    },
  ];

  for (const insight of insights) {
    const emoji = SEVERITY_EMOJI[insight.severity] || "⚪";
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${emoji} *${insight.headline}*\n${insight.detail}`,
      },
    });
  }

  blocks.push(
    { type: "divider" },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Want to go deeper? Answer 5 quick questions and I'll generate *personalised growth experiments*.",
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: { type: "plain_text", text: "Go Deeper 🔥", emoji: true },
          action_id: "go_deeper",
          style: "primary",
        },
      ],
    },
  );

  return { blocks, text };
}

/** Interrogation checkpoint question. */
export function buildCheckpointMessage(
  checkpoint: Checkpoint,
  index: number,
  total: number,
): { blocks: Block[]; text: string } {
  const text = `Question ${index + 1} of ${total}: ${checkpoint.question}`;
  const blocks: Block[] = [
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `_${checkpoint.finding}_`,
        },
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${checkpoint.question}*`,
      },
    },
    {
      type: "actions",
      block_id: `checkpoint_block_${checkpoint.key}`,
      elements: checkpoint.options.map((opt, optIdx) => ({
        type: "button",
        text: {
          type: "plain_text",
          text: opt.label.slice(0, 75), // Slack limit
          emoji: true,
        },
        action_id: `checkpoint_${checkpoint.key}_${optIdx}`,
        value: JSON.stringify({
          key: checkpoint.key,
          optionIndex: optIdx,
          label: opt.label,
        }),
      })),
    },
    {
      type: "context",
      elements: [
        { type: "mrkdwn", text: `Question ${index + 1} of ${total}` },
      ],
    },
  ];
  return { blocks, text };
}

/** Tier 2 personalised experiments. */
export function buildTier2ResultsMessage(experiments: Experiment[]): {
  blocks: Block[];
  text: string;
} {
  const text = "🧪 Your personalised growth experiments are ready!";
  const blocks: Block[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "🧪 Your Growth Experiments",
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Based on your answers, here are experiments designed specifically for your startup:",
      },
    },
    { type: "divider" },
  ];

  for (const exp of experiments) {
    blocks.push(
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*${exp.title}*\n\n💡 *Hypothesis:* ${exp.hypothesis}\n\n🎯 *The Play:* ${exp.the_play}\n\n⚡ *Effort:* ${exp.effort} · *Expected Outcome:* ${exp.expected_outcome}`,
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `📊 Success: ${exp.success_metric} · 🛑 Kill if: ${exp.kill_signal}`,
          },
        ],
      },
      { type: "divider" },
    );
  }

  return { blocks, text };
}

const MIRROR_EMOJI: Record<string, string> = {
  blind_spot: "🫣",
  bias: "⚠️",
  bright_spot: "✨",
};

/** Founder Mirror message. */
export function buildMirrorMessage(mirrorInsights: MirrorInsight[]): {
  blocks: Block[];
  text: string;
} {
  const text = "🪞 Your Founder Mirror";
  const blocks: Block[] = [
    {
      type: "header",
      text: { type: "plain_text", text: "🪞 Founder Mirror", emoji: true },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "_This is the truth about you as a founder — uncomfortable, evidence-based, and designed to make you better._",
      },
    },
    { type: "divider" },
  ];

  for (const insight of mirrorInsights) {
    const emoji = MIRROR_EMOJI[insight.severity] || "🔍";
    let body = `${emoji} *${insight.headline}*\n${insight.detail}`;
    if (insight.hard_question) {
      body += `\n\n❓ _${insight.hard_question}_`;
    }
    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: body },
    });
  }

  return { blocks, text };
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}
