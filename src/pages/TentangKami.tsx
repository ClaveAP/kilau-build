import React from "react";
import HeroTentangKami from "../components/tentang-kami/HeroTentangKami";
import StatsTentangKami from "../components/tentang-kami/StatsTentangKami";
import FeaturesSection from "../components/tentang-kami/FeaturesSection";
import VisiMisiSection from "../components/tentang-kami/VisiMisiSection";
import OwnerSection from "../components/tentang-kami/OwnerSection";

const TentangKami: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen">
      <HeroTentangKami />
      <StatsTentangKami />
      <FeaturesSection />
      <VisiMisiSection />
      <OwnerSection />
    </div>
  );
};

export default TentangKami;
