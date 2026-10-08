"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Brain, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface LoadingAnalysisProps {
  recipient: string;
  situation: string;
}

const STAGES = [
  "Analyzing message semantics & tone indicators...",
  "Evaluating interpersonal hierarchy & recipient etiquette...",
  "Generating executive, diplomatic & collaborative rewrites...",
  "Synthesizing communication score & psychological coaching tips...",
];

export function LoadingAnalysis({ recipient, situation }: LoadingAnalysisProps) {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIdx((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-8">
        {/* Glowing concentric pulse rings */}
        <div className="w-28 h-28 rounded-full bg-indigo-600/20 animate-ping absolute -inset-0 blur-xl pointer-events-none" />
        <div className="w-28 h-28 rounded-full bg-purple-600/20 animate-pulse absolute -inset-2 blur-lg pointer-events-none" />

        <div className="w-24 h-24 rounded-[30px] bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 p-0.5 shadow-2xl shadow-indigo-500/40 relative z-10 flex items-center justify-center">
          <div className="w-full h-full bg-[#090b10] rounded-[28px] flex items-center justify-center">
            <Brain className="w-10 h-10 text-indigo-400 animate-pulse" />
          </div>
        </div>

        <div className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-indigo-600 text-white shadow-lg">
          <Sparkles className="w-4 h-4 animate-spin text-white" />
        </div>
      </div>

      <motion.div
        key={currentStageIdx}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-md mx-auto space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <span>AI Coach at Work</span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Calibrating for {recipient}
        </h3>
        <p className="text-xs text-slate-400 font-mono">
          Context: {situation}
        </p>

        <p className="text-sm text-indigo-200/90 font-medium h-6">
          {STAGES[currentStageIdx]}
        </p>
      </motion.div>

      {/* Progress tracker steps */}
      <div className="mt-8 flex items-center justify-center gap-2 max-w-xs w-full">
        {STAGES.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 flex-1 ${
              i <= currentStageIdx ? "bg-indigo-500 shadow-sm shadow-indigo-500/50" : "bg-white/10"
            }`}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        <span>Powered by Google Gemini 1.5 Flash</span>
      </div>
    </div>
  );
}
