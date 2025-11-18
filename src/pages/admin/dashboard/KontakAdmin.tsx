import { useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useKontak, type KontakItem } from "../../../contexts/KontakContext";

const KontakAdmin = () => {
  const { kontakData, setKontakData } = useKontak();

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
  }>({
    isOpen: false,
    id: null,
    type: "single",
  });

  // State untuk edit lokasi dengan URL Google Maps
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [editLocationData, setEditLocationData] = useState<{
    alamat: string;
    mapsUrl: string;
  }>({
    alamat: "",
    mapsUrl: "",
  });

  // State untuk tambah lokasi dengan URL Google Maps
  const [newLocationData, setNewLocationData] = useState<{
    alamat: string;
    mapsUrl: string;
  }>({
    alamat: "",
    mapsUrl: "",
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

  const handleEdit = (id: number) => {
    const item = kontakData.find((k) => k.id === id);
    if (!item) {
      return;
    }

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

  // Fungsi untuk convert URL Google Maps menjadi embed URL
  const convertToEmbedUrl = (url: string): string => {
    if (!url) return "";

    // Jika sudah embed URL, return as is
    if (url.includes("/maps/embed")) {
      return url;
    }

    try {
      // Format: https://www.google.com/maps?q=lat,lng atau alamat
      if (url.includes("?q=")) {
        const match = url.match(/[?&]q=([^&]+)/);
        if (match && match[1]) {
          const query = decodeURIComponent(match[1]);
          // Jika query adalah koordinat (lat,lng)
          if (/^-?\d+\.?\d*,-?\d+\.?\d*$/.test(query)) {
            return `https://www.google.com/maps?q=${query}&hl=id&z=14&output=embed`;
          } else {
            // Jika query adalah alamat
            return `https://www.google.com/maps?q=${encodeURIComponent(
              query
            )}&hl=id&z=14&output=embed`;
          }
        }
      }

      // Format: https://www.google.com/maps/@lat,lng,zoom
      const match2 = url.match(/@([^,]+),([^,]+)/);
      if (match2) {
        const lat = match2[1];
        const lng = match2[2];
        return `https://www.google.com/maps?q=${lat},${lng}&hl=id&z=14&output=embed`;
      }

      // Fallback: coba convert dengan cara sederhana
      return (
        url.replace("/maps?", "/maps?").replace("/maps/@", "/maps?q=") +
        (url.includes("output=embed") ? "" : "&output=embed")
      );
    } catch (e) {
      console.error("Error converting URL:", e);
      return url;
    }
  };

  // Fungsi untuk extract koordinat dari URL Google Maps
  const extractCoordinatesFromUrl = (
    url: string | undefined
  ): { lat: number | null; lng: number | null } => {
    if (!url) return { lat: null, lng: null };

    try {
      // Format: https://www.google.com/maps?q=lat,lng
      const match = url.match(/[?&]q=([^&]+)/);
      if (match && match[1]) {
        const coords = match[1].split(",");
        if (coords.length >= 2 && coords[0] && coords[1]) {
          const lat = parseFloat(coords[0]);
          const lng = parseFloat(coords[1]);
          if (!isNaN(lat) && !isNaN(lng)) {
            return { lat, lng };
          }
        }
      }
      // Format: https://www.google.com/maps/@lat,lng,zoom
      const match2 = url.match(/@([^,]+),([^,]+)/);
      if (match2 && match2[1] && match2[2]) {
        const lat = parseFloat(match2[1]);
        const lng = parseFloat(match2[2]);
        if (!isNaN(lat) && !isNaN(lng)) {
          return { lat, lng };
        }
      }
    } catch (e) {
      console.error("Error extracting coordinates:", e);
    }
    return { lat: null, lng: null };
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

        // Extract koordinat dari URL jika ada
        const coords = editLocationData.mapsUrl
          ? extractCoordinatesFromUrl(editLocationData.mapsUrl)
          : { lat: null, lng: null };

        setKontakData(
          kontakData.map((item) => {
            if (item.id === editingId) {
              const updatedItem: KontakItem = {
                ...item,
                value: editLocationData.alamat.trim(),
                alamat: editLocationData.alamat.trim(),
              };

              if (editLocationData.mapsUrl.trim()) {
                updatedItem.mapsUrl = editLocationData.mapsUrl.trim();
              }

              if (coords.lat !== null && coords.lng !== null) {
                updatedItem.latitude = coords.lat;
                updatedItem.longitude = coords.lng;
              }

              return updatedItem;
            }
            return item;
          })
        );
        setIsEditingLocation(false);
        setEditLocationData({ alamat: "", mapsUrl: "" });
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
    setEditLocationData({ alamat: "", mapsUrl: "" });
  };

  const handleDelete = (id: number) => {
    setDeleteConfirm({ isOpen: true, id, type: "single" });
  };

  const handleDeleteAll = () => {
    setDeleteConfirm({ isOpen: true, id: null, type: "all" });
  };

  const confirmDelete = () => {
    if (deleteConfirm.type === "all") {
      setKontakData([]);
    } else if (deleteConfirm.id) {
      setKontakData(kontakData.filter((item) => item.id !== deleteConfirm.id));
    }
    setDeleteConfirm({ isOpen: false, id: null, type: "single" });
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, id: null, type: "single" });
  };

  const handleOpenModal = (type: "lokasi" | "kontak" | "email") => {
    setModalType(type);
    setIsModalOpen(true);
    setNewValue("");
    setNewLocationData({ alamat: "", mapsUrl: "" });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setNewValue("");
    setNewLocationData({ alamat: "", mapsUrl: "" });
  };

  const handleSaveAdd = () => {
    if (modalType) {
      if (modalType === "lokasi") {
        // Validasi untuk lokasi dengan URL Google Maps
        if (!newLocationData.alamat.trim()) {
          setErrorModal({
            isOpen: true,
            message: "Alamat tidak boleh kosong!",
          });
          return;
        }

        // Extract koordinat dari URL jika ada
        const coords = newLocationData.mapsUrl
          ? extractCoordinatesFromUrl(newLocationData.mapsUrl)
          : { lat: null, lng: null };

        const maxId =
          kontakData.length > 0 ? Math.max(...kontakData.map((k) => k.id)) : 0;
        const newItem: KontakItem = {
          id: maxId + 1,
          type: "lokasi",
          value: newLocationData.alamat.trim(),
          alamat: newLocationData.alamat.trim(),
        };

        if (newLocationData.mapsUrl.trim()) {
          newItem.mapsUrl = newLocationData.mapsUrl.trim();
        }

        if (coords.lat !== null && coords.lng !== null) {
          newItem.latitude = coords.lat;
          newItem.longitude = coords.lng;
        }

        setKontakData([...kontakData, newItem]);
      } else {
        // Untuk kontak dan email
        if (newValue.trim()) {
          const maxId =
            kontakData.length > 0
              ? Math.max(...kontakData.map((k) => k.id))
              : 0;
          setKontakData([
            ...kontakData,
            {
              id: maxId + 1,
              type: modalType,
              value: newValue.trim(),
            },
          ]);
        } else {
          setErrorModal({ isOpen: true, message: "Nilai tidak boleh kosong!" });
          return;
        }
      }
      handleCloseModal();
    }
  };

  const handleViewMaps = (item: KontakItem) => {
    if (item.type === "lokasi" && item.latitude && item.longitude) {
      // Jika ada koordinat, gunakan koordinat
      window.open(
        `https://www.google.com/maps?q=${item.latitude},${item.longitude}`,
        "_blank"
      );
    } else {
      // Jika tidak ada koordinat, gunakan alamat
      const encodedAddress = encodeURIComponent(item.value);
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
        "_blank"
      );
    }
  };

  const handleSaveChanges = () => {
    console.log("Data kontak yang disimpan:", kontakData);
    setSuccessModal({ isOpen: true, message: "Perubahan berhasil disimpan!" });
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

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-primary-blue">
          Kontak dan Lokasi
        </h1>

        <div className="space-y-4 mb-6">
          {kontakData.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative"
            >
              {(() => {
                const isEditingThis = editingId === item.id;
                const isLocationType = item.type === "lokasi";
                const shouldShowLocationForm =
                  isEditingThis && isLocationType && isEditingLocation;

                if (shouldShowLocationForm) {
                  return (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(item.type)}
                      </div>
                      <div className="flex-grow">
                        <div className="space-y-3">
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
                              placeholder="https://www.google.com/maps?q=-6.4025,106.7942"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Salin URL dari Google Maps dan paste di sini
                            </p>
                          </div>

                          {/* Preview Peta */}
                          {editLocationData.mapsUrl &&
                            editLocationData.mapsUrl.trim() && (
                              <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Preview Peta
                                </label>
                                <div className="border border-gray-300 rounded-lg overflow-hidden relative group">
                                  <iframe
                                    src={convertToEmbedUrl(
                                      editLocationData.mapsUrl
                                    )}
                                    width="100%"
                                    height="300"
                                    className="border-0 rounded-lg"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                  ></iframe>
                                  <a
                                    href={editLocationData.mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 z-10"
                                    title="Klik untuk membuka di Google Maps"
                                  ></a>
                                </div>
                                <button
                                  onClick={() =>
                                    window.open(
                                      editLocationData.mapsUrl,
                                      "_blank"
                                    )
                                  }
                                  className="mt-2 text-sm text-[#0066AE] hover:text-[#005a9e] hover:underline w-full text-center"
                                >
                                  Lihat di Google Maps
                                </button>
                              </div>
                            )}

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
                      </div>
                    </div>
                  );
                } else if (isEditingThis && !isLocationType) {
                  return (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(item.type)}
                      </div>
                      <div className="flex-grow">
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
                            className="px-3 py-1.5 bg-[#0066AE] hover:bg-[#005a9e] text-white text-sm rounded-md transition-colors flex items-center gap-1"
                          >
                            <EditIcon />
                            Simpan
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-md transition-colors"
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  // Render normal view (not editing)
                  return (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(item.type)}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {getLabel(item.type)}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {item.alamat || item.value}
                        </p>
                        {item.type === "lokasi" && (
                          <button
                            type="button"
                            onClick={() => handleViewMaps(item)}
                            className="mt-2 text-sm text-[#0066AE] hover:text-[#005a9e] hover:underline"
                          >
                            Lihat di Maps
                          </button>
                        )}
                      </div>
                      <div className="flex-shrink-0 flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(item.id)}
                          className="px-3 py-1.5 bg-[#0066AE] hover:bg-[#005a9e] text-white text-sm rounded-md transition-colors flex items-center gap-1"
                        >
                          <EditIcon />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition-colors flex items-center gap-1"
                        >
                          <TrashIcon />
                          Hapus
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
            Tambah
          </button>
        </div>

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

        {/* Map Section */}
        <div className="mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center relative">
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
                <FaMapMarkerAlt className="text-gray-400 text-5xl" />
                <p className="text-gray-400 mt-2 text-sm">Lokasi Kami</p>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary-blue text-base" />
                <span className="text-sm font-medium text-gray-700">
                  Lokasi Kami
                </span>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => {
                  // Cari item lokasi pertama dari kontakData
                  const locationItem = kontakData.find(
                    (item) => item.type === "lokasi"
                  );
                  if (locationItem) {
                    handleEdit(locationItem.id);
                  }
                }}
                className="px-3 py-1.5 bg-[#0066AE] hover:bg-[#005a9e] text-white text-sm rounded-md transition-colors flex items-center gap-1"
              >
                <EditIcon />
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  // Cari item lokasi pertama dari kontakData
                  const locationItem = kontakData.find(
                    (item) => item.type === "lokasi"
                  );
                  if (locationItem) {
                    handleDelete(locationItem.id);
                  }
                }}
                className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition-colors flex items-center gap-1"
              >
                <TrashIcon />
                Hapus
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSaveChanges}
            className="bg-primary-blue hover:bg-primary-blue-darker px-8 py-3 rounded-lg font-medium text-white transition-colors"
          >
            Simpan Perubahan
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
                <button
                  onClick={() => handleOpenModal("lokasi")}
                  className="w-full flex items-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-[#0066AE] hover:bg-[#E3F2FD] transition-all text-left"
                >
                  <FaMapMarkerAlt className="text-primary-blue text-2xl" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Tambah Lokasi
                    </h3>
                    <p className="text-sm text-gray-500">
                      Tambahkan alamat lokasi
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleOpenModal("kontak")}
                  className="w-full flex items-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-[#0066AE] hover:bg-[#E3F2FD] transition-all text-left"
                >
                  <FaPhoneAlt className="text-primary-blue text-2xl" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Tambah Kontak
                    </h3>
                    <p className="text-sm text-gray-500">
                      Tambahkan nomor telepon
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleOpenModal("email")}
                  className="w-full flex items-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-[#0066AE] hover:bg-[#E3F2FD] transition-all text-left"
                >
                  <FaEnvelope className="text-primary-blue text-2xl" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Tambah Email
                    </h3>
                    <p className="text-sm text-gray-500">
                      Tambahkan alamat email
                    </p>
                  </div>
                </button>
              </div>
            ) : modalType === "lokasi" ? (
              <div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alamat Lengkap
                    </label>
                    <input
                      type="text"
                      value={newLocationData.alamat}
                      onChange={(e) =>
                        setNewLocationData({
                          ...newLocationData,
                          alamat: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
                      placeholder="Masukkan alamat lengkap"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Google Maps
                    </label>
                    <input
                      type="text"
                      value={newLocationData.mapsUrl}
                      onChange={(e) =>
                        setNewLocationData({
                          ...newLocationData,
                          mapsUrl: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
                      placeholder="https://www.google.com/maps?q=-6.4025,106.7942"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Salin URL dari Google Maps dan paste di sini
                    </p>
                  </div>

                  {/* Preview Peta untuk Tambah */}
                  {newLocationData.mapsUrl &&
                    newLocationData.mapsUrl.trim() && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preview Peta
                        </label>
                        <div className="border border-gray-300 rounded-lg overflow-hidden relative group">
                          <iframe
                            src={convertToEmbedUrl(newLocationData.mapsUrl)}
                            width="100%"
                            height="300"
                            className="border-0 rounded-lg"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                          <a
                            href={newLocationData.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 z-10"
                            title="Klik untuk membuka di Google Maps"
                          ></a>
                        </div>
                        <button
                          onClick={() =>
                            window.open(newLocationData.mapsUrl, "_blank")
                          }
                          className="mt-2 text-sm text-[#0066AE] hover:text-[#005a9e] hover:underline w-full text-center"
                        >
                          Lihat di Google Maps
                        </button>
                      </div>
                    )}

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
            ) : (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getLabel(modalType)}
                  </label>
                  <input
                    type={modalType === "email" ? "email" : "text"}
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
                    placeholder={getPlaceholder(modalType)}
                    autoFocus
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
            )}
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {deleteConfirm.isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] animate-fadeIn"
          onClick={cancelDelete}
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
                ? "Apakah Anda yakin ingin menghapus semua data kontak?"
                : "Apakah Anda yakin ingin menghapus data ini?"}
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

export default KontakAdmin;
