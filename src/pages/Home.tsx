// src/pages/Home.tsx (Versi Final Rapi + Dinamis dari Mock Data)

import React from "react";

// Import semua 'kepingan LEGO' kita
import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import FeaturesSection from "../components/home/FeaturesSection";
import HomeServicesSection from "../components/home/ServicesSection";
import HomePortfolioSection from "../components/home/PortfolioSection";
import ProcessFlowSection from "../components/home/ProcessFlowSection";
import BookingSection from "../components/home/BookingSection";
import LocationSection from "../components/home/LocationSection";
import SocialSection from "../components/home/SocialSection";
import FaqSection from "../components/home/FaqSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
const Home: React.FC = () => {
  return (
    // 'pt-20' ini asumsi dari header/navbar kamu
    <main className="pt-20">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <HomeServicesSection />
      <HomePortfolioSection />
      <ProcessFlowSection />
      <BookingSection />
      <LocationSection />
      <SocialSection />
      <FaqSection />
      <TestimonialsSection />
    </main>
  );
};

export default Home;
