import {
  AnalyzeRequest,
  CommunicationAnalysis,
  DiffHighlight,
  RewriteOption,
  ToneMetric,
  LearningTip,
} from "@/types/communication";

/**
 * SpeakRight Native Communication Intelligence Engine
 * Calibrated for modern, articulate, high-agency communication (2026 standards).
 * Completely eliminates Victorian stuffiness, canned excuses, and awkward robotic phrasing.
 */

// Linguistic pattern matchers for tone diagnosis
const OVER_APOLOGETIC_PATTERNS = [
  /sorry to bother/i,
  /sorry for bothering/i,
  /apologies for reaching out/i,
  /so sorry/i,
  /please don't take points off/i,
  /hope this isn't annoying/i,
  /sorry again/i,
  /sorry for the dumb question/i,
  /pardon my intrusion/i,
];

const TIMID_QUALIFIERS = [
  /just wanted to/i,
  /just checking in/i,
  /kind of/i,
  /sort of/i,
  /if that's okay with you/i,
  /no worries if not/i,
  /only if you have time/i,
  /if it's not too much trouble/i,
  /i might be wrong but/i,
  /i was just wondering/i,
  /whenever you have a chance/i,
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
  /\bu\b/i,
  /\br\b/i,
  /\basap\b/i,
];

const BLUNT_PATTERNS = [
  /you need to/i,
  /you have to/i,
  /why haven't you/i,
  /as per my last/i,
  /do this today/i,
  /i don't care/i,
  /give me the/i,
];

/**
 * Compute Longest Common Subsequence (LCS) word-level diff
 * Produces crisp, accurate visual highlights between original and improved text.
 */
function computeLcsDiffHighlights(original: string, improved: string): DiffHighlight[] {
  const origWords = original.trim().split(/\s+/).filter(Boolean);
  const impWords = improved.trim().split(/\s+/).filter(Boolean);

  if (origWords.length === 0) {
    return impWords.map((w) => ({ type: "added", text: w + " " }));
  }
  if (impWords.length === 0) {
    return [];
  }

  // Normalize words for case/punctuation comparison
  const normalize = (w: string) => w.toLowerCase().replace(/[^\w]/g, "");

  const n = origWords.length;
  const m = impWords.length;

  // DP table for LCS
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (normalize(origWords[i - 1]) === normalize(impWords[j - 1])) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find LCS alignment
  const keptIndicesInImp = new Set<number>();
  let i = n;
  let j = m;

  while (i > 0 && j > 0) {
    if (normalize(origWords[i - 1]) === normalize(impWords[j - 1])) {
      keptIndicesInImp.add(j - 1);
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  // Build diff highlights for improved text
  const highlights: DiffHighlight[] = [];
  for (let idx = 0; idx < impWords.length; idx++) {
    const word = impWords[idx];
    if (keptIndicesInImp.has(idx)) {
      highlights.push({ type: "kept", text: word + " " });
    } else {
      highlights.push({ type: "added", text: word + " " });
    }
  }

  return highlights;
}

/**
 * Clean up text abbreviations, colloquialisms, and excessive punctuation
 */
function cleanTextAbbreviations(raw: string): string {
  return raw
    .replace(/\bpls\b/gi, "please")
    .replace(/\bthx\b/gi, "thank you")
    .replace(/\bty\b/gi, "thank you")
    .replace(/\bgonna\b/gi, "going to")
    .replace(/\bwanna\b/gi, "would like to")
    .replace(/\bu\b/gi, "you")
    .replace(/\bur\b/gi, "your")
    .replace(/\br\b/gi, "are")
    .replace(/\bcuz\b|\bcause\b/gi, "because")
    .replace(/\basap\b/gi, "as soon as possible")
    .replace(/\bbtw\b/gi, "by the way")
    .replace(/\bidk\b/gi, "I am unsure")
    .replace(/\bim\b/gi, "I am")
    .replace(/\bi'm\b/gi, "I'm")
    .replace(/\bcant\b/gi, "cannot")
    .replace(/\bdont\b/gi, "don't")
    .replace(/\bwont\b/gi, "won't")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Extract recipient name or construct a natural salutation,
 * and strip the greeting from the message body to prevent duplicates.
 */
function extractGreetingAndCleanBody(text: string, recipient: string): {
  greeting: string;
  cleanedBody: string;
} {
  let cleaned = text.trim();
  let greeting = "";

  // 1. Check if user already addressed someone by name: "Hi Sarah,", "Dear Dr. Miller,", "Hello Alex,"
  const directAddress = cleaned.match(/^(?:hi|hey|hello|dear)\s+([A-Z][a-zA-Z\.\s]{1,24})(?:,|\n|:|\s{2,})/i);
  if (directAddress && directAddress[1]) {
    const name = directAddress[1].trim();
    if (!/^(prof|professor|guys|all|team)$/i.test(name)) {
      greeting = `Hi ${name},`;
      cleaned = cleaned.replace(/^(?:hi|hey|hello|dear)\s+[A-Za-z\.\s]{1,24}[,:\n\s]*/i, "").trim();
    }
  }

  // If no personal name was matched, determine salutation by recipient role
  if (!greeting) {
    const rec = recipient.toLowerCase();
    if (rec.includes("prof")) greeting = "Hi Professor,";
    else if (rec.includes("teacher")) greeting = "Hi [Teacher's Name],";
    else if (rec.includes("team")) greeting = "Hi team,";
    else if (rec.includes("friend")) greeting = "Hey,";
    else if (rec.includes("manager")) greeting = "Hi,";
    else if (rec.includes("hr")) greeting = "Hi,";
    else if (rec.includes("client")) greeting = "Hi,";
    else greeting = "Hi,";

    // Strip leading generic greetings like "Hey prof,", "Hi team,", "Hello," from body
    cleaned = cleaned.replace(/^(?:hi|hey|hello|dear|yo)\s+(?:prof|professor|team|all|guys)?[,:\n\s]*/i, "").trim();
  }

  return { greeting, cleanedBody: cleaned };
}

/**
 * Smart Date and Time Entity Extraction
 * Accurately distinguishes between existing due date ("due tomorrow") and requested date ("till Sunday").
 */
function extractDatesAndTimes(text: string) {
  // Common dates and days
  const datePattern = /(?:sunday|monday|tuesday|wednesday|thursday|friday|saturday|tomorrow|tonight|next week|end of day|eod|the weekend)/i;

  // 1. Look for explicit target/requested extension dates:
  // e.g., "till Sunday", "until Monday", "by Friday", "through the weekend"
  const targetDateMatch = text.match(
    /(?:until|till|by|through)\s+([a-zA-Z0-9]+(?:\s+[a-zA-Z0-9]+)?)(?=[,\.\?!]|\band\b|\bso\b|$)/i
  );

  // 2. Look for existing due date mentions:
  // e.g., "due tomorrow", "due Friday"
  const dueDateMatch = text.match(
    /(?:due|deadline(?:\s+is)?)\s+([a-zA-Z0-9]+(?:\s+[a-zA-Z0-9]+)?)(?=[,\.\?!]|\bbut\b|\band\b|$)/i
  );

  let requestedDate = "";
  if (targetDateMatch && targetDateMatch[1]) {
    const candidate = targetDateMatch[1].trim();
    // Verify it's a valid date/day and not a verb
    if (!/^(fix|do|see|meet|submit|check|finish|wrap|work)/i.test(candidate)) {
      requestedDate = candidate.charAt(0).toUpperCase() + candidate.slice(1);
    }
  }

  // Fallback to any date mentioned that is NOT the due date
  if (!requestedDate) {
    const allDates = Array.from(text.matchAll(new RegExp(datePattern, "gi"))).map((m) => m[0]);
    const dueWord = dueDateMatch && dueDateMatch[1] ? dueDateMatch[1].toLowerCase() : "";

    const nonDue = allDates.find((d) => !d.toLowerCase().includes(dueWord) && !dueWord.includes(d.toLowerCase()));
    if (nonDue) {
      requestedDate = nonDue.charAt(0).toUpperCase() + nonDue.slice(1);
    } else if (allDates.length > 0) {
      requestedDate = allDates[allDates.length - 1].charAt(0).toUpperCase() + allDates[allDates.length - 1].slice(1);
    } else {
      requestedDate = "Sunday";
    }
  }

  const dueDate = dueDateMatch && dueDateMatch[1] ? dueDateMatch[1].trim() : null;

  // 3. Extract time durations or specific times (e.g., "20 mins", "2pm", "two days", "2 more days")
  const durationMatch = text.match(/\b(\d+\s*(?:more\s+)?(?:days?|hours?|mins?|minutes?)|two\s+more\s+days|a\s+couple\s+of\s+days)\b/i);
  const timeMatch = text.match(/\b(\d{1,2}(?::\d{2})?\s*(?:am|pm))\b/i);

  const targetDuration = durationMatch ? durationMatch[0] : "a couple of days";
  const targetTime = timeMatch ? timeMatch[0] : targetDuration;

  return { requestedDate, dueDate, targetDuration, targetTime };
}

/**
 * Extract assignment or deliverable item
 */
function extractTargetItem(text: string): { raw: string; withArticle: string } {
  const itemMatch = text.match(
    /\b(essay|assignment|project(?:\s+\d+)?|paper|lab(?:\s+report)?|homework|deliverable|draft|proposal|presentation|pr|slide deck|slides|feature|report|designs|screens)\b/i
  );

  const raw = itemMatch ? itemMatch[0] : "the assignment";
  const withArticle = /^(the\s+|a\s+|an\s+|project\s+\d+|assignment\s+\d+|lab\s+\d+)/i.test(raw)
    ? raw
    : `the ${raw}`;

  return { raw, withArticle };
}

/**
 * Extract and polish user's stated reason
 */
function extractAndPolishReason(text: string): {
  formal: string;
  brief: string;
  warm: string;
} {
  const lower = text.toLowerCase();

  // 1. Illness / Health
  if (
    lower.includes("sick") ||
    lower.includes("unwell") ||
    lower.includes("fever") ||
    lower.includes("flu") ||
    lower.includes("under the weather") ||
    lower.includes("migraine") ||
    lower.includes("medical")
  ) {
    return {
      formal: "I was unwell over the past couple of days and fell slightly behind",
      brief: "due to unexpected illness",
      warm: "I came down with something over the past couple of days and fell a bit behind",
    };
  }

  // 2. Hardware / Technical issues
  if (
    lower.includes("laptop") ||
    lower.includes("crashed") ||
    lower.includes("broke") ||
    lower.includes("computer") ||
    lower.includes("wifi") ||
    lower.includes("lost")
  ) {
    return {
      formal: "I experienced an unexpected hardware issue with my laptop and lost some recent progress",
      brief: "due to a technical hardware issue",
      warm: "my laptop ran into unexpected technical issues yesterday and I had to recover some files",
    };
  }

  // 3. Bandwidth / Competing priorities
  if (
    lower.includes("hackathon") ||
    lower.includes("exam") ||
    lower.includes("sprint") ||
    lower.includes("bandwidth") ||
    lower.includes("plate")
  ) {
    return {
      formal: "I had competing project commitments this week that required immediate attention",
      brief: "due to overlapping commitments",
      warm: "I've been tied up balancing overlapping milestones this week",
    };
  }

  // 4. Family / Personal emergency
  if (lower.includes("emergency") || lower.includes("family") || lower.includes("personal")) {
    return {
      formal: "I had an unexpected personal matter arise that required my urgent attention",
      brief: "due to a personal matter",
      warm: "an unexpected family matter came up over the last couple of days",
    };
  }

  // 5. Default polish
  return {
    formal: "I fell slightly behind schedule and want to ensure the final submission is thorough",
    brief: "to finalize the deliverable thoroughly",
    warm: "I'm finishing up the final pieces and want to make sure it's polished",
  };
}

/**
 * Natural contextual rewriter that preserves user facts and details
 * while guaranteeing modern, crisp, non-Victorian, human-sounding communication.
 */
function generateNaturalRewrites(
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
  const lowerText = text.toLowerCase();
  const lowerRec = recipient.toLowerCase();
  const lowerSit = situation.toLowerCase();

  const { greeting, cleanedBody } = extractGreetingAndCleanBody(text, recipient);
  const { requestedDate, targetDuration } = extractDatesAndTimes(text);
  const { withArticle: targetItemWithArticle } = extractTargetItem(text);
  const reason = extractAndPolishReason(text);

  const isAcademic = lowerRec.includes("prof") || lowerRec.includes("teacher");

  // High-priority intents
  const isSalary =
    lowerSit.includes("salary") ||
    lowerSit.includes("raise") ||
    lowerSit.includes("promotion") ||
    /\b(raise|salary|compensation|promotion)\b/i.test(text);

  const isRunningLate =
    !isSalary &&
    (/\b(traffic|running late|running behind|delayed in traffic|be there in)\b/i.test(text) ||
      (/\blate\b/i.test(text) && !/\blately\b/i.test(text) && /\b(meeting|sync|call|session)\b/i.test(text)));

  const isExtension =
    lowerSit.includes("extension") ||
    lowerText.includes("extension") ||
    lowerText.includes("extra time") ||
    lowerText.includes("submit till") ||
    lowerText.includes("submit by") ||
    lowerText.includes("submit until");

  const isFollowup =
    lowerSit.includes("follow-up") ||
    lowerSit.includes("interview") ||
    lowerText.includes("interview");

  const isDecline =
    lowerSit.includes("declin") ||
    lowerText.includes("too much other stuff") ||
    lowerText.includes("can't do this") ||
    lowerText.includes("cannot do") ||
    lowerText.includes("on my plate");

  const isRecLetter =
    lowerSit.includes("recommendation") ||
    lowerText.includes("recommendation") ||
    lowerText.includes("letter of rec");

  const isSoftwareDelay =
    (lowerSit.includes("delay") || lowerText.includes("bugs") || lowerText.includes("not ready today") || lowerText.includes("need two more days")) &&
    !isRunningLate;

  // 1. Running Late / Meeting Reschedule (Takes precedence over generic delay)
  if (isRunningLate) {
    const lateDuration = targetDuration !== "a couple of days" ? targetDuration : "15-20 minutes";
    return {
      master:
        `${greeting} quick heads-up: I'm running about ${lateDuration} behind due to traffic. Could we push our sync back slightly, or would later today work better for your schedule? Apologies for the delay and thank you for your flexibility!`,
      executive:
        `${greeting} I'm delayed and won't be able to make our scheduled time. Could we push back by ${lateDuration}, or reschedule for later today?`,
      diplomatic:
        `${greeting} hope your day is going well. An unexpected delay came up on my end. Would it be possible to adjust our sync by ${lateDuration}, or is there another time today that works better for you?`,
      warm:
        `${greeting} quick heads-up that I'm running a little behind on my end! Would you be open to pushing our chat by ${lateDuration}, or moving to later today? Appreciate your flexibility!`,
      whyItWorks:
        "Replaces panicked apologies with a clear explanation, concrete revised time options, and respect for the recipient's schedule.",
    };
  }

  // 2. Academic or Professional Deadline Extension
  if (isExtension) {
    const profSalutation = isAcademic ? "Hi Professor," : greeting;
    return {
      master:
        `${profSalutation} could I please request a short extension on ${targetItemWithArticle} until ${requestedDate}? ${reason.formal}. I'm finalizing the draft now and want to make sure I submit my best work. Thank you for your flexibility, and please let me know if that works for you.`,
      executive:
        `${profSalutation} I would like to request an extension on ${targetItemWithArticle} until ${requestedDate} ${reason.brief}. The majority of the work is completed and I look forward to submitting a thorough draft. Thank you.`,
      diplomatic:
        `${profSalutation} hope your week is going well. Would it be possible to get a short extension on ${targetItemWithArticle} until ${requestedDate}? ${reason.formal}. I want to ensure the final submission meets course standards. Thank you for your time and understanding.`,
      warm:
        `${profSalutation} hope you're having a good week! Quick check-in regarding ${targetItemWithArticle} - ${reason.warm}. Could I submit it by ${requestedDate} instead? Appreciate your flexibility!`,
      whyItWorks:
        "Preserves your authentic reason and specific deadline while replacing apologetic panic with confident, respectful academic agency.",
    };
  }

  // 3. Letter of Recommendation Request
  if (isRecLetter) {
    return {
      master:
        "Hi Professor, I hope your semester is going well. I really enjoyed your course, particularly our discussions and coursework. As I prepare my upcoming applications, I wanted to ask if you would be open to writing a letter of recommendation on my behalf? I have prepared my CV and draft materials for your reference. Thank you so much for your guidance and support!",
      executive:
        "Hi Professor, I am writing to inquire if you would be willing to provide a letter of recommendation for my upcoming applications. I have attached my resume and draft statement for your review. Thank you for your consideration.",
      diplomatic:
        "Hi Professor, hope you are having a wonderful week. Given how much I learned in your class, I would be deeply grateful if you might consider writing a recommendation letter for my applications. I've prepared all supporting materials to make the process as seamless as possible. Thank you for your time.",
      warm:
        "Hi Professor! Hope you're doing well. I had such a rewarding experience in your class and would love to ask if you'd be open to supporting my application with a letter of recommendation. Happy to share my CV and statement whenever convenient. Thanks so much!",
      whyItWorks:
        "Frames the request with genuine gratitude, clear context, and proactive readiness of supporting materials.",
    };
  }

  // 4. Salary & Promotion Discussion
  if (isSalary) {
    return {
      master:
        "Hi, could we set aside 15-20 minutes during our upcoming 1-on-1 to discuss my compensation? Given my recent deliverables and expanded scope across the team, I'd love to review my progress and align on next steps for a salary adjustment. I've prepared a brief summary of my impact for our discussion.",
      executive:
        "Hi, I would like to add a compensation review to our next 1-on-1 agenda. Over the past few quarters, my scope and deliverables have expanded, and I'd like to align on market benchmarks and salary adjustments.",
      diplomatic:
        "Hi, hope your week is going well. Given our recent milestones and my growing responsibilities on the team, I would welcome the opportunity to discuss my compensation in our next sync. Looking forward to hearing your thoughts.",
      warm:
        "Hi! Hope you're having a great week. I've really enjoyed driving our recent initiatives with the team. I'd love to spend some time in our upcoming 1-on-1 chatting about my growth and compensation trajectory. Excited to connect!",
      whyItWorks:
        "Replaces hesitation and vague complaints with clear value framing, proactive scheduling, and leadership composure.",
    };
  }

  // 5. Post-Interview Follow-Up
  if (isFollowup) {
    return {
      master:
        "Hi, I'm writing to follow up on our interview last week. I remain very enthusiastic about the role and the team's mission, and would love to check in on the hiring timeline. Please let me know if you need any additional information from my side.",
      executive:
        "Hi, following up on our interview from last week. I remain strongly interested in the role and would appreciate any updates on the decision timeline when available.",
      diplomatic:
        "Hi, hope you're having a pleasant week. I wanted to check in regarding my interview last week. I really enjoyed our conversation and would be grateful for any updates on next steps in the hiring process.",
      warm:
        "Hi! Hope your week is off to a great start. I really enjoyed our chat last week and felt such great alignment with the team. Just checking in to see if there are any updates on next steps. Looking forward to staying in touch!",
      whyItWorks:
        "Transforms anxious waiting into a poised, enthusiastic check-in that reaffirms value without pressuring the recipient.",
    };
  }

  // 6. Client Project Delay / Timeline Adjustment
  if (isSoftwareDelay) {
    const deliveryTarget = requestedDate !== "Sunday" ? requestedDate : "the end of the week";
    return {
      master:
        `Hi, quick proactive update: we are taking an extra ${targetDuration} to polish and test the deliverables to ensure everything is completely stable before release. We plan to deliver by ${deliveryTarget}. Thank you for your patience and partnership as we finalize this.`,
      executive:
        `Hi, status update: delivery has been adjusted to ${deliveryTarget} to complete testing and resolve edge cases. Core deliverables are progressing smoothly.`,
      diplomatic:
        `Hi, hope your week is going smoothly. I wanted to proactively keep you informed about our timeline. To guarantee the final deliverable meets our standards, we are taking a short window to finish testing, delivering by ${deliveryTarget}. Thank you for your continued partnership.`,
      warm:
        `Hi! Hope you're having a great week. Quick update on the deliverables: we want to ensure everything runs seamlessly, so our team is doing a final test run to wrap up by ${deliveryTarget}. Thanks so much for your flexibility and support!`,
      whyItWorks:
        "Shifts defensive notifications into proactive ownership, quality reassurance, and a clear revised ETA.",
    };
  }

  // 7. Declining Extra Work Politely (Capacity / Bandwidth)
  if (isDecline) {
    return {
      master:
        "Hi, thanks for thinking of me for this. My current bandwidth is completely dedicated to our upcoming project milestones, so I won't be able to take this on right now without impacting existing delivery. Could we check with the team or revisit once the current sprint wraps up?",
      executive:
        "Hi, my capacity is currently fully committed to core deliverables, so I cannot take on this task right now. I recommend delegating or revisiting after our current milestone.",
      diplomatic:
        "Hi, thank you for reaching out with this. Given my current project priorities, I'm concerned I wouldn't be able to give it the attention it deserves. Would it be possible to revisit next week, or align on trade-offs with existing commitments?",
      warm:
        "Hi! Thanks so much for thinking of me for this. My plate is pretty full with current deliverables right now, so I won't be able to help out with this one at the moment. Let me know if we can coordinate with someone else on the team!",
      whyItWorks:
        "Sets healthy professional boundaries constructively with trade-off visibility rather than a flat refusal.",
    };
  }

  // 8. General Dynamic Transformation for any user-written text
  // Parse, clean, and rebuild with articulate modern phrasing
  const cleaned = cleanTextAbbreviations(cleanedBody)
    // Remove apologetic preambles
    .replace(/sorry to bother you,?\s*(but)?/gi, "")
    .replace(/sorry for bothering you,?\s*(but)?/gi, "")
    .replace(/apologies for reaching out,?\s*(but)?/gi, "")
    .replace(/hope this isn't annoying,?\s*(but)?/gi, "")
    .replace(/sorry for the late reply,?\s*(but)?/gi, "Thank you for your patience.")
    // Upgrade informal requests
    .replace(/^can you\b/gi, "Could you please")
    .replace(/^can i get\b/gi, "Could I please get")
    .replace(/\bcan you\b/gi, "could you please")
    // Remove timid qualifiers
    .replace(/i just wanted to (ask|check|see) if/gi, "Could")
    .replace(/just wanted to/gi, "Wanted to")
    .replace(/i was just wondering if/gi, "Could")
    .replace(/kind of/gi, "")
    .replace(/sort of/gi, "")
    .replace(/if that'?s okay( with you)?/gi, "")
    .replace(/no worries if not/gi, "")
    .replace(/only if you have time/gi, "")
    .replace(/when you have time/gi, "when you have a moment")
    .replace(/please don'?t take points off/gi, "")
    .trim();

  // Clean leading conjunctions and trailing artifacts
  const normalizedCore = cleaned
    .replace(/^(but|and|so|also|,)\s+/i, "")
    .replace(/\s+/g, " ")
    .replace(/\.{2,}/g, ".")
    .trim();

  // Capitalize sentence start
  const polishedContent = normalizedCore
    ? normalizedCore.charAt(0).toUpperCase() + normalizedCore.slice(1)
    : text;

  // Ensure sentence terminates with clean punctuation
  const withPunctuation = /[.?!]$/.test(polishedContent)
    ? polishedContent
    : polishedContent + ".";

  const execBody = withPunctuation
    .replace(/^Could you please\s+/i, "Please ")
    .replace(/when you have a moment\?/i, "when you have a moment.");

  return {
    master:
      `${greeting} ${withPunctuation} Please let me know what works best for you. Thank you!`,
    executive:
      `${greeting} ${execBody} Let me know if that works so we can proceed.`,
    diplomatic:
      `${greeting} hope your week is going well. ${withPunctuation} Whenever you have a moment, please let me know your thoughts. Thank you!`,
    warm:
      `${greeting} hope you're having a great week! ${withPunctuation} Thanks so much for your support!`,
    whyItWorks:
      "Polished casual shortcuts into articulate phrasing, added an appropriate modern greeting, and closed with a clear, polite next step.",
  };
}

/**
 * Main Native Communication Analysis Function
 */
export function analyzeCommunicationNative(request: AnalyzeRequest): CommunicationAnalysis {
  const { message, recipient, situation, desiredTone = "Professional & Polished" } = request;

  let clarityScore = 88;
  let confidenceScore = 85;
  let politenessScore = 90;
  let concisenessScore = 84;

  // Pattern detection penalties
  const isOverApologetic = OVER_APOLOGETIC_PATTERNS.some((p) => p.test(message));
  const hasTimidQualifiers = TIMID_QUALIFIERS.some((p) => p.test(message));
  const hasCasualSlips = CASUAL_SLIPS.some((p) => p.test(message));
  const isBlunt = BLUNT_PATTERNS.some((p) => p.test(message));

  if (isOverApologetic) {
    confidenceScore -= 14;
    politenessScore -= 3;
  }
  if (hasTimidQualifiers) {
    confidenceScore -= 10;
    concisenessScore -= 8;
  }
  if (hasCasualSlips) {
    politenessScore -= 12;
    clarityScore -= 6;
  }
  if (isBlunt) {
    politenessScore -= 18;
    confidenceScore += 4;
  }

  // Length heuristics
  const words = message.trim().split(/\s+/).filter(Boolean);
  if (words.length < 8) {
    concisenessScore = 92;
    clarityScore -= 6;
  } else if (words.length > 70) {
    concisenessScore -= 12;
  }

  // Bounded scores (0-100)
  clarityScore = Math.max(55, Math.min(98, clarityScore));
  confidenceScore = Math.max(50, Math.min(98, confidenceScore));
  politenessScore = Math.max(55, Math.min(98, politenessScore));
  concisenessScore = Math.max(55, Math.min(98, concisenessScore));

  const overallScore = Math.round(
    clarityScore * 0.3 + confidenceScore * 0.3 + politenessScore * 0.25 + concisenessScore * 0.15
  );

  let detectedSentiment = "Natural & Conversational";
  if (isOverApologetic && hasTimidQualifiers) detectedSentiment = "Over-Apologetic & Hesitant";
  else if (hasCasualSlips) detectedSentiment = "Slightly Too Casual";
  else if (isBlunt) detectedSentiment = "Blunt & Abrupt";
  else if (hasTimidQualifiers) detectedSentiment = "Hesitant Posture";

  // Generate natural modern rewrites
  const rewrites = generateNaturalRewrites(message, recipient, situation);
  const diffHighlights = computeLcsDiffHighlights(message, rewrites.master);

  const origWordsCount = words.length;
  const impWordsCount = rewrites.master.trim().split(/\s+/).filter(Boolean).length;

  const tones: ToneMetric[] = [
    {
      name: "Assertiveness",
      score: confidenceScore,
      label: confidenceScore > 78 ? "Confident" : "Needs Posture",
      comment:
        confidenceScore > 78
          ? "Clear agency without being demanding."
          : "Cut apologetic preambles like 'sorry to bother' to sound more decisive.",
    },
    {
      name: "Warmth",
      score: Math.min(96, politenessScore + 4),
      label: "Approachable",
      comment: "Conversational, human, and positive.",
    },
    {
      name: "Formality",
      score: hasCasualSlips ? 58 : 82,
      label: hasCasualSlips ? "Too Casual" : "Natural Business Professional",
      comment: hasCasualSlips
        ? "Upgraded casual abbreviations into clean, contemporary phrasing."
        : "Contemporary, respectful, and zero archaic stuffiness.",
    },
    {
      name: "Politeness",
      score: politenessScore,
      label: politenessScore > 80 ? "Respectful" : "Needs Polish",
      comment: "Polite without unnecessary subservience.",
    },
    {
      name: "Conciseness",
      score: concisenessScore,
      label: concisenessScore > 78 ? "Crisp" : "Slightly Wordy",
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
      bestFor: "Busy managers, team leads, and fast turnaround requests",
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
      title: "Keep It Natural, Not Stuffy",
      tip: "Over-formal language ('with a humble request', 'I am writing to communicate') sounds robotic and distant. Speak naturally and with genuine respect.",
      ruleOfThumb: "Write like an articulate human, not a 19th-century letter.",
      avoidPhrases: ["I am writing to humbly request", "Please forgive my intrusion", "With deepest respect"],
      tryPhrases: ["Could we please", "Would it be possible to", "I wanted to check in regarding"],
    },
    {
      title: "Propose a Specific Solution",
      tip: "Instead of an open-ended problem ('I'm sick and can't do it'), propose a clear path forward ('Could I submit by Sunday at 11:59 PM?').",
      ruleOfThumb: "Give the recipient a simple decision rather than an open planning problem.",
      avoidPhrases: ["Whenever you have a chance", "Sometime soon", "A few days"],
      tryPhrases: ["By Sunday at 11:59 PM", "Before our sync on Tuesday", "By end of day tomorrow"],
    },
    {
      title: "Replace Apology with Appreciation",
      tip: "Saying 'Sorry for the delay' highlights your fault. Saying 'Thank you for your patience' frames the reader positively.",
      ruleOfThumb: "Appreciation builds connection; excessive apologies erode confidence.",
      avoidPhrases: ["Sorry for the late reply", "Sorry to bother you again"],
      tryPhrases: ["Thank you for your patience", "Appreciate your flexibility"],
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
        ? "Clear intent with a natural tone. Refined conversational phrasing for maximum clarity and respect."
        : "Replaced hesitant qualifiers and casual slips with confident, contemporary professional phrasing.",
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
        isOverApologetic ? "Excessive apologetic phrases weakened personal authority" : "Sentence structure trimmed for better pacing",
        hasCasualSlips ? "Casual abbreviations upgraded to clean professional phrasing" : "Call to action clarified with a specific next step",
        hasTimidQualifiers ? "Minimizing qualifiers ('just', 'kind of') removed for direct clarity" : "Maintained natural conversational warmth",
      ],
      psychologicalImpact:
        "When communicators speak naturally and clearly without groveling, recipients perceive high agency, competence, and mutual respect. This leads to faster decisions and positive responses.",
      framingStrategy:
        "Applied Modern Communication Reframing: warm greeting + clear context + specific proposed solution + polite low-friction closing.",
    },
    learningTips,
    alternativeRewrites,
    readingStats: {
      originalWords: origWordsCount,
      improvedWords: impWordsCount,
      timeReductionSeconds: Math.max(2, Math.round(Math.abs(origWordsCount - impWordsCount) * 0.3)),
      formalityGrade: "Natural Professional",
    },
    analyzedAt: new Date().toISOString(),
  };
}
