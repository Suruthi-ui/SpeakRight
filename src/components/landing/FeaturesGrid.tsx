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
    gradient: "from-blue-500/20 to-indigo-500/20",
    border: "border-blue-500/30",
  },
  {
    icon: FileCheck,
    title: "Before vs. Improved Diff Engine",
    description:
      "Visual comparison highlighting words removed, phrases restructured, and sentence clarity improvements side-by-side.",
    badge: "Visual Diff",
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
  },
  {
    icon: Layers,
    title: "3 Targeted Alternate Styles",
    description:
      "Never settle for one style. Get Executive & Direct, Diplomatic & Polite, and Warm & Collaborative variations for any context.",
    badge: "Multi-Style",
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30",
  },
  {
    icon: BrainCircuit,
    title: "Linguistic & Psychological Insights",
    description:
      "Understand why certain words trigger defensive responses or sound hesitant, backed by Harvard business communication principles.",
    badge: "Psychology",
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Pre-Send Integration",
    description:
      "Built with a modular webhook architecture ready to intercept and rewrite drafts directly within WhatsApp before hitting send.",
    badge: "Future-Ready",
    gradient: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/30",
  },
  {
    icon: FileDown,
    title: "Executive PDF Reports & Share",
    description:
      "Export high-resolution coaching reports with a single click. Ideal for student portfolios, mentorship reviews, and team training.",
    badge: "Export Ready",
    gradient: "from-rose-500/20 to-red-500/20",
    border: "border-rose-500/30",
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-dot-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Enterprise Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5">
            Designed Like a Real AI Executive Coach
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            More than a simple grammar checker. SpeakRight understands authority, organizational hierarchy, diplomatic diplomacy, and human psychology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-panel rounded-[26px] p-7 border hover:border-white/20 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Glow accent */}
                <div
                  className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${feat.gradient} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`}
                />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-indigo-400" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center text-xs text-indigo-400 font-medium group-hover:text-indigo-300">
                  <span>Explore feature in dashboard →</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
