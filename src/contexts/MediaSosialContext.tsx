import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface MediaSosialItem {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  platform: "instagram" | "youtube";
  isFeatured?: boolean;
}

interface MediaSosialContextType {
  mediaSosialData: MediaSosialItem[];
  setMediaSosialData: React.Dispatch<React.SetStateAction<MediaSosialItem[]>>;
}

const defaultMediaSosialData: MediaSosialItem[] = [
  {
    id: 1,
    title: "Tren Desain Rumah Minimalis 2025",
    description: "tes 123",
    date: "Sept 15 2025",
    image: "/kilautips1.png",
    platform: "instagram",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Tips Bangun Rumah Modern 2025",
    description: "Inspirasi desain rumah kekinian",
    date: "June 20 2025",
    image: "/kilautips2.png",
    platform: "instagram",
    isFeatured: false,
  },
  {
    id: 3,
    title: "Material Bangunan Ramah Lingkungan",
    description: "Solusi bangunan berkelanjutan",
    date: "Feb 14 2025",
    image: "/kilautips3.png",
    platform: "instagram",
    isFeatured: false,
  },
];

const MediaSosialContext = createContext<MediaSosialContextType | undefined>(
  undefined
);

export const MediaSosialProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mediaSosialData, setMediaSosialData] = useState<MediaSosialItem[]>(
    defaultMediaSosialData
  );

  return (
    <MediaSosialContext.Provider
      value={{ mediaSosialData, setMediaSosialData }}
    >
      {children}
    </MediaSosialContext.Provider>
  );
};

export const useMediaSosial = () => {
  const context = useContext(MediaSosialContext);
  if (context === undefined) {
    throw new Error("useMediaSosial must be used within a MediaSosialProvider");
  }
  return context;
};
