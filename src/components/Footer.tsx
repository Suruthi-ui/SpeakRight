"use client";

import React from "react";
import Link from "next/link";
import { MessageSquareQuote, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-500 py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                <MessageSquareQuote className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight">SpeakRight</span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                AI Coach
              </span>
            </Link>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              The communication copilot that transforms awkward drafts into crisp, respectful, and authoritative messages. Built for students, managers, and career professionals.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-slate-600 font-medium">Native AI Communication Engine Active</span>
            </div>
          </div>

          {/* Column: Platform */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">Platform</h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <Link href="/#message-builder" className="hover:text-slate-900 transition-colors">
                  Message Rewriter
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-slate-900 transition-colors">
                  AI Dashboard
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-slate-900 transition-colors">
                  Tone Analysis
                </Link>
              </li>
              <li>
                <Link href="/#whatsapp" className="hover:text-slate-900 transition-colors">
                  WhatsApp Beta
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Use Cases */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">Use Cases</h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <Link href="/#audience" className="hover:text-slate-900 transition-colors">
                  Professor &amp; Academia
                </Link>
              </li>
              <li>
                <Link href="/#audience" className="hover:text-slate-900 transition-colors">
                  Manager &amp; Leadership
                </Link>
              </li>
              <li>
                <Link href="/#audience" className="hover:text-slate-900 transition-colors">
                  Salary Negotiation
                </Link>
              </li>
              <li>
                <Link href="/#audience" className="hover:text-slate-900 transition-colors">
                  Post-Interview Follow-Up
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 SpeakRight. Built for students &amp; professionals.</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span className="text-slate-700 font-medium">SpeakRight Intelligence</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
