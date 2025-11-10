// src/components/home/TestimonialsSection.tsx (Versi Revisi Kotak Bintang)

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

// Import data palsu kita
import { testimonialsData } from "../../mocks/testimonials.mock";

// Komponen bintang (tetap sama)
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex justify-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.375 2.45a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.375-2.45a1 1 0 00-1.175 0l-3.375 2.45c-.784.57-1.838-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.966z" />
        </svg>
      ))}
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  // Kita set 'loop: true' biar bisa muter terus
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header (tetap sama) */}
        <h2
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
          style={{ fontFamily: '"Roboto", sans-serif' }}
        >
          <span className="text-[#005592]">Ulasan</span>
        </h2>

        {/* Wrapper untuk Slider + Tombol */}
        <div className="relative">
          {/* Slider Embla */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {testimonialsData.map((item) => (
                <div
                  key={item.id}
                  className="flex-none w-full sm:w-1/2 lg:w-1/4 pl-4"
                >
                  {/* Card Testimoni (tetap sama) */}
                  <div className="flex flex-col h-full border-2 border-[#005592] rounded-xl shadow-lg p-6 bg-white">
                    <div className="flex-1">
                      <h3
                        className="text-xl font-bold text-center text-gray-800"
                        style={{ fontFamily: '"Roboto", sans-serif' }}
                      >
                        {item.name}
                      </h3>
                      <hr className="my-3" />
                      <p
                        className="text-sm text-gray-600 text-center italic leading-relaxed"
                        style={{ fontFamily: '"Inter", sans-serif' }}
                      >
                        &ldquo;{item.text}&rdquo;
                      </p>
                    </div>

                    {/* 🔽 REVISI DI SINI 🔽 */}
                    {/* Bungkusnya dibuat 'flex justify-center' */}
                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-center">
                      {/* Ini dia kotak putihnya */}
                      <div
                        className="inline-block bg-white rounded-full px-4 py-2 shadow-inner"
                        style={{
                          boxShadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
                        }}
                      >
                        <StarRating rating={item.stars} />
                      </div>
                    </div>
                    {/* 🔼 BATAS REVISI 🔼 */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tombol Kiri (tetap sama) */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition duration-300 -ml-4"
          >
            <svg
              className="w-6 h-6 text-[#005592]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Tombol Kanan (tetap sama) */}
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition duration-300 -mr-4"
          >
            <svg
              className="w-6 h-6 text-[#005592]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Dot Pagination (tetap sama) */}
        <div className="flex justify-center gap-2 mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === selectedIndex ? "bg-[#005592]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
