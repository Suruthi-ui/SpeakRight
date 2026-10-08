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

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#0f172a", "#059669"],
      });
    } catch {}

    setTimeout(() => setCopied(false), 2000);
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
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
      {/* Top Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Before vs. Improved Message</h3>
          </div>
          <p className="text-xs text-slate-500">
            Compare changes side-by-side or inspect linguistic diffs
          </p>
        </div>

        {/* View Switcher & Action buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setViewMode("split")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "split"
                  ? "bg-white text-slate-900 font-semibold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
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
                  ? "bg-white text-slate-900 font-semibold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
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
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
            }`}
            title={isPlayingAudio ? "Stop Audio" : "Listen to revised message"}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="minimal-button-primary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Rewrite</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content Body: Split View vs Diff View */}
      {viewMode === "split" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Before Column */}
          <div className="rounded-2xl bg-rose-50/50 border border-rose-100 p-5 space-y-2.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                  Original Draft (Before)
                </span>
                <span className="text-[11px] text-slate-400">Raw Input</span>
              </div>
              <div className="bg-white rounded-xl p-4 border border-rose-100 text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-wrap">
                {originalMessage}
              </div>
            </div>

            <div className="pt-2 text-[11px] text-rose-700 flex items-center gap-1.5">
              <span>Identified: Hesitant tone, excessive apologies, casual structure.</span>
            </div>
          </div>

          {/* After Column */}
          <div className="rounded-2xl bg-emerald-50/50 border border-emerald-100 p-5 space-y-2.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{primaryImprovement.title || "Master Rewrite (After)"}</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Recommended
                </span>
              </div>
              <div className="bg-white rounded-xl p-4 border border-emerald-100 text-sm sm:text-base text-slate-900 font-medium leading-relaxed font-sans whitespace-pre-wrap select-all shadow-xs">
                {primaryImprovement.improvedMessage}
              </div>
            </div>

            <div className="pt-2 text-[11px] text-emerald-800 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>{primaryImprovement.whyItWorks}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Diff Highlight View */
        <div className="space-y-3">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-semibold uppercase text-slate-500 mb-2 tracking-wider">
              Linguistic Improvements Highlighted
            </div>
            <div className="text-sm leading-loose p-4 rounded-xl bg-white border border-slate-200 font-sans">
              {primaryImprovement.diffHighlights && primaryImprovement.diffHighlights.length > 0 ? (
                primaryImprovement.diffHighlights.map((chunk, idx) => (
                  <span
                    key={idx}
                    className={
                      chunk.type === "added"
                        ? "bg-emerald-100 text-emerald-900 px-1 py-0.5 rounded font-medium border border-emerald-200 inline-block mr-1 my-0.5"
                        : chunk.type === "removed"
                        ? "bg-rose-100 text-rose-800 line-through px-1 py-0.5 rounded opacity-75 inline-block mr-1 my-0.5"
                        : "text-slate-800"
                    }
                  >
                    {chunk.text}
                  </span>
                ))
              ) : (
                <span className="text-slate-900">{primaryImprovement.improvedMessage}</span>
              )}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <span className="font-semibold text-slate-900">Why It Works: </span>
            {primaryImprovement.whyItWorks}
          </div>
        </div>
      )}
    </div>
  );
}
