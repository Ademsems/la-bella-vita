import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import QuoteSection from "@/components/QuoteSection";
import FourPillarsSection from "@/components/FourPillarsSection";
import AboutSection from "@/components/AboutSection";
import TransformationsSection from "@/components/TransformationsSection";
import CtaBand from "@/components/CtaBand";
import HowIWorkSection from "@/components/HowIWorkSection";
import FoodSection from "@/components/FoodSection";
import FinancingSection from "@/components/FinancingSection";
import EventsSection from "@/components/EventsSection";
import CorporateSection from "@/components/CorporateSection";
import InstagramSection from "@/components/InstagramSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-white">
      <Navbar />
      <HeroSection />
      <QuoteSection />
      <FourPillarsSection />
      <AboutSection />
      <TransformationsSection />
      <CtaBand variant="cta1" />
      <HowIWorkSection />
      <FoodSection />
      <FinancingSection />
      <EventsSection />
      <CtaBand variant="cta2" />
      <CorporateSection />
      <InstagramSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
