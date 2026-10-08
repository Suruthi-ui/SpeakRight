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
    <div className="glass-panel-elevated rounded-[28px] p-6 sm:p-7 border border-white/15 relative overflow-hidden flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-white">Linguistic &amp; Psychological Analysis</h3>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
            Harvard Business Etiquette
          </span>
        </div>

        {/* Psychological Impact */}
        <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 mb-5 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
            <Compass className="w-4 h-4 text-indigo-400" />
            <span>Subconscious Psychological Perception:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {aiExplanation?.psychologicalImpact ||
              "The original draft signals hesitation and defensive posturing, which inadvertently weakens your executive presence and increases perceived burden on the recipient."}
          </p>
        </div>

        {/* Framing Strategy */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 mb-5 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <span>Reframing Strategy Applied:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {aiExplanation?.framingStrategy ||
              "Shifted from an apologetic defense into proactive accountability. Replaced vague complaints with crisp milestones and constructive proposals."}
          </p>
        </div>

        {/* Identified issues list */}
        {aiExplanation?.keyIssuesIdentified && aiExplanation.keyIssuesIdentified.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Key Linguistic Vulnerabilities Fixed:
            </span>
            <div className="space-y-2">
              {aiExplanation.keyIssuesIdentified.map((issue, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300"
                >
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
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
