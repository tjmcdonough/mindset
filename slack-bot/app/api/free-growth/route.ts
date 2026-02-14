import { NextResponse } from "next/server";

export interface FreeGrowthFormData {
  domain: string;
  companyName: string;
  productUrl?: string;
  additionalInfo?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as FreeGrowthFormData;
    const { domain, companyName, productUrl, additionalInfo } = body;

    // Validate required fields
    if (!domain || !companyName) {
      return NextResponse.json(
        { error: "Domain and company name are required" },
        { status: 400 },
      );
    }

    // Get Slack webhook URL from environment
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!slackWebhookUrl) {
      console.error("SLACK_WEBHOOK_URL environment variable not set");
      return NextResponse.json(
        { error: "Slack integration not configured" },
        { status: 500 },
      );
    }

    // Format message for Slack
    const slackMessage = {
      text: "🚀 New Free Product & Growth Analysis Request",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🚀 New Free Product & Growth Analysis Request",
            emoji: true,
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Company Name:*\n${companyName}`,
            },
            {
              type: "mrkdwn",
              text: `*Website:*\n${domain}`,
            },
          ],
        },
        ...(productUrl
          ? [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*Product URL:*\n<${productUrl}|${productUrl}>`,
                },
              },
            ]
          : []),
        ...(additionalInfo
          ? [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*Additional Information:*\n${additionalInfo}`,
                },
              },
            ]
          : []),
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Expected Output:*\n• Company Seed\n• Product Status (UX feedback, improvements)\n• Market Intel\n• Growth Voice\n• Growth Pulse (stage diagnosis + next steps)",
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
    };

    // Send to Slack
    const slackResponse = await fetch(slackWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slackMessage),
    });

    if (!slackResponse.ok) {
      console.error("Slack API error:", await slackResponse.text());
      return NextResponse.json(
        { error: "Failed to send notification" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
    });
  } catch (error) {
    console.error("Error processing free growth form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
