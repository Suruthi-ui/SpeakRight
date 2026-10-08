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
        particleCount: 35,
        spread: 50,
        origin: { y: 0.7 },
        colors: ["#6366f1", "#10b981"],
      });
    } catch {}

    setTimeout(() => setCopiedId(null), 2200);
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
    <div className="glass-panel-elevated rounded-[28px] p-6 sm:p-8 border border-white/15 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-white/10 pb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Three Alternative Rewrites</h3>
            <p className="text-xs text-slate-400">
              Select the variant that best matches your immediate dynamic
            </p>
          </div>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 self-start sm:self-auto">
          Tailored Styles
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rewrites.map((alt) => {
          const isCopied = copiedId === alt.id;
          const isPlaying = playingId === alt.id;

          return (
            <div
              key={alt.id}
              className="glass-panel rounded-2xl p-5 border border-white/10 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all group"
            >
              <div>
                {/* Header with Title & Tone */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {alt.title}
                    </h4>
                    <span className="text-[11px] text-indigo-400 font-medium">
                      {alt.tone}
                    </span>
                  </div>
                  <span className="p-1 rounded-lg bg-white/5 text-slate-400">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {alt.summary}
                </p>

                {/* Rewritten Message Box */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans select-all whitespace-pre-wrap mb-4">
                  {alt.message}
                </div>
              </div>

              <div>
                {/* Best for recommendation */}
                <div className="mb-4 text-[11px] text-slate-400 bg-white/5 p-2.5 rounded-lg border border-white/5">
                  <span className="text-slate-300 font-semibold">Best for: </span>
                  <span>{alt.bestFor}</span>
                </div>

                {/* Actions: Copy & Listen */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => handleCopy(alt)}
                    className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
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
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      isPlaying
                        ? "bg-indigo-600 text-white border-indigo-500"
                        : "bg-white/5 border-white/10 text-slate-300 hover:text-white"
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
