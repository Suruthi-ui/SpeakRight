export type RecipientType =
  | "Professor"
  | "Teacher"
  | "Manager"
  | "HR"
  | "Friend"
  | "Client"
  | "Team"
  | "Other";

export type ToneType =
  | "Professional & Polished"
  | "Confident & Direct"
  | "Warm & Diplomatic"
  | "Academic & Formal"
  | "Urgent yet Respectful";

export interface ToneMetric {
  name: string;
  score: number; // 0 to 100
  label: string; // e.g., "Optimal", "Too passive", "Balanced", "Slightly Blunt"
  comment: string;
}

export interface DiffHighlight {
  type: "added" | "removed" | "kept";
  text: string;
}

export interface RewriteOption {
  id: string;
  title: string;
  tone: string;
  summary: string;
  message: string;
  bestFor: string;
}

export interface LearningTip {
  title: string;
  tip: string;
  ruleOfThumb: string;
  avoidPhrases: string[];
  tryPhrases: string[];
}

export interface CommunicationAnalysis {
  overallScore: number; // 0 to 100
  scoreBreakdown: {
    clarity: number;
    confidence: number;
    politeness: number;
    conciseness: number;
  };
  executiveSummary: string;
  originalMessage: string;
  recipient: RecipientType | string;
  situation: string;
  desiredTone?: string;
  detectedSentiment: string;
  primaryImprovement: {
    title: string;
    improvedMessage: string;
    whyItWorks: string;
    diffHighlights: DiffHighlight[];
  };
  tones: ToneMetric[];
  aiExplanation: {
    keyIssuesIdentified: string[];
    psychologicalImpact: string;
    framingStrategy: string;
  };
  learningTips: LearningTip[];
  alternativeRewrites: RewriteOption[];
  readingStats: {
    originalWords: number;
    improvedWords: number;
    timeReductionSeconds: number;
    formalityGrade: string;
  };
  analyzedAt: string;
}

export interface AnalyzeRequest {
  message: string;
  recipient: string;
  situation: string;
  desiredTone?: string;
}

export interface AnalyzeResponse {
  success: boolean;
  data?: CommunicationAnalysis;
  error?: string;
  rawResponse?: string;
}
