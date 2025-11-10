// src/pages/Portofolio.tsx
import React from "react";
import { projectsDoneData } from "../../mocks/portfolio-done.mock";
import { ongoingProjectsData } from "../../mocks/portfolio-ongoing.mock";
import { interiorDesignsData } from "../../mocks/portfolio-interior.mock";

const Portofolio: React.FC = () => {
  return (
    <main className="pt-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* ========== PROJECT DONE SECTION ========== */}
        <section className="mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#0066AE] text-center mb-8 sm:mb-12"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Project Done
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projectsDoneData.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-40 sm:h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-3 sm:p-4">
                  <h3
                    className="font-bold text-sm sm:text-base text-gray-800 mb-1"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {project.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========== ONGOING PROJECT SECTION ========== */}
        <section className="mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#0066AE] text-center mb-8 sm:mb-12"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Ongoing Project
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {ongoingProjectsData.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 sm:h-56 object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3
                    className="font-bold text-base sm:text-lg text-gray-800 mb-2"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-3 text-gray-600">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs sm:text-sm">
                      {project.location}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs sm:text-sm text-gray-600">
                        Progress
                      </span>
                      <span className="text-sm sm:text-base font-bold text-[#0066AE]">
                        {project.completionPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
                      <div
                        className="bg-[#0066AE] h-2 sm:h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${project.completionPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========== DESAIN INTERIOR SECTION ========== */}
        <section>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#0066AE] text-center mb-8 sm:mb-12"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Design Interior
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {interiorDesignsData.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-40 sm:h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-3 sm:p-4">
                  <h3
                    className="font-bold text-sm sm:text-base text-gray-800"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    {project.title}
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
