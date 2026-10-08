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
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm relative overflow-hidden">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Actionable Coaching Tips</h3>
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          Permanent Habits
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tips.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {item.tip}
              </p>

              {/* Rule of thumb */}
              <div className="p-3 rounded-xl bg-white border border-slate-200 mb-3 shadow-xs">
                <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-500 mb-0.5">
                  <Bookmark className="w-3 h-3 text-slate-700" />
                  <span>Rule of Thumb:</span>
                </div>
                <p className="text-xs text-slate-900 font-medium italic">
                  &ldquo;{item.ruleOfThumb}&rdquo;
                </p>
              </div>
            </div>

            {/* Avoid vs Try */}
            <div className="space-y-2 pt-2 border-t border-slate-200 text-[11px]">
              {item.avoidPhrases && item.avoidPhrases.length > 0 && (
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold mb-1">
                    Avoid:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.avoidPhrases.map((phrase, pIdx) => (
                      <span
                        key={pIdx}
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 line-through text-[11px]"
                      >
                        <X className="w-2.5 h-2.5" />
                        <span>{phrase}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.tryPhrases && item.tryPhrases.length > 0 && (
                <div className="mt-1.5">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold mb-1">
                    Use instead:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.tryPhrases.map((phrase, pIdx) => (
                      <span
                        key={pIdx}
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium text-[11px]"
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
