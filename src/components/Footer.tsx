"use client";

import React from "react";
import Link from "next/link";
import { MessageSquareQuote, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white text-slate-500 py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <MessageSquareQuote className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                SpeakRight
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                AI Coach
              </span>
            </Link>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm font-normal">
              The communication copilot that transforms awkward drafts into crisp, respectful, and authoritative messages. Built for students, managers, and career professionals.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-slate-600 font-semibold">Native AI Communication Engine Active</span>
            </div>
          </div>

          {/* Column: Platform */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Platform</h4>
            <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
              <li>
                <Link href="/#message-builder" className="hover:text-indigo-600 transition-colors">
                  Message Rewriter
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">
                  AI Dashboard
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-indigo-600 transition-colors">
                  Tone Analysis
                </Link>
              </li>
              <li>
                <Link href="/#whatsapp" className="hover:text-indigo-600 transition-colors">
                  WhatsApp Beta
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Use Cases */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Use Cases</h4>
            <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
              <li>
                <Link href="/#audience" className="hover:text-indigo-600 transition-colors">
                  Professor &amp; Academia
                </Link>
              </li>
              <li>
                <Link href="/#audience" className="hover:text-indigo-600 transition-colors">
                  Manager &amp; Leadership
                </Link>
              </li>
              <li>
                <Link href="/#audience" className="hover:text-indigo-600 transition-colors">
                  Salary Negotiation
                </Link>
              </li>
              <li>
                <Link href="/#audience" className="hover:text-indigo-600 transition-colors">
                  Post-Interview Follow-Up
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
          <p>© 2026 SpeakRight. Built for students &amp; professionals.</p>
          <div className="flex items-center gap-1.5">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span className="text-slate-700 font-bold">SpeakRight Intelligence</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
