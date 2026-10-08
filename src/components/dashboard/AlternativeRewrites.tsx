"use client";

import React, { useState } from "react";
import { RewriteOption } from "@/types/communication";
import { Layers, Copy, Check, Volume2, VolumeX, Zap, Shield, HeartHandshake } from "lucide-react";
import confetti from "canvas-confetti";

interface Props {
  rewrites: RewriteOption[];
}

export function AlternativeRewrites({ rewrites }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handleCopy = (rewrite: RewriteOption) => {
    navigator.clipboard.writeText(rewrite.message);
    setCopiedId(rewrite.id);

    try {
      confetti({
        particleCount: 35,
        spread: 45,
        origin: { y: 0.7 },
        colors: ["#4f46e5", "#7c3aed", "#10b981"],
      });
    } catch {}

    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (rewrite: RewriteOption) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (playingId === rewrite.id) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(rewrite.message);
    utterance.rate = 0.95;
    utterance.onend = () => setPlayingId(null);
    utterance.onerror = () => setPlayingId(null);

    setPlayingId(rewrite.id);
    window.speechSynthesis.speak(utterance);
  };

  if (!rewrites || rewrites.length === 0) return null;

  const getStyleCardVisuals = (id: string) => {
    if (id.includes("exec")) {
      return {
        cardBg: "bg-gradient-to-br from-indigo-50/60 via-white to-slate-50/80 border-indigo-200 hover:border-indigo-300",
        badgeBg: "bg-indigo-100 text-indigo-800 border-indigo-200",
        icon: Zap,
        iconColor: "text-indigo-600 bg-indigo-50 border-indigo-200",
      };
    }
    if (id.includes("diplo")) {
      return {
        cardBg: "bg-gradient-to-br from-violet-50/60 via-white to-slate-50/80 border-violet-200 hover:border-violet-300",
        badgeBg: "bg-violet-100 text-violet-800 border-violet-200",
        icon: Shield,
        iconColor: "text-violet-600 bg-violet-50 border-violet-200",
      };
    }
    return {
      cardBg: "bg-gradient-to-br from-amber-50/50 via-white to-emerald-50/40 border-amber-200 hover:border-amber-300",
      badgeBg: "bg-amber-100 text-amber-900 border-amber-200",
      icon: HeartHandshake,
      iconColor: "text-amber-600 bg-amber-50 border-amber-200",
    };
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-indigo-500/5 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/25">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Three Alternative Rewrites</h3>
            <p className="text-xs text-slate-500">
              Select the variant that best matches your immediate dynamic
            </p>
          </div>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 self-start sm:self-auto shadow-2xs">
          Calibrated Tonal Variants
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {rewrites.map((alt) => {
          const isCopied = copiedId === alt.id;
          const isPlaying = playingId === alt.id;
          const visuals = getStyleCardVisuals(alt.id);
          const Icon = visuals.icon;

          return (
            <div
              key={alt.id}
              className={`rounded-2xl p-5 border flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-all duration-200 ${visuals.cardBg}`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {alt.title}
                    </h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border mt-1 inline-block shadow-2xs ${visuals.badgeBg}`}>
                      {alt.tone}
                    </span>
                  </div>
                  <span className={`p-1.5 rounded-lg border shadow-2xs ${visuals.iconColor}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                </div>

                <p className="text-xs text-slate-500 mb-3 leading-relaxed font-normal">
                  {alt.summary}
                </p>

                {/* Message Body */}
                <div className="bg-white rounded-xl p-3.5 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium select-all shadow-2xs">
                  {alt.message}
                </div>
              </div>

              {/* Card Footer: Best For + Actions */}
              <div className="pt-2 border-t border-slate-200/60 space-y-3">
                <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
                  <span className="font-bold text-slate-700">Best for:</span>
                  <span className="truncate">{alt.bestFor}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSpeak(alt)}
                    className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer shadow-2xs ${
                      isPlaying
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                    title={isPlaying ? "Stop Audio" : "Listen"}
                  >
                    {isPlaying ? <VolumeX className="w-3.5 h-3.5 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(alt)}
                    className="flex-1 minimal-button-secondary py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                        <span>Copy Option</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
