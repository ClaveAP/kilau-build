import React, { useState, useMemo } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../../styles/calendar.css";
import {
  useSurvey,
  type Survey,
} from "../../../contexts/SurveyKalenderContext";

const Kalender = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { surveys, setSurveys } = useSurvey();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    phone: "",
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

  // Format date untuk display
  const formatDateDisplay = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("id-ID", { month: "long" });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day} ${month} ${year}/${hours}.${minutes}`;
  };

  // Format date untuk compare (YYYY-MM-DD)
  const formatDateOnly = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Filter surveys berdasarkan tanggal yang dipilih
  const filteredSurveys = useMemo(() => {
    const selectedDateStr = formatDateOnly(selectedDate);
    return surveys
      .filter((survey) => {
        const surveyDate = new Date(survey.date);
        const surveyDateStr = formatDateOnly(surveyDate);
        return surveyDateStr === selectedDateStr;
      })
      .sort((a, b) => {
        // Sort by time
        const timeA = new Date(a.date).getTime();
        const timeB = new Date(b.date).getTime();
        return timeA - timeB;
      });
  }, [surveys, selectedDate]);

  // Get dates that have surveys for calendar tile marking
  const getSurveyDates = () => {
    return surveys.map((survey) => {
      const date = new Date(survey.date);
      return formatDateOnly(date);
    });
  };

  const surveyDates = getSurveyDates();

  // Handle date change from calendar
  const handleDateChange = (value: any) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    } else if (
      Array.isArray(value) &&
      value.length > 0 &&
      value[0] instanceof Date
    ) {
      setSelectedDate(value[0]);
    } else if (value && typeof value === "object" && "getTime" in value) {
      // Handle case where value might be a Date-like object
      setSelectedDate(new Date(value));
    }
    // If null or invalid, keep current date
  };

  // Handle open modal for add
  const handleOpenModal = () => {
    setIsEditMode(false);
    setEditingSurvey(null);
    const defaultDate = formatDateOnly(selectedDate);
    const defaultTime = "09:00";
    setFormData({
      name: "",
      date: defaultDate,
      time: defaultTime,
      phone: "",
    });
    setIsModalOpen(true);
  };

  // Handle open modal for edit
  const handleEdit = (survey: Survey) => {
    setIsEditMode(true);
    setEditingSurvey(survey);
    const surveyDate = new Date(survey.date);
    const dateStr = formatDateOnly(surveyDate);
    const hours = surveyDate.getHours().toString().padStart(2, "0");
    const minutes = surveyDate.getMinutes().toString().padStart(2, "0");
    const timeStr = `${hours}:${minutes}`;
    setFormData({
      name: survey.name,
      date: dateStr,
      time: timeStr,
      phone: survey.phone,
    });
    setIsModalOpen(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingSurvey(null);
    setFormData({
      name: "",
      date: "",
      time: "",
      phone: "",
    });
  };

  // Handle save survey
  const handleSaveSurvey = () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorModal({
        isOpen: true,
        message: "Nama dan telepon tidak boleh kosong!",
      });
      return;
    }

    if (!formData.date || !formData.time) {
      setErrorModal({ isOpen: true, message: "Tanggal dan jam harus diisi!" });
      return;
    }

    const dateTimeString = `${formData.date}T${formData.time}:00`;
    const newDate = new Date(dateTimeString);

    if (isEditMode && editingSurvey) {
      // Edit existing survey
      const updated = surveys.map((survey) =>
        survey.id === editingSurvey.id
          ? {
              ...survey,
              name: formData.name.trim(),
              date: dateTimeString,
              phone: formData.phone.trim(),
            }
          : survey
      );
      setSurveys(updated);
      // Update selected date to the edited survey date so user can see the updated survey
      setSelectedDate(newDate);
    } else {
      // Add new survey
      const maxId =
        surveys.length > 0 ? Math.max(...surveys.map((s) => s.id)) : 0;
      const newSurvey: Survey = {
        id: maxId + 1,
        name: formData.name.trim(),
        date: dateTimeString,
        phone: formData.phone.trim(),
      };
      const updated = [...surveys, newSurvey];
      setSurveys(updated);
      // Update selected date to the new survey date so user can see the new survey
      setSelectedDate(newDate);
    }

    handleCloseModal();
  };

  // Handle delete survey
  const handleDelete = (id: number) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = () => {
    if (deleteConfirm.id) {
      const updated = surveys.filter(
        (survey) => survey.id !== deleteConfirm.id
      );
      setSurveys(updated);
      setDeleteConfirm({ isOpen: false, id: null });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, id: null });
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

  // Custom tile content untuk mark dates dengan survey
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateStr = formatDateOnly(date);
      const selectedDateStr = formatDateOnly(selectedDate);
      const isSelected = dateStr === selectedDateStr;
      const hasSurvey = surveyDates.includes(dateStr);

      if (hasSurvey) {
        return (
          <div
            style={{
              position: "absolute",
              bottom: "0.25rem",
              left: "50%",
              transform: "translateX(-50%)",
              width: "0.375rem",
              height: "0.375rem",
              borderRadius: "50%",
              backgroundColor: isSelected ? "white" : "#0066AE",
            }}
          ></div>
        );
      }
    }
    return null;
  };

  // Custom tile className untuk highlight selected date
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateStr = formatDateOnly(date);
      const selectedDateStr = formatDateOnly(selectedDate);
      if (dateStr === selectedDateStr) {
        return "selected-date";
      }
      if (surveyDates.includes(dateStr)) {
        return "has-survey";
      }
    }
    return null;
  };

  return (
    <DashboardLayout>
      <div style={{ padding: "1.5rem" }}>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "#0066AE",
          }}
        >
          Kalender Survey
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          {/* Calendar */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "0.5rem",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              padding: "1.5rem",
            }}
          >
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileContent={tileContent}
              tileClassName={tileClassName}
              className="w-full border-none"
            />
          </div>

          {/* Survey Table */}
          <div
            style={{
              borderRadius: "0.5rem",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              padding: "1.5rem",
              color: "#ffffff",
              backgroundColor: "#0066AE",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                Daftar Survey
              </h3>
              <button
                onClick={handleOpenModal}
                style={{
                  padding: "0.375rem 0.75rem",
                  backgroundColor: "#ffffff",
                  color: "#0066AE",
                  borderRadius: "0.375rem",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f3f4f6")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#ffffff")
                }
              >
                <PlusIcon />
                Tambah
              </button>
            </div>
            <div style={{ overflowY: "auto", maxHeight: "24rem" }}>
              {filteredSurveys.length > 0 ? (
                <table
                  style={{
                    width: "100%",
                    fontSize: "0.875rem",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      <th
                        style={{
                          textAlign: "left",
                          padding: "0.75rem 1rem",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                        }}
                      >
                        Nama
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "0.75rem 1rem",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                        }}
                      >
                        Tanggal/Jam
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "0.75rem 1rem",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                        }}
                      >
                        No. Telepon
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "0.75rem 1rem",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                        }}
                      >
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSurveys.map((survey) => (
                      <tr
                        key={survey.id}
                        style={{
                          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                          transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#005a9e")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        <td
                          style={{
                            padding: "0.875rem 1rem",
                            lineHeight: "1.5",
                          }}
                        >
                          {survey.name}
                        </td>
                        <td
                          style={{
                            padding: "0.875rem 1rem",
                            lineHeight: "1.5",
                          }}
                        >
                          {formatDateDisplay(survey.date)}
                        </td>
                        <td
                          style={{
                            padding: "0.875rem 1rem",
                            lineHeight: "1.5",
                          }}
                        >
                          {survey.phone}
                        </td>
                        <td style={{ padding: "0.875rem 1rem" }}>
                          <div
                            style={{
                              display: "flex",
                              gap: "0.5rem",
                              alignItems: "center",
                            }}
                          >
                            <button
                              onClick={() => handleEdit(survey)}
                              style={{
                                padding: "0.375rem 0.75rem",
                                backgroundColor: "#0066AE",
                                color: "#ffffff",
                                borderRadius: "0.25rem",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "0.8125rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.375rem",
                                transition: "background-color 0.2s",
                                fontWeight: 500,
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "#005a9e")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "#0066AE")
                              }
                            >
                              <EditIcon />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(survey.id)}
                              style={{
                                padding: "0.375rem 0.75rem",
                                backgroundColor: "#ef4444",
                                color: "#ffffff",
                                borderRadius: "0.25rem",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "0.8125rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.375rem",
                                transition: "background-color 0.2s",
                                fontWeight: 500,
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "#dc2626")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "#ef4444")
                              }
                            >
                              <TrashIcon />
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "2rem 0",
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  <p>Belum ada survey di tanggal ini</p>
                </div>
              )}
            </div>
          </div>
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
              {isEditMode ? "Edit Survey" : "Tambah Survey Baru"}
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
                  Nama
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
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
                  placeholder="Masukkan nama"
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
                  Tanggal
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
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
                  Jam
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
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
                  No. Telepon
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
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
                  placeholder="Masukkan nomor telepon"
                />
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
                  onClick={handleSaveSurvey}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#0066AE",
                    color: "#ffffff",
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

      {/* Delete Confirmation Modal */}
      {deleteConfirm.isOpen && (
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
          onClick={cancelDelete}
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
                backgroundColor: "#fee2e2",
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
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
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
              Konfirmasi Hapus
            </h3>
            <p
              style={{
                textAlign: "center",
                color: "#4b5563",
                marginBottom: "1.5rem",
              }}
            >
              Apakah Anda yakin ingin menghapus survey ini?
            </p>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                justifyContent: "center",
              }}
            >
              <button
                type="button"
                onClick={cancelDelete}
                style={{
                  padding: "0.625rem 1.5rem",
                  backgroundColor: "#d1d5db",
                  color: "#374151",
                  borderRadius: "0.5rem",
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
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
                type="button"
                onClick={confirmDelete}
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

export default Kalender;
