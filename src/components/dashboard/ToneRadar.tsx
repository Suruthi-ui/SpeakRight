"use client";

import React from "react";
import { ToneMetric } from "@/types/communication";
import { Sliders, CheckCircle, AlertTriangle } from "lucide-react";

interface Props {
  tones: ToneMetric[];
}

export function ToneRadar({ tones }: Props) {
  // Map dimension names to vibrant unique gradients
  const getGradientForTone = (name: string, isHigh: boolean) => {
    const n = name.toLowerCase();
    if (n.includes("assert")) return "from-indigo-500 to-violet-600";
    if (n.includes("warm")) return "from-amber-400 to-orange-500";
    if (n.includes("form")) return "from-purple-500 to-indigo-600";
    if (n.includes("polit")) return "from-emerald-400 to-teal-600";
    if (n.includes("concis")) return "from-sky-400 to-blue-600";
    return isHigh ? "from-emerald-500 to-teal-600" : "from-amber-500 to-orange-500";
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xl shadow-indigo-500/5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-violet-500/25">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Tone Calibration</h3>
              <p className="text-[11px] text-slate-500">5-dimensional psycholinguistic breakdown</p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200 shadow-2xs">
            5 Dimensions
          </span>
        </div>

        <div className="space-y-3.5">
          {tones.map((tone) => {
            const isHigh = tone.score >= 80;
            const gradient = getGradientForTone(tone.name, isHigh);

            return (
              <div
                key={tone.name}
                className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 transition-all space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900">{tone.name}</span>
                    <span className="text-[11px] font-extrabold text-slate-500 font-mono">
                      ({tone.score}%)
                    </span>
                  </div>

                  <div>
                    {isHigh ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-200 px-2 py-0.5 rounded-md shadow-2xs">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>{tone.label}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100/80 border border-amber-200 px-2 py-0.5 rounded-md shadow-2xs">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        <span>{tone.label}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="h-2 w-full bg-slate-200/80 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-800 shadow-xs`}
                    style={{ width: `${tone.score}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-600 leading-normal font-normal">
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
