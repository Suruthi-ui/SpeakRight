"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  UserCheck,
  Briefcase,
  SlidersHorizontal,
  Lightbulb,
  RotateCcw,
  SendHorizontal,
} from "lucide-react";
import {
  RECIPIENT_OPTIONS,
  SITUATION_OPTIONS,
  TONE_OPTIONS,
  SAMPLE_SCENARIOS,
} from "@/lib/sampleData";
import { RecipientType, ToneType } from "@/types/communication";

export function MessageBuilder() {
  const router = useRouter();

  const [recipient, setRecipient] = useState<RecipientType>("Professor");
  const [situation, setSituation] = useState<string>("Requesting a Deadline Extension");
  const [desiredTone, setDesiredTone] = useState<ToneType>("Professional & Polished");
  const [message, setMessage] = useState<string>(
    "Hey Prof, sorry to bother you but I was really sick the past two days and couldn't finish the essay due tomorrow. Can I get an extension till Sunday? I will be really grateful."
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const wordCount = message.trim().split(/\s+/).filter(Boolean).length;
  const charCount = message.length;

  const handleSelectPreset = (scenarioId: string) => {
    const found = SAMPLE_SCENARIOS.find((s) => s.id === scenarioId);
    if (found) {
      setRecipient(found.recipient);
      setSituation(found.situation);
      setDesiredTone(found.desiredTone);
      setMessage(found.draft);
      setErrorMessage("");
    }
  };

  const handleReset = () => {
    setMessage("");
    setErrorMessage("");
  };

  const handleAnalyze = () => {
    if (!message.trim() || message.trim().length < 5) {
      setErrorMessage("Please enter a message draft with at least 5 characters.");
      return;
    }

    setIsSubmitting(true);

    // Save draft parameters into sessionStorage for /dashboard
    const draftData = {
      message: message.trim(),
      recipient,
      situation,
      desiredTone,
      timestamp: Date.now(),
    };

    if (typeof window !== "undefined") {
      sessionStorage.setItem("speakright_active_draft", JSON.stringify(draftData));
    }

    // Navigate to /dashboard
    router.push("/dashboard?auto=true");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleAnalyze();
    }
  };

  return (
    <section id="message-builder" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Interactive Coach</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Build Your Message
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Tell the AI who you are writing to and what the situation is. We will analyze its tone, psychological perception, and deliver 3 calibrated rewrites.
          </p>
        </div>

        {/* Quick Sample Presets */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-slate-400 flex items-center gap-1 mr-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Try sample draft:</span>
          </span>
          {SAMPLE_SCENARIOS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset.id)}
              className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              {preset.title}
            </button>
          ))}
        </div>

        {/* The Main Glassmorphism Form Card */}
        <div className="glass-panel-elevated rounded-[28px] p-6 sm:p-10 border border-white/15 shadow-2xl relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* 1. Recipient Dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-indigo-400" />
                <span>Recipient</span>
              </label>
              <div className="relative">
                <select
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value as RecipientType)}
                  className="glass-input w-full px-4 py-3 rounded-2xl text-sm text-white focus:outline-none appearance-none cursor-pointer pr-10 bg-[#0d121f]"
                >
                  {RECIPIENT_OPTIONS.map((item) => (
                    <option key={item} value={item} className="bg-[#0f1422] text-white py-2">
                      {item}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>
              <p className="text-[11px] text-slate-400">Sets respect &amp; hierarchy level</p>
            </div>

            {/* 2. Situation Dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-purple-400" />
                <span>Situation</span>
              </label>
              <div className="relative">
                <select
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  className="glass-input w-full px-4 py-3 rounded-2xl text-sm text-white focus:outline-none appearance-none cursor-pointer pr-10 bg-[#0d121f]"
                >
                  {SITUATION_OPTIONS.map((sit) => (
                    <option key={sit} value={sit} className="bg-[#0f1422] text-white py-2">
                      {sit}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>
              <p className="text-[11px] text-slate-400">Contextual framing &amp; intent</p>
            </div>

            {/* 3. Desired Tone Dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Desired Tone</span>
              </label>
              <div className="relative">
                <select
                  value={desiredTone}
                  onChange={(e) => setDesiredTone(e.target.value as ToneType)}
                  className="glass-input w-full px-4 py-3 rounded-2xl text-sm text-white focus:outline-none appearance-none cursor-pointer pr-10 bg-[#0d121f]"
                >
                  {TONE_OPTIONS.map((tone) => (
                    <option key={tone} value={tone} className="bg-[#0f1422] text-white py-2">
                      {tone}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>
              <p className="text-[11px] text-slate-400">Desired psychological posture</p>
            </div>
          </div>

          {/* Large Message Input */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <SendHorizontal className="w-4 h-4 text-indigo-400" />
                <span>Your Draft Message</span>
              </label>

              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>{wordCount} words</span>
                <span>•</span>
                <span>{charCount} characters</span>
                {message && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition-colors ml-2 cursor-pointer"
                    title="Clear text"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>

            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              onKeyDown={handleKeyDown}
              rows={6}
              placeholder="Paste or write your raw draft here... Don't worry if it feels awkward, blunt, or messy—that's what SpeakRight is built for!"
              className="glass-input w-full p-4 sm:p-5 rounded-2xl text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none resize-y leading-relaxed"
            />
          </div>

          {/* Error display if any */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-2xl bg-red-500/15 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="hidden sm:inline">Press</span>
              <kbd className="hidden sm:inline px-2 py-0.5 rounded-md bg-white/10 border border-white/15 text-[11px] font-mono text-slate-300">
                Ctrl + Enter
              </kbd>
              <span className="hidden sm:inline">to analyze quickly</span>
            </div>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isSubmitting}
              className="glass-button-primary w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-semibold text-white flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Preparing AI Coach...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-white" />
                  <span>Analyze Message</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
