import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// CSS UTAMA
import "swiper/swiper.min.css";

// CSS UNTUK NAVIGATION (panah next/prev)
import "swiper/modules/navigation/navigation.min.css";

// CSS UNTUK PAGINATION (titik-titik di bawah)
import "swiper/modules/pagination/pagination.min.css";

interface InstagramPost {
  title: string;
  description: string;
  imageUrl: string;
  instagramUrl: string;
  date: string;
}

interface CarouselProps {
  posts: InstagramPost[];
  sectionTitle: string;
}

const InstagramCarousel: React.FC<CarouselProps> = ({
  posts,
  sectionTitle,
}) => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 text-center text-primary-blue">
        {sectionTitle}
      </h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
        }}
        navigation={true}
        pagination={{ clickable: true }}
        className="pb-12"
      >
        {posts.map((post, index) => (
          <SwiperSlide key={index}>
            <a
              href={post.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105  flex-col block"
            >
              <div className="w-full overflow-hidden aspect-square">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full block object-cover object-center"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gray-100"><span class="text-gray-400 text-center px-4">${post.title}</span></div>`;
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{post.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary-blue">📱 Instagram</span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default InstagramCarousel;
