// src/pages/Portofolio.tsx
import React from "react";
import { projectsDoneData } from "../../mocks/portfolio-done.mock";
import { ongoingProjectsData } from "../../mocks/portfolio-ongoing.mock";
import { interiorDesignsData } from "../../mocks/portfolio-interior.mock";

const Portofolio: React.FC = () => {
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
            {projectsDoneData.map((project) => (
              <div
                key={project.id}
                className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image Container - Fixed Aspect Ratio */}
                <div className="relative w-full pt-[75%] overflow-hidden bg-gray-100">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3
                    className="font-bold text-base sm:text-lg text-gray-900 mb-1 line-clamp-2 min-h-12"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm sm:text-base text-gray-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
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
            {ongoingProjectsData.map((project) => (
              <div
                key={project.id}
                className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image Container - Fixed Aspect Ratio */}
                <div className="relative w-full pt-[66.67%] overflow-hidden bg-gray-100">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3
                    className="font-bold text-base sm:text-lg text-gray-900 mb-3 line-clamp-2 min-h-12"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    {project.title}
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
                      {project.location}
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
                        {project.completionPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-[#005592] h-2.5 rounded-full transition-all duration-300"
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
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#005592] text-center mb-10 sm:mb-12 lg:mb-16"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Design Interior
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {interiorDesignsData.map((project) => (
              <div
                key={project.id}
                className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image Container - Fixed Aspect Ratio */}
                <div className="relative w-full pt-[75%] overflow-hidden bg-gray-100">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3
                    className="font-bold text-base sm:text-lg text-gray-900 line-clamp-2 min-h-12"
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
