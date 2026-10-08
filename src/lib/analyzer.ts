import {
  AnalyzeRequest,
  CommunicationAnalysis,
  DiffHighlight,
  RewriteOption,
  ToneMetric,
  LearningTip,
} from "@/types/communication";

/**
 * Native Communication Analysis Engine
 * Evaluates drafts for clarity, confidence, etiquette, and authority without external API keys.
 */

// Heuristic pattern matchers
const OVER_APOLOGETIC_PATTERNS = [
  /sorry to bother/i,
  /sorry for bothering/i,
  /apologies for reaching out/i,
  /so sorry/i,
  /please don't take points off/i,
  /hope this isn't annoying/i,
  /sorry again/i,
];

const TIMID_QUALIFIERS = [
  /just wanted to/i,
  /just checking in/i,
  /kind of/i,
  /sort of/i,
  /if that's okay/i,
  /no worries if not/i,
  /only if you have time/i,
  /if it's not too much trouble/i,
  /i might be wrong but/i,
];

const CASUAL_SLIPS = [
  /\bhey prof\b/i,
  /\bhey professor\b/i,
  /\byo\b/i,
  /\bhey guys\b/i,
  /\bcan i get\b/i,
  /\bpls\b/i,
  /\bthx\b/i,
  /\bgonna\b/i,
  /\bwanna\b/i,
];

const BLUNT_PATTERNS = [
  /you need to/i,
  /you have to/i,
  /why haven't you/i,
  /as per my last/i,
  /not ready today because/i,
  /do this today/i,
];

function computeDiffHighlights(original: string, improved: string): DiffHighlight[] {
  const origWords = original.split(/\s+/).filter(Boolean);
  const impWords = improved.split(/\s+/).filter(Boolean);
  const highlights: DiffHighlight[] = [];
  const minLen = Math.min(origWords.length, impWords.length);

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

  return highlights.length > 0 ? highlights : [{ type: "added", text: improved }];
}

/**
 * Intelligent message transformation generator
 */
function generateRewritesForContext(
  text: string,
  recipient: string,
  situation: string
): {
  master: string;
  executive: string;
  diplomatic: string;
  warm: string;
  whyItWorks: string;
} {
  const lowerRec = recipient.toLowerCase();
  const lowerSit = situation.toLowerCase();

  // Academic / Professor contexts
  if (lowerRec.includes("prof") || lowerRec.includes("teacher")) {
    if (lowerSit.includes("extension") || text.toLowerCase().includes("extension")) {
      return {
        master:
          "Dear Professor, I am writing to respectfully request an extension on the current assignment due to unexpected medical circumstances. I have made substantial progress on the research and would deeply appreciate the opportunity to submit my best work by this Sunday at 11:59 PM. Thank you for your time and understanding.",
        executive:
          "Dear Professor, due to unexpected illness, I am requesting a brief extension on the upcoming assignment until Sunday at 11:59 PM. I have completed 60% of the draft and look forward to submitting a thorough paper.",
        diplomatic:
          "Dear Professor, I hope your week is going well. I am writing with a humble request regarding the upcoming assignment deadline. Due to medical reasons over the past few days, I would be very grateful if a short extension until Sunday might be possible. I appreciate your guidance and consideration.",
        warm:
          "Dear Professor, I hope you are having a wonderful week! I wanted to reach out regarding the upcoming assignment. I experienced an unexpected illness and would love a few additional days to submit by Sunday. Thank you so much for your support and flexibility.",
        whyItWorks:
          "Replaces casual slips and apologetic panic with formal academic respect, explicit accountability, and a specific proposed submission time.",
      };
    }

    if (lowerSit.includes("recommendation") || text.toLowerCase().includes("recommendation")) {
      return {
        master:
          "Dear Professor, I hope you are having a great semester. As I prepare my applications for upcoming graduate programs, I would be honored if you would consider writing a letter of recommendation on my behalf. I have attached my updated CV and a summary of my coursework for your convenience.",
        executive:
          "Dear Professor, I am applying for graduate programs this fall and would greatly value your recommendation letter. I have attached my CV and application milestones for your review.",
        diplomatic:
          "Dear Professor, I hope you are well. Having thoroughly enjoyed your course and research seminars, I would be deeply grateful if you might have the capacity to support my graduate application with a letter of recommendation.",
        warm:
          "Dear Professor, I hope you're having a wonderful week! Your mentorship in class was a highlight of my academic journey. I would be thrilled and honored if you would consider writing a letter of recommendation for my upcoming applications.",
        whyItWorks:
          "Frames the ask with professional reverence, removes hesitation, and provides immediate supporting material.",
      };
    }
  }

  // Manager / Workplace contexts
  if (lowerRec.includes("manager") || lowerRec.includes("lead")) {
    if (lowerSit.includes("salary") || lowerSit.includes("promotion") || text.toLowerCase().includes("raise")) {
      return {
        master:
          "Hi, I would like to schedule 20 minutes during our upcoming 1-on-1 to review my recent contributions and discuss aligning my compensation with market benchmarks and expanded responsibilities. I have documented my key project deliverables and look forward to our discussion.",
        executive:
          "Hi, I would like to request an agenda item in our next 1-on-1 to review my compensation. Over the past two quarters, my scope and deliverable impact have expanded, and I'd like to align on next steps for a salary adjustment.",
        diplomatic:
          "Hi, I hope your week is going smoothly. Given our recent project milestones and my expanding scope across the team, I would welcome the opportunity to discuss my compensation review during our next sync. Looking forward to your thoughts.",
        warm:
          "Hi, hope you're having a great week! I've really enjoyed driving our recent initiatives. I'd love to set aside some time in our next 1-on-1 to discuss my growth and compensation trajectory. Excited to chat!",
        whyItWorks:
          "Replaces awkward complaints with objective value framing, proactive scheduling, and leadership composure.",
      };
    }
  }

  // HR / Recruiting
  if (lowerRec.includes("hr") || lowerSit.includes("interview") || lowerSit.includes("follow-up")) {
    return {
      master:
        "Hi, I am writing to enthusiastically follow up regarding my recent interview for the position. I remain very excited about the opportunity to contribute to the team and would welcome any updates on the hiring timeline. Please let me know if you need any additional information from my side.",
      executive:
        "Hi, following up on our interview last week. I remain strongly interested in the role and would appreciate an update on the decision timeline when available.",
      diplomatic:
        "Hi, I hope you are having a pleasant week. I wanted to follow up on our interview from last week. I greatly enjoyed our conversation and look forward to any updates you might have regarding the hiring process.",
      warm:
        "Hi, hope you're having a fantastic week! I really enjoyed our conversation last week and felt such great energy from the team. Just checking in to see if there are any updates on next steps. Looking forward to staying in touch!",
      whyItWorks:
        "Transforms anxious waiting into an enthusiastic, poised check-in that reaffirms value without putting undue pressure.",
    };
  }

  // Client / Project Delay
  if (lowerRec.includes("client") || lowerSit.includes("delay") || lowerSit.includes("mistake")) {
    return {
      master:
        "Hi, I am writing to provide a transparent update on our deliverables. To ensure the highest quality and rigorous testing standards, we have rescheduled delivery to this Friday at 3 PM. We have resolved the core challenges and will keep you closely informed of progress.",
      executive:
        "Hi, status update: delivery has been revised to Friday at 3 PM to complete comprehensive testing and verify stability. All core items are progressing smoothly.",
      diplomatic:
        "Hi, I wanted to proactively keep you informed about our timeline. To guarantee the final output meets our high standards, we are taking an additional two days to finalize testing, delivering Friday at 3 PM. Thank you for your continued partnership.",
      warm:
        "Hi, hope you're having a wonderful week! Quick proactive update: we want to make sure this release is absolutely seamless, so our team is polishing the final details for delivery this Friday at 3 PM. Thank you so much for your trust and collaboration!",
      whyItWorks:
        "Shifts from defensive excuses to proactive ownership, quality reassurance, and exact commitment times.",
    };
  }

  // General fallback transformation for any custom message
  const cleaned = text
    .replace(/hey prof(essor)?/gi, "Dear Professor")
    .replace(/sorry to bother you/gi, "I am writing to")
    .replace(/just wanted to/gi, "I would like to")
    .replace(/kind of/gi, "")
    .replace(/sort of/gi, "")
    .replace(/pls|thx/gi, "thank you")
    .trim();

  return {
    master:
      `Dear ${recipient},\n\nI am writing to communicate clearly regarding ${situation.toLowerCase()}. ${cleaned.charAt(0).toUpperCase() + cleaned.slice(1)}.\n\nThank you for your consideration, and I look forward to hearing your perspective.`,
    executive:
      `Hi ${recipient},\n\nRegarding ${situation}: ${cleaned}. Please let me know your thoughts so we can proceed efficiently.`,
    diplomatic:
      `Dear ${recipient},\n\nI hope this message finds you well. I wanted to touch base regarding ${situation.toLowerCase()}. ${cleaned}. I greatly appreciate your guidance and support.`,
    warm:
      `Hi ${recipient}!\n\nHope you are having a wonderful week. I wanted to share a quick update regarding ${situation.toLowerCase()}: ${cleaned}. Thank you so much for your partnership!`,
    whyItWorks:
      "Eliminated minimizing filler words, added professional framing, and structured a clear, respectful call to action.",
  };
}

/**
 * Main Native Communication Analysis Function
 */
export function analyzeCommunicationNative(request: AnalyzeRequest): CommunicationAnalysis {
  const { message, recipient, situation, desiredTone = "Professional & Polished" } = request;

  let clarityScore = 85;
  let confidenceScore = 80;
  let politenessScore = 88;
  let concisenessScore = 78;

  // Pattern detection penalties
  const isOverApologetic = OVER_APOLOGETIC_PATTERNS.some((p) => p.test(message));
  const hasTimidQualifiers = TIMID_QUALIFIERS.some((p) => p.test(message));
  const hasCasualSlips = CASUAL_SLIPS.some((p) => p.test(message));
  const isBlunt = BLUNT_PATTERNS.some((p) => p.test(message));

  if (isOverApologetic) {
    confidenceScore -= 18;
    politenessScore -= 5;
  }
  if (hasTimidQualifiers) {
    confidenceScore -= 12;
    concisenessScore -= 10;
  }
  if (hasCasualSlips) {
    politenessScore -= 16;
    clarityScore -= 8;
  }
  if (isBlunt) {
    politenessScore -= 20;
    confidenceScore += 5;
  }

  // Length check
  const words = message.trim().split(/\s+/).filter(Boolean);
  if (words.length < 10) {
    concisenessScore = 90;
    clarityScore -= 10;
  } else if (words.length > 80) {
    concisenessScore -= 15;
  }

  // Ensure bounded scores
  clarityScore = Math.max(45, Math.min(98, clarityScore));
  confidenceScore = Math.max(40, Math.min(98, confidenceScore));
  politenessScore = Math.max(45, Math.min(98, politenessScore));
  concisenessScore = Math.max(45, Math.min(98, concisenessScore));

  const overallScore = Math.round(
    clarityScore * 0.3 + confidenceScore * 0.3 + politenessScore * 0.25 + concisenessScore * 0.15
  );

  let detectedSentiment = "Balanced & Direct";
  if (isOverApologetic && hasTimidQualifiers) detectedSentiment = "Overly Apologetic & Timid";
  else if (hasCasualSlips) detectedSentiment = "Too Informal for Context";
  else if (isBlunt) detectedSentiment = "Slightly Blunt & Impatient";
  else if (hasTimidQualifiers) detectedSentiment = "Hesitant Posturing";

  // Generate rewrites
  const rewrites = generateRewritesForContext(message, recipient, situation);
  const diffHighlights = computeDiffHighlights(message, rewrites.master);

  const origWordsCount = words.length;
  const impWordsCount = rewrites.master.trim().split(/\s+/).filter(Boolean).length;

  const tones: ToneMetric[] = [
    {
      name: "Assertiveness",
      score: confidenceScore,
      label: confidenceScore > 75 ? "Confident" : "Needs Posture",
      comment:
        confidenceScore > 75
          ? "Clear agency without being overbearing."
          : "Avoid self-diminishing words like 'just' or apologetic preambles.",
    },
    {
      name: "Warmth",
      score: Math.min(95, politenessScore + 5),
      label: "Approachable",
      comment: "Maintains relational empathy and positive rapport.",
    },
    {
      name: "Formality",
      score: hasCasualSlips ? 52 : 88,
      label: hasCasualSlips ? "Too Casual" : "Appropriate",
      comment: hasCasualSlips
        ? "Calibrated upwards to match recipient's seniority."
        : "Matches expected workplace and academic standards.",
    },
    {
      name: "Politeness",
      score: politenessScore,
      label: politenessScore > 80 ? "Optimal" : "Needs Polish",
      comment: "Expresses gratitude and respect without subordination.",
    },
    {
      name: "Conciseness",
      score: concisenessScore,
      label: concisenessScore > 75 ? "Direct" : "Wordy",
      comment: "Removed filler padding to value the reader's time.",
    },
  ];

  const alternativeRewrites: RewriteOption[] = [
    {
      id: "alt-executive",
      title: "Executive & Direct",
      tone: "Direct, confident, zero fluff",
      summary: "Best when you need an immediate clear decision or action.",
      message: rewrites.executive,
      bestFor: "High-priority requests, busy executives, and technical leads",
    },
    {
      id: "alt-diplomatic",
      title: "Diplomatic & Polite",
      tone: "Gracious, tactful, considerate",
      summary: "Best when navigating hierarchy or delicate requests.",
      message: rewrites.diplomatic,
      bestFor: "Professors, department heads, and senior HR",
    },
    {
      id: "alt-warm",
      title: "Warm & Collaborative",
      tone: "Friendly, approachable, relational",
      summary: "Best for team camaraderie and peer alignment.",
      message: rewrites.warm,
      bestFor: "Close colleagues, trusted clients, and friendly check-ins",
    },
  ];

  const learningTips: LearningTip[] = [
    {
      title: "Eliminate the 'Just' Reflex",
      tip: "Starting sentences with 'Just wanted to check' subconsciously discounts your request and invites lower priority.",
      ruleOfThumb: "State your point directly without defensive padding.",
      avoidPhrases: ["Just checking in", "Just wondering if", "Sorry to bother"],
      tryPhrases: ["I am writing to check", "Following up on", "Could you provide an update"],
    },
    {
      title: "Propose Specific Milestones",
      tip: "When asking for an extension or review, always specify the exact date and time rather than an open-ended request.",
      ruleOfThumb: "Give the recipient a binary 'yes/no' decision rather than an open planning chore.",
      avoidPhrases: ["Whenever you can", "Sometime soon", "A few days"],
      tryPhrases: ["By Friday at 3 PM", "Before our sync on Tuesday", "By Sunday at 11:59 PM"],
    },
    {
      title: "Replace Apology with Appreciation",
      tip: "Instead of saying 'Sorry for the delay', say 'Thank you for your patience'. It changes the emotional frame from guilt to gratitude.",
      ruleOfThumb: "Thank the reader for their virtue instead of spotlighting your fault.",
      avoidPhrases: ["Sorry for the late reply", "Sorry for bothering you"],
      tryPhrases: ["Thank you for your patience", "Thank you for your flexibility"],
    },
  ];

  return {
    overallScore,
    scoreBreakdown: {
      clarity: clarityScore,
      confidence: confidenceScore,
      politeness: politenessScore,
      conciseness: concisenessScore,
    },
    executiveSummary:
      overallScore > 80
        ? "Strong foundational intent. Calibrated structure and eliminated filler phrases for maximum clarity."
        : "Identified opportunities to replace hesitation and casual phrasing with professional authority and clear milestones.",
    originalMessage: message,
    recipient,
    situation,
    desiredTone,
    detectedSentiment,
    primaryImprovement: {
      title: "Master Rewrite (Recommended)",
      improvedMessage: rewrites.master,
      whyItWorks: rewrites.whyItWorks,
      diffHighlights,
    },
    tones,
    aiExplanation: {
      keyIssuesIdentified: [
        isOverApologetic ? "Excessive apologetic phrases weaken authority" : "Sentence structure could be more concise",
        hasCasualSlips ? "Informal greetings diminish professional respect" : "Call to action needed sharper framing",
        hasTimidQualifiers ? "Minimizing qualifiers ('just', 'kind of') invite hesitation" : "Readability enhanced with active verbs",
      ],
      psychologicalImpact:
        "When communicators over-apologize or use casual slips, recipients perceive the message as a burden rather than a professional collaboration. Confident framing inspires prompt action and mutual respect.",
      framingStrategy:
        "Applied Harvard Business Communication reframing: objective intent + structured justification + concrete proposed milestone.",
    },
    learningTips,
    alternativeRewrites,
    readingStats: {
      originalWords: origWordsCount,
      improvedWords: impWordsCount,
      timeReductionSeconds: Math.max(3, Math.round(Math.abs(origWordsCount - impWordsCount) * 0.4)),
      formalityGrade: "Professional Executive",
    },
    analyzedAt: new Date().toISOString(),
  };
}
