import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../../styles/calendar.css";
import TestimoniCard from "../../../components/admin/TestimoniCard";
import { useStatistik } from "../../../contexts/StatistikContext";
import { useTestimoni } from "../../../contexts/TestimoniContext";
import { useKontak } from "../../../contexts/KontakContext";
import { useFAQ } from "../../../contexts/FAQContext";
import { useSurvey } from "../../../contexts/SurveyKalenderContext";
import { useMediaSosial } from "../../../contexts/MediaSosialContext";
import { useBerandaPortofolio } from "../../../contexts/BerandaPortofolioContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// @ts-ignore - CSS imports
import "swiper/css";
// @ts-ignore - CSS imports
import "swiper/css/navigation";
// @ts-ignore - CSS imports
import "swiper/css/pagination";

const Beranda = () => {
  // Icon Components
  const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#0066AE">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { statistikData } = useStatistik();
  const { testimonials } = useTestimoni();
  const { kontakData } = useKontak();
  const { faqs } = useFAQ();
  const { surveys } = useSurvey();
  const { mediaSosialData } = useMediaSosial();
  const { portofolioItems } = useBerandaPortofolio();

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Format date untuk display
  const formatDateDisplay = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("id-ID", { month: "long" });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day} ${month} ${year}/${hours}.${minutes}`;
  };

  // Format date untuk compare (YYYY-MM-DD)
  const formatDateOnly = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Filter surveys berdasarkan tanggal yang dipilih
  const filteredSurveys = useMemo(() => {
    const selectedDateStr = formatDateOnly(selectedDate);
    return surveys
      .filter((survey) => {
        const surveyDate = new Date(survey.date);
        const surveyDateStr = formatDateOnly(surveyDate);
        return surveyDateStr === selectedDateStr;
      })
      .sort((a, b) => {
        // Sort by time
        const timeA = new Date(a.date).getTime();
        const timeB = new Date(b.date).getTime();
        return timeA - timeB;
      });
  }, [surveys, selectedDate]);

  // Format tanggal untuk ditampilkan di judul
  const formatDateTitle = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("id-ID", { month: "long" });
    const year = date.getFullYear();
    const today = new Date();
    const todayStr = formatDateOnly(today);
    const selectedDateStr = formatDateOnly(date);

    if (selectedDateStr === todayStr) {
      return "Survey Hari Ini";
    } else {
      return `Survey ${day} ${month} ${year}`;
    }
  };

  // Get dates that have surveys for calendar tile marking
  const getSurveyDates = () => {
    return surveys.map((survey) => {
      const date = new Date(survey.date);
      return formatDateOnly(date);
    });
  };

  const surveyDates = getSurveyDates();

  // Handle date change from calendar
  const handleDateChange = (value: any) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    } else if (
      Array.isArray(value) &&
      value.length > 0 &&
      value[0] instanceof Date
    ) {
      setSelectedDate(value[0]);
    } else if (value && typeof value === "object" && "getTime" in value) {
      setSelectedDate(new Date(value));
    }
  };

  // Custom tile content untuk mark dates dengan survey
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateStr = formatDateOnly(date);
      const selectedDateStr = formatDateOnly(selectedDate);
      const isSelected = dateStr === selectedDateStr;
      const hasSurvey = surveyDates.includes(dateStr);

      if (hasSurvey) {
        return (
          <div
            className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: isSelected ? "white" : "#0066AE" }}
          ></div>
        );
      }
    }
    return null;
  };

  // Custom tile className untuk highlight selected date
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateStr = formatDateOnly(date);
      const selectedDateStr = formatDateOnly(selectedDate);
      if (dateStr === selectedDateStr) {
        return "selected-date";
      }
      if (surveyDates.includes(dateStr)) {
        return "has-survey";
      }
    }
    return null;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Kalender Survey Section */}
        <section>
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: "#0066AE" }}
          >
            Kalender Survey
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileContent={tileContent}
                tileClassName={tileClassName}
                className="w-full border-none"
              />
            </div>
            <div
              className="rounded-lg shadow-md p-6 text-white"
              style={{ backgroundColor: "#0066AE" }}
            >
              <h3 className="text-lg font-semibold mb-4">
                {formatDateTitle(selectedDate)}
              </h3>
              <div style={{ overflowY: "auto", maxHeight: "24rem" }}>
                {filteredSurveys.length > 0 ? (
                  <table
                    style={{
                      width: "100%",
                      fontSize: "0.875rem",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                        }}
                      >
                        <th
                          style={{
                            textAlign: "left",
                            padding: "0.75rem 1rem",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                          }}
                        >
                          Nama
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "0.75rem 1rem",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                          }}
                        >
                          Tanggal/Jam
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "0.75rem 1rem",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                          }}
                        >
                          No. Telepon
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSurveys.map((survey) => (
                        <tr
                          key={survey.id}
                          style={{
                            borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                            transition: "background-color 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#005a9e")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "transparent")
                          }
                        >
                          <td
                            style={{
                              padding: "0.875rem 1rem",
                              lineHeight: "1.5",
                            }}
                          >
                            {survey.name}
                          </td>
                          <td
                            style={{
                              padding: "0.875rem 1rem",
                              lineHeight: "1.5",
                            }}
                          >
                            {formatDateDisplay(survey.date)}
                          </td>
                          <td
                            style={{
                              padding: "0.875rem 1rem",
                              lineHeight: "1.5",
                            }}
                          >
                            {survey.phone}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "2rem 0",
                      color: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    <p>Belum ada survey di tanggal ini</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="text-white px-6 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: "#0066AE" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#005a9e")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0066AE")
              }
              onClick={() => navigate("/kalender")}
            >
              Lihat Selengkapnya
            </button>
          </div>
        </section>

        {/* Statistik Perusahaan Section */}
        <section>
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: "#0066AE" }}
          >
            Statistik Perusahaan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 max-w-4xl mx-auto">
            {statistikData.map((item) => (
              <div
                key={item.id}
                className="border border-[#BBDEFB] rounded-lg p-4 shadow-sm bg-white"
              >
                <label className="text-sm text-gray-500 block mb-2">
                  {item.label}
                </label>
                <p className="text-2xl font-bold" style={{ color: "#0066AE" }}>
                  {item.value || "0"}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              className="text-white px-6 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: "#0066AE" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#005a9e")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0066AE")
              }
              onClick={() => navigate("/statistik")}
            >
              Lihat Selengkapnya
            </button>
          </div>
        </section>

        {/* Portofolio Section */}
        <section>
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: "#0066AE" }}
          >
            Portofolio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            {portofolioItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              className="text-white px-6 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: "#0066AE" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#005a9e")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0066AE")
              }
              onClick={() => navigate("/portofolio")}
            >
              Lihat Selengkapnya
            </button>
          </div>
        </section>

        {/* Testimoni Section */}
        <section
          className="py-8"
          style={{
            borderTop: "2px solid #e5e7eb",
            borderBottom: "2px solid #e5e7eb",
          }}
        >
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: "#0066AE" }}
          >
            Testimoni
          </h2>
          {testimonials.length > 0 ? (
            <div className="relative px-12">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 18,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                }}
                navigation={
                  testimonials.length > 4
                    ? {
                        nextEl: ".testimoni-next-btn",
                        prevEl: ".testimoni-prev-btn",
                      }
                    : false
                }
                pagination={
                  testimonials.length > 4
                    ? {
                        clickable: true,
                      }
                    : false
                }
                className="testimoni-swiper"
              >
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial.id}>
                    <TestimoniCard
                      name={testimonial.name}
                      testimoni={testimonial.text}
                      rating={testimonial.rating}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {testimonials.length > 4 && (
                <>
                  <button
                    className="testimoni-prev-btn absolute left-0 top-[35%] -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                    style={{ backgroundColor: "#0066AE" }}
                    aria-label="Previous testimoni"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    className="testimoni-next-btn absolute right-0 top-[35%] -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                    style={{ backgroundColor: "#0066AE" }}
                    aria-label="Next testimoni"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="text-center py-8" style={{ color: "#6b7280" }}>
              <p>Belum ada testimoni</p>
            </div>
          )}
          <div className="flex justify-center mt-6">
            <button
              className="text-white px-6 py-2 rounded-lg transition-colors text-sm font-medium"
              style={{ backgroundColor: "#0066AE" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#005a9e")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0066AE")
              }
              onClick={() => navigate("/testimoni")}
            >
              Lihat Selengkapnya
            </button>
          </div>
        </section>

        {/* Kontak Section */}
        <section>
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: "#0066AE" }}
          >
            Kontak
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4 mb-4">
            {kontakData.map(
              (item: {
                id: number;
                type: "lokasi" | "kontak" | "email";
                value: string;
                alamat?: string;
              }) => {
                let icon = "📍";
                let label = "Lokasi";

                if (item.type === "kontak") {
                  icon = "📞";
                  label = "Kontak";
                } else if (item.type === "email") {
                  icon = "✉️";
                  label = "Email";
                }

                return (
                  <div key={item.id} className="flex items-start gap-4">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <h3
                        className="font-semibold mb-1"
                        style={{ color: "#1f2937" }}
                      >
                        {label}
                      </h3>
                      <p className="text-sm" style={{ color: "#4b5563" }}>
                        {item.alamat || item.value}
                      </p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
          <div className="flex justify-center">
            <button
              className="text-white px-6 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: "#0066AE" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#005a9e")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0066AE")
              }
              onClick={() => navigate("/kontak")}
            >
              Lihat Selengkapnya
            </button>
          </div>
        </section>

        {/* Kelola FAQ Section */}
        <section>
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: "#0066AE" }}
          >
            Kelola FAQ
          </h2>
          <div className="space-y-2 mb-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-lg p-4 cursor-pointer transition-all border"
                style={{
                  backgroundColor: "#f1f5f9",
                  borderColor:
                    openFAQ === faq.id ? "#0066AE" : "rgba(0, 102, 174, 0.3)",
                }}
                onClick={() => toggleFAQ(faq.id)}
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium pr-4" style={{ color: "#1f2937" }}>
                    {faq.question}
                  </p>
                  <button
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform"
                    style={{ backgroundColor: "#0066AE" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFAQ(faq.id);
                    }}
                  >
                    <span
                      className="text-white text-sm transition-transform inline-block"
                      style={{
                        transform:
                          openFAQ === faq.id
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                      }}
                    >
                      ▼
                    </span>
                  </button>
                </div>
                {openFAQ === faq.id && (
                  <div
                    className="mt-4 pt-4"
                    style={{ borderTop: "1px solid rgba(0, 102, 174, 0.2)" }}
                  >
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#4b5563" }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              className="text-white px-6 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: "#0066AE" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#005a9e")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0066AE")
              }
              onClick={() => navigate("/faq")}
            >
              Lihat Selengkapnya
            </button>
          </div>
        </section>

        {/* KilauTips Section */}
        <section>
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: "#0066AE" }}
          >
            KilauTips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            {mediaSosialData.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-gray-600 mb-2">
                      {item.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <InstagramIcon />
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              className="text-white px-6 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: "#0066AE" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#005a9e")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0066AE")
              }
              onClick={() => navigate("/media-sosial")}
            >
              Lihat Selengkapnya
            </button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Beranda;
