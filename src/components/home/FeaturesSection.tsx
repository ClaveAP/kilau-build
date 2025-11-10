// src/components/home/FeaturesSection.tsx
import React from "react";
import { featuresData } from "../../mocks/features.mock"; // <-- Panggil data palsu

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-3"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Keunggulan <span className="text-[#005592]">Kami</span>
        </h2>
        <p className="text-center text-[#063172] mb-8 sm:mb-12 text-sm sm:text-base">
          Kami menawarkan layanan kontraktor yang transparan, profesional, dan
          terpercaya
        </p>

        {/* DINAMIS DARI MOCK */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuresData.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-[#005592]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={feature.icon} // <-- Data dari mock
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
