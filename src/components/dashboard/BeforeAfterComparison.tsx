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
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#4f46e5", "#10b981", "#7c3aed"],
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
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-indigo-500/5 relative overflow-hidden">
      {/* Top Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/25">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Before vs. Improved Message</h3>
              <p className="text-xs text-slate-500">Compare side-by-side or inspect linguistic upgrades</p>
            </div>
          </div>
        </div>

        {/* View Switcher & Action buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs shadow-inner">
            <button
              type="button"
              onClick={() => setViewMode("split")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                viewMode === "split"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Split className="w-3.5 h-3.5" />
              <span>Split View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("diff")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                viewMode === "diff"
                  ? "bg-white text-indigo-700 shadow-sm"
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
            className={`p-2.5 rounded-xl border transition-all cursor-pointer shadow-xs ${
              isPlayingAudio
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/30"
                : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
            }`}
            title={isPlayingAudio ? "Stop Audio" : "Listen to revised message"}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="minimal-button-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
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
          <div className="rounded-2xl bg-gradient-to-br from-rose-50/60 to-white border border-rose-200/90 p-5 space-y-3 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-rose-700">
                  Original Draft (Before)
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                  Raw Input
                </span>
              </div>
              <div className="bg-white rounded-xl p-4 border border-rose-100 text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-wrap shadow-2xs italic">
                {originalMessage}
              </div>
            </div>

            <div className="pt-2 text-[11px] text-rose-700 font-semibold flex items-center gap-1.5">
              <span>Identified: Hesitant tone, excessive apologies, casual structure.</span>
            </div>
          </div>

          {/* After Column */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-50/60 via-white to-indigo-50/30 border border-emerald-300/90 p-5 space-y-3 flex flex-col justify-between shadow-md shadow-emerald-500/5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{primaryImprovement.title || "Master Rewrite (After)"}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold shadow-2xs">
                  Recommended
                </span>
              </div>
              <div className="bg-white rounded-xl p-4 border border-emerald-100 text-sm sm:text-base text-slate-900 font-medium leading-relaxed font-sans whitespace-pre-wrap select-all shadow-xs">
                {primaryImprovement.improvedMessage}
              </div>
            </div>

            <div className="pt-2 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{primaryImprovement.whyItWorks}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Diff Highlight View */
        <div className="space-y-3">
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200">
            <div className="text-xs font-bold uppercase text-slate-600 mb-2 tracking-wider flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-indigo-600" />
              <span>Linguistic Improvements Highlighted</span>
            </div>
            <div className="text-sm leading-loose p-4 rounded-xl bg-white border border-slate-200 font-sans shadow-2xs">
              {primaryImprovement.diffHighlights && primaryImprovement.diffHighlights.length > 0 ? (
                primaryImprovement.diffHighlights.map((chunk, idx) => (
                  <span
                    key={idx}
                    className={
                      chunk.type === "added"
                        ? "bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded-md font-bold border border-emerald-300 inline-block mr-1 my-0.5 shadow-2xs"
                        : chunk.type === "removed"
                        ? "bg-rose-100 text-rose-800 line-through px-1 py-0.5 rounded opacity-75 inline-block mr-1 my-0.5"
                        : "text-slate-800 font-normal"
                    }
                  >
                    {chunk.text}
                  </span>
                ))
              ) : (
                <span className="text-slate-900 font-medium">{primaryImprovement.improvedMessage}</span>
              )}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 text-xs text-indigo-900 flex items-start gap-2 shadow-2xs">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Why It Works: </span>
              <span className="font-normal">{primaryImprovement.whyItWorks}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
