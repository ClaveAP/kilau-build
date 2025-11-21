import React, { useState, useEffect } from "react";
import axios from "axios";

const PetaLokasi: React.FC = () => {
  const [mapUrl, setMapUrl] = useState<string>("");

  const convertToEmbedUrl = (url: string): string => {
    if (!url) return "";
    // Cek jika link pendek (tidak support embed)
    if (url.includes("maps.app.goo.gl")) return "";

    if (url.includes("/maps/embed")) return url;

    try {
      // Format: https://www.google.com/maps?q=lat,lng
      if (url.includes("?q=")) {
        const match = url.match(/[?&]q=([^&]+)/);
        if (match && match[1]) {
          return `https://www.google.com/maps?q=${match[1]}&hl=id&z=14&output=embed`;
        }
      }
      // Format: https://www.google.com/maps/@lat,lng,zoom (Paling umum)
      const match2 = url.match(/@([^,]+),([^,]+)/);
      if (match2) {
        return `https://www.google.com/maps?q=${match2[1]},${match2[2]}&hl=id&z=14&output=embed`;
      }

      // Jika tidak ada pola yang cocok, return kosong agar tidak blank
      return "";
    } catch (e) {
      return "";
    }
  };

  useEffect(() => {
    const fetchLokasi = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/contact");
        if (response.data.success && response.data.data.length > 0) {
          const data = response.data.data[0];
          if (data.link_gmaps) {
            setMapUrl(convertToEmbedUrl(data.link_gmaps));
          }
        }
      } catch (error) {
        console.error("Gagal mengambil peta lokasi:", error);
      }
    };

    fetchLokasi();
  }, []);

  // Jika URL hasil convert kosong (karena link pendek atau error), section ini disembunyikan
  if (!mapUrl) return null;

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
            src={mapUrl}
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
