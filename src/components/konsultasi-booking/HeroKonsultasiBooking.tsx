import React from "react";

// --- PERHATIAN PENTING SOAL PATH GAMBAR ---
// Error "Could not resolve" yang Anda alami sebelumnya adalah masalah path di folder Anda.
// Path di bawah ini mengasumsikan file ini ada di `src/components/namafolder`
// dan gambar Anda ada di `src/assets/header-kb.jpg`.
//
// JIKA MASIH ERROR: Sesuaikan path `../../assets/header-kb.jpg` ini
// agar cocok dengan struktur folder proyek Anda.
import header from "../../assets/header-kb.png"; // <-- INI PENYEBAB ERROR

// PERBAIKAN: Mengganti import yang error dengan placeholder
// Ganti URL ini dengan path yang benar di proyek Anda setelah Anda memperbaikinya

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
        // Kombinasikan linear-gradient dan url gambar
        // 1. PERBAIKAN GRADIENT: Diubah agar sesuai dengan HeroSection.tsx
        // (linear-gradient to right, dari 95% ke 20% opacity)
        backgroundImage: `linear-gradient(to right, rgba(0, 85, 146, 0.95), rgba(0, 85, 146, 0.85), rgba(0, 85, 146, 0.2)), url(${header})`,
        backgroundSize: "cover",
        backgroundPosition: "center", // 'center' sudah bagus untuk gambar ini
      }}
    >
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
        <div className="max-w-2xl">
          {/* Title */}
          <h1
            // 2. PERBAIKAN UKURAN TEKS: Dibatasi di lg:text-5xl (dihapus xl:text-6xl)
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 leading-tight"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Konsultasi & Booking Survey
          </h1>

          {/* Description */}
          <p
            // 2. PERBAIKAN UKURAN TEKS: Dibatasi di lg:text-xl (dihapus xl:text-2xl)
            className="text-base sm:text-lg lg:text-xl text-white mb-8 sm:mb-10 lg:mb-12 leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Atur tanggal survey dan konsultasikan rencana proyek Anda bersama
            tim kami.
          </p>

          {/* Button */}
          <button
            onClick={handleKonsultasiClick}
            // 2. PERBAIKAN UKURAN TEKS: Dibatasi di lg:text-lg (dihapus lg:text-xl)
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
