import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpeakRight – AI Communication Coach | Executive & Respectful Rewrites",
  description:
    "Transform hesitant, blunt, or over-apologetic drafts into articulate, confident, and respectful communication in seconds. Built for students, managers, and professionals.",
  keywords: [
    "AI Communication Coach",
    "Email Rewriter",
    "Professional Communication",
    "Student Email to Professor",
    "Salary Negotiation Email",
    "Executive Presence",
    "Tone Analyzer",
    "WhatsApp AI Rewrite",
  ],
  authors: [{ name: "SpeakRight" }],
  openGraph: {
    title: "SpeakRight – AI Communication Coach",
    description:
      "Say what you mean, command the respect you deserve. Real-time tone calibration and multi-style rewrites.",
    siteName: "SpeakRight",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fafafa] text-slate-900 selection:bg-slate-200 selection:text-slate-900">
        {children}
      </body>
    </html>
  );
}
