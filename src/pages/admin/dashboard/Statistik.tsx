import { useState, useEffect } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import axios from "axios";

// Hapus Context, kita ganti dengan API
// import { useStatistik } from "../../../contexts/StatistikContext";

const API_BASE_URL = "http://127.0.0.1:8000/api";

// Interface Data
interface StatistikItem {
  id: number;
  label: string;
  value: string;
  dbField: string; // Mapping ke kolom database
}

const Statistik = () => {
  // State Utama (Default 0 agar tidak error saat loading)
  const [statistikData, setStatistikData] = useState<StatistikItem[]>([
    {
      id: 1,
      label: "Tahun Pengalaman",
      value: "0",
      dbField: "tahun_pengalaman",
    },
    { id: 2, label: "Proyek Selesai", value: "0", dbField: "proyek_selesai" },
    { id: 3, label: "Klien Puas", value: "0", dbField: "klien_puas" },
    { id: 4, label: "Kota", value: "0", dbField: "sebaran_kota" },
  ]);

  const [dbId, setDbId] = useState<number | null>(null); // ID Database
  const [tempStatistikData, setTempStatistikData] = useState(statistikData);
  const [isLoading, setIsLoading] = useState(false);

  // Auth Token
  const token = localStorage.getItem("admin_token");
  const authConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // --- 1. AMBIL DATA DARI DATABASE (FETCH) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/statistic`);
        if (response.data.success && response.data.data.length > 0) {
          const data = response.data.data[0];
          setDbId(data.id);

          // Masukkan data database ke format UI
          const newData = [
            {
              id: 1,
              label: "Tahun Pengalaman",
              value: data.tahun_pengalaman,
              dbField: "tahun_pengalaman",
            },
            {
              id: 2,
              label: "Proyek Selesai",
              value: data.proyek_selesai,
              dbField: "proyek_selesai",
            },
            {
              id: 3,
              label: "Klien Puas",
              value: data.klien_puas,
              dbField: "klien_puas",
            },
            {
              id: 4,
              label: "Kota",
              value: data.sebaran_kota,
              dbField: "sebaran_kota",
            },
          ];
          setStatistikData(newData);
          setTempStatistikData(newData);
        }
      } catch (error) {
        console.error("Gagal mengambil data statistik:", error);
      }
    };
    fetchData();
  }, []);

  const [isEditingAll, setIsEditingAll] = useState<boolean>(false);
  const [editValues, setEditValues] = useState<{ [key: number]: string }>({});
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);

  // Modal Sukses & Error
  const [statusModal, setStatusModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    message: string;
  }>({ isOpen: false, type: "success", message: "" });

  const handleEditAll = () => {
    setIsEditingAll(true);
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
    setTempStatistikData(statistikData); // Reset ke data asli
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

  // --- 2. SIMPAN KE DATABASE (LOGIC UTAMA) ---
  const handleSaveChanges = async () => {
    setIsLoading(true);

    // Ubah Format Array UI -> Object Database
    const payload: any = {};
    tempStatistikData.forEach((item) => {
      payload[item.dbField] = item.value;
    });

    try {
      if (dbId) {
        // UPDATE DATA
        await axios.put(
          `${API_BASE_URL}/statistic/${dbId}`,
          payload,
          authConfig
        );
      } else {
        // BUAT DATA BARU (Pertama kali)
        const res = await axios.post(
          `${API_BASE_URL}/statistic`,
          payload,
          authConfig
        );
        setDbId(res.data.data.id);
      }

      setStatistikData(tempStatistikData); // Update state utama
      setStatusModal({
        isOpen: true,
        type: "success",
        message: "Perubahan berhasil disimpan ke database!",
      });
    } catch (error) {
      console.error("Gagal menyimpan:", error);
      setStatusModal({
        isOpen: true,
        type: "error",
        message: "Gagal menyimpan data. Cek login Anda.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Icon SVG
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
              >
                <EditIcon />
                Setel Nilai
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
              >
                <TrashIcon />
                Reset
              </button>
            </>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={handleSaveChanges}
            disabled={isLoading}
            style={{
              backgroundColor: "#0066AE",
              color: "#ffffff",
              padding: "0.75rem 2rem",
              borderRadius: "0.5rem",
              fontWeight: 500,
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontSize: "1rem",
              transition: "background-color 0.2s",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? "Menyimpan..." : "Simpan Perubahan ke Database"}
          </button>
        </div>
      </div>

      {/* Modal Konfirmasi Reset */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn"
          onClick={cancelDeleteAll}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
              Reset Angka?
            </h3>
            <p className="text-center text-gray-600 mb-6">
              Semua angka akan dikembalikan menjadi 0.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={cancelDeleteAll}
                className="px-6 py-2.5 bg-gray-300 text-gray-700 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={confirmDeleteAll}
                className="px-6 py-2.5 bg-red-500 text-white rounded-lg"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Status (Success/Error) */}
      {statusModal.isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] animate-fadeIn"
          onClick={() => setStatusModal({ ...statusModal, isOpen: false })}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className={`text-xl font-bold text-center mb-2 ${
                statusModal.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {statusModal.type === "success" ? "Berhasil" : "Gagal"}
            </h3>
            <p className="text-center text-gray-600 mb-6">
              {statusModal.message}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() =>
                  setStatusModal({ ...statusModal, isOpen: false })
                }
                className="px-6 py-2 bg-[#0066AE] text-white rounded-lg"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
      `}</style>
    </DashboardLayout>
  );
};

export default Statistik;
