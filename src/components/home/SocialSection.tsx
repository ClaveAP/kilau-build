import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface SocialPost {
  id: number;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  url: string;
  category: {
    name: string;
    color: string;
  };
  isFeatured: boolean;
}

const API_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const HomeSocialSection: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/post`);
        if (response.data.success) {
          const data = response.data.data;
          const mappedData = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.title,
            date: new Date(item.created_at).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            imageUrl: item.image.startsWith("http")
              ? item.image
              : `${API_BASE_URL}/${item.image}`,
            url: item.instagram_url,
            category: {
              name: "Instagram",
              color: "text-pink-600",
            },
            isFeatured: item.di_homepage === 1,
          }));

          setPosts(mappedData);
        }
      } catch (error) {
        console.error("Gagal load social posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const featuredPost = posts.find((p) => p.isFeatured) || posts[0];

  const otherPosts = posts.filter((p) => p.id !== featuredPost?.id).slice(0, 3);

  if (isLoading) return null;
  if (!featuredPost) return null;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#005592]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Media Sosial
          </h2>
          <Link
            to="/media-sosial"
            className="bg-[#005592] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#004d82] transition-colors duration-300"
          >
            See More
          </Link>
        </div>

        {/* Grid Konten */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Kolom Kiri: Postingan Utama (Featured) */}
          <div className="lg:col-span-2">
            <a
              href={featuredPost.url !== "-" ? featuredPost.url : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl h-full"
            >
              <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* Overlay hover effect */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              <div className="p-6 sm:p-8">
                <p
                  className={`text-sm font-semibold mb-2 ${featuredPost.category.color}`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {featuredPost.category.name}
                </p>
                <h3
                  className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#005592] transition-colors"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  {featuredPost.title}
                </h3>
                <p
                  className="text-xs text-gray-500 mb-4"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {featuredPost.date}
                </p>
                <p
                  className="text-sm sm:text-base text-gray-700 leading-relaxed line-clamp-3"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {featuredPost.description}
                </p>
              </div>
            </a>
          </div>

          {/* Kolom Kanan: Daftar Postingan Kecil */}
          <div className="flex flex-col gap-6">
            {otherPosts.length > 0 ? (
              otherPosts.map((post) => (
                <a
                  key={post.id}
                  href={post.url !== "-" ? post.url : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-lg group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100"
                >
                  <div className="w-24 h-24 shrink-0 overflow-hidden rounded-lg">
                    <img
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      src={post.imageUrl}
                      alt={post.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/100x100?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-semibold ${post.category.color} mb-1`}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {post.category.name}
                    </p>
                    <h4
                      className="text-sm sm:text-base font-bold text-gray-800 mb-1 group-hover:text-[#005592] line-clamp-2 transition-colors"
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                      {post.title}
                    </h4>
                    <p
                      className="text-xs text-gray-500"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {post.date}
                    </p>
                  </div>
                </a>
              ))
            ) : (
              <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-500 border border-dashed border-gray-300">
                <p>Belum ada postingan lain.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSocialSection;
