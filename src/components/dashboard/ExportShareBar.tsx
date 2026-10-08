"use client";

import React, { useState } from "react";
import { CommunicationAnalysis } from "@/types/communication";
import { generateCommunicationPdf } from "@/lib/pdfGenerator";
import {
  Download,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";

interface Props {
  analysis: CommunicationAnalysis;
  onOpenWhatsAppSimulator: () => void;
}

export function ExportShareBar({ analysis, onOpenWhatsAppSimulator }: Props) {
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(analysis.primaryImprovement.improvedMessage);
    setCopied(true);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#10b981"],
      });
    } catch {}

    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    try {
      generateCommunicationPdf(analysis);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "SpeakRight Communication Coaching Report",
      text: `SpeakRight AI Score: ${analysis.overallScore}/100\nRecipient: ${analysis.recipient}\n\nImproved Message:\n"${analysis.primaryImprovement.improvedMessage}"`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch {
        // User cancelled or share failed, fallback to copy
        fallbackShareCopy();
      }
    } else {
      fallbackShareCopy();
    }
  };

  const fallbackShareCopy = () => {
    const textToShare = `✨ SpeakRight AI Coaching Report\nRecipient: ${analysis.recipient}\nSituation: ${analysis.situation}\nScore: ${analysis.overallScore}/100\n\nImproved Message:\n${analysis.primaryImprovement.improvedMessage}\n\nCalibrated via SpeakRight AI Coach`;
    navigator.clipboard.writeText(textToShare);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2500);
  };

  return (
    <div className="glass-panel-elevated rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Action &amp; Export Center</h4>
          <p className="text-xs text-slate-400">
            Download executive PDF report or test in WhatsApp pre-send simulator
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap">
        {/* WhatsApp Pre-Send Simulator */}
        <button
          type="button"
          onClick={onOpenWhatsAppSimulator}
          className="px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp Simulator</span>
        </button>

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Message</span>
            </>
          )}
        </button>

        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          {shareSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-indigo-400">Report Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </>
          )}
        </button>

        {/* Download PDF Button */}
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          className="glass-button-primary px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isGeneratingPdf ? "Generating..." : "Download PDF"}</span>
        </button>
      </div>
    </div>
  );
}
