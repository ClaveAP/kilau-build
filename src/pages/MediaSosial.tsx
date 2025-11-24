import React, { useState, useEffect } from "react";
import axios from "axios";

interface InstagramPostItem {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  instagramUrl: string;
}
const API_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const MediaSosial: React.FC = () => {
  const [posts, setPosts] = useState<InstagramPostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/post`);
        if (response.data.success) {
          const mappedData = response.data.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.title,
            date: new Date(item.created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            image: item.image.startsWith("http")
              ? item.image
              : `${API_BASE_URL}/storage/${item.image}`,
            instagramUrl: item.instagram_url,
          }));
          setPosts(mappedData);
        }
      } catch (error) {
        console.error("Gagal load posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (url: string) => {
    if (url && url !== "-") {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 lg:pb-12 bg-linear-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#005592] mb-4 sm:mb-6"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              KilauTips
            </h1>
            <p
              className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Inspirasi desain dan tips hunian dari Kilau Build
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <p className="text-center text-gray-400">Memuat konten...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-400">
              Belum ada konten terbaru.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {posts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handlePostClick(post.instagramUrl)}
                  className="group cursor-pointer"
                >
                  <div className="bg-white border-2 border-gray-200 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative w-full pt-[100%] overflow-hidden bg-gray-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-[#005592]/0 group-hover:bg-[#005592]/20 transition-all duration-300"></div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3
                        className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-14 group-hover:text-[#005592] transition-colors"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                      >
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-4">
                        <div className="w-8 h-8 bg-linear-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-lg flex items-center justify-center shrink-0">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </div>
                        <span
                          className="text-sm text-gray-600"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {post.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10 sm:mt-12 lg:mt-16">
            <a
              href="https://www.instagram.com/kilaubuild"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-linear-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Follow @KilauBuild
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MediaSosial;
