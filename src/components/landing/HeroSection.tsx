"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  Zap,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-radial-glow">
      {/* Background radial blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-indigo-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-purple-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          {/* Top Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 backdrop-blur-md mb-6 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-200">
              Next-Gen AI Communication Coach • Powered by Google Gemini
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]"
          >
            Say What You Mean. <br className="hidden sm:inline" />
            <span className="gradient-text-accent">Command The Respect</span> You Deserve.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
          >
            Rewriting hesitant, blunt, or over-apologetic drafts into articulate, confident, and respectful communication. Built for students, managers, and career professionals.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <Link
              href="#message-builder"
              className="glass-button-primary w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-semibold text-white flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Rewrite Your Message Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <span>Explore AI Dashboard</span>
            </Link>
          </motion.div>

          {/* Key Value Metric Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-slate-400"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero Mock Responses</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Linguistic Etiquette Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Executive Presence Scoring</span>
            </div>
          </motion.div>
        </div>

        {/* Floating Preview Card: Visual Transformation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-panel-elevated rounded-[28px] p-6 sm:p-8 relative overflow-hidden border border-white/15">
            {/* Top Bar with mock dots */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-slate-400 ml-2 font-mono">SpeakRight Transformation Preview</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>+52 Score Boost</span>
              </div>
            </div>

            {/* Split Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before Card */}
              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                    Original Draft (Before)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-bold">
                    Score: 44/100
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed bg-black/30 p-3.5 rounded-xl border border-white/5 font-mono">
                  &ldquo;hey professor, sorry to bother you again but I couldn&apos;t do the assignment because I was sick. Can you give me 3 more days? please don&apos;t take points off.&rdquo;
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
                  <span className="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-300">Over-apologetic</span>
                  <span className="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-300">Too casual</span>
                  <span className="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-300">Lacks structure</span>
                </div>
              </div>

              {/* After Card */}
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>SpeakRight AI Rewrite (After)</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold">
                    Score: 96/100
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-emerald-500/20">
                  &ldquo;Dear Professor Davis, I am writing to respectfully request a short extension on Assignment 2 until Friday, Oct 12th, due to sudden medical leave. I have completed 60% of the research and would appreciate the opportunity to submit my best work.&rdquo;
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300">Respectful &amp; Formal</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300">High Agency</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300">Clear Milestones</span>
                </div>
              </div>
            </div>

            {/* Bottom Bar Info */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <span>Calibrated for Professor • Academic &amp; Respectful Etiquette</span>
              </div>
              <Link
                href="#message-builder"
                className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1 hover:underline underline-offset-4"
              >
                <span>Try this with your message</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
