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

const HomePortfolioSection: React.FC = () => {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getImageUrl = (img: string) => {
    if (!img) return "https://placehold.co/600x400?text=No+Image";
    if (img.startsWith("http")) return img;
    return `http://127.0.0.1:8000/storage/${img}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [resDone, resOngoing, resInterior] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/project-done"),
          axios.get("http://127.0.0.1:8000/api/ongoing-project"),
          axios.get("http://127.0.0.1:8000/api/desain-interior"),
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
                  {/* Icon kecil opsional */}
                  <svg
                    className="w-4 h-4"
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
