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
  Wand2,
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

    router.push("/dashboard?auto=true");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleAnalyze();
    }
  };

  return (
    <section id="message-builder" className="py-16 md:py-24 bg-white border-y border-slate-200/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 text-xs font-bold mb-3 border border-indigo-200/80 shadow-xs">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Interactive Message Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            Build Your Message
          </h2>
          <p className="text-sm text-slate-600">
            Select your recipient and context, then paste your raw draft to analyze and polish.
          </p>
        </div>

        {/* Quick Sample Presets */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mr-1">
            <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>Sample scenarios:</span>
          </span>
          {SAMPLE_SCENARIOS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset.id)}
              className="text-xs px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 text-slate-700 font-semibold transition-all cursor-pointer border border-slate-200/90 shadow-2xs hover:shadow-xs active:scale-95"
            >
              {preset.title}
            </button>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-indigo-500/5 relative ring-1 ring-slate-900/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {/* 1. Recipient Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                <span>Recipient</span>
              </label>
              <div className="relative">
                <select
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value as RecipientType)}
                  className="minimal-input w-full px-3.5 py-2.5 rounded-xl text-sm font-medium focus:outline-none appearance-none cursor-pointer pr-8 bg-slate-50/50"
                >
                  {RECIPIENT_OPTIONS.map((item) => (
                    <option key={item} value={item} className="text-slate-900">
                      {item}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* 2. Situation Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <span>Situation</span>
              </label>
              <div className="relative">
                <select
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  className="minimal-input w-full px-3.5 py-2.5 rounded-xl text-sm font-medium focus:outline-none appearance-none cursor-pointer pr-8 bg-slate-50/50"
                >
                  {SITUATION_OPTIONS.map((sit) => (
                    <option key={sit} value={sit} className="text-slate-900">
                      {sit}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* 3. Desired Tone Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-violet-600" />
                <span>Desired Tone</span>
              </label>
              <div className="relative">
                <select
                  value={desiredTone}
                  onChange={(e) => setDesiredTone(e.target.value as ToneType)}
                  className="minimal-input w-full px-3.5 py-2.5 rounded-xl text-sm font-medium focus:outline-none appearance-none cursor-pointer pr-8 bg-slate-50/50"
                >
                  {TONE_OPTIONS.map((tone) => (
                    <option key={tone} value={tone} className="text-slate-900">
                      {tone}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Large Message Input */}
          <div className="space-y-1.5 mb-5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <SendHorizontal className="w-4 h-4 text-indigo-600" />
                <span>Your Draft Message</span>
              </label>

              <div className="flex items-center gap-2.5 text-xs text-slate-500 font-medium">
                <span>{wordCount} words</span>
                <span>•</span>
                <span>{charCount} chars</span>
                {message && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-1 text-slate-400 hover:text-rose-600 transition-colors ml-1 cursor-pointer"
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
              rows={5}
              placeholder="Paste or write your raw draft here..."
              className="minimal-input w-full p-4 rounded-2xl text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none resize-y leading-relaxed bg-white shadow-2xs"
            />
          </div>

          {/* Error display if any */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
              {errorMessage}
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <span className="hidden sm:inline">Press</span>
              <kbd className="hidden sm:inline px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-mono text-slate-700 font-semibold shadow-2xs">
                Ctrl + Enter
              </kbd>
              <span className="hidden sm:inline">to analyze instantly</span>
            </div>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isSubmitting}
              className="minimal-button-primary w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 group"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Calibrating Communication...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>Analyze Message</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
