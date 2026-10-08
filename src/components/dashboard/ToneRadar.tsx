"use client";

import React from "react";
import { ToneMetric } from "@/types/communication";
import { Sliders, CheckCircle, AlertTriangle } from "lucide-react";

interface Props {
  tones: ToneMetric[];
}

export function ToneRadar({ tones }: Props) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Tone Analysis</h3>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            5 Dimensions
          </span>
        </div>

        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          How your message lands emotionally and hierarchically.
        </p>

        <div className="space-y-3.5">
          {tones.map((tone) => {
            const isHigh = tone.score >= 80;
            const progressColor = isHigh ? "bg-emerald-600" : "bg-slate-800";

            return (
              <div key={tone.name} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-900">{tone.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({tone.score}%)</span>
                  </div>

                  <div>
                    {isHigh ? (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>{tone.label}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        <span>{tone.label}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${progressColor} rounded-full transition-all duration-800`}
                    style={{ width: `${tone.score}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-600 leading-normal">
                  {tone.comment}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
