import React, { useState, useRef, useEffect } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import {
  usePortofolio,
  type Project,
  type Category,
} from "../../../contexts/PortofolioContext";

const Portofolio = () => {
  const { projects, setProjects } = usePortofolio();
  const [activeCategory, setActiveCategory] = useState<Category>("done");

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    year: new Date().getFullYear(),
    image: "",
  });

  const menuRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

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

  // Close menu when clicking outside
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  const getCurrentProjects = () => {
    return projects[activeCategory];
  };

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
    setFormData({
      title: project.title,
      year: project.year,
      image: project.image,
    });
    setIsEditMode(true);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const handleDelete = (projectId: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus proyek ini?")) {
      setProjects({
        ...projects,
        [activeCategory]: projects[activeCategory].filter(
          (p) => p.id !== projectId
        ),
      });
      setOpenMenuId(null);
    }
  };

  const handleOpenModal = () => {
    setIsEditMode(false);
    setEditingProject(null);
    setFormData({
      title: "",
      year: new Date().getFullYear(),
      image: "",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingProject(null);
    setFormData({
      title: "",
      year: new Date().getFullYear(),
      image: "",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setFormData({ ...formData, image: base64String });
      };
      reader.onerror = () => {
        setErrorModal({ isOpen: true, message: "Error membaca file!" });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProject = () => {
    if (!formData.title.trim() || !formData.image.trim()) {
      setErrorModal({
        isOpen: true,
        message: "Judul dan gambar tidak boleh kosong!",
      });
      return;
    }

    if (isEditMode && editingProject) {
      // Edit existing project
      setProjects({
        ...projects,
        [activeCategory]: projects[activeCategory].map((p) =>
          p.id === editingProject.id
            ? {
                ...p,
                title: formData.title.trim(),
                year: formData.year,
                image: formData.image.trim(),
              }
            : p
        ),
      });
    } else {
      // Add new project
      const maxId = Math.max(
        ...Object.values(projects)
          .flat()
          .map((p) => p.id),
        0
      );
      const newProject: Project = {
        id: maxId + 1,
        title: formData.title.trim(),
        year: formData.year,
        image: formData.image.trim(),
      };
      setProjects({
        ...projects,
        [activeCategory]: [...projects[activeCategory], newProject],
      });
    }

    handleCloseModal();
  };

  const handleSaveChanges = () => {
    console.log("Data portofolio yang disimpan:", projects);
    setSuccessModal({ isOpen: true, message: "Perubahan berhasil disimpan!" });
  };

  // Icon Components
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

  const currentProjects = getCurrentProjects();

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Category Filter Section */}
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
              onMouseEnter={(e) => {
                if (activeCategory !== "done") {
                  e.currentTarget.style.backgroundColor = "#BBDEFB";
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== "done") {
                  e.currentTarget.style.backgroundColor = "#E3F2FD";
                }
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
              onMouseEnter={(e) => {
                if (activeCategory !== "ongoing") {
                  e.currentTarget.style.backgroundColor = "#BBDEFB";
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== "ongoing") {
                  e.currentTarget.style.backgroundColor = "#E3F2FD";
                }
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
              onMouseEnter={(e) => {
                if (activeCategory !== "interior") {
                  e.currentTarget.style.backgroundColor = "#BBDEFB";
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== "interior") {
                  e.currentTarget.style.backgroundColor = "#E3F2FD";
                }
              }}
            >
              Desain Interior
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
          {currentProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group relative hover:scale-[1.02]"
            >
              {/* Image Container */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML =
                        '<div class="w-full h-full flex items-center justify-center bg-gray-100"><span class="text-gray-400 text-center px-4">' +
                        project.title +
                        "</span></div>";
                    }
                  }}
                />

                {/* Three Dots Menu Button */}
                <button
                  onClick={(e) => handleMenuToggle(project.id, e)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all z-10 text-primary-blue"
                >
                  <MoreVerticalIcon />
                </button>

                {/* Dropdown Menu */}
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

              {/* Project Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600">{project.year}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Project Button */}
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
              transition: "background-color 0.2s",
              boxShadow: "none",
              outline: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              appearance: "none",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#005a9e")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#0066AE")
            }
          >
            <PlusIcon />
            Tambah Proyek
          </button>
        </div>

        {/* Save Changes Button */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
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

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "0.5rem",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              padding: "1.5rem",
              width: "100%",
              maxWidth: "28rem",
              margin: "0 1rem",
              maxHeight: "90vh",
              overflowY: "auto",
              zIndex: 10000,
              animation: "slideUp 0.3s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                marginBottom: "1rem",
                color: "#0066AE",
              }}
            >
              {isEditMode ? "Edit Proyek" : "Tambah Proyek Baru"}
            </h2>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  Judul Proyek
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    outline: "none",
                    fontSize: "1rem",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0066AE";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(0, 102, 174, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="Masukkan judul proyek"
                  autoFocus
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
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
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    outline: "none",
                    fontSize: "1rem",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0066AE";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(0, 102, 174, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                  min="2000"
                  max="2100"
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  URL Gambar
                </label>
                <input
                  type="text"
                  value={
                    formData.image.startsWith("data:image")
                      ? ""
                      : formData.image
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    outline: "none",
                    fontSize: "1rem",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0066AE";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(0, 102, 174, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="Masukkan URL gambar (contoh: /design.png)"
                />
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#6b7280",
                    marginTop: "0.25rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  Atau upload gambar dari komputer
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    outline: "none",
                    fontSize: "0.875rem",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0066AE";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(0, 102, 174, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                />
                {formData.image && (
                  <div style={{ marginTop: "0.5rem" }}>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Preview:
                    </p>
                    <img
                      src={formData.image}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "8rem",
                        objectFit: "cover",
                        borderRadius: "0.375rem",
                        border: "1px solid #e5e7eb",
                      }}
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
                  onClick={handleSaveProject}
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
                  {isEditMode ? "Simpan Perubahan" : "Tambah"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {errorModal.isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={() => setErrorModal({ isOpen: false, message: "" })}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "0.5rem",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              padding: "1.5rem",
              width: "100%",
              maxWidth: "28rem",
              margin: "0 1rem",
              zIndex: 10000,
              animation: "slideUp 0.3s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "4rem",
                height: "4rem",
                margin: "0 auto 1rem",
                borderRadius: "50%",
                backgroundColor: "#fef2f2",
              }}
            >
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
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                textAlign: "center",
                color: "#1f2937",
                marginBottom: "0.5rem",
              }}
            >
              Peringatan
            </h3>
            <p
              style={{
                textAlign: "center",
                color: "#4b5563",
                marginBottom: "1.5rem",
              }}
            >
              {errorModal.message}
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="button"
                onClick={() => setErrorModal({ isOpen: false, message: "" })}
                style={{
                  padding: "0.625rem 1.5rem",
                  backgroundColor: "#ef4444",
                  color: "#ffffff",
                  borderRadius: "0.5rem",
                  fontWeight: 500,
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
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {successModal.isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={() => setSuccessModal({ isOpen: false, message: "" })}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "0.5rem",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              padding: "1.5rem",
              width: "100%",
              maxWidth: "28rem",
              margin: "0 1rem",
              zIndex: 10000,
              animation: "slideUp 0.3s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "4rem",
                height: "4rem",
                margin: "0 auto 1rem",
                borderRadius: "50%",
                backgroundColor: "#d1fae5",
              }}
            >
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
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                textAlign: "center",
                color: "#1f2937",
                marginBottom: "0.5rem",
              }}
            >
              Berhasil
            </h3>
            <p
              style={{
                textAlign: "center",
                color: "#4b5563",
                marginBottom: "1.5rem",
              }}
            >
              {successModal.message}
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="button"
                onClick={() => setSuccessModal({ isOpen: false, message: "" })}
                style={{
                  padding: "0.625rem 1.5rem",
                  backgroundColor: "#10b981",
                  color: "#ffffff",
                  borderRadius: "0.5rem",
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#059669")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#10b981")
                }
              >
                Mengerti
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

export default Portofolio;
