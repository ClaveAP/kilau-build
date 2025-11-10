// src/components/home/HomePortfolioSection.tsx (Versi "See More" di-Link)

import React from "react";
// 🔽 1. IMPORT 'LINK' DARI REACT ROUTER 🔽
import { Link } from "react-router-dom";
import { homePortfolioData } from "../../mocks/portfolio.mock";

const HomePortfolioSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#005592] mb-8 sm:mb-12">
          Portofolio
        </h2>

        {/* DINAMIS DARI MOCK */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {homePortfolioData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-600">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Link
            to="/portofolio"
            className="bg-[#005592] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#004d82] transition-colors duration-300"
          >
            See more
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePortfolioSection;
