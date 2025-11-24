import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export interface MediaSosialItem {
  id: number;
  title: string;
  date: string;
  image: string;
  platform: "instagram" | "youtube";
  isFeatured: boolean;
  instagramUrl: string;
}

const MediaSosialAdmin = () => {
  const [mediaSosialData, setMediaSosialData] = useState<MediaSosialItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const token = localStorage.getItem("admin_token");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/post`);
      if (response.data.success) {
        const mappedData = response.data.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          date: new Date(item.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          image: item.image.startsWith("http")
            ? item.image
            : `${API_BASE_URL}/storage/${item.image}`,
          platform: "instagram",
          isFeatured: item.di_homepage === 1,
          instagramUrl: item.instagram_url,
        }));
        setMediaSosialData(mappedData);
      }
    } catch (error) {
      console.error("Gagal fetch media sosial:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<{
    title: string;
    image: string;
    platform: MediaSosialItem["platform"];
    instagramUrl: string;
  }>({
    title: "",
    image: "",
    platform: "instagram",
    instagramUrl: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    title: string;
    image: string;
    platform: MediaSosialItem["platform"];
    isFeatured: boolean;
    instagramUrl: string;
  }>({
    title: "",
    image: "",
    platform: "instagram",
    isFeatured: false,
    instagramUrl: "",
  });

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

  const handleEdit = (id: number) => {
    const item = mediaSosialData.find((m) => m.id === id);
    if (item) {
      setEditingId(id);
      setEditData({
        title: item.title,
        image: item.image,
        platform: item.platform,
        instagramUrl: item.instagramUrl,
      });
      setImageFile(null);
    }
  };

  const handleImageUploadEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorModal({
          isOpen: true,
          message: "Ukuran file terlalu besar! Maksimal 2MB.",
        });
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUploadAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorModal({
          isOpen: true,
          message: "Ukuran file terlalu besar! Maksimal 2MB.",
        });
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setModalData({ ...modalData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = async () => {
    if (editingId && editData.title.trim()) {
      const formData = new FormData();
      formData.append("title", editData.title);
      formData.append("instagram_url", editData.instagramUrl || "-");
      formData.append("_method", "PUT");

      if (imageFile) {
        formData.append("image", imageFile);
      }

      try {
        await axios.post(`${API_URL}/post/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        fetchData();
        setEditingId(null);
        setSuccessModal({
          isOpen: true,
          message: "Konten berhasil diperbarui!",
        });
      } catch (error) {
        console.error(error);
        setErrorModal({
          isOpen: true,
          message: "Gagal update konten. Cek login.",
        });
      }
    } else {
      setErrorModal({ isOpen: true, message: "Caption tidak boleh kosong!" });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({
      title: "",
      image: "",
      platform: "instagram",
      instagramUrl: "",
    });
  };

  const handleDelete = (id: number) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    if (deleteConfirm.id) {
      try {
        await axios.delete(`${API_URL}/post/${deleteConfirm.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchData();
        setSuccessModal({ isOpen: true, message: "Konten berhasil dihapus!" });
      } catch (error) {
        console.error(error);
        setErrorModal({ isOpen: true, message: "Gagal menghapus konten." });
      } finally {
        setDeleteConfirm({ isOpen: false, id: null });
      }
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, id: null });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setImageFile(null);
    setModalData({
      title: "",
      image: "",
      platform: "instagram",
      isFeatured: false,
      instagramUrl: "",
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveAdd = async () => {
    if (!modalData.title.trim()) {
      setErrorModal({ isOpen: true, message: "Caption tidak boleh kosong!" });
      return;
    }
    if (!imageFile) {
      setErrorModal({ isOpen: true, message: "Gambar wajib diupload!" });
      return;
    }

    const formData = new FormData();
    formData.append("title", modalData.title); // Caption
    formData.append("instagram_url", modalData.instagramUrl || "-");
    formData.append("image", imageFile);
    if (modalData.isFeatured) {
      formData.append("di_homepage", "1");
    }

    try {
      await axios.post(`${API_URL}/post`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      fetchData();
      handleCloseModal();
      setSuccessModal({
        isOpen: true,
        message: "Konten berhasil ditambahkan!",
      });
    } catch (error) {
      console.error(error);
      setErrorModal({ isOpen: true, message: "Gagal menambah konten." });
    }
  };

  const InstagramBadge = () => (
    <div className="w-8 h-8 bg-linear-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-lg flex items-center justify-center shrink-0">
      <svg
        className="w-5 h-5 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    </div>
  );

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
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary-blue">Media Sosial</h1>
        </div>

        {isLoading && mediaSosialData.length === 0 ? (
          <p className="text-center text-gray-400">Memuat data...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {mediaSosialData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
              >
                <div className="relative h-48 bg-gray-200 group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {/* Overlay Featured Badge jika ada */}
                  {item.isFeatured && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded shadow">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    {/* Caption/Judul */}
                    <h3 className="font-semibold text-gray-800 line-clamp-2 text-sm flex-1">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mt-2 border-t pt-3">
                    <div className="flex items-center gap-2">
                      <InstagramBadge />
                      <span className="text-xs text-gray-500">{item.date}</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="px-3 py-1.5 bg-[#0066AE] hover:bg-[#005a9e] text-white text-sm rounded-md flex items-center gap-1 transition-colors"
                  >
                    <EditIcon /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md flex items-center gap-1 transition-colors"
                  >
                    <TrashIcon /> Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

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
            }}
          >
            <PlusIcon /> Tambah
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
                  Caption
                </label>
                <textarea
                  rows={4}
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#0066AE] outline-none"
                  placeholder="Tulis caption postingan..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link Instagram
                </label>
                <input
                  type="text"
                  value={editData.instagramUrl}
                  onChange={(e) =>
                    setEditData({ ...editData, instagramUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://instagram.com/p/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Gambar (Max 2MB)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUploadEdit}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                />
                {editData.image && (
                  <img
                    src={editData.image}
                    className="mt-2 h-40 w-full object-cover rounded border"
                    alt="preview"
                  />
                )}
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-[#0066AE] text-white rounded-md hover:bg-[#005a9e] transition-colors"
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
                  Caption
                </label>
                <textarea
                  rows={4}
                  value={modalData.title}
                  onChange={(e) =>
                    setModalData({ ...modalData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#0066AE] outline-none"
                  placeholder="Tulis caption postingan..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link Instagram
                </label>
                <input
                  type="text"
                  value={modalData.instagramUrl}
                  onChange={(e) =>
                    setModalData({ ...modalData, instagramUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://instagram.com/p/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Gambar (Max 2MB)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUploadAdd}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                />
                {modalData.image && (
                  <img
                    src={modalData.image}
                    className="mt-2 h-40 w-full object-cover rounded border"
                    alt="preview"
                  />
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modalData.isFeatured}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        isFeatured: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-[#0066AE] rounded focus:ring-[#0066AE]"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Jadikan Featured (Tampil Besar di Home)
                  </span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveAdd}
                  className="px-4 py-2 bg-[#0066AE] text-white rounded-md hover:bg-[#005a9e] transition-colors"
                >
                  Tambah
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm.isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
          onClick={cancelDelete}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-2">Konfirmasi Hapus</h3>
            <p className="text-gray-600 mb-6">
              Yakin ingin menghapus konten ini?
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={cancelDelete}
                className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
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
          <div
            className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className={`text-xl font-bold mb-2 ${
                successModal.isOpen ? "text-green-600" : "text-red-600"
              }`}
            >
              {successModal.isOpen ? "Berhasil" : "Gagal"}
            </h3>
            <p className="text-gray-600 mb-6">
              {successModal.message || errorModal.message}
            </p>
            <button
              onClick={() => {
                setSuccessModal({ isOpen: false, message: "" });
                setErrorModal({ isOpen: false, message: "" });
              }}
              className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
      <style>{` .animate-fadeIn { animation: fadeIn 0.2s ease-out; } .animate-slideUp { animation: slideUp 0.3s ease-out; } `}</style>
    </DashboardLayout>
  );
};

export default MediaSosialAdmin;
