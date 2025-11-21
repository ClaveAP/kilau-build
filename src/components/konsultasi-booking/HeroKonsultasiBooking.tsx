import React from "react";
import header from "../../assets/header-kb.png";

interface HeroKonsultasiBookingProps {}

const HeroKonsultasiBooking: React.FC<HeroKonsultasiBookingProps> = () => {
  const handleKonsultasiClick = () => {
    const message = "Halo admin Kilau, saya mau konsultasi !";
    const whatsappUrl = `https://wa.me/6287776360795?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section
      className="relative w-full h-[400px] sm:h-[500px] md:h-[565px] flex items-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 85, 146, 0.95), rgba(0, 85, 146, 0.85), rgba(0, 85, 146, 0.2)), url(${header})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
        <div className="max-w-2xl">
          {/* Title */}
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 leading-tight"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Konsultasi & Booking Survey
          </h1>

          {/* Description */}
          <p
            className="text-base sm:text-lg lg:text-xl text-white mb-8 sm:mb-10 lg:mb-12 leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Atur tanggal survey dan konsultasikan rencana proyek Anda bersama
            tim kami.
          </p>

          {/* Button */}
          <button
            onClick={handleKonsultasiClick}
            className="inline-block bg-[#CCE6F6] text-[#005592] px-8 sm:px-10 lg:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:bg-[#B8D9EE] transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Konsultasi Sekarang!
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroKonsultasiBooking;
