import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout";

import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const Login = () => {
  const navigate = useNavigate();

  // State input form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State Login & Error
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // --- FITUR SHOW PASSWORD ---
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("Silakan isi username dan password.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        loginname: formData.email,
        loginpassword: formData.password,
      });

      const data = response.data;

      if (data.success) {
        console.log("Login sukses:", data);
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin_user", JSON.stringify(data.user));
        navigate("/admin/dashboard");
      } else {
        setErrorMessage(data.message || "Login gagal.");
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "Username atau password salah."
        );
      } else if (error.request) {
        setErrorMessage(
          "Gagal terhubung ke server. Pastikan backend Laravel menyala."
        );
      } else {
        setErrorMessage("Terjadi kesalahan pada aplikasi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          position: "relative",
          zIndex: 10,
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "700px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "0.75rem",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            padding: "2.5rem",
            backdropFilter: "blur(4px)",
          }}
        >
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "2rem",
              color: "#0066AE",
            }}
          >
            Admin Login
          </h1>

          {errorMessage && (
            <div
              style={{
                backgroundColor: "#fee2e2",
                color: "#dc2626",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                marginBottom: "1.5rem",
                textAlign: "center",
                fontSize: "0.9rem",
                border: "1px solid #fca5a5",
                fontWeight: 500,
              }}
            >
              {errorMessage}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#111827",
                  marginBottom: "0.5rem",
                }}
              >
                Username / Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan username/ email admin"
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "all 0.2s",
                  backgroundColor: isLoading ? "#f9fafb" : "white",
                }}
                onFocus={(e) => {
                  if (!isLoading) {
                    e.target.style.borderColor = "#0066AE";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(0, 102, 174, 0.2)";
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.boxShadow = "none";
                }}
                required
              />
            </div>

            {/* --- INPUT PASSWORD DENGAN ICON MATA --- */}
            <div>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#111827",
                  marginBottom: "0.5rem",
                }}
              >
                Password
              </label>

              <div style={{ position: "relative" }}>
                <input
                  // Logika: Jika showPassword true, tipe jadi "text", jika false jadi "password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                  disabled={isLoading}
                  style={{
                    width: "100%",
                    padding: "0.75rem 2.5rem 0.75rem 1rem", // Padding kanan ditambah biar teks gak nabrak icon
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.2s",
                    backgroundColor: isLoading ? "#f9fafb" : "white",
                  }}
                  onFocus={(e) => {
                    if (!isLoading) {
                      e.target.style.borderColor = "#0066AE";
                      e.target.style.boxShadow =
                        "0 0 0 2px rgba(0, 102, 174, 0.2)";
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                  required
                />

                {/* TOMBOL ICON MATA */}
                <button
                  type="button" // Penting agar tidak men-submit form
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#6b7280",
                    display: "flex",
                    alignItems: "center",
                    padding: "4px",
                  }}
                  title={
                    showPassword ? "Sembunyikan password" : "Lihat password"
                  }
                >
                  {showPassword ? (
                    // Icon Mata Coret (Hide)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    // Icon Mata Normal (Show)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                backgroundColor: isLoading ? "#9ca3af" : "#0066AE",
                color: "white",
                fontWeight: 600,
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: isLoading ? "not-allowed" : "pointer",
                fontSize: "1rem",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                outline: "none",
                transition: "all 0.2s",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = "#005a9e";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = "#0066AE";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {isLoading ? (
                <>
                  <span
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid #ffffff",
                      borderBottomColor: "transparent",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "spin 1s linear infinite",
                    }}
                  ></span>
                  Memproses...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
