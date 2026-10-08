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
    color: "from-indigo-500 to-violet-600",
    bgClass: "bg-indigo-50 text-indigo-600 border-indigo-200/80",
    badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    icon: FileCheck,
    title: "Before vs. Improved Diff Engine",
    description:
      "Visual comparison highlighting words removed, phrases restructured, and sentence clarity improvements side-by-side using LCS diffs.",
    badge: "LCS Diff",
    color: "from-emerald-500 to-teal-600",
    bgClass: "bg-emerald-50 text-emerald-600 border-emerald-200/80",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    icon: Layers,
    title: "3 Targeted Alternate Styles",
    description:
      "Never settle for one style. Get Executive & Direct, Diplomatic & Polite, and Warm & Collaborative variations for any context.",
    badge: "Multi-Style",
    color: "from-violet-500 to-purple-600",
    bgClass: "bg-violet-50 text-violet-600 border-violet-200/80",
    badgeClass: "bg-violet-50 text-violet-700 border-violet-200",
  },
  {
    icon: BrainCircuit,
    title: "Linguistic & Psychological Insights",
    description:
      "Understand why certain words trigger defensive responses or sound hesitant, backed by Harvard business communication principles.",
    badge: "Psychology",
    color: "from-amber-500 to-orange-600",
    bgClass: "bg-amber-50 text-amber-600 border-amber-200/80",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Pre-Send Integration",
    description:
      "Built with a modular webhook architecture ready to intercept and rewrite drafts directly within WhatsApp before hitting send.",
    badge: "Pre-Send API",
    color: "from-teal-500 to-emerald-600",
    bgClass: "bg-teal-50 text-teal-600 border-teal-200/80",
    badgeClass: "bg-teal-50 text-teal-700 border-teal-200",
  },
  {
    icon: FileDown,
    title: "Executive PDF Reports & Share",
    description:
      "Export high-resolution coaching reports with a single click. Ideal for student portfolios, mentorship reviews, and team training.",
    badge: "PDF Export",
    color: "from-sky-500 to-blue-600",
    bgClass: "bg-sky-50 text-sky-600 border-sky-200/80",
    badgeClass: "bg-sky-50 text-sky-700 border-sky-200",
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-20 bg-slate-50/70 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-200/80 shadow-xs">
            <span>Coaching Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
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
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-xs transition-transform group-hover:scale-105 ${feat.bgClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${feat.badgeClass}`}>
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
