"use client";

import React from "react";
import { CommunicationAnalysis } from "@/types/communication";
import { Award, Zap, Clock, FileText, CheckCircle2 } from "lucide-react";

interface Props {
  analysis: CommunicationAnalysis;
}

export function CommunicationScoreCard({ analysis }: Props) {
  const { overallScore, scoreBreakdown, detectedSentiment, readingStats } = analysis;

  let scoreColor = "text-emerald-700";
  let strokeColor = "#059669"; // emerald-600
  let ratingLabel = "Executive Presence";

  if (overallScore < 70) {
    scoreColor = "text-amber-700";
    strokeColor = "#d97706";
    ratingLabel = "Needs Recalibration";
  } else if (overallScore < 85) {
    scoreColor = "text-slate-900";
    strokeColor = "#0f172a";
    ratingLabel = "Strong & Respectful";
  }

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  const breakdownMetrics = [
    { label: "Clarity", score: scoreBreakdown?.clarity || 80, color: "bg-slate-900" },
    { label: "Confidence", score: scoreBreakdown?.confidence || 75, color: "bg-slate-800" },
    { label: "Politeness", score: scoreBreakdown?.politeness || 85, color: "bg-emerald-600" },
    { label: "Conciseness", score: scoreBreakdown?.conciseness || 70, color: "bg-slate-700" },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Communication Score</h3>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {ratingLabel}
          </span>
        </div>

        {/* Circular Gauge Center Display */}
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 mb-6">
          <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 130 130">
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
                stroke={strokeColor}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-3xl font-extrabold tracking-tight ${scoreColor}`}>
                {overallScore}
              </span>
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                out of 100
              </span>
            </div>
          </div>

          {/* Core breakdown progress bars */}
          <div className="flex-1 w-full space-y-2.5">
            {breakdownMetrics.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600 font-medium">{item.label}</span>
                  <span className="text-slate-900 font-semibold">{item.score}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-800`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detected Sentiment */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 mb-5 flex items-start gap-2.5">
          <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-slate-500">Detected Sentiment:</span>
              <span className="font-semibold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded text-[11px]">
                {detectedSentiment || "Hesitant & Apologetic"}
              </span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              {analysis.executiveSummary}
            </p>
          </div>
        </div>
      </div>

      {/* Reading Statistics Footer */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-slate-500 text-[10px] flex items-center justify-center gap-1">
            <FileText className="w-3 h-3 text-slate-700" />
            <span>Words</span>
          </div>
          <span className="text-sm font-bold text-slate-900 mt-0.5 block">
            {readingStats?.originalWords} → {readingStats?.improvedWords}
          </span>
        </div>

        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-slate-500 text-[10px] flex items-center justify-center gap-1">
            <Clock className="w-3 h-3 text-emerald-600" />
            <span>Time Saved</span>
          </div>
          <span className="text-sm font-bold text-emerald-700 mt-0.5 block">
            ~{readingStats?.timeReductionSeconds || 6}s
          </span>
        </div>

        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-slate-500 text-[10px] flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-slate-700" />
            <span>Formality</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-800 mt-0.5 block truncate">
            {readingStats?.formalityGrade || "Executive"}
          </span>
        </div>
      </div>
    </div>
  );
}
