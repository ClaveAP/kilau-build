import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { statsData } from "../mocks/about.mock";
import FeaturesSection from "../components/home/FeaturesSection";
import VisiMisiSection from "../components/home/VisiMisiSection";
import OwnerSection from "../components/home/OwnerSection";
import header from "../assets/header-lk.png";

const TentangKami: React.FC = () => {
  const navigate = useNavigate();
  const [hasStartedCount, setHasStartedCount] = useState(false);

  useEffect(() => {
    setHasStartedCount(true);
  }, []);

  // Count-up animation
  const useCountUp = (targetValue: number, duration = 1500) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!hasStartedCount) return;

      let start = 0;
      const increment = targetValue / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= targetValue) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [hasStartedCount, targetValue, duration]);

    return count;
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* HERO + STATS SECTION */}
      <section
        className="relative text-white "
        style={{
          backgroundImage: `url("${header}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#0066AE]/75"></div>

        {/* Content */}
        <div className="relative z-10 py-20 sm:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Judul - 2 BARIS */}
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

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              {/* Button Hubungi Kami */}
              <a
                href="https://wa.me/6287776360795?text=Halo%20admin%20Kilau,%20saya%20mau%20booking!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#D9D9D9]/40 text-white px-10 py-3 rounded-4xl text-base sm:text-lg font-semibold hover:bg-[#D9D9D9]/50 transition-all duration-300 "
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Hubungi Kami
              </a>

              {/* Button Lihat Layanan */}
              <button
                onClick={() => {
                  navigate("/layanan-kami");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-block bg-[#0066AE] text-white px-10 py-3 rounded-4xl text-base sm:text-lg font-semibold hover:bg-[#0066AE]/80 transition-all duration-300"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Lihat Layanan
              </button>
            </div>
          </div>
        </div>

        {/* Stats - Background Putih */}
        <div className="relative z-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 divide-x-0 lg:divide-x divide-gray-300">
              {statsData.map((stat) => {
                const targetValue = parseInt(stat.value.replace(/\D/g, ""), 10);
                const count = useCountUp(targetValue);

                return (
                  <div key={stat.id} className="text-center">
                    <h4
                      className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2B75AC] mb-3"
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                      {count}
                      {stat.value.replace(/[0-9]/g, "")}
                    </h4>
                    <p
                      className="text-sm sm:text-base lg:text-lg text-gray-800"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                );
              })}

              {/* Stat 30+ Kota */}
              <div className="text-center">
                <h4
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2B75AC] mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  {useCountUp(30)}+
                </h4>
                <p
                  className="text-sm sm:text-base lg:text-lg text-gray-800"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Kota
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FEATURES SECTION */}
      <FeaturesSection />
      {/* Visi Misi Section */}
      <VisiMisiSection />
      {/* Owner Section */}
      <OwnerSection />
    </div>
  );
};

export default TentangKami;
