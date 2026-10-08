"use client";

import React from "react";
import { LearningTip } from "@/types/communication";
import { Lightbulb, Check, X, Bookmark } from "lucide-react";

interface Props {
  tips: LearningTip[];
}

export function LearningTipsCard({ tips }: Props) {
  if (!tips || tips.length === 0) return null;

  return (
    <div className="glass-panel-elevated rounded-[28px] p-6 sm:p-7 border border-white/15 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h3 className="text-base font-semibold text-white">Actionable Coaching &amp; Learning Tips</h3>
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
          Lifetime Mastery
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tips.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-4 hover:border-white/20 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {item.tip}
              </p>

              {/* Rule of thumb pill */}
              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/25 mb-4">
                <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-indigo-300 mb-1">
                  <Bookmark className="w-3 h-3 text-indigo-400" />
                  <span>Rule of Thumb:</span>
                </div>
                <p className="text-xs text-indigo-100 font-medium italic">
                  &ldquo;{item.ruleOfThumb}&rdquo;
                </p>
              </div>
            </div>

            {/* Avoid vs Try pills */}
            <div className="space-y-2 pt-2 border-t border-white/5 text-[11px]">
              {item.avoidPhrases && item.avoidPhrases.length > 0 && (
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold mb-1">
                    Avoid:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.avoidPhrases.map((phrase, pIdx) => (
                      <span
                        key={pIdx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-300 border border-rose-500/20 line-through"
                      >
                        <X className="w-2.5 h-2.5" />
                        <span>{phrase}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.tryPhrases && item.tryPhrases.length > 0 && (
                <div className="mt-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold mb-1">
                    Use instead:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.tryPhrases.map((phrase, pIdx) => (
                      <span
                        key={pIdx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 font-medium"
                      >
                        <Check className="w-2.5 h-2.5" />
                        <span>{phrase}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
