import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import {
  useMediaSosial,
  type MediaSosialItem,
} from "../../../contexts/MediaSosialContext";

const MediaSosialAdmin = () => {
  const { mediaSosialData, setMediaSosialData } = useMediaSosial();
  // Temporary state untuk menyimpan perubahan sebelum di-save
  const [tempData, setTempData] = useState<MediaSosialItem[]>(mediaSosialData);

  // Initialize tempData dari context saat component mount atau context berubah
  useEffect(() => {
    setTempData(mediaSosialData);
  }, [mediaSosialData]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<{
    title: string;
    description: string;
    date: string;
    image: string;
    platform: MediaSosialItem["platform"];
  }>({
    title: "",
    description: "",
    date: "",
    image: "",
    platform: "instagram",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    title: string;
    description: string;
    date: string;
    image: string;
    platform: MediaSosialItem["platform"];
    isFeatured: boolean;
  }>({
    title: "",
    description: "",
    date: "",
    image: "",
    platform: "instagram",
    isFeatured: false,
  });
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

  const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#0066AE">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );

  const YouTubePlayIcon = () => (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="#FF0000">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );

  const getRegularItems = () => {
    return tempData;
  };

  const handleEdit = (id: number) => {
    const item = tempData.find((m) => m.id === id);
    if (item) {
      setEditingId(id);
      setEditData({
        title: item.title,
        description: item.description,
        date: item.date,
        image: item.image,
        platform: item.platform,
      });
    }
  };

  const handleImageUploadEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorModal({
          isOpen: true,
          message: "Ukuran file terlalu besar! Maksimal 5MB.",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setEditData({ ...editData, image: base64String });
      };
      reader.onerror = () => {
        setErrorModal({ isOpen: true, message: "Error membaca file!" });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUploadAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorModal({
          isOpen: true,
          message: "Ukuran file terlalu besar! Maksimal 5MB.",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setModalData({ ...modalData, image: base64String });
      };
      reader.onerror = () => {
        setErrorModal({ isOpen: true, message: "Error membaca file!" });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = () => {
    if (editingId && editData.title.trim()) {
      const updated = tempData.map((item) =>
        item.id === editingId ? { ...item, ...editData } : item
      );
      setTempData(updated);
      setEditingId(null);
      setEditData({
        title: "",
        description: "",
        date: "",
        image: "",
        platform: "instagram",
      });
    } else {
      setErrorModal({ isOpen: true, message: "Judul tidak boleh kosong!" });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({
      title: "",
      description: "",
      date: "",
      image: "",
      platform: "instagram",
    });
  };

  const handleDelete = (id: number) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = () => {
    if (deleteConfirm.id) {
      const updated = tempData.filter((item) => item.id !== deleteConfirm.id);
      setTempData(updated);
      setDeleteConfirm({ isOpen: false, id: null });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, id: null });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setModalData({
      title: "",
      description: "",
      date: "",
      image: "",
      platform: "instagram",
      isFeatured: false,
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalData({
      title: "",
      description: "",
      date: "",
      image: "",
      platform: "instagram",
      isFeatured: false,
    });
  };

  const handleSaveAdd = () => {
    if (!modalData.title.trim()) {
      setErrorModal({ isOpen: true, message: "Judul tidak boleh kosong!" });
      return;
    }

    const maxId =
      tempData.length > 0 ? Math.max(...tempData.map((m) => m.id)) : 0;
    const newItem: MediaSosialItem = {
      id: maxId + 1,
      title: modalData.title.trim(),
      description: modalData.description.trim(),
      date: modalData.date.trim(),
      image: modalData.image.trim() || "/design.png",
      platform: modalData.platform,
      isFeatured: modalData.isFeatured,
    };

    // If new item is featured, unfeature others
    let updated = [...tempData];
    if (newItem.isFeatured) {
      updated = updated.map((item) => ({ ...item, isFeatured: false }));
    }
    updated.push(newItem);

    setTempData(updated);
    handleCloseModal();
  };

  const handleSaveChanges = () => {
    // Simpan perubahan dari tempData ke context
    setMediaSosialData(tempData);
    setSuccessModal({ isOpen: true, message: "Perubahan berhasil disimpan!" });
  };

  const regularItems = getRegularItems();

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header with Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary-blue">Media Sosial</h1>
        </div>

        {/* Regular Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {regularItems.map((item) => (
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
              <div className="px-4 pb-4 flex gap-2">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="px-3 py-1.5 bg-[#0066AE] hover:bg-[#005a9e] text-white text-sm rounded-md transition-colors flex items-center gap-1"
                >
                  <EditIcon />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition-colors flex items-center gap-1"
                >
                  <TrashIcon />
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Button */}
        <div style={{ marginBottom: "1.5rem" }}>
          <button
            onClick={handleOpenModal}
            style={{
              backgroundColor: "#0066AE",
              color: "#ffffff",
              padding: "0.75rem 1rem",
              fontWeight: 500,
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
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

      {/* Edit Modal */}
      {editingId && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center animate-fadeIn z-[9999]"
          onClick={handleCancelEdit}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 animate-slideUp max-h-[90vh] overflow-y-auto z-[10000]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-primary-blue">
              Edit Konten
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul
                </label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
                  placeholder="Masukkan judul"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
                  placeholder="Masukkan deskripsi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal
                </label>
                <input
                  type="text"
                  value={editData.date}
                  onChange={(e) =>
                    setEditData({ ...editData, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
                  placeholder="contoh: Sept 15 2025"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform
                </label>
                <select
                  value={editData.platform}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      platform: e.target.value as MediaSosialItem["platform"],
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
                >
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Gambar
                </label>
                <input
                  type="text"
                  value={
                    editData.image.startsWith("data:image")
                      ? ""
                      : editData.image
                  }
                  onChange={(e) =>
                    setEditData({ ...editData, image: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
                  placeholder="contoh: /design.png"
                />
                <p className="text-xs text-gray-500 mt-1 mb-2">
                  Atau upload gambar dari komputer
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUploadEdit}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE] text-sm"
                />
                {editData.image && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Preview:</p>
                    <img
                      src={editData.image}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded border border-gray-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "0.75rem",
                  paddingTop: "0.5rem",
                }}
              >
                <button
                  onClick={handleCancelEdit}
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
                  onClick={handleSaveEdit}
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

      {/* Add Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center animate-fadeIn z-[9999]"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 animate-slideUp max-h-[90vh] overflow-y-auto z-[10000]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-primary-blue">
              Tambah Konten
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul
                </label>
                <input
                  type="text"
                  value={modalData.title}
                  onChange={(e) =>
                    setModalData({ ...modalData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
                  placeholder="Masukkan judul"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={modalData.description}
                  onChange={(e) =>
                    setModalData({ ...modalData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
                  placeholder="Masukkan deskripsi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal
                </label>
                <input
                  type="text"
                  value={modalData.date}
                  onChange={(e) =>
                    setModalData({ ...modalData, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
                  placeholder="contoh: Sept 15 2025"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform
                </label>
                <select
                  value={modalData.platform}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      platform: e.target.value as MediaSosialItem["platform"],
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
                >
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Gambar
                </label>
                <input
                  type="text"
                  value={
                    modalData.image.startsWith("data:image")
                      ? ""
                      : modalData.image
                  }
                  onChange={(e) =>
                    setModalData({ ...modalData, image: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
                  placeholder="contoh: /design.png"
                />
                <p className="text-xs text-gray-500 mt-1 mb-2">
                  Atau upload gambar dari komputer
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUploadAdd}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066AE] text-sm"
                />
                {modalData.image && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Preview:</p>
                    <img
                      src={modalData.image}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded border border-gray-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={modalData.isFeatured}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        isFeatured: e.target.checked,
                      })
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Jadikan Featured
                  </span>
                </label>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "0.75rem",
                  paddingTop: "0.5rem",
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
                  Tambah
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center animate-fadeIn z-[9999]"
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
              Apakah Anda yakin ingin menghapus konten ini?
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

export default MediaSosialAdmin;
