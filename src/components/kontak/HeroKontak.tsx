// src/components/konsultasi-booking/HeroKonsultasiBooking.tsx
import React from "react";
import header from "../../assets/header-hk.png"; // Ganti dengan path gambar yang sesuai

const HeroKonsultasiBooking: React.FC = () => {
  return (
    <section
      className="relative text-white"
      style={{
        backgroundImage: `url(${header})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#005592]/75"></div>

      {/* Content */}
      <div className="relative z-10 py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Judul */}
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-bold mb-6 leading-tight"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Contact Us
          </h1>

          {/* Deskripsi */}
          <p
            className="text-base sm:text-lg lg:text-xl mb-10 max-w-4xl mx-auto leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Hubungi kami untuk informasi lebih lanjut mengenai layanan Kilau
            Build.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroKonsultasiBooking;
