"use client";

import React from "react";
import { CommunicationAnalysis } from "@/types/communication";
import { Award, Zap, Clock, FileText, CheckCircle2 } from "lucide-react";

interface Props {
  analysis: CommunicationAnalysis;
}

export function CommunicationScoreCard({ analysis }: Props) {
  const { overallScore, scoreBreakdown, detectedSentiment, readingStats } = analysis;

  const isExcellent = overallScore >= 85;
  const isModerate = overallScore >= 70 && overallScore < 85;

  let ratingLabel = "Executive Presence";
  let ratingBadge = "bg-emerald-50 text-emerald-800 border-emerald-200";

  if (overallScore < 70) {
    ratingLabel = "Needs Polish";
    ratingBadge = "bg-amber-50 text-amber-800 border-amber-200";
  } else if (isModerate) {
    ratingLabel = "Strong & Respectful";
    ratingBadge = "bg-indigo-50 text-indigo-800 border-indigo-200";
  }

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  const breakdownMetrics = [
    {
      label: "Clarity",
      score: scoreBreakdown?.clarity || 80,
      gradient: "from-sky-500 to-blue-600",
      textColor: "text-sky-700",
    },
    {
      label: "Confidence",
      score: scoreBreakdown?.confidence || 75,
      gradient: "from-indigo-500 to-violet-600",
      textColor: "text-indigo-700",
    },
    {
      label: "Politeness",
      score: scoreBreakdown?.politeness || 85,
      gradient: "from-emerald-500 to-teal-600",
      textColor: "text-emerald-700",
    },
    {
      label: "Conciseness",
      score: scoreBreakdown?.conciseness || 70,
      gradient: "from-amber-400 to-orange-500",
      textColor: "text-amber-700",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xl shadow-indigo-500/5 flex flex-col justify-between relative overflow-hidden">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/25">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Communication Score</h3>
              <p className="text-[11px] text-slate-500">Holistic executive presence</p>
            </div>
          </div>
          <span className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-2xs ${ratingBadge}`}>
            {ratingLabel}
          </span>
        </div>

        {/* Circular Gauge Center Display */}
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 mb-6">
          <div className="relative w-34 h-34 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 130 130">
              <defs>
                <linearGradient id="scoreGaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  {isExcellent ? (
                    <>
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#10b981" />
                    </>
                  ) : isModerate ? (
                    <>
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </>
                  ) : (
                    <>
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </>
                  )}
                </linearGradient>
              </defs>
              <circle
                cx="65"
                cy="65"
                r={radius}
                className="stroke-slate-100"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="65"
                cy="65"
                r={radius}
                stroke="url(#scoreGaugeGradient)"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-black tracking-tight bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 bg-clip-text text-transparent">
                {overallScore}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                out of 100
              </span>
            </div>
          </div>

          {/* Core breakdown progress bars */}
          <div className="flex-1 w-full space-y-3">
            {breakdownMetrics.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-bold">{item.label}</span>
                  <span className={`font-extrabold ${item.textColor}`}>{item.score}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full bg-gradient-to-r ${item.gradient} rounded-full transition-all duration-800 shadow-xs`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detected Sentiment */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/60 via-white to-orange-50/40 border border-amber-200 mb-5 flex items-start gap-3 shadow-xs">
          <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700 shrink-0 mt-0.5">
            <Zap className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-slate-500 font-medium">Detected Sentiment:</span>
              <span className="font-bold text-amber-900 bg-amber-100/80 border border-amber-200 px-2 py-0.5 rounded-md text-[11px]">
                {detectedSentiment || "Hesitant & Apologetic"}
              </span>
            </div>
            <p className="text-slate-700 leading-relaxed font-normal">
              {analysis.executiveSummary}
            </p>
          </div>
        </div>
      </div>

      {/* Reading Statistics Footer */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2.5 text-center text-xs">
        <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/90 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-medium flex items-center justify-center gap-1">
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span>Words</span>
          </div>
          <span className="text-sm font-bold text-slate-900 mt-0.5 block">
            {readingStats?.originalWords} → {readingStats?.improvedWords}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-medium flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Time Saved</span>
          </div>
          <span className="text-sm font-extrabold text-emerald-700 mt-0.5 block">
            ~{readingStats?.timeReductionSeconds || 6}s
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-violet-50/60 border border-violet-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-medium flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-violet-600" />
            <span>Formality</span>
          </div>
          <span className="text-[11px] font-bold text-violet-800 mt-0.5 block truncate">
            {readingStats?.formalityGrade || "Executive"}
          </span>
        </div>
      </div>
    </div>
  );
}
