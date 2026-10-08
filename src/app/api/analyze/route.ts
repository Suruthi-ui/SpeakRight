import { NextRequest, NextResponse } from "next/server";
import { generateCommunicationAnalysis } from "@/lib/gemini";
import { AnalyzeRequest } from "@/types/communication";

export const maxDuration = 60; // Allow sufficient time for deep reasoning

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AnalyzeRequest;

    if (!body || !body.message) {
      return NextResponse.json(
        { success: false, error: "Please provide a message to analyze." },
        { status: 400 }
      );
    }

    if (body.message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Message is too short. Please enter at least 5 characters." },
        { status: 400 }
      );
    }

    // Check for user-supplied API key in headers or body
    const customApiKey =
      req.headers.get("x-gemini-api-key") ||
      (req.headers.get("authorization")?.replace("Bearer ", "")) ||
      undefined;

    const analysis = await generateCommunicationAnalysis(body, customApiKey);

    return NextResponse.json({
      success: true,
      data: analysis,
    });
  } catch (err: unknown) {
    const error = err as Error;
    const isAuthError =
      error.message?.includes("API key not found") ||
      error.message?.includes("invalid") ||
      error.message?.includes("API_KEY_INVALID");

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to analyze message with Gemini AI.",
      },
      { status: isAuthError ? 401 : 500 }
    );
  }
}
