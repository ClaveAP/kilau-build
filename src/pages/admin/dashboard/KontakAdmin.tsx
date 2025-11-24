import { useState, useEffect } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import axios from "axios";

interface KontakItem {
  id: number;
  type: "lokasi" | "kontak" | "email";
  value: string;
  alamat?: string;
  mapsUrl?: string;
  latitude?: number;
  longitude?: number;
}

const API_URL = import.meta.env.VITE_API_URL;
const KontakAdmin = () => {
  const [kontakData, setKontakData] = useState<KontakItem[]>([]);
  const [dbId, setDbId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("admin_token");
  const authConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/contact`);
        if (response.data.success && response.data.data.length > 0) {
          const data = response.data.data[0];
          setDbId(data.id);

          const mappedData: KontakItem[] = [
            {
              id: 1,
              type: "lokasi",
              value: data.alamat || "-",
              alamat: data.alamat || "-",
              mapsUrl: data.link_gmaps || "",
            },
            {
              id: 2,
              type: "kontak",
              value: data.no_telp || "-",
            },
            {
              id: 3,
              type: "email",
              value: data.email || "-",
            },
          ];
          setKontakData(mappedData);
        } else {
          setKontakData([]);
        }
      } catch (error) {
        console.error("Error fetch kontak:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "lokasi" | "kontak" | "email" | null
  >(null);
  const [newValue, setNewValue] = useState<string>("");

  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    id: number | null;
    type: "single" | "all";
  }>({ isOpen: false, id: null, type: "single" });

  // State Edit Lokasi
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [editLocationData, setEditLocationData] = useState<{
    alamat: string;
    mapsUrl: string;
  }>({ alamat: "", mapsUrl: "" });

  // State Tambah Lokasi
  const [newLocationData, setNewLocationData] = useState<{
    alamat: string;
    mapsUrl: string;
  }>({ alamat: "", mapsUrl: "" });

  // State Modals
  const [errorModal, setErrorModal] = useState<{
    isOpen: boolean;
    message: string;
  }>({ isOpen: false, message: "" });
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    message: string;
  }>({ isOpen: false, message: "" });

  // --- HELPERS ---
  const convertToEmbedUrl = (url: string): string => {
    if (!url) return "";
    if (url.includes("/maps/embed")) return url;
    try {
      if (url.includes("?q=")) {
        const match = url.match(/[?&]q=([^&]+)/);
        if (match && match[1])
          return `https://www.google.com/maps?q=${match[1]}&hl=id&z=14&output=embed`;
      }
      const match2 = url.match(/@([^,]+),([^,]+)/);
      if (match2)
        return `https://www.google.com/maps?q=${match2[1]},${match2[2]}&hl=id&z=14&output=embed`;
      return url;
    } catch (e) {
      return url;
    }
  };

  // --- HANDLERS (UI Asli) ---
  const handleEdit = (id: number) => {
    const item = kontakData.find((k) => k.id === id);
    if (!item) return;

    if (item.type === "lokasi") {
      setIsEditingLocation(true);
      setEditingId(id);
      setEditLocationData({
        alamat: item.alamat || item.value,
        mapsUrl: item.mapsUrl || "",
      });
      setEditValue("");
    } else {
      setIsEditingLocation(false);
      setEditingId(id);
      setEditValue(item.value);
      setEditLocationData({ alamat: "", mapsUrl: "" });
    }
  };

  const handleSaveEdit = () => {
    if (editingId) {
      if (isEditingLocation) {
        if (!editLocationData.alamat.trim()) {
          setErrorModal({
            isOpen: true,
            message: "Alamat tidak boleh kosong!",
          });
          return;
        }
        setKontakData(
          kontakData.map((item) => {
            if (item.id === editingId) {
              return {
                ...item,
                value: editLocationData.alamat.trim(),
                alamat: editLocationData.alamat.trim(),
                mapsUrl: editLocationData.mapsUrl.trim(),
              };
            }
            return item;
          })
        );
        setIsEditingLocation(false);
      } else {
        if (editValue.trim()) {
          setKontakData(
            kontakData.map((item) =>
              item.id === editingId
                ? { ...item, value: editValue.trim() }
                : item
            )
          );
        }
      }
      setEditingId(null);
      setEditValue("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
    setIsEditingLocation(false);
  };

  const handleDelete = (id: number) =>
    setDeleteConfirm({ isOpen: true, id, type: "single" });

  const confirmDelete = () => {
    if (deleteConfirm.id) {
      setKontakData(kontakData.filter((item) => item.id !== deleteConfirm.id));
    }
    setDeleteConfirm({ isOpen: false, id: null, type: "single" });
  };

  const cancelDelete = () =>
    setDeleteConfirm({ isOpen: false, id: null, type: "single" });

  const handleOpenModal = (type: "lokasi" | "kontak" | "email") => {
    setModalType(type);
    setIsModalOpen(true);
    setNewValue("");
    setNewLocationData({ alamat: "", mapsUrl: "" });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const handleSaveAdd = () => {
    if (modalType) {
      const maxId =
        kontakData.length > 0 ? Math.max(...kontakData.map((k) => k.id)) : 0;

      if (modalType === "lokasi") {
        if (!newLocationData.alamat.trim()) {
          setErrorModal({
            isOpen: true,
            message: "Alamat tidak boleh kosong!",
          });
          return;
        }
        setKontakData([
          ...kontakData,
          {
            id: maxId + 1,
            type: "lokasi",
            value: newLocationData.alamat.trim(),
            alamat: newLocationData.alamat.trim(),
            mapsUrl: newLocationData.mapsUrl.trim(),
          },
        ]);
      } else {
        if (newValue.trim()) {
          setKontakData([
            ...kontakData,
            { id: maxId + 1, type: modalType, value: newValue.trim() },
          ]);
        } else {
          setErrorModal({ isOpen: true, message: "Nilai tidak boleh kosong!" });
          return;
        }
      }
      handleCloseModal();
    }
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);

    const lokasiItem = kontakData.find((k) => k.type === "lokasi");
    const kontakItem = kontakData.find((k) => k.type === "kontak");
    const emailItem = kontakData.find((k) => k.type === "email");

    // Validasi Database: Semua field wajib ada
    // Jika user menghapus item dari list, kita kirim "-" agar tidak error di database
    const payload = {
      alamat: lokasiItem?.alamat || lokasiItem?.value || "-",
      link_gmaps: lokasiItem?.mapsUrl || "-",
      no_telp: kontakItem?.value || "-",
      email: emailItem?.value || "-",
    };

    try {
      if (dbId) {
        // UPDATE
        await axios.put(`${API_URL}/contact/${dbId}`, payload, authConfig);
      } else {
        // CREATE BARU
        const res = await axios.post(`${API_URL}/contact`, payload, authConfig);
        setDbId(res.data.data.id);
      }
      setSuccessModal({
        isOpen: true,
        message: "Perubahan berhasil disimpan ke database!",
      });
    } catch (error) {
      console.error("Gagal simpan:", error);
      setErrorModal({
        isOpen: true,
        message: "Gagal menyimpan. Pastikan Anda login.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (type: string) => {
    const iconStyle = { color: "#0066AE", fontSize: "20px" };
    switch (type) {
      case "lokasi":
        return <FaMapMarkerAlt style={iconStyle} />;
      case "kontak":
        return <FaPhoneAlt style={iconStyle} />;
      case "email":
        return <FaEnvelope style={iconStyle} />;
      default:
        return <FaMapMarkerAlt style={iconStyle} />;
    }
  };

  const getLabel = (type: string) => {
    switch (type) {
      case "lokasi":
        return "Lokasi";
      case "kontak":
        return "Kontak";
      case "email":
        return "Email";
      default:
        return "Lokasi";
    }
  };

  const getPlaceholder = (type: string) => {
    switch (type) {
      case "lokasi":
        return "Masukkan alamat lengkap";
      case "kontak":
        return "Masukkan nomor telepon (contoh: +62 877-7636-0795)";
      case "email":
        return "Masukkan alamat email (contoh: kilaubuild@gmail.com)";
      default:
        return "Masukkan nilai";
    }
  };

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

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-primary-blue">
          Kontak dan Lokasi
        </h1>

        {isLoading && kontakData.length === 0 ? (
          <p className="text-center text-gray-400">Memuat data...</p>
        ) : (
          <div className="space-y-4 mb-6">
            {kontakData.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative"
              >
                {(() => {
                  const isEditingThis = editingId === item.id;
                  const isLocationType = item.type === "lokasi";

                  if (isEditingThis && isLocationType && isEditingLocation) {
                    return (
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 mt-1">
                          {getIcon(item.type)}
                        </div>
                        <div className="grow space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Alamat Lengkap
                            </label>
                            <input
                              type="text"
                              value={editLocationData.alamat}
                              onChange={(e) =>
                                setEditLocationData({
                                  ...editLocationData,
                                  alamat: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
                              placeholder="Masukkan alamat lengkap"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              URL Google Maps
                            </label>
                            <input
                              type="text"
                              value={editLocationData.mapsUrl}
                              onChange={(e) =>
                                setEditLocationData({
                                  ...editLocationData,
                                  mapsUrl: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
                              placeholder="https://www.google.com/maps..."
                            />
                          </div>
                          {editLocationData.mapsUrl && (
                            <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden h-48 relative">
                              <iframe
                                src={convertToEmbedUrl(
                                  editLocationData.mapsUrl
                                )}
                                width="100%"
                                height="100%"
                                className="border-0"
                                allowFullScreen
                                loading="lazy"
                              ></iframe>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveEdit}
                              className="px-3 py-1.5 bg-[#0066AE] text-white text-sm rounded-md flex items-center gap-1"
                            >
                              <EditIcon /> Simpan
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-3 py-1.5 bg-gray-300 text-gray-700 text-sm rounded-md"
                            >
                              Batal
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  } else if (isEditingThis && !isLocationType) {
                    return (
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 mt-1">
                          {getIcon(item.type)}
                        </div>
                        <div className="grow">
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE] mb-3"
                            placeholder={getPlaceholder(item.type)}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveEdit}
                              className="px-3 py-1.5 bg-[#0066AE] text-white text-sm rounded-md flex items-center gap-1"
                            >
                              <EditIcon /> Simpan
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-3 py-1.5 bg-gray-500 text-white text-sm rounded-md"
                            >
                              Batal
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 mt-1">
                          {getIcon(item.type)}
                        </div>
                        <div className="grow">
                          <h3 className="font-semibold text-gray-800 mb-1">
                            {getLabel(item.type)}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {item.alamat || item.value}
                          </p>
                          {item.type === "lokasi" && item.mapsUrl && (
                            <div className="mt-2 text-sm text-[#0066AE]">
                              Maps Tersimpan
                            </div>
                          )}
                        </div>
                        <div className="shrink-0 flex gap-2">
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="px-3 py-1.5 bg-[#0066AE] text-white text-sm rounded-md flex items-center gap-1"
                          >
                            <EditIcon /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-md flex items-center gap-1"
                          >
                            <TrashIcon /> Hapus
                          </button>
                        </div>
                      </div>
                    );
                  }
                })()}
              </div>
            ))}

            <button
              onClick={() => setIsModalOpen(true)}
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
              }}
            >
              <PlusIcon /> Tambah
            </button>
          </div>
        )}

        {/* Save Changes Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1.5rem",
          }}
        >
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
            }}
          >
            {isLoading ? "Menyimpan..." : "Simpan Perubahan ke Database"}
          </button>
        </div>
      </div>

      {/* Modal Tambah */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 animate-fadeIn z-[9999]"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 animate-slideUp z-[10000]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-primary-blue">
              Tambah Kontak
            </h2>
            {!modalType ? (
              <div className="space-y-3">
                {["lokasi", "kontak", "email"].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleOpenModal(type as any)}
                    className="w-full flex items-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-[#0066AE] hover:bg-[#E3F2FD] transition-all text-left"
                  >
                    {getIcon(type)}
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Tambah {getLabel(type)}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>
            ) : modalType === "lokasi" ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={newLocationData.alamat}
                  onChange={(e) =>
                    setNewLocationData({
                      ...newLocationData,
                      alamat: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Alamat Lengkap"
                  autoFocus
                />
                <input
                  type="text"
                  value={newLocationData.mapsUrl}
                  onChange={(e) =>
                    setNewLocationData({
                      ...newLocationData,
                      mapsUrl: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="URL Google Maps"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-300 rounded-md"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSaveAdd}
                    className="px-4 py-2 bg-[#0066AE] text-white rounded-md"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder={getPlaceholder(modalType)}
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-300 rounded-md"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSaveAdd}
                    className="px-4 py-2 bg-[#0066AE] text-white rounded-md"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {deleteConfirm.isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
          onClick={cancelDelete}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-2">Konfirmasi Hapus</h3>
            <p className="text-gray-600 mb-6">
              Yakin ingin menghapus data ini?
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={cancelDelete}
                className="px-6 py-2 bg-gray-300 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2 bg-red-500 text-white rounded-lg"
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
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000]"
          onClick={() => {
            setSuccessModal({ isOpen: false, message: "" });
            setErrorModal({ isOpen: false, message: "" });
          }}
        >
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <h3
              className={`text-xl font-bold mb-2 ${
                successModal.isOpen ? "text-green-600" : "text-red-600"
              }`}
            >
              {successModal.isOpen ? "Berhasil" : "Gagal"}
            </h3>
            <p>{successModal.message || errorModal.message}</p>
            <button
              onClick={() => {
                setSuccessModal({ isOpen: false, message: "" });
                setErrorModal({ isOpen: false, message: "" });
              }}
              className="mt-4 px-6 py-2 bg-gray-800 text-white rounded-md"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <style>{` .animate-fadeIn { animation: fadeIn 0.2s ease-out; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } `}</style>
    </DashboardLayout>
  );
};

export default KontakAdmin;
