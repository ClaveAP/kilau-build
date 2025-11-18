import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface Project {
  id: number;
  title: string;
  year: number;
  image: string;
}

export type Category = "done" | "ongoing" | "interior";

interface ProjectsState {
  done: Project[];
  ongoing: Project[];
  interior: Project[];
}

interface PortofolioContextType {
  projects: ProjectsState;
  setProjects: React.Dispatch<React.SetStateAction<ProjectsState>>;
}

const PortofolioContext = createContext<PortofolioContextType | undefined>(
  undefined
);

const defaultProjects: ProjectsState = {
  done: [
    { id: 1, title: "Rumah Minimalis", year: 2024, image: "/design.png" },
    { id: 2, title: "Hunian Modern", year: 2023, image: "/bangun-dari-0.png" },
    { id: 3, title: "Perumahan Cluster", year: 2025, image: "/renovasi.png" },
  ],
  ongoing: [
    { id: 7, title: "Ruko 2 Lantai", year: 2025, image: "/design.png" },
    {
      id: 8,
      title: "Apartemen Studio",
      year: 2025,
      image: "/bangun-dari-0.png",
    },
    { id: 9, title: "Rumah Tipe 70", year: 2025, image: "/renovasi.png" },
  ],
  interior: [
    { id: 10, title: "Desain Kamar Tidur", year: 2024, image: "/design.png" },
    {
      id: 11,
      title: "Desain Ruang Tamu",
      year: 2024,
      image: "/bangun-dari-0.png",
    },
    {
      id: 12,
      title: "Desain Dapur Modern",
      year: 2024,
      image: "/renovasi.png",
    },
  ],
};

export const PortofolioProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<ProjectsState>(defaultProjects);

  return (
    <PortofolioContext.Provider value={{ projects, setProjects }}>
      {children}
    </PortofolioContext.Provider>
  );
};

export const usePortofolio = () => {
  const context = useContext(PortofolioContext);
  if (context === undefined) {
    throw new Error("usePortofolio must be used within a PortofolioProvider");
  }
  return context;
};
