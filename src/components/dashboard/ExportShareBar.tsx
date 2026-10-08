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
        spread: 50,
        origin: { y: 0.6 },
        colors: ["#4f46e5", "#10b981", "#7c3aed"],
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
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xl shadow-indigo-500/5 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">Actions &amp; Export Center</h4>
          <p className="text-xs text-slate-500 font-normal">
            Export professional PDF report or test WhatsApp pre-send filter
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap">
        {/* WhatsApp Pre-Send Simulator */}
        <button
          type="button"
          onClick={onOpenWhatsAppSimulator}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-600/25 active:scale-95"
        >
          <MessageCircle className="w-4 h-4 text-white" />
          <span>WhatsApp Preview</span>
        </button>

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 text-xs font-bold text-slate-800 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-600" />
              <span>Copy Message</span>
            </>
          )}
        </button>

        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 text-xs font-bold text-slate-800 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
        >
          {shareSuccess ? (
            <>
              <Check className="w-4 h-4 text-indigo-600" />
              <span className="text-indigo-700">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-slate-600" />
              <span>Share</span>
            </>
          )}
        </button>

        {/* Download PDF Button */}
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          className="minimal-button-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>{isGeneratingPdf ? "Generating..." : "Download PDF Report"}</span>
        </button>
      </div>
    </div>
  );
}
