// src/components/home/LocationSection.tsx (Versi Gambar Lokal)

import React from "react";

// 🔽 1. IMPORT GAMBAR LOKASI.JPG KAMU DARI ASSETS
import BgLokasi from "../../assets/lokasi.jpg"; // Path dari 'src/components/home' ke 'src/assets'

// 🔽 2. GANTI LINK GOOGLE MAPS-NYA DI SINI
const GmapsURL = "https://maps.app.goo.gl/ABCDEFG12345";

// (Variabel Unsplash sudah dihapus)

const LocationSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Kolom Kiri: Teks */}
          <div className="text-left">
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#005592] mb-6"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Office Location
            </h2>
            <p
              className="text-base sm:text-lg text-gray-700 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Kantor kami berlokasi strategis dan mudah diakses. Silakan
              kunjungi kami di alamat berikut untuk mendapatkan informasi lebih
              lengkap, berdiskusi langsung, atau menjalin kerja sama bersama tim
              kami.
            </p>
          </div>

          {/* Kolom Kanan: Peta (Versi Gambar) */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-lg border-4 border-[#005592] rounded-2xl p-4 sm:p-6 shadow-lg">
              {/* Link Google Maps yang membungkus gambar peta */}
              <a
                href={GmapsURL}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
              >
                {/* 🔽 3. DIV INI SEKARANG PAKAI BACKGROUND DARI 'lokasi.jpg' 🔽 */}
                <div
                  className="relative aspect-4/3 flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${BgLokasi})`, // <-- Menggunakan gambar import
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Overlay gelap tipis agar tulisan terbaca */}
                  <div className="absolute inset-0 bg-black/20"></div>

                  {/* Ikon Pin & Teks (tetap di atas) */}
                  <div className="relative text-center z-10">
                    <svg
                      className="w-10 h-10 text-white mx-auto" // Ganti jadi putih biar kontras
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="mt-1 text-sm font-medium text-gray-800 bg-white/90 px-2 py-0.5 rounded shadow">
                      Lokasi Kami
                    </span>
                  </div>
                </div>
              </a>

              {/* Teks Alamat di bawah peta */}
              <p
                className="text-center text-sm sm:text-base text-gray-700 mt-4"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Jl. Raya Citayam No.34, RT./Rw.001/004, Pd. Jaya, Kec. Cipayung,
                Kota Depok, Jawa Barat 16444
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
