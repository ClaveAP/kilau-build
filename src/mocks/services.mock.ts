// src/mocks/services.mock.ts
import Layanan1 from "../assets/bangun dari 0.png"; // Kita pakai gambar asli

export const servicesData = [
  {
    id: 1,
    title: "Pembangunan Baru",
    description:
      "Pembangunan rumah hunian baru dengan perencanaan detail dan tenaga profesional.",
    imageUrl: Layanan1, // <-- Gambar dari assets
  },
  {
    id: 2,
    title: "Renovasi",
    description:
      "Perawatan dan renovasi rumah agar tetap kokoh, modern, dan nyaman.",
    imageUrl:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800",
  },
  {
    id: 3,
    title: "Desain Interior",
    description:
      "Desain interior estetis dan fungsional untuk hunian yang indah dan nyaman.",
    imageUrl:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800",
  },
];
