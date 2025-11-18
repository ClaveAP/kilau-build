import React, { useState, useEffect } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
// IMPORT MOCK DATA
import { MOCK_KONTAK_DATA, getContactByType } from "../../mocks/contact.mock"; // Sesuaikan path import

const HubungiKami: React.FC = () => {
  // State untuk menampung data kontak (simulasi fetch)
  const [kontakInfo, setKontakInfo] = useState(MOCK_KONTAK_DATA);

  // Ambil data spesifik
  const lokasi = getContactByType(kontakInfo, "lokasi");
  const telepon = getContactByType(kontakInfo, "kontak");
  const email = getContactByType(kontakInfo, "email");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // ... (Bagian Logic Form Submit JANGAN DIUBAH / Tetap Sama) ...
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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSubmitStatus("success");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };
  // ... (Akhir Logic Form) ...

  return (
    <div className="pt-20 min-h-screen bg-white">
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Kolom Kiri */}
            <div>
              <div className="mb-12 sm:mb-16">
                <h2
                  className="text-[25px] font-medium text-[#005592] mb-4"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Hubungi Kami
                </h2>
                <h1
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

              {/* Info Kontak Dinamis */}
              <div className="space-y-8 sm:space-y-10">
                {/* Lokasi */}
                {lokasi && (
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
                        {lokasi.value}
                      </p>
                    </div>
                  </div>
                )}

                {/* Kontak / Telepon */}
                {telepon && (
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
                        href={`tel:${telepon.value.replace(/[^0-9+]/g, "")}`} // Membersihkan karakter non-angka untuk href
                        className="text-base sm:text-lg text-gray-700 hover:text-[#005592] transition-colors"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {telepon.value}
                      </a>
                    </div>
                  </div>
                )}

                {/* Email */}
                {email && (
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
                        href={`mailto:${email.value}`}
                        className="text-base sm:text-lg text-gray-700 hover:text-[#005592] transition-colors"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {email.value}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Kolom Kanan: Form Kontak (Tidak Berubah) */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
              {/* ... Kode Form Tetap Sama ... */}
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#005592] mb-6 sm:mb-8"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Kirimkan Saran Anda di Sini
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Input fields sama seperti sebelumnya, saya singkat agar fokus ke perubahan */}
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write a message..."
                  required
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl resize-none"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 bg-[#005592] text-white font-semibold rounded-full hover:bg-[#005592] transition-colors"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                {submitStatus === "success" && (
                  <p className="text-green-600">Pesan berhasil dikirim!</p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-600">Terjadi kesalahan.</p>
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
