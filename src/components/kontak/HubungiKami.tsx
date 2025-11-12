import React, { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const HubungiKami: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  // ... (Data form dan logika tidak diubah) ...
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const GOOGLE_FORM_ACTION_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSdycDEN6MgG_X5h8R1vTe_IhOCwsF3WuyETePUVoCP-uXMTFQ/formResponse";
  const FORM_FIELDS = {
    name: "entry.1192317084",
    email: "entry.506595396",
    phone: "entry.529773426",
    message: "entry.849514044",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append(FORM_FIELDS.name, formData.name);
      formDataToSend.append(FORM_FIELDS.email, formData.email);
      formDataToSend.append(FORM_FIELDS.phone, formData.phone);
      formDataToSend.append(FORM_FIELDS.message, formData.message);

      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: "POST",
        body: formDataToSend,
        mode: "no-cors",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setSubmitStatus("success");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-white">
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* PERUBAHAN STRUKTUR:
            Header (h2, h1, p) sekarang dipindahkan ke dalam kolom grid pertama 
            agar sejajar dengan form di desktop.
          */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Kolom Kiri: Berisi Header DAN Info Kontak */}
            <div>
              {/* Header - Dipindahkan ke sini */}
              <div className="mb-12 sm:mb-16">
                <h2
                  className="text-[25px] font-medium text-[#005592] mb-4"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Hubungi Kami
                </h2>
                <h1
                  // PERUBAHAN UKURAN: Diubah ke text-4xl (36px)
                  className="text-4xl font-bold text-gray-900 mb-6"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Kami Siap Membantu Anda
                </h1>
                <p
                  className="text-[22px] text-gray-700 max-w-3xl leading-relaxed text-justify"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Tim Kilau Build siap mewujudkan rumah impian yang nyaman.
                  Jangan ragu untuk menghubungi kami melalui form atau kontak di
                  bawah ini.
                </p>
              </div>

              {/* Info Kontak - Tetap di sini */}
              <div className="space-y-8 sm:space-y-10">
                {/* Lokasi */}
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-[#005592] rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div>
                    <h3
                      className="text-xl sm:text-2xl font-bold text-gray-900 mb-2"
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                      Lokasi
                    </h3>
                    <p
                      className="text-base sm:text-lg text-gray-700 leading-relaxed"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Jl. Raya Citayam No.34, RT./Rw.001/004, Pd. Jaya, Kec.
                      Cipayung, Kota Depok, Jawa Barat 16444
                    </p>
                  </div>
                </div>

                {/* Kontak */}
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-[#005592] rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div>
                    <h3
                      className="text-xl sm:text-2xl font-bold text-gray-900 mb-2"
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                      Kontak
                    </h3>
                    <a
                      href="tel:+6287776360795"
                      className="text-base sm:text-lg text-gray-700 hover:text-[#005592] transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      +62 877-7636-0795
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-[#005592] rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div>
                    <h3
                      className="text-xl sm:text-2xl font-bold text-gray-900 mb-2"
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                      Email
                    </h3>
                    <a
                      href="mailto:kilaubuild@gmail.com"
                      className="text-base sm:text-lg text-gray-700 hover:text-[#005592] transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      kilaubuild@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Form Kontak */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#005592] mb-6 sm:mb-8"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Kirimkan Saran Anda di Sini
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-300 rounded-2xl text-base sm:text-lg focus:outline-none focus:border-[#005592] transition-colors"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-300 rounded-2xl text-base sm:text-lg focus:outline-none focus:border-[#005592] transition-colors"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-300 rounded-2xl text-base sm:text-lg focus:outline-none focus:border-[#005592] transition-colors"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write a message..."
                    required
                    rows={5}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-300 rounded-2xl text-base sm:text-lg focus:outline-none focus:border-[#005592] transition-colors resize-none"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-[#005592] text-white text-base sm:text-lg font-semibold rounded-full hover:bg-[#005592] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {/* Success/Error Message */}
                {submitStatus === "success" && (
                  <p className="text-green-600 text-sm sm:text-base font-medium">
                    Pesan berhasil dikirim! Terima kasih.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-600 text-sm sm:text-base font-medium">
                    Terjadi kesalahan. Silakan coba lagi.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HubungiKami;
