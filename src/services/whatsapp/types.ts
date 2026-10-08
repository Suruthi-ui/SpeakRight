/**
 * WhatsApp Cloud API & Pre-Send Integration Types
 * Designed for future Meta WhatsApp Cloud API integration & custom keyboard extensions.
 */

export interface WhatsAppIncomingMessage {
  from: string; // E.164 phone number
  id: string;
  timestamp: string;
  type: "text" | "interactive" | "button";
  text?: {
    body: string;
  };
}

export interface WhatsAppWebhookPayload {
  object: "whatsapp_business_account";
  entry: Array<{
    id: string;
    changes: Array<{
      value: {
        messaging_product: "whatsapp";
        metadata: {
          display_phone_number: string;
          phone_number_id: string;
        };
        contacts?: Array<{
          profile: {
            name: string;
          };
          wa_id: string;
        }>;
        messages?: WhatsAppIncomingMessage[];
      };
      field: "messages";
    }>;
  }>;
}

export interface WhatsAppPreSendRequest {
  rawMessage: string;
  recipientContext: "professor" | "manager" | "client" | "hr" | "friend" | "colleague";
  desiredTone: "direct" | "diplomatic" | "formal" | "warm";
  senderId?: string;
}

export interface WhatsAppPreSendResponse {
  originalMessage: string;
  rewrittenMessage: string;
  quickReplies: string[];
  toneScore: number;
  explanationBrief: string;
}
