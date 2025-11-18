import { useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useFAQ } from "../../../contexts/FAQContext";

const FAQ = () => {
  const { faqs, setFaqs } = useFAQ();

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
  }>({
    isOpen: false,
    id: null,
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

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleEdit = (id: number) => {
    const faq = faqs.find((f) => f.id === id);
    if (faq) {
      setEditingId(id);
      setEditQuestion(faq.question);
      setEditAnswer(faq.answer);
      setExpandedId(id); // Auto expand saat edit
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
      setFaqs(
        faqs.map((faq) =>
          faq.id === editingId
            ? {
                ...faq,
                question: editQuestion.trim(),
                answer: editAnswer.trim(),
              }
            : faq
        )
      );
      setEditingId(null);
      setEditQuestion("");
      setEditAnswer("");
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
      setFaqs(faqs.filter((faq) => faq.id !== deleteConfirm.id));
      if (expandedId === deleteConfirm.id) {
        setExpandedId(null);
      }
    }
    setDeleteConfirm({ isOpen: false, id: null });
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

  const handleSaveAdd = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      setErrorModal({
        isOpen: true,
        message: "Pertanyaan dan jawaban tidak boleh kosong!",
      });
      return;
    }
    const maxId = faqs.length > 0 ? Math.max(...faqs.map((f) => f.id)) : 0;
    setFaqs([
      ...faqs,
      {
        id: maxId + 1,
        question: newQuestion.trim(),
        answer: newAnswer.trim(),
      },
    ]);
    handleCloseModal();
  };

  const handleSaveChanges = () => {
    console.log("Data FAQ yang disimpan:", faqs);
    setSuccessModal({ isOpen: true, message: "Perubahan berhasil disimpan!" });
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

        {/* FAQ List Container - Scrollable jika lebih dari 6 item */}
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
                // Edit Mode
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
                // View Mode
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
                    <div className="flex gap-2 flex-shrink-0">
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
              boxShadow: "none",
              outline: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              appearance: "none",
              textDecoration: "none",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#005a9e")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#0066AE")
            }
          >
            <PlusIcon />
            Tambah FAQ
          </button>
        </div>

        {/* Save Button */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={handleSaveChanges}
            style={{
              backgroundColor: "#0066AE",
              color: "#ffffff",
              padding: "0.75rem 2rem",
              borderRadius: "0.5rem",
              fontWeight: 500,
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
                  onClick={handleSaveAdd}
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
              Apakah Anda yakin ingin menghapus FAQ ini?
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

export default FAQ;
