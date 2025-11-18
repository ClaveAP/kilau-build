import React from "react";

const featuresData = [
  {
    id: 1,
    title: "Free Konsultasi & Survey",
    description:
      "Konsultasi gratis untuk membantu Anda merencanakan proyek sejak awal.",
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
  },
  {
    id: 2,
    title: "RAB Detail & Transparan",
    description:
      "Biaya dipisahkan secara rinci, bukan sekadar harga per meter, sehingga lebih jelas dan terpercaya.",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    id: 3,
    title: "Tim Profesional",
    description:
      "Ditangani tenaga ahli berpengalaman dengan proses kerja yang jelas dan transparan.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
];

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
                    d={feature.icon}
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
