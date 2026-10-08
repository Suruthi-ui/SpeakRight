"use client";

import React from "react";
import { ToneMetric } from "@/types/communication";
import { Sliders, CheckCircle, AlertTriangle } from "lucide-react";

interface Props {
  tones: ToneMetric[];
}

export function ToneRadar({ tones }: Props) {
  return (
    <div className="glass-panel-elevated rounded-[28px] p-6 sm:p-7 border border-white/15 relative overflow-hidden flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-white">Tone Analysis &amp; Perception</h3>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            5 Calibrated Dimensions
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-6 leading-relaxed">
          How the human brain perceives your subtext. We calibrate each dimension to maintain respect without sacrificing personal confidence.
        </p>

        <div className="space-y-4">
          {tones.map((tone) => {
            const isHigh = tone.score >= 80;
            const isMedium = tone.score >= 60 && tone.score < 80;

            const progressColor = isHigh
              ? "bg-gradient-to-r from-emerald-500 to-teal-400"
              : isMedium
              ? "bg-gradient-to-r from-indigo-500 to-purple-400"
              : "bg-gradient-to-r from-amber-500 to-rose-400";

            return (
              <div key={tone.name} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white">{tone.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({tone.score}%)</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isHigh ? (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        <CheckCircle className="w-3 h-3" />
                        <span>{tone.label}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                        <AlertTriangle className="w-3 h-3" />
                        <span>{tone.label}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full ${progressColor} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${tone.score}%` }}
                  />
                </div>

                {/* Coach Comment */}
                <p className="text-[11px] text-slate-300 leading-normal pt-0.5">
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
