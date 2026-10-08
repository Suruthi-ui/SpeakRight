"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CommunicationAnalysis } from "@/types/communication";
import { SAMPLE_SCENARIOS } from "@/lib/sampleData";
import { analyzeCommunicationNative } from "@/lib/analyzer";
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
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ArrowLeft,
  AlertCircle,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
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
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params),
        });

        const data = await res.json();

        if (res.ok && data.success && data.data) {
          setAnalysis(data.data);
          if (typeof window !== "undefined") {
            sessionStorage.setItem("speakright_latest_analysis", JSON.stringify(data.data));
          }
        } else {
          // Native fallback
          const nativeResult = analyzeCommunicationNative(params);
          setAnalysis(nativeResult);
        }
      } catch {
        // Safe offline native fallback
        const nativeResult = analyzeCommunicationNative(params);
        setAnalysis(nativeResult);
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
    <div className="min-h-screen bg-[#fafafa] text-slate-900 flex flex-col justify-between selection:bg-slate-200">
      <Navbar />

      <main className="flex-grow pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-colors shadow-xs"
              title="Return to Landing Page"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  AI Communication Dashboard
                </h1>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Native Coach Active
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Calibrated for {currentDraft.recipient}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => performAnalysis(currentDraft)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Re-run Analysis</span>
            </button>

            <Link
              href="/#message-builder"
              className="minimal-button-primary px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>New Draft</span>
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
            <LoadingAnalysis
              recipient={currentDraft.recipient}
              situation={currentDraft.situation}
            />
          </div>
        )}

        {/* Error State */}
        {!isLoading && errorMessage && (
          <div className="bg-white rounded-3xl p-8 border border-rose-200 text-center max-w-xl mx-auto space-y-4 my-8 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mx-auto border border-rose-200">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">Analysis Error</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{errorMessage}</p>

            <div className="pt-2 flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => performAnalysis(currentDraft)}
                className="minimal-button-primary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Retry Analysis</span>
              </button>
            </div>
          </div>
        )}

        {/* Active Analysis Results Display */}
        {!isLoading && !errorMessage && analysis && (
          <div className="space-y-6 animate-fadeIn">
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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

            {/* Before vs Improved Message */}
            <BeforeAfterComparison analysis={analysis} />

            {/* Action Bar (Copy, PDF Download, Share, WhatsApp Simulator) */}
            <ExportShareBar
              analysis={analysis}
              onOpenWhatsAppSimulator={() => setIsWhatsAppModalOpen(true)}
            />

            {/* Linguistic Explanation */}
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
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center text-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-medium text-slate-600">Loading SpeakRight Dashboard...</span>
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
