import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQContextType {
  faqs: FAQItem[];
  setFaqs: React.Dispatch<React.SetStateAction<FAQItem[]>>;
}

const FAQContext = createContext<FAQContextType | undefined>(undefined);

export const FAQProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      id: 1,
      question: "Mengapa biaya tidak ditampilkan dalam bentuk harga per meter?",
      answer:
        "Karena setiap proyek memiliki kebutuhan unik yang berbeda-beda. Faktor seperti jenis material, kompleksitas desain, kondisi lokasi, dan spesifikasi khusus mempengaruhi biaya akhir. Kami memberikan estimasi yang lebih akurat setelah melakukan survey dan konsultasi langsung dengan klien.",
    },
    {
      id: 2,
      question: "Apakah survey lokasi dikenakan biaya?",
      answer:
        "Survey lokasi kami gratis untuk area tertentu dalam radius 50 km dari kantor kami. Untuk area di luar radius tersebut, akan dikenakan biaya transportasi sesuai jarak. Survey ini penting untuk memberikan estimasi biaya yang akurat dan memahami kondisi lapangan.",
    },
    {
      id: 3,
      question: "Berapa lama waktu pengerjaan proyek?",
      answer:
        "Waktu pengerjaan bervariasi tergantung skala dan kompleksitas proyek. Proyek kecil seperti renovasi kamar mandi biasanya memakan waktu 1-2 minggu, sementara proyek besar seperti pembangunan rumah bisa memakan waktu 3-6 bulan. Kami akan memberikan timeline yang jelas setelah survey dan finalisasi desain.",
    },
    {
      id: 4,
      question: "Apakah menyediakan jasa desain interior?",
      answer:
        "Ya, kami menyediakan jasa desain interior lengkap. Tim desainer kami akan membantu Anda merancang interior yang sesuai dengan kebutuhan dan budget. Kami juga menyediakan paket lengkap mulai dari desain hingga eksekusi pembangunan.",
    },
    {
      id: 5,
      question: "Bagaimana sistem pembayaran proyek?",
      answer:
        "Pembayaran dilakukan secara bertahap sesuai progress pengerjaan. Biasanya kami menerapkan sistem: 30% DP saat kontrak, 40% saat pekerjaan mencapai 50%, dan 30% sisanya saat proyek selesai. Detail pembayaran akan disepakati dalam kontrak kerja.",
    },
    {
      id: 6,
      question: "Apakah memberikan garansi untuk pekerjaan?",
      answer:
        "Ya, kami memberikan garansi untuk semua pekerjaan yang kami lakukan. Garansi struktur bangunan minimal 1 tahun, sedangkan untuk finishing seperti cat dan keramik kami berikan garansi 6 bulan. Detail garansi akan tercantum dalam kontrak kerja.",
    },
    {
      id: 7,
      question:
        "Apakah menyediakan material sendiri atau menggunakan material klien?",
      answer:
        "Kami fleksibel dalam hal ini. Kami bisa menyediakan material lengkap dengan harga yang sudah kami negoisasikan dengan supplier, atau menggunakan material yang disediakan klien. Namun, untuk kualitas dan efisiensi, kami merekomendasikan menggunakan material yang kami sediakan karena sudah teruji kualitasnya.",
    },
  ]);

  return (
    <FAQContext.Provider value={{ faqs, setFaqs }}>
      {children}
    </FAQContext.Provider>
  );
};

export const useFAQ = () => {
  const context = useContext(FAQContext);
  if (context === undefined) {
    throw new Error("useFAQ must be used within a FAQProvider");
  }
  return context;
};
