"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CommunicationAnalysis } from "@/types/communication";
import { SAMPLE_SCENARIOS } from "@/lib/sampleData";
import { LoadingAnalysis } from "@/components/dashboard/LoadingAnalysis";
import { CommunicationScoreCard } from "@/components/dashboard/CommunicationScoreCard";
import { ToneRadar } from "@/components/dashboard/ToneRadar";
import { BeforeAfterComparison } from "@/components/dashboard/BeforeAfterComparison";
import { AiExplanationCard } from "@/components/dashboard/AiExplanationCard";
import { LearningTipsCard } from "@/components/dashboard/LearningTipsCard";
import { AlternativeRewrites } from "@/components/dashboard/AlternativeRewrites";
import { QuickTuneBar } from "@/components/dashboard/QuickTuneBar";
import { ExportShareBar } from "@/components/dashboard/ExportShareBar";
import { WhatsAppSimulatorModal } from "@/components/dashboard/WhatsAppSimulatorModal";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ArrowLeft,
  AlertCircle,
  Key,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";

function DashboardContent() {
  const searchParams = useSearchParams();
  const autoAnalyze = searchParams.get("auto") === "true";

  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<CommunicationAnalysis | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = sessionStorage.getItem("speakright_latest_analysis");
        if (cached) return JSON.parse(cached);
      } catch {}
    }
    return null;
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  // Active message draft state initialized lazily
  const [currentDraft, setCurrentDraft] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const storedDraftRaw = sessionStorage.getItem("speakright_active_draft");
        if (storedDraftRaw) return JSON.parse(storedDraftRaw);
      } catch {}
    }
    return {
      message: SAMPLE_SCENARIOS[0].draft,
      recipient: SAMPLE_SCENARIOS[0].recipient as string,
      situation: SAMPLE_SCENARIOS[0].situation,
      desiredTone: SAMPLE_SCENARIOS[0].desiredTone as string,
    };
  });

  const performAnalysis = useCallback(
    async (params: {
      message: string;
      recipient: string;
      situation: string;
      desiredTone?: string;
    }) => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const storedKey =
          typeof window !== "undefined"
            ? localStorage.getItem("speakright_gemini_key") || ""
            : "";

        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (storedKey) {
          headers["x-gemini-api-key"] = storedKey;
        }

        const res = await fetch("/api/analyze", {
          method: "POST",
          headers,
          body: JSON.stringify(params),
        });

        const data = await res.json();

        if (res.ok && data.success && data.data) {
          setAnalysis(data.data);
          // Store in sessionStorage as latest analysis cache
          if (typeof window !== "undefined") {
            sessionStorage.setItem("speakright_latest_analysis", JSON.stringify(data.data));
          }
        } else {
          setErrorMessage(
            data.error || "Failed to analyze message. Please verify your Gemini API key."
          );
        }
      } catch (err: unknown) {
        const error = err as Error;
        setErrorMessage(error.message || "Network error communicating with SpeakRight AI Engine.");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const hasTriggeredRef = React.useRef(false);

  useEffect(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    if (autoAnalyze || !analysis) {
      const timer = setTimeout(() => {
        performAnalysis(currentDraft);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [autoAnalyze, analysis, currentDraft, performAnalysis]);

  const handleReAnalyze = (params: {
    message: string;
    recipient: string;
    situation: string;
    desiredTone: string;
  }) => {
    setCurrentDraft(params);
    performAnalysis(params);
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col justify-between selection:bg-indigo-500/30">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Navigation Breadcrumb / Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
              title="Return to Landing Page"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                  AI Communication Dashboard
                </h1>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                  Live Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Personalized linguistic coaching calibrated for {currentDraft.recipient}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsKeyModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Key className="w-3.5 h-3.5 text-indigo-400" />
              <span>API Key Settings</span>
            </button>

            <Link
              href="/#message-builder"
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-xs font-semibold text-indigo-300 flex items-center gap-1.5 transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>New Draft</span>
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="glass-panel-elevated rounded-[32px] p-8 sm:p-12 border border-white/10 shadow-2xl">
            <LoadingAnalysis
              recipient={currentDraft.recipient}
              situation={currentDraft.situation}
            />
          </div>
        )}

        {/* Error State */}
        {!isLoading && errorMessage && (
          <div className="glass-panel-elevated rounded-[28px] p-8 border border-red-500/30 text-center max-w-2xl mx-auto space-y-4 my-8">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500/30">
              <AlertCircle className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-white">Unable to Complete Analysis</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{errorMessage}</p>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsKeyModalOpen(true)}
                className="glass-button-primary px-5 py-2.5 rounded-2xl text-xs font-semibold text-white flex items-center gap-2 cursor-pointer"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Configure Google AI Studio Key</span>
              </button>

              <button
                type="button"
                onClick={() => performAnalysis(currentDraft)}
                className="px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            </div>
          </div>
        )}

        {/* Active Analysis Results Display */}
        {!isLoading && !errorMessage && analysis && (
          <div className="space-y-8 animate-fadeIn">
            {/* Quick Context & Re-Tune Bar */}
            <QuickTuneBar
              initialMessage={currentDraft.message}
              initialRecipient={currentDraft.recipient}
              initialSituation={currentDraft.situation}
              initialTone={currentDraft.desiredTone}
              onReAnalyze={handleReAnalyze}
              isLoading={isLoading}
            />

            {/* Top Row: Score Card & Tone Radar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 flex">
                <div className="w-full">
                  <CommunicationScoreCard analysis={analysis} />
                </div>
              </div>

              <div className="lg:col-span-6 flex">
                <div className="w-full">
                  <ToneRadar tones={analysis.tones} />
                </div>
              </div>
            </div>

            {/* Middle Row: Before vs Improved Message (The Core Transformation) */}
            <BeforeAfterComparison analysis={analysis} />

            {/* Action Bar (Copy, PDF Download, Share, WhatsApp Simulator) */}
            <ExportShareBar
              analysis={analysis}
              onOpenWhatsAppSimulator={() => setIsWhatsAppModalOpen(true)}
            />

            {/* Lower Row: AI Linguistic Explanation */}
            <AiExplanationCard analysis={analysis} />

            {/* Actionable Learning Tips */}
            <LearningTipsCard tips={analysis.learningTips} />

            {/* Three Alternative Rewrites */}
            <AlternativeRewrites rewrites={analysis.alternativeRewrites} />
          </div>
        )}
      </main>

      <Footer />

      {/* WhatsApp Simulator Modal */}
      {analysis && (
        <WhatsAppSimulatorModal
          isOpen={isWhatsAppModalOpen}
          onClose={() => setIsWhatsAppModalOpen(false)}
          analysis={analysis}
        />
      )}

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onSaved={() => {
          performAnalysis(currentDraft);
        }}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#090b10] flex items-center justify-center text-white">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Loading SpeakRight Dashboard...</span>
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
