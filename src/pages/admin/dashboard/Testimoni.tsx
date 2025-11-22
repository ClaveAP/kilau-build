import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export interface TestimoniData {
  id: number;
  name: string;
  text: string;
  rating: number;
}

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
    } else {
      if (onError) onError("Nama dan testimoni tidak boleh kosong!");
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
                  {r} Bintang
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0066AE] text-white rounded-md hover:bg-[#005a9e]"
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
  const [testimonials, setTestimonials] = useState<TestimoniData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/testimoni`);
      if (response.data.success) {
        const mappedData = response.data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          text: item.review,
          rating: item.star,
        }));
        setTestimonials(mappedData);
      }
    } catch (error) {
      console.error("Error fetching testimoni:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({ isOpen: false, id: null });
  const [errorModal, setErrorModal] = useState<{
    isOpen: boolean;
    message: string;
  }>({ isOpen: false, message: "" });
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    message: string;
  }>({ isOpen: false, message: "" });

  const handleDelete = (id: number) => setDeleteConfirm({ isOpen: true, id });
  const handleAdd = () => {
    setEditingId(null);
    setIsModalOpen(true);
  };
  const handleEdit = (id: number) => {
    setEditingId(id);
    setIsModalOpen(true);
  };

  const handleSaveModal = async (data: {
    name: string;
    text: string;
    rating: number;
  }) => {
    const token = localStorage.getItem("admin_token");
    const authConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const payload = {
      name: data.name,
      review: data.text,
      star: data.rating,
    };

    try {
      if (editingId) {
        await axios.put(
          `${API_BASE_URL}/testimoni/${editingId}`,
          payload,
          authConfig
        );
        setSuccessModal({
          isOpen: true,
          message: "Testimoni berhasil diperbarui!",
        });
      } else {
        await axios.post(`${API_BASE_URL}/testimoni`, payload, authConfig);
        setSuccessModal({
          isOpen: true,
          message: "Testimoni baru berhasil ditambahkan!",
        });
      }
      fetchTestimonials();
      setIsModalOpen(false);
      setEditingId(null);
    } catch (error: any) {
      console.error("Error saving:", error);
      let errorMessage = "Gagal menyimpan data.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setErrorModal({ isOpen: true, message: errorMessage });
    }
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("admin_token");
    const authConfig = { headers: { Authorization: `Bearer ${token}` } };

    if (deleteConfirm.id) {
      try {
        await axios.delete(
          `${API_BASE_URL}/testimoni/${deleteConfirm.id}`,
          authConfig
        );
        setSuccessModal({
          isOpen: true,
          message: "Testimoni berhasil dihapus!",
        });
        fetchTestimonials();
      } catch (error) {
        console.error("Error deleting:", error);
        setErrorModal({
          isOpen: true,
          message: "Gagal menghapus data.",
        });
      }
    }
    setDeleteConfirm({ isOpen: false, id: null });
  };

  const cancelDelete = () => setDeleteConfirm({ isOpen: false, id: null });

  const editingData = editingId
    ? testimonials.find((t) => t.id === editingId)
    : null;
  const totalItems = testimonials.length;

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header Halaman */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#0066AE]">
            Ringkasan Data Testimoni
          </h1>
        </div>

        {isLoading && testimonials.length === 0 && (
          <p className="text-center text-gray-400">Memuat data...</p>
        )}

        <div className="py-4">
          {totalItems > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {testimonials.map((testimoni) => (
                <div
                  key={testimoni.id}
                  className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-all hover:scale-[1.02] flex flex-col h-full border-2 border-gray-200 shadow-sm"
                >
                  <h3 className="font-semibold pb-2 mb-3 border-b border-gray-100">
                    {testimoni.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 min-h-[60px] grow">
                    {testimoni.text}
                  </p>

                  <div className="flex justify-center mb-3">
                    <StarRating rating={testimoni.rating} />
                  </div>

                  <div className="flex justify-center space-x-2 mt-auto">
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
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Belum ada testimoni. Tambahkan sekarang!</p>
            </div>
          )}
        </div>

        {/*  Tambah */}
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
            }}
          >
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
            Tambah Testimoni
          </button>
        </div>
      </div>

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
            <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
              Konfirmasi Hapus
            </h3>
            <p className="text-center text-gray-600 mb-6">
              Yakin ingin menghapus testimoni ini?
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={cancelDelete}
                className="px-6 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Modals */}
      {(successModal.isOpen || errorModal.isOpen) && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] animate-fadeIn"
          onClick={() => {
            setSuccessModal({ isOpen: false, message: "" });
            setErrorModal({ isOpen: false, message: "" });
          }}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className={`text-xl font-bold text-center mb-2 ${
                successModal.isOpen ? "text-green-600" : "text-red-600"
              }`}
            >
              {successModal.isOpen ? "Berhasil" : "Gagal"}
            </h3>
            <p className="text-center text-gray-600 mb-6">
              {successModal.message || errorModal.message}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setSuccessModal({ isOpen: false, message: "" });
                  setErrorModal({ isOpen: false, message: "" });
                }}
                className={`px-6 py-2 text-white rounded-lg ${
                  successModal.isOpen ? "bg-green-500" : "bg-red-500"
                }`}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{` .animate-fadeIn { animation: fadeIn 0.2s ease-out; } .animate-slideUp { animation: slideUp 0.3s ease-out; } `}</style>
    </DashboardLayout>
  );
};

export default Testimoni;
