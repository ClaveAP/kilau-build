import { useState, useEffect } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useStatistik } from "../../../contexts/StatistikContext";

const Statistik = () => {
  const { statistikData, setStatistikData } = useStatistik();
  // Temporary state untuk menyimpan perubahan sebelum di-save
  const [tempStatistikData, setTempStatistikData] = useState(statistikData);

  // Initialize tempStatistikData dari context saat component mount atau context berubah
  useEffect(() => {
    setTempStatistikData(statistikData);
  }, [statistikData]);

  const [isEditingAll, setIsEditingAll] = useState<boolean>(false);
  const [editValues, setEditValues] = useState<{ [key: number]: string }>({});
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    message: string;
  }>({
    isOpen: false,
    message: "",
  });

  const handleEditAll = () => {
    setIsEditingAll(true);
    // Initialize edit values with current values
    const initialValues: { [key: number]: string } = {};
    tempStatistikData.forEach((item) => {
      initialValues[item.id] = item.value;
    });
    setEditValues(initialValues);
  };

  const handleSaveAll = () => {
    const updatedData = tempStatistikData.map((item) => {
      const newValue =
        editValues[item.id] !== undefined ? editValues[item.id] : item.value;
      // Jika value kosong setelah trim, set menjadi "0"
      const finalValue = newValue?.trim() === "" ? "0" : newValue || "0";
      return {
        ...item,
        value: finalValue,
      };
    });
    setTempStatistikData(updatedData);
    setIsEditingAll(false);
    setEditValues({});
  };

  const getPlaceholder = (label: string): string => {
    const placeholders: { [key: string]: string } = {
      "Tahun Pengalaman": "Contoh: 20 tahun",
      "Proyek Selesai": "Contoh: 500 proyek",
      "Klien Puas": "Contoh: 100 klien",
      Kota: "Contoh: 50 kota",
    };
    return placeholders[label] || "Ketik teks atau angka";
  };

  const handleCancelEdit = () => {
    setIsEditingAll(false);
    setEditValues({});
  };

  const handleUpdateEditValue = (id: number, value: string) => {
    setEditValues({
      ...editValues,
      [id]: value,
    });
  };

  const handleDeleteAll = () => {
    setDeleteConfirm(true);
  };

  const confirmDeleteAll = () => {
    // Hanya hapus nilai (set menjadi "0"), bukan hapus semua item
    const updatedData = tempStatistikData.map((item) => ({
      ...item,
      value: "0",
    }));
    setTempStatistikData(updatedData);
    setDeleteConfirm(false);
  };

  const cancelDeleteAll = () => {
    setDeleteConfirm(false);
  };

  const handleSaveChanges = () => {
    // Simpan perubahan dari tempStatistikData ke context
    setStatistikData(tempStatistikData);
    setSuccessModal({ isOpen: true, message: "Perubahan berhasil disimpan!" });
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

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-primary-blue">
          Ringkasan Data Statistik
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {tempStatistikData.map((item) => (
            <div
              key={item.id}
              className="border border-primary-blue-light rounded-lg p-4 shadow-sm"
            >
              <label className="text-sm text-gray-500 block mb-2">
                {item.label}
              </label>
              {isEditingAll ? (
                <input
                  type="text"
                  value={
                    editValues[item.id] !== undefined
                      ? editValues[item.id]
                      : item.value
                  }
                  onChange={(e) =>
                    handleUpdateEditValue(item.id, e.target.value)
                  }
                  className="text-2xl font-bold border-b-2 border-[#0066AE] focus:outline-none focus:border-[#005a9e] w-full text-primary-blue"
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      handleCancelEdit();
                    }
                  }}
                  placeholder={getPlaceholder(item.label)}
                />
              ) : (
                <p className="text-2xl font-bold text-primary-blue">
                  {item.value || "0"}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3 mb-8 justify-start">
          {isEditingAll ? (
            <>
              <button
                onClick={handleSaveAll}
                style={{
                  backgroundColor: "#0066AE",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
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
                <EditIcon />
                Simpan
              </button>
              <button
                onClick={handleCancelEdit}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  fontWeight: 500,
                  color: "#ffffff",
                  backgroundColor: "#6b7280",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#4b5563")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#6b7280")
                }
              >
                Batal
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEditAll}
                style={{
                  backgroundColor: "#0066AE",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
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
                <EditIcon />
                Edit
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
                Hapus
              </button>
            </>
          )}
        </div>

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

      {/* Modal Konfirmasi Hapus */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn"
          onClick={cancelDeleteAll}
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
              Apakah Anda yakin ingin menghapus semua angka statistik? (Data
              akan direset menjadi 0)
            </p>
            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={cancelDeleteAll}
                className="px-6 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDeleteAll}
                className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                Hapus
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

export default Statistik;
