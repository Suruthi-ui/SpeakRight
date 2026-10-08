import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  AnalyzeRequest,
  CommunicationAnalysis,
  DiffHighlight,
} from "@/types/communication";

/**
 * Clean and parse JSON from Gemini's response text, handling markdown fences.
 */
function cleanAndParseJSON<T>(text: string): T {
  let cleaned = text.trim();

  // Strip markdown code block fences if present
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "");
    cleaned = cleaned.replace(/\s*```$/, "");
  }

  try {
    return JSON.parse(cleaned) as T;
  } catch (err) {
    // If partial JSON or escaped characters cause failure, attempt regex extraction
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as T;
    }
    throw new Error(`Failed to parse AI output as JSON: ${(err as Error).message}\nRaw output: ${text.substring(0, 300)}...`);
  }
}

/**
 * Generate word-level or chunk-level diff highlights between original and improved message
 */
function computeDiffHighlights(original: string, improved: string): DiffHighlight[] {
  const origWords = original.split(/\s+/).filter(Boolean);
  const impWords = improved.split(/\s+/).filter(Boolean);

  const highlights: DiffHighlight[] = [];
  const minLen = Math.min(origWords.length, impWords.length);

  // Simplified diff algorithm to illustrate transformation
  for (let i = 0; i < minLen; i++) {
    if (origWords[i].toLowerCase() === impWords[i].toLowerCase()) {
      highlights.push({ type: "kept", text: impWords[i] + " " });
    } else {
      highlights.push({ type: "added", text: impWords[i] + " " });
    }
  }

  if (impWords.length > origWords.length) {
    for (let i = minLen; i < impWords.length; i++) {
      highlights.push({ type: "added", text: impWords[i] + " " });
    }
  }

  return highlights.length > 0
    ? highlights
    : [{ type: "added", text: improved }];
}

/**
 * Validate an API key by making a lightweight test call to Gemini
 */
export async function testGeminiApiKey(apiKey: string): Promise<{ valid: boolean; message: string; modelName?: string }> {
  if (!apiKey || apiKey.trim().length < 10) {
    return { valid: false, message: "API key is missing or too short." };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey.trim());
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Reply with the single word 'OK' to test connection.");
    const responseText = result.response.text();

    if (responseText) {
      return { valid: true, message: "Connected successfully to Google Gemini API!", modelName: "gemini-1.5-flash" };
    }
    return { valid: false, message: "Empty response received from Gemini." };
  } catch (err: unknown) {
    const error = err as Error;
    return { valid: false, message: error.message || "Failed to authenticate with Google AI Studio." };
  }
}

/**
 * Generate full communication analysis using Google AI Studio Gemini API
 */
export async function generateCommunicationAnalysis(
  request: AnalyzeRequest,
  customApiKey?: string
): Promise<CommunicationAnalysis> {
  const apiKey =
    customApiKey?.trim() ||
    process.env.GEMINI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Google Gemini API key not found. Please provide an API key in the UI settings or configure GEMINI_API_KEY in your environment."
    );
  }

  const { message, recipient, situation, desiredTone = "Professional & Polished" } = request;

  if (!message || message.trim().length < 5) {
    throw new Error("Message text is too short to analyze. Please provide at least a few words.");
  }

  const genAI = new GoogleGenerativeAI(apiKey.trim());

  // Use gemini-1.5-flash for lightning fast, highly capable reasoning and low latency
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.2,
      topP: 0.95,
      responseMimeType: "application/json",
    },
  });

  const prompt = `You are "SpeakRight", an elite executive communication coach, behavioral linguist, and master of professional etiquette.
A user has written a draft message and needs your expert analysis, scoring, and rewrites.

INPUT CONTEXT:
- Recipient: "${recipient}"
- Situation: "${situation}"
- Desired Tone: "${desiredTone}"
- Original Draft:
"""
${message}
"""

TASK:
Analyze this communication thoroughly for tone, assertiveness, clarity, psychological impact, and professional etiquette.
Then provide:
1. An overall score (0 to 100) and breakdown (clarity, confidence, politeness, conciseness).
2. The primary improved message: Rewrite it into the absolute best version for this recipient and situation.
3. 5 tone metrics (Assertiveness, Warmth, Formality, Politeness, Conciseness) each scored 0-100 with qualitative label and coaching comment.
4. AI explanation detailing key issues in the original draft, psychological impact on the recipient, and framing strategy.
5. 3 practical learning tips (title, tip, rule of thumb, avoid phrases, try phrases).
6. EXACTLY 3 alternative rewrites with distinct styles:
   - Option 1: "Executive & Direct" (Crisp, high agency, action-oriented)
   - Option 2: "Diplomatic & Polite" (Softened, highly respectful, consensus-seeking)
   - Option 3: "Warm & Collaborative" (Personable, relationship-building, supportive)
7. Reading statistics (word counts, time saved, formality grade).

Return ONLY valid JSON matching this exact structure:
{
  "overallScore": 78,
  "scoreBreakdown": {
    "clarity": 82,
    "confidence": 68,
    "politeness": 85,
    "conciseness": 74
  },
  "executiveSummary": "Concise 1-2 sentence coach summary of the draft's strengths and core weakness.",
  "detectedSentiment": "e.g., Hesitant / Overly Apologetic / Too Casual / Blunt / Defensively Framed",
  "primaryImprovement": {
    "title": "Master Rewrite (Recommended)",
    "improvedMessage": "The polished, optimal rewritten text here...",
    "whyItWorks": "Explanation of why this version commands respect while maintaining warmth and clarity."
  },
  "tones": [
    {
      "name": "Assertiveness",
      "score": 62,
      "label": "Moderate",
      "comment": "Specific feedback on assertiveness"
    },
    {
      "name": "Warmth",
      "score": 75,
      "label": "Approachable",
      "comment": "Specific feedback on warmth"
    },
    {
      "name": "Formality",
      "score": 85,
      "label": "Appropriate",
      "comment": "Specific feedback on formality"
    },
    {
      "name": "Politeness",
      "score": 90,
      "label": "High",
      "comment": "Specific feedback on politeness"
    },
    {
      "name": "Conciseness",
      "score": 70,
      "label": "Needs trimming",
      "comment": "Specific feedback on conciseness"
    }
  ],
  "aiExplanation": {
    "keyIssuesIdentified": [
      "Issue 1 with original phrasing",
      "Issue 2 with tone or structure",
      "Issue 3 with clarity or confidence"
    ],
    "psychologicalImpact": "How the recipient naturally perceives the original draft subconsciously.",
    "framingStrategy": "The communication theory or psychological framing principle applied to fix it."
  },
  "learningTips": [
    {
      "title": "Tip 1 title",
      "tip": "Actionable coaching explanation.",
      "ruleOfThumb": "Quick memorable rule",
      "avoidPhrases": ["Phrases to eliminate"],
      "tryPhrases": ["Phrases to substitute"]
    },
    {
      "title": "Tip 2 title",
      "tip": "Actionable coaching explanation.",
      "ruleOfThumb": "Quick memorable rule",
      "avoidPhrases": ["Phrases to eliminate"],
      "tryPhrases": ["Phrases to substitute"]
    },
    {
      "title": "Tip 3 title",
      "tip": "Actionable coaching explanation.",
      "ruleOfThumb": "Quick memorable rule",
      "avoidPhrases": ["Phrases to eliminate"],
      "tryPhrases": ["Phrases to substitute"]
    }
  ],
  "alternativeRewrites": [
    {
      "id": "alt-executive",
      "title": "Executive & Direct",
      "tone": "Direct, confident, zero fluff",
      "summary": "Best when you need an immediate clear decision or action.",
      "message": "Full rewritten message text here...",
      "bestFor": "High-priority requests, busy executives, technical leads"
    },
    {
      "id": "alt-diplomatic",
      "title": "Diplomatic & Polite",
      "tone": "Gracious, tactful, considerate",
      "summary": "Best when navigating sensitive hierarchy or delicate requests.",
      "message": "Full rewritten message text here...",
      "bestFor": "Professors, senior HR, delicate negotiations"
    },
    {
      "id": "alt-warm",
      "title": "Warm & Collaborative",
      "tone": "Friendly, approachable, relational",
      "summary": "Best for team camaraderie and peer alignment.",
      "message": "Full rewritten message text here...",
      "bestFor": "Close colleagues, trusted clients, friendly check-ins"
    }
  ],
  "readingStats": {
    "originalWords": 45,
    "improvedWords": 32,
    "timeReductionSeconds": 8,
    "formalityGrade": "Professional / Executive"
  }
}`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const parsed = cleanAndParseJSON<Omit<CommunicationAnalysis, "originalMessage" | "recipient" | "situation" | "desiredTone" | "analyzedAt">>(responseText);

    const origWordCount = message.trim().split(/\s+/).filter(Boolean).length;
    const impWordCount = parsed.primaryImprovement.improvedMessage.trim().split(/\s+/).filter(Boolean).length;

    const diffHighlights = computeDiffHighlights(message, parsed.primaryImprovement.improvedMessage);

    const fullAnalysis: CommunicationAnalysis = {
      ...parsed,
      originalMessage: message,
      recipient,
      situation,
      desiredTone,
      primaryImprovement: {
        ...parsed.primaryImprovement,
        diffHighlights,
      },
      readingStats: {
        originalWords: origWordCount,
        improvedWords: impWordCount,
        timeReductionSeconds: Math.max(0, Math.round((origWordCount - impWordCount) * 0.3)),
        formalityGrade: parsed.readingStats?.formalityGrade || "Professional (Grade 10+)",
      },
      analyzedAt: new Date().toISOString(),
    };

    return fullAnalysis;
  } catch (err: unknown) {
    const error = err as Error;
    // If rate limit or specific model error, provide clear guidance
    if (error.message?.includes("API_KEY_INVALID") || error.message?.includes("API key not valid")) {
      throw new Error("Your Google Gemini API key is invalid. Please check your key at https://aistudio.google.com and try again.");
    }
    if (error.message?.includes("RESOURCE_EXHAUSTED")) {
      throw new Error("Gemini API rate limit exceeded. Please wait a few seconds or use your own Google AI Studio key.");
    }
    throw new Error(`Gemini Analysis Error: ${error.message || "Failed to process communication request."}`);
  }
}
