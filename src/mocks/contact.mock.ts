// src/data/mockKontak.ts

// 1. Definisi Tipe Data (Sesuai dengan Admin Dashboard)
export interface KontakItem {
  id: number;
  type: "lokasi" | "kontak" | "email";
  value: string; // Ini menyimpan Alamat, No Telp, atau Email
  alamat?: string; // Opsional, untuk redundansi lokasi
  mapsUrl?: string; // Khusus tipe 'lokasi'
  latitude?: number;
  longitude?: number;
}

// 2. Data Dummy (Ini data yang bisa di-fetch nantinya)
export const MOCK_KONTAK_DATA: KontakItem[] = [
  {
    id: 1,
    type: "lokasi",
    value:
      "Jl. Raya Citayam No.34, RT./Rw.001/004, Pd. Jaya, Kec. Cipayung, Kota Depok, Jawa Barat 16444",
    alamat:
      "Jl. Raya Citayam No.34, RT./Rw.001/004, Pd. Jaya, Kec. Cipayung, Kota Depok, Jawa Barat 16444",
    mapsUrl: "https://maps.google.com/?q=Jl.+Raya+Citayam+No.34,+Depok", // Contoh URL biasa
  },
  {
    id: 2,
    type: "kontak",
    value: "+62 877-7636-0795",
  },
  {
    id: 3,
    type: "email",
    value: "kilaubuild@gmail.com",
  },
];

// 3. Helper Function: Convert Maps URL (Diambil dari logika Kontak.tsx)
export const convertToEmbedUrl = (url: string | undefined): string => {
  if (!url) return "";

  // Jika sudah embed URL, return as is
  if (url.includes("/maps/embed")) {
    return url;
  }

  try {
    // Logika konversi standar
    if (url.includes("?q=")) {
      const match = url.match(/[?&]q=([^&]+)/);
      if (match && match[1]) {
        // Menggunakan encodeURIComponent agar aman
        return `https://maps.google.com/maps?q=${match[1]}&hl=id&z=14&output=embed`;
      }
    }

    // Fallback sederhana
    return `https://maps.google.com/maps?q=${encodeURIComponent(
      url
    )}&hl=id&z=14&output=embed`;
  } catch (e) {
    console.error("Error converting URL:", e);
    return url;
  }
};

// 4. Helper Function: Get Specific Contact
// Fungsi ini memudahkan komponen mengambil data spesifik tanpa filter manual berulang kali
export const getContactByType = (
  data: KontakItem[],
  type: "lokasi" | "kontak" | "email"
) => {
  return data.find((item) => item.type === type);
};
