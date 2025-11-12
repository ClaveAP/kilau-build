import React from "react";
import HeroKontak from "../components/kontak/HeroKontak";
import HubungiKami from "../components/kontak/HubungiKami";
import Lokasi from "../components/kontak/Lokasi";

const Kontak: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen">
      <HeroKontak />
      <HubungiKami />
      <Lokasi />
    </div>
  );
};

export default Kontak;
