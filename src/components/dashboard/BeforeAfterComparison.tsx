"use client";

import React, { useState } from "react";
import { CommunicationAnalysis } from "@/types/communication";
import {
  Sparkles,
  Copy,
  Check,
  Volume2,
  VolumeX,
  FileCheck,
  Split,
  Eye,
} from "lucide-react";
import confetti from "canvas-confetti";

interface Props {
  analysis: CommunicationAnalysis;
  onCopySuccess?: () => void;
}

export function BeforeAfterComparison({ analysis, onCopySuccess }: Props) {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [viewMode, setViewMode] = useState<"split" | "diff">("split");

  const { originalMessage, primaryImprovement } = analysis;

  const handleCopy = () => {
    navigator.clipboard.writeText(primaryImprovement.improvedMessage);
    setCopied(true);
    if (onCopySuccess) onCopySuccess();

    // Trigger delightful celebration confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#10b981", "#a855f7"],
      });
    } catch {}

    setTimeout(() => setCopied(false), 2500);
  };

  const handleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(primaryImprovement.improvedMessage);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="glass-panel-elevated rounded-[28px] p-6 sm:p-8 border border-white/15 relative overflow-hidden">
      {/* Top Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-white">Before vs. Improved Message</h3>
          </div>
          <p className="text-xs text-slate-400">
            Side-by-side linguistic transformation with diff insights
          </p>
        </div>

        {/* View Switcher & Action buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setViewMode("split")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "split"
                  ? "bg-indigo-600 text-white font-medium shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Split className="w-3.5 h-3.5" />
              <span>Split View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("diff")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "diff"
                  ? "bg-indigo-600 text-white font-medium shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Diff Highlight</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleSpeak}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isPlayingAudio
                ? "bg-indigo-600 text-white border-indigo-500"
                : "bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
            }`}
            title={isPlayingAudio ? "Stop Audio" : "Listen to revised message"}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="glass-button-primary px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Master Rewrite</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content Body: Split View vs Diff View */}
      {viewMode === "split" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before Column */}
          <div className="rounded-2xl bg-rose-950/20 border border-rose-500/20 p-5 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  Original Draft (Before)
                </span>
                <span className="text-[11px] text-slate-400">Raw Input</span>
              </div>
              <div className="bg-black/40 rounded-xl p-4 border border-white/5 text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-wrap">
                {originalMessage}
              </div>
            </div>

            <div className="pt-3 border-t border-rose-500/15 text-[11px] text-rose-300/80 flex items-center gap-1.5">
              <span>Identified: Hesitant tone, conversational leaks, filler phrases.</span>
            </div>
          </div>

          {/* After Column */}
          <div className="rounded-2xl bg-emerald-950/25 border border-emerald-500/30 p-5 space-y-3 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{primaryImprovement.title || "Master Rewrite (After)"}</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  Recommended
                </span>
              </div>
              <div className="bg-black/50 rounded-xl p-4 border border-emerald-500/20 text-sm sm:text-base text-slate-100 font-medium leading-relaxed font-sans whitespace-pre-wrap select-all">
                {primaryImprovement.improvedMessage}
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-500/20 text-[11px] text-emerald-300/90 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>{primaryImprovement.whyItWorks}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Diff Highlight View */
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
            <div className="text-xs font-semibold uppercase text-slate-400 mb-3 tracking-wider">
              Linguistic Diff Highlights (Key phrase improvements)
            </div>
            <div className="text-sm leading-loose p-4 rounded-xl bg-slate-950/60 border border-white/5 font-sans">
              {primaryImprovement.diffHighlights && primaryImprovement.diffHighlights.length > 0 ? (
                primaryImprovement.diffHighlights.map((chunk, idx) => (
                  <span
                    key={idx}
                    className={
                      chunk.type === "added"
                        ? "bg-emerald-500/25 text-emerald-200 px-1 py-0.5 rounded font-medium border border-emerald-500/30 inline-block mr-1 my-0.5"
                        : chunk.type === "removed"
                        ? "bg-rose-500/20 text-rose-300 line-through px-1 py-0.5 rounded opacity-70 inline-block mr-1 my-0.5"
                        : "text-slate-300"
                    }
                  >
                    {chunk.text}
                  </span>
                ))
              ) : (
                <span className="text-slate-200">{primaryImprovement.improvedMessage}</span>
              )}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300">
            <span className="font-semibold text-indigo-400">Why It Works: </span>
            {primaryImprovement.whyItWorks}
          </div>
        </div>
      )}
    </div>
  );
}
