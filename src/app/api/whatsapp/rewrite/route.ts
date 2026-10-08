import { NextRequest, NextResponse } from "next/server";
import { processWhatsAppPreSendMessage } from "@/services/whatsapp/messageProcessor";
import { WhatsAppPreSendRequest } from "@/services/whatsapp/types";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as WhatsAppPreSendRequest;

    if (!body || !body.rawMessage) {
      return NextResponse.json(
        { error: "rawMessage is required for pre-send rewrite." },
        { status: 400 }
      );
    }

    const customApiKey =
      req.headers.get("x-gemini-api-key") ||
      (req.headers.get("authorization")?.replace("Bearer ", "")) ||
      undefined;

    const result = await processWhatsAppPreSendMessage(body, customApiKey);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process WhatsApp pre-send rewrite." },
      { status: 500 }
    );
  }
}
