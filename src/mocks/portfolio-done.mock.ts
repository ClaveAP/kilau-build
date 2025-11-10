// src/mocks/portfolio-done.mock.ts
import ProjectDone1 from "../assets/house design.png"; // Gambar asli

export interface ProjectDoneItem {
  id: number;
  title: string;
  imageUrl: string;
  year: number;
}

export const projectsDoneData: ProjectDoneItem[] = [
  {
    id: 1,
    title: "Rumah Minimalis",
    imageUrl: ProjectDone1,
    year: 2024,
  },
];
