"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Brain, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface LoadingAnalysisProps {
  recipient: string;
  situation: string;
}

const STAGES = [
  "Scanning message semantics & tone indicators...",
  "Evaluating interpersonal hierarchy & etiquette...",
  "Generating executive, diplomatic & collaborative rewrites...",
  "Synthesizing communication score & psychological coaching tips...",
];

export function LoadingAnalysis({ recipient, situation }: LoadingAnalysisProps) {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIdx((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 1100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-600 to-violet-600 p-0.5 shadow-xl shadow-indigo-500/30 flex items-center justify-center text-white">
          <Brain className="w-9 h-9 text-white animate-pulse" />
        </div>
        <div className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-emerald-500 text-white shadow-md shadow-emerald-500/30">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
        </div>
      </div>

      <motion.div
        key={currentStageIdx}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-md mx-auto space-y-2.5"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 text-indigo-700 text-xs font-bold shadow-xs">
          <span>AI Coach at Work</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Calibrating for {recipient}
        </h3>
        <p className="text-xs text-indigo-600 font-mono font-semibold">
          Context: {situation}
        </p>

        <p className="text-sm text-slate-700 font-semibold h-5">
          {STAGES[currentStageIdx]}
        </p>
      </motion.div>

      {/* Progress tracker steps */}
      <div className="mt-7 flex items-center justify-center gap-1.5 max-w-xs w-full">
        {STAGES.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-400 flex-1 ${
              i <= currentStageIdx
                ? "bg-gradient-to-r from-indigo-600 to-violet-600 shadow-xs"
                : "bg-slate-200"
            }`}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>SpeakRight Native Communication Engine</span>
      </div>
    </div>
  );
}
