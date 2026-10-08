"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sliders,
  FileCheck,
  Layers,
  BrainCircuit,
  MessageCircle,
  FileDown,
} from "lucide-react";

const features = [
  {
    icon: Sliders,
    title: "Tone Radar & Calibration",
    description:
      "Measures assertiveness, warmth, politeness, and conciseness on real-time animated gauges with precise feedback on tone perception.",
    badge: "5 Dimensions",
  },
  {
    icon: FileCheck,
    title: "Before vs. Improved Diff Engine",
    description:
      "Visual comparison highlighting words removed, phrases restructured, and sentence clarity improvements side-by-side.",
    badge: "Visual Diff",
  },
  {
    icon: Layers,
    title: "3 Targeted Alternate Styles",
    description:
      "Never settle for one style. Get Executive & Direct, Diplomatic & Polite, and Warm & Collaborative variations for any context.",
    badge: "Multi-Style",
  },
  {
    icon: BrainCircuit,
    title: "Linguistic & Psychological Insights",
    description:
      "Understand why certain words trigger defensive responses or sound hesitant, backed by Harvard business communication principles.",
    badge: "Psychology",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Pre-Send Integration",
    description:
      "Built with a modular webhook architecture ready to intercept and rewrite drafts directly within WhatsApp before hitting send.",
    badge: "Pre-Send",
  },
  {
    icon: FileDown,
    title: "Executive PDF Reports & Share",
    description:
      "Export high-resolution coaching reports with a single click. Ideal for student portfolios, mentorship reviews, and team training.",
    badge: "PDF Export",
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-20 bg-[#fafafa] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3 border border-slate-200">
            <span>Coaching Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            Designed for Real Executive Presence
          </h2>
          <p className="text-sm text-slate-600">
            More than a simple grammar checker. SpeakRight understands authority, organizational hierarchy, diplomatic diplomacy, and human psychology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 mb-1.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs text-slate-800 font-medium">
                  <span>Included in dashboard →</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
