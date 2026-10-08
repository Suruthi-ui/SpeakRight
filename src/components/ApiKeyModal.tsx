"use client";

import React, { useState, useEffect } from "react";
import { Key, CheckCircle2, AlertCircle, ExternalLink, X, Shield, Sparkles } from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: (key: string) => void;
}

export function ApiKeyModal({ isOpen, onClose, onSaved }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("speakright_gemini_key") || "";
    }
    return "";
  });
  const [status, setStatus] = useState<"idle" | "testing" | "valid" | "invalid">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [hasEnvKey, setHasEnvKey] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Check if server already has GEMINI_API_KEY configured
    fetch("/api/test-key", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          setHasEnvKey(true);
        }
      })
      .catch(() => {});
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestAndSave = async () => {
    if (!apiKey.trim()) {
      setStatus("invalid");
      setStatusMessage("Please enter a valid Google AI Studio API key.");
      return;
    }

    setStatus("testing");
    setStatusMessage("Testing connection with Google Gemini...");

    try {
      const res = await fetch("/api/test-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      });
      const data = await res.json();

      if (data.valid) {
        setStatus("valid");
        setStatusMessage("API key is valid and connected!");
        localStorage.setItem("speakright_gemini_key", apiKey.trim());
        if (onSaved) onSaved(apiKey.trim());
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setStatus("invalid");
        setStatusMessage(data.message || "Failed to validate key with Gemini.");
      }
    } catch {
      setStatus("invalid");
      setStatusMessage("Network error validating API key.");
    }
  };

  const handleClear = () => {
    localStorage.removeItem("speakright_gemini_key");
    setApiKey("");
    setStatus("idle");
    setStatusMessage("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-elevated w-full max-w-lg rounded-[28px] p-6 sm:p-8 relative shadow-2xl border border-white/10 text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Google Gemini API Key</h3>
            <p className="text-xs text-slate-400">Powered by Google AI Studio</p>
          </div>
        </div>

        {hasEnvKey && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Server environment has an active Gemini key. You can also override it with your own key below.</span>
          </div>
        )}

        <p className="text-sm text-slate-300 mb-4 leading-relaxed">
          SpeakRight uses <strong className="text-white">Google Gemini 1.5 Flash</strong> for real-time tone analysis and communication rewrites. You can get a free API key from Google AI Studio.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              API Key (starts with AIzaSy...)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setStatus("idle");
              }}
              placeholder="Paste your Gemini API Key here..."
              className="glass-input w-full px-4 py-3 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          {status === "testing" && (
            <div className="flex items-center gap-2 text-xs text-indigo-300">
              <div className="w-3.5 h-3.5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
              <span>Verifying key with Gemini API...</span>
            </div>
          )}

          {status === "valid" && (
            <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {status === "invalid" && (
            <div className="p-3 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center gap-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium underline-offset-4 hover:underline"
            >
              <span>Get Free Key in Google AI Studio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {apiKey && (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-slate-400 hover:text-red-400 transition-colors"
              >
                Clear Key
              </button>
            )}
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 flex items-start gap-2 text-[11px] text-slate-400">
            <Shield className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              Your API key is stored locally in your browser&apos;s localStorage and passed securely to Gemini via encrypted API requests.
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-2xl text-xs font-medium text-slate-300 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleTestAndSave}
              disabled={status === "testing"}
              className="glass-button-primary px-5 py-2.5 rounded-2xl text-xs font-semibold text-white flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{status === "testing" ? "Verifying..." : "Save & Connect"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
