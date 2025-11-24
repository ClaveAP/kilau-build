import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const Portofolio: React.FC = () => {
  const [doneProjects, setDoneProjects] = useState<any[]>([]);
  const [ongoingProjects, setOngoingProjects] = useState<any[]>([]);
  const [interiorProjects, setInteriorProjects] = useState<any[]>([]);

  const getImageUrl = (img: string) => {
    if (!img) return "https://placehold.co/600x400?text=No+Image";
    if (img.startsWith("http")) return img;
    return `${API_BASE_URL}/storage/${img}`;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const resDone = await axios.get(`${API_URL}/project-done`);
        if (resDone.data.success) setDoneProjects(resDone.data.data);

        const resOngoing = await axios.get(`${API_URL}/ongoing-project`);
        if (resOngoing.data.success) setOngoingProjects(resOngoing.data.data);

        const resInterior = await axios.get(`${API_URL}/desain-interior`);
        if (resInterior.data.success)
          setInteriorProjects(resInterior.data.data);
      } catch (error) {
        console.error("Gagal load portofolio:", error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <main className="pt-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        {/* ========== PROJECT DONE SECTION ========== */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#005592] text-center mb-10 sm:mb-12 lg:mb-16"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Project Done
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {doneProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
              >
                <div className="relative w-full pt-[75%] overflow-hidden bg-gray-100">
                  <img
                    src={getImageUrl(project.image)}
                    alt={project.name}
                    loading="lazy"
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4 sm:p-5 flex flex-col grow">
                  {/* Tambahan Badge Selesai */}
                  {/* <div className="mb-2">
                    <span className="inline-block px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Selesai
                    </span>
                  </div> */}

                  <h3
                    className="font-bold text-base sm:text-lg text-gray-900 mb-2 line-clamp-2 min-h-12"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    {project.name}
                  </h3>

                  <p
                    className="text-sm sm:text-base text-gray-600 flex items-center gap-2 mt-auto"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    {project.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========== ONGOING PROJECT SECTION ========== */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#005592] text-center mb-10 sm:mb-12 lg:mb-16"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Ongoing Project
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {ongoingProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative w-full pt-[66.67%] overflow-hidden bg-gray-100">
                  <img
                    src={getImageUrl(project.image)}
                    alt={project.name}
                    loading="lazy"
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <h3
                    className="font-bold text-base sm:text-lg text-gray-900 mb-3 line-clamp-2 min-h-12"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    {project.name}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-4 text-gray-600">
                    <svg
                      className="w-4 h-4 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span
                      className="text-sm sm:text-base line-clamp-1"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {project.loc || "Lokasi Proyek"}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className="text-sm text-gray-600"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Progress
                      </span>
                      <span
                        className="text-base font-bold text-[#005592]"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                      >
                        {project.persen || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-[#005592] h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${project.persen || 0}%` }}
                      />
                    </div>

                    {/* ===== STATUS BADGE DARI ADMIN ===== */}
                    <div className="mt-3">
                      {project.persen >= 75 && (
                        <span className="inline-block px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Hampir Selesai
                        </span>
                      )}
                      {project.persen >= 40 && project.persen < 75 && (
                        <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          Dalam Proses
                        </span>
                      )}
                      {project.persen < 40 && (
                        <span className="inline-block px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                          Tahap Awal
                        </span>
                      )}
                    </div>
                    {/* =================================== */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========== DESAIN INTERIOR SECTION ========== */}
        <section>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#005592] text-center mb-10 sm:mb-12 lg:mb-16"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Design Interior
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {interiorProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative w-full pt-[75%] overflow-hidden bg-gray-100">
                  <img
                    src={getImageUrl(project.image)}
                    alt={project.name}
                    loading="lazy"
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <h3
                    className="font-bold text-base sm:text-lg text-gray-900 line-clamp-2 min-h-12"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    {project.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Portofolio;
