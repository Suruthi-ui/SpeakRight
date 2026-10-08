/**
 * WhatsApp Cloud API Client
 * Configured to work with Meta Graph API for sending messages
 */
export class WhatsAppClient {
  private token: string;
  private phoneNumberId: string;
  private apiVersion: string;

  constructor(options?: { token?: string; phoneNumberId?: string; apiVersion?: string }) {
    this.token = options?.token || process.env.WHATSAPP_API_TOKEN || "";
    this.phoneNumberId = options?.phoneNumberId || process.env.WHATSAPP_PHONE_NUMBER_ID || "";
    this.apiVersion = options?.apiVersion || "v20.0";
  }

  public isConfigured(): boolean {
    return Boolean(this.token && this.phoneNumberId);
  }

  public async sendTextMessage(to: string, text: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (!this.isConfigured()) {
      return {
        success: false,
        error: "WhatsApp Cloud API credentials not configured. Please set WHATSAPP_API_TOKEN and WHATSAPP_PHONE_NUMBER_ID.",
      };
    }

    try {
      const response = await fetch(
        `https://graph.facebook.com/${this.apiVersion}/${this.phoneNumberId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to,
            type: "text",
            text: { body: text },
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return { success: false, error: data?.error?.message || "Failed to send WhatsApp message" };
      }

      return { success: true, messageId: data.messages?.[0]?.id };
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Unknown network error";
      return { success: false, error };
    }
  }
}

export const defaultWhatsAppClient = new WhatsAppClient();
