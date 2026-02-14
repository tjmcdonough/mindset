import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email: string; url: string };
    const { email, url } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Slack notification
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (slackWebhookUrl) {
      await fetch(slackWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `🪞 Founder Mirror email capture: ${email} for ${url}`,
          blocks: [
            {
              type: "header",
              text: {
                type: "plain_text",
                text: "🪞 Founder Mirror — Email Captured!",
                emoji: true,
              },
            },
            {
              type: "section",
              fields: [
                { type: "mrkdwn", text: `*Email:*\n${email}` },
                { type: "mrkdwn", text: `*URL:*\n<${url}|${url}>` },
              ],
            },
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: `Captured at: ${new Date().toLocaleString("en-US", { timeZone: "UTC" })} UTC`,
                },
              ],
            },
          ],
        }),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true, redirect: "https://unicorn.growthmind.ai" });
  } catch (error) {
    console.error("Mirror capture error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
