import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { MessageBuilder } from "@/components/landing/MessageBuilder";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { AudienceShowcase } from "@/components/landing/AudienceShowcase";
import { WhatsAppPreviewSection } from "@/components/landing/WhatsAppPreviewSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { FaqSection } from "@/components/landing/FaqSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 selection:bg-indigo-500/30 selection:text-white flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <MessageBuilder />
        <FeaturesGrid />
        <AudienceShowcase />
        <WhatsAppPreviewSection />
        <Testimonials />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
