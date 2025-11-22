import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Shield,
  CheckCircle,
  XCircle,
  X,
} from "lucide-react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import axios from "axios";

const ChangePassword: React.FC = () => {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength, text: "Lemah", color: "bg-red-500" };
    if (strength <= 3)
      return { strength, text: "Sedang", color: "bg-yellow-500" };
    if (strength <= 4) return { strength, text: "Kuat", color: "bg-green-500" };
    return { strength, text: "Sangat Kuat", color: "bg-green-600" };
  };

  const passwordStrength = getPasswordStrength(formData.new_password);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.current_password) {
      newErrors.current_password = "Password saat ini wajib diisi";
    }

    if (!formData.new_password) {
      newErrors.new_password = "Password baru wajib diisi";
    } else if (formData.new_password.length < 8) {
      newErrors.new_password = "Password minimal 8 karakter";
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = "Konfirmasi password wajib diisi";
    } else if (formData.new_password !== formData.confirm_password) {
      newErrors.confirm_password = "Password tidak cocok";
    }

    if (
      formData.current_password &&
      formData.new_password &&
      formData.current_password === formData.new_password
    ) {
      newErrors.new_password = "Password baru harus berbeda dari password lama";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/change-password",
        {
          current_password: formData.current_password,
          new_password: formData.new_password,
          new_password_confirmation: formData.confirm_password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setSuccess(true);
        setFormData({
          current_password: "",
          new_password: "",
          confirm_password: "",
        });

        // Hide success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error: any) {
      if (error.response) {
        // Error dari server
        setError(error.response.data.message || "Gagal mengubah password");
      } else {
        // Error network atau lainnya
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Ubah Password
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Perbarui password Anda untuk keamanan akun
              </p>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3 animate-fade-in">
            <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-red-900">
                Gagal Mengubah Password
              </h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
            <button
              onClick={() => setError("")}
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-green-900">
                Password Berhasil Diubah!
              </h3>
              <p className="text-sm text-green-700 mt-1">
                Password Anda telah berhasil diperbarui.
              </p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Password */}
              <div>
                <label
                  htmlFor="current_password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password Saat Ini
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword.current ? "text" : "password"}
                    id="current_password"
                    name="current_password"
                    value={formData.current_password}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-10 py-2.5 border ${
                      errors.current_password
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                    placeholder="Masukkan password saat ini"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword.current ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.current_password && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {errors.current_password}
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Password Baru
                  </span>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label
                  htmlFor="new_password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password Baru
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword.new ? "text" : "password"}
                    id="new_password"
                    name="new_password"
                    value={formData.new_password}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-10 py-2.5 border ${
                      errors.new_password
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                    placeholder="Masukkan password baru"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword.new ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.new_password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-600">
                        Kekuatan Password:
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          passwordStrength.strength <= 2
                            ? "text-red-600"
                            : passwordStrength.strength <= 3
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {passwordStrength.text}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{
                          width: `${(passwordStrength.strength / 5) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                {errors.new_password && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {errors.new_password}
                  </p>
                )}

                <div className="mt-3 bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <p className="text-xs font-medium text-blue-900 mb-2">
                    Password harus mengandung:
                  </p>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li className="flex items-center">
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          formData.new_password.length >= 8
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></span>
                      Minimal 8 karakter
                    </li>
                    <li className="flex items-center">
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          /[A-Z]/.test(formData.new_password) &&
                          /[a-z]/.test(formData.new_password)
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></span>
                      Huruf besar dan kecil
                    </li>
                    <li className="flex items-center">
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          /[0-9]/.test(formData.new_password)
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></span>
                      Minimal 1 angka
                    </li>
                    <li className="flex items-center">
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          /[^a-zA-Z0-9]/.test(formData.new_password)
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></span>
                      Karakter khusus (@, #, $, dll)
                    </li>
                  </ul>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Konfirmasi Password Baru
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    id="confirm_password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-10 py-2.5 border ${
                      errors.confirm_password
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                    placeholder="Masukkan ulang password baru"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword.confirm ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.confirm_password && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {errors.confirm_password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      current_password: "",
                      new_password: "",
                      confirm_password: "",
                    })
                  }
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2.5 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <span>Ubah Password</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Security Tips */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <Shield className="w-4 h-4 mr-2 text-gray-600" />
            Tips Keamanan
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Gunakan password yang unik dan tidak mudah ditebak
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Jangan gunakan password yang sama dengan akun lain
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Ubah password secara berkala setiap 3-6 bulan
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Jangan bagikan password Anda kepada siapapun
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChangePassword;
