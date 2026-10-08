import { NextRequest, NextResponse } from "next/server";
import { WhatsAppWebhookPayload } from "@/services/whatsapp/types";
import { defaultWhatsAppClient } from "@/services/whatsapp/client";
import { processWhatsAppPreSendMessage } from "@/services/whatsapp/messageProcessor";

/**
 * GET Handler for Meta Webhook Verification
 * Meta WhatsApp Cloud API sends a GET request to verify the webhook URL.
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const expectedToken = process.env.WHATSAPP_VERIFY_TOKEN || "speakright_webhook_verify_token";

  if (mode === "subscribe" && token === expectedToken) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}

/**
 * POST Handler for Meta Webhook Incoming Messages
 * Receives incoming WhatsApp messages, rewrites them for clarity, and can send back suggestions.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as WhatsAppWebhookPayload;

    if (body.object === "whatsapp_business_account") {
      for (const entry of body.entry || []) {
        for (const change of entry.changes || []) {
          const messages = change.value.messages;
          if (messages && messages.length > 0) {
            for (const msg of messages) {
              if (msg.type === "text" && msg.text?.body) {
                const incomingText = msg.text.body;
                const senderPhone = msg.from;

                // Process rewrite
                try {
                  const result = await processWhatsAppPreSendMessage({
                    rawMessage: incomingText,
                    recipientContext: "manager",
                    desiredTone: "direct",
                    senderId: senderPhone,
                  });

                  // If WhatsApp client is configured, send the improved message back
                  if (defaultWhatsAppClient.isConfigured()) {
                    await defaultWhatsAppClient.sendTextMessage(
                      senderPhone,
                      `✨ *SpeakRight AI Rewrite* (Score: ${result.toneScore}/100):\n\n${result.rewrittenMessage}\n\n💡 *Coach Tip:* ${result.explanationBrief}`
                    );
                  }
                } catch (procErr) {
                  console.error("Error processing WhatsApp message:", procErr);
                }
              }
            }
          }
        }
      }
      return NextResponse.json({ status: "processed" }, { status: 200 });
    }

    return NextResponse.json({ status: "ignored" }, { status: 404 });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
