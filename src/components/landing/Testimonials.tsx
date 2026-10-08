"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Elena Rostova",
    role: "Computer Science Ph.D. Candidate",
    affiliation: "UC Berkeley",
    comment:
      "I was hesitant to email senior researchers about joining their lab. SpeakRight taught me how to highlight my background without sounding timid or arrogant. I received 3 replies within 24 hours.",
    rating: 5,
    tag: "Academic Outreach",
  },
  {
    name: "Marcus Vance",
    role: "Engineering Lead",
    affiliation: "Tech Scaleup",
    comment:
      "My natural writing style was overly blunt, which created unintended friction with product managers. SpeakRight’s Diplomatic Rewrite style smoothed our roadmap alignment completely.",
    rating: 5,
    tag: "Leadership",
  },
  {
    name: "Aaliyah Chen",
    role: "Product Marketing Manager",
    affiliation: "SaaS",
    comment:
      "The salary negotiation rewrite was incredible. It removed all my self-deprecating filler words like 'just wondering' and framed my accomplishments with data. I secured a 15% increase with zero awkwardness.",
    rating: 5,
    tag: "Salary Review",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-white border-b border-slate-200/60 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3 border border-slate-200">
            <span>Social Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
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
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {t.tag}
                  </span>
                </div>

                <Quote className="w-5 h-5 text-slate-300 mb-2" />
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <h4 className="text-sm font-semibold text-slate-900">{t.name}</h4>
                <p className="text-xs text-slate-500">
                  {t.role} • <span className="text-slate-700 font-medium">{t.affiliation}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
