// src/mocks/services.mock.ts
import Layanan1 from "../assets/bangun dari 0.png"; // Kita pakai gambar asli
import Layanan2 from "../assets/renovasi.png";
import Layanan3 from "../assets/design.png";

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
    imageUrl: Layanan2,
  },
  {
    id: 3,
    title: "Desain Interior",
    description:
      "Desain interior estetis dan fungsional untuk hunian yang indah dan nyaman.",
    imageUrl: Layanan3,
  },
];
