"use client";

import React from "react";
import Link from "next/link";
import { MessageSquareQuote, Sparkles, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#07090e] text-slate-400 py-16 relative overflow-hidden">
      {/* Subtle glow background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-indigo-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <MessageSquareQuote className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">SpeakRight</span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                AI Coach
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The intelligent communication copilot that transforms awkward drafts into crisp, respectful, and authoritative messages. Designed for students, professionals, and future leaders.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-300 font-medium">Google Gemini AI Engine Active</span>
            </div>
          </div>

          {/* Column: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#message-builder" className="hover:text-white transition-colors">
                  Message Rewriter
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  AI Dashboard
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-white transition-colors">
                  Tone Radar Analysis
                </Link>
              </li>
              <li>
                <Link href="/#whatsapp" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>WhatsApp Shield</span>
                  <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-400">Beta</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Scenarios */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Use Cases</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#audience" className="hover:text-white transition-colors">
                  Professor &amp; Academia
                </Link>
              </li>
              <li>
                <Link href="/#audience" className="hover:text-white transition-colors">
                  Manager &amp; Leadership
                </Link>
              </li>
              <li>
                <Link href="/#audience" className="hover:text-white transition-colors">
                  Salary Negotiation
                </Link>
              </li>
              <li>
                <Link href="/#audience" className="hover:text-white transition-colors">
                  Client &amp; Freelance
                </Link>
              </li>
              <li>
                <Link href="/#audience" className="hover:text-white transition-colors">
                  HR &amp; Interview Follow-up
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Technology */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">AI &amp; Tech</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://aistudio.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>Google AI Studio</span>
                </a>
              </li>
              <li>
                <span className="text-slate-400">Gemini 1.5 Flash Model</span>
              </li>
              <li>
                <span className="text-slate-400">Next.js 15 App Router</span>
              </li>
              <li>
                <span className="text-slate-400">Framer Motion &amp; Tailwind</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 SpeakRight. Built with precision for students &amp; professionals.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>using Google Gemini AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
