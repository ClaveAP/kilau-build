import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import {
  useTestimoni,
  type TestimoniData,
} from "../../../contexts/TestimoniContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// @ts-ignore - CSS imports
import "swiper/css";
// @ts-ignore - CSS imports
import "swiper/css/navigation";
// @ts-ignore - CSS imports
import "swiper/css/pagination";

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            star <= rating ? "text-yellow-400 text-lg" : "text-gray-300 text-lg"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; text: string; rating: number }) => void;
  initialData?: TestimoniData | null;
  onError?: (message: string) => void;
}

const TestimoniModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  onError,
}) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name);
        setText(initialData.text);
        setRating(initialData.rating);
      } else {
        setName("");
        setText("");
        setRating(5);
      }
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && text.trim()) {
      onSave({ name: name.trim(), text: text.trim(), rating });
      onClose();
    } else {
      if (onError) {
        onError("Nama dan testimoni tidak boleh kosong!");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-primary-blue">
          {initialData ? "Edit Testimoni" : "Tambah Testimoni"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
              placeholder="Masukkan nama"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Testimoni
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
              placeholder="Masukkan testimoni"
              rows={4}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} Bintang{r > 1 ? "" : ""}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.75rem",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#d1d5db",
                color: "#374151",
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: 500,
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#9ca3af")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#d1d5db")
              }
            >
              Batal
            </button>
            <button
              type="submit"
              style={{
                backgroundColor: "#0066AE",
                color: "#ffffff",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: 500,
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#005a9e")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0066AE")
              }
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Testimoni = () => {
  const { testimonials, setTestimonials } = useTestimoni();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    id: number | null;
    type: "single" | "all";
  }>({
    isOpen: false,
    id: null,
    type: "single",
  });
  const [errorModal, setErrorModal] = useState<{
    isOpen: boolean;
    message: string;
  }>({
    isOpen: false,
    message: "",
  });

  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    message: string;
  }>({
    isOpen: false,
    message: "",
  });

  const handleDelete = (id: number) => {
    setDeleteConfirm({ isOpen: true, id, type: "single" });
  };

  const handleAdd = () => {
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    setIsModalOpen(true);
  };

  const handleSaveModal = (data: {
    name: string;
    text: string;
    rating: number;
  }) => {
    if (editingId) {
      // Update existing
      setTestimonials(
        testimonials.map((t) => (t.id === editingId ? { ...t, ...data } : t))
      );
    } else {
      // Add new
      const maxId =
        testimonials.length > 0
          ? Math.max(...testimonials.map((t) => t.id))
          : 0;
      const newId = maxId + 1;
      setTestimonials([...testimonials, { id: newId, ...data }]);
    }
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSave = () => {
    console.log(testimonials);
    setSuccessModal({ isOpen: true, message: "Perubahan berhasil disimpan!" });
  };

  const handleDeleteAll = () => {
    setDeleteConfirm({ isOpen: true, id: null, type: "all" });
  };

  const confirmDelete = () => {
    if (deleteConfirm.type === "all") {
      setTestimonials([]);
    } else if (deleteConfirm.id) {
      setTestimonials(testimonials.filter((t) => t.id !== deleteConfirm.id));
    }
    setDeleteConfirm({ isOpen: false, id: null, type: "single" });
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, id: null, type: "single" });
  };

  // Icon SVG untuk Edit (Pensil)
  const EditIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  );

  // Icon SVG untuk Hapus (Trash)
  const TrashIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  );

  const editingData = editingId
    ? testimonials.find((t) => t.id === editingId)
    : null;

  const totalItems = testimonials.length;

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-primary-blue">
          Ringkasan Data Testimoni
        </h1>

        <div className="py-8 border-t-2 border-b-2 border-gray-200">
          {totalItems > 0 ? (
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
                  totalItems > 4
                    ? {
                        nextEl: ".testimoni-page-next-btn",
                        prevEl: ".testimoni-page-prev-btn",
                      }
                    : false
                }
                pagination={
                  totalItems > 4
                    ? {
                        clickable: true,
                      }
                    : false
                }
                className="testimoni-swiper"
              >
                {testimonials.map((testimoni) => (
                  <SwiperSlide key={testimoni.id}>
                    <div
                      className="rounded-lg p-4 text-center hover:shadow-lg transition-all hover:scale-105 h-full flex flex-col bg-white"
                      style={{
                        border: "2px solid #e5e7eb",
                        boxShadow:
                          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                      }}
                    >
                      <h3
                        className="font-semibold pb-2 mb-3"
                        style={{ borderBottom: "1px solid #f3f4f6" }}
                      >
                        {testimoni.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 min-h-[60px] flex-grow">
                        {testimoni.text}
                      </p>
                      <div className="flex justify-center mb-3">
                        <StarRating rating={testimoni.rating} />
                      </div>
                      <div className="flex justify-center space-x-2">
                        <button
                          className="bg-red-500 text-white text-sm px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                          onClick={() => handleDelete(testimoni.id)}
                        >
                          Hapus
                        </button>
                        <button
                          className="bg-[#0066AE] text-white text-sm px-3 py-1 rounded-md hover:bg-[#005a9e] transition-colors"
                          onClick={() => handleEdit(testimoni.id)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {totalItems > 4 && (
                <>
                  <button
                    className="testimoni-page-prev-btn absolute left-0 top-[35%] -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg bg-primary-blue"
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
                    className="testimoni-page-next-btn absolute right-0 top-[35%] -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg bg-primary-blue"
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
            <div className="text-center py-8 text-gray-500">
              <p>Belum ada testimoni</p>
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            marginTop: "1.5rem",
            justifyContent: "flex-start",
          }}
        >
          <button
            onClick={handleAdd}
            style={{
              backgroundColor: "#0066AE",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "background-color 0.2s",
              boxShadow: "none",
              outline: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              appearance: "none",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#005a9e")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#0066AE")
            }
          >
            <EditIcon />
            Tambah
          </button>
          <button
            onClick={handleDeleteAll}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              fontWeight: 500,
              color: "#ffffff",
              backgroundColor: "#ef4444",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#dc2626")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#ef4444")
            }
          >
            <TrashIcon />
            Hapus Semua
          </button>
        </div>

        {/* Tombol Simpan Perubahan */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1.5rem",
          }}
        >
          <button
            onClick={handleSave}
            style={{
              backgroundColor: "#0066AE",
              color: "#ffffff",
              padding: "0.75rem 2rem",
              borderRadius: "0.5rem",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#005a9e")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#0066AE")
            }
          >
            Simpan Perubahan
          </button>
        </div>
      </div>

      {/* Modal */}
      <TestimoniModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingId(null);
        }}
        onSave={handleSaveModal}
        initialData={editingData || null}
        onError={(message) => setErrorModal({ isOpen: true, message })}
      />

      {/* Modal Konfirmasi Hapus */}
      {deleteConfirm.isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn"
          onClick={cancelDelete}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
              Konfirmasi Hapus
            </h3>
            <p className="text-center text-gray-600 mb-6">
              {deleteConfirm.type === "all"
                ? "Apakah Anda yakin ingin menghapus semua testimoni?"
                : "Apakah Anda yakin ingin menghapus testimoni ini?"}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={cancelDelete}
                className="px-6 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {errorModal.isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] animate-fadeIn"
          onClick={() => setErrorModal({ isOpen: false, message: "" })}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 animate-slideUp z-[10000]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
              Perhatian
            </h3>
            <p className="text-center text-gray-600 mb-6 leading-relaxed">
              {errorModal.message}
            </p>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setErrorModal({ isOpen: false, message: "" })}
                className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {successModal.isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] animate-fadeIn"
          onClick={() => setSuccessModal({ isOpen: false, message: "" })}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 animate-slideUp z-[10000]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
              Berhasil
            </h3>
            <p className="text-center text-gray-600 mb-6 leading-relaxed">
              {successModal.message}
            </p>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setSuccessModal({ isOpen: false, message: "" })}
                className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Testimoni;
