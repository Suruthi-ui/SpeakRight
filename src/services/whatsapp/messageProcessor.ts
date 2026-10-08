import { WhatsAppPreSendRequest, WhatsAppPreSendResponse } from "./types";
import { generateCommunicationAnalysis } from "@/lib/gemini";

/**
 * Pre-Send Message Processor for WhatsApp
 * Intercepts drafted messages from WhatsApp chat extension or webhook bot,
 * passes them through SpeakRight AI engine, and formats for instant replacement.
 */
export async function processWhatsAppPreSendMessage(
  request: WhatsAppPreSendRequest,
  apiKey?: string
): Promise<WhatsAppPreSendResponse> {
  const analysis = await generateCommunicationAnalysis(
    {
      message: request.rawMessage,
      recipient: request.recipientContext,
      situation: "Direct Messaging",
      desiredTone: request.desiredTone,
    },
    apiKey
  );

  return {
    originalMessage: request.rawMessage,
    rewrittenMessage: analysis.primaryImprovement.improvedMessage,
    quickReplies: analysis.alternativeRewrites.map((r) => r.message),
    toneScore: analysis.overallScore,
    explanationBrief: analysis.executiveSummary,
  };
}
