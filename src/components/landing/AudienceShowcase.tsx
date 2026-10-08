"use client";

import React, { useState } from "react";
import { GraduationCap, Briefcase, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export function AudienceShowcase() {
  const [activeTab, setActiveTab] = useState<"students" | "professionals">("students");

  return (
    <section id="audience" className="py-20 bg-white border-b border-slate-200/60 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3 border border-slate-200">
            <span>Use Cases</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            Built for Students &amp; Working Professionals
          </h2>
          <p className="text-sm text-slate-600">
            Whether emailing a tenured professor or pitching a critical roadmap shift to leadership, SpeakRight calibrates the exact tone required.
          </p>

          {/* Tab Switcher */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab("students")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "students"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Students &amp; Academics</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("professionals")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "professionals"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Professionals &amp; Leaders</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "students" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/70 p-6 sm:p-8 rounded-3xl border border-slate-200">
              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3 border border-slate-200">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Academic Etiquette</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Eliminate Casual Slips with Professors
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    Students often struggle with sounding too informal (&ldquo;hey prof&rdquo;) or overly anxious. SpeakRight teaches you how to present academic requests with dignity and clear milestones.
                  </p>

                  <div className="space-y-2">
                    {[
                      "Requesting deadline extensions with clear accountability",
                      "Asking for strong Letters of Recommendation with brag sheets",
                      "Politely disputing an exam grade constructively",
                      "Inquiring about undergraduate research lab positions",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="#message-builder"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:underline underline-offset-4"
                  >
                    <span>Try student email rewrite now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Student Sample Visual Card */}
              <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200 text-xs flex flex-col justify-between shadow-xs">
                <div>
                  <div className="text-[11px] font-mono text-slate-500 mb-1.5 uppercase font-semibold">
                    Common Student Mistake
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100 text-slate-700 italic mb-3">
                    &ldquo;Hey professor, I forgot about the quiz yesterday because of another midterm. Is there any way I can retake it? Please let me know thanks.&rdquo;
                  </div>

                  <div className="text-[11px] font-mono text-emerald-700 mb-1.5 uppercase font-semibold flex items-center gap-1">
                    <span>✨ Master Academic Rewrite</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-slate-900 font-medium">
                    &ldquo;Dear Professor Henderson, I am writing to sincerely apologize for missing yesterday’s quiz due to an academic conflict. I take full responsibility for the oversight. If your course policy permits make-up assessments or alternative assignments, I would be grateful for the opportunity to demonstrate my understanding of the material.&rdquo;
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
                  <span>Tone: Formal &amp; Accountable</span>
                  <span className="text-emerald-700 font-bold">Score: 97/100</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/70 p-6 sm:p-8 rounded-3xl border border-slate-200">
              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3 border border-slate-200">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Executive Presence</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Replace Apologies with Authority &amp; Clarity
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    In the workplace, over-apologizing (&ldquo;just checking in&rdquo;, &ldquo;sorry to bother you&rdquo;) diminishes your leverage. SpeakRight instills high agency and proactive communication.
                  </p>

                  <div className="space-y-2">
                    {[
                      "Negotiating compensation adjustments with value-anchored framing",
                      "Escalating blockers and delays to leadership with solutions",
                      "Delivering constructive peer feedback with emotional intelligence",
                      "Declining low-priority requests while maintaining strong alignment",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="#message-builder"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:underline underline-offset-4"
                  >
                    <span>Try workplace rewrite now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Professional Sample Visual Card */}
              <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200 text-xs flex flex-col justify-between shadow-xs">
                <div>
                  <div className="text-[11px] font-mono text-slate-500 mb-1.5 uppercase font-semibold">
                    Common Workplace Mistake
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100 text-slate-700 italic mb-3">
                    &ldquo;Sorry to bother you, I know you&apos;re super busy! Just wanted to ask if you had a second to check the PR when you get a chance? No rush at all though!&rdquo;
                  </div>

                  <div className="text-[11px] font-mono text-emerald-700 mb-1.5 uppercase font-semibold flex items-center gap-1">
                    <span>✨ Master Executive Rewrite</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-slate-900 font-medium">
                    &ldquo;Hi Alex, the authentication PR is ready for your review. To ensure we deploy by Thursday’s release cutoff, could you review it by 3 PM today? Happy to jump on a quick huddle if you have any questions on the architecture.&rdquo;
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
                  <span>Tone: High Agency &amp; Direct</span>
                  <span className="text-emerald-700 font-bold">Score: 98/100</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
