import React from "react";
import { useNavigate } from "react-router-dom";
import header from "../../assets/header-lk.png";

const HeroTentangKami: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative text-white"
      style={{
        backgroundImage: `url("${header}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#005592]/75"></div>

      {/* Content */}
      <div className="relative z-10 py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Judul */}
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-[40px] font-bold mb-8 leading-tight"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Menyediakan Layanan Konstruksi & Interior Berkualitas
          </h1>

          {/* Deskripsi */}
          <p
            className="text-base sm:text-lg lg:text-xl mb-10 max-w-5xl mx-auto leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Kilau Build hadir untuk memberikan solusi konstruksi dan interior
            yang nyaman, modern, dan fungsional. Kami selalu mengutamakan
            transparansi, ketepatan waktu, dan kualitas terbaik di setiap
            proyek.
          </p>

          {/* Tombol */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a
              href="https://wa.me/6287776360795?text=Halo%20admin%20Kilau,%20saya%20mau%20booking!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#D9D9D9]/40 text-white px-10 py-3 rounded-4xl text-base sm:text-lg font-semibold hover:bg-[#D9D9D9]/50 transition-all duration-300"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Hubungi Kami
            </a>

            <button
              onClick={() => {
                navigate("/layanan-kami");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-block bg-[#005592] text-white px-10 py-3 rounded-4xl text-base sm:text-lg font-semibold hover:bg-[#005592]/80 transition-all duration-300"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Lihat Layanan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroTentangKami;
