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
    <div className="min-h-[55vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-slate-900 p-0.5 shadow-md flex items-center justify-center text-white">
          <Brain className="w-8 h-8 text-white animate-pulse" />
        </div>
        <div className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-emerald-600 text-white shadow-sm">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
        </div>
      </div>

      <motion.div
        key={currentStageIdx}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-md mx-auto space-y-2"
      >
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
          <span>AI Coach at Work</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Calibrating for {recipient}
        </h3>
        <p className="text-xs text-slate-500 font-mono">
          Context: {situation}
        </p>

        <p className="text-sm text-slate-700 font-medium h-5">
          {STAGES[currentStageIdx]}
        </p>
      </motion.div>

      {/* Progress tracker steps */}
      <div className="mt-6 flex items-center justify-center gap-1.5 max-w-xs w-full">
        {STAGES.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-400 flex-1 ${
              i <= currentStageIdx ? "bg-slate-900" : "bg-slate-200"
            }`}
          />
        ))}
      </div>

      <div className="mt-5 flex items-center gap-1.5 text-xs text-slate-500">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>SpeakRight AI Communication Engine</span>
      </div>
    </div>
  );
}
