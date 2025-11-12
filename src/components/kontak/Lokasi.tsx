import React from "react";

const PetaLokasi: React.FC = () => {
  // --- GANTI URL DI BAWAH INI ---
  // Cara mendapatkan URL:
  // 1. Buka Google Maps.
  // 2. Cari lokasi Anda.
  // 3. Klik "Share" (Bagikan).
  // 4. Pilih tab "Embed a map" (Sematkan peta).
  // 5. Klik "Copy HTML".
  // 6. Ambil HANYA URL yang ada di dalam src="..." (yang ada di antara tanda kutip)
  // 7. Tempel (paste) URL tersebut di sini.
  const MAP_EMBED_URL =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.602838692637!2d106.80404899999999!3d-6.4450115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e92ce61a47ef%3A0x4a71e1bb8f782d09!2sKILAU%20BUILD%20%7C%20Jasa%20Konstruksi%2C%20Interior%2C%20dan%20Design%20Terpercaya!5e0!3m2!1sen!2sid!4v1762973176968!5m2!1sen!2sid%22%20width=%22600%22%20height=%22450%22%20style=%22border:0;%22%20allowfullscreen=%22%22%20loading=%22lazy%22%20referrerpolicy=%22no-referrer-when-downgrade"; // GANTI DENGAN URL EMBED GOOGLE MAPS ANDA

  return (
    // Section utama
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Teks */}
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#005592] mb-4"
            // Menggunakan font Roboto agar konsisten dengan permintaan Anda sebelumnya
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

        {/* Kontainer Peta */}
        {/* Menggunakan 'aspect-video' (16:9) untuk membuat iframe responsif.
          'max-w-6xl' membatasi lebar di layar sangat besar agar tidak terlalu lebar.
        */}
        <div className="w-full max-w-6xl mx-auto aspect-video">
          <iframe
            src={MAP_EMBED_URL}
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
