import { NextResponse } from "next/server";

export interface DiagnosisFormData {
  companyName: string;
  websiteUrl: string;
  email: string;
  productUrl?: string;
  description: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DiagnosisFormData;
    const { companyName, websiteUrl, email, description } = body;

    // Validate required fields
    if (!companyName || !websiteUrl || !email || !description) {
      return NextResponse.json(
        { error: "Company name, website URL, email, and description are required" },
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
      text: "💰 New $10 Diagnosis Request",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "💰 New $10 Diagnosis Request",
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
              text: `*Website:*\n<${websiteUrl}|${websiteUrl}>`,
            },
          ],
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Email:*\n${email}`,
            },
            ...(body.productUrl
              ? [
                {
                  type: "mrkdwn",
                  text: `*Product URL:*\n<${body.productUrl}|${body.productUrl}>`,
                },
              ]
              : []),
          ],
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Description:*\n${description}`,
          },
        },
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Action Required:*\n• Run the GrowthMind cascade\n• Deliver diagnosis within 48 hours\n• Payment: $10 (Stripe TBD — manual for now)",
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
      headers: { "Content-Type": "application/json" },
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
      message: "Diagnosis request submitted successfully",
    });
  } catch (error) {
    console.error("Error processing diagnosis form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
