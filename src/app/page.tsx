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
    <div className="min-h-screen bg-[#fafafa] text-slate-900 flex flex-col justify-between">
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
