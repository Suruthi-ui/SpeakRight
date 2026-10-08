"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquareQuote, Menu, X, ArrowRight, Sparkles } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/90 py-3 shadow-sm shadow-slate-900/5"
          : "bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/25 group-hover:scale-105 group-hover:shadow-indigo-500/40 transition-all duration-200">
              <MessageSquareQuote className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  SpeakRight
                </span>
                <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-xs">
                  AI Coach
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-600">
            <Link href="/#message-builder" className="hover:text-indigo-600 transition-colors">
              Rewrite Tool
            </Link>
            <Link href="/#features" className="hover:text-indigo-600 transition-colors">
              Features
            </Link>
            <Link href="/#audience" className="hover:text-indigo-600 transition-colors">
              Use Cases
            </Link>
            <Link href="/#whatsapp" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
              <span>WhatsApp</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                Beta
              </span>
            </Link>
            <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">
              Dashboard
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/60 transition-colors"
            >
              Live Demo
            </Link>

            <Link
              href="/#message-builder"
              className="minimal-button-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rewrite Message</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white mx-4 mt-2 rounded-2xl p-4 border border-slate-200 shadow-xl space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            <Link
              href="/#message-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-indigo-50/60 hover:text-indigo-600 transition-colors"
            >
              Rewrite Tool
            </Link>
            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-indigo-50/60 hover:text-indigo-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#audience"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-indigo-50/60 hover:text-indigo-600 transition-colors"
            >
              Use Cases
            </Link>
            <Link
              href="/#whatsapp"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors flex items-center justify-between"
            >
              <span>WhatsApp Beta</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                Integration
              </span>
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-indigo-50/60 hover:text-indigo-600 transition-colors"
            >
              AI Dashboard
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/#message-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="minimal-button-primary w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-center"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rewrite Message</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
