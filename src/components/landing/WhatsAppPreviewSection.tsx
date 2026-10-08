"use client";

import React, { useState } from "react";
import { MessageCircle, Check, Send, Sparkles, RefreshCw } from "lucide-react";

export function WhatsAppPreviewSection() {
  const [selectedRewrite, setSelectedRewrite] = useState(0);

  const mockOptions = [
    {
      title: "Direct & Clear",
      text: "Hi Priya, quick update: the Q3 budget summary is finalized. Could you review before our 2 PM sync so we can align with stakeholders?",
    },
    {
      title: "Diplomatic & Warm",
      text: "Hi Priya, hope you're having a productive week! The Q3 budget numbers are ready for your review whenever you have a moment before 2 PM.",
    },
    {
      title: "Concise",
      text: "Priya—Q3 budget ready for review. Action needed before 2 PM sync.",
    },
  ];

  return (
    <section id="whatsapp" className="py-20 bg-[#fafafa] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3 border border-slate-200">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Future-Ready Integration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            WhatsApp Pre-Send AI Rewrite
          </h2>
          <p className="text-sm text-slate-600">
            Never send an emotional, impulsive, or poorly phrased message again. SpeakRight integrates via Meta WhatsApp Cloud API webhooks to calibrate your messages before hitting send.
          </p>
        </div>

        {/* WhatsApp Demo Card */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-4 text-slate-600 text-sm">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-slate-800" />
                <span>Pre-Send Interception Architecture</span>
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Integrated at <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono">/api/whatsapp/rewrite</code> and ready for Meta Cloud API webhooks.
              </p>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 border border-slate-200">
                    1
                  </div>
                  <span>Draft your raw message in WhatsApp.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 border border-slate-200">
                    2
                  </div>
                  <span>Gemini checks recipient context &amp; tone.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 border border-slate-200">
                    3
                  </div>
                  <span>Pick one-tap polished message before the recipient reads.</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full Meta Webhook API endpoints pre-configured in project code.</span>
            </div>
          </div>

          {/* Right Column: WhatsApp Phone Mockup */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-sm rounded-[32px] bg-[#111b21] p-3 border-4 border-slate-300 shadow-lg relative overflow-hidden">
              <div className="w-28 h-3.5 bg-slate-800 mx-auto rounded-full mb-3" />

              {/* Chat Header */}
              <div className="bg-[#202c33] px-3.5 py-2.5 rounded-xl flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-xs">
                    PD
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Prof. Davis</h4>
                    <p className="text-[10px] text-emerald-400">online</p>
                  </div>
                </div>
                <div className="text-[10px] px-2 py-0.5 rounded-full bg-[#111b21] text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Coach Active</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-3 px-1 py-1 min-h-[190px]">
                <div className="flex justify-start">
                  <div className="bg-[#202c33] text-slate-200 text-xs p-3 rounded-xl rounded-tl-none max-w-[85%]">
                    <p>Good morning. Has the lab report been finalized yet?</p>
                    <span className="text-[9px] text-slate-400 block text-right mt-1">10:14 AM</span>
                  </div>
                </div>

                {/* SpeakRight Intercept Suggestion Bubble */}
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-200 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>SpeakRight Pre-Send Rewrite:</span>
                    </span>
                    <span className="text-[9px] text-emerald-400 font-mono">Score 97%</span>
                  </div>

                  <p className="text-xs text-white bg-black/50 p-2.5 rounded-lg border border-slate-800 mb-2 leading-relaxed">
                    {mockOptions[selectedRewrite].text}
                  </p>

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {mockOptions.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedRewrite(i)}
                        className={`text-[9px] px-2 py-1 rounded-md shrink-0 transition-all cursor-pointer ${
                          selectedRewrite === i
                            ? "bg-white text-slate-900 font-semibold"
                            : "bg-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        {opt.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat Input Bar */}
              <div className="mt-2 bg-[#202c33] p-1.5 rounded-xl flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value="Applying SpeakRight rewrite..."
                  className="bg-transparent text-[11px] text-slate-300 px-2 w-full focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSelectedRewrite((prev) => (prev + 1) % mockOptions.length)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                  title="Cycle suggestion"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 cursor-pointer">
                  <Send className="w-3.5 h-3.5 fill-slate-950" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
