import React from "react";
// Import Data dan Helper
import {
  MOCK_KONTAK_DATA,
  getContactByType,
  convertToEmbedUrl,
} from "../../mocks/contact.mock";

const PetaLokasi: React.FC = () => {
  // Ambil data lokasi dari Mock Data
  const lokasiData = getContactByType(MOCK_KONTAK_DATA, "lokasi");

  // Convert URL (Menjaga kompatibilitas jika Admin input link biasa)
  const mapUrl = lokasiData?.mapsUrl
    ? convertToEmbedUrl(lokasiData.mapsUrl)
    : ""; // Fallback jika kosong

  if (!mapUrl) return null; // Jangan render section jika tidak ada URL map

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#005592] mb-4"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Lihat Peta Lokasi
          </h2>
          <p
            className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Kunjungi kantor kami dengan mudah melalui peta di bawah ini.
          </p>
        </div>

        <div className="w-full max-w-6xl mx-auto aspect-video">
          <iframe
            src={mapUrl} // Menggunakan URL dinamis dari Mock Data
            className="w-full h-full border-2 border-gray-200 rounded-3xl shadow-sm"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Peta Lokasi Kantor"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default PetaLokasi;
