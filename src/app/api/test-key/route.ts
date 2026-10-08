import { NextRequest, NextResponse } from "next/server";
import { testGeminiApiKey } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiKey = body?.apiKey || req.headers.get("x-gemini-api-key") || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { valid: false, message: "No API key was provided to test." },
        { status: 400 }
      );
    }

    const result = await testGeminiApiKey(apiKey);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { valid: false, message: error.message || "Failed to verify key." },
      { status: 500 }
    );
  }
}
