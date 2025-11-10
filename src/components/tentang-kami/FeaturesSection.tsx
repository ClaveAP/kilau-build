// src/components/tentangkami/FeaturesSection.tsx
import React from "react";
import { featuresData } from "../../mocks/features.mock"; // bisa pakai data dummy yg sama

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Judul */}
        <h2
          className="text-2xl sm:text-4xl lg:text-[40px] font-bold text-center text-[#005592] mb-4"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Keunggulan <span className="text-black">Kami</span>
        </h2>
        <p
          className="text-center text-[#063172] mb-10 sm:mb-12 text-sm sm:text-base max-w-2xl mx-auto"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Kami menawarkan layanan kontraktor yang transparan, profesional, dan
          terpercaya
        </p>

        {/* Konten Vertikal */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {featuresData.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 sm:p-6 flex items-start gap-5 border border-gray-100"
            >
              {/* Icon */}
              <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-[#EBF4FA] rounded-xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 text-[#005592]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={feature.icon}
                  />
                </svg>
              </div>

              {/* Teks */}
              <div>
                <h3
                  className="text-lg sm:text-xl font-semibold text-gray-900 mb-1"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm sm:text-base text-gray-600 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
