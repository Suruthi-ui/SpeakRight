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
        particleCount: 35,
        spread: 50,
        origin: { y: 0.6 },
        colors: ["#0f172a", "#059669"],
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
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">Actions &amp; Export</h4>
          <p className="text-xs text-slate-500">
            Download PDF report or preview pre-send rewrite in WhatsApp
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {/* WhatsApp Pre-Send Simulator */}
        <button
          type="button"
          onClick={onOpenWhatsAppSimulator}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>WhatsApp Preview</span>
        </button>

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Copied!</span>
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
          className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          {shareSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-slate-800" />
              <span>Copied!</span>
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
          className="minimal-button-primary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isGeneratingPdf ? "Generating..." : "Download PDF"}</span>
        </button>
      </div>
    </div>
  );
}
