"use client";

import React from "react";
import { CommunicationAnalysis } from "@/types/communication";
import { Brain, AlertCircle, Compass, ShieldAlert } from "lucide-react";

interface Props {
  analysis: CommunicationAnalysis;
}

export function AiExplanationCard({ analysis }: Props) {
  const { aiExplanation } = analysis;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Linguistic &amp; Psychological Analysis</h3>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            Etiquette Principles
          </span>
        </div>

        {/* Psychological Impact */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-4 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
            <Compass className="w-4 h-4 text-slate-700" />
            <span>Subconscious Psychological Perception:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {aiExplanation?.psychologicalImpact ||
              "The original draft signals hesitation and defensive posturing, which inadvertently weakens your executive presence and increases perceived burden on the recipient."}
          </p>
        </div>

        {/* Framing Strategy */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 mb-4 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900">
            <ShieldAlert className="w-4 h-4 text-emerald-700" />
            <span>Reframing Strategy Applied:</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
            {aiExplanation?.framingStrategy ||
              "Shifted from an apologetic defense into proactive accountability. Replaced vague complaints with crisp milestones and constructive proposals."}
          </p>
        </div>

        {/* Identified issues list */}
        {aiExplanation?.keyIssuesIdentified && aiExplanation.keyIssuesIdentified.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1.5">
              Key Vulnerabilities Corrected:
            </span>
            <div className="space-y-1.5">
              {aiExplanation.keyIssuesIdentified.map((issue, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700"
                >
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
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
