import React from "react";
import Header from "../../assets/header.png";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[400px] sm:h-[500px] md:h-[565px] overflow-hidden">
      {/* Background Image */}
      <img
        src={Header}
        alt="Construction background"
        // 🔽 REVISI: 'object-cover' ditambahin 'object-top' 🔽
        // Ini akan "maksa" bagian atas gambar tetap kelihatan
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-[#005592]/95 via-[#005592]/85 to-[#005592]/20"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <div className="max-w-3xl">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 sm:mb-6"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Bangun Dulu Baru Bayar
            </h1>
            <p
              className="text-lg sm:text-xl md:text-[22px] mb-6 sm:mb-8 font-light"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Solusi terbaik untuk membangun atau merenovasi rumah impian anda
            </p>

            {/* Link WA (tetap sama) */}
            <a
              href="https://wa.me/6287776360795?text=Halo%20admin%20Kilau,%20saya%20mau%20booking%21"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#66B2E0] text-white px-6 sm:px-8 py-2 rounded-lg text-base sm:text-lg font-medium hover:opacity-90 transition-all duration-300 shadow-lg"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
