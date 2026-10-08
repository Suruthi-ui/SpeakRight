"use client";

import React from "react";
import { CommunicationAnalysis } from "@/types/communication";
import { Brain, AlertCircle, Compass, Sparkles } from "lucide-react";

interface Props {
  analysis: CommunicationAnalysis;
}

export function AiExplanationCard({ analysis }: Props) {
  const { aiExplanation } = analysis;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xl shadow-indigo-500/5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-violet-500/25">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Psycholinguistic Analysis</h3>
              <p className="text-[11px] text-slate-500">Subconscious perception &amp; framing</p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200 shadow-2xs">
            Psychology
          </span>
        </div>

        {/* Psychological Impact */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/50 via-white to-slate-50 border border-indigo-100 mb-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-950">
            <Compass className="w-4 h-4 text-indigo-600" />
            <span>Subconscious Psychological Perception:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            {aiExplanation?.psychologicalImpact ||
              "The original draft signals hesitation and defensive posturing, which inadvertently weakens your executive presence and increases perceived burden on the recipient."}
          </p>
        </div>

        {/* Framing Strategy */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/40 border border-emerald-200 mb-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Reframing Strategy Applied:</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
            {aiExplanation?.framingStrategy ||
              "Shifted from an apologetic defense into proactive accountability. Replaced vague complaints with crisp milestones and constructive proposals."}
          </p>
        </div>

        {/* Identified issues list */}
        {aiExplanation?.keyIssuesIdentified && aiExplanation.keyIssuesIdentified.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
              Key Vulnerabilities Corrected:
            </span>
            <div className="space-y-1.5">
              {aiExplanation.keyIssuesIdentified.map((issue, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-200 text-xs text-slate-700 font-medium shadow-2xs"
                >
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{issue}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
