// src/mocks/portfolio-interior.mock.ts
import Interior1 from "../assets/design.png"; // Gambar asli

export interface InteriorDesignItem {
  id: number;
  title: string;
  imageUrl: string;
}

export const interiorDesignsData: InteriorDesignItem[] = [
  {
    id: 1,
    title: "Living Room Modern",
    imageUrl: Interior1,
  },
];
