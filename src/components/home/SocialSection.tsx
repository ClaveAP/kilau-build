// src/components/home/HomeSocialSection.tsx
import React from "react";
import { Link } from "react-router-dom";
import { featuredPost, otherPosts } from "../../mocks/social.mock"; // <-- Panggil data palsu

const HomeSocialSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      {" "}
      {/* Ganti bg jika perlu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#0066AE]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Media Sosial
          </h2>
          <Link
            to="/portofolio"
            className="bg-[#0066AE] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#004d82] transition-colors duration-300"
          >
            See More
          </Link>
        </div>

        {/* Grid Konten (DINAMIS DARI MOCK) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Kolom Kiri: Postingan Utama (Featured) */}
          <div className="lg:col-span-2">
            <a
              href={featuredPost.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl"
            >
              <div className="relative">
                <img
                  className="w-full h-64 sm:h-80 object-cover"
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                />
              </div>
              <div className="p-6 sm:p-8">
                <p
                  className={`text-sm font-semibold mb-2 ${featuredPost.category.color}`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {featuredPost.category.name}
                </p>
                <h3
                  className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#0066AE]"
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
                  className="text-sm sm:text-base text-gray-700 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {featuredPost.description}
                </p>
              </div>
            </a>
          </div>

          {/* Kolom Kanan: Daftar Postingan Kecil */}
          <div className="flex flex-col gap-6">
            {otherPosts.map((post) => (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-lg group transition-all duration-300 hover:shadow-2xl"
              >
                <img
                  className="w-24 h-20 object-cover rounded-lg shrink-0"
                  src={post.imageUrl}
                  alt={post.title}
                />
                <div className="flex-1">
                  <p
                    className={`text-xs font-semibold ${post.category.color}`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {post.category.name}
                  </p>
                  <h4
                    className="text-sm sm:text-base font-bold text-gray-800 mt-1 group-hover:text-[#0066AE]"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    {post.title}
                  </h4>
                  <p
                    className="text-xs text-gray-500 mt-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {post.date}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSocialSection;
