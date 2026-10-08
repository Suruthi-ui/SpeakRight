"use client";

import React, { useState } from "react";
import { X, Send, Sparkles, Check, MessageCircle, ArrowRight } from "lucide-react";
import { CommunicationAnalysis } from "@/types/communication";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  analysis: CommunicationAnalysis;
}

export function WhatsAppSimulatorModal({ isOpen, onClose, analysis }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<"improved" | "alt0" | "alt1" | "alt2">("improved");
  const [hasSent, setHasSent] = useState(false);

  if (!isOpen) return null;

  const currentMessageText =
    selectedVariant === "improved"
      ? analysis.primaryImprovement.improvedMessage
      : selectedVariant === "alt0"
      ? analysis.alternativeRewrites[0]?.message || analysis.primaryImprovement.improvedMessage
      : selectedVariant === "alt1"
      ? analysis.alternativeRewrites[1]?.message || analysis.primaryImprovement.improvedMessage
      : analysis.alternativeRewrites[2]?.message || analysis.primaryImprovement.improvedMessage;

  const handleSend = () => {
    setHasSent(true);
    setTimeout(() => {
      setHasSent(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-elevated w-full max-w-xl rounded-[32px] p-6 sm:p-8 relative border border-white/15 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">WhatsApp Pre-Send Simulator</h3>
            <p className="text-xs text-slate-400">Future-ready Meta Cloud API integration</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          Experience how SpeakRight intercepts your message in WhatsApp before it leaves your device, preventing regrettable or awkward phrasing.
        </p>

        {/* WhatsApp Mobile Chat Shell */}
        <div className="rounded-[28px] bg-[#111b21] p-3 border-2 border-slate-700 shadow-xl overflow-hidden mb-5">
          {/* WhatsApp Header */}
          <div className="bg-[#202c33] px-3.5 py-2.5 rounded-2xl flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs">
                {analysis.recipient.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">{analysis.recipient}</h4>
                <p className="text-[10px] text-emerald-400">Online</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Shield Active</span>
            </span>
          </div>

          {/* Chat Messages */}
          <div className="space-y-3 px-1 py-2 min-h-[160px]">
            {/* The Raw Draft intercepted notification */}
            <div className="bg-amber-950/40 border border-amber-500/20 rounded-xl p-2.5 text-[11px] text-amber-200">
              <span className="font-semibold block mb-0.5 text-amber-300">
                ⚠️ Raw draft intercepted before sending:
              </span>
              <span className="italic line-through opacity-75">&ldquo;{analysis.originalMessage}&rdquo;</span>
            </div>

            {/* AI Selected Rewrite */}
            <div className="flex justify-end">
              <div className="bg-[#005c4b] text-white text-xs p-3.5 rounded-2xl rounded-tr-none max-w-[90%] shadow-md">
                <p className="leading-relaxed">{currentMessageText}</p>
                <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-emerald-200">
                  <span>10:15 AM</span>
                  <Check className="w-3 h-3 text-emerald-300" />
                </div>
              </div>
            </div>

            {hasSent && (
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center text-xs text-emerald-300">
                ✨ Successfully delivered with 100% executive composure!
              </div>
            )}
          </div>

          {/* Variant Selector Tabs */}
          <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px]">
            <button
              type="button"
              onClick={() => setSelectedVariant("improved")}
              className={`px-2.5 py-1 rounded-lg shrink-0 transition-all cursor-pointer ${
                selectedVariant === "improved"
                  ? "bg-indigo-600 text-white font-bold"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              Master Rewrite
            </button>
            {analysis.alternativeRewrites.map((alt, i) => {
              const key = `alt${i}` as "alt0" | "alt1" | "alt2";
              return (
                <button
                  key={alt.id}
                  type="button"
                  onClick={() => setSelectedVariant(key)}
                  className={`px-2.5 py-1 rounded-lg shrink-0 transition-all cursor-pointer ${
                    selectedVariant === key
                      ? "bg-indigo-600 text-white font-bold"
                      : "bg-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  {alt.title}
                </button>
              );
            })}
          </div>

          {/* Simulated Send bar */}
          <div className="mt-2 bg-[#202c33] p-1.5 rounded-2xl flex items-center justify-between">
            <span className="text-[11px] text-slate-400 px-2 truncate">
              {currentMessageText.substring(0, 40)}...
            </span>
            <button
              type="button"
              onClick={handleSend}
              className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center text-slate-950 transition-all cursor-pointer shadow-md"
              title="Simulate Send"
            >
              <Send className="w-3.5 h-3.5 fill-slate-950" />
            </button>
          </div>
        </div>

        {/* Footer info on API */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Endpoint: /api/whatsapp/rewrite</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1"
          >
            <span>Back to Dashboard</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
