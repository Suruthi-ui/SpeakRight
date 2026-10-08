"use client";

import React from "react";
import { Star, Award } from "lucide-react";

const testimonials = [
  {
    name: "Elena Rostova",
    role: "Computer Science Ph.D. Candidate",
    affiliation: "UC Berkeley",
    comment:
      "I was hesitant to email senior researchers about joining their lab. SpeakRight taught me how to highlight my background without sounding timid or arrogant. I received 3 replies within 24 hours.",
    rating: 5,
    tag: "Academic Outreach",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    name: "Marcus Vance",
    role: "Engineering Lead",
    affiliation: "Tech Scaleup",
    comment:
      "My natural writing style was overly blunt, which created unintended friction with product managers. SpeakRight’s Diplomatic Rewrite style smoothed our roadmap alignment completely.",
    rating: 5,
    tag: "Leadership & EQ",
    color: "bg-violet-50 text-violet-700 border-violet-200",
  },
  {
    name: "Aaliyah Chen",
    role: "Product Marketing Manager",
    affiliation: "Enterprise SaaS",
    comment:
      "The salary negotiation rewrite was incredible. It removed all my self-deprecating filler words like 'just wondering' and framed my accomplishments with data. I secured a 15% increase with zero awkwardness.",
    rating: 5,
    tag: "Salary Review",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-white border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-200/80 shadow-xs">
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            <span>Social Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            Trusted by Ambitious Communicators
          </h2>
          <p className="text-sm text-slate-600">
            Students and professionals communicate with clarity, empathy, and conviction every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${t.color}`}>
                    {t.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 font-normal">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                  <p className="text-[11px] text-slate-500">{t.role}</p>
                </div>
                <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                  {t.affiliation}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
