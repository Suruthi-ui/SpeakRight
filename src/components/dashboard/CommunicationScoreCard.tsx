"use client";

import React from "react";
import { CommunicationAnalysis } from "@/types/communication";
import { Award, Zap, Clock, FileText, CheckCircle2 } from "lucide-react";

interface Props {
  analysis: CommunicationAnalysis;
}

export function CommunicationScoreCard({ analysis }: Props) {
  const { overallScore, scoreBreakdown, detectedSentiment, readingStats } = analysis;

  // Determine score color & verdict
  let scoreColor = "text-emerald-400";
  let strokeColor = "#10b981";
  let ratingLabel = "Executive Presence";

  if (overallScore < 70) {
    scoreColor = "text-amber-400";
    strokeColor = "#f59e0b";
    ratingLabel = "Needs Recalibration";
  } else if (overallScore < 85) {
    scoreColor = "text-indigo-400";
    strokeColor = "#6366f1";
    ratingLabel = "Strong & Respectful";
  }

  // Circular gauge calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  const breakdownMetrics = [
    { label: "Clarity", score: scoreBreakdown?.clarity || 80, color: "bg-blue-500" },
    { label: "Confidence", score: scoreBreakdown?.confidence || 75, color: "bg-indigo-500" },
    { label: "Politeness", score: scoreBreakdown?.politeness || 85, color: "bg-emerald-500" },
    { label: "Conciseness", score: scoreBreakdown?.conciseness || 70, color: "bg-purple-500" },
  ];

  return (
    <div className="glass-panel-elevated rounded-[28px] p-6 sm:p-7 border border-white/15 relative overflow-hidden flex flex-col justify-between">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 blur-3xl pointer-events-none rounded-full" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-white">Communication Score</h3>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
            {ratingLabel}
          </span>
        </div>

        {/* Circular Gauge Center Display */}
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 mb-8">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 130 130">
              <circle
                cx="65"
                cy="65"
                r={radius}
                className="stroke-white/10"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="65"
                cy="65"
                r={radius}
                stroke={strokeColor}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{ transition: "stroke-dashoffset 1.2s ease-in-out" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-4xl font-extrabold tracking-tight ${scoreColor}`}>
                {overallScore}
              </span>
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                out of 100
              </span>
            </div>
          </div>

          {/* Core breakdown progress bars */}
          <div className="flex-1 w-full space-y-3">
            {breakdownMetrics.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">{item.label}</span>
                  <span className="text-slate-200 font-semibold">{item.score}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detected Sentiment & Coach Verdict */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 mb-6 flex items-start gap-3">
          <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-slate-400">Detected Sentiment:</span>
              <span className="font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                {detectedSentiment || "Hesitant & Apologetic"}
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {analysis.executiveSummary}
            </p>
          </div>
        </div>
      </div>

      {/* Reading Statistics Footer */}
      <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 rounded-xl bg-black/20 border border-white/5">
          <div className="text-slate-400 text-[10px] flex items-center justify-center gap-1">
            <FileText className="w-3 h-3 text-indigo-400" />
            <span>Words</span>
          </div>
          <span className="text-sm font-bold text-white mt-0.5 block">
            {readingStats?.originalWords} → {readingStats?.improvedWords}
          </span>
        </div>

        <div className="p-2 rounded-xl bg-black/20 border border-white/5">
          <div className="text-slate-400 text-[10px] flex items-center justify-center gap-1">
            <Clock className="w-3 h-3 text-emerald-400" />
            <span>Time Saved</span>
          </div>
          <span className="text-sm font-bold text-emerald-400 mt-0.5 block">
            ~{readingStats?.timeReductionSeconds || 6}s
          </span>
        </div>

        <div className="p-2 rounded-xl bg-black/20 border border-white/5">
          <div className="text-slate-400 text-[10px] flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-purple-400" />
            <span>Formality</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-200 mt-0.5 block truncate">
            {readingStats?.formalityGrade || "Executive"}
          </span>
        </div>
      </div>
    </div>
  );
}
