"use client";

import React, { useState } from "react";
import { GraduationCap, Briefcase, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export function AudienceShowcase() {
  const [activeTab, setActiveTab] = useState<"students" | "professionals">("students");

  return (
    <section id="audience" className="py-20 bg-white border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-200/80 shadow-xs">
            <span>Use Cases</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            Built for Students &amp; Working Professionals
          </h2>
          <p className="text-sm text-slate-600">
            Whether emailing a tenured professor or pitching a critical roadmap shift to leadership, SpeakRight calibrates the exact tone required.
          </p>

          {/* Tab Switcher */}
          <div className="mt-6 inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab("students")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "students"
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Students &amp; Academics</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("professionals")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "professionals"
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-indigo-50/40 via-white to-slate-50/60 p-6 sm:p-8 rounded-3xl border border-indigo-100 shadow-sm">
              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-3 border border-indigo-200">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Academic Etiquette</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Eliminate Casual Slips with Professors
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-normal">
                    Students often struggle with sounding too informal (&ldquo;hey prof&rdquo;) or overly anxious. SpeakRight teaches you how to present academic requests with dignity and clear milestones.
                  </p>

                  <div className="space-y-2">
                    {[
                      "Requesting deadline extensions with clear accountability",
                      "Asking for strong Letters of Recommendation with brag sheets",
                      "Politely disputing an exam grade constructively",
                      "Inquiring about undergraduate research lab positions",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="#message-builder"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline underline-offset-4"
                  >
                    <span>Try student email rewrite now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Student Sample Visual Card */}
              <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200 text-xs flex flex-col justify-between shadow-sm">
                <div>
                  <div className="text-[11px] font-mono text-indigo-600 mb-1.5 uppercase font-bold">
                    Case Study • Physics 101 Extension
                  </div>
                  <div className="p-3 bg-rose-50/60 border border-rose-100 rounded-xl mb-3">
                    <div className="text-[10px] uppercase font-bold text-rose-700 mb-1">
                      Raw Student Draft:
                    </div>
                    <p className="text-slate-700 italic">
                      &ldquo;hey prof, sorry to bother u, is it ok if i send the lab report monday? i was sick and couldn&apos;t finish. pls don&apos;t dock marks.&rdquo;
                    </p>
                  </div>

                  <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl">
                    <div className="text-[10px] uppercase font-bold text-emerald-800 mb-1">
                      SpeakRight Polish:
                    </div>
                    <p className="text-slate-900 font-medium">
                      &ldquo;Hi Professor Davis, could I please request a short extension on the lab report until Monday? I was unwell over the weekend and fell slightly behind. I want to make sure I submit thorough work. Thank you for your flexibility!&rdquo;
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 font-medium">
                  <span>Confidence: +38%</span>
                  <span className="text-emerald-700 font-bold">Status: Approved</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-violet-50/40 via-white to-slate-50/60 p-6 sm:p-8 rounded-3xl border border-violet-100 shadow-sm">
              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-bold mb-3 border border-violet-200">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Executive Leadership</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Command Authority Without Sounding Aggressive
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-normal">
                    Career progression requires crisp, high-agency language. Replace apologetic timid phrases (&ldquo;just wanted to see if&rdquo;) with strategic confidence.
                  </p>

                  <div className="space-y-2">
                    {[
                      "Negotiating salary reviews and performance calibrations",
                      "Declining out-of-scope tasks with clear trade-off visibility",
                      "Giving constructive code review and design feedback",
                      "Escalating project delays proactively with revised ETAs",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="#message-builder"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 hover:text-violet-700 hover:underline underline-offset-4"
                  >
                    <span>Try workplace email rewrite now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Professional Sample Visual Card */}
              <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200 text-xs flex flex-col justify-between shadow-sm">
                <div>
                  <div className="text-[11px] font-mono text-violet-600 mb-1.5 uppercase font-bold">
                    Case Study • Salary Review Request
                  </div>
                  <div className="p-3 bg-rose-50/60 border border-rose-100 rounded-xl mb-3">
                    <div className="text-[10px] uppercase font-bold text-rose-700 mb-1">
                      Raw Engineer Draft:
                    </div>
                    <p className="text-slate-700 italic">
                      &ldquo;hey, i think i deserve more money because i work hard and do lots of extra tasks. can we discuss giving me a raise whenever?&rdquo;
                    </p>
                  </div>

                  <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl">
                    <div className="text-[10px] uppercase font-bold text-emerald-800 mb-1">
                      SpeakRight Polish:
                    </div>
                    <p className="text-slate-900 font-medium">
                      &ldquo;Hi, could we set aside 15-20 minutes during our upcoming 1-on-1 to discuss my compensation? Given my recent deliverables and expanded scope, I&apos;d love to align on next steps for a salary review. I&apos;ve prepared a quick summary of my recent impact for our discussion.&rdquo;
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 font-medium">
                  <span>Executive Presence: +45%</span>
                  <span className="text-emerald-700 font-bold">Outcome: Scheduled 1-on-1</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
