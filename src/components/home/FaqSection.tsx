// src/components/home/FaqSection.tsx (Versi Perbaikan Jarak)

import React, { useState } from "react";
// 1. Import data palsu kita
import { faqData } from "../../mocks/faq.mock";

// Komponen kecil untuk satu item FAQ
const FaqItem: React.FC<{
  item: { id: number; question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}> = ({ item, isOpen, onToggle }) => {
  return (
    // 🔽 STYLE KOTAKNYA PINDAH KE SINI 🔽
    // Ini yang bikin jadi kotak terpisah
    <div className="w-full rounded-2xl bg-white shadow-lg border border-blue-200/75 overflow-hidden">
      {/* Tombol Pertanyaan */}
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 px-6 text-left"
      >
        <span
          className="text-base sm:text-lg font-medium text-gray-800"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {item.question}
        </span>
        {/* Ikon Chevron */}
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0066AE] text-white ${
            isOpen ? "rotate-180" : ""
          } transition-transform duration-300`}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>

      {/* Konten Jawaban (Buka-Tutup) */}
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p
            className="px-6 pb-5 text-sm sm:text-base text-gray-600 leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

// Ini adalah Komponen Section utamanya
const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      {" "}
      {/* Ganti bg jika perlu */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <h2
          className="text-3xl sm:text-4xl font-bold text-center mb-8"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Frequently Asked <span className="text-[#0066AE]">Questions</span>
        </h2>

        {/* 🔽 PEMBUNGKUSNYA DIGANTI JADI INI 🔽 */}
        {/* Ini yang ngasih JARAK antar pertanyaan */}
        <div className="w-full space-y-4">
          {faqData.map((item) => (
            <FaqItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
