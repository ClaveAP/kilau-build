import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const FaqItem: React.FC<{
  item: { id: number; question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}> = ({ item, isOpen, onToggle }) => {
  return (
    <div className="w-full rounded-2xl bg-white shadow-lg border border-blue-200/75 overflow-hidden">
      {/* Pertanyaan */}
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 px-6 text-left"
      >
        <span className="text-base sm:text-lg font-medium text-gray-800">
          {item.question}
        </span>

        {/* Chevron */}
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full bg-[#005592] text-white ${
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

      {/* Jawaban */}
      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm sm:text-base text-gray-600 leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

type Faqs = {
  id: number;
  question: string;
  answer: string;
};

const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<Faqs[] | []>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/faq`)
      .then((response) => {
        setFaqs(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching FAQs:", error);
      });
  }, []);

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
          Frequently Asked <span className="text-[#005592]">Questions</span>
        </h2>

        <div className="w-full space-y-4">
          {faqs.map((faq: Faqs) => (
            <FaqItem
              key={faq.id}
              item={faq}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
