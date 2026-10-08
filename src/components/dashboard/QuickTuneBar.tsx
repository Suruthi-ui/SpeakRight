"use client";

import React, { useState } from "react";
import { RecipientType, ToneType } from "@/types/communication";
import { RECIPIENT_OPTIONS, SITUATION_OPTIONS, TONE_OPTIONS } from "@/lib/sampleData";
import { SlidersHorizontal, Sparkles, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  initialMessage: string;
  initialRecipient: RecipientType | string;
  initialSituation: string;
  initialTone?: string;
  onReAnalyze: (params: {
    message: string;
    recipient: string;
    situation: string;
    desiredTone: string;
  }) => void;
  isLoading: boolean;
}

export function QuickTuneBar({
  initialMessage,
  initialRecipient,
  initialSituation,
  initialTone,
  onReAnalyze,
  isLoading,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(initialMessage);
  const [recipient, setRecipient] = useState(initialRecipient);
  const [situation, setSituation] = useState(initialSituation);
  const [tone, setTone] = useState(initialTone || "Professional & Polished");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || message.trim().length < 5) return;
    onReAnalyze({
      message: message.trim(),
      recipient,
      situation,
      desiredTone: tone,
    });
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all">
      <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">Current Context</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200">
                {recipient} • {situation}
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate max-w-md hidden sm:block">
              &ldquo;{message.length > 70 ? message.substring(0, 67) + "..." : message}&rdquo;
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{isOpen ? "Close Editor" : "Edit & Re-Analyze"}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                Recipient
              </label>
              <select
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="minimal-input w-full px-3 py-2 rounded-xl text-xs bg-white focus:outline-none"
              >
                {RECIPIENT_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                Situation
              </label>
              <select
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                className="minimal-input w-full px-3 py-2 rounded-xl text-xs bg-white focus:outline-none"
              >
                {SITUATION_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                Desired Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as ToneType)}
                className="minimal-input w-full px-3 py-2 rounded-xl text-xs bg-white focus:outline-none"
              >
                {TONE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
              Draft Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="minimal-input w-full p-3 rounded-xl text-xs text-slate-900 focus:outline-none leading-relaxed bg-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3.5 py-1.5 rounded-xl text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="minimal-button-primary px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isLoading ? "Analyzing..." : "Re-Run Gemini Analysis"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
