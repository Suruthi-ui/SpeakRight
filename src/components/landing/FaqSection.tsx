"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How does SpeakRight analyze communication drafts?",
    a: "SpeakRight uses an advanced native linguistic intelligence engine based on Harvard business communication principles. It evaluates emotional tone, hierarchical power dynamics, passive qualifiers, and conciseness, delivering structured coaching metrics in milliseconds.",
  },
  {
    q: "Do I need any external API keys to use SpeakRight?",
    a: "No! SpeakRight is completely self-contained. You can immediately analyze drafts, customize rewrites, and export PDF reports with zero setup and no external keys.",
  },
  {
    q: "How does the WhatsApp pre-send feature work?",
    a: "We have architected a dedicated pre-send pipeline (/api/whatsapp/rewrite) and Meta Cloud API webhook handler (/api/whatsapp/webhook). When integrated with a WhatsApp companion keyboard or bot, it inspects your draft text and gives you instant 1-tap rewrites before sending.",
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
    <section className="py-20 bg-[#fafafa] relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3 border border-slate-200">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600">
            Everything you need to know about SpeakRight and Google Gemini AI.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-slate-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-fadeIn">
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
