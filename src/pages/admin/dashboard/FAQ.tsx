import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const FAQ = () => {
  const [faqs, setFaqs] = useState<any[]>([]);

  const token = localStorage.getItem("admin_token");

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function fetchFaqs() {
    axios
      .get(`${API_URL}/faq`)
      .then((response) => {
        setFaqs(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching FAQs:", error);
      });
  }

  useEffect(() => {
    fetchFaqs();
  }, []);

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editQuestion, setEditQuestion] = useState<string>("");
  const [editAnswer, setEditAnswer] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [newAnswer, setNewAnswer] = useState<string>("");

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

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleEdit = (id: number) => {
    const faq = faqs.find((f) => f.id === id);
    if (faq) {
      setEditingId(id);
      setEditQuestion(faq.question);
      setEditAnswer(faq.answer);
      setExpandedId(id);
    }
  };

  const handleSaveEdit = () => {
    if (editingId) {
      if (!editQuestion.trim() || !editAnswer.trim()) {
        setErrorModal({
          isOpen: true,
          message: "Pertanyaan dan jawaban tidak boleh kosong!",
        });
        return;
      }

      axios
        .put(
          `${API_URL}/faq/${editingId}`,
          {
            question: editQuestion.trim(),
            answer: editAnswer.trim(),
          },
          authConfig
        )
        .then(() => {
          fetchFaqs();
          setEditingId(null);
          setEditQuestion("");
          setEditAnswer("");
          setSuccessModal({
            isOpen: true,
            message: "Perubahan berhasil disimpan!",
          });
        })
        .catch((err) => {
          console.error(err);
          setErrorModal({
            isOpen: true,
            message: "Gagal menyimpan perubahan. Cek login Anda.",
          });
        });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditQuestion("");
    setEditAnswer("");
  };

  const handleDelete = (id: number) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = () => {
    if (deleteConfirm.id) {
      axios
        .delete(`${API_URL}/faq/${deleteConfirm.id}`, authConfig)
        .then(() => {
          fetchFaqs();
          if (expandedId === deleteConfirm.id) {
            setExpandedId(null);
          }
          setDeleteConfirm({ isOpen: false, id: null });
          setSuccessModal({ isOpen: true, message: "FAQ berhasil dihapus!" });
        })
        .catch((error) => {
          console.error("Error deleting FAQ:", error);
          setErrorModal({
            isOpen: true,
            message: "Gagal menghapus FAQ!",
          });
          setDeleteConfirm({ isOpen: false, id: null });
        });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, id: null });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setNewQuestion("");
    setNewAnswer("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewQuestion("");
    setNewAnswer("");
  };

  const handleSaveAdd = async () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      setErrorModal({
        isOpen: true,
        message: "Pertanyaan dan jawaban tidak boleh kosong!",
      });
      return;
    }

    axios
      .post(
        `${API_URL}/faq`,
        {
          question: newQuestion,
          answer: newAnswer,
        },
        authConfig
      )
      .then((response) => {
        console.log("Created:", response.data.data);
        fetchFaqs();
        handleCloseModal();
        setSuccessModal({
          isOpen: true,
          message: "FAQ baru berhasil ditambahkan!",
        });
      })
      .catch((err) => {
        console.error(err);
        setErrorModal({
          isOpen: true,
          message: "Gagal menambahkan FAQ. Cek login Anda.",
        });
      });
  };

  // Icon Components
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

  const PlusIcon = () => (
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
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-primary-blue">
          FAQ (Frequently Asked Questions)
        </h1>

        <div
          className={`space-y-3 mb-4 p-2 ${
            faqs.length > 6 ? "max-h-[60vh] overflow-y-auto" : ""
          }`}
        >
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-[#E3F2FD] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-[#BBDEFB]"
            >
              {editingId === faq.id ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pertanyaan
                    </label>
                    <input
                      type="text"
                      value={editQuestion}
                      onChange={(e) => setEditQuestion(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
                      placeholder="Masukkan pertanyaan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Jawaban
                    </label>
                    <textarea
                      value={editAnswer}
                      onChange={(e) => setEditAnswer(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
                      placeholder="Masukkan jawaban"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="px-3 py-1.5 bg-[#0066AE] hover:bg-[#005a9e] text-white text-sm rounded-md transition-colors flex items-center gap-1"
                    >
                      <EditIcon />
                      Simpan
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-3 py-1.5 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm rounded-md transition-colors"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start gap-3">
                    <button
                      onClick={() => toggleExpand(faq.id)}
                      className="font-semibold text-left flex-1 text-gray-800 hover:text-[#0066AE] transition-colors flex items-center gap-2"
                    >
                      <span className="flex-1">{faq.question}</span>
                      <span
                        className={`transform transition-transform ${
                          expandedId === faq.id ? "rotate-180" : ""
                        }`}
                      >
                        <ChevronDownIcon />
                      </span>
                    </button>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleEdit(faq.id)}
                        className="px-3 py-1.5 bg-[#0066AE] hover:bg-[#005a9e] text-white text-sm rounded-md transition-colors flex items-center gap-1"
                      >
                        <EditIcon />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition-colors flex items-center gap-1"
                      >
                        <TrashIcon />
                        Hapus
                      </button>
                    </div>
                  </div>
                  {expandedId === faq.id && (
                    <div className="mt-3 pt-3 border-t border-[#BBDEFB]">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tambah Button */}
        <div style={{ marginBottom: "1.5rem" }}>
          <button
            onClick={handleOpenModal}
            style={{
              backgroundColor: "#0066AE",
              color: "#ffffff",
              width: "100%",
              padding: "0.75rem 1rem",
              fontWeight: 500,
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              transition: "background-color 0.2s",
            }}
          >
            <PlusIcon />
            Tambah FAQ
          </button>
        </div>
      </div>

      {/* Modal Tambah FAQ */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center animate-fadeIn z-[9999]"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 animate-slideUp z-[10000]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-primary-blue">
              Tambah FAQ Baru
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pertanyaan
                </label>
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
                  placeholder="Masukkan pertanyaan"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jawaban
                </label>
                <textarea
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
                  placeholder="Masukkan jawaban"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "0.75rem",
                }}
              >
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveAdd}
                  className="px-4 py-2 bg-[#0066AE] hover:bg-[#005a9e] text-white rounded-md transition-colors"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
              Apakah Anda yakin ingin menghapus FAQ ini?
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={cancelDelete}
                className="px-6 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg"
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
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
          onClick={() => setErrorModal({ isOpen: false, message: "" })}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-center text-red-600 mb-2">
              Error
            </h3>
            <p className="text-center text-gray-600 mb-6">
              {errorModal.message}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setErrorModal({ isOpen: false, message: "" })}
                className="px-6 py-2 bg-red-500 text-white rounded-lg"
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
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
          onClick={() => setSuccessModal({ isOpen: false, message: "" })}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-center text-green-600 mb-2">
              Berhasil
            </h3>
            <p className="text-center text-gray-600 mb-6">
              {successModal.message}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setSuccessModal({ isOpen: false, message: "" })}
                className="px-6 py-2 bg-green-500 text-white rounded-lg"
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
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
      `}</style>
    </DashboardLayout>
  );
};

export default FAQ;
