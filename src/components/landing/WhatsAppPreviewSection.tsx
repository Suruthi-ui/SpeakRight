"use client";

import React, { useState } from "react";
import { MessageCircle, Check, Sparkles, Send } from "lucide-react";

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
    <section id="whatsapp" className="py-20 bg-slate-50/70 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200 shadow-xs">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Future-Ready Integration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
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
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl shadow-emerald-500/5 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Pre-Send Interception Architecture</span>
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Integrated at <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono font-semibold border border-emerald-200">/api/whatsapp/rewrite</code> and ready for Meta Cloud API webhooks.
              </p>

              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3 text-xs text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-emerald-300">
                    1
                  </div>
                  <span>Draft your raw message in WhatsApp without filtering.</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-indigo-300">
                    2
                  </div>
                  <span>SpeakRight checks recipient context &amp; emotional tone.</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-violet-300">
                    3
                  </div>
                  <span>Pick one-tap polished message before the recipient reads.</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2.5 shadow-xs">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full Meta Webhook API endpoints pre-configured in project code.</span>
            </div>
          </div>

          {/* Right Column: WhatsApp Phone Mockup */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-sm rounded-[36px] bg-[#111b21] p-3.5 border-4 border-slate-700 shadow-2xl relative overflow-hidden ring-1 ring-slate-900/10">
              <div className="w-28 h-4 bg-slate-800 mx-auto rounded-full mb-3" />

              {/* Chat Header */}
              <div className="bg-[#202c33] px-3.5 py-2.5 rounded-xl flex items-center justify-between mb-3 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                    PD
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Prof. Davis</h4>
                    <p className="text-[10px] text-emerald-400 font-medium">online</p>
                  </div>
                </div>
                <div className="text-[10px] px-2 py-0.5 rounded-full bg-[#111b21] text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-semibold">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Coach Active</span>
                </div>
              </div>

              {/* Messages Area */}
              <div className="space-y-3 p-1 min-h-[260px] flex flex-col justify-end">
                {/* Incoming Message */}
                <div className="bg-[#202c33] text-slate-100 p-3 rounded-2xl rounded-tl-xs max-w-[85%] text-xs leading-relaxed shadow-xs">
                  <p>When will the updated project deliverable be ready for review?</p>
                  <span className="text-[9px] text-slate-400 block text-right mt-1">1:42 PM</span>
                </div>

                {/* Pre-Send Coach Intercept Overlay */}
                <div className="bg-[#1f2c34] border border-emerald-500/30 rounded-2xl p-3 space-y-2 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      SpeakRight Pre-Send Suggestions
                    </span>
                    <span className="text-[9px] text-slate-400">Tap to replace</span>
                  </div>

                  <div className="space-y-1.5">
                    {mockOptions.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedRewrite(i)}
                        className={`w-full text-left p-2 rounded-xl text-[11px] transition-all cursor-pointer ${
                          selectedRewrite === i
                            ? "bg-emerald-600/30 text-emerald-200 border border-emerald-500/50 font-medium"
                            : "bg-[#2a3942]/60 text-slate-300 hover:bg-[#2a3942] border border-transparent"
                        }`}
                      >
                        <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">
                          {opt.title}
                        </span>
                        <p className="line-clamp-2 leading-relaxed">{opt.text}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Outgoing Message preview */}
                <div className="bg-[#005c4b] text-white p-3 rounded-2xl rounded-tr-xs max-w-[90%] self-end text-xs leading-relaxed shadow-xs">
                  <p>{mockOptions[selectedRewrite].text}</p>
                  <div className="flex items-center justify-end gap-1 text-[9px] text-emerald-200 mt-1">
                    <span>1:44 PM</span>
                    <span>✓✓</span>
                  </div>
                </div>
              </div>

              {/* Chat Input Bar */}
              <div className="mt-3 bg-[#202c33] p-2 rounded-2xl flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value="SpeakRight active: pre-send auto-filter enabled"
                  className="bg-transparent text-[11px] text-slate-400 flex-1 px-2 focus:outline-none font-mono"
                />
                <button
                  type="button"
                  className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
