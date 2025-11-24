import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../layouts/DashboardLayout";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const getImageUrl = (img: string) => {
  if (!img) return "https://placehold.co/600x400?text=No+Image";
  if (img.startsWith("http")) return img;
  return `${API_BASE_URL}/storage/${img}`;
};

const InstagramBadge = () => (
  <div className="w-6 h-6 bg-linear-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-md flex items-center justify-center shrink-0 shadow-sm">
    <svg
      className="w-3.5 h-3.5 text-white"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.646-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  </div>
);

// ==== Bintang Rating =====
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex justify-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`w-4 h-4 ${
          star <= rating ? "text-yellow-400" : "text-gray-200"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.375 2.45a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.375-2.45a1 1 0 00-1.175 0l-3.375 2.45c-.784.57-1.838-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.966z" />
      </svg>
    ))}
  </div>
);

// ==== FAQ ====
const FaqItemAdmin: React.FC<{
  item: any;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ item, isOpen, onToggle }) => {
  return (
    <div className="w-full rounded-2xl bg-white shadow-sm border border-blue-100 overflow-hidden mb-4 transition-all hover:shadow-md">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 px-6 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm sm:text-base font-medium text-gray-800">
          {item.question}
        </span>

        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full bg-[#005592] text-white ${
            isOpen ? "rotate-180" : ""
          } transition-transform duration-300 shrink-0 ml-4`}
        >
          <svg
            className="h-4 w-4"
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

      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 pt-2 border-t border-blue-50">
            <p className="text-sm text-gray-600 leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Beranda = () => {
  const navigate = useNavigate();

  // ==== STATE DATA ====
  const [statistikData, setStatistikData] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [kontakData, setKontakData] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [mediaSosialData, setMediaSosialData] = useState<any[]>([]);
  const [portofolioItems, setPortofolioItems] = useState<any[]>([]);

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // 1. STATISTIK
        const resStats = await axios.get(`${API_URL}/statistic`);
        if (resStats.data.success && resStats.data.data.length > 0) {
          const d = resStats.data.data[0];
          setStatistikData([
            { id: 1, label: "Tahun Pengalaman", value: d.tahun_pengalaman },
            { id: 2, label: "Proyek Selesai", value: d.proyek_selesai },
            { id: 3, label: "Klien Puas", value: d.klien_puas },
            { id: 4, label: "Kota", value: d.sebaran_kota },
          ]);
        }

        // 2. TESTIMONI
        const resTesti = await axios.get(`${API_URL}/testimoni`);
        if (resTesti.data.success) {
          setTestimonials(
            resTesti.data.data.slice(0, 3).map((t: any) => ({
              id: t.id,
              name: t.name,
              text: t.review,
              rating: t.star,
            }))
          );
        }

        // 3. KONTAK
        const resKontak = await axios.get(`${API_URL}/contact`);
        if (resKontak.data.success && resKontak.data.data.length > 0) {
          const d = resKontak.data.data[0];
          setKontakData([
            {
              id: 1,
              type: "lokasi",
              value: d.alamat,
              label: "Lokasi",
              alamat: d.alamat,
            },
            { id: 2, type: "kontak", value: d.no_telp, label: "Kontak" },
            { id: 3, type: "email", value: d.email, label: "Email" },
          ]);
        }

        // 4. FAQ
        const resFaq = await axios.get(`${API_URL}/faq`);
        if (resFaq.data.success) {
          setFaqs(resFaq.data.data.slice(0, 5));
        }

        // 5. MEDIA SOSIAL
        const resPost = await axios.get(`${API_URL}/post`);
        if (resPost.data.success) {
          setMediaSosialData(
            resPost.data.data.slice(0, 3).map((p: any) => ({
              id: p.id,
              title: p.title,
              description: p.title,

              date: new Date(p.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
              image: getImageUrl(p.image),
            }))
          );
        }

        // 6. PORTOFOLIO
        const [resDone, resOngoing, resInterior] = await Promise.all([
          axios.get(`${API_URL}/project-done`),
          axios.get(`${API_URL}/ongoing-project`),
          axios.get(`${API_URL}/desain-interior`),
        ]);

        const allProjects = [
          ...(resDone.data.success ? resDone.data.data : []),
          ...(resOngoing.data.success ? resOngoing.data.data : []),
          ...(resInterior.data.success ? resInterior.data.data : []),
        ]
          .slice(0, 3)
          .map((p: any) => ({
            id: p.id,
            title: p.name,
            image: getImageUrl(p.image),
          }));
        setPortofolioItems(allProjects);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchAll();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full space-y-12 p-4">
        <section>
          <h2 className="text-3xl font-bold text-[#005592] text-center mb-8">
            Statistik Perusahaan
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {statistikData.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <p className="text-sm text-[#005592] mb-2 font-medium uppercase tracking-wide">
                  {item.label}
                </p>
                <p className="text-4xl font-bold text-[#005592]">
                  {item.value || "0"}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              className="bg-[#005592] text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#004475] transition-colors shadow-md"
              onClick={() => navigate("/admin/statistik")}
            >
              Lihat Selengkapnya
            </button>
          </div>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-3xl font-bold text-[#005592] text-center mb-8">
            Portofolio
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 max-w-6xl mx-auto">
            {portofolioItems.length > 0 ? (
              portofolioItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 group hover:shadow-lg transition-all flex items-center gap-4 p-4 text-left"
                >
                  <div className="relative w-24 h-24 shrink-0 bg-gray-200 overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/100x100?text=No+Image";
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#005592] text-base mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-8">
                Belum ada data portofolio.
              </div>
            )}
          </div>

          <div className="text-center">
            <button
              className="bg-[#005592] text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#004475] transition-colors shadow-md"
              onClick={() => navigate("/admin/portofolio")}
            >
              Lihat Selengkapnya
            </button>
          </div>
        </section>

        <hr className="border-gray-200" />

        {/* --- TESTIMONI SECTION --- */}
        <section>
          <h2 className="text-3xl font-bold text-[#005592] text-center mb-10">
            Testimoni
          </h2>

          {testimonials.length > 0 ? (
            // Grid disesuaikan untuk menampilkan 3 kolom pada layar besar
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-7xl mx-auto">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-all hover:scale-[1.02] flex flex-col h-full border-2 border-gray-200 shadow-sm"
                >
                  <h3 className="font-semibold pb-2 mb-3 border-b border-gray-100">
                    {t.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 min-h-[60px] grow">
                    {t.text}
                  </p>

                  <div className="flex justify-center mb-3">
                    <StarRating rating={t.rating} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              Belum ada testimoni.
            </div>
          )}

          <div className="text-center mt-4">
            <button
              className="bg-[#005592] text-white px-8 py-2.5 rounded-md text-sm font-medium hover:bg-[#004475] transition-colors shadow-md"
              onClick={() => navigate("/admin/testimoni")}
            >
              Lihat Selengkapnya
            </button>
          </div>
        </section>

        <hr className="border-gray-200" />

        {/* --- KONTAK SECTION */}
        <section>
          <h2 className="text-3xl font-bold text-[#005592] text-center mb-10">
            Kontak
          </h2>

          <div className="max-w-3xl mx-auto space-y-8 text-left pl-4 sm:pl-0 mb-10">
            {kontakData.length > 0 ? (
              kontakData.map((item: any) => {
                let icon = (
                  <svg
                    className="w-8 h-8 text-[#005592]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                );

                if (item.type === "kontak") {
                  icon = (
                    <svg
                      className="w-8 h-8 text-[#005592]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.057 15.057 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1.01A11.36 11.36 0 018.59 3.98c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                        fill="none"
                      />
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.21c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.21 2.2z" />
                    </svg>
                  );
                } else if (item.type === "email") {
                  icon = (
                    <svg
                      className="w-8 h-8 text-[#005592]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  );
                }

                return (
                  <div key={item.id} className="flex items-start gap-6">
                    <div className="shrink-0 bg-blue-50 p-3 rounded-full">
                      {icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-gray-900 text-xl mb-1">
                        {item.label}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed max-w-md">
                        {item.alamat || item.value || "-"}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-gray-400">
                Belum ada data kontak.
              </div>
            )}
          </div>

          <div className="text-center mt-10">
            <button
              className="bg-[#005592] text-white px-8 py-2.5 rounded-md text-sm font-medium hover:bg-[#004475] transition-colors shadow-md"
              onClick={() => navigate("/admin/kontak")}
            >
              Lihat Selengkapnya
            </button>
          </div>
        </section>

        <hr className="border-gray-200" />

        {/* --- KELOLA FAQ SECTION --- */}
        <section>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#005592] mb-10">
              Kelola FAQ
            </h2>

            <div className="space-y-4 text-left mb-10">
              {faqs.length > 0 ? (
                faqs.map((faq) => (
                  <FaqItemAdmin
                    key={faq.id}
                    item={faq}
                    isOpen={openFAQ === faq.id}
                    onToggle={() => toggleFAQ(faq.id)}
                  />
                ))
              ) : (
                <div className="text-center text-gray-400 py-4 bg-gray-50 rounded-lg">
                  Belum ada FAQ.
                </div>
              )}
            </div>

            <button
              className="bg-[#005592] text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#004475] transition-colors shadow-md"
              onClick={() => navigate("/admin/faq")}
            >
              Lihat Selengkapnya
            </button>
          </div>
        </section>

        <hr className="border-gray-200" />

        {/* --- MEDIA SOSIAL --- */}
        <section>
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#005592] mb-10">
              Kelola Media Sosial
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {mediaSosialData.length > 0 ? (
                mediaSosialData.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full text-left"
                  >
                    <div className="relative h-56 shrink-0 bg-gray-200">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="p-5 flex flex-col grow">
                      <h3
                        className="font-bold text-gray-800 mb-2 text-sm md:text-base line-clamp-2 grow"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                      >
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                        <InstagramBadge />
                        <span
                          className="text-xs font-medium text-gray-500"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-4 bg-white rounded-lg shadow-sm">
                  Belum ada konten media sosial.
                </div>
              )}
            </div>

            <button
              className="bg-[#005592] text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#004475] transition-colors shadow-md"
              onClick={() => navigate("/admin/media-sosial")}
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
