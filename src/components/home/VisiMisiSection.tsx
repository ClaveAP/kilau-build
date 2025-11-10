import React from "react";
import { Headset, Home } from "lucide-react";

const VisiMisiSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2
          className="text-2xl sm:text-3xl font-bold text-center text-[#005592] mb-3"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Visi Misi
        </h2>

        {/* Visi Misi Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-5xl mx-auto mt-12 sm:mt-14 lg:mt-16">
          {/* Visi Card */}
          <div className="bg-[#EBF4FA] rounded-3xl p-6 sm:p-8 lg:p-10 pt-12 sm:pt-14 shadow-sm hover:shadow-md transition-shadow duration-300 relative">
            {/* Icon */}
            <div className="absolute -top-7 sm:-top-8 left-1/2 transform -translate-x-1/2 mb-10 sm:mb-12">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#EBF4FA] rounded-full flex items-center justify-center shadow-md border-2 border-white">
                <Headset
                  className="w-7 h-7 sm:w-8 sm:h-8 text-[#005592] "
                  strokeWidth={2}
                />
              </div>
            </div>

            {/* Title */}
            <h3
              className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-center text-[#005592] mt-4 sm:mt-6 mb-5 sm:mb-6"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Visi
            </h3>

            {/* Content */}
            <p
              className="text-sm sm:text-base lg:text-[17px] text-[#005592] text-justify leading-relaxed px-2"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Menjadi penyedia layanan konstruksi terpercaya yang menghadirkan
              hunian dan bangunan berkualitas tinggi, ramah lingkungan, dan
              sesuai kebutuhan pelanggan di seluruh Indonesia.
            </p>
          </div>

          {/* Misi Card */}
          <div className="bg-[#EBF4FA] rounded-3xl p-6 sm:p-8 lg:p-10 pt-12 sm:pt-14 shadow-sm hover:shadow-md transition-shadow duration-300 relative">
            {/* Icon */}
            <div className="absolute -top-7 sm:-top-8 left-1/2 transform -translate-x-1/2 mb-10 sm:mb-12">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#EBF4FA] rounded-full flex items-center justify-center shadow-md border-2 border-white">
                <Home
                  className="w-7 h-7 sm:w-8 sm:h-8 text-[#005592]"
                  strokeWidth={2}
                />
              </div>
            </div>

            {/* Title */}
            <h3
              className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-center text-[#005592] mt-4 sm:mt-6 mb-5 sm:mb-6"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Misi
            </h3>

            {/* Content - Numbered List */}
            <div className="space-y-3 sm:space-y-4 px-2">
              <div className="flex items-start gap-2">
                <span
                  className="text-sm sm:text-base lg:text-[17px] text-[#005592] font-semibold shrink-0 mt-0.5"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  1.
                </span>
                <p
                  className="text-sm sm:text-base lg:text-[17px] text-[#005592] leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Memberikan layanan konsultasi dan perencanaan yang profesional
                  serta transparan.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span
                  className="text-sm sm:text-base lg:text-[17px] text-[#005592] font-semibold shrink-0 mt-0.5"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  2.
                </span>
                <p
                  className="text-sm sm:text-base lg:text-[17px] text-[#005592] leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Menghadirkan desain kreatif dan inovatif sesuai tren terkini.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span
                  className="text-sm sm:text-base lg:text-[17px] text-[#005592] font-semibold shrink-0 mt-0.5"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  3.
                </span>
                <p
                  className="text-sm sm:text-base lg:text-[17px] text-[#005592] leading-relaxed text-justify"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Menyediakan pembangunan berkualitas dengan material terbaik.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisiMisiSection;
