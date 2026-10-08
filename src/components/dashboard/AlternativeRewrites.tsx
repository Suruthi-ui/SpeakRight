"use client";

import React, { useState } from "react";
import { RewriteOption } from "@/types/communication";
import { Layers, Copy, Check, Volume2, VolumeX, Sparkles } from "lucide-react";
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
        particleCount: 30,
        spread: 45,
        origin: { y: 0.7 },
        colors: ["#0f172a", "#059669"],
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

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Three Alternative Rewrites</h3>
            <p className="text-xs text-slate-500">
              Select the variant that best matches your immediate dynamic
            </p>
          </div>
        </div>

        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 self-start sm:self-auto font-medium">
          Calibrated Styles
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {rewrites.map((alt) => {
          const isCopied = copiedId === alt.id;
          const isPlaying = playingId === alt.id;

          return (
            <div
              key={alt.id}
              className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {alt.title}
                    </h4>
                    <span className="text-[11px] text-slate-600 font-medium">
                      {alt.tone}
                    </span>
                  </div>
                  <span className="p-1 rounded bg-white text-slate-600 border border-slate-200">
                    <Sparkles className="w-3.5 h-3.5" />
                  </span>
                </div>

                <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                  {alt.summary}
                </p>

                {/* Rewritten Message Box */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 leading-relaxed font-sans select-all whitespace-pre-wrap mb-3 shadow-xs">
                  {alt.message}
                </div>
              </div>

              <div>
                {/* Best for recommendation */}
                <div className="mb-3 text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-200">
                  <span className="text-slate-900 font-semibold">Best for: </span>
                  <span>{alt.bestFor}</span>
                </div>

                {/* Actions: Copy & Listen */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleCopy(alt)}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Option</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSpeak(alt)}
                    className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                      isPlaying
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                    title="Listen to option"
                  >
                    {isPlaying ? <VolumeX className="w-3.5 h-3.5 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
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
