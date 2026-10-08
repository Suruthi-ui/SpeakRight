# SpeakRight – AI Communication Coach 🎙️✨

> **Say what you mean. Command the respect you deserve.**  
> An executive-grade AI communication copilot built for students, managers, and career professionals to rewrite messages into clear, confident, respectful, and authoritative communication in seconds.

[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Google Gemini API](https://img.shields.io/badge/Google%20Gemini-1.5%20Flash-4285F4?style=for-the-badge&logo=google)](https://aistudio.google.com/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animation-FF0055?style=for-the-badge)](https://www.framer.com/motion/)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Deploy%20Ready-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

---

## 🌟 Why SpeakRight?

Most communicators lose leverage, respect, or opportunities not because of what they want, but because of **how they say it**:
- **Students** often sound either too casual (`"hey prof, can I get extension"`) or anxious and over-apologetic.
- **Working Professionals** erode authority with self-deprecating filler words (`"just checking in"`, `"sorry to bother you"`).
- **Managers & Founders** can inadvertently sound blunt or passive-aggressive when addressing deadlines or critical blockers.

**SpeakRight** bridges this gap. Powered by **Google Gemini 1.5 Flash via Google AI Studio**, it acts as your personal Harvard Business School communication coach and behavioral linguist.

---

## ✨ Key Features

### 1. 🎯 Precision Recipient & Situation Engine
- **Recipients**: Professor, Teacher, Manager, HR, Friend, Client, Team, Other.
- **Situations**: Deadline Extensions, Recommendation Letters, Salary & Promotion Reviews, Resignations, Apologies for Delays, Constructive Peer Feedback, Declining Politely, and Post-Interview Follow-ups.
- **Tones**: Professional & Polished, Confident & Direct, Warm & Diplomatic, Academic & Formal, Urgent yet Respectful.

### 2. 📊 Executive Communication Score & Breakdown
- Dynamic **Circular Score Gauge (0–100)** with real-time sub-metric indicators:
  - **Clarity**
  - **Confidence**
  - **Politeness**
  - **Conciseness**
- Reading statistics: Word count delta, estimated reader time saved, and formality grade.

### 3. 🎛️ 5-Dimension Tone Radar
- Animated progress bars calibrating:
  - **Assertiveness** (eliminates timid apologies)
  - **Warmth** (builds rapport)
  - **Formality** (matches organizational hierarchy)
  - **Politeness** (respect without subservience)
  - **Conciseness** (removes fluff)

### 4. 🔀 Before vs. Improved Message Transformation
- **Side-by-Side Split View** or **Unified Diff Highlight View**.
- Audio narration via Web Speech API (`SpeechSynthesis`) to hear how your message lands out loud.
- 1-Click Copy with celebratory confetti effect.

### 5. 🧠 Linguistic Psychology & Framing Strategy
- Deep explanations of subconscious recipient perception.
- Reframing strategies applied to shift from defensive posturing to high-agency accountability.
- Key linguistic vulnerabilities cataloged and corrected.

### 6. 💡 Actionable Coaching & Learning Tips
- 3 permanent communication habits:
  - Title and psychological rationale
  - Memorable **"Rule of Thumb"**
  - **Phrases to Avoid** vs. **Phrases to Use Instead**

### 7. 🎭 Three Targeted Alternative Rewrites
- **Option 1: Executive & Direct** (Crisp, action-oriented, zero fluff)
- **Option 2: Diplomatic & Polite** (Gracious, tactful, consensus-seeking)
- **Option 3: Warm & Collaborative** (Personable, team camaraderie, high energy)

### 8. 📄 Executive PDF Export & Native Sharing
- Generate beautifully formatted, branded PDF coaching reports via `jsPDF` for student portfolios, mentorship reviews, and team workshops.
- Native device sharing support via Web Share API.

### 9. 📱 Future-Ready WhatsApp Pre-Send Shield
- Integrated **Meta WhatsApp Cloud API Webhook** architecture (`/api/whatsapp/webhook` & `/api/whatsapp/rewrite`).
- Interactive WhatsApp chat simulator modal for previewing pre-send rewrites in mobile chat bubbles.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with luxury glassmorphism tokens
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Engine**: [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai) (`gemini-1.5-flash`)
- **PDF Engine**: [jsPDF](https://github.com/parallax/jsPDF)
- **Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Type Safety**: TypeScript 5.0 (Strict mode)

---

## 📁 Project Architecture

```
src/
├── app/
│   ├── api/
│   │   ├── analyze/
│   │   │   └── route.ts          # Core Gemini 1.5 Flash Analysis endpoint
│   │   ├── test-key/
│   │   │   └── route.ts          # Google AI Studio API key validator
│   │   └── whatsapp/
│   │       ├── rewrite/
│   │       │   └── route.ts      # Pre-send rewrite endpoint for WhatsApp
│   │       └── webhook/
│   │           └── route.ts      # Meta WhatsApp Cloud API Webhook handler
│   ├── dashboard/
│   │   └── page.tsx              # Executive AI Dashboard
│   ├── globals.css               # Glassmorphic tokens, glowing radial gradients
│   ├── layout.tsx                # Metadata & Root Layout
│   └── page.tsx                  # Landing Page (Hero, Form, Features, Testimonials, FAQ)
├── components/
│   ├── ApiKeyModal.tsx           # Google AI Studio API Key Manager
│   ├── Footer.tsx                # Enterprise footer
│   ├── Navbar.tsx                # Floating glassmorphic navigation
│   ├── dashboard/
│   │   ├── AiExplanationCard.tsx # Linguistic & psychological breakdown
│   │   ├── AlternativeRewrites.tsx# 3 distinct rewrite options with audio listen
│   │   ├── BeforeAfterComparison.tsx# Side-by-side split & diff highlighter
│   │   ├── CommunicationScoreCard.tsx# Circular score gauge & reading stats
│   │   ├── ExportShareBar.tsx    # PDF generation & sharing
│   │   ├── LearningTipsCard.tsx  # Actionable coaching rules & phrase lists
│   │   ├── LoadingAnalysis.tsx   # Multi-stage radar pulse loading screen
│   │   ├── QuickTuneBar.tsx      # In-dashboard message re-analyzer
│   │   ├── ToneRadar.tsx         # 5-dimension animated tone progress bars
│   │   └── WhatsAppSimulatorModal.tsx# Interactive WhatsApp pre-send preview
│   └── landing/
│       ├── AudienceShowcase.tsx  # Student vs. Professional scenarios
│       ├── FaqSection.tsx        # Accordion FAQ
│       ├── FeaturesGrid.tsx      # 6 feature cards inspired by Linear & Raycast
│       ├── HeroSection.tsx       # Hero with floating before/after comparison
│       ├── MessageBuilder.tsx    # "Build Your Message" form with sample pills
│       ├── Testimonials.tsx      # Verified social proof
│       └── WhatsAppPreviewSection.tsx# Pre-send WhatsApp feature highlight
├── lib/
│   ├── gemini.ts                 # Google Gemini client & structured JSON prompts
│   ├── pdfGenerator.ts           # jsPDF Executive Report generator
│   ├── sampleData.ts             # Preset situations, recipients & sample drafts
│   └── utils.ts                  # Utility helpers & word count metrics
├── services/
│   └── whatsapp/
│       ├── client.ts             # WhatsApp Cloud API client
│       ├── messageProcessor.ts   # Pre-send interception pipeline
│       └── types.ts              # WhatsApp Webhook & payload types
└── types/
    └── communication.ts          # Comprehensive TypeScript models
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Suruthi-ui/SpeakRight.git
cd SpeakRight
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Google AI Studio API Key
Obtain a free API key at [Google AI Studio](https://aistudio.google.com/app/apikey).

Create a `.env.local` file:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Alternatively, you can enter your API key directly within the app using the "Gemini Key" button in the navigation bar!)*

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production
```bash
npm run build
npm run start
```

---

## ☁️ Deployment to Vercel

SpeakRight is 100% production-ready for instant Vercel deployment:

1. Push your repository to GitHub (`https://github.com/Suruthi-ui/SpeakRight`).
2. Import the project into your [Vercel Dashboard](https://vercel.com/new).
3. Under **Environment Variables**, add:
   - `GEMINI_API_KEY` = your Google AI Studio API key
4. Click **Deploy**. Vercel will automatically run `next build` and deploy your app to a global CDN edge.

---

## 🔒 Privacy & Security

- **Zero Data Retention**: Messages are evaluated in memory and discarded after analysis.
- **Client Storage**: User-provided API keys are kept in your browser's `localStorage` and sent over encrypted TLS headers.
- **Academic Ethics**: SpeakRight acts as an interpersonal communication etiquette coach; it does not generate academic coursework.

---

## 📄 License

MIT License © 2026 Suruthi T. Built with precision for students & professionals.
