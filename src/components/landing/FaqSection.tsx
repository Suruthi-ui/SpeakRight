"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How does SpeakRight use Google Gemini AI?",
    a: "SpeakRight connects directly to Google AI Studio's Gemini 1.5 Flash model. We engineer structured, context-rich prompts that evaluate emotional tone, hierarchical power dynamics, politeness, and conciseness, returning structured coaching metrics in under 2 seconds.",
  },
  {
    q: "Can I use my own Google AI Studio API key?",
    a: "Yes! SpeakRight has built-in support for your own Google AI Studio key. Click 'Gemini Key' in the top navigation bar to input your key. It is saved only in your browser's local storage and used directly for your requests.",
  },
  {
    q: "How does the WhatsApp pre-send feature work?",
    a: "We have architected a dedicated pre-send pipeline (/api/whatsapp/rewrite) and Meta Cloud API webhook handler (/api/whatsapp/webhook). When integrated with a WhatsApp bot or companion keyboard, it inspects your draft text and gives you instant 1-tap rewrites before sending.",
  },
  {
    q: "Is my draft text stored or used to train models?",
    a: "No. Your draft messages are never stored permanently in a database, sold, or used to train AI models. Requests are processed in ephemeral memory and discarded immediately after the analysis payload is returned to your browser.",
  },
  {
    q: "Is SpeakRight appropriate for academic honor codes?",
    a: "Yes. SpeakRight functions strictly as an interpersonal communication etiquette coach (rephrasing emails to professors, advisors, and administration) and does not write academic essays or complete homework assignments.",
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-dot-pattern">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Everything you need to know about SpeakRight, Google Gemini AI, and message rewrites.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-indigo-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
