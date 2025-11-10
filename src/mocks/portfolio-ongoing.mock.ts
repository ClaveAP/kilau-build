// src/mocks/portfolio-ongoing.mock.ts
import Ongoing1 from "../assets/on going project.png"; // Gambar asli

export interface OngoingProjectItem {
  id: number;
  title: string;
  imageUrl: string;
  location: string;
  completionPercentage: number;
}

export const ongoingProjectsData: OngoingProjectItem[] = [
  {
    id: 1,
    title: "Rumah Dua Lantai",
    imageUrl: Ongoing1,
    location: "Depok, Jawa Barat",
    completionPercentage: 65,
  },
];
