import { RecipientType, ToneType } from "@/types/communication";

export interface PresetScenario {
  id: string;
  category: "student" | "career" | "workplace" | "freelance";
  title: string;
  recipient: RecipientType;
  situation: string;
  desiredTone: ToneType;
  draft: string;
  description: string;
}

export const RECIPIENT_OPTIONS: RecipientType[] = [
  "Professor",
  "Teacher",
  "Manager",
  "HR",
  "Friend",
  "Client",
  "Team",
  "Other",
];

export const SITUATION_OPTIONS = [
  "Requesting a Deadline Extension",
  "Requesting a Letter of Recommendation",
  "Salary / Promotion Discussion",
  "Resigning / Notice of Departure",
  "Apologizing for a Mistake / Delay",
  "Giving Constructive Critical Feedback",
  "Declining an Offer or Request Politely",
  "Post-Interview Follow-Up",
  "Cold Outreach / Professional Networking",
  "Clarifying Ambiguous Project Requirements",
  "Escalating a Blocker to Leadership",
  "Other / Custom Situation",
];

export const TONE_OPTIONS: ToneType[] = [
  "Professional & Polished",
  "Confident & Direct",
  "Warm & Diplomatic",
  "Academic & Formal",
  "Urgent yet Respectful",
];

export const SAMPLE_SCENARIOS: PresetScenario[] = [
  {
    id: "prof-extension",
    category: "student",
    title: "Deadline Extension to Professor",
    recipient: "Professor",
    situation: "Requesting a Deadline Extension",
    desiredTone: "Academic & Formal",
    draft: "Hey Prof, sorry to bother you but I was really sick the past two days and couldn't finish the essay due tomorrow. Can I get an extension till Sunday? I will be really grateful.",
    description: "Transforms a casual, apologetic email into a respectful, formal academic request with proposed milestones.",
  },
  {
    id: "manager-raise",
    category: "career",
    title: "Salary Review with Manager",
    recipient: "Manager",
    situation: "Salary / Promotion Discussion",
    desiredTone: "Confident & Direct",
    draft: "Hi, I think I've been doing a lot of extra work lately and my salary is kind of low compared to what others make. Can we talk about giving me a raise in our next meeting?",
    description: "Replaces hesitation and vague complaints with clear value demonstration, structured agenda, and confident posture.",
  },
  {
    id: "hr-followup",
    category: "career",
    title: "Post-Interview Follow-Up",
    recipient: "HR",
    situation: "Post-Interview Follow-Up",
    desiredTone: "Professional & Polished",
    draft: "Hey, just wondering if there is any update on my interview from last week? Haven't heard anything so wanted to make sure I'm still in consideration.",
    description: "Turns an anxious ping into an enthusiastic, value-reaffirming professional inquiry.",
  },
  {
    id: "client-delay",
    category: "freelance",
    title: "Client Project Timeline Adjustment",
    recipient: "Client",
    situation: "Apologizing for a Mistake / Delay",
    desiredTone: "Warm & Diplomatic",
    draft: "Hi, the feature is not ready today because there were bugs. We are going to need two more days to fix it. Hope that's okay with you.",
    description: "Converts defensive notification into proactive ownership with clear revised deliverables and client reassurance.",
  },
  {
    id: "team-say-no",
    category: "workplace",
    title: "Declining Extra Scope Politely",
    recipient: "Team",
    situation: "Declining an Offer or Request Politely",
    desiredTone: "Confident & Direct",
    draft: "I don't think I can do this task right now because I have too much other stuff on my plate. Maybe someone else can take it?",
    description: "Frames capacity constraints constructively with trade-off visibility rather than a flat refusal.",
  },
];
