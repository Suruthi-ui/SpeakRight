import { NextRequest, NextResponse } from "next/server";
import { analyzeCommunicationNative } from "@/lib/analyzer";
import { AnalyzeRequest } from "@/types/communication";

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

    // Run native communication analysis engine
    const analysis = analyzeCommunicationNative(body);

    return NextResponse.json({
      success: true,
      data: analysis,
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to analyze message.",
      },
      { status: 500 }
    );
  }
}
