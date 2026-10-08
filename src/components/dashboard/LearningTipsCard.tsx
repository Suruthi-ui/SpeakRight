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
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xl shadow-indigo-500/5 relative overflow-hidden">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/25">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Actionable Coaching Tips</h3>
            <p className="text-[11px] text-slate-500">Long-term communication leverage</p>
          </div>
        </div>
        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
          Communication Habits
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tips.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-amber-50/20 border border-slate-200 hover:border-amber-300 transition-all flex flex-col justify-between space-y-3 shadow-xs"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-extrabold text-xs flex items-center justify-center shadow-2xs">
                  {idx + 1}
                </span>
                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-3 font-normal">
                {item.tip}
              </p>

              {/* Rule of thumb */}
              <div className="p-3.5 rounded-xl bg-white border border-amber-200/80 mb-3 shadow-2xs">
                <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-amber-700 mb-1">
                  <Bookmark className="w-3.5 h-3.5 text-amber-600" />
                  <span>Rule of Thumb:</span>
                </div>
                <p className="text-xs text-slate-900 font-semibold italic">
                  &ldquo;{item.ruleOfThumb}&rdquo;
                </p>
              </div>
            </div>

            {/* Avoid vs Try */}
            <div className="space-y-2.5 pt-2 border-t border-slate-200/80 text-[11px]">
              {item.avoidPhrases && item.avoidPhrases.length > 0 && (
                <div>
                  <span className="text-rose-700 block text-[10px] uppercase font-bold mb-1.5 flex items-center gap-1">
                    <X className="w-3 h-3" />
                    <span>Avoid:</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.avoidPhrases.map((phrase, pIdx) => (
                      <span
                        key={pIdx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200 line-through text-[11px] font-medium shadow-2xs"
                      >
                        <span>{phrase}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.tryPhrases && item.tryPhrases.length > 0 && (
                <div className="mt-2">
                  <span className="text-emerald-700 block text-[10px] uppercase font-bold mb-1.5 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Use instead:</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tryPhrases.map((phrase, pIdx) => (
                      <span
                        key={pIdx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[11px] shadow-2xs"
                      >
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
