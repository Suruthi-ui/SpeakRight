"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Elena Rostova",
    role: "Computer Science Ph.D. Candidate",
    affiliation: "UC Berkeley",
    comment:
      "I was terrified to email senior researchers about joining their lab. SpeakRight taught me how to highlight my background without sounding timid or arrogant. I received 3 replies within 24 hours.",
    rating: 5,
    tag: "Academic Outreach",
  },
  {
    name: "Marcus Vance",
    role: "Senior Engineering Lead",
    affiliation: "Tech Unicorn",
    comment:
      "My natural writing style was overly blunt, which created unintended tension with product managers. SpeakRight’s Diplomatic Rewrite style smoothed our roadmap debates and saved countless hours of friction.",
    rating: 5,
    tag: "Leadership",
  },
  {
    name: "Aaliyah Chen",
    role: "Associate Product Marketing Manager",
    affiliation: "SaaS Scaleup",
    comment:
      "The salary negotiation rewrite was game-changing. It removed all my self-deprecating filler words like 'just wondering' and framed my accomplishments with data. I secured a 15% increase with zero awkwardness.",
    rating: 5,
    tag: "Compensation Review",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden bg-radial-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Social Proof</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Trusted by Ambitious Communicators
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Over 45,000 students and professionals communicate with clarity, empathy, and conviction every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-[26px] p-7 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-white/5 text-indigo-300 border border-white/10">
                    {t.tag}
                  </span>
                </div>

                <Quote className="w-6 h-6 text-indigo-500/40 mb-3" />
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <h4 className="text-sm font-semibold text-white">{t.name}</h4>
                <p className="text-xs text-slate-400">
                  {t.role} • <span className="text-indigo-400">{t.affiliation}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
