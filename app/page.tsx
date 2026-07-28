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

export default function Home() {
  return (
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
  );
}
