import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import HowIWorkSection from "@/components/HowIWorkSection";
import FoodSection from "@/components/FoodSection";
import FinancingSection from "@/components/FinancingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CommunitySection from "@/components/CommunitySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <HowIWorkSection />
      <FoodSection />
      <FinancingSection />
      <TestimonialsSection />
      <CommunitySection />
      <ContactSection />
      <Footer />
    </main>
  );
}
