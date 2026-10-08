"use client";

import React, { useState } from "react";
import { GraduationCap, Briefcase, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export function AudienceShowcase() {
  const [activeTab, setActiveTab] = useState<"students" | "professionals">("students");

  return (
    <section id="audience" className="py-24 relative overflow-hidden bg-radial-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Tailored For Your World</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Built for Students &amp; Professionals Alike
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Whether emailing a tenured professor or pitching a critical roadmap shift to executive leadership, SpeakRight calibrates the exact tone required.
          </p>

          {/* Tab Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveTab("students")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "students"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Students &amp; Academics</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("professionals")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "professionals"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Professionals &amp; Leaders</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="max-w-5xl mx-auto">
          {activeTab === "students" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 glass-panel-elevated p-8 sm:p-10 rounded-[30px] border border-white/15">
              <div className="space-y-6 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-4 border border-indigo-500/20">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Academic Etiquette Engine</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Eliminate Casual Slips with Professors &amp; Admissions
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    Students often struggle with sounding too informal (&ldquo;hey prof&rdquo;) or overly anxious and apologetic. SpeakRight teaches you how to present academic requests with dignity, structure, and respect.
                  </p>

                  <div className="space-y-3">
                    {[
                      "Requesting deadline extensions with accountability and milestones",
                      "Asking for strong Letters of Recommendation with structured brag sheets",
                      "Politely disputing an exam grade without sounding confrontational",
                      "Inquiring about undergraduate research lab openings",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="#message-builder"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline underline-offset-4"
                  >
                    <span>Try student email rewrite now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Student Sample Visual Card */}
              <div className="space-y-4 bg-black/40 p-6 rounded-2xl border border-white/10 font-sans text-xs flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono text-slate-400 mb-2 uppercase">
                    Common Student Mistake
                  </div>
                  <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 text-slate-300 italic mb-4">
                    &ldquo;Hey professor, I forgot about the quiz yesterday because of another midterm. Is there any way I can retake it? Please let me know thanks.&rdquo;
                  </div>

                  <div className="text-[11px] font-mono text-emerald-400 mb-2 uppercase flex items-center gap-1.5">
                    <span>✨ SpeakRight Academic Master Rewrite</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-slate-100">
                    &ldquo;Dear Professor Henderson, I am writing to sincerely apologize for missing yesterday’s quiz due to an academic conflict. I take full responsibility for the oversight. If your course policy permits make-up assessments or alternative assignments, I would be grateful for the opportunity to demonstrate my understanding of the material. Thank you for your time.&rdquo;
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Tone: Formal &amp; Accountable</span>
                  <span className="text-emerald-400 font-bold">Score: 97/100</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 glass-panel-elevated p-8 sm:p-10 rounded-[30px] border border-white/15">
              <div className="space-y-6 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold mb-4 border border-purple-500/20">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Executive Presence Engine</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Replace Apologies with Authority &amp; Clarity
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    In the corporate workplace, over-apologizing (&ldquo;just checking in&rdquo;, &ldquo;sorry to bother you&rdquo;) diminishes your authority. SpeakRight instills high agency, proactive communication, and leadership tone.
                  </p>

                  <div className="space-y-3">
                    {[
                      "Negotiating compensation adjustments with value-anchored framing",
                      "Escalating blockers and delays to executives without sounding defensive",
                      "Delivering constructive peer feedback with emotional intelligence",
                      "Declining low-priority requests while maintaining strong alignment",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="#message-builder"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 hover:underline underline-offset-4"
                  >
                    <span>Try professional rewrite now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Professional Sample Visual Card */}
              <div className="space-y-4 bg-black/40 p-6 rounded-2xl border border-white/10 font-sans text-xs flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono text-slate-400 mb-2 uppercase">
                    Common Workplace Mistake
                  </div>
                  <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 text-slate-300 italic mb-4">
                    &ldquo;Sorry to bother you, I know you&apos;re super busy! Just wanted to ask if you had a second to check the PR when you get a chance? No rush at all though!&rdquo;
                  </div>

                  <div className="text-[11px] font-mono text-emerald-400 mb-2 uppercase flex items-center gap-1.5">
                    <span>✨ SpeakRight Executive Rewrite</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-slate-100">
                    &ldquo;Hi Alex, the authentication PR is ready for your review. To ensure we deploy by Thursday’s release cutoff, could you review it by 3 PM today? Happy to jump on a quick huddle if you have any questions on the architecture.&rdquo;
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Tone: High Agency &amp; Direct</span>
                  <span className="text-emerald-400 font-bold">Score: 98/100</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
