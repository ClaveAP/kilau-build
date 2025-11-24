import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface PortfolioItem {
  id: number;
  title: string;
  image: string;
  category: string;
  subtitle: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const HomePortfolioSection: React.FC = () => {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getImageUrl = (img: string) => {
    if (!img) return "https://placehold.co/600x400?text=No+Image";
    if (img.startsWith("http")) return img;
    return `${API_BASE_URL}/storage/${img}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [resDone, resOngoing, resInterior] = await Promise.all([
          axios.get(`${API_URL}/project-done`),
          axios.get(`${API_URL}/ongoing-project`),
          axios.get(`${API_URL}/desain-interior`),
        ]);

        const featured: PortfolioItem[] = [];

        if (resDone.data.success && resDone.data.data.length > 0) {
          const item = resDone.data.data[0];
          featured.push({
            id: item.id,
            title: item.name,
            image: item.image,
            category: "Project Done",
            subtitle: item.year || "Selesai",
          });
        }

        if (resOngoing.data.success && resOngoing.data.data.length > 0) {
          const item = resOngoing.data.data[0];
          featured.push({
            id: item.id,
            title: item.name,
            image: item.image,
            category: "Ongoing Project",
            subtitle: item.loc || "Sedang Berjalan",
          });
        }

        if (resInterior.data.success && resInterior.data.data.length > 0) {
          const item = resInterior.data.data[0];
          featured.push({
            id: item.id,
            title: item.name,
            image: item.image,
            category: "Desain Interior",
            subtitle: "Interior",
          });
        }

        setProjects(featured);
      } catch (error) {
        console.error("Gagal mengambil data portofolio home:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderIcon = (category: string) => {
    if (category === "Ongoing Project") {
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      );
    } else if (category === "Desain Interior") {
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      );
    } else {
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      );
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#005592] mb-8 sm:mb-12">
          Portofolio
        </h2>

        {/* Loading State */}
        {isLoading && (
          <p className="text-center text-gray-400">Memuat portofolio...</p>
        )}

        {/* Empty State */}
        {!isLoading && projects.length === 0 && (
          <p className="text-center text-gray-400">
            Belum ada data portofolio.
          </p>
        )}

        {/* Grid Data */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((item, index) => (
            <div
              key={`${item.category}-${item.id}-${index}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full h-56 overflow-hidden group">
                <img
                  src={getImageUrl(item.image)}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Badge Kategori */}
                <div className="absolute top-3 left-3 bg-[#005592] text-white text-xs px-3 py-1 rounded-full shadow-md opacity-90">
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col grow">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mt-auto flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {renderIcon(item.category)}
                  </svg>
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-14">
          <Link
            to="/portofolio"
            className="bg-[#005592] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#004d82] transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Lihat Semua Proyek
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePortfolioSection;
