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
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#fafafa]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          {/* Top Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-6 text-slate-700 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-800" />
            <span className="text-xs font-medium">
              AI Communication Coach • Intelligent Presence Engine
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 mb-5 leading-[1.12]"
          >
            Say what you mean. <br className="hidden sm:inline" />
            <span className="text-slate-500">Command respect.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed font-normal"
          >
            Rewrite hesitant, blunt, or over-apologetic drafts into articulate, confident, and respectful communication in seconds.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
          >
            <Link
              href="#message-builder"
              className="minimal-button-primary w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
            >
              <span>Rewrite Your Message</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/dashboard"
              className="minimal-button-secondary w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
            >
              <span>Open AI Dashboard</span>
            </Link>
          </motion.div>

          {/* Key Value Metric Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Native Linguistic Intelligence</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0" />
              <span>Harvard Etiquette Principles</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-slate-700 shrink-0" />
              <span>Executive Presence Scoring</span>
            </div>
          </motion.div>
        </div>

        {/* Minimalist Visual Transformation Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
            {/* Top Bar with mock dots */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="text-xs text-slate-500 ml-2 font-mono">Live Comparison Preview</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>+52 Score Boost</span>
              </div>
            </div>

            {/* Split Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Before Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-rose-700">
                    Before (Raw Draft)
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">
                    Score: 44/100
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-rose-100 italic">
                  &ldquo;hey professor, sorry to bother you again but I couldn&apos;t do the assignment because I was sick. Can you give me 3 more days? please don&apos;t take points off.&rdquo;
                </p>
                <div className="flex flex-wrap gap-1 pt-1 text-[11px]">
                  <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700">Over-apologetic</span>
                  <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700">Too casual</span>
                </div>
              </div>

              {/* After Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>After (SpeakRight Rewrite)</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                    Score: 96/100
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-900 leading-relaxed bg-white p-3.5 rounded-xl border border-emerald-100 font-medium">
                  &ldquo;Dear Professor Davis, I am writing to respectfully request a short extension on Assignment 2 until Friday, Oct 12th, due to medical leave. I have completed 60% of the research and would appreciate the opportunity to submit my best work.&rdquo;
                </p>
                <div className="flex flex-wrap gap-1 pt-1 text-[11px]">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">Formal &amp; Respectful</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">Accountable</span>
                </div>
              </div>
            </div>

            {/* Bottom Bar Info */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-slate-600" />
                <span>Calibrated for Professor • Academic Etiquette</span>
              </div>
              <Link
                href="#message-builder"
                className="text-slate-900 hover:text-slate-700 font-medium inline-flex items-center gap-1 hover:underline underline-offset-4"
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
