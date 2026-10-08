"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquareQuote, Sparkles, Key, Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import { ApiKeyModal } from "./ApiKeyModal";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const checkKey = () => {
      if (typeof window !== "undefined") {
        const key = localStorage.getItem("speakright_gemini_key");
        if (key) {
          setHasApiKey(true);
        } else {
          // Check server status
          fetch("/api/test-key", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) })
            .then((r) => r.json())
            .then((d) => {
              if (d.valid) setHasApiKey(true);
            })
            .catch(() => {});
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    checkKey();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#090b10]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-xl"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
                <MessageSquareQuote className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                    SpeakRight
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                    AI Coach
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Executive Communication</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
              <Link href="/#message-builder" className="hover:text-white transition-colors">
                Rewrite Tool
              </Link>
              <Link href="/#features" className="hover:text-white transition-colors">
                Coaching Engine
              </Link>
              <Link href="/#audience" className="hover:text-white transition-colors">
                Students &amp; Pros
              </Link>
              <Link href="/#whatsapp" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span>WhatsApp Beta</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                  New
                </span>
              </Link>
              <Link href="/dashboard" className="hover:text-white transition-colors">
                AI Dashboard
              </Link>
            </nav>

            {/* Right Action buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsKeyModalOpen(true)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-medium border transition-all ${
                  hasApiKey
                    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/25 hover:bg-emerald-500/20"
                    : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
                title="Configure Google Gemini API Key"
              >
                {hasApiKey ? (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Gemini Ready</span>
                  </>
                ) : (
                  <>
                    <Key className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Gemini Key</span>
                  </>
                )}
              </button>

              <Link
                href="/#message-builder"
                className="glass-button-primary px-4 py-2 rounded-2xl text-xs font-semibold text-white flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                <span>Rewrite Message</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/80" />
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setIsKeyModalOpen(true)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300"
                aria-label="API Key"
              >
                <Key className="w-4 h-4 text-indigo-400" />
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300"
                aria-label="Open menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel-elevated mx-4 mt-3 rounded-3xl p-5 border border-white/10 space-y-4 animate-fadeIn">
            <div className="flex flex-col space-y-3 text-sm font-medium text-slate-200">
              <Link
                href="/#message-builder"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/5"
              >
                Rewrite Tool
              </Link>
              <Link
                href="/#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/5"
              >
                Coaching Engine
              </Link>
              <Link
                href="/#audience"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/5"
              >
                Students &amp; Pros
              </Link>
              <Link
                href="/#whatsapp"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/5"
              >
                WhatsApp Pre-Send Beta
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/5"
              >
                AI Dashboard
              </Link>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsKeyModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-medium text-slate-200"
              >
                <Key className="w-3.5 h-3.5 text-indigo-400" />
                <span>{hasApiKey ? "Gemini Key Configured" : "Enter Google Gemini Key"}</span>
              </button>
              <Link
                href="/#message-builder"
                onClick={() => setMobileMenuOpen(false)}
                className="glass-button-primary w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold text-white"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Try Instant Rewrite</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onSaved={() => setHasApiKey(true)}
      />
    </>
  );
}
