import { WhatsAppPreSendRequest, WhatsAppPreSendResponse } from "./types";
import { analyzeCommunicationNative } from "@/lib/analyzer";

/**
 * Pre-Send Message Processor for WhatsApp
 * Intercepts drafted messages from WhatsApp chat extension or webhook bot,
 * passes them through SpeakRight native engine, and formats for instant replacement.
 */
export async function processWhatsAppPreSendMessage(
  request: WhatsAppPreSendRequest
): Promise<WhatsAppPreSendResponse> {
  const analysis = analyzeCommunicationNative({
    message: request.rawMessage,
    recipient: request.recipientContext,
    situation: "Direct Messaging",
    desiredTone: request.desiredTone,
  });

  return {
    originalMessage: request.rawMessage,
    rewrittenMessage: analysis.primaryImprovement.improvedMessage,
    quickReplies: analysis.alternativeRewrites.map((r) => r.message),
    toneScore: analysis.overallScore,
    explanationBrief: analysis.executiveSummary,
  };
}
