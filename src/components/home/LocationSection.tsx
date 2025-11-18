import React from "react";
// 1. Import Mock Data & Helper
import {
  MOCK_KONTAK_DATA,
  getContactByType,
  convertToEmbedUrl,
} from "../../mocks/contact.mock";

const LocationSection: React.FC = () => {
  // 2. Ambil data lokasi dari Mock Data
  const lokasiData = getContactByType(MOCK_KONTAK_DATA, "lokasi");

  // 3. Convert URL agar aman masuk ke iframe
  // Jika admin input link share biasa, fungsi ini akan mengubahnya jadi embed link
  const mapUrl = lokasiData?.mapsUrl
    ? convertToEmbedUrl(lokasiData.mapsUrl)
    : "";

  // Fallback jika alamat kosong
  const displayAddress = lokasiData?.value || "Alamat belum tersedia.";

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

          {/* Kolom Kanan: Peta & Alamat Dinamis */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-lg border-4 border-[#005592] rounded-2xl p-4 sm:p-6 shadow-lg">
              {/* Container Peta */}
              <div className="block rounded-lg overflow-hidden aspect-4/3 bg-gray-100">
                {mapUrl ? (
                  <iframe
                    src={mapUrl}
                    className="w-full h-full border-0"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Peta Lokasi Kantor"
                  ></iframe>
                ) : (
                  // Tampilan jika URL Peta kosong / error
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Peta tidak tersedia
                  </div>
                )}
              </div>

              {/* Alamat Dinamis dari Mock Data */}
              <p
                className="text-center text-sm sm:text-base text-gray-700 mt-4"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {displayAddress}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
