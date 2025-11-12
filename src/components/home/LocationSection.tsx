import React from "react";

// 🔽 1. GANTI LINK GOOGLE MAPS EMBED-NYA DI SINI 🔽
// Cara mendapatkan URL:
// 1. Buka Google Maps.
// 2. Cari lokasi Anda.
// 3. Klik "Share" (Bagikan).
// 4. Pilih tab "Embed a map" (Sematkan peta).
// 5. Klik "Copy HTML".
// 6. Ambil HANYA URL yang ada di dalam src="..." (yang ada di antara tanda kutip)
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.602838692637!2d106.80404899999999!3d-6.4450115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e92ce61a47ef%3A0x4a71e1bb8f782d09!2sKILAU%20BUILD%20%7C%20Jasa%20Konstruksi%2C%20Interior%2C%20dan%20Design%20Terpercaya!5e0!3m2!1sen!2sid!4v1762973176968!5m2!1sen!2sid%22%20width=%22600%22%20height=%22450%22%20style=%22border:0;%22%20allowfullscreen=%22%22%20loading=%22lazy%22%20referrerpolicy=%22no-referrer-when-downgrade"; // GANTI DENGAN URL EMBED GOOGLE MAPS ANDA

// (Import BgLokasi dan GmapsURL sudah dihapus karena tidak dipakai lagi)

const LocationSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Layout sudah responsif (md:grid-cols-2) */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Kolom Kiri: Teks (Tidak berubah) */}
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

          {/* Kolom Kanan: Peta (Versi Embed) */}
          <div className="flex justify-center md:justify-end">
            {/* Frame Peta (Tidak berubah) */}
            <div className="w-full max-w-lg border-4 border-[#005592] rounded-2xl p-4 sm:p-6 shadow-lg">
              {/* 🔽 2. BAGIAN INI DIGANTI DARI GAMBAR MENJADI IFRAME 🔽 */}
              {/* Kontainer ini menjaga iframe tetap responsif (aspect-4/3) dan rounded */}
              <div className="block rounded-lg overflow-hidden aspect-4/3">
                <iframe
                  src={MAP_EMBED_URL}
                  className="w-full h-full border-0" // border-0 penting untuk iframe
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Lokasi Kantor"
                ></iframe>
              </div>
              {/* 🔽 Akhir dari bagian yang diganti 🔽 */}

              {/* Teks Alamat di bawah peta (Tidak berubah) */}
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
