import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationSection: React.FC = () => {
  const [locationData, setLocationData] = useState<{
    address: string;
    mapUrl: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const convertToEmbedUrl = (url: string): string => {
    if (!url) return "";

    if (url.includes("maps.app.goo.gl")) return "";

    if (url.includes("/maps/embed")) return url;

    try {
      if (url.includes("?q=")) {
        const match = url.match(/[?&]q=([^&]+)/);
        if (match && match[1]) {
          return `https://www.google.com/maps?q=${match[1]}&hl=id&z=14&output=embed`;
        }
      }

      const match2 = url.match(/@([^,]+),([^,]+)/);
      if (match2) {
        return `https://www.google.com/maps?q=${match2[1]},${match2[2]}&hl=id&z=14&output=embed`;
      }

      return "";
    } catch (e) {
      return "";
    }
  };

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/contact");
        if (response.data.success && response.data.data.length > 0) {
          const data = response.data.data[0];

          setLocationData({
            address: data.alamat || "Alamat belum tersedia.",
            mapUrl: convertToEmbedUrl(data.link_gmaps),
          });
        }
      } catch (error) {
        console.error("Gagal mengambil data lokasi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContact();
  }, []);

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

          {/* Kolom Kanan: Peta & Alamat */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-lg border-4 border-[#005592] rounded-2xl p-4 sm:p-6 shadow-lg">
              {/* Container Peta */}
              <div className="block rounded-lg overflow-hidden aspect-4/3 bg-gray-100 relative">
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Memuat peta...
                  </div>
                ) : locationData?.mapUrl ? (
                  <iframe
                    src={locationData.mapUrl}
                    className="w-full h-full border-0"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Peta Lokasi Kantor"
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 text-sm p-4 text-center">
                    <p>Peta tidak tersedia.</p>
                    <p className="text-xs mt-1">
                      (Pastikan Admin input URL lengkap dari address bar)
                    </p>
                  </div>
                )}
              </div>

              {/* Alamat */}
              <p
                className="text-center text-sm sm:text-base text-gray-700 mt-4"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {isLoading
                  ? "Memuat alamat..."
                  : locationData?.address || "Alamat belum diatur."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
