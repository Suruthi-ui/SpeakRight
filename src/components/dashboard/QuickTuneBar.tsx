"use client";

import React, { useState } from "react";
import { RecipientType, ToneType } from "@/types/communication";
import { RECIPIENT_OPTIONS, SITUATION_OPTIONS, TONE_OPTIONS } from "@/lib/sampleData";
import { SlidersHorizontal, ChevronDown, ChevronUp, RotateCw } from "lucide-react";

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
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-indigo-500/5 overflow-hidden transition-all">
      <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/25">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">Current Context</span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs">
                {recipient} • {situation}
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate max-w-md hidden sm:block font-normal">
              &ldquo;{message.length > 70 ? message.substring(0, 67) + "..." : message}&rdquo;
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 text-xs font-bold text-slate-800 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          >
            <span>{isOpen ? "Close Editor" : "Edit & Re-Analyze"}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} className="p-5 border-t border-slate-100 bg-slate-50/60 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Recipient
              </label>
              <select
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="minimal-input w-full px-3 py-2 rounded-xl text-xs bg-white focus:outline-none font-medium"
              >
                {RECIPIENT_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Situation
              </label>
              <select
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                className="minimal-input w-full px-3 py-2 rounded-xl text-xs bg-white focus:outline-none font-medium"
              >
                {SITUATION_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Desired Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as ToneType)}
                className="minimal-input w-full px-3 py-2 rounded-xl text-xs bg-white focus:outline-none font-medium"
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
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Draft Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="minimal-input w-full p-3 rounded-xl text-xs text-slate-900 focus:outline-none leading-relaxed bg-white font-medium"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="minimal-button-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span>{isLoading ? "Analyzing..." : "Re-Run AI Analysis"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
