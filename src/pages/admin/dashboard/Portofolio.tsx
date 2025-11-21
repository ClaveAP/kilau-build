import React, { useState, useRef, useEffect } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

type Category = "done" | "ongoing" | "interior";

export interface Project {
  id: number;
  title: string;
  year: number;
  image: string;
  persen: number;
  loc: string;
}

const Portofolio = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("done");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const token = localStorage.getItem("admin_token");

  const fetchProjects = async () => {
    setIsLoading(true);
    let endpoint = "";

    if (activeCategory === "done") endpoint = "/project-done";
    else if (activeCategory === "ongoing") endpoint = "/ongoing-project";
    else if (activeCategory === "interior") endpoint = "/desain-interior";

    try {
      const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const mappedData = response.data.data.map((item: any) => ({
          id: item.id,
          title: item.name,
          year: item.year ? parseInt(item.year) : new Date().getFullYear(),
          image: item.image.startsWith("http")
            ? item.image
            : `http://127.0.0.1:8000/storage/${item.image}`,
          loc: item.loc || "",
          persen: item.persen || 0,
        }));
        setProjects(mappedData);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [activeCategory]);

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({ isOpen: false, id: null });

  // FIX: Tambahkan loc dan persen ke formData
  const [formData, setFormData] = useState({
    title: "",
    year: new Date().getFullYear(),
    loc: "",
    persen: 0,
    image: "",
  });

  const menuRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const [errorModal, setErrorModal] = useState<{
    isOpen: boolean;
    message: string;
  }>({ isOpen: false, message: "" });
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    message: string;
  }>({ isOpen: false, message: "" });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId !== null) {
        const menuElement = menuRefs.current[openMenuId];
        if (menuElement && !menuElement.contains(event.target as Node)) {
          setOpenMenuId(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setOpenMenuId(null);
  };

  const handleMenuToggle = (projectId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === projectId ? null : projectId);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    // FIX: Set all form data including loc and persen
    setFormData({
      title: project.title,
      year: project.year,
      loc: project.loc || "",
      persen: project.persen || 0,
      image: project.image,
    });
    setImageFile(null);
    setIsEditMode(true);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const handleDelete = (projectId: number) => {
    setDeleteConfirm({ isOpen: true, id: projectId });
    setOpenMenuId(null);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.id) return;

    let endpoint = "";
    if (activeCategory === "done")
      endpoint = `/project-done/${deleteConfirm.id}`;
    else if (activeCategory === "ongoing")
      endpoint = `/ongoing-project/${deleteConfirm.id}`;
    else if (activeCategory === "interior")
      endpoint = `/desain-interior/${deleteConfirm.id}`;

    try {
      await axios.delete(`${API_BASE_URL}${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects();
      setSuccessModal({ isOpen: true, message: "Proyek berhasil dihapus!" });
    } catch (error) {
      console.error("Gagal hapus:", error);
      setErrorModal({
        isOpen: true,
        message: "Gagal menghapus proyek. Cek login.",
      });
    } finally {
      setDeleteConfirm({ isOpen: false, id: null });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, id: null });
  };

  const handleOpenModal = () => {
    setIsEditMode(false);
    setEditingProject(null);
    // FIX: Reset all form data
    setFormData({
      title: "",
      year: new Date().getFullYear(),
      loc: "",
      persen: 0,
      image: "",
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingProject(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorModal({
          isOpen: true,
          message:
            "Ukuran file terlalu besar! Maksimal 2MB agar server tidak berat.",
        });
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProject = async () => {
    if (!formData.title.trim()) {
      setErrorModal({ isOpen: true, message: "Judul tidak boleh kosong!" });
      return;
    }

    if (!isEditMode && !imageFile) {
      setErrorModal({
        isOpen: true,
        message: "Gambar wajib diupload untuk proyek baru!",
      });
      return;
    }

    // FIX: Validasi khusus ongoing project
    if (activeCategory === "ongoing") {
      if (!formData.loc.trim()) {
        setErrorModal({ isOpen: true, message: "Lokasi tidak boleh kosong!" });
        return;
      }
      if (formData.persen < 0 || formData.persen > 100) {
        setErrorModal({
          isOpen: true,
          message: "Progress harus antara 0-100%!",
        });
        return;
      }
    }

    const dataToSend = new FormData();
    dataToSend.append("name", formData.title);

    // FIX: Kirim data sesuai kategori
    if (activeCategory === "done") {
      dataToSend.append("year", formData.year.toString());
      dataToSend.append("desc", "-"); // Required by backend
    } else if (activeCategory === "ongoing") {
      dataToSend.append("loc", formData.loc);
      dataToSend.append("persen", formData.persen.toString());
    }
    // Interior hanya butuh name dan image

    if (imageFile) {
      dataToSend.append("image", imageFile);
    }

    if (isEditMode && editingProject) {
      dataToSend.append("_method", "PUT");
    }

    let endpoint = "";
    if (activeCategory === "done") endpoint = "/project-done";
    else if (activeCategory === "ongoing") endpoint = "/ongoing-project";
    else if (activeCategory === "interior") endpoint = "/desain-interior";

    const url =
      isEditMode && editingProject
        ? `${API_BASE_URL}${endpoint}/${editingProject.id}`
        : `${API_BASE_URL}${endpoint}`;

    try {
      await axios.post(url, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      fetchProjects();
      handleCloseModal();
      setSuccessModal({
        isOpen: true,
        message: isEditMode
          ? "Proyek berhasil diperbarui!"
          : "Proyek berhasil ditambahkan!",
      });
    } catch (error: any) {
      console.error("Gagal simpan:", error);
      console.error("Error response:", error.response?.data); // FIX: Better error logging
      let msg = "Gagal menyimpan data.";
      if (error.response?.data?.message) msg = error.response.data.message;
      if (error.response?.status === 413)
        msg = "File terlalu besar untuk server (Maks 2MB).";

      setErrorModal({ isOpen: true, message: msg });
    }
  };

  // --- ICONS ---
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
  const MoreVerticalIcon = () => (
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
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="12" cy="5" r="1"></circle>
      <circle cx="12" cy="19" r="1"></circle>
    </svg>
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

  console.log(projects);

  return (
    <DashboardLayout>
      <div className="p-6">
        <div style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "1rem",
              color: "#0066AE",
            }}
          >
            Kategori Proyek
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <button
              onClick={() => handleCategoryChange("done")}
              style={{
                padding: "0.625rem 1.5rem",
                borderRadius: "0.5rem",
                fontWeight: 500,
                transition: "all 0.2s",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                backgroundColor:
                  activeCategory === "done" ? "#0066AE" : "#E3F2FD",
                color: activeCategory === "done" ? "#ffffff" : "#0066AE",
              }}
            >
              Project Done
            </button>
            <button
              onClick={() => handleCategoryChange("ongoing")}
              style={{
                padding: "0.625rem 1.5rem",
                borderRadius: "0.5rem",
                fontWeight: 500,
                transition: "all 0.2s",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                backgroundColor:
                  activeCategory === "ongoing" ? "#0066AE" : "#E3F2FD",
                color: activeCategory === "ongoing" ? "#ffffff" : "#0066AE",
              }}
            >
              Ongoing Project
            </button>
            <button
              onClick={() => handleCategoryChange("interior")}
              style={{
                padding: "0.625rem 1.5rem",
                borderRadius: "0.5rem",
                fontWeight: 500,
                transition: "all 0.2s",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                backgroundColor:
                  activeCategory === "interior" ? "#0066AE" : "#E3F2FD",
                color: activeCategory === "interior" ? "#ffffff" : "#0066AE",
              }}
            >
              Desain Interior
            </button>
          </div>
        </div>

        {isLoading ? (
          <p className="text-center text-gray-500">Memuat proyek...</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-gray-400 mb-4">
            Belum ada proyek di kategori ini.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group relative hover:scale-[1.02]"
              >
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/600x400?text=No+Image";
                    }}
                  />
                  <button
                    onClick={(e) => handleMenuToggle(project.id, e)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all z-10 text-primary-blue"
                  >
                    <MoreVerticalIcon />
                  </button>
                  {openMenuId === project.id && (
                    <div
                      ref={(el) => {
                        menuRefs.current[project.id] = el;
                      }}
                      className="absolute top-12 right-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-[120px] animate-fadeIn"
                    >
                      <button
                        onClick={() => handleEdit(project)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#E3F2FD] flex items-center gap-2 transition-colors"
                      >
                        <EditIcon />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                      >
                        <TrashIcon />
                        Hapus
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {project.title}
                  </h3>
                  {activeCategory === "done" && (
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Tahun: {project.year}
                    </p>
                  )}
                  {activeCategory === "ongoing" && (
                    <>
                      <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-gray-500 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {project.loc || "Lokasi tidak tersedia"}
                      </p>
                      <div className="mt-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-medium text-gray-600">
                            Progress
                          </span>
                          <span className="text-sm font-bold text-[#0066AE]">
                            {project.persen || 0}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-[#0066AE] to-[#0088CC] h-2.5 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${project.persen || 0}%` }}
                          />
                        </div>
                        {/* Progress status badge */}
                        {project.persen >= 75 && (
                          <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            Hampir Selesai
                          </span>
                        )}
                        {project.persen >= 40 && project.persen < 75 && (
                          <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            Dalam Proses
                          </span>
                        )}
                        {project.persen < 40 && (
                          <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                            Tahap Awal
                          </span>
                        )}
                      </div>
                    </>
                  )}
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
              padding: "0.75rem 1.5rem",
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
            <PlusIcon /> Tambah Proyek
          </button>
        </div>
      </div>

      {/* FIX: Modal dengan form sesuai kategori */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999] animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 animate-slideUp max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-[#0066AE]">
              {isEditMode ? "Edit Proyek" : "Tambah Proyek Baru"}
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul Proyek
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#0066AE] outline-none"
                  placeholder="Masukkan judul proyek"
                  autoFocus
                />
              </div>

              {/* FIX: Tampilkan Tahun hanya untuk Project Done */}
              {activeCategory === "done" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tahun
                  </label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        year:
                          parseInt(e.target.value) || new Date().getFullYear(),
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#0066AE] outline-none"
                    min="2000"
                    max="2100"
                  />
                </div>
              )}

              {/* FIX: Tampilkan Lokasi & Progress untuk Ongoing Project */}
              {activeCategory === "ongoing" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lokasi Proyek
                    </label>
                    <input
                      type="text"
                      value={formData.loc}
                      onChange={(e) =>
                        setFormData({ ...formData, loc: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#0066AE] outline-none"
                      placeholder="Contoh: Jakarta Selatan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Progress (%)
                    </label>
                    <input
                      type="number"
                      value={formData.persen}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          persen: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#0066AE] outline-none"
                      min="0"
                      max="100"
                      placeholder="0-100"
                    />
                    {/* Preview progress bar */}
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#0066AE] h-2 rounded-full transition-all"
                          style={{ width: `${formData.persen}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-right">
                        {formData.persen}%
                      </p>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Gambar (Max 2MB)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#0066AE]"
                />
                {formData.image && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Preview:</p>
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-md border"
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 rounded-md text-gray-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveProject}
                  className="px-4 py-2 bg-[#0066AE] rounded-md text-white"
                >
                  {isEditMode ? "Simpan Perubahan" : "Tambah"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {deleteConfirm.isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000]"
          onClick={cancelDelete}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-2">Konfirmasi Hapus</h3>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus proyek ini?
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 rounded-md text-gray-700"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 rounded-md text-white"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Error */}
      {errorModal.isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10001]"
          onClick={() => setErrorModal({ isOpen: false, message: "" })}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-2 text-red-600">Error</h3>
            <p className="text-gray-600 mb-6">{errorModal.message}</p>
            <button
              onClick={() => setErrorModal({ isOpen: false, message: "" })}
              className="px-4 py-2 bg-[#0066AE] rounded-md text-white"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Modal Success */}
      {successModal.isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10001]"
          onClick={() => setSuccessModal({ isOpen: false, message: "" })}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-2 text-green-600">Berhasil</h3>
            <p className="text-gray-600 mb-6">{successModal.message}</p>
            <button
              onClick={() => setSuccessModal({ isOpen: false, message: "" })}
              className="px-4 py-2 bg-[#0066AE] rounded-md text-white"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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

export default Portofolio;
