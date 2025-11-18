import React from "react";
import Layanan1 from "../../assets/bangun dari 0.png";
import Layanan2 from "../../assets/renovasi.png";
import Layanan3 from "../../assets/design.png";

const servicesData = [
  {
    id: 1,
    title: "Pembangunan Baru",
    description:
      "Pembangunan rumah hunian baru dengan perencanaan detail dan tenaga profesional.",
    imageUrl: Layanan1,
  },
  {
    id: 2,
    title: "Renovasi",
    description:
      "Perawatan dan renovasi rumah agar tetap kokoh, modern, dan nyaman.",
    imageUrl: Layanan2,
  },
  {
    id: 3,
    title: "Desain Interior",
    description:
      "Desain interior estetis dan fungsional untuk hunian yang indah dan nyaman.",
    imageUrl: Layanan3,
  },
];

const LayananKami: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12 leading-snug"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Solusi{" "}
          <span className="text-[#005592] font-extrabold">
            Konstruksi untuk <br /> Semua
          </span>{" "}
          Kebutuhan Anda
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={service.imageUrl}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#005592]">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  {service.description}
                </p>
                <a
                  href="https://wa.me/6287776360795?text=Halo%20admin%20Kilau,%20saya%20mau%20booking!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center bg-[#005592] text-white py-2 rounded-lg hover:bg-[#004d82] transition-colors duration-300"
                >
                  Booking Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LayananKami;
