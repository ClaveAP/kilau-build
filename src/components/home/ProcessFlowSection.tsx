import React from "react";

const ProcessFlowSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop View - Horizontal Flow with Curves */}
        <div className="hidden lg:block relative">
          <div className="flex justify-between items-start relative">
            {/* SVG for curved lines */}
            <svg
              className="absolute top-20 left-0 w-full h-32 pointer-events-none"
              style={{ zIndex: 0 }}
              preserveAspectRatio="none"
              viewBox="0 0 1200 100"
            >
              {/* Curve 1 to 2 (Top to Bottom) */}
              <path
                d="M 120 10 C 200 10, 280 90, 360 90"
                stroke="#D1D5DB"
                strokeWidth="3"
                fill="none"
              />
              {/* Curve 2 to 3 (Bottom to Top) */}
              <path
                d="M 360 90 C 440 90, 520 10, 600 10"
                stroke="#D1D5DB"
                strokeWidth="3"
                fill="none"
              />
              {/* Curve 3 to 4 (Top to Bottom) */}
              <path
                d="M 600 10 C 680 10, 760 90, 840 90"
                stroke="#D1D5DB"
                strokeWidth="3"
                fill="none"
              />
              {/* Curve 4 to 5 (Bottom to Top) */}
              <path
                d="M 840 90 C 920 90, 1000 10, 1080 10"
                stroke="#D1D5DB"
                strokeWidth="3"
                fill="none"
              />
            </svg>

            {/* Step 1 - Konsultasi */}
            <div className="flex-1 text-center relative z-10">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#005592] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  1
                </div>
              </div>
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-white border-2 border-[#005592] rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-[#005592]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
              </div>
              <h3
                className="text-xl font-bold text-gray-800 mb-3"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Konsultasi
              </h3>
              <p
                className="text-sm text-gray-600 px-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Diskusi awal untuk memahami kebutuhan proyek Anda.
              </p>
            </div>

            {/* Step 2 - Survey Lokasi */}
            <div
              className="flex-1 text-center relative z-10"
              style={{ marginTop: "80px" }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#005592] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  2
                </div>
              </div>
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-white border-2 border-[#005592] rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-[#005592]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3
                className="text-xl font-bold text-gray-800 mb-3"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Survey Lokasi
              </h3>
              <p
                className="text-sm text-gray-600 px-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Pengecekan lokasi agar perencanaan sesuai kondisi lapangan.
              </p>
            </div>

            {/* Step 3 - Perencanaan */}
            <div className="flex-1 text-center relative z-10">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#005592] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  3
                </div>
              </div>
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-white border-2 border-[#005592] rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-[#005592]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
              </div>
              <h3
                className="text-xl font-bold text-gray-800 mb-3"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Perencanaan
              </h3>
              <p
                className="text-sm text-gray-600 px-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Desain 3D, RAB, dan detail engineering yang fungsional dan
                estetis.
              </p>
            </div>

            {/* Step 4 - Kontrak Proyek */}
            <div
              className="flex-1 text-center relative z-10"
              style={{ marginTop: "80px" }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#005592] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  4
                </div>
              </div>
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-white border-2 border-[#005592] rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-[#005592]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
              <h3
                className="text-xl font-bold text-gray-800 mb-3"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Kontrak Proyek
              </h3>
              <p
                className="text-sm text-gray-600 px-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Penandatanganan kontrak resmi sebelum pengerjaan.
              </p>
            </div>

            {/* Step 5 - Pembangunan */}
            <div className="flex-1 text-center relative z-10">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#005592] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  5
                </div>
              </div>
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-white border-2 border-[#005592] rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-[#005592]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              </div>
              <h3
                className="text-xl font-bold text-gray-800 mb-3"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Pembangunan
              </h3>
              <p
                className="text-sm text-gray-600 px-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Pelaksanaan konstruksi sesuai rencana dan kontrak.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet View */}
        <div className="lg:hidden space-y-6">
          {[
            {
              num: 1,
              icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
              title: "Konsultasi",
              desc: "Diskusi awal untuk memahami kebutuhan proyek Anda.",
            },
            {
              num: 2,
              icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
              title: "Survey Lokasi",
              desc: "Pengecekan lokasi agar perencanaan sesuai kondisi lapangan.",
            },
            {
              num: 3,
              icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
              title: "Perencanaan",
              desc: "Desain 3D, RAB, dan detail engineering yang fungsional dan estetis.",
            },
            {
              num: 4,
              icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
              title: "Kontrak Proyek",
              desc: "Penandatanganan kontrak resmi sebelum pengerjaan.",
            },
            {
              num: 5,
              icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
              title: "Pembangunan",
              desc: "Pelaksanaan konstruksi sesuai rencana dan kontrak.",
            },
          ].map((step, index) => (
            <div key={step.num} className="relative">
              <div className="flex gap-4 items-start">
                <div className="shrink-0">
                  <div className="w-14 h-14 bg-[#005592] rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {step.num}
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-white border-2 border-[#005592] rounded-xl flex items-center justify-center shrink-0">
                      <svg
                        className="w-6 h-6 text-[#005592]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={step.icon}
                        />
                      </svg>
                    </div>
                    <h3
                      className="text-lg font-bold text-gray-800"
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
              {index < 4 && (
                <div className="ml-7 mt-2 mb-2">
                  <svg width="2" height="40" className="text-gray-300">
                    <line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="40"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessFlowSection;
