import { I18nProvider } from "@/lib/i18n";
import { fetchContent, getContent, type ContentMap } from "@/lib/content";
import { SHEET_CSV_URL_SK, SHEET_CSV_URL_EN } from "@/lib/config";
import skMessages from "@/messages/sk.json";
import enMessages from "@/messages/en.json";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatIsLBVSection from "@/components/WhatIsLBVSection";
import QuoteSection from "@/components/QuoteSection";
import FourPillarsSection from "@/components/FourPillarsSection";
import MyStorySection from "@/components/MyStorySection";
import PersonalCoachingSection from "@/components/PersonalCoachingSection";
import OnlineCoachingSection from "@/components/OnlineCoachingSection";
import TransformationsSection from "@/components/TransformationsSection";
import CtaBand from "@/components/CtaBand";
import FoodEasyDietSection from "@/components/FoodEasyDietSection";
import FinancingSection from "@/components/FinancingSection";
import CommunitySection from "@/components/CommunitySection";
import CorporateSection from "@/components/CorporateSection";
import InstagramSection from "@/components/InstagramSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

/**
 * The canonical sheet-driven keys are the flat, top-level string values in
 * messages/*.json — everything else (nav, footer, headings, etc.) is a
 * nested object and stays locked in code. This is the JSON-baked fallback
 * layer: it's what renders when the sheet is empty, unreachable, or missing
 * a key, so the site never depends on network access to be complete.
 */
function extractFallback(messages: Record<string, unknown>): ContentMap {
  const fallback: ContentMap = {};
  for (const [key, value] of Object.entries(messages)) {
    if (typeof value === "string") fallback[key] = value;
  }
  return fallback;
}

export default async function Home() {
  const [sheetSk, sheetEn] = await Promise.all([
    fetchContent(SHEET_CSV_URL_SK),
    fetchContent(SHEET_CSV_URL_EN),
  ]);

  const contentSk = getContent(sheetSk, extractFallback(skMessages));
  const contentEn = getContent(sheetEn, extractFallback(enMessages));

  return (
    <I18nProvider contentSk={contentSk} contentEn={contentEn}>
      <main className="overflow-x-hidden bg-white">
        <Navbar />
        <HeroSection />
        <WhatIsLBVSection />
        <QuoteSection />
        <FourPillarsSection />
        <MyStorySection />
        <PersonalCoachingSection />
        <OnlineCoachingSection />
        <TransformationsSection />
        <CtaBand variant="cta1" />
        <FoodEasyDietSection />
        <FinancingSection />
        <CommunitySection />
        <CorporateSection />
        <CtaBand variant="cta2" />
        <InstagramSection />
        <TestimonialsSection />
        <FinalCtaSection />
        <ContactSection />
        <Footer />
      </main>
    </I18nProvider>
  );
}
